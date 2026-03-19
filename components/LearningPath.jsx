import { useProgress } from '../lib/hooks/useProgress'
import { Link } from 'react-router-dom'
import { CheckCircle, Circle } from 'lucide-react'

const STEPS = [
  { id: 'intuition', label: 'Intuition',  to: '/intuition', color: 'indigo' },
  { id: 'braket',    label: 'Bra-Ket',    to: '/braket',    color: 'violet' },
  { id: 'phase',     label: 'Phase',       to: '/phase',     color: 'purple' },
  { id: 'qiskit',    label: 'Qiskit',      to: '/qiskit',    color: 'fuchsia' },
]

export default function LearningPath() {
  const { completed } = useProgress()

  return (
    <div className="flex items-center justify-center gap-0 flex-wrap">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <Link
            to={step.to}
            className="flex flex-col items-center gap-1 group"
            aria-label={`Go to ${step.label}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                             ${completed[step.id]
                               ? 'border-green-500 bg-green-500/20 text-green-400'
                               : 'border-indigo-600 bg-indigo-600/10 text-indigo-400 group-hover:bg-indigo-600/30'}`}>
              {completed[step.id]
                ? <CheckCircle className="w-5 h-5" />
                : <span className="text-sm font-bold">{i + 1}</span>}
            </div>
            <span className={`text-xs font-medium ${completed[step.id] ? 'text-green-400' : 'text-slate-400 group-hover:text-white'}`}>
              {step.label}
            </span>
          </Link>
          {i < STEPS.length - 1 && (
            <div className={`hidden xs:block w-12 sm:w-16 h-0.5 mx-1 mb-5 transition-colors
                             ${completed[STEPS[i].id] ? 'bg-green-600' : 'bg-slate-700'}`}
                 aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}
