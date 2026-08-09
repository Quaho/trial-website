import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ArrowRight, RotateCcw } from 'lucide-react'
import DiagnosticQuestion from '../../components/DiagnosticQuestion'
import { useDiagnostic } from '../../lib/hooks/useDiagnostic'
import { DIAGNOSTIC_AREAS, DIAGNOSTIC_QUESTIONS_BY_AREA } from '../../lib/data/diagnostic'
import { CONCEPTS_BY_ID } from '../../lib/data/concepts'
import { MODULES } from '../../lib/data/modules'

const FLAT_QUESTIONS = DIAGNOSTIC_AREAS.flatMap((area) => DIAGNOSTIC_QUESTIONS_BY_AREA[area.id])

function findModule(moduleId) {
  return MODULES.find((m) => m.id === moduleId) || null
}

function AreaScoreRow({ area, score }) {
  const pct = score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100)
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">{area.label}</span>
        <span className="text-sm font-mono text-slate-400">
          {score.correct}/{score.total}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden" aria-hidden="true">
        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function ResultsView({ diagnostic }) {
  const demonstratedConcepts = Array.from(diagnostic.demonstrated)
    .map((id) => CONCEPTS_BY_ID[id])
    .filter(Boolean)

  const recommendedModule = diagnostic.recommendedStartModuleId
    ? findModule(diagnostic.recommendedStartModuleId)
    : null

  const reviewModules = diagnostic.reviewModuleIds.map(findModule).filter(Boolean)

  return (
    <div className="space-y-6">
      <div>
        <p className="section-label">Results</p>
        <h2 className="mt-2 text-2xl font-bold text-white tracking-tight">Placement summary</h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-2xl">
          This is a suggestion, not a gate — every page in the handbook stays fully readable
          whether or not you take this diagnostic. It does not choose a Study Path for you;
          the paths on the Roadmap are still based on your background, not on this score.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {DIAGNOSTIC_AREAS.map((area) => (
          <AreaScoreRow key={area.id} area={area} score={diagnostic.areaScores[area.id]} />
        ))}
      </div>

      {recommendedModule && (
        <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-5">
          <p className="section-label text-indigo-400">Suggested starting point</p>
          <Link
            to={recommendedModule.to}
            className="mt-2 inline-flex items-center gap-1.5 text-lg font-semibold text-white hover:text-indigo-300
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
          >
            {recommendedModule.title}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-1 text-sm text-slate-400">{recommendedModule.tagline}</p>
        </div>
      )}

      {reviewModules.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="section-label">You can probably skim</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {reviewModules.map((module) => (
              <Link
                key={module.id}
                to={module.to}
                className="rounded-full border border-slate-700/60 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300
                           hover:border-slate-600 hover:text-white transition-colors
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                {module.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {demonstratedConcepts.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="section-label">The diagnostic suggests you already know</p>
          <ul className="mt-3 space-y-1.5">
            {demonstratedConcepts.map((concept) => (
              <li key={concept.id} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-600 flex-shrink-0" />
                {concept.label}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            On the relevant pages, this content may appear collapsed by default with a note that
            you can expand it to review.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
        <Link to="/roadmap" className="btn-secondary justify-center">
          Choose a Study Path
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button type="button" onClick={diagnostic.reset} className="btn-ghost justify-center">
          <RotateCcw className="w-4 h-4" />
          Retake diagnostic
        </button>
      </div>
    </div>
  )
}

export default function Diagnostic() {
  const diagnostic = useDiagnostic()
  const [started, setStarted] = useState(() => diagnostic.answeredCount > 0)
  const [index, setIndex] = useState(() => {
    const firstUnanswered = FLAT_QUESTIONS.findIndex((q) => !(q.id in diagnostic.answers))
    return firstUnanswered === -1 ? 0 : firstUnanswered
  })

  const currentQuestion = FLAT_QUESTIONS[index]
  const [selected, setSelected] = useState(() => diagnostic.answers[currentQuestion.id] ?? null)

  const currentArea = DIAGNOSTIC_AREAS.find((a) => a.id === currentQuestion.area)
  const areaQuestions = DIAGNOSTIC_QUESTIONS_BY_AREA[currentQuestion.area]
  const withinAreaIndex = areaQuestions.findIndex((q) => q.id === currentQuestion.id)

  function goToQuestion(nextIndex) {
    setIndex(nextIndex)
    setSelected(diagnostic.answers[FLAT_QUESTIONS[nextIndex].id] ?? null)
  }

  function handleContinue() {
    if (selected === null) return
    diagnostic.recordAnswer(currentQuestion.id, selected)
    if (index + 1 < FLAT_QUESTIONS.length) {
      goToQuestion(index + 1)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-indigo-950/70 via-indigo-950/20 to-slate-950 border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white mb-6 transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Study Paths
          </Link>

          <p className="section-label">Optional</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Placement Diagnostic
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            A short, ungraded check across notation, states, and gates. It suggests where your
            knowledge boundary is — it never locks any page, and skipping it changes nothing about
            what you can read.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {diagnostic.isComplete ? (
          <ResultsView diagnostic={diagnostic} />
        ) : !started ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="section-label">Before you start</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed">
                <li>3 short sections — notation, states, gates — about {FLAT_QUESTIONS.length} questions total.</li>
                <li>There is no pass/fail. Answers only shape a suggestion, never access.</li>
                <li>You can retake it any time; a new answer always replaces the old one.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setStarted(true)} className="btn-primary justify-center">
                Start the diagnostic
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/roadmap" className="btn-ghost justify-center">
                Skip — go to Study Paths
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {`Question ${index + 1} of ${FLAT_QUESTIONS.length}, ${currentArea.label}`}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                {currentArea.label} — question {withinAreaIndex + 1} of {areaQuestions.length}
              </span>
              <span className="font-mono">
                {index + 1} / {FLAT_QUESTIONS.length}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden" aria-hidden="true">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-200"
                style={{ width: `${((index + 1) / FLAT_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <DiagnosticQuestion question={currentQuestion} selected={selected} onSelect={setSelected} />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleContinue}
                disabled={selected === null}
                className={`btn-primary ${selected === null ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {index + 1 === FLAT_QUESTIONS.length ? 'See results' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
