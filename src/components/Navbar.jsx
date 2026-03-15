import { Link, useLocation } from 'react-router-dom'
import { Atom, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'

const LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/intuition',  label: '1. Intuition' },
  { to: '/braket',     label: '2. Bra-Ket' },
  { to: '/phase',      label: '3. Phase' },
  { to: '/qiskit',     label: '4. Qiskit' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { count, total } = useProgress()
  const [open, setOpen] = useState(false)
  const pct = Math.round((count / total) * 100)

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-white hover:text-indigo-400 transition-colors">
            <Atom className="w-5 h-5 text-indigo-400" />
            QuantumLeap
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Progress pill */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span>{count}/{total}</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 px-4 py-3 space-y-1 bg-slate-950">
          {LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span>{count}/{total} modules</span>
          </div>
        </div>
      )}
    </nav>
  )
}
