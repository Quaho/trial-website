import { useState, useEffect } from 'react'
import { DIAGNOSTIC_VERSION, DIAGNOSTIC_AREAS, DIAGNOSTIC_QUESTIONS } from '../data/diagnostic'
import { encodeDiagnosticCode, decodeDiagnosticCode } from '../utils/diagnosticCode'

const STORAGE_KEY = 'quantum_diagnostic_v1'

/**
 * Which pilot module each diagnostic area points back into. Deliberately
 * NOT a mapping into STUDY_PATHS — see CLAUDE.md's "Diagnostic Placement &
 * Concept Evidence": a 3-area content diagnostic cannot reliably tell a CS
 * major who knows no quantum from a complete beginner, so it must not
 * attempt to auto-select a background-based Study Path. It only points at
 * which of the 3 pilot modules is worth starting with or skimming.
 */
const AREA_MODULE_ID = {
  'math-notation': 'braket',
  states: 'intuition',
  gates: 'gates',
}

function emptyState() {
  return { version: DIAGNOSTIC_VERSION, answers: {}, completedAt: null }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : emptyState()
  } catch {
    return emptyState()
  }
}

function percent(score) {
  return score.total === 0 ? 0 : score.correct / score.total
}

/**
 * Diagnostic Placement pilot state — see CLAUDE.md's "Diagnostic Placement
 * & Concept Evidence" section for the rules this hook implements.
 *
 * Persists RAW ANSWERS ONLY to localStorage, never precomputed scores.
 * Area scores and per-concept evidence status are derived live, on every
 * read, from the current DIAGNOSTIC_QUESTIONS — so editing the question
 * bank later can't leave stale scores behind.
 *
 * Call this once per page (top of Diagnostic.jsx, or the pilot module
 * page), not once per ConceptSection — pass the returned `demonstrated`
 * Set down as a prop instead.
 */
export function useDiagnostic() {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // A version mismatch means these answers were graded against a question
  // bank the student may never have seen. Never rescore silently — treat
  // stored answers as unusable for derivation until the student answers
  // something new (which stamps the current version and starts fresh).
  const isStale = state.version !== DIAGNOSTIC_VERSION
  const answers = isStale ? {} : state.answers

  const totalQuestions = DIAGNOSTIC_QUESTIONS.length
  const answeredCount = Object.keys(answers).length
  const isComplete = !isStale && !!state.completedAt && answeredCount === totalQuestions

  /** Record one answer. Resets stale results rather than merging into them. */
  function recordAnswer(questionId, choiceIndex) {
    setState((prev) => {
      const prevAnswers = prev.version === DIAGNOSTIC_VERSION ? prev.answers : {}
      const nextAnswers = { ...prevAnswers, [questionId]: choiceIndex }
      const completedAt =
        Object.keys(nextAnswers).length === totalQuestions ? new Date().toISOString() : null
      return { version: DIAGNOSTIC_VERSION, answers: nextAnswers, completedAt }
    })
  }

  function reset() {
    setState(emptyState())
  }

  /** { correct, attempted, total } for one diagnostic area, derived live. */
  function getAreaScore(areaId) {
    const questions = DIAGNOSTIC_QUESTIONS.filter((q) => q.area === areaId)
    let correct = 0
    let attempted = 0
    for (const q of questions) {
      if (Object.prototype.hasOwnProperty.call(answers, q.id)) {
        attempted += 1
        if (answers[q.id] === q.correct) correct += 1
      }
    }
    return { correct, attempted, total: questions.length }
  }

  const areaScores = Object.fromEntries(DIAGNOSTIC_AREAS.map((area) => [area.id, getAreaScore(area.id)]))

  /**
   * Three-way evidence status for one concept id, exactly as specified in
   * CLAUDE.md: fewer than 2 independently answered questions is never
   * enough to call something demonstrated, regardless of correctness.
   */
  function conceptStatus(conceptId) {
    const taggingQuestions = DIAGNOSTIC_QUESTIONS.filter((q) => q.concepts.includes(conceptId))
    let attempted = 0
    let correct = 0
    for (const q of taggingQuestions) {
      if (Object.prototype.hasOwnProperty.call(answers, q.id)) {
        attempted += 1
        if (answers[q.id] === q.correct) correct += 1
      }
    }
    if (attempted < 2) return 'insufficient-evidence'
    return correct === attempted ? 'demonstrated' : 'needs-review'
  }

  const allTaggedConceptIds = Array.from(new Set(DIAGNOSTIC_QUESTIONS.flatMap((q) => q.concepts)))
  const demonstrated = new Set(allTaggedConceptIds.filter((id) => conceptStatus(id) === 'demonstrated'))

  /**
   * An ordered study sequence across the 3 diagnostic-tested modules,
   * weakest area first — a linked list, not just a flat "start here" +
   * "skim these" split. Each node knows its own `next`, so the chain can
   * be traversed from `studyChainHead` or simply rendered in order.
   * Derived only from area scores — never from STUDY_PATHS, for the same
   * reason as before: this diagnostic can't infer background, so it
   * covers exactly the 3 modules it actually tested, not the full
   * 14-module handbook. Only populated once every area has been answered.
   */
  let studyChain = []
  let studyChainHead = null

  if (isComplete) {
    const rankedAreas = [...DIAGNOSTIC_AREAS].sort(
      (a, b) => percent(areaScores[a.id]) - percent(areaScores[b.id])
    )

    studyChain = rankedAreas.map((area, index) => {
      const scorePct = percent(areaScores[area.id])
      const isLast = index === rankedAreas.length - 1
      return {
        moduleId: AREA_MODULE_ID[area.id],
        areaId: area.id,
        areaLabel: area.label,
        scorePct,
        status: scorePct >= 0.8 ? 'skim' : index === 0 ? 'start' : 'continue',
        next: isLast ? null : AREA_MODULE_ID[rankedAreas[index + 1].id],
      }
    })
    studyChainHead = studyChain[0]?.moduleId ?? null
  }

  /** Only callable once complete — see diagnosticCode.js. */
  function exportCode() {
    return encodeDiagnosticCode({ version: state.version, answers: state.answers })
  }

  /**
   * Loads a previously exported code. Throws (via decodeDiagnosticCode) on
   * a malformed code or a failed checksum — the caller should catch this
   * and show a friendly message, not assume success.
   */
  function importCode(code) {
    const decoded = decodeDiagnosticCode(code)
    setState({
      version: decoded.version,
      answers: decoded.answers,
      completedAt: new Date().toISOString(),
    })
    return decoded
  }

  return {
    isStale,
    isComplete,
    answers,
    answeredCount,
    totalQuestions,
    recordAnswer,
    reset,
    areaScores,
    conceptStatus,
    demonstrated,
    studyChain,
    studyChainHead,
    exportCode,
    importCode,
  }
}
