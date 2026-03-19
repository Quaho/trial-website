import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { PROJECTS, PROJECT_STYLES } from '../lib/data/projects'
import { useProgress } from '../lib/hooks/useProgress'

const DEFAULT_STYLE = PROJECT_STYLES['first-circuit']

export default function ProjectLayout({
  projectId,
  title,
  tagline,
  steps,
  prevProject,
  nextProject,
}) {
  const { completed, markDone, markLessonPassed, getLessonPassed } = useProgress()
  const [liveMessage, setLiveMessage] = useState('')
  const [expandedSteps, setExpandedSteps] = useState({})

  const project = PROJECTS.find((item) => item.id === projectId)
  const style = PROJECT_STYLES[projectId] || DEFAULT_STYLE
  const progressKey = `project-${projectId}`
  const passed = getLessonPassed(progressKey, steps.length)
  const stepsDone = passed.filter(Boolean).length
  const progressPct = steps.length > 0 ? Math.round((stepsDone / steps.length) * 100) : 0

  useEffect(() => {
    if (steps.length > 0 && stepsDone === steps.length && !completed[progressKey]) {
      markDone(progressKey)
    }
  }, [completed, markDone, progressKey, steps.length, stepsDone])

  function handleStepComplete(index, stepTitle) {
    if (passed[index]) return

    markLessonPassed(progressKey, index)
    setExpandedSteps((prev) => ({ ...prev, [index]: false }))
    setLiveMessage(`Step ${index + 1}, ${stepTitle}, complete.`)
  }

  function toggleReview(index) {
    setExpandedSteps((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="min-h-screen"
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      <div className={`bg-gradient-to-b ${style.gradient} to-slate-950 border-b border-slate-800 py-10 sm:py-14`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white mb-6 transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Course Roadmap
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.badge}`}>
              Machine Project {project?.number ?? '—'}
            </span>
            {completed[progressKey] && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-800/40 bg-green-900/30 text-green-400">
                <CheckCircle className="w-3.5 h-3.5" />
                Complete
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 mt-2 max-w-2xl leading-relaxed">{tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ~{project?.estMin ?? 0} min
            </span>
            <span>{steps.length} steps</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Project progress</p>
              <p className="text-sm text-slate-300 mt-1">
                {stepsDone} of {steps.length} steps complete
              </p>
            </div>
            <p className={`text-sm font-semibold tabular-nums ${style.accent}`}>{progressPct}%</p>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${style.progressBar}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="space-y-0">
          {steps.map((step, index) => {
            const isComplete = passed[index]
            const isExpanded = !isComplete || expandedSteps[index]

            return (
              <div key={step.title} className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                      isComplete
                        ? 'bg-green-900/30 border-green-700/50 text-green-400'
                        : `${style.bg} ${style.border} ${style.accent}`
                    }`}
                  >
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && <div className="mt-3 w-px flex-1 bg-slate-700/60" />}
                </div>

                <motion.div
                  layout
                  className={`rounded-2xl border p-5 sm:p-6 mb-6 ${
                    isComplete
                      ? 'border-green-800/50 bg-green-950/10'
                      : 'border-slate-700/60 bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">Step {index + 1}</p>
                      <h2 className="text-xl font-bold text-white mt-1">{step.title}</h2>
                    </div>
                    {isComplete && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        Complete
                      </span>
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.98, height: 0 }}
                        animate={{ opacity: 1, scale: 1, height: 'auto' }}
                        exit={{ opacity: 0, scale: 0.98, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                          {step.content}

                          {isComplete ? (
                            <button
                              type="button"
                              onClick={() => toggleReview(index)}
                              className="btn-secondary text-sm"
                            >
                              Hide details
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleStepComplete(index, step.title)}
                              className="btn-primary text-sm"
                              aria-label={`Mark step ${index + 1} complete`}
                            >
                              Mark step complete
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isComplete && !isExpanded && (
                    <button
                      type="button"
                      onClick={() => toggleReview(index)}
                      className="btn-secondary text-sm mt-4"
                    >
                      Review step
                    </button>
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
          <Link to="/roadmap" className="btn-secondary">
            <ChevronLeft className="w-4 h-4" />
            Back to Roadmap
          </Link>

          {prevProject && (
            <Link to={prevProject.to} className="btn-secondary">
              <ChevronLeft className="w-4 h-4" />
              {prevProject.label}
            </Link>
          )}

          {nextProject && (
            <Link to={nextProject.to} className="btn-primary sm:ml-auto">
              {nextProject.label}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
