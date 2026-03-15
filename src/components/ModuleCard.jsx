import { Link } from 'react-router-dom'
import { CheckCircle, ChevronRight, Lock } from 'lucide-react'

export default function ModuleCard({ number, title, description, to, icon: Icon, completed, locked }) {
  return (
    <Link
      to={locked ? '#' : to}
      className={`group card-hover flex items-start gap-4 ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={e => locked && e.preventDefault()}
      aria-disabled={locked || undefined}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg
                       ${completed ? 'bg-green-600/20 text-green-400' : 'bg-indigo-600/20 text-indigo-400'}`}>
        {completed ? <CheckCircle className="w-6 h-6" /> : locked ? <Lock className="w-5 h-5" /> : <Icon className="w-6 h-6" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-slate-500">Module {number}</span>
          {completed && (
            <span className="badge bg-green-900/40 text-green-400">Completed</span>
          )}
        </div>
        <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>
      {!locked && (
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" />
      )}
    </Link>
  )
}
