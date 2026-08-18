import { ArrowRight } from 'lucide-react'

/**
 * A compact before → after state pair for Qiskit Practice Challenges
 * (CodeFillBlank/CodeOrdering's `visual` prop) — a glance-able summary
 * of what the exercise is doing, so the surrounding prose can stay short.
 * Not a full diagram like DiagramFrame; intentionally small and plain.
 */
export default function StateTransition({ from, to }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 py-3">
      <div className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-center font-mono text-sm text-slate-200">
        {from}
      </div>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-teal-400" aria-hidden="true" />
      <div className="rounded-lg border border-teal-700/50 bg-teal-950/30 px-3 py-1.5 text-center font-mono text-sm text-teal-300">
        {to}
      </div>
    </div>
  )
}
