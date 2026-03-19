import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Atom, ArrowRight, CheckCircle, Lock, ChevronRight,
  Lightbulb, Eye, AlignLeft, FlaskConical, Brain, Target,
} from 'lucide-react'
import { useProgress } from '../../lib/hooks/useProgress'
import { MODULES, MODULE_STYLES, TOTAL_LESSONS } from '../../lib/data/modules'

/* ── Framer Motion variants ─────────────────────────────────────────── */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* ── How it works steps ─────────────────────────────────────────────── */
const STEPS = [
  { icon: Lightbulb,   label: 'Key Idea',       color: 'text-amber-400',  bg: 'bg-amber-900/30 border-amber-800/40' },
  { icon: Eye,         label: 'Visual First',    color: 'text-sky-400',    bg: 'bg-sky-900/30 border-sky-800/40' },
  { icon: AlignLeft,   label: '3-Line Explain',  color: 'text-indigo-400', bg: 'bg-indigo-900/30 border-indigo-800/40' },
  { icon: FlaskConical,label: 'Worked Example',  color: 'text-violet-400', bg: 'bg-violet-900/30 border-violet-800/40' },
  { icon: CheckCircle, label: 'Checkpoint Quiz', color: 'text-green-400',  bg: 'bg-green-900/30 border-green-800/40' },
]

