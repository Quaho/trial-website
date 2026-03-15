import { Link } from 'react-router-dom'
import { Atom, Zap, BookOpen, Code2, ArrowRight, Star } from 'lucide-react'
import LearningPath from '../components/LearningPath'
import ModuleCard from '../components/ModuleCard'
import { useProgress } from '../hooks/useProgress'

const MODULES = [
  {
    number: 1,
    to: '/intuition',
    icon: Zap,
    title: 'Big-Picture Intuition',
    description: 'Bits vs qubits, superposition, measurement, interference, and why quantum computing matters.',
    id: 'intuition',
  },
  {
    number: 2,
    to: '/braket',
    icon: BookOpen,
    title: 'Bra-Ket Notation',
    description: 'The mathematical language of quantum states: kets, bras, and inner products.',
    id: 'braket',
  },
  {
    number: 3,
    to: '/phase',
    icon: Star,
    title: 'Phase & Measurement Angles',
    description: 'Intuition-first guide to phase angles and what it means to measure in different bases.',
    id: 'phase',
  },
  {
    number: 4,
    to: '/qiskit',
    icon: Code2,
    title: 'Qiskit',
    description: 'Write real quantum programs. First circuits, basic gates, and a Bell state example.',
    id: 'qiskit',
  },
]

export default function Home() {
  const { completed, count, total } = useProgress()
  const pct = Math.round((count / total) * 100)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                          bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 badge bg-indigo-900/40 text-indigo-300 border border-indigo-800/50 mb-6">
            <Atom className="w-3.5 h-3.5" />
            Free • Beginner-Friendly • No Physics Degree Required
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Learn Quantum Computing
            <span className="text-indigo-400"> From Scratch</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            From <em>what even is superposition?</em> to writing real Qiskit programs —
            a guided path that builds intuition before math.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/intuition" className="btn-primary text-base px-7 py-3">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
            {count > 0 && (
              <Link to={count === total ? '/qiskit' : `/${['intuition','braket','phase','qiskit'][count]}`}
                    className="btn-secondary text-base px-7 py-3">
                Continue ({count}/{total})
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-slate-500 mb-6 font-medium uppercase tracking-wider">
            Your Learning Path
          </p>
          <LearningPath />
          {count > 0 && (
            <div className="mt-6 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{pct}% complete</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                     style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Module cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-2">Course Modules</h2>
        <p className="text-slate-400 mb-8">Each module builds on the last. Complete them in order for the best experience.</p>
        <div className="space-y-4">
          {MODULES.map(m => (
            <ModuleCard key={m.id} {...m} completed={!!completed[m.id]} />
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="bg-slate-900/40 border-t border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why This Course?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Intuition First', desc: 'We explain the idea before the math. You\'ll always know why you\'re learning something.' },
              { icon: '⚡', title: 'Progressive Depth', desc: 'Start with analogies, build to notation, end with real code. Each step is a small leap.' },
              { icon: '🔬', title: 'Real Qiskit Code', desc: 'The final module has actual runnable circuits. No fake pseudocode — real quantum programs.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
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
        <p>Built for curious beginners. No physics degree required.</p>
      </footer>
    </div>
  )
}
