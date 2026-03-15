import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

export default function ModuleLayout({ moduleId, title, subtitle, prev, next, children }) {
  const { completed, markDone } = useProgress()
  const done = completed[moduleId]

  return (
    <div className="min-h-screen">
      {/* Module header */}
      <div className="bg-gradient-to-b from-indigo-950/50 to-slate-950 border-b border-slate-800 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {prev && (
            <Link to={prev.to} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              {prev.label}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
          {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {children}

        {/* Mark complete + nav */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {!done ? (
            <button
              onClick={() => markDone(moduleId)}
              className="btn-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Complete
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle className="w-5 h-5" />
              Module Completed!
            </div>
          )}

          {next && (
            <Link to={next.to} className="btn-secondary ml-auto">
              {next.label}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
