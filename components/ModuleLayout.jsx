import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '../lib/hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../lib/data/modules'

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
 *   outline    – optional [{ id, label }] for handbook chapter outline
 *   aside      – optional right-rail support content for handbook chapters
 *   children   – lesson content
 */
function OutlineNav({ sections, activeSection, compact = false }) {
  return (
    <nav aria-label="Page outline">
      <div className={`rounded-2xl border border-slate-800 bg-slate-900/60 ${compact ? 'p-4' : 'p-5'}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">On This Page</p>
        <ul className={`${compact ? 'mt-3 space-y-1.5' : 'mt-4 space-y-2'}`}>
          {sections.map((section, index) => {
            const isActive = section.id === activeSection
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-indigo-950/40 text-white'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                  }`}
                >
                  <span
                    className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                      isActive ? 'bg-indigo-400' : 'bg-slate-600 group-hover:bg-slate-400'
                    }`}
                  />
                  <span>
                    <span className="mr-1.5 font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                    {section.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default function ModuleLayout({ moduleId, title, subtitle, prev, next, stepInfo, outline = [], aside, children }) {
  const { completed, markDone } = useProgress()
  const [justCompleted, setJustCompleted] = useState(false)
  const [activeSection, setActiveSection] = useState(outline[0]?.id ?? null)
  const done = completed[moduleId]
  const style = MODULE_LAYOUT_STYLES[moduleId] || DEFAULT_STYLE
  const hasReadingRails = !stepInfo && (outline.length > 0 || aside)

  // Progress percentage for sticky header
  const lessonsDone = stepInfo?.passed?.filter(Boolean).length ?? 0
  const totalLessons = stepInfo?.total ?? 0
  const progressPct = totalLessons > 0 ? Math.round((lessonsDone / totalLessons) * 100) : 0
  const particles = [
    { x: 40, y: -20, color: 'bg-green-400' },
    { x: 18, y: -34, color: 'bg-emerald-400' },
    { x: -16, y: -30, color: 'bg-green-300' },
    { x: -34, y: -8, color: 'bg-emerald-300' },
    { x: -10, y: 24, color: 'bg-green-400' },
    { x: 28, y: 18, color: 'bg-emerald-500' },
  ]

  useEffect(() => {
    setActiveSection(outline[0]?.id ?? null)
  }, [outline])

  useEffect(() => {
    if (stepInfo || outline.length === 0 || typeof window === 'undefined') return

    const elements = outline
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)

    if (elements.length === 0) return

    let frameId = 0

    function updateActiveSection() {
      frameId = 0

      // Switch the outline when a section heading crosses a stable reading line
      // below the sticky header, rather than waiting for observer thresholds.
      const activationLine = Math.min(220, Math.max(136, window.innerHeight * 0.22))
      const active =
        elements.filter((element) => element.getBoundingClientRect().top <= activationLine).at(-1) || elements[0]

      setActiveSection((current) => (current === active.id ? current : active.id))
    }

    function queueActiveSectionUpdate() {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateActiveSection)
    }

    queueActiveSectionUpdate()
    window.addEventListener('scroll', queueActiveSectionUpdate, { passive: true })
    window.addEventListener('resize', queueActiveSectionUpdate)
    window.addEventListener('hashchange', queueActiveSectionUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', queueActiveSectionUpdate)
      window.removeEventListener('resize', queueActiveSectionUpdate)
      window.removeEventListener('hashchange', queueActiveSectionUpdate)
    }
  }, [outline, stepInfo])

  const heroContainerClass = hasReadingRails
    ? 'max-w-[88rem] mx-auto px-4 sm:px-6 xl:grid xl:grid-cols-[220px_minmax(0,1fr)_280px] xl:gap-8 relative'
    : 'max-w-3xl mx-auto px-4 sm:px-6 relative'

  const contentContainerClass = hasReadingRails
    ? 'max-w-[88rem] mx-auto px-4 sm:px-6 py-10 xl:grid xl:grid-cols-[220px_minmax(0,1fr)_280px] xl:gap-8'
    : 'max-w-3xl mx-auto px-4 sm:px-6 py-10'

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

        <div className={heroContainerClass}>
          {hasReadingRails && <div className="hidden xl:block" aria-hidden="true" />}

          <div className={hasReadingRails ? 'min-w-0 max-w-3xl xl:col-start-2' : ''}>
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

          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                              text-xs font-semibold border border-slate-700/50 bg-slate-800/40
                              ${style.accent}`}>
              Module {style.num}
            </span>
          </div>
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
      </div>

      {/* ── Sticky lesson-progress mini-header ──────────────────── */}
      {stepInfo && (
        <div className="sticky top-14 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800/80">
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {`Lesson ${stepInfo.current + 1} of ${stepInfo.total}`}
          </div>
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
      <div className={contentContainerClass}>
        {hasReadingRails && outline.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <OutlineNav sections={outline} activeSection={activeSection} />
            </div>
          </aside>
        )}

        <div className={hasReadingRails ? 'min-w-0 max-w-3xl xl:col-start-2' : ''}>
          {hasReadingRails && outline.length > 0 && (
            <details className="rounded-2xl border border-slate-800 bg-slate-900/60 xl:hidden">
              <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-slate-300 marker:content-none">
                On This Page
              </summary>
              <div className="border-t border-slate-800 px-4 pb-4">
                <OutlineNav sections={outline} activeSection={activeSection} compact />
              </div>
            </details>
          )}

          {children}

          {/* ── Module footer ──────────────────────────────────────── */}
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center">
            <div className="relative flex min-h-[40px] items-center">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.button
                    key="mark-complete"
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => { markDone(moduleId); setJustCompleted(true) }}
                    className="btn-primary focus-visible:outline focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Complete
                  </motion.button>
                ) : (
                  <motion.div
                    key="completed"
                    initial={justCompleted ? { opacity: 0, scale: 0.8 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={justCompleted ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0 }}
                    className="relative flex items-center gap-2 font-medium text-green-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Module complete.
                  </motion.div>
                )}
              </AnimatePresence>

              {justCompleted && done && (
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {particles.map((particle, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1,
                        x: particle.x,
                        y: particle.y,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`absolute top-1/2 left-4 h-2 w-2 rounded-full ${particle.color}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {next && (
              <Link to={next.to} className="btn-secondary sm:ml-auto">
                {next.label}
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {hasReadingRails && aside && (
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4">
              {aside}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
