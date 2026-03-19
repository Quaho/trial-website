import { Fragment } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Within-module lesson navigator: dot indicators + prev/next buttons.
 * Props:
 *   steps   – total number of lessons
 *   current – current lesson index (0-based)
 *   passed  – boolean[] — whether each lesson's quiz has been passed
 *   onNext  – called when Next is clicked
 *   onPrev  – called when Prev is clicked
 *   onGoto  – called with index when a dot is clicked
 */
export default function StepNav({ steps, current, passed = [], onNext, onPrev, onGoto }) {
  const canGoNext = passed[current]
  const isLast    = current === steps - 1
  const isFirst   = current === 0

  function scrollAndGo(fn) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    fn?.()
  }

  return (
    <div className="flex flex-col items-center gap-5 py-8 border-t border-slate-800 mt-8">

      {/* ── Dot indicators with connecting lines ──────────────────── */}
      <div
        className="flex items-center"
        role="navigation"
        aria-label="Lesson progress"
      >
        {Array.from({ length: steps }, (_, i) => {
          const isDone    = passed[i]
          const isCurrent = i === current
          const canNav    = i <= current || passed[i - 1]
          const isLocked  = !canNav

          return (
            <Fragment key={i}>
              <div className="relative group">
                <button
                  aria-label={`Lesson ${i + 1}${isDone ? ' (complete)' : isCurrent ? ' (current)' : ' (locked)'}`}
                  onClick={() => canNav && scrollAndGo(() => onGoto?.(i))}
                  className={`-m-2 p-2 box-content bg-clip-content rounded-full transition-all duration-200
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400
                    ${isCurrent
                      ? 'w-7 h-3 bg-indigo-400 cursor-pointer'
                      : isDone
                        ? 'w-3 h-3 bg-green-500 hover:bg-green-400 cursor-pointer'
                        : isLocked
                          ? 'w-3 h-3 bg-slate-700/60 cursor-default'
                          : 'w-3 h-3 bg-slate-700 cursor-default'
                    }`}
                />
                {/* Tooltip on locked dots */}
                {isLocked && (
                  <div
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                               px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg
                               text-xs text-slate-300 whitespace-normal max-w-[200px] text-center z-10
                               opacity-0 group-hover:opacity-100 transition-opacity duration-150
                               pointer-events-none"
                  >
                    Finish lesson {i} first
                  </div>
                )}
              </div>

              {/* Connecting line between dots */}
              {i < steps - 1 && (
                <div
                  className={`h-px w-5 flex-shrink-0 transition-colors duration-300
                    ${isDone ? 'bg-green-700/50' : 'bg-slate-700/50'}`}
                />
              )}
            </Fragment>
          )
        })}
      </div>

      {/* ── Prev · counter · Next ─────────────────────────────────── */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <button
          onClick={() => scrollAndGo(onPrev)}
          disabled={isFirst}
          aria-label="Previous lesson"
          className={`btn-secondary flex-shrink-0 px-3 py-2 text-sm
            ${isFirst ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <span className="flex-1 text-center text-xs text-slate-500 tabular-nums">
          {current + 1} / {steps}
        </span>

        {!isLast ? (
          <div className="relative group flex-shrink-0">
            <button
              onClick={() => scrollAndGo(onNext)}
              disabled={!canGoNext}
              aria-label={canGoNext ? 'Next lesson' : 'Answer the checkpoint to continue'}
              className={`btn-primary px-3 py-2 text-sm
                ${!canGoNext ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
            {!canGoNext && (
              <div
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                           px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg
                           text-xs text-slate-300 whitespace-normal max-w-[200px] text-center z-10
                           opacity-0 group-hover:opacity-100 transition-opacity duration-150
                           pointer-events-none"
              >
                Answer the checkpoint to continue
              </div>
            )}
          </div>
        ) : (
          <div className="flex-shrink-0 w-24" aria-hidden="true" />
        )}
      </div>

      {/* Hint below nav when locked */}
      {!canGoNext && !isLast && (
        <p className="text-xs text-amber-500/70 text-center">
          Answer the checkpoint above to unlock the next lesson.
        </p>
      )}
    </div>
  )
}
