import { useState } from 'react'
import { ChevronDown, ChevronUp, Telescope } from 'lucide-react'

/**
 * Collapsible "Deep Dive" section for optional extra content.
 * Props:
 *   title    – string (optional, defaults to "Deep Dive")
 *   children – content to show when expanded
 */
export default function DeepDive({ title = 'Deep Dive', children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-6 rounded-xl border border-violet-800/30 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-violet-950/20
                   hover:bg-violet-950/30 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <Telescope className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-violet-300">{title}</span>
          <span className="text-xs text-violet-500/70 hidden sm:inline">— optional deeper look</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-violet-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-violet-400 flex-shrink-0" />
        }
      </button>

      {open && (
        <div className="px-5 py-4 bg-violet-950/10 border-t border-violet-800/20
                        text-sm text-slate-400 leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}
