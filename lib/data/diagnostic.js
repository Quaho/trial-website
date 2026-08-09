/**
 * Diagnostic placement question bank for the pilot (Phase 3a — see
 * CLAUDE.md's "Diagnostic Placement & Concept Evidence" section).
 *
 * Scoped to the 3 pilot-relevant areas only, matching the 3 pilot modules
 * in concepts.js (intuition → states, braket → math-notation,
 * gates → gates). Not CLAUDE.md's full six Part-topics — those are the
 * handbook's overall structure, not a diagnostic specification. The other
 * three areas (circuits, measurement, qiskit) are explicitly deferred
 * until the pilot is reviewed.
 *
 * This file intentionally does not import concepts.js. Both are siblings
 * feeding useDiagnostic.js (lib/data/modules.js, concepts.js, diagnostic.js
 * → useDiagnostic.js), not dependents of each other. Question `concepts`
 * arrays are kept consistent with concepts.js ids by convention — verify
 * both files together when editing either.
 */

/**
 * Bump this whenever a question's meaning changes: its prompt, its choices,
 * its correct answer, its concept tags, or the scoring interpretation.
 * Copy/style-only edits (typo fixes, rewording that doesn't change what's
 * being asked or how it's graded) do NOT require a bump.
 *
 * useDiagnostic.js compares this against a student's stored `version`. A
 * mismatch means their stored answers were graded against questions they
 * may never have seen — the UI must treat that as stale and prompt a
 * retake, never silently rescore old answers against the new bank.
 */
export const DIAGNOSTIC_VERSION = 1

export const DIAGNOSTIC_AREAS = [
  { id: 'math-notation', label: 'Mathematical Language & Notation' },
  { id: 'states', label: 'Qubits & Superposition' },
  { id: 'gates', label: 'Single-Qubit Gates' },
]

/**
 * Authoring rule: a concept intended to ever collapse via ConceptSection
 * needs at least 2 questions tagging it (see CLAUDE.md's "Diagnostic
 * Placement & Concept Evidence" — a concept needs >=2 independently
 * correct answers before it counts as demonstrated). A concept tagged by
 * only 1 question here will always read as insufficient-evidence, which is
 * an acceptable pilot outcome, not a bug — some concepts below (e.g.
 * `notation-reading`, `pauli-z`, `s-t-gates`) are deliberately left at 1
 * question, and `quantum-advantage-limits` has none at all.
 */
