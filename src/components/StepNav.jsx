import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Within-module lesson navigator.
 * Props:
 *   steps      – number of lessons
 *   current    – current lesson index (0-based)
 *   passed     – array of booleans: whether each lesson's quiz has been passed
 *   onNext     – called when Next is clicked
 *   onPrev     – called when Prev is clicked
 *   onGoto     – called with index when a dot is clicked
 */
export default function StepNav({ steps, current, passed = [], onNext, onPrev, onGoto }) {
  const canGoNext = passed[current]
  const isLast = current === steps - 1
  const isFirst = current === 0

  return (
    <div className="flex flex-col items-center gap-4 py-6 border-t border-slate-800 mt-8">
      {/* Dot indicators */}
      <div className="flex items-center gap-2" role="tablist" aria-label="Lesson progress">
        {Array.from({ length: steps }, (_, i) => {
          const isDone = passed[i]
          const isCurrent = i === current
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Lesson ${i + 1}${isDone ? ' (completed)' : ''}`}
              onClick={() => {
                if (i <= current || passed[i - 1]) {
                  window.scrollTo(0, 0)
                  onGoto?.(i)
                }
              }}
              className={`rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400
                ${isCurrent
                  ? 'w-6 h-3 bg-indigo-500'
                  : isDone
                    ? 'w-3 h-3 bg-green-500 hover:bg-green-400 cursor-pointer'
                    : 'w-3 h-3 bg-slate-700 cursor-default'
                }
              `}
            />
          )
        })}
      </div>

      {/* Counter + Prev / Next */}
      <div className="flex items-center gap-3 w-full max-w-sm">
        <button
          onClick={() => { window.scrollTo(0, 0); onPrev?.() }}
          disabled={isFirst}
          className={`btn-secondary flex-shrink-0 px-3 py-2 text-sm ${isFirst ? 'opacity-30 cursor-not-allowed' : ''}`}
          aria-label="Previous lesson"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <span className="flex-1 text-center text-xs text-slate-500">
          Lesson {current + 1} of {steps}
        </span>

        {!isLast ? (
          <button
            onClick={() => { window.scrollTo(0, 0); onNext?.() }}
            disabled={!canGoNext}
            title={!canGoNext ? 'Answer the checkpoint to continue' : ''}
            className={`btn-primary flex-shrink-0 px-3 py-2 text-sm ${!canGoNext ? 'opacity-40 cursor-not-allowed' : ''}`}
            aria-label="Next lesson"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex-shrink-0 w-24" /> /* spacer to keep center aligned */
        )}
      </div>

      {!canGoNext && !isLast && (
        <p className="text-xs text-amber-500/70 text-center">
          Answer the checkpoint above to unlock the next lesson.
        </p>
      )}
    </div>
  )
}
