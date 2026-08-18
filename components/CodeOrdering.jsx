import { useState } from 'react'
import { ArrowUp, ArrowDown, Check, X, Shuffle } from 'lucide-react'

function shuffled(lines) {
  const a = [...lines]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  // Re-roll once if the shuffle happened to land on the already-correct
  // order — an ordering exercise that starts solved teaches nothing.
  if (a.join('|') === lines.join('|') && lines.length > 1) {
    return shuffled(lines)
  }
  return a
}

/**
 * A small, checkable Qiskit code-ordering exercise — shuffled snippet
 * lines, reordered with keyboard-accessible move-up/move-down controls
 * (not drag-and-drop) and checked against the one correct sequence. See
 * CLAUDE.md's "Qiskit Practice Challenges" section: a deliberate,
 * documented exception to the Diagnostic's no-reveal rule — real
 * pass/fail plus retry, not part of the diagnostic quiz itself.
 *
 * Props:
 *   title, prompt – heading and short instruction
 *   lines         – array of code-line strings in their CORRECT order;
 *                   the component shuffles them for display
 *   explanation   – shown after checking, correct or not
 */
export default function CodeOrdering({ title, prompt, lines, explanation }) {
  const [order, setOrder] = useState(() => shuffled(lines))
  const [checked, setChecked] = useState(false)

  const isCorrect = checked && order.join('|') === lines.join('|')

  function move(index, direction) {
    const target = index + direction
    if (target < 0 || target >= order.length) return
    setChecked(false)
    setOrder((prev) => {
      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  function handleReset() {
    setOrder(shuffled(lines))
    setChecked(false)
  }

  return (
    <div className="rounded-2xl border border-teal-800/40 bg-teal-950/10 p-5">
      <p className="text-xs uppercase tracking-widest text-teal-400 mb-1">Qiskit Practice</p>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {prompt && <p className="mt-2 text-sm text-slate-400 leading-relaxed">{prompt}</p>}

      <ol aria-label="Reorder these lines of code" className="mt-4 space-y-1.5 rounded-xl border border-slate-800 bg-slate-950 p-4">
        {order.map((line, index) => (
          <li
            key={line}
            className="flex items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2"
          >
            <span className="font-mono text-sm text-slate-300">{line}</span>
            <span className="flex flex-shrink-0 gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move "${line}" up`}
                className="rounded p-1 text-slate-400 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-slate-400
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === order.length - 1}
                aria-label={`Move "${line}" down`}
                className="rounded p-1 text-slate-400 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-slate-400
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button type="button" onClick={() => setChecked(true)} className="btn-primary">
            Check Order
          </button>
        ) : (
          <button type="button" onClick={handleReset} className="btn-secondary">
            <Shuffle className="w-4 h-4" />
            Shuffle &amp; Retry
          </button>
        )}
        <span role="status" aria-live="polite" className="text-sm font-medium">
          {checked && (
            <span className={`inline-flex items-center gap-1.5 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {isCorrect ? 'Correct order.' : 'Not the right order yet.'}
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
