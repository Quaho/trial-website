import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../data/modules'

const DEFAULT_STYLE = {
  num: '00',
  gradient: 'from-indigo-950/70 via-indigo-950/20',
  accent: 'text-indigo-400',
  dotCurrent: 'bg-indigo-400',
  dotDone: 'bg-green-500',
  dotEmpty: 'bg-slate-700',
}

/**
 * Props:
 *   moduleId   – string key for useProgress + style lookup
 *   title      – module title
 *   subtitle   – short tagline shown in the hero
 *   prev       – { to, label } optional back link
 *   next       – { to, label } optional next module link
 *   stepInfo   – optional { current: number, total: number, passed: boolean[] }
 *   children   – lesson content
 */
export default function ModuleLayout({ moduleId, title, subtitle, prev, next, stepInfo, children }) {
  const { completed, markDone } = useProgress()
  const done = completed[moduleId]
  const style = MODULE_LAYOUT_STYLES[moduleId] || DEFAULT_STYLE

  // Progress percentage for sticky header
  const lessonsDone = stepInfo?.passed?.filter(Boolean).length ?? 0
  const totalLessons = stepInfo?.total ?? 0
  const progressPct = totalLessons > 0 ? Math.round((lessonsDone / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen">

      {/* ── Module hero ─────────────────────────────────────────── */}
      <div className={`bg-gradient-to-b ${style.gradient} to-slate-950
                       border-b border-slate-800 py-10 sm:py-14 relative overflow-hidden`}>

        {/* Decorative module number watermark */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-4 sm:right-8 text-[7rem] sm:text-[9rem] font-black
                     text-white/[0.025] leading-none select-none pointer-events-none"
        >
          {style.num}
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
          {prev && (
            <Link
              to={prev.to}
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white
                         mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {prev.label}
            </Link>
          )}

          {/* Module number badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                           text-xs font-semibold border border-slate-700/50 bg-slate-800/40 mb-3
                           ${style.accent}`}>
            Module {style.num}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-400 text-base leading-relaxed">{subtitle}</p>}

          {/* Lesson count badge */}
          {totalLessons > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <span>{totalLessons} lessons</span>
              {lessonsDone > 0 && !done && (
                <>
                  <span className="text-slate-700">·</span>
                  <span className={style.accent}>{lessonsDone} complete</span>
                </>
              )}
              {done && (
                <>
                  <span className="text-slate-700">·</span>
                  <span className="text-green-400">All complete</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky lesson-progress mini-header ──────────────────── */}
      {stepInfo && (
        <div className="sticky top-14 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400 truncate mr-3 max-w-[180px] sm:max-w-none">
              {title}
            </span>
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Lesson counter */}
              <span className="text-xs text-slate-500 hidden sm:inline tabular-nums">
                {stepInfo.current + 1} / {stepInfo.total}
              </span>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5" aria-label="Lesson progress">
                {Array.from({ length: stepInfo.total }).map((_, i) => {
                  const isComplete = stepInfo.passed?.[i]
                  const isCurrent  = i === stepInfo.current
                  return (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-200
                        ${isComplete
                          ? `w-1.5 h-1.5 ${style.dotDone}`
                          : isCurrent
                            ? `w-4 h-1.5 ${style.dotCurrent}`
                            : `w-1.5 h-1.5 ${style.dotEmpty}`
                        }`}
                    />
                  )
                })}
              </div>

              {/* Progress percentage */}
              {progressPct > 0 && (
                <span className={`text-xs font-medium tabular-nums hidden sm:inline ${style.accent}`}>
                  {progressPct}%
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Page content ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {children}

        {/* ── Module footer ──────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {!done ? (
            <button
              onClick={() => markDone(moduleId)}
              className="btn-primary focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Complete
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle className="w-5 h-5" />
              Module complete.
            </div>
          )}

          {next && (
            <Link to={next.to} className="btn-secondary sm:ml-auto">
              {next.label}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
