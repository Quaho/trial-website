import { useRef } from 'react'
import CodeBlock from './CodeBlock'

/**
 * One placement-diagnostic question: slate choice-button styling,
 * lettered badges, focus-visible rings. Behaviorally deliberate: a
 * placement question never reveals correctness and never gates on
 * getting it right — see CLAUDE.md's "Diagnostic Placement & Concept
 * Evidence". Selecting and moving on is the entire interaction;
 * Diagnostic.jsx owns the "Continue" action. Contrast the Qiskit
 * Practice Challenges (`CodeFillBlank`/`CodeOrdering`), which are a
 * deliberately different, real-graded mechanism — see CLAUDE.md's
 * "Qiskit Practice Challenges" section.
 *
 * A question may optionally carry `code` ({ code, language }), rendered
 * above the prompt via the same `CodeBlock` used everywhere else on the
 * site — a code-reading diagnostic question, still silent/no-reveal like
 * every other question here, not to be confused with the real-graded
 * CodeFillBlank/CodeOrdering exercises.
 *
 * Implements the full ARIA "radio group" keyboard pattern, not just the
 * roles — a `role="radiogroup"`/`role="radio"` pair without roving
 * tabindex and arrow-key navigation is a false promise to assistive tech
 * (found and fixed during TASK-026's accessibility pass, not present from
 * the start): only one choice is ever a Tab stop at a time, and
 * Arrow/Home/End move focus AND selection together, matching how a native
 * radio group behaves.
 *
 * Props:
 *   question – { id, prompt, choices, code? } from lib/data/diagnostic.js
 *   selected – index of the currently chosen choice, or null
 *   onSelect – (index) => void
 */
export default function DiagnosticQuestion({ question, selected, onSelect }) {
  const buttonRefs = useRef([])

  function handleKeyDown(event, index) {
    const count = question.choices.length
    let nextIndex = null

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % count
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + count) % count
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = count - 1
    }

    if (nextIndex !== null) {
      event.preventDefault()
      onSelect(nextIndex)
      buttonRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/40 bg-slate-800/40">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Placement Question
        </span>
      </div>

      <div className="p-5">
        <p className="text-white font-medium mb-4 text-sm sm:text-base leading-relaxed">
          {question.prompt}
        </p>

        {question.code && (
          <div className="mb-4">
            <CodeBlock code={question.code.code} language={question.code.language} />
          </div>
        )}

        <div className="space-y-2" role="radiogroup" aria-label={question.prompt}>
          {question.choices.map((choice, i) => {
            const isSelected = selected === i
            // Roving tabindex: before any choice is picked, the first one
            // is the sole Tab stop; once something is selected, that
            // choice becomes the sole Tab stop instead.
            const isTabbable = selected === null ? i === 0 : isSelected

            return (
              <button
                key={i}
                ref={(el) => {
                  buttonRefs.current[i] = el
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isTabbable ? 0 : -1}
                onClick={() => onSelect(i)}
                onKeyDown={(event) => handleKeyDown(event, i)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150
                  cursor-pointer active:scale-[0.99]
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300
                  ${
                    isSelected
                      ? 'border-slate-400 bg-slate-800/60'
                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center
                                text-xs font-bold flex-shrink-0 transition-colors
                      ${isSelected ? 'border-slate-300 text-white bg-slate-700/60' : 'border-slate-600 text-slate-500'}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`flex-1 transition-colors ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {choice}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
