import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'

/**
 * Multiple-choice checkpoint.
 * Props:
 *   question   – string
 *   choices    – string[]
 *   correct    – index of correct choice (0-based)
 *   onPass     – called when user selects the correct answer
 */
export default function Quiz({ question, choices, correct, onPass }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const passed = submitted && selected === correct

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
    if (selected === correct) onPass?.()
  }

  function handleRetry() {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <div className="my-8 rounded-2xl border border-indigo-800/40 bg-indigo-950/20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-indigo-900/30 border-b border-indigo-800/30">
        <CheckCircle className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Checkpoint</span>
      </div>

      <div className="p-5">
        <p className="text-white font-medium mb-4 text-sm sm:text-base leading-relaxed">{question}</p>

        <div className="space-y-2">
          {choices.map((choice, i) => {
            let style = 'border-slate-700 bg-slate-900/50 hover:border-indigo-600 hover:bg-indigo-950/30'
            if (selected === i && !submitted) style = 'border-indigo-500 bg-indigo-950/40'
            if (submitted && i === correct) style = 'border-green-500 bg-green-950/30'
            if (submitted && selected === i && i !== correct) style = 'border-red-500 bg-red-950/30'

            return (
              <button
                key={i}
                disabled={submitted}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150
                  ${style}
                  ${submitted ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0
                    ${selected === i && !submitted ? 'border-indigo-400 text-indigo-300' : 'border-slate-600 text-slate-500'}
                    ${submitted && i === correct ? 'border-green-500 text-green-400' : ''}
                    ${submitted && selected === i && i !== correct ? 'border-red-500 text-red-400' : ''}
                  `}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`
                    ${submitted && i === correct ? 'text-green-300' : ''}
                    ${submitted && selected === i && i !== correct ? 'text-red-300' : ''}
                    ${!submitted ? 'text-slate-300' : ''}
                  `}>{choice}</span>
                  {submitted && i === correct && <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />}
                  {submitted && selected === i && i !== correct && <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`btn-primary text-sm ${selected === null ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Check Answer
            </button>
          ) : passed ? (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Correct! Continue below.
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <XCircle className="w-4 h-4" />
                Not quite — try again!
              </div>
              <button onClick={handleRetry} className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
