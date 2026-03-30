import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ChevronLeft, Circle } from 'lucide-react'
import { MODULES } from '../../lib/data/modules'
import { PROJECTS } from '../../lib/data/projects'
import { useProgress } from '../../lib/hooks/useProgress'

const STUDY_PATHS = [
  {
    id: 'path-a',
    label: 'Path A',
    title: 'CS student with Python background',
    description:
      'You already write code comfortably and want the shortest route to notation, circuit reasoning, and basic Qiskit workflow.',
    moduleIds: ['intuition', 'braket', 'phase', 'gates', 'measurement', 'qiskit'],
    focus: [
      'Build the conceptual model before introducing linear-algebra notation.',
      'Learn how amplitudes, basis choice, and gates connect to code you will later write in Qiskit.',
      'Use Circuits and Labs as the next layer once the core sequence feels stable.',
    ],
    continuationIds: ['circuits', 'labs'],
    projectId: 'first-circuit',
    accent: 'indigo',
  },
  {
    id: 'path-b',
    label: 'Path B',
    title: 'Physics student with stronger theory background',
    description:
      'You are comfortable with quantum ideas conceptually, but you want a cleaner route into Dirac notation, measurement language, and circuit workflow.',
    moduleIds: ['braket', 'phase', 'measurement', 'circuits', 'qiskit'],
    focus: [
      'Start with notation and basis language so later circuit material reads naturally.',
      'Treat Measurement and Circuits as the bridge between formalism and operational reasoning.',
      'Use Intuition only as a review pass if the basic motivation is still fuzzy.',
    ],
    continuationIds: ['multiqubit', 'entanglement', 'labs'],
    projectId: 'bell-explorer',
    accent: 'teal',
  },
  {
    id: 'path-c',
    label: 'Path C',
    title: 'New to both notation and implementation',
    description:
      'You want the most careful sequence, with fewer jumps in abstraction and more time spent on states, gates, and basis changes.',
    moduleIds: ['intuition', 'braket', 'phase', 'gates', 'multiqubit', 'measurement', 'qiskit'],
    focus: [
      'Do not skip the notation pages; they remove most of the friction from later modules.',
      'Take Gates and Multi-Qubit Systems before deeper circuit reading so the symbols stay grounded.',
      'Move to Entanglement and Circuits only after the measurement rules feel routine.',
    ],
    continuationIds: ['entanglement', 'circuits', 'first-circuit'],
    projectId: 'first-circuit',
    accent: 'violet',
  },
]

const TOPIC_GROUPS = [
  {
    title: 'Foundations',
    group: 'foundations',
    description: 'Core intuition, notation, phase, and the first programming workflow.',
  },
  {
    title: 'Gates & Circuits',
    group: 'circuits',
    description: 'Single-qubit gates, multi-qubit structure, entanglement, and circuit reading.',
  },
  {
    title: 'Advanced',
    group: 'advanced',
    description: 'Measurement practice, algorithms, labs, hardware limits, and application framing.',
  },
]

function getAccentClasses(accent) {
  if (accent === 'teal') {
    return {
      border: 'border-teal-800/40',
      badge: 'border-teal-800/50 bg-teal-950/40 text-teal-300',
      number: 'border-teal-700/50 bg-teal-950/50 text-teal-300',
      link: 'text-teal-400 hover:text-teal-300',
      pill: 'border-teal-800/40 bg-teal-950/30 text-teal-300',
    }
  }

  if (accent === 'violet') {
    return {
      border: 'border-violet-800/40',
      badge: 'border-violet-800/50 bg-violet-950/40 text-violet-300',
      number: 'border-violet-700/50 bg-violet-950/50 text-violet-300',
      link: 'text-violet-400 hover:text-violet-300',
      pill: 'border-violet-800/40 bg-violet-950/30 text-violet-300',
    }
  }

  return {
    border: 'border-indigo-800/40',
    badge: 'border-indigo-800/50 bg-indigo-950/40 text-indigo-300',
    number: 'border-indigo-700/50 bg-indigo-950/50 text-indigo-300',
    link: 'text-indigo-400 hover:text-indigo-300',
    pill: 'border-indigo-800/40 bg-indigo-950/30 text-indigo-300',
  }
}

function findModule(moduleId) {
  return MODULES.find((module) => module.id === moduleId) || null
}

