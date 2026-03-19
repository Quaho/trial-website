import { Link } from 'react-router-dom'
import { ChevronLeft, Clock, Sparkles } from 'lucide-react'
import { MODULES, MODULE_STYLES } from '../../lib/data/modules'

export default function ComingSoon({ moduleId }) {
  const mod = MODULES.find(m => m.id === moduleId)
  const styles = MODULE_STYLES[moduleId] ?? MODULE_STYLES.intuition
  const Icon = mod?.icon ?? Sparkles

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero strip */}
      <div className="relative overflow-hidden py-16 sm:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-950 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" /> Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${styles.icon}`}>
              <Icon className={`w-5 h-5 ${styles.iconText}`} />
            </div>
            <span className={`text-xs font-semibold uppercase tracking-widest ${styles.iconText}`}>
              Module {mod?.number ?? '—'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {mod?.title ?? 'Coming Soon'}
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-xl">
            {mod?.tagline ?? 'This module is under construction.'}
          </p>

          <div className="flex flex-wrap gap-2">
            {mod?.topics.map(t => (
              <span key={t} className={`badge border text-xs ${styles.badge}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Coming soon body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-7 h-7 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-3">This module is coming next</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Content is being built. Estimated time when complete: ~{mod?.estMin ?? 30} minutes.
          Check back soon or start from the beginning.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Back to Course Home
        </Link>
      </div>
    </div>
  )
}
