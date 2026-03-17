import { Link } from 'react-router-dom'
import { ChevronLeft, Lock, CheckCircle, Clock, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { MODULES, MODULE_STYLES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'

/* ── Track groupings ──────────────────────────────────────────────── */
const TRACKS = [
  {
    key: 'foundations',
    label: 'Foundations',
    description: 'Build core intuition and notation',
    gradient: 'from-indigo-500 to-violet-500',
    dot: 'bg-indigo-500',
  },
  {
    key: 'circuits',
    label: 'Circuits & Entanglement',
    description: 'Gates, multi-qubit systems, and circuit diagrams',
    gradient: 'from-sky-500 to-teal-500',
    dot: 'bg-sky-500',
  },
  {
    key: 'advanced',
    label: 'Advanced Topics',
    description: 'Algorithms, labs, hardware, and real-world applications',
    gradient: 'from-amber-500 to-orange-500',
    dot: 'bg-amber-500',
  },
]

/* ── Framer Motion variants ───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

/* ── Component ────────────────────────────────────────────────────── */
export default function Roadmap() {
  const { completed, getLessonPassed } = useProgress()

  function getModuleStatus(m) {
    if (completed[m.id]) return 'completed'
    const isLocked = m.prereqs.length > 0 && !m.prereqs.every(id => completed[id])
    if (isLocked) return 'locked'
    return 'unlocked'
  }

  function getPrereqNames(m) {
    return m.prereqs.map(id => {
      const found = MODULES.find(mod => mod.id === id)
      return found ? found.title : id
    })
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px]
                          bg-indigo-600/6 rounded-full blur-3xl orb-float" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px]
                          bg-violet-600/5 rounded-full blur-3xl orb-float-slow" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400
                       hover:text-slate-200 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3"
            >
              Course{' '}
              <span className="gradient-text">Roadmap</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl"
            >
              See how all 13 modules connect. Complete prerequisites to unlock the next step.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Tracks ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="space-y-12">
          {TRACKS.map((track, trackIdx) => {
            const trackModules = MODULES.filter(m => m.group === track.key)

            return (
              <motion.div
                key={track.key}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger}
              >
                {/* Track header */}
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full ${track.dot} flex-shrink-0`} />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {track.label}
                    </h2>
                    <p className="text-sm text-slate-400">{track.description}</p>
                  </div>
                </motion.div>

                {/* Module cards with connecting line */}
                <div className="relative ml-1.5 pl-8 border-l-2 border-slate-800 space-y-4">
                  {trackModules.map((m, i) => {
                    const status = getModuleStatus(m)
                    const styles = MODULE_STYLES[m.id]
                    const Icon = m.icon
                    const passed = getLessonPassed(m.id, m.lessons)
                    const lessonsDone = passed.filter(Boolean).length
                    const prereqNames = getPrereqNames(m)

                    return (
                      <motion.div key={m.id} variants={fadeUp}>
                        {/* Dot on the connecting line */}
                        <div className="absolute -left-[5px]" style={{ marginTop: '1.25rem' }}>
                          {status === 'completed' ? (
                            <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-slate-950" />
                          ) : status === 'locked' ? (
                            <div className="w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-950" />
                          ) : (
                            <div className={`w-3 h-3 rounded-full ring-4 ring-slate-950 ${styles.progressBar}`} />
                          )}
                        </div>

                        {/* Card */}
                        {status === 'locked' ? (
                          <div
                            className="rounded-2xl border border-slate-800 bg-slate-900/20
                                       opacity-50 p-5"
                          >
                            <CardContent
                              m={m}
                              styles={styles}
                              Icon={Icon}
                              status={status}
                              lessonsDone={lessonsDone}
                              prereqNames={prereqNames}
                            />
                          </div>
                        ) : (
                          <Link
                            to={m.to}
                            className={`block rounded-2xl border border-l-4 p-5
                              transition-all duration-200
                              ${status === 'completed'
                                ? 'border-green-800/40 border-l-green-500/70 bg-green-950/10 hover:border-green-700/50'
                                : `border-slate-700/60 bg-slate-900/40 ${styles.leftBorder} ${styles.hover} hover:shadow-lg hover:shadow-black/20`
                              }`}
                          >
                            <CardContent
                              m={m}
                              styles={styles}
                              Icon={Icon}
                              status={status}
                              lessonsDone={lessonsDone}
                              prereqNames={prereqNames}
                            />
                          </Link>
                        )}

                        {/* Arrow connector between cards (except last in track) */}
                        {i < trackModules.length - 1 && (
                          <div className="flex justify-center py-1">
                            <ArrowDown className="w-4 h-4 text-slate-700" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {/* Arrow between tracks */}
                {trackIdx < TRACKS.length - 1 && (
                  <div className="flex justify-center pt-6 pb-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-6 bg-slate-700/60" />
                      <ArrowDown className="w-5 h-5 text-slate-600" />
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

/* ── Card content (shared between locked / linked cards) ──────────── */
function CardContent({ m, styles, Icon, status, lessonsDone, prereqNames }) {
  return (
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0
          ${status === 'completed'
            ? 'bg-green-900/40 border-green-700/50'
            : status === 'locked'
              ? 'bg-slate-800/60 border-slate-700/40'
              : styles.icon
          }`}
      >
        {status === 'completed' ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : status === 'locked' ? (
          <Lock className="w-4 h-4 text-slate-500" />
        ) : (
          <Icon className={`w-5 h-5 ${styles.iconText}`} />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-xs text-slate-500 font-medium">Module {m.number}</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            ~{m.estMin} min
          </span>
          {status === 'completed' && (
            <span className="badge bg-green-900/40 text-green-400 border border-green-800/40 text-xs py-0.5">
              Complete
            </span>
          )}
          {status === 'unlocked' && lessonsDone > 0 && (
            <span className={`badge text-xs py-0.5 border ${styles.badge}`}>
              {lessonsDone}/{m.lessons} lessons
            </span>
          )}
        </div>

        <h3 className="font-semibold text-white text-[0.95rem] leading-snug mb-1">
          {m.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-2">
          {m.tagline}
        </p>

        {/* Prerequisite labels */}
        {prereqNames.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {prereqNames.map(name => (
              <span
                key={name}
                className="text-xs px-2 py-0.5 rounded-full border
                           bg-slate-800/60 text-slate-500 border-slate-700/40"
              >
                Requires: {name}
              </span>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {status === 'unlocked' && lessonsDone > 0 && (
          <div className="mt-2.5 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
              style={{ width: `${(lessonsDone / m.lessons) * 100}%` }}
            />
          </div>
        )}
        {status === 'completed' && (
          <div className="mt-2.5 h-1 bg-green-500/50 rounded-full" />
        )}
      </div>
    </div>
  )
}
