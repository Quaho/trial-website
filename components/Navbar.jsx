import { Link, useLocation } from 'react-router-dom'
import { Atom, Menu, X, ChevronDown, Map, BookOpen, Zap } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '../lib/hooks/useProgress'
import { MODULES, NAV_GROUPS } from '../lib/data/modules'

const GROUP_LABEL = { foundations: 'Foundations', circuits: 'Circuits', advanced: 'Advanced' }

function NavDropdown({ group, label, modules, pathname, onNavigate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const isActive = modules.some(m => pathname === m.to)

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (!open) return

    function handler(e) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-1.5 w-56 bg-slate-900 border border-slate-700/60
                       rounded-xl shadow-xl shadow-black/40 overflow-hidden z-50"
          >
            {modules.map(m => {
              const Icon = m.icon
              return (
                <Link
                  key={m.id}
                  to={m.to}
                  onClick={() => { setOpen(false); onNavigate?.() }}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors ${
                    pathname === m.to
                      ? 'bg-indigo-600/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-70" />
                  <span className="truncate">{m.number}. {m.title}</span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const { getTotalLessonsDone, totalLessons } = useProgress()
  const [open, setOpen] = useState(false)
  const [expandedGroup, setExpandedGroup] = useState(null)

  const lessonsDone = getTotalLessonsDone()
  const pct = Math.round((lessonsDone / totalLessons) * 100)

  useEffect(() => {
    if (!open) return

    function handler(e) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-white hover:text-indigo-300 transition-colors shrink-0
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
          >
            <Atom className="w-5 h-5 text-indigo-400" />
            QuantumLeap
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === '/'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
              }`}
            >
              Home
            </Link>

            {/* Group dropdowns */}
            {NAV_GROUPS.map(({ label, group }) => (
              <NavDropdown
                key={group}
                group={group}
                label={label}
                modules={MODULES.filter(m => m.group === group)}
                pathname={pathname}
              />
            ))}

            {/* Roadmap + Glossary */}
            <div className="w-px h-4 bg-slate-700/50 mx-1" />
            {[
              { to: '/roadmap',  icon: Map,      label: 'Roadmap'  },
              { to: '/glossary', icon: BookOpen, label: 'Glossary' },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === to
                    ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Progress pill (desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="tabular-nums">{lessonsDone}/{totalLessons}</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/60
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false)
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span key="open"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            className="md:hidden border-t border-slate-800 bg-slate-950"
          >
            <div className="px-4 py-3 space-y-0.5 max-h-[75vh] overflow-y-auto">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={`flex min-h-[44px] items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/' ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                }`}
              >
                Home
              </Link>

              {/* Groups */}
              {NAV_GROUPS.map(({ label, group }) => {
                const groupModules = MODULES.filter(m => m.group === group)
                const isExpanded = expandedGroup === group
                return (
                  <div key={group}>
                    <button
                      onClick={() => setExpandedGroup(isExpanded ? null : group)}
                      className="w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-colors mt-1
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                      type="button"
                    >
                      {label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          {groupModules.map(m => {
                            const Icon = m.icon
                            return (
                              <Link
                                key={m.id}
                                to={m.to}
                                onClick={() => setOpen(false)}
                                className={`flex min-h-[44px] items-center gap-2.5 pl-5 pr-3 py-2.5 rounded-lg text-sm transition-colors ${
                                  pathname === m.to
                                    ? 'bg-indigo-600/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                                }`}
                              >
                                <Icon className="w-4 h-4 shrink-0 opacity-70" />
                                <span>{m.number}. {m.title}</span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Extras */}
              <div className="pt-1">
                <p className="px-3 pb-1 text-xs font-semibold text-slate-600 uppercase tracking-widest">Explore</p>
                {[
                  { to: '/roadmap',    label: 'Course Roadmap' },
                  { to: '/glossary',   label: 'Glossary' },
                  { to: '/challenges', label: 'Mini Challenges' },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[44px] items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === to ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Progress */}
              <div className="pt-3 pb-1 px-3 flex items-center gap-2.5">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 tabular-nums">{lessonsDone}/{totalLessons} lessons</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