export default function Roadmap() {
  const { completed, getLessonPassed } = useProgress()

  function getModuleProgress(module) {
    const lessonsDone = getLessonPassed(module.id, module.lessons).filter(Boolean).length

    if (completed[module.id]) {
      return {
        label: 'Complete',
        className: 'border-green-800/40 bg-green-950/30 text-green-300',
        complete: true,
      }
    }

    if (lessonsDone > 0) {
      return {
        label: `${lessonsDone}/${module.lessons} lessons`,
        className: 'border-slate-700/60 bg-slate-950/70 text-slate-300',
        complete: false,
      }
    }

    return {
      label: `~${module.estMin} min`,
      className: 'border-slate-700/60 bg-slate-950/70 text-slate-400',
      complete: false,
    }
  }

  function getProjectStatus(project) {
    const projectKey = `project-${project.id}`
    const ready = project.prereqs.every((moduleId) => completed[moduleId])

    if (completed[projectKey]) {
      return {
        label: 'Complete',
        className: 'border-green-800/40 bg-green-950/30 text-green-300',
      }
    }

    if (ready) {
      return {
        label: 'Ready to start',
        className: 'border-slate-700/60 bg-slate-950/70 text-slate-300',
      }
    }

    return {
      label: 'Preparation recommended',
      className: 'border-slate-700/60 bg-slate-950/70 text-slate-400',
    }
  }

  return (
    <div className="min-h-screen">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="section-label">Preparation Routes</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Study Paths
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Choose a route based on your background, not on arbitrary gating. These paths are
              meant to reduce uncertainty: what to study first, what notation to learn early, and
              which modules matter before you join technical work in SIGQuantum.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Use the path as a default',
              body: 'If you are unsure where to begin, follow one path in order rather than sampling pages randomly.',
            },
            {
              title: 'Review selectively when needed',
              body: 'If a page feels obvious, skim it and keep moving. The goal is readiness, not perfect linear completion.',
            },
            {
              title: 'Keep glossary and references open',
              body: 'Notation pages become much easier when you cross-check symbols and external references as you go.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h2 className="text-base font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
        <div className="space-y-8">
          {STUDY_PATHS.map((path) => {
            const accent = getAccentClasses(path.accent)
            const project = PROJECTS.find((item) => item.id === path.projectId) || null

            return (
              <article
                key={path.id}
                className={`rounded-2xl border bg-slate-900/50 p-6 sm:p-7 ${accent.border}`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${accent.badge}`}>
                      {path.label}
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-white tracking-tight">{path.title}</h2>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{path.description}</p>
                  </div>

                  {project && (
                    <Link
                      to={project.to}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${accent.link}
                                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded`}
                    >
                      Recommended project
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                <ol className="mt-6 space-y-3">
                  {path.moduleIds.map((moduleId, index) => {
                    const module = findModule(moduleId)

                    if (!module) return null

                    const progress = getModuleProgress(module)

                    return (
                      <li key={module.id}>
                        <Link
                          to={module.to}
                          className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700
                                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                        >
                          <span className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${accent.number}`}>
                            {index + 1}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-white group-hover:text-slate-100">{module.title}</h3>
                              <span className={`rounded-full border px-2.5 py-1 text-xs ${progress.className}`}>
                                {progress.label}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-400 leading-relaxed">{module.tagline}</p>
                          </div>

                          {progress.complete ? (
                            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-400" />
                          ) : (
                            <Circle className="mt-1 h-4 w-4 flex-shrink-0 text-slate-600" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ol>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                    <p className="section-label">Why this path</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed">
                      {path.focus.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 text-slate-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                    <p className="section-label">Continue After the Core Sequence</p>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      Once this path feels comfortable, continue into the next topic cluster or use
                      the linked machine project to turn the notation into active problem solving.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {path.continuationIds.map((itemId) => {
                        const module = findModule(itemId)
                        const continuationProject = PROJECTS.find((projectItem) => projectItem.id === itemId)

                        if (module) {
                          return (
                            <Link
                              key={module.id}
                              to={module.to}
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${accent.pill}`}
                            >
                              {module.title}
                            </Link>
                          )
                        }

                        if (continuationProject) {
                          return (
                            <Link
                              key={continuationProject.id}
                              to={continuationProject.to}
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${accent.pill}`}
                            >
                              {continuationProject.title}
                            </Link>
                          )
                        }

                        return null
                      })}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
        <div className="border-t border-slate-800 pt-14">
          <h2 className="text-2xl font-bold text-white tracking-tight">Full Handbook Map</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-400 leading-relaxed">
            If you prefer to study by topic instead of background, use the full map below. The
            grouping reflects how the handbook is organized, not a hard lock order.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {TOPIC_GROUPS.map((group) => (
              <section
                key={group.group}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{group.description}</p>

                <div className="mt-4 space-y-3">
                  {MODULES.filter((module) => module.group === group.group).map((module) => {
                    const progress = getModuleProgress(module)

                    return (
                      <Link
                        key={module.id}
                        to={module.to}
                        className="block rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition-colors hover:border-slate-700
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-slate-500">Module {module.number}</span>
                          <span className={`rounded-full border px-2.5 py-1 text-xs ${progress.className}`}>
                            {progress.label}
                          </span>
                        </div>
                        <h4 className="mt-2 font-semibold text-white">{module.title}</h4>
                        <p className="mt-1 text-sm text-slate-400 leading-relaxed">{module.tagline}</p>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="border-t border-slate-800 pt-14">
          <h2 className="text-2xl font-bold text-white tracking-tight">Machine Projects</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-400 leading-relaxed">
            Projects are best treated as consolidation, not as a first contact with the material.
            Use the prerequisite lists to decide when a project will be productive.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {PROJECTS.map((project) => {
              const status = getProjectStatus(project)

              return (
                <Link
                  key={project.id}
                  to={project.to}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Machine Project {project.number}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{project.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.prereqs.map((moduleId) => {
                      const module = findModule(moduleId)

                      return (
                        <span
                          key={moduleId}
                          className="rounded-full border border-slate-700/60 bg-slate-950/70 px-3 py-1 text-xs text-slate-400"
                        >
                          {module?.title || moduleId}
                        </span>
                      )
                    })}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
