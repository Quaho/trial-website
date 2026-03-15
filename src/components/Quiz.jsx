import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Multiple-choice checkpoint with shake/pulse animations.
 * Props:
 *   question   – string
 *   choices    – string[]
 *   correct    – index of correct choice (0-based)
 *   onPass     – called when user selects the correct answer
 *   isPassed   – true if this lesson was already completed in a prior session
 */
export default function Quiz({ question, choices, correct, onPass, isPassed }) {
  const [alreadyPassed] = useState(!!isPassed)
  const [selected, setSelected]   = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [shake, setShake]         = useState(false)

  const justPassed = submitted && selected === correct

  /* ── Compact state for revisited passed lessons ──── */
  if (alreadyPassed) {
    return (
      <div className="rounded-2xl border border-green-800/30 bg-green-950/10 p-4 flex items-center gap-3">
        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
        <span className="text-sm text-green-300 font-medium">Checkpoint complete.</span>
      </div>
    )
  }

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
    if (selected === correct) {
      onPass?.()
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 450)
    }
  }

  function handleRetry() {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <motion.div
      animate={
        justPassed
          ? { scale: [1, 1.007, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`rounded-2xl border overflow-hidden transition-colors duration-300
        ${justPassed
          ? 'border-green-700/50 bg-green-950/10'
          : 'border-indigo-800/40 bg-indigo-950/20'
        }`}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 px-5 py-3 border-b transition-colors duration-300
                       ${justPassed
                         ? 'bg-green-900/20 border-green-800/30'
                         : 'bg-indigo-900/30 border-indigo-800/30'
                       }`}>
        <CheckCircle className={`w-4 h-4 transition-colors duration-300
          ${justPassed ? 'text-green-400' : 'text-indigo-400'}`} />
        <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300
          ${justPassed ? 'text-green-300' : 'text-indigo-300'}`}>
          Checkpoint
        </span>
      </div>

      <div className="p-5">
        <p className="text-white font-medium mb-4 text-sm sm:text-base leading-relaxed">{question}</p>

        {/* Choices — shake on wrong answer */}
        <motion.div
          className="space-y-2"
          animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {choices.map((choice, i) => {
            const isSelected = selected === i
            const isCorrect  = i === correct
            const isWrong    = submitted && isSelected && !isCorrect

            let borderBg = 'border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/60'
            if (isSelected && !submitted) borderBg = 'border-indigo-500 bg-indigo-950/40'
            if (submitted && isCorrect)   borderBg = 'border-green-500/80 bg-green-950/25'
            if (isWrong)                  borderBg = 'border-red-500/60 bg-red-950/20'

            let badgeStyle = 'border-slate-600 text-slate-500'
            if (isSelected && !submitted) badgeStyle = 'border-indigo-400 text-indigo-300 bg-indigo-900/40'
            if (submitted && isCorrect)   badgeStyle = 'border-green-500 text-green-400 bg-green-900/30'
            if (isWrong)                  badgeStyle = 'border-red-500/60 text-red-400 bg-red-900/20'

            let textColor = 'text-slate-300'
            if (submitted && isCorrect)            textColor = 'text-green-300'
            if (isWrong)                           textColor = 'text-red-300/80'
            if (submitted && !isCorrect && !isWrong) textColor = 'text-slate-500'

            return (
              <motion.button
                key={i}
                disabled={submitted}
                onClick={() => !submitted && setSelected(i)}
                whileHover={!submitted ? { scale: 1.004 } : {}}
                whileTap={!submitted ? { scale: 0.996 } : {}}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150
                  ${borderBg}
                  ${submitted ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center
                                   text-xs font-bold flex-shrink-0 transition-colors ${badgeStyle}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`flex-1 transition-colors ${textColor}`}>{choice}</span>
                  {submitted && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />
                  )}
                  {isWrong && (
                    <XCircle className="w-4 h-4 text-red-400/80 ml-auto flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Action row */}
        <div className="mt-4 flex items-center gap-3 min-h-[36px]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.button
                key="check"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleSubmit}
                disabled={selected === null}
                className={`btn-primary text-sm ${selected === null ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Check answer
              </motion.button>
            ) : justPassed ? (
              <motion.div
                key="correct"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 text-sm font-semibold"
              >
                <CheckCircle className="w-4 h-4" />
                Exactly right. Continue below.
              </motion.div>
            ) : (
              <motion.div
                key="wrong"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <XCircle className="w-4 h-4" />
                  Not quite — try again.
                </div>
                <button
                  onClick={handleRetry}
                  className="text-xs text-indigo-400 hover:text-indigo-300
                             underline underline-offset-2 transition-colors"
                >
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