/* ── Component ──────────────────────────────────────────────────────── */
export default function Home() {
  const { completed, getLessonPassed } = useProgress()

  const lessonsDone = MODULES.reduce((sum, m) => {
    return sum + getLessonPassed(m.id, m.lessons).filter(Boolean).length
  }, 0)
  const pct = Math.round((lessonsDone / TOTAL_LESSONS) * 100)
  const nextModule = MODULES.find(m => !completed[m.id])

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Layered orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px]
                          bg-indigo-600/8 rounded-full blur-3xl orb-float" />
          <div className="absolute top-1/3 right-1/6 w-[320px] h-[320px]
                          bg-violet-600/6 rounded-full blur-3xl orb-float-slow" />
          <div className="absolute bottom-1/4 left-1/3 w-[260px] h-[260px]
                          bg-fuchsia-600/5 rounded-full blur-3xl orb-float-alt" />
        </div>

        <motion.div
          className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroItem}>
            <div className="inline-flex items-center gap-2 badge bg-indigo-900/40 text-indigo-300
                            border border-indigo-800/50 mb-6">
              <Atom className="w-3.5 h-3.5" />
              Free · Visual · Beginner-Friendly
            </div>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight"
          >
            Learn{' '}
            <span className="gradient-text">Quantum Computing</span>
            <br className="hidden sm:block" />
            {' '}from scratch
          </motion.h1>

          <motion.p variants={heroItem} className="text-base sm:text-lg text-slate-400 mb-5 max-w-xl mx-auto leading-relaxed">
            {MODULES.length} modules · {TOTAL_LESSONS} bite-sized lessons · interactive diagrams · checkpoints
          </motion.p>

          {/* Progress bar if started */}
          {lessonsDone > 0 && (
            <motion.div variants={heroItem} className="max-w-xs mx-auto mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>{lessonsDone}/{TOTAL_LESSONS} lessons done</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}

          <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-3 justify-center">
            {lessonsDone === 0 ? (
              <Link to="/intuition" className="btn-primary text-base px-7 py-3 group">
                Start Learning
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            ) : nextModule ? (
              <>
                <Link to={nextModule.to} className="btn-primary text-base px-7 py-3 group min-w-0 max-w-full sm:max-w-none">
                  <span className="truncate">Continue — {nextModule.title}</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
                <Link to="/intuition" className="btn-secondary text-base px-7 py-3">
                  Start over
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-400 font-semibold text-base justify-center">
                <CheckCircle className="w-5 h-5" />
                Course Complete!
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ── How each lesson works ─────────────────────────────────── */}
      <section className="border-y border-slate-800 bg-slate-900/30 py-12 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-center section-label mb-8">How each lesson works</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            {STEPS.map(({ icon: Icon, label, color, bg }, i) => (
              <Fragment key={label}>
                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 w-full sm:w-auto text-center sm:text-center">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <p className={`text-xs font-semibold ${color} sm:mt-0`}>{i + 1}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block w-8 h-px bg-slate-700/60 flex-shrink-0 mx-1" />
                )}
                {i < STEPS.length - 1 && (
                  <div className="sm:hidden w-px h-4 bg-slate-700/60 flex-shrink-0" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course modules ────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Course Modules</h2>
        <p className="text-slate-400 text-sm mb-8">Complete in order. Each module unlocks the next.</p>

        <div className="space-y-4">
          {MODULES.map((m, idx) => {
            const isDone = !!completed[m.id]
            const passed = getLessonPassed(m.id, m.lessons)
            const lessonCount = passed.filter(Boolean).length
            const isLocked = m.prereqs.length > 0 && !m.prereqs.every(id => completed[id])
            const Icon = m.icon
            const styles = MODULE_STYLES[m.id]
            const CardWrapper = isLocked ? 'div' : Link
            const cardProps = isLocked ? {} : { to: m.to }

            const leftBorderClass = isDone
              ? 'border-l-green-500/70'
              : isLocked
                ? 'border-l-slate-700/40'
                : styles.leftBorder

            return (
              <CardWrapper
                key={m.id}
                {...cardProps}
                className={`rounded-2xl border border-l-4 overflow-hidden transition-all duration-200 relative
                  block
                  ${leftBorderClass}
                  ${isDone
                    ? 'border-green-800/40 bg-green-950/10'
                    : isLocked
                      ? 'border-slate-800 bg-slate-900/20 opacity-50'
                      : `border-slate-700/60 bg-slate-900/40 cursor-pointer ${styles.hover} hover:shadow-lg hover:shadow-black/20
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`
                  }`}
              >
                {/* Watermark module number */}
                {!isLocked && (
                  <div
                    aria-hidden="true"
                    className={`absolute top-1 right-3 text-[4.5rem] font-black leading-none
                                select-none pointer-events-none
                                ${isDone ? 'text-green-900/25' : styles.watermark}`}
                  >
                    {styles.num}
                  </div>
                )}

                <div className="p-5 relative">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0
                      ${isDone
                        ? 'bg-green-900/40 border-green-700/50'
                        : isLocked
                          ? 'bg-slate-800/60 border-slate-700/40'
                          : styles.icon
                      }`}>
                      {isDone
                        ? <CheckCircle className="w-5 h-5 text-green-400" />
                        : isLocked
                          ? <Lock className="w-4 h-4 text-slate-500" />
                          : <Icon className={`w-5 h-5 ${styles.iconText}`} />
                      }
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <span className="text-xs text-slate-500 font-medium">Module {m.number}</span>
                        {isDone && (
                          <span className="badge bg-green-900/40 text-green-400 border border-green-800/40 text-xs py-0.5">
                            Complete
                          </span>
                        )}
                        {!isDone && !isLocked && lessonCount > 0 && (
                          <span className={`badge text-xs py-0.5 border ${styles.badge}`}>
                            {lessonCount}/{m.lessons} lessons
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-white mb-2.5 text-[0.95rem] leading-snug">{m.title}</h3>

                      {/* Topic pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {m.topics.map((t, ti) => (
                          <span key={t}
                            className={`text-xs px-2 py-0.5 rounded-full border
                              ${ti < lessonCount && !isDone
                                ? styles.badge
                                : isDone
                                  ? 'bg-green-900/30 text-green-400 border-green-800/30'
                                  : 'bg-slate-800/60 text-slate-500 border-slate-700/40'
                              }`}>
                            {(isDone || ti < lessonCount) ? '✓ ' : ''}{t}
                          </span>
                        ))}
                      </div>

                      {/* Progress bar within module card */}
                      {!isDone && lessonCount > 0 && (
                        <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
                            style={{ width: `${(lessonCount / m.lessons) * 100}%` }}
                          />
                        </div>
                      )}
                      {isDone && (
                        <div className="mt-3 h-1 bg-green-500/50 rounded-full" />
                      )}
                    </div>

                    {/* CTA */}
                    {!isLocked && (
                      <span
                        className={`flex-shrink-0 flex items-center gap-1 text-sm font-medium
                                    transition-colors self-start mt-0.5
                                    ${isDone ? 'text-slate-500 hover:text-slate-300' : styles.link}`}
                      >
                        {isDone ? 'Review' : lessonCount > 0 ? 'Continue' : 'Start'}
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </section>

      {/* ── Built for beginners ───────────────────────────────────── */}
      <section className="bg-slate-900/40 border-t border-slate-800 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white mb-8 text-center tracking-tight">Built for beginners</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Brain,
                iconBg:   'bg-indigo-900/40 border-indigo-800/50',
                iconText: 'text-indigo-400',
                title: 'Intuition First',
                desc: 'Analogies before equations. You always understand the "why" before seeing the math.',
              },
              {
                icon: Target,
                iconBg:   'bg-violet-900/40 border-violet-800/50',
                iconText: 'text-violet-400',
                title: 'One Idea at a Time',
                desc: 'Each lesson is exactly one concept. No information overload, ever.',
              },
              {
                icon: CheckCircle,
                iconBg:   'bg-green-900/40 border-green-800/50',
                iconText: 'text-green-400',
                title: 'Checkpoints',
                desc: 'A quick quiz after every lesson confirms you understood before moving on.',
              },
            ].map(({ icon: Icon, iconBg, iconText, title, desc }) => (
              <div key={title} className="card text-center">
                <div className={`w-11 h-11 rounded-xl border mx-auto mb-3 flex items-center justify-center ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconText}`} />
                </div>
                <h3 className="font-semibold text-white mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-600">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Atom className="w-4 h-4 text-indigo-600" />
          <span className="font-medium text-slate-500">QuantumLeap</span>
        </div>
        <p>Free · Open · No physics degree required</p>
      </footer>
    </div>
  )
}
