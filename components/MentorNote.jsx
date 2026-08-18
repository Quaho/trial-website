import { GraduationCap } from 'lucide-react'

/**
 * A short, concrete callout for a single beginner stumble point — placed
 * immediately next to the content that triggers it, not collected into a
 * generic list. See CLAUDE.md "Mentor Notes, Stuck Recovery & Continuation
 * Resources": direct and checkable, never encouragement copy.
 */
export default function MentorNote({ children }) {
  return (
    <div
      className="rounded-xl border-l-4 border-l-cyan-500 border border-slate-800 bg-slate-900 p-5"
      role="note"
      aria-label="Mentor note"
    >
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
        <p className="text-xs uppercase tracking-widest text-cyan-400">Mentor Note</p>
      </div>
      <div className="chapter-text">{children}</div>
    </div>
  )
}
