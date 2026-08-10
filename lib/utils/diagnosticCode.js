import { DIAGNOSTIC_QUESTIONS } from '../data/diagnostic'

/**
 * Compact, no-account save/restore code for a completed diagnostic —
 * see CLAUDE.md's "Diagnostic Placement & Concept Evidence" and the
 * progress-storage discussion: least data stored, no server, no accounts.
 * Nothing here is sensitive, so this encodes for compactness and
 * typo-resistance, not secrecy.
 *
 * Format: `SQD1-XXXX-XXXX-...` where the body is Crockford Base32
 * (excludes I/L/O/U to avoid transcription errors) over:
 *   [version byte][2 bits per DIAGNOSTIC_QUESTIONS answer, in array order]
 * plus a 1-character checksum so a mistyped code is caught immediately
 * instead of silently importing garbage.
 */

const CROCKFORD_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const CODE_PREFIX = 'SQD1'

function bytesToBase32(bytes) {
  let bits = ''
  for (const b of bytes) bits += b.toString(2).padStart(8, '0')
  let out = ''
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5).padEnd(5, '0')
    out += CROCKFORD_ALPHABET[parseInt(chunk, 2)]
  }
  return out
}

function base32ToBytes(str) {
  let bits = ''
  for (const ch of str) {
    const value = CROCKFORD_ALPHABET.indexOf(ch)
    if (value === -1) throw new Error(`"${ch}" is not a valid character in a diagnostic code.`)
    bits += value.toString(2).padStart(5, '0')
  }
  const bytes = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2))
  }
  return bytes
}

function checksumChar(bytes) {
  const sum = bytes.reduce((acc, b) => (acc + b) % 32, 0)
  return CROCKFORD_ALPHABET[sum]
}

function chunk(str, size) {
  const out = []
  for (let i = 0; i < str.length; i += size) out.push(str.slice(i, i + size))
  return out
}

/**
 * @param {{ version: number, answers: Record<string, number> }} state
 * @returns {string} a code like "SQD1-3K7H-9PXW-2M"
 * @throws if any DIAGNOSTIC_QUESTIONS entry is unanswered — only a
 *         completed diagnostic can be exported.
 */
export function encodeDiagnosticCode({ version, answers }) {
  let bits = version.toString(2).padStart(8, '0')
  for (const q of DIAGNOSTIC_QUESTIONS) {
    const choice = answers[q.id]
    if (choice === undefined) {
      throw new Error('The diagnostic is not complete yet — finish it before saving a code.')
    }
    bits += choice.toString(2).padStart(2, '0')
  }
  while (bits.length % 8 !== 0) bits += '0'

  const bytes = []
  for (let i = 0; i < bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2))

  const body = bytesToBase32(bytes) + checksumChar(bytes)
  return `${CODE_PREFIX}-${chunk(body, 4).join('-')}`
}

/**
 * @param {string} code
 * @returns {{ version: number, answers: Record<string, number> }}
 * @throws if the code is malformed or its checksum doesn't match —
 *         never silently returns a partially-decoded result.
 */
export function decodeDiagnosticCode(code) {
  const cleaned = String(code || '')
    .trim()
    .toUpperCase()
    .replace(new RegExp(`^${CODE_PREFIX}-?`), '')
    .replace(/[-\s]/g, '')

  if (cleaned.length < 2) {
    throw new Error('That code looks too short to be a valid diagnostic code.')
  }

  const body = cleaned.slice(0, -1)
  const providedChecksum = cleaned.slice(-1)
  const bytes = base32ToBytes(body)

  if (bytes.length === 0 || checksumChar(bytes) !== providedChecksum) {
    throw new Error('That code looks mistyped — double check it and try again.')
  }

  const version = bytes[0]
  const bits = bytes
    .slice(1)
    .map((b) => b.toString(2).padStart(8, '0'))
    .join('')

  const answers = {}
  let offset = 0
  for (const q of DIAGNOSTIC_QUESTIONS) {
    if (offset + 2 > bits.length) break
    answers[q.id] = parseInt(bits.slice(offset, offset + 2), 2)
    offset += 2
  }

  return { version, answers }
}