export const DIAGNOSTIC_QUESTIONS = [
  // ── math-notation (7 questions) ─────────────────────────────────────
  {
    id: 'dq-math-1',
    area: 'math-notation',
    prompt: 'In the state |ψ⟩ = α|0⟩ + β|1⟩, what best describes |0⟩ and |1⟩?',
    choices: [
      'Two possible measurement probabilities',
      'The computational basis states',
      'Two separate, independent qubits',
      'The bra and the ket of the same state',
    ],
    correct: 1,
    concepts: ['ket-notation'],
  },
  {
    id: 'dq-math-2',
    area: 'math-notation',
    prompt: 'Written as a column vector, how is |ψ⟩ = α|0⟩ + β|1⟩ expressed?',
    choices: [
      '(α, β) as a two-entry column vector',
      '(α + β) as a single number',
      '(1, 1) regardless of α and β',
      '(β, α), with the entries swapped',
    ],
    correct: 0,
    concepts: ['ket-notation'],
  },
  {
    id: 'dq-math-3',
    area: 'math-notation',
    prompt: 'If |ψ⟩ is the column vector (α, β), what is the matching bra ⟨ψ|?',
    choices: [
      'The same column vector (α, β)',
      'The conjugate transpose, written as the row vector (α*, β*)',
      'The normalized version of |ψ⟩',
      'An unrelated state with its own amplitudes',
    ],
    correct: 1,
    concepts: ['bra-notation'],
  },
  {
    id: 'dq-math-4',
    area: 'math-notation',
    prompt: 'Why does forming a bra from a ket involve complex conjugation?',
    choices: [
      'So that kets and bras can be swapped freely in any expression',
      'So that inner products like ⟨ψ|ψ⟩ come out real and non-negative',
      'It is a notational convention with no mathematical necessity',
      'So that the bra has more entries than the ket',
    ],
    correct: 1,
    concepts: ['bra-notation'],
  },
  {
    id: 'dq-math-5',
    area: 'math-notation',
    prompt: 'What is ⟨0|0⟩ for the computational basis state |0⟩?',
    choices: ['0', '1', 'i', '1/√2'],
    correct: 1,
    concepts: ['inner-product'],
  },
  {
    id: 'dq-math-6',
    area: 'math-notation',
    prompt: 'What is ⟨0|1⟩ for the computational basis states |0⟩ and |1⟩?',
    choices: ['1, because both are valid states', '0, because the states are orthogonal', '1/√2', '-1'],
    correct: 1,
    concepts: ['inner-product'],
  },
  {
    id: 'dq-math-7',
    area: 'math-notation',
    prompt: 'Given P(φ) = |⟨φ|ψ⟩|², what does squaring the inner product give you?',
    choices: [
      'The amplitude of |ψ⟩ directly',
      'The probability of measuring outcome |φ⟩',
      'The normalization constant for |ψ⟩',
      'The phase difference between |φ⟩ and |ψ⟩',
    ],
    correct: 1,
    concepts: ['notation-reading'],
  },

  // ── states (7 questions) ─────────────────────────────────────────────
  {
    id: 'dq-states-1',
    area: 'states',
    prompt: 'How does a classical bit differ from a qubit in how its state is described?',
    choices: [
      'A classical bit takes a definite value 0 or 1; a qubit is described by amplitudes over both basis states',
      'A qubit can only take the value 1',
      'They are described identically until measured',
      'A classical bit can be in superposition, but a qubit cannot',
    ],
    correct: 0,
    concepts: ['classical-vs-qubit'],
  },
  {
    id: 'dq-states-2',
    area: 'states',
    prompt: "A single qubit's state before measurement is best described as:",
    choices: [
      'A hidden classical value that measurement simply reveals',
      'A combination of |0⟩ and |1⟩ weighted by amplitudes',
      'Always exactly |0⟩ until acted on',
      'Undefined until a gate is applied',
    ],
    correct: 1,
    concepts: ['classical-vs-qubit'],
  },
  {
    id: 'dq-states-3',
    area: 'states',
    prompt: 'What does it mean for a qubit to be in superposition?',
    choices: [
      'It is secretly 0 or 1, we just do not know which yet',
      'Its state is a linear combination of basis states with amplitudes',
      'It is entangled with another qubit',
      'It has been measured twice',
    ],
    correct: 1,
    concepts: ['superposition'],
  },
  {
    id: 'dq-states-4',
    area: 'states',
    prompt: 'For |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩, what determines the probability of each measurement outcome?',
    choices: [
      'The amplitude values directly, without modification',
      'The squared magnitude of each amplitude',
      'A coin flip unrelated to the amplitudes',
      'The order the basis states are written in',
    ],
    correct: 1,
    concepts: ['superposition', 'measurement-collapse'],
  },
  {
    id: 'dq-states-5',
    area: 'states',
    prompt: 'What happens immediately after a qubit in superposition is measured in the computational basis?',
    choices: [
      'It returns one definite classical outcome, 0 or 1',
      'It returns both 0 and 1 simultaneously',
      'It stays in superposition, unaffected',
      'It returns a probability value instead of an outcome',
    ],
    correct: 0,
    concepts: ['measurement-collapse'],
  },
  {
    id: 'dq-states-6',
    area: 'states',
    prompt: 'What is interference, in terms of amplitudes?',
    choices: [
      'Noise from the environment that corrupts a qubit',
      'The way amplitudes combine, reinforcing or canceling and changing measurement probabilities',
      'A synonym for entanglement between two qubits',
      'The process of reading out a measurement result',
    ],
    correct: 1,
    concepts: ['interference'],
  },
  {
    id: 'dq-states-7',
    area: 'states',
    prompt: 'Why does interference matter for quantum algorithms?',
    choices: [
      'It lets an algorithm route amplitude toward correct answers and away from incorrect ones',
      'It has no algorithmic use; it is only a theoretical curiosity',
      'It only matters for error correction, not algorithms',
      'It replaces the need for measurement entirely',
    ],
    correct: 0,
    concepts: ['interference'],
  },

  // ── gates (8 questions) ──────────────────────────────────────────────
  {
    id: 'dq-gates-1',
    area: 'gates',
    prompt: "What property must every single-qubit gate's 2×2 matrix U satisfy?",
    choices: ['U = U²', 'U†U = I (unitarity)', 'U has only real entries', 'U must be diagonal'],
    correct: 1,
    concepts: ['unitary-gate'],
  },
  {
    id: 'dq-gates-2',
    area: 'gates',
    prompt: 'Why must quantum gates be reversible?',
    choices: [
      'Because they are unitary operators, and unitary operators always have an inverse',
      'Because measurement is also reversible',
      'Reversibility is a convention, not a requirement',
      'Because classical logic gates are reversible too',
    ],
    correct: 0,
    concepts: ['unitary-gate'],
  },
  {
    id: 'dq-gates-3',
    area: 'gates',
    prompt: 'What does the Pauli-X gate do to the computational basis states?',
    choices: [
      'It leaves both |0⟩ and |1⟩ unchanged',
      'It swaps |0⟩ and |1⟩',
      'It multiplies |1⟩ by -1',
      'It creates a superposition of |0⟩ and |1⟩',
    ],
    correct: 1,
    concepts: ['pauli-x'],
  },
  {
    id: 'dq-gates-4',
    area: 'gates',
    prompt: 'Why does X|+⟩ = |+⟩, even though X flips |0⟩ and |1⟩?',
    choices: [
      'Because |+⟩ is an eigenstate of X',
      'Because X does not actually act on |+⟩',
      'Because |+⟩ is not a valid quantum state',
      'Because X only acts on the second qubit in a system',
    ],
    correct: 0,
    concepts: ['pauli-x'],
  },
  {
    id: 'dq-gates-5',
    area: 'gates',
    prompt: 'What does the Pauli-Z gate do to |0⟩ and |1⟩?',
    choices: [
      'It swaps |0⟩ and |1⟩, like X',
      'It leaves |0⟩ unchanged and multiplies |1⟩ by -1',
      'It leaves both states completely unchanged',
      'It creates an equal superposition of both',
    ],
    correct: 1,
    concepts: ['pauli-z'],
  },
  {
    id: 'dq-gates-6',
    area: 'gates',
    prompt: 'What does the Hadamard gate do to |0⟩?',
    choices: [
      'Maps it to |1⟩',
      'Maps it to |+⟩ = (|0⟩ + |1⟩)/√2',
      'Leaves it unchanged',
      'Maps it to -|0⟩',
    ],
    correct: 1,
    concepts: ['hadamard'],
  },
  {
    id: 'dq-gates-7',
    area: 'gates',
    prompt: 'What does H² = I tell you about the Hadamard gate?',
    choices: [
      'Applying H twice returns the original state — H is its own inverse',
      'H has no effect on any state',
      'H must be applied exactly twice to work',
      'H is not a valid unitary gate',
    ],
    correct: 0,
    concepts: ['hadamard'],
  },
  {
    id: 'dq-gates-8',
    area: 'gates',
    prompt: 'What do the identities S² = Z and T² = S express?',
    choices: [
      'S and T are unrelated to Z',
      'S and T are nested rotations about the same axis as Z',
      'S and T are bit-flip gates like X',
      'S and T undo the effect of the Hadamard gate',
    ],
    correct: 1,
    concepts: ['s-t-gates'],
  },
]

/** Questions grouped by area, for the sectioned diagnostic UI. */
export const DIAGNOSTIC_QUESTIONS_BY_AREA = DIAGNOSTIC_AREAS.reduce((acc, area) => {
  acc[area.id] = DIAGNOSTIC_QUESTIONS.filter((q) => q.area === area.id)
  return acc
}, {})
