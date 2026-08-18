import { useState } from 'react'
import { Check, X, RotateCcw } from 'lucide-react'

/**
 * A small, checkable Qiskit code exercise — one blank line in a snippet,
 * filled in by choosing a complete statement from a native <select>
 * (not free text, so grading is exact-match reliable without a parser).
 * See CLAUDE.md's "Qiskit Practice Challenges" section: this is a
 * deliberate, documented exception to the Diagnostic's no-reveal rule —
 * real pass/fail plus retry, not part of the diagnostic quiz itself.
 *
 * Props:
 *   title, prompt   – heading and short instruction
 *   visual          – optional compact ReactNode (e.g. StateTransition) shown
 *                      between the prompt and the code, before/after state at a glance
 *   before, after   – arrays of non-editable code lines shown around the blank
 *   choices         – array of full statement strings, one is correct
 *   correctIndex    – index into `choices`
 *   explanation     – shown after checking, correct or not
 */
export default function CodeFillBlank({ title, prompt, visual, before = [], choices, correctIndex, after = [], explanation }) {
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)

  const isCorrect = checked && Number(selected) === correctIndex

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
    <div className="rounded-2xl border border-teal-800/40 bg-teal-950/10 p-5">
      <p className="text-xs uppercase tracking-widest text-teal-400 mb-1">Qiskit Practice</p>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {prompt && <p className="mt-2 text-sm text-slate-400 leading-relaxed">{prompt}</p>}
      {visual && <div className="mt-3">{visual}</div>}

      <div className="mt-4 space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed">
        {before.map((line, i) => (
          <div key={`before-${i}`} className="text-slate-300">{line}</div>
        ))}
        <select
          value={selected}
          onChange={handleSelect}
          aria-label="Choose the missing line of code"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 font-mono text-sm text-teal-300
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        >
          <option value="" disabled>— choose the missing line —</option>
          {choices.map((choice, i) => (
            <option key={i} value={i}>{choice}</option>
          ))}
        </select>
        {after.map((line, i) => (
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
            Check
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
              {isCorrect ? 'Correct.' : 'Not quite.'}
            </span>
          )}
        </span>
      </div>

      {checked && explanation && (
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300 leading-relaxed">
          {explanation}
        </div>
      )}
    </div>
  )
}
