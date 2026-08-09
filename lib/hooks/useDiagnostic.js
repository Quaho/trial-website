import { useState, useEffect } from 'react'
import { DIAGNOSTIC_VERSION, DIAGNOSTIC_AREAS, DIAGNOSTIC_QUESTIONS } from '../data/diagnostic'

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

  // Suggested starting point + skim candidates, derived only from area
  // scores — never from STUDY_PATHS. Only meaningful once every area has
  // been answered, so it's left null/empty until isComplete.
  let recommendedStartModuleId = null
  let reviewModuleIds = []

  if (isComplete) {
    const byWeakestFirst = [...DIAGNOSTIC_AREAS].sort(
      (a, b) => percent(areaScores[a.id]) - percent(areaScores[b.id])
    )
    const weakest = byWeakestFirst[0]
    recommendedStartModuleId = AREA_MODULE_ID[weakest.id]
    reviewModuleIds = DIAGNOSTIC_AREAS.filter(
      (area) => area.id !== weakest.id && percent(areaScores[area.id]) >= 0.8
    ).map((area) => AREA_MODULE_ID[area.id])
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
    recommendedStartModuleId,
    reviewModuleIds,
  }
}
