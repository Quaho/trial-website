import { Link } from 'react-router-dom'
import { Atom, Zap, BookOpen, GitBranch, Code2, ArrowRight, CheckCircle, Lock, ChevronRight } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

const MODULES = [
  {
    id: 'intuition',
    to: '/intuition',
    icon: Zap,
    number: 1,
    title: 'Big-Picture Intuition',
    lessons: 5,
    topics: ['Bits vs qubits', 'Superposition', 'Measurement collapse', 'Interference', 'Why QC matters'],
    color: 'indigo',
  },
  {
    id: 'braket',
    to: '/braket',
    icon: BookOpen,
    number: 2,
    title: 'Bra-Ket Notation',
    lessons: 4,
    topics: ['Kets |ψ⟩', 'State explorer', 'Bras ⟨ψ|', 'Inner products'],
    color: 'violet',
  },
  {
    id: 'phase',
    to: '/phase',
    icon: GitBranch,
    number: 3,
    title: 'Phase & Measurement Angles',
    lessons: 5,
    topics: ['What is phase?', 'Unit circle explorer', 'Bloch sphere', 'Measurement bases', 'Real algorithms'],
    color: 'purple',
  },
  {
    id: 'qiskit',
    to: '/qiskit',
    icon: Code2,
    number: 4,
    title: 'Qiskit',
    lessons: 5,
    topics: ['What is Qiskit?', 'First circuit', 'Essential gates', 'Bell state', 'Next steps'],
    color: 'fuchsia',
  },
]

const TOTAL_LESSONS = MODULES.reduce((sum, m) => sum + m.lessons, 0)

export default function Home() {
  const { completed, count, total, getLessonPassed } = useProgress()

  // Calculate total lessons done across all modules
  const lessonsDone = MODULES.reduce((sum, m) => {
    const passed = getLessonPassed(m.id, m.lessons).filter(Boolean).length
    return sum + passed
  }, 0)
  const pct = Math.round((lessonsDone / TOTAL_LESSONS) * 100)

  // Find first incomplete module to "continue"
  const nextModule = MODULES.find(m => !completed[m.id])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 badge bg-indigo-900/40 text-indigo-300
                          border border-indigo-800/50 mb-6">
            <Atom className="w-3.5 h-3.5" />
            Free · Visual · Beginner-Friendly
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
            Learn Quantum Computing
            <span className="text-indigo-400"> from scratch</span>
          </h1>

          <p className="text-lg text-slate-400 mb-4 max-w-xl mx-auto leading-relaxed">
            {MODULES.length} modules · {TOTAL_LESSONS} bite-sized lessons · interactive diagrams · checkpoints
          </p>

          {/* Progress bar if started */}
          {lessonsDone > 0 && (
            <div className="max-w-xs mx-auto mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>{lessonsDone}/{TOTAL_LESSONS} lessons</span>
                <span>{pct}% complete</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                     style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {lessonsDone === 0 ? (
              <Link to="/intuition" className="btn-primary text-base px-8 py-3">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : nextModule ? (
              <>
                <Link to={nextModule.to} className="btn-primary text-base px-8 py-3">
                  Continue — {nextModule.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/intuition" className="btn-secondary text-base px-8 py-3">
                  Start over
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-400 font-semibold text-base justify-center">
                <CheckCircle className="w-5 h-5" />
                Course Complete! 🎉
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800 bg-slate-900/30 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-slate-500 uppercase tracking-widest mb-8 font-medium">
            How each lesson works
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            {[
              { icon: '💡', label: 'One Key Idea' },
              { icon: '🎨', label: 'Visual First' },
              { icon: '📖', label: '3-Line Explanation' },
              { icon: '🔍', label: 'Worked Example' },
              { icon: '✅', label: 'Checkpoint Quiz' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 py-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-slate-400 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course modules */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-1">Course Modules</h2>
        <p className="text-slate-400 text-sm mb-8">Complete in order. Each module unlocks the next.</p>

        <div className="space-y-4">
          {MODULES.map((m, idx) => {
            const isDone = !!completed[m.id]
            const passed = getLessonPassed(m.id, m.lessons)
            const lessonCount = passed.filter(Boolean).length
            const isLocked = idx > 0 && !completed[MODULES[idx - 1].id]
            const Icon = m.icon

            return (
              <div key={m.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden
                  ${isDone
                    ? 'border-green-800/40 bg-green-950/10'
                    : isLocked
                      ? 'border-slate-800 bg-slate-900/20 opacity-50'
                      : 'border-slate-700/60 bg-slate-900/40 hover:border-indigo-700/50'
                  }`}>
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${isDone
                        ? 'bg-green-900/40 border border-green-700/50'
                        : `bg-${m.color}-900/40 border border-${m.color}-700/50`
                      }`}>
                      {isDone
                        ? <CheckCircle className="w-6 h-6 text-green-400" />
                        : isLocked
                          ? <Lock className="w-5 h-5 text-slate-500" />
                          : <Icon className={`w-6 h-6 text-${m.color}-400`} />
                      }
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <span className="text-xs text-slate-500 font-medium">Module {m.number}</span>
                        {isDone && (
                          <span className="badge bg-green-900/40 text-green-400 text-xs">Complete</span>
                        )}
                        {!isDone && !isLocked && lessonCount > 0 && (
                          <span className={`badge bg-${m.color}-900/40 text-${m.color}-300 text-xs`}>
                            {lessonCount}/{m.lessons} lessons
                          </span>
                        )}
                        {!isDone && !isLocked && lessonCount === 0 && (
                          <span className="text-xs text-slate-600">{m.lessons} lessons</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white mb-2">{m.title}</h3>

                      {/* Topic pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {m.topics.map((t, ti) => (
                          <span key={t}
                            className={`text-xs px-2 py-0.5 rounded-full
                              ${ti < lessonCount && !isDone
                                ? `bg-${m.color}-900/40 text-${m.color}-300 border border-${m.color}-800/40`
                                : isDone
                                  ? 'bg-green-900/30 text-green-400 border border-green-800/30'
                                  : 'bg-slate-800/60 text-slate-500 border border-slate-700/40'
                              }`}>
                            {isDone || ti < lessonCount ? '✓ ' : ''}{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    {!isLocked && (
                      <Link to={m.to}
                        className={`flex-shrink-0 flex items-center gap-1 text-sm font-medium transition-colors
                          ${isDone
                            ? 'text-slate-500 hover:text-slate-300'
                            : `text-${m.color}-400 hover:text-${m.color}-300`
                          }`}>
                        {isDone ? 'Review' : lessonCount > 0 ? 'Continue' : 'Start'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Progress bar within module */}
                {!isDone && lessonCount > 0 && (
                  <div className={`h-1 bg-slate-800`}>
                    <div className={`h-full bg-${m.color}-500 transition-all duration-500`}
                         style={{ width: `${(lessonCount / m.lessons) * 100}%` }} />
                  </div>
                )}
                {isDone && <div className="h-1 bg-green-500/60" />}
              </div>
            )
          })}
        </div>
      </section>

      {/* Why section */}
      <section className="bg-slate-900/40 border-t border-slate-800 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white mb-8 text-center">Built for beginners</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: '🧠', title: 'Intuition First', desc: 'Analogies before equations. You always know the "why" before the math.' },
              { icon: '🎯', title: 'One Idea at a Time', desc: 'Each lesson is one concept. No information overload.' },
              { icon: '✅', title: 'Checkpoints', desc: 'A quick quiz after every lesson confirms you understood before moving on.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
