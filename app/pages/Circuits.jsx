import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import Keyword from '../../components/Keyword'
import RailCard from '../../components/RailCard'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import ExpandableAside from '../../components/ExpandableAside'
import VideoAside from '../../components/VideoAside'
import GlossaryTooltip from '../../components/GlossaryTooltip'
import CodeBlock from '../../components/CodeBlock'
import MentorNote from '../../components/MentorNote'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const CIRCUITS_OUTLINE = [
  { id: 'circuits-reading', label: 'Reading a circuit diagram' },
  { id: 'circuits-elements', label: 'Wires, gates, and measurement' },
  { id: 'circuits-stepping', label: 'Tracking state through a circuit' },
  { id: 'circuits-bell', label: 'The Bell circuit end to end' },
  { id: 'circuits-code', label: 'From circuit to Qiskit code' },
  { id: 'circuits-mistakes', label: 'Common reading mistakes' },
  { id: 'circuits-next', label: 'Next steps' },
]

function CircuitsSupport() {
  return (
    <>
      <RailCard label="Key Symbols" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-emerald-300">&mdash;</span>: a wire, one per qubit, starting in <InlineMath>{'|0\\rangle'}</InlineMath> by default.</li>
          <li><span className="font-mono text-emerald-300">&#9633;</span>: a single-qubit gate box (H, X, Z, S, T, &hellip;).</li>
          <li><span className="font-mono text-emerald-300">&bull; &ndash; &#8853;</span>: a CNOT, control dot on top of a vertical line ending in the target circle.</li>
          <li><span className="font-mono text-emerald-300">&#9633;&#8776;</span>: a measurement meter, always irreversible.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="Diagram-Reading Traps">
        <ul className="space-y-2">
          <li>Left-to-right position is chronological order, not spatial layout.</li>
          <li>Gates stacked in the same time column act simultaneously, not in sequence.</li>
          <li>A diagram and its Qiskit code describe the exact same operations &mdash; neither is an approximation of the other.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/projects/first-circuit" className="btn-secondary justify-center">Open First Circuit</Link>
          <Link to="/gates" className="btn-ghost justify-center">Review Single-Qubit Gates</Link>
        </div>
      </RailCard>
    </>
  )
}

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function CircuitAnatomyVisual() {
  const [highlight, setHighlight] = useState(null)

  const parts = [
    { id: 'time', label: 'Time flows left → right', color: 'text-emerald-400' },
    { id: 'wire', label: 'Each wire = one qubit', color: 'text-sky-400' },
    { id: 'gate', label: 'Boxes = gates', color: 'text-violet-400' },
    { id: 'meter', label: 'Meter = measurement', color: 'text-amber-400' },
  ]

  return (
    <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/15 p-5">
      <p className="section-label text-emerald-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Anatomy of a Quantum Circuit</h3>

      <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-6 max-h-[140px] overflow-hidden sm:max-h-none">
        <svg viewBox="0 0 440 160" className="w-full" role="img"
             aria-label="A quantum circuit with two qubit wires, H and CNOT gates, and measurement symbols">
          <line x1="60" y1="50" x2="380" y2="50"
                stroke={highlight === 'wire' ? '#38bdf8' : '#475569'} strokeWidth="2" />
          <line x1="60" y1="120" x2="380" y2="120"
                stroke={highlight === 'wire' ? '#38bdf8' : '#475569'} strokeWidth="2" />

          <text x="30" y="54" fill={highlight === 'wire' ? '#38bdf8' : '#94a3b8'}
                fontSize="14" fontFamily="monospace" textAnchor="end">q0</text>
          <text x="30" y="124" fill={highlight === 'wire' ? '#38bdf8' : '#94a3b8'}
                fontSize="14" fontFamily="monospace" textAnchor="end">q1</text>

          <rect x="120" y="28" width="44" height="44" rx="8"
                fill={highlight === 'gate' ? '#8b5cf620' : '#0f172a'}
                stroke={highlight === 'gate' ? '#8b5cf6' : '#334155'} strokeWidth="2" />
          <text x="142" y="56" fill={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'}
                fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>

          <circle cx="230" cy="50" r="6"
                  fill={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} />
          <line x1="230" y1="56" x2="230" y2="106"
                stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />
          <circle cx="230" cy="120" r="14"
                  fill="none" stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />
          <line x1="230" y1="106" x2="230" y2="134"
                stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />
          <line x1="216" y1="120" x2="244" y2="120"
                stroke={highlight === 'gate' ? '#a78bfa' : '#6ee7b7'} strokeWidth="2" />

          <rect x="310" y="30" width="40" height="40" rx="6"
                fill={highlight === 'meter' ? '#f59e0b20' : '#0f172a'}
                stroke={highlight === 'meter' ? '#f59e0b' : '#334155'} strokeWidth="2" />
          <path d="M318 58 Q330 40 342 58" fill="none"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />
          <line x1="330" y1="48" x2="338" y2="36"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />

          <rect x="310" y="100" width="40" height="40" rx="6"
                fill={highlight === 'meter' ? '#f59e0b20' : '#0f172a'}
                stroke={highlight === 'meter' ? '#f59e0b' : '#334155'} strokeWidth="2" />
          <path d="M318 128 Q330 110 342 128" fill="none"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />
          <line x1="330" y1="118" x2="338" y2="106"
                stroke={highlight === 'meter' ? '#f59e0b' : '#94a3b8'} strokeWidth="1.5" />

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

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {parts.map(p => (
          <button
            key={p.id}
            onClick={() => setHighlight(h => h === p.id ? null : p.id)}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
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
      desc: 'Horizontal lines that carry quantum information. One wire per qubit, all start in |0⟩ by default.',
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
          <rect x="20" y="20" width="36" height="36" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="38" y="44" fill="#6ee7b7" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">H</text>
          <rect x="76" y="20" width="36" height="36" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="94" y="44" fill="#6ee7b7" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">X</text>
          <rect x="132" y="20" width="36" height="36" rx="6" fill="#0f172a" stroke="#6ee7b7" strokeWidth="2" />
          <text x="150" y="44" fill="#6ee7b7" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Z</text>
          <circle cx="230" cy="38" r="6" fill="#6ee7b7" />
          <line x1="230" y1="44" x2="230" y2="78" stroke="#6ee7b7" strokeWidth="2" />
          <circle cx="230" cy="90" r="14" fill="none" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="216" y1="90" x2="244" y2="90" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="230" y1="76" x2="230" y2="104" stroke="#6ee7b7" strokeWidth="2" />
          <text x="260" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace">● ctrl</text>
          <text x="260" y="94" fill="#94a3b8" fontSize="10" fontFamily="monospace">⊕ tgt</text>
        </svg>
      ),
    },
    {
      name: 'Measurement',
      desc: 'The meter symbol collapses a qubit to a classical bit (0 or 1). After measurement, the quantum state is destroyed. A classical double-line carries the result.',
      svg: (
        <svg viewBox="0 0 200 100" className="w-full max-w-xs mx-auto" role="img"
             aria-label="Measurement symbol: a meter icon with a classical double-line output">
          <line x1="20" y1="50" x2="60" y2="50" stroke="#475569" strokeWidth="2" />
          <rect x="60" y="28" width="44" height="44" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
          <path d="M70 60 Q82 40 94 60" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="82" y1="48" x2="90" y2="34" stroke="#f59e0b" strokeWidth="1.5" />
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
    <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/15 p-5">
      <p className="section-label text-emerald-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">The Three Building Blocks</h3>

      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
              ${i === active
                ? 'bg-emerald-900/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white'}`}
            aria-label={`Show ${tab.name} element`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 p-4">
            {t.svg}
          </div>
          <p className="mt-3 text-sm text-slate-300 text-center leading-relaxed">{t.desc}</p>
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
      stateKatex: '|00\\rangle',
      desc: 'Both qubits begin in the ground state |0⟩.',
      hActive: false,
      cxActive: false,
      amps: [{ basis: '|00⟩', val: 1 }, { basis: '|01⟩', val: 0 }, { basis: '|10⟩', val: 0 }, { basis: '|11⟩', val: 0 }],
    },
    {
      label: 'After H on q0',
      stateKatex: '\\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}',
      desc: 'H puts q0 into superposition. q1 is still |0⟩. Not entangled yet.',
      hActive: true,
      cxActive: false,
      amps: [{ basis: '|00⟩', val: 0.5 }, { basis: '|01⟩', val: 0 }, { basis: '|10⟩', val: 0.5 }, { basis: '|11⟩', val: 0 }],
    },
    {
      label: 'After CNOT',
      stateKatex: '\\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
      desc: 'CNOT flips q1 when q0 = |1⟩. The |10⟩ term becomes |11⟩. This is a Bell state.',
      hActive: true,
      cxActive: true,
      amps: [{ basis: '|00⟩', val: 0.5 }, { basis: '|01⟩', val: 0 }, { basis: '|10⟩', val: 0 }, { basis: '|11⟩', val: 0.5 }],
    },
  ]

  const s = steps[currentStep]

  const gateStyle = (active) =>
    active
      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
      : 'bg-slate-900/40 border-slate-700 text-slate-500'

  return (
    <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/15 p-5">
      <p className="section-label text-emerald-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">
        Step Through: |00&#x27E9; &rarr; H &rarr; CNOT
      </h3>

      <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5">
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

      <div className="mt-4 flex justify-center gap-2">
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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center mt-4"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
          <div className="font-mono text-emerald-300 text-lg sm:text-xl font-semibold mb-1">
            <InlineMath>{s.stateKatex}</InlineMath>
          </div>
          <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 bg-slate-900/60 rounded-xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium text-center">
          Amplitudes (probability = amplitude&sup2;)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {s.amps.map(a => (
            <div key={a.basis}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">{a.basis}</span>
                <span className="text-slate-400">{a.val > 0 ? `1/√2` : '0'}</span>
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

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(c => c - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-slate-800 text-slate-300 hover:bg-slate-700
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400
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
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
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
      label: 'Both qubits |0⟩',
      state: '|00⟩',
      desc: 'Both qubits start in the ground state.',
      hActive: false,
      cxActive: false,
      mActive: false,
      amps: [1, 0, 0, 0],
    },
    {
      label: 'H on q0',
      state: '(|00⟩ + |10⟩) / √2',
      desc: 'H creates superposition on q0. q1 is still |0⟩.',
      hActive: true,
      cxActive: false,
      mActive: false,
      amps: [0.5, 0, 0.5, 0],
    },
    {
      label: 'CNOT',
      state: '(|00⟩ + |11⟩) / √2',
      desc: 'CNOT entangles: |10⟩ becomes |11⟩. This is a Bell state.',
      hActive: true,
      cxActive: true,
      mActive: false,
      amps: [0.5, 0, 0, 0.5],
    },
    {
      label: 'Measurement',
      state: '|00⟩ or |11⟩',
      desc: 'Always correlated: both 0 or both 1. Never 01 or 10.',
      hActive: true,
      cxActive: true,
      mActive: true,
      amps: [0.5, 0, 0, 0.5],
    },
  ]

  const basisLabels = ['|00⟩', '|01⟩', '|10⟩', '|11⟩']
  const s = steps[currentStep]

  const gateStyle = (active) =>
    active
      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
      : 'bg-slate-900/40 border-slate-700 text-slate-500'

  return (
    <div>
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

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(c => c - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-slate-800 text-slate-300 hover:bg-slate-700
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400
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
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
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
    <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/15 p-5">
      <p className="section-label text-emerald-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Circuit Diagram &harr; Qiskit Code</h3>

      <div className="mt-4 flex gap-2 justify-center mb-1 flex-wrap">
        {circuits.map((cir, i) => (
          <button
            key={cir.name}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${i === selected
                ? 'bg-emerald-600 text-white focus-visible:outline-emerald-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
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
          className="mt-4"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">
                Circuit diagram
              </p>
              <div className="max-h-[140px] overflow-hidden sm:max-h-none">
                {c.diagram}
              </div>
            </div>

            <div className="flex-1">
              <CodeBlock
                language="python"
                label={`${c.name} circuit — Qiskit`}
                code={c.code}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Circuits() {
  return (
    <ModuleLayout
      moduleId="circuits"
      title="Quantum Circuits"
      subtitle="Read, build, and trace through quantum circuit diagrams — the standard notation that ties together state vectors and Qiskit code."
      prev={{ to: '/entanglement', label: 'Module 8: Entanglement' }}
      next={{ to: '/measurement', label: 'Module 10: Measurement & Basis' }}
      outline={CIRCUITS_OUTLINE}
      aside={<CircuitsSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          A <GlossaryTooltip term="Circuit"><Keyword tone="circuit">quantum circuit</Keyword></GlossaryTooltip> is
          a diagram that specifies the exact sequence of operations applied to a set of
          <Keyword tone="qubit"> qubits</Keyword>, read left to right like a timeline. It is the standard notation
          for describing quantum algorithms, and it corresponds directly to a short program in Qiskit.
        </p>
        <p>
          This chapter focuses on reading circuit diagrams correctly, tracking a state vector by hand as it
          passes through a small circuit, and translating a diagram into working Qiskit code. The running example
          throughout is the two-gate circuit that prepares a Bell pair, already introduced at the state-vector
          level in the previous module.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with single- and two-qubit basis states and bra-ket notation.',
            'Familiarity with the Hadamard gate and the controlled-NOT gate.',
            'The Bell state and why it does not factor into a product of local states.',
          ]}
        >
          If entanglement or the Bell state still feels unfamiliar, review{' '}
          <Link to="/entanglement" className="text-emerald-400 transition-colors hover:text-emerald-300">
            Entanglement
          </Link>{' '}
          before using this chapter's circuit-level view of it.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Read a circuit diagram element by element: wires, gates, and measurement.</li>
            <li>Track a state vector step by step as it passes through a small circuit.</li>
            <li>Explain why measurement is placed last and cannot be undone.</li>
            <li>Translate a circuit diagram into the equivalent Qiskit code.</li>
          </ul>
        </div>
      </div>

      <section id="circuits-reading" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Reading a circuit diagram</h2>
        <p className="section-sub">
          A circuit diagram encodes an entire sequence of operations in one picture. Reading it correctly starts
          with a single convention: position along the horizontal axis is time, not space.
        </p>

        <DefinitionBox term="Quantum Circuit">
          A <Keyword tone="circuit">quantum circuit</Keyword> is an ordered sequence of operations &mdash;{' '}
          <Keyword tone="gate">gates</Keyword> and <Keyword tone="measurement">measurements</Keyword> &mdash;
          applied to one or more <Keyword tone="qubit">qubits</Keyword>, drawn as horizontal wires read from left
          to right.
        </DefinitionBox>

        <div className="mt-6">
          <CircuitAnatomyVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Reading Order">
            <p>
              In a circuit with H on q0 followed by a CNOT on q0&ndash;q1, the Hadamard happens first. The CNOT
              then uses q0 as control and q1 as target. Left-to-right position is chronological order: earlier
              operations sit further left.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Unlike code, a circuit diagram makes parallel structure visible at a glance: gates stacked in the same
            time column act simultaneously, not one after another. Section 2 makes this precise.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <MentorNote>
            This handbook draws q0 as the top wire, and that is the common convention — but it is a
            convention, not a law. Before reading someone else's diagram, check the wire labels directly
            rather than assuming top-to-bottom always means q0, q1, q2. In Qiskit output specifically,
            recall from Multi-Qubit Systems that the printed bitstring order is reversed from this: the
            rightmost character is qubit 0.
          </MentorNote>
        </div>

        <div className="mt-6">
          <VideoAside
            title="Lecture 1.2 — Introduction to Quantum Circuits"
            description="A Qiskit lecture on reading and building quantum circuits — a more formal companion to this section's diagram."
            source="Qiskit"
            videoId="94pZPZ_nsW8"
          />
        </div>
      </section>

      <section id="circuits-elements" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Wires, gates, and measurement</h2>
        <p className="section-sub">
          Every quantum circuit is built from exactly three kinds of element. Recognizing them by shape is enough
          to start reading unfamiliar diagrams.
        </p>

        <DefinitionBox term="Wire, Gate, Measurement">
          A <em>wire</em> carries one qubit's worth of information through the circuit. A{' '}
          <GlossaryTooltip term="Gate"><Keyword tone="gate">gate</Keyword></GlossaryTooltip> is a reversible
          operation drawn as a box (or, for a controlled gate, a dot-and-line pair) on one or more wires. A{' '}
          <GlossaryTooltip term="Measurement"><Keyword tone="measurement">measurement</Keyword></GlossaryTooltip>{' '}
          is drawn as a meter symbol and collapses a qubit to a classical bit.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="&bull; (control) &ndash; &#8853; (target)">
            The <Keyword tone="gate">CNOT gate</Keyword> spans two wires: a filled dot on the control qubit
            connected by a vertical line to a &#8853; symbol on the target qubit. If the control is{' '}
            <InlineMath>{'|1\\rangle'}</InlineMath>, the target flips; if the control is{' '}
            <InlineMath>{'|0\\rangle'}</InlineMath>, nothing happens.
          </NotationBox>
        </div>

        <div className="mt-6">
          <CircuitElementsVisual />
        </div>

        <div className="mt-6">
          <RemarkBox>
            Every gate has an inverse and can be undone. Measurement is the one exception: it is irreversible, and
            by convention it is drawn last on any wire it appears on.
          </RemarkBox>
        </div>
      </section>

      <section id="circuits-stepping" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Tracking state through a circuit</h2>
        <p className="section-sub">
          The most reliable way to understand what a circuit does is to update the state vector one gate &mdash;
          or one time column &mdash; at a time, starting from the all-zero state.
        </p>

        <NotationBox symbol="(gate on q0) &otimes; (gate on q1)">
          Gates that sit in the same time column but act on different wires happen simultaneously. Their combined
          effect on the joint state is a tensor product of the individual gate matrices &mdash; in practice, this
          just means applying each gate to its own qubit independently.
        </NotationBox>

        <div className="mt-6">
          <CircuitStepperVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Tracking a One-Qubit Circuit">
            <p>
              Start: <InlineMath>{'|0\\rangle'}</InlineMath>. After H:{' '}
              <InlineMath>{'\\tfrac{|0\\rangle + |1\\rangle}{\\sqrt{2}}'}</InlineMath>. After Z:{' '}
              <InlineMath>{'\\tfrac{|0\\rangle - |1\\rangle}{\\sqrt{2}}'}</InlineMath>. Each gate transforms only
              the state produced by the previous one &mdash; there is never a need to look ahead in the circuit.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This step-by-step process is exactly what a simulator does internally, and exactly what you are
            asked to do by hand in the{' '}
            <Link to="/projects/first-circuit" className="text-emerald-400 transition-colors hover:text-emerald-300">
              First Circuit
            </Link>{' '}
            project's predict-then-check checkpoints.
          </RemarkBox>
        </div>
      </section>

      <section id="circuits-bell" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">The Bell circuit end to end</h2>
        <p className="section-sub">
          The two-gate circuit that prepares a Bell pair is the clearest bridge between circuit notation and the
          state-vector reasoning from the previous module.
        </p>

        <ExampleBox title="Worked Example: Amplitude Tracking Through H and CNOT">
          <MathDisplay>
            {'|00\\rangle \\xrightarrow{H \\otimes I} \\tfrac{1}{2}|00\\rangle + \\tfrac{1}{2}|10\\rangle \\xrightarrow{CX} \\tfrac{1}{2}|00\\rangle + \\tfrac{1}{2}|11\\rangle'}
          </MathDisplay>
          <p>
            After H on q0, the state is <InlineMath>{'\\tfrac{|00\\rangle + |10\\rangle}{\\sqrt{2}}'}</InlineMath>{' '}
            &mdash; q1 is untouched, so this is still a product state. The CNOT then flips q1 exactly where q0 is{' '}
            <InlineMath>{'|1\\rangle'}</InlineMath>, so the <InlineMath>{'|10\\rangle'}</InlineMath> term becomes{' '}
            <InlineMath>{'|11\\rangle'}</InlineMath>. Only <InlineMath>{'|00\\rangle'}</InlineMath> and{' '}
            <InlineMath>{'|11\\rangle'}</InlineMath> survive &mdash; the circuit-level signature of entanglement.
          </p>
        </ExampleBox>

        <div className="mt-6">
          <ExpandableAside title="Optional: step through all four stages, including measurement" label="Interactive Walkthrough">
            <BellStepperVisual />
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the same <Keyword tone="bell">Bell state</Keyword> defined in{' '}
            <Link to="/entanglement" className="text-emerald-400 transition-colors hover:text-emerald-300">
              Entanglement
            </Link>
            , now expressed as a circuit rather than as a state vector on its own. The{' '}
            <Link to="/projects/bell-explorer" className="text-emerald-400 transition-colors hover:text-emerald-300">
              Bell Explorer project
            </Link>{' '}
            lets you compare these ideal statistics against real simulation output.
          </RemarkBox>
        </div>
      </section>

      <section id="circuits-code" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">From circuit to Qiskit code</h2>
        <p className="section-sub">
          Once a circuit diagram can be read fluently, writing the equivalent Qiskit code is a direct, mechanical
          translation &mdash; not a separate skill.
        </p>

        <DefinitionBox term="Circuit-to-Code Translation">
          Each wire becomes a qubit index in <code className="text-emerald-300">QuantumCircuit(n)</code>. Each gate
          becomes a method call &mdash; <code className="text-emerald-300">.h(0)</code>,{' '}
          <code className="text-emerald-300">.cx(0, 1)</code>,{' '}
          <code className="text-emerald-300">.measure(...)</code>. Left-to-right order in the diagram becomes
          top-to-bottom order in the code.
        </DefinitionBox>

        <div className="mt-6">
          <CircuitToCodeVisual />
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: what qc.barrier() actually does" label="Implementation Note">
            <p>
              <code className="text-emerald-300">qc.barrier()</code> draws a vertical dashed line across the
              circuit. It does not change the physics of the circuit at all &mdash; it only prevents Qiskit's
              transpiler from reordering or merging gates across that line. Think of it as a "do not optimize
              across this point" marker, useful when you want the diagram to match your code exactly.
            </p>
          </ExpandableAside>
        </div>
      </section>

      <section id="circuits-mistakes" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 6</p>
        <h2 className="section-heading">Common reading mistakes</h2>
        <p className="section-sub">
          Most circuit-reading errors come from importing conventions that do not apply, rather than from the
          diagrams themselves.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Assuming a circuit reads top to bottom, or right to left.',
              clarification:
                'Time always flows left to right on every wire. Top-to-bottom position only distinguishes which qubit a wire belongs to, and carries no timing information.',
            },
            {
              mistake: 'Treating the CNOT control dot and target circle as interchangeable.',
              clarification:
                'The dot marks the control qubit and the circled plus marks the target. Swapping them changes which qubit is flipped and produces a physically different circuit.',
            },
            {
              mistake: 'Reading gates in the same time column as happening one after another.',
              clarification:
                'Gates stacked vertically in the same column act simultaneously on their respective qubits. Sequential order only applies to columns, not to rows within a column.',
            },
            {
              mistake: 'Treating qc.barrier() as a physical operation on the qubits.',
              clarification:
                'A barrier is a compiler instruction, not a gate. It has no matrix representation and does not appear in the mathematical description of the circuit.',
            },
          ]}
        />
      </section>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Circuit diagrams read left to right: wires are qubits, boxes are gates, and the meter symbol is measurement.',
            'Gates are reversible; measurement is not, which is why it is placed last.',
            'Tracking a circuit by hand means applying each time column to the current state vector, one column at a time, starting from the all-zero state.',
            'The two-gate Bell circuit (H then CNOT) is the standard bridge between state-vector reasoning and circuit notation.',
            'Every circuit diagram maps directly onto Qiskit method calls, in the same left-to-right, top-to-bottom order.',
          ]}
        />
      </div>

      <section id="circuits-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Reading Checklist</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">From circuit structure to measurement outcomes</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next module looks closely at what a measurement symbol actually computes, and why the same state
          can produce different outcome probabilities depending on the basis it is measured in.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/measurement" className="btn-primary">
            Continue to Measurement & Basis
          </Link>
          <Link to="/projects/first-circuit" className="btn-secondary">
            Try First Circuit
          </Link>
          <Link to="/references" className="btn-secondary">
            Open References
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
