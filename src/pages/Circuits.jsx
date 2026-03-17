import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../components/ModuleLayout'
import LessonCard from '../components/LessonCard'
import StepNav from '../components/StepNav'
import { MathDisplay, MathInline as InlineMath } from '../components/MathBlock'
import CodeBlock from '../components/CodeBlock'
import { useProgress } from '../hooks/useProgress'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function CircuitAnatomyVisual() {
  const [highlight, setHighlight] = useState(null)

  const parts = [
    { id: 'time', label: 'Time flows left \u2192 right', color: 'text-emerald-400' },
    { id: 'wire', label: 'Each wire = one qubit', color: 'text-sky-400' },
    { id: 'gate', label: 'Boxes = gates', color: 'text-violet-400' },
    { id: 'meter', label: 'Meter = measurement', color: 'text-amber-400' },
  ]

  return (
    <div className="card border-emerald-800/30 my-6">
      <p className="text-xs text-emerald-400 uppercase tracking-wider mb-4 text-center">
        Anatomy of a quantum circuit
      </p>

      {/* SVG circuit diagram */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-6 mb-5">
        <svg viewBox="0 0 440 160" className="w-full" role="img"
             aria-label="A quantum circuit with two qubit wires, H and CNOT gates, and measurement symbols">
          {/* q0 wire */}
          <line x1="60" y1="50" x2="380" y2="50"
                stroke={highlight === 'wire' ? '#38bdf8' : '#475569'} strokeWidth="2" />
          {/* q1 wire */}
          <line x1="60" y1="120" x2="380" y2="120"
                stroke={highlight === 'wire' ? '#38bdf8' : '#475569'} strokeWidth="2" />

          {/* Wire labels */}
          <text x="30" y="54" fill={highlight === 'wire' ? '#38bdf8' : '#94a3b8'}
                fontSize="14" fontFamily="monospace" textAnchor="end">q0</text>
          <text x="30" y="124" fill={highlight === 'wire' ? '#38bdf8' : '#94a3b8'}
                fontSize="14" fontFamily="monospace" textAnchor="end">q1</text>

          {/* H gate on q0 */}
          <rect x="120" y="28" width="44" height="44" rx="8"
                fill={highlight === 'gate' ? '#8b5cf620' : '#0f172a'}
                stroke={highlight === 'gate' ? '#8b5cf6' : '#334155'} strokeWidth="2" />
          <text x="142" y="56" fill={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'}
                fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>

          {/* CNOT: control dot on q0 */}
          <circle cx="230" cy="50" r="6"
                  fill={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} />
          {/* CNOT: vertical line */}
          <line x1="230" y1="56" x2="230" y2="106"
                stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />
          {/* CNOT: target circle on q1 */}
          <circle cx="230" cy="120" r="14"
                  fill="none" stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />
          <line x1="230" y1="106" x2="230" y2="134"
                stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />
          <line x1="216" y1="120" x2="244" y2="120"
                stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />

          {/* Measurement symbol q0 */}
          <rect x="310" y="30" width="40" height="40" rx="6"
                fill={highlight === 'meter' ? '#f59e0b20' : '#0f172a'}
                stroke={highlight === 'meter' ? '#f59e0b' : '#334155'} strokeWidth="2" />
          <path d="M318 58 Q330 40 342 58" fill="none"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />
          <line x1="330" y1="48" x2="338" y2="36"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />

          {/* Measurement symbol q1 */}
          <rect x="310" y="100" width="40" height="40" rx="6"
                fill={highlight === 'meter' ? '#f59e0b20' : '#0f172a'}
                stroke={highlight === 'meter' ? '#f59e0b' : '#334155'} strokeWidth="2" />
          <path d="M318 128 Q330 110 342 128" fill="none"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />
          <line x1="330" y1="118" x2="338" y2="106"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />

          {/* Time arrow */}
          {highlight === 'time' && (
            <g>
              <line x1="80" y1="10" x2="360" y2="10" stroke="#34d399" strokeWidth="1.5"
                    strokeDasharray="6 3" />
              <polygon points="360,6 370,10 360,14" fill="#34d399" />
              <text x="220" y="8" fill="#34d399" fontSize="10" textAnchor="middle"
                    fontFamily="sans-serif">time</text>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive annotation buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {parts.map(p => (
          <button
            key={p.id}
            onClick={() => setHighlight(h => h === p.id ? null : p.id)}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border
              ${highlight === p.id
                ? 'bg-emerald-900/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900/60 border-slate-700/50 text-slate-400 hover:text-slate-200'}`}
            aria-label={`Highlight ${p.label}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function CircuitElementsVisual() {
  const [active, setActive] = useState(0)

  const tabs = [
    {
      name: 'Wires',
      desc: 'Horizontal lines that carry quantum information. One wire per qubit, all start in |0\u27E9 by default.',
      svg: (
        <svg viewBox="0 0 280 100" className="w-full max-w-xs mx-auto" role="img"
             aria-label="Two horizontal qubit wires labeled q0 and q1">
          <line x1="50" y1="30" x2="250" y2="30" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="50" y1="70" x2="250" y2="70" stroke="#6ee7b7" strokeWidth="2" />
          <text x="30" y="35" fill="#94a3b8" fontSize="13" fontFamily="monospace" textAnchor="end">q0</text>
          <text x="30" y="75" fill="#94a3b8" fontSize="13" fontFamily="monospace" textAnchor="end">q1</text>
          <text x="265" y="35" fill="#6ee7b7" fontSize="11" fontFamily="monospace">|0&#x27E9;</text>
          <text x="265" y="75" fill="#6ee7b7" fontSize="11" fontFamily="monospace">|0&#x27E9;</text>
        </svg>
      ),
    },
    {
      name: 'Gates',
      desc: 'Boxes on wires that transform qubit states. Single-qubit gates (H, X, Z) act on one wire. CNOT spans two wires with a control dot and a target circle.',
      svg: (
        <svg viewBox="0 0 300 120" className="w-full max-w-xs mx-auto" role="img"
             aria-label="Single qubit gates H, X, Z and a CNOT gate spanning two wires">
          {/* Single-qubit gates row */}
          <rect x="20" y="20" width="36" height="36" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="38" y="44" fill="#6ee7b7" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>
          <rect x="76" y="20" width="36" height="36" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="94" y="44" fill="#6ee7b7" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">X</text>
          <rect x="132" y="20" width="36" height="36" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="150" y="44" fill="#6ee7b7" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Z</text>
          {/* CNOT */}
          <circle cx="230" cy="38" r="6" fill="#6ee7b7" />
          <line x1="230" y1="44" x2="230" y2="78" stroke="#6ee7b7" strokeWidth="2" />
          <circle cx="230" cy="90" r="14" fill="none" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="216" y1="90" x2="244" y2="90" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="230" y1="76" x2="230" y2="104" stroke="#6ee7b7" strokeWidth="2" />
          <text x="260" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace">\u25CF ctrl</text>
          <text x="260" y="94" fill="#94a3b8" fontSize="10" fontFamily="monospace">\u2295 tgt</text>
        </svg>
      ),
    },
    {
      name: 'Measurement',
      desc: 'The meter symbol collapses a qubit to a classical bit (0 or 1). After measurement, the quantum state is destroyed. A classical double-line carries the result.',
      svg: (
        <svg viewBox="0 0 200 100" className="w-full max-w-xs mx-auto" role="img"
             aria-label="Measurement symbol: a meter icon with a classical double-line output">
          {/* Wire in */}
          <line x1="20" y1="50" x2="60" y2="50" stroke="#475569" strokeWidth="2" />
          {/* Measurement box */}
          <rect x="60" y="28" width="44" height="44" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
          <path d="M70 60 Q82 40 94 60" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="82" y1="48" x2="90" y2="34" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Double classical line out */}
          <line x1="104" y1="48" x2="170" y2="48" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="104" y1="52" x2="170" y2="52" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="140" y="42" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">classical</text>
          <text x="140" y="66" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">0 or 1</text>
        </svg>
      ),
    },
  ]

  const t = tabs[active]

  return (
    <div className="card border-emerald-800/30 my-6">
      <p className="text-xs text-emerald-400 uppercase tracking-wider mb-4 text-center">
        The three building blocks
      </p>

      {/* Tab buttons */}
      <div className="flex gap-2 justify-center mb-5">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              ${i === active
                ? 'bg-emerald-900/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white'}`}
            aria-label={`Show ${tab.name} element`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 mb-4">
            {t.svg}
          </div>
          <p className="text-sm text-slate-300 text-center leading-relaxed">{t.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CircuitStepperVisual() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      label: 'Initial state',
      state: '|00\u27E9',
      stateKatex: '|00\\rangle',
      desc: 'Both qubits begin in the ground state |0\u27E9.',
      hActive: false,
      cxActive: false,
      amps: [{ basis: '|00\u27E9', val: 1 }, { basis: '|01\u27E9', val: 0 }, { basis: '|10\u27E9', val: 0 }, { basis: '|11\u27E9', val: 0 }],
    },
    {
      label: 'After H on q0',
      state: '(|00\u27E9 + |10\u27E9) / \u221A2',
      stateKatex: '\\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}',
      desc: 'H puts q0 into superposition. q1 is still |0\u27E9. Not entangled yet.',
      hActive: true,
      cxActive: false,
      amps: [{ basis: '|00\u27E9', val: 0.5 }, { basis: '|01\u27E9', val: 0 }, { basis: '|10\u27E9', val: 0.5 }, { basis: '|11\u27E9', val: 0 }],
    },
    {
      label: 'After CNOT',
      state: '(|00\u27E9 + |11\u27E9) / \u221A2',
      stateKatex: '\\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
      desc: 'CNOT flips q1 when q0 = |1\u27E9. The |10\u27E9 term becomes |11\u27E9. Bell state!',
      hActive: true,
      cxActive: true,
      amps: [{ basis: '|00\u27E9', val: 0.5 }, { basis: '|01\u27E9', val: 0 }, { basis: '|10\u27E9', val: 0 }, { basis: '|11\u27E9', val: 0.5 }],
    },
  ]

  const s = steps[currentStep]

  const gateStyle = (active) =>
    active
      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
      : 'bg-slate-900/40 border-slate-700 text-slate-500'

  return (
    <div className="card border-emerald-800/30 my-6">
      <p className="text-xs text-emerald-400 uppercase tracking-wider mb-4 text-center">
        Step through: |00&#x27E9; &rarr; H &rarr; CNOT
      </p>

      {/* Circuit diagram */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5 mb-4">
        <div className="space-y-1 font-mono text-sm sm:text-base text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-slate-500 w-8 text-right">q0:</span>
            <span className="text-slate-600">&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.hActive)}`}>
              H
            </span>
            <span className="text-slate-600">&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.cxActive)}`}>
              &#x25CF;
            </span>
            <span className="text-slate-600">&#x2500;</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="w-8" />
            <span className={`transition-colors duration-200 ${s.cxActive ? 'text-emerald-600' : 'text-slate-700'}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2502;
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-slate-500 w-8 text-right">q1:</span>
            <span className="text-slate-600">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.cxActive)}`}>
              &#x2295;
            </span>
            <span className="text-slate-600">&#x2500;</span>
          </div>
        </div>
      </div>

      {/* Step indicator dots */}
      <div className="flex justify-center gap-2 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === currentStep
                ? 'w-6 bg-emerald-500'
                : i < currentStep
                  ? 'w-3 bg-emerald-700'
                  : 'w-3 bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Current state display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center mb-4"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
          <div className="font-mono text-emerald-300 text-lg sm:text-xl font-semibold mb-1">
            <InlineMath>{s.stateKatex}</InlineMath>
          </div>
          <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Amplitude bars */}
      <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium text-center">
          Amplitudes (probability = amplitude&sup2;)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {s.amps.map(a => (
            <div key={a.basis}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">{a.basis}</span>
                <span className="text-slate-400">{a.val > 0 ? `1/\u221A2` : '0'}</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500/70 rounded-full transition-all duration-300"
                  style={{ width: `${a.val * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(c => c - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-slate-800 text-slate-300 hover:bg-slate-700
                     disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          &larr; Previous
        </button>
        <button
          onClick={() => setCurrentStep(c => c + 1)}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-emerald-800/60 text-emerald-300 hover:bg-emerald-700/60
                     disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next step"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}

function BellStepperVisual() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      label: 'Both qubits |0\u27E9',
      state: '|00\u27E9',
      desc: 'Both qubits start in the ground state.',
      hActive: false,
      cxActive: false,
      mActive: false,
      amps: [1, 0, 0, 0],
    },
    {
      label: 'H on q0',
      state: '(|00\u27E9 + |10\u27E9) / \u221A2',
      desc: 'H creates superposition on q0. q1 is still |0\u27E9.',
      hActive: true,
      cxActive: false,
      mActive: false,
      amps: [0.5, 0, 0.5, 0],
    },
    {
      label: 'CNOT',
      state: '(|00\u27E9 + |11\u27E9) / \u221A2',
      desc: 'CNOT entangles: |10\u27E9 becomes |11\u27E9. This is a Bell state.',
      hActive: true,
      cxActive: true,
      mActive: false,
      amps: [0.5, 0, 0, 0.5],
    },
    {
      label: 'Measurement',
      state: '|00\u27E9 or |11\u27E9',
      desc: 'Always correlated: both 0 or both 1. Never 01 or 10.',
      hActive: true,
      cxActive: true,
      mActive: true,
      amps: [0.5, 0, 0, 0.5],
    },
  ]

  const basisLabels = ['|00\u27E9', '|01\u27E9', '|10\u27E9', '|11\u27E9']
  const s = steps[currentStep]

  const gateStyle = (active) =>
    active
      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
      : 'bg-slate-900/40 border-slate-700 text-slate-500'

  return (
    <div className="card border-emerald-800/30 my-6">
      <p className="text-xs text-emerald-400 uppercase tracking-wider mb-4 text-center">
        Bell circuit &mdash; 4 stages
      </p>

      {/* Circuit diagram */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5 mb-4">
        <div className="space-y-1 font-mono text-sm sm:text-base text-center">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
            <span className="text-slate-500 w-8 text-right">q0:</span>
            <span className="text-slate-600">&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.hActive)}`}>
              H
            </span>
            <span className="text-slate-600">&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.cxActive)}`}>
              &#x25CF;
            </span>
            <span className="text-slate-600">&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.mActive)}`}>
              M
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="w-8" />
            <span className={`transition-colors duration-200 ${s.cxActive ? 'text-emerald-600' : 'text-slate-700'}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2502;
            </span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
            <span className="text-slate-500 w-8 text-right">q1:</span>
            <span className="text-slate-600">&#x2500;&#x2500;&#x2500;&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.cxActive)}`}>
              &#x2295;
            </span>
            <span className="text-slate-600">&#x2500;</span>
            <span className={`px-2 py-1 rounded-lg border font-bold transition-all duration-200 ${gateStyle(s.mActive)}`}>
              M
            </span>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center gap-2 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === currentStep
                ? 'w-6 bg-emerald-500'
                : i < currentStep
                  ? 'w-3 bg-emerald-700'
                  : 'w-3 bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* State description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center mb-4"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Step {currentStep + 1}: {s.label}
          </p>
          <p className="font-mono text-emerald-300 text-lg sm:text-xl font-semibold">{s.state}</p>
          <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Probability bars */}
      <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium text-center">
          Probability distribution
        </p>
        <div className="grid grid-cols-2 gap-2">
          {basisLabels.map((label, i) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">{label}</span>
                <span className="text-slate-400">{Math.round(s.amps[i] * 100)}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500/70 rounded-full transition-all duration-300"
                  style={{ width: `${s.amps[i] * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(c => c - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-slate-800 text-slate-300 hover:bg-slate-700
                     disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          &larr; Previous
        </button>
        <button
          onClick={() => setCurrentStep(c => c + 1)}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-emerald-800/60 text-emerald-300 hover:bg-emerald-700/60
                     disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next step"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}

function CircuitToCodeVisual() {
  const [selected, setSelected] = useState(0)

  const circuits = [
    {
      name: 'Bell',
      diagram: (
        <svg viewBox="0 0 300 120" className="w-full" role="img"
             aria-label="Bell circuit: H on q0, CNOT q0 to q1, measure both">
          <line x1="40" y1="35" x2="270" y2="35" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="85" x2="270" y2="85" stroke="#475569" strokeWidth="2" />
          <text x="20" y="40" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="end">q0</text>
          <text x="20" y="90" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="end">q1</text>
          <rect x="70" y="15" width="36" height="40" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="88" y="40" fill="#6ee7b7" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>
          <circle cx="145" cy="35" r="5" fill="#6ee7b7" />
          <line x1="145" y1="40" x2="145" y2="72" stroke="#6ee7b7" strokeWidth="2" />
          <circle cx="145" cy="85" r="12" fill="none" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="133" y1="85" x2="157" y2="85" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="145" y1="73" x2="145" y2="97" stroke="#6ee7b7" strokeWidth="2" />
          <rect x="210" y="17" width="32" height="36" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M218 42 Q226 28 234 42" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
          <line x1="226" y1="34" x2="232" y2="24" stroke="#f59e0b" strokeWidth="1.2" />
          <rect x="210" y="67" width="32" height="36" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M218 92 Q226 78 234 92" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
          <line x1="226" y1="84" x2="232" y2="74" stroke="#f59e0b" strokeWidth="1.2" />
        </svg>
      ),
      code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h(0)              # Hadamard on q0
qc.cx(0, 1)          # CNOT: q0 controls q1
qc.measure([0,1], [0,1])`,
    },
    {
      name: 'GHZ (3-qubit)',
      diagram: (
        <svg viewBox="0 0 320 150" className="w-full" role="img"
             aria-label="GHZ circuit: H on q0, CNOT q0 to q1, CNOT q0 to q2, measure all">
          <line x1="40" y1="30" x2="290" y2="30" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="75" x2="290" y2="75" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="120" x2="290" y2="120" stroke="#475569" strokeWidth="2" />
          <text x="20" y="35" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="end">q0</text>
          <text x="20" y="80" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="end">q1</text>
          <text x="20" y="125" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="end">q2</text>
          <rect x="65" y="10" width="34" height="40" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="82" y="36" fill="#6ee7b7" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>
          <circle cx="135" cy="30" r="5" fill="#6ee7b7" />
          <line x1="135" y1="35" x2="135" y2="63" stroke="#6ee7b7" strokeWidth="2" />
          <circle cx="135" cy="75" r="11" fill="none" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="124" y1="75" x2="146" y2="75" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="135" y1="64" x2="135" y2="86" stroke="#6ee7b7" strokeWidth="2" />
          <circle cx="185" cy="30" r="5" fill="#6ee7b7" />
          <line x1="185" y1="35" x2="185" y2="108" stroke="#6ee7b7" strokeWidth="2" />
          <circle cx="185" cy="120" r="11" fill="none" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="174" y1="120" x2="196" y2="120" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="185" y1="109" x2="185" y2="131" stroke="#6ee7b7" strokeWidth="2" />
          {[30, 75, 120].map(y => (
            <g key={y}>
              <rect x="240" y={y - 16} width="28" height="32" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
              <path d={`M246 ${y + 8} Q254 ${y - 4} 262 ${y + 8}`} fill="none" stroke="#f59e0b" strokeWidth="1" />
              <line x1="254" y1={y + 2} x2="259" y2={y - 6} stroke="#f59e0b" strokeWidth="1" />
            </g>
          ))}
        </svg>
      ),
      code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 3)
qc.h(0)              # Superposition on q0
qc.cx(0, 1)          # Entangle q0-q1
qc.cx(0, 2)          # Entangle q0-q2
qc.measure([0,1,2], [0,1,2])
# Output: only |000> or |111>`,
    },
    {
      name: 'Single qubit',
      diagram: (
        <svg viewBox="0 0 280 60" className="w-full" role="img"
             aria-label="Single qubit circuit: H gate then measurement">
          <line x1="40" y1="30" x2="250" y2="30" stroke="#475569" strokeWidth="2" />
          <text x="20" y="35" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="end">q0</text>
          <rect x="75" y="10" width="36" height="40" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="93" y="36" fill="#6ee7b7" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>
          <rect x="170" y="12" width="36" height="36" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M178 38 Q188 24 198 38" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
          <line x1="188" y1="30" x2="195" y2="20" stroke="#f59e0b" strokeWidth="1.2" />
        </svg>
      ),
      code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(1, 1)
qc.h(0)              # Hadamard on q0
qc.measure(0, 0)
# Output: |0> or |1> with 50% each`,
    },
  ]

  const c = circuits[selected]

  return (
    <div className="card border-emerald-800/30 my-6">
      <p className="text-xs text-emerald-400 uppercase tracking-wider mb-4 text-center">
        Circuit diagram &harr; Qiskit code
      </p>

      {/* Circuit selector */}
      <div className="flex gap-2 justify-center mb-5 flex-wrap">
        {circuits.map((cir, i) => (
          <button
            key={cir.name}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${i === selected
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            aria-label={`Show ${cir.name} circuit`}
          >
            {cir.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Circuit diagram */}
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">
                Circuit diagram
              </p>
              {c.diagram}
            </div>

            {/* Code */}
            <div className="flex-1">
              <CodeBlock
                language="python"
                label={`${c.name} circuit \u2014 Qiskit`}
                code={c.code}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'How to Read a Circuit',
    hook: 'Circuits Are the Sheet Music of Quantum',
    hookSub: 'A quantum circuit is a diagram that shows the exact sequence of operations on qubits \u2014 read left to right, just like a timeline.',
    visual: <CircuitAnatomyVisual />,
    bullets: [
      'Wires run horizontally \u2014 each wire is one qubit.',
      'Gates sit on wires \u2014 they transform the qubit state.',
      'Time flows left to right \u2014 earlier operations are on the left.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Reading order:</strong> In a circuit with H on q0 then CNOT
        on q0\u2013q1, the Hadamard happens first. The CNOT uses q0 as control and q1 as target.
        Left-to-right = chronological order.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Circuit diagrams let you see parallelism &mdash; gates on different wires at the same
        time column happen simultaneously. Code is sequential, but circuits show the structure of an
        algorithm at a glance.</p>
      </div>
    ),
    quiz: {
      question: 'In a quantum circuit, time flows\u2026',
      choices: [
        'Top to bottom',
        'Right to left',
        'Left to right',
        'It doesn\u2019t matter',
      ],
      correct: 2,
    },
  },
  {
    title: 'Wires, Gates, and Measurement',
    hook: 'The Three Building Blocks',
    hookSub: 'Every quantum circuit uses just three elements: wires to carry qubits, gates to transform them, and measurements to read the result.',
    visual: <CircuitElementsVisual />,
    bullets: [
      'Wires carry quantum information \u2014 one wire per qubit, all start in |0\u27E9.',
      'Gates are reversible operations \u2014 every gate has an undo (its inverse).',
      'Measurement collapses the qubit \u2014 it\u2019s irreversible and always comes last.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">CNOT notation:</strong> The CNOT gate spans two wires: a filled
        dot (&bull;) on the control qubit and a &#x2295; on the target. If the control is |1&#x27E9;, the
        target flips. If the control is |0&#x27E9;, nothing happens.</p>
      </div>
    ),
    quiz: {
      question: 'Which circuit element is irreversible?',
      choices: [
        'A Hadamard gate',
        'A wire',
        'A measurement',
        'A CNOT gate',
      ],
      correct: 2,
    },
  },
  {
    title: 'Stepping Through a Circuit',
    hook: 'Follow the State, Gate by Gate',
    hookSub: 'The best way to understand a circuit is to track the quantum state as it passes through each gate, one step at a time.',
    visual: <CircuitStepperVisual />,
    bullets: [
      'Start from the left \u2014 all qubits begin in |0\u27E9 unless labeled otherwise.',
      'Apply each gate column by column to update the state.',
      'The final state before measurement determines the output probabilities.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Tracking a 1-qubit circuit:</strong> Start: |0&#x27E9;.
        After H: (|0&#x27E9; + |1&#x27E9;)/&#x221A;2. After Z: (|0&#x27E9; &minus; |1&#x27E9;)/&#x221A;2.
        Each gate transforms the previous state &mdash; you never need to look ahead.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>If two gates act on different qubits in the same time step, they happen simultaneously.
        Mathematically, you tensor-product their matrices. In practice, just apply each one
        independently to its own qubit.</p>
      </div>
    ),
    quiz: {
      question: 'Starting from |0\u27E9, what state do you get after applying H then Z?',
      choices: [
        '(|0\u27E9 + |1\u27E9)/\u221A2',
        '(|0\u27E9 \u2212 |1\u27E9)/\u221A2',
        '|1\u27E9',
        '|0\u27E9',
      ],
      correct: 1,
    },
  },
  {
    title: 'The Bell Circuit Step by Step',
    hook: 'The Most Famous Two-Line Circuit',
    hookSub: 'The Bell circuit creates maximal entanglement with just two gates \u2014 a Hadamard and a CNOT. Let\u2019s trace every step.',
    visual: <BellStepperVisual />,
    bullets: [
      'H creates superposition on the first qubit \u2014 equal chance of |0\u27E9 and |1\u27E9.',
      'CNOT entangles: it copies the superposition into correlation between both qubits.',
      'The result is a Bell state \u2014 measuring one qubit instantly determines the other.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Amplitude tracking:</strong> |00&#x27E9; &rarr; H on q0 &rarr;
        &frac12;|00&#x27E9; + 0|01&#x27E9; + &frac12;|10&#x27E9; + 0|11&#x27E9;. CNOT flips q1 when q0=1,
        so |10&#x27E9; becomes |11&#x27E9;. Final: &frac12;|00&#x27E9; + 0|01&#x27E9; + 0|10&#x27E9; +
        &frac12;|11&#x27E9;. Only 00 and 11 survive &mdash; that&apos;s entanglement.</p>
      </div>
    ),
    quiz: {
      question: 'In the Bell circuit, what does the CNOT gate do to the state (|00\u27E9+|10\u27E9)/\u221A2?',
      choices: [
        'Creates (|00\u27E9+|01\u27E9)/\u221A2',
        'Creates (|00\u27E9+|11\u27E9)/\u221A2',
        'Creates (|01\u27E9+|10\u27E9)/\u221A2',
        'Nothing \u2014 the state is unchanged',
      ],
      correct: 1,
    },
  },
  {
    title: 'From Circuit to Code',
    hook: 'Every Circuit Has a Qiskit Translation',
    hookSub: 'Once you can read a circuit diagram, writing Qiskit code is just translating each wire and gate into function calls.',
    visual: <CircuitToCodeVisual />,
    bullets: [
      'Each wire becomes a qubit in QuantumCircuit(n).',
      'Gates become method calls: .h(0), .cx(0,1), .measure_all().',
      'Left-to-right order in the diagram = top-to-bottom order in code.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p className="mb-2"><strong className="text-white">Bell circuit translation:</strong></p>
        <pre className="font-mono text-xs text-emerald-300 leading-relaxed">
{`Circuit: q0\u2014[H]\u2014\u25CF\u2014[M]
         q1\u2014\u2014\u2014\u2295\u2014[M]

Qiskit:  qc = QuantumCircuit(2)
         qc.h(0)
         qc.cx(0, 1)
         qc.measure_all()`}
        </pre>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>In Qiskit, <code className="text-emerald-400">qc.barrier()</code> draws a vertical dashed line.
        It doesn&apos;t change the physics &mdash; it prevents the transpiler from reordering gates across it.
        Think of it as a &ldquo;do not optimize across this line&rdquo; marker.</p>
      </div>
    ),
    quiz: {
      question: 'Which Qiskit method applies a CNOT gate?',
      choices: [
        'qc.cnot(0, 1)',
        'qc.cx(0, 1)',
        'qc.x(0, 1)',
        'qc.controlled_x(0, 1)',
      ],
      correct: 1,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Circuits() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('circuits', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['circuits']) markDone('circuits')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('circuits', step)
  }

  return (
    <ModuleLayout
      moduleId="circuits"
      title="Quantum Circuits"
      subtitle="Learn to read, build, and step through quantum circuits — the language of quantum algorithms."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/entanglement', label: 'Module 7: Entanglement' }}
      next={{ to: '/measurement', label: 'Module 9: Measurement & Basis' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <LessonCard
            lesson={lesson}
            lessonIndex={step}
            totalLessons={LESSONS.length}
            isPassed={passed[step]}
            onPass={handleQuizPass}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 8 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 9 to explore measurement and basis.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <StepNav
        steps={LESSONS.length}
        current={step}
        passed={passed}
        onNext={() => setStep(s => s + 1)}
        onPrev={() => setStep(s => s - 1)}
        onGoto={setStep}
      />
    </ModuleLayout>
  )
}
