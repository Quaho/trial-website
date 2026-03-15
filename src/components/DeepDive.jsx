import { useState } from 'react'
import { ChevronDown, Telescope } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Collapsible "Deep Dive" section with smooth height animation.
 * Props:
 *   title    – string (optional, defaults to "Deep Dive")
 *   children – content to show when expanded
 */
export default function DeepDive({ title = 'Deep Dive', children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-violet-800/30 overflow-hidden">
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
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-violet-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="deep-dive-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 py-4 bg-violet-950/10 border-t border-violet-800/20
                            text-sm text-slate-400 leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
