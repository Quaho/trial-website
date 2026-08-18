import { Sigma, BookOpen, Cpu, Code2, LifeBuoy } from 'lucide-react'

/**
 * A compact, advisory recovery redirect keyed to what kind of blocker the
 * reader has, per CLAUDE.md "Mentor Notes, Stuck Recovery & Continuation
 * Resources". Never gates content — the page reads exactly the same with
 * this box ignored, per the Interactivity Guidelines' "useful when read
 * statically" rule.
 *
 * Props:
 *   type     – 'math' | 'notation' | 'circuit-reading' | 'implementation'
 *   children – the specific redirect links/prose for this instance
 */
const BLOCKER_META = {
  math: { label: 'If the Math Is the Blocker', icon: Sigma },
  notation: { label: 'If the Notation Is the Blocker', icon: BookOpen },
  'circuit-reading': { label: 'If Circuit Reading Is the Blocker', icon: Cpu },
  implementation: { label: 'If Implementation Is the Blocker', icon: Code2 },
}

export default function StuckPath({ type, children }) {
  const meta = BLOCKER_META[type] || { label: 'If You Are Stuck Here', icon: LifeBuoy }
  const Icon = meta.icon

  return (
    <div
      className="rounded-2xl border border-rose-800/40 bg-rose-950/20 p-5"
      role="region"
      aria-label={meta.label}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-rose-400" aria-hidden="true" />
        <h3 className="font-semibold text-rose-300">{meta.label}</h3>
      </div>
      <div className="chapter-text text-sm">{children}</div>
    </div>
  )
}
