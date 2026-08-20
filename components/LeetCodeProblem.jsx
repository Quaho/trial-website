import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, RotateCcw } from 'lucide-react'

const DIFFICULTY_STYLES = {
  Easy: 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300',
  Medium: 'border-amber-800/40 bg-amber-950/20 text-amber-300',
  Hard: 'border-red-800/40 bg-red-950/20 text-red-300',
}

/**
 * One Qiskit Challenges problem — a LeetCode-style card: number,
 * difficulty badge, title, problem statement, a static illustrative
 * example, then a single-blank fill-in exercise with real pass/fail
 * feedback. See lib/data/qiskitChallenges.js for the full rationale and
 * CLAUDE.md's "Qiskit Challenges" section for how this differs from both
 * the Diagnostic and the per-module Qiskit Practice Challenges.
 *
 * Deliberately restrained, matching the Qiskit Practice Challenges'
 * presentation rules: the difficulty badge is the only "game-like"
 * element, and it is informational metadata (problem complexity), not a
 * score, streak, or achievement. No persistence across sessions, no
 * aggregate score shown across problems, no leaderboard.
 *
 * Grading is select-based exact-match, same reasoning as CodeFillBlank:
 * no free text, so it's reliably checkable without a parser, since this
 * is a static site with no code-execution sandbox.
 */
export default function LeetCodeProblem({ problem, moduleLink }) {
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)

  const isCorrect = checked && Number(selected) === problem.correctIndex

  function handleCheck() {
    if (selected === '') return
    setChecked(true)
  }

  function handleSelect(event) {
    setSelected(event.target.value)
    setChecked(false)
  }

  function handleReset() {
    setSelected('')
    setChecked(false)
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6" id={problem.id}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500">#{problem.number}</span>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLES[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        {moduleLink && (
          <Link
            to={moduleLink.to}
            className="ml-auto text-xs font-medium text-slate-400 hover:text-white transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 rounded"
          >
            {moduleLink.title} &rarr;
          </Link>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-white">{problem.title}</h3>
      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{problem.statement}</p>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Example</p>
        <p className="font-mono text-slate-300">
          <span className="text-slate-500">Input: </span>{problem.example.input}
        </p>
        <p className="mt-1 font-mono text-slate-300">
          <span className="text-slate-500">Output: </span>{problem.example.output}
        </p>
      </div>

      <div className="mt-4 space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed">
        {problem.before.map((line, i) => (
          <div key={`before-${i}`} className="text-slate-300">{line}</div>
        ))}
        <select
          value={selected}
          onChange={handleSelect}
          aria-label="Choose the missing line of code"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 font-mono text-sm text-slate-200
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
        >
          <option value="" disabled>— choose the missing line —</option>
          {problem.choices.map((choice, i) => (
            <option key={i} value={i}>{choice}</option>
          ))}
        </select>
        {problem.after.map((line, i) => (
          <div key={`after-${i}`} className="text-slate-300">{line}</div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selected === ''}
            className={`btn-primary ${selected === '' ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Submit
          </button>
        ) : (
          <button type="button" onClick={handleReset} className="btn-secondary">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
        <span role="status" aria-live="polite" className="text-sm font-medium">
          {checked && (
            <span className={`inline-flex items-center gap-1.5 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {isCorrect ? 'Accepted.' : 'Wrong Answer.'}
            </span>
          )}
        </span>
      </div>

      {checked && (
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300 leading-relaxed">
          {problem.explanation}
        </div>
      )}
    </div>
  )
}
