import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { GLOSSARY_TERMS } from '../lib/data/glossary'

export default function GlossaryTooltip({ term, children }) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()
  const glossaryTerm = useMemo(() => {
    const normalizedTerm = typeof term === 'string' ? term.trim().toLowerCase() : ''
    if (!normalizedTerm) {
      return null
    }

    return GLOSSARY_TERMS.find((entry) => entry.term.toLowerCase() === normalizedTerm)
  }, [term])

  if (!glossaryTerm) {
    return children
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        className="rounded-sm text-inherit font-inherit border-b border-dashed border-slate-500 cursor-help
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-indigo-400"
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 bottom-full z-20 mb-2 w-max max-w-xs -translate-x-1/2
                       rounded-xl border border-slate-700/60 bg-slate-900 p-3 text-sm text-slate-200
                       shadow-xl shadow-black/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-white">
              {glossaryTerm.term}
            </p>
            <p className="mt-1 leading-relaxed text-slate-300">
              {glossaryTerm.definition}
            </p>
            <Link
              to="/glossary"
              className="mt-2 inline-flex rounded-md text-xs font-medium text-indigo-400 transition-colors duration-150
                         hover:text-indigo-300 focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              See glossary &rarr;
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
