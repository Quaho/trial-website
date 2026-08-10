import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ArrowRight, RotateCcw, Copy, Check } from 'lucide-react'
import DiagnosticQuestion from '../../components/DiagnosticQuestion'
import { useDiagnostic } from '../../lib/hooks/useDiagnostic'
import { DIAGNOSTIC_AREAS, DIAGNOSTIC_QUESTIONS_BY_AREA } from '../../lib/data/diagnostic'
import { CONCEPTS_BY_ID } from '../../lib/data/concepts'
import { MODULES } from '../../lib/data/modules'

const FLAT_QUESTIONS = DIAGNOSTIC_AREAS.flatMap((area) => DIAGNOSTIC_QUESTIONS_BY_AREA[area.id])

const CHAIN_STATUS_LABEL = { start: 'Start here', continue: 'Continue', skim: 'Skim' }
const CHAIN_STATUS_STYLE = {
  start: 'border-amber-800/40 bg-amber-950/20 text-amber-300',
  continue: 'border-indigo-800/40 bg-indigo-950/20 text-indigo-300',
  skim: 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300',
}

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

/**
 * Renders `useDiagnostic()`'s `studyChain` as a connected sequence —
 * weakest area first — with an explicit "next" link between nodes,
 * mirroring the linked-list shape the data is already in. Covers only
 * the 3 diagnostic-tested modules; the background-based Study Paths on
 * /roadmap are a separate, untouched system.
 */
function StudyChainView({ studyChain }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
      <p className="section-label">Your study sequence</p>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        Ordered from your weakest area to your strongest, based only on this diagnostic — it does
        not choose a Study Path for you.
      </p>
      <ol className="mt-4">
        {studyChain.map((node, i) => {
          const module = findModule(node.moduleId)
          if (!module) return null
          const pct = Math.round(node.scorePct * 100)

          return (
            <li key={node.moduleId}>
              <Link
                to={module.to}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-slate-500
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-indigo-400 ${CHAIN_STATUS_STYLE[node.status]}`}
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-current text-sm font-semibold">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{module.title}</span>
                    <span className="rounded-full border border-current px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                      {CHAIN_STATUS_LABEL[node.status]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {node.areaLabel} — {pct}%
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              </Link>
              {node.next && (
                <div className="flex justify-center py-1" aria-hidden="true">
                  <div className="h-4 w-px bg-slate-700" />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Copy-to-clipboard for a completed diagnostic's save code. See CLAUDE.md
 * and lib/utils/diagnosticCode.js — least data stored, no accounts. */
function SaveCodeSection({ diagnostic }) {
  const [copied, setCopied] = useState(false)
  const code = diagnostic.exportCode()

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
      <p className="section-label">Save this result</p>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        This code is generated in your browser and stored nowhere else. Copy it to restore this
        result on another device or after clearing your browser data.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <code className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-200 break-all">
          {code}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary flex-shrink-0 justify-center"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>
    </div>
  )
}

/** Text-entry restore, using the same code format SaveCodeSection produces. */
function RestoreCodeSection({ diagnostic }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  function handleRestore() {
    try {
      diagnostic.importCode(value)
      setError(null)
      setValue('')
    } catch (err) {
      setError(err?.message || 'That code could not be read.')
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
      <p className="section-label">Already have a code?</p>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        Restore a result saved from another device or a previous session, instead of retaking it.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="diagnostic-restore-code" className="sr-only">
          Diagnostic result code
        </label>
        <input
          id="diagnostic-restore-code"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setError(null)
          }}
          placeholder="SQD1-XXXX-XXXX-XXXX-X"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-200
                     placeholder:text-slate-600 focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        />
        <button
          type="button"
          onClick={handleRestore}
          disabled={!value.trim()}
          className={`btn-secondary flex-shrink-0 justify-center ${!value.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Restore
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function ResultsView({ diagnostic }) {
  const demonstratedConcepts = Array.from(diagnostic.demonstrated)
    .map((id) => CONCEPTS_BY_ID[id])
    .filter(Boolean)

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

      {diagnostic.studyChain.length > 0 && <StudyChainView studyChain={diagnostic.studyChain} />}

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

      <SaveCodeSection diagnostic={diagnostic} />
      <RestoreCodeSection diagnostic={diagnostic} />

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
            <RestoreCodeSection diagnostic={diagnostic} />
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
