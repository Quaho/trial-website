import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
import GlossaryTooltip from '../../components/GlossaryTooltip'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const GATES_OUTLINE = [
  { id: 'gates-unitary', label: 'Gates are reversible transformations' },
  { id: 'gates-x', label: 'Pauli-X' },
  { id: 'gates-z', label: 'Pauli-Z' },
  { id: 'gates-h', label: 'Hadamard' },
  { id: 'gates-phase', label: 'S and T phase gates' },
  { id: 'gates-next', label: 'Next steps' },
]

function GatesSupport() {
  return (
    <>
      <RailCard label="Key Identities" title="Single-Qubit Gate Landmarks">
        <ul className="space-y-2 font-mono text-slate-200">
          <li>U†U = I</li>
          <li>X² = I</li>
          <li>H² = I</li>
          <li>S² = Z</li>
          <li>T² = S</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="What This Chapter Should Settle">
        <ul className="space-y-2">
          <li>Gates are unitary transformations, not measurements.</li>
          <li>X, Z, and H look different depending on the basis you use to read the state.</li>
          <li>Phase gates matter because later operations can turn phase into observable amplitude differences.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/multiqubit" className="btn-secondary justify-center">Go To Multi-Qubit</Link>
          <Link to="/glossary" className="btn-ghost justify-center">Review Glossary</Link>
        </div>
      </RailCard>
    </>
  )
}

function GateConceptVisual() {
  const [applied, setApplied] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Unitary Action on a State</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        Toggle the operator <InlineMath>{'U'}</InlineMath>. The point is not animation for its own
        sake, but the distinction between the input state <InlineMath>{'|\\psi\\rangle'}</InlineMath> and
        the transformed state <InlineMath>{'U|\\psi\\rangle'}</InlineMath>.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <div
          className={`rounded-xl border-2 px-4 py-3 font-mono text-lg transition-all duration-300 ${
            applied
              ? 'border-slate-700 bg-slate-900/40 text-slate-500'
              : 'border-sky-500 bg-sky-900/30 text-sky-300'
          }`}
        >
          |ψ⟩
        </div>
        <div className="text-xl text-slate-600">→</div>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-sky-600/60 bg-sky-900/40 text-xl font-bold text-sky-300">
          U
        </div>
        <div className="text-xl text-slate-600">→</div>
        <div
          className={`rounded-xl border-2 px-4 py-3 font-mono text-lg transition-all duration-300 ${
            applied
              ? 'border-sky-500 bg-sky-900/30 text-sky-300'
              : 'border-slate-700 bg-slate-900/40 text-slate-500'
          }`}
        >
          U|ψ⟩
        </div>
      </div>

      <button
        onClick={() => setApplied((value) => !value)}
        className="btn-primary mt-5 text-sm"
        aria-label={applied ? 'Undo the unitary action' : 'Apply the unitary action'}
      >
        {applied ? 'Apply U†' : 'Apply U'}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        A gate changes the state vector without measuring it. Because the operator is unitary, the
        inverse <InlineMath>{'U^\\dagger'}</InlineMath> restores the original state.
      </p>
    </div>
  )
}

function XGateVisual() {
  const states = [
    { input: '|0⟩', output: '|1⟩', accent: 'amber', desc: 'In the computational basis, X swaps 0 and 1.' },
    { input: '|1⟩', output: '|0⟩', accent: 'amber', desc: 'The same swap works in the opposite direction.' },
    { input: '|+⟩', output: '|+⟩', accent: 'emerald', desc: '|+⟩ is an eigenstate of X with eigenvalue +1.' },
    { input: '|−⟩', output: '|−⟩', accent: 'emerald', desc: '|−⟩ is preserved up to a global sign, so the physical state is unchanged.' },
  ]
  const [selected, setSelected] = useState(0)
  const current = states[selected]

  const outputClass =
    current.accent === 'amber'
      ? 'border-amber-500/60 bg-amber-900/20 text-amber-300'
      : 'border-emerald-500/60 bg-emerald-900/20 text-emerald-300'

  const descClass = current.accent === 'amber' ? 'text-amber-400' : 'text-emerald-400'

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Pauli-X Across Different Input States</h3>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {states.map((state, index) => (
          <button
            key={state.input}
            onClick={() => setSelected(index)}
            className={`rounded-full px-3 py-1.5 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              index === selected
                ? 'bg-sky-600 text-white focus-visible:outline-sky-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'
            }`}
            aria-label={`Use ${state.input} as the input state`}
          >
            {state.input}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.input}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-6 flex items-center justify-center gap-3 sm:gap-5"
        >
          <div className="rounded-xl border-2 border-sky-600/50 bg-sky-900/20 px-4 py-3 font-mono text-lg text-sky-300">
            {current.input}
          </div>
          <div className="text-xl text-slate-600">→</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-sky-600/60 bg-sky-900/40 font-mono text-lg font-bold text-sky-300">
            X
          </div>
          <div className="text-xl text-slate-600">→</div>
          <div className={`rounded-xl border-2 px-4 py-3 font-mono text-lg ${outputClass}`}>
            {current.output}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className={`mt-4 text-center text-sm font-medium ${descClass}`}>{current.desc}</p>
    </div>
  )
}

function ZGateVisual() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Why Z Looks Invisible in One Basis and Obvious in Another</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        Start with <InlineMath>{'|+\\rangle'}</InlineMath>. Applying <InlineMath>{'Z'}</InlineMath> changes
        relative phase, so the computational-basis probabilities stay the same even though the state has changed.
      </p>

      <div className="mt-5 text-center">
        <p className="font-mono text-base text-sky-300 sm:text-lg">
          Z|+⟩ = (|0⟩ − |1⟩) / √2 = |−⟩
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Measure in Z basis</p>
          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-mono text-slate-300">|0⟩</span>
                <span className="text-slate-400">50%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-sky-500/70" style={{ width: '50%' }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-mono text-slate-300">|1⟩</span>
                <span className="text-slate-400">50%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-sky-500/70" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            The outcome distribution matches the original <InlineMath>{'|+\\rangle'}</InlineMath> state.
          </p>
        </div>

        <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-300">Measure in X basis</p>
          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-mono text-slate-300">|+⟩</span>
                <span className="text-slate-400">0%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-red-500/70" style={{ width: '0%' }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-mono text-slate-300">|−⟩</span>
                <span className="text-amber-400">100%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-amber-500/70" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-violet-300">
            Basis change converts the relative phase into a detectable difference.
          </p>
        </div>
      </div>
    </div>
  )
}

function HadamardVisual() {
  const states = [
    { input: '|0⟩', output: '|+⟩', desc: 'Maps a Z-basis state into an X-basis superposition.' },
    { input: '|1⟩', output: '|−⟩', desc: 'The minus sign distinguishes the second X-basis vector.' },
    { input: '|+⟩', output: '|0⟩', desc: 'Running H again moves back from the X basis into the Z basis.' },
    { input: '|−⟩', output: '|1⟩', desc: 'This is why H is its own inverse: H² = I.' },
  ]
  const [selected, setSelected] = useState(0)
  const current = states[selected]

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Hadamard as a Basis-Change Operator</h3>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {states.map((state, index) => (
          <button
            key={state.input}
            onClick={() => setSelected(index)}
            className={`rounded-full px-3 py-1.5 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              index === selected
                ? 'bg-sky-600 text-white focus-visible:outline-sky-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'
            }`}
            aria-label={`Use ${state.input} as the Hadamard input`}
          >
            {state.input}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.input}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-6 flex items-center justify-center gap-3 sm:gap-5"
        >
          <div className="rounded-xl border-2 border-sky-600/50 bg-sky-900/20 px-4 py-3 font-mono text-lg text-sky-300">
            {current.input}
          </div>
          <div className="text-xl text-slate-600">→</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-sky-600/60 bg-sky-900/40 font-mono text-lg font-bold text-sky-300">
            H
          </div>
          <div className="text-xl text-slate-600">→</div>
          <div className="rounded-xl border-2 border-sky-500/60 bg-sky-900/20 px-4 py-3 font-mono text-lg text-sky-300">
            {current.output}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-center text-sm font-medium text-sky-400">{current.desc}</p>
      <p className="mt-2 text-center text-xs text-slate-500">
        The Hadamard gate changes basis. It does not measure the qubit and it does not "collapse" anything.
      </p>
    </div>
  )
}

function PhaseGatesVisual() {
  const gates = [
    { label: 'T', angle: 45, color: '#f97316', desc: 'π/4 rotation' },
    { label: 'S', angle: 90, color: '#8b5cf6', desc: 'π/2 rotation' },
    { label: 'Z', angle: 180, color: '#38bdf8', desc: 'π rotation' },
  ]

  const cx = 80
  const cy = 80
  const radius = 58

  function toXY(degrees) {
    const radians = (degrees * Math.PI) / 180
    return { x: cx + radius * Math.cos(radians), y: cy - radius * Math.sin(radians) }
  }

  function arcPath(degrees) {
    const radians = (degrees * Math.PI) / 180
    const endX = cx + radius * Math.cos(radians)
    const endY = cy - radius * Math.sin(radians)
    const largeArc = degrees > 180 ? 1 : 0
    return `M ${cx + radius} ${cy} A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY}`
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Map</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Nested Z-Axis Rotations</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        The gates <InlineMath>{'T'}</InlineMath>, <InlineMath>{'S'}</InlineMath>, and <InlineMath>{'Z'}</InlineMath>{' '}
        sit on the same rotational family. The only difference is the angle added to the phase of the
        <InlineMath>{'|1\\rangle'}</InlineMath> component.
      </p>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
        <svg
          viewBox="0 0 160 160"
          className="h-32 w-32 flex-shrink-0 sm:h-44 sm:w-44"
          role="img"
          aria-label="Unit circle showing T at 45 degrees, S at 90 degrees, and Z at 180 degrees"
        >
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#334155" strokeWidth="1.5" />
          <line x1={cx - radius - 8} y1={cy} x2={cx + radius + 8} y2={cy} stroke="#475569" strokeWidth="1" />
          <line x1={cx} y1={cy - radius - 8} x2={cx} y2={cy + radius + 8} stroke="#475569" strokeWidth="1" />
          <circle cx={cx + radius} cy={cy} r={4} fill="#94a3b8" />
          <text x={cx + radius + 6} y={cy + 4} fill="#94a3b8" fontFamily="monospace" fontSize="9">1</text>

          {gates.map((gate) => {
            const point = toXY(gate.angle)
            return (
              <g key={gate.label}>
                <path
                  d={arcPath(gate.angle)}
                  fill="none"
                  stroke={gate.color}
                  strokeDasharray="4 3"
                  strokeWidth="2"
                  opacity="0.5"
                />
                <circle cx={point.x} cy={point.y} r={5} fill={gate.color} />
                <text
                  x={point.x + (gate.angle <= 90 ? 8 : -16)}
                  y={point.y + (gate.angle <= 90 ? -6 : 4)}
                  fill={gate.color}
                  fontFamily="monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {gate.label}
                </text>
              </g>
            )
          })}

          <text x={cx + 2} y={cy - radius - 4} fill="#64748b" fontSize="9">Im</text>
          <text x={cx + radius + 4} y={cy + 12} fill="#64748b" fontSize="9">Re</text>
        </svg>

        <div className="w-full flex-1 space-y-3">
          {gates.map((gate) => (
            <div key={gate.label} className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg font-mono text-base font-bold"
                style={{ backgroundColor: `${gate.color}20`, border: `1px solid ${gate.color}50`, color: gate.color }}
              >
                {gate.label}
              </div>
              <div>
                <span className="text-sm font-medium text-white">{gate.label} gate</span>
                <span className="text-sm text-slate-400"> adds a {gate.desc} around the Z axis.</span>
              </div>
            </div>
          ))}
          <p className="pl-1 text-xs text-slate-500">
            The algebraic relationships <InlineMath>{'T^2 = S'}</InlineMath> and <InlineMath>{'S^2 = Z'}</InlineMath>{' '}
            reflect the same nesting shown geometrically here.
          </p>
        </div>
      </div>
    </div>
  )
}

function GateSummaryVisual() {
  const gates = [
    { symbol: 'X', name: 'Bit flip', action: '|0⟩ ↔ |1⟩', axis: '180° around X' },
    { symbol: 'Y', name: 'Bit + phase', action: '|0⟩ ↔ i|1⟩', axis: '180° around Y' },
    { symbol: 'Z', name: 'Phase flip', action: '|1⟩ → −|1⟩', axis: '180° around Z' },
    { symbol: 'H', name: 'Basis change', action: 'Z basis ↔ X basis', axis: 'Bridge between bases' },
    { symbol: 'S', name: 'Quarter-turn phase', action: '|1⟩ → i|1⟩', axis: '90° around Z' },
    { symbol: 'T', name: 'Eighth-turn phase', action: '|1⟩ → e^(iπ/4)|1⟩', axis: '45° around Z' },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {gates.map((gate) => (
        <div key={gate.symbol} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-sky-700/50 bg-sky-900/40 font-mono text-lg font-bold text-sky-400">
            {gate.symbol}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{gate.name}</p>
            <p className="mt-0.5 font-mono text-xs text-sky-400">{gate.action}</p>
            <p className="mt-0.5 text-xs text-slate-500">{gate.axis}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Gates() {
  return (
    <ModuleLayout
      moduleId="gates"
      title="Single-Qubit Gates"
      subtitle="Unitary operations that rotate one-qubit states, change basis, and control phase."
      prev={{ to: '/qiskit', label: 'Module 4: Qiskit' }}
      next={{ to: '/multiqubit', label: 'Module 6: Multi-Qubit Systems' }}
      outline={GATES_OUTLINE}
      aside={<GatesSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          <Keyword tone="gate">Single-qubit gates</Keyword> are the first place where the abstract
          notation becomes operational. A state such as{' '}
          <InlineMath>{'|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle'}</InlineMath> is not static;
          gates transform it in controlled, reversible ways. The central question is not merely "what
          button did we press?" but which <Keyword tone="amplitude">amplitudes</Keyword> changed, which
          <Keyword tone="phase">phases</Keyword> changed, and in which <Keyword tone="basis">measurement basis</Keyword>{' '}
          those changes become visible.
        </p>
        <p>
          This chapter focuses on the standard beginner gate family: the Pauli operators, the Hadamard
          gate, and the <Keyword tone="phase">phase gates</Keyword> <InlineMath>{'S'}</InlineMath> and
          <InlineMath>{'T'}</InlineMath>. The aim is not exhaustive coverage. It is to build a durable
          model for how one-qubit operations behave mathematically and how that behavior shows up in circuits.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with bra-ket notation, computational basis states, and relative phase.',
            'Familiarity with the Qiskit chapter helps, but this module stays focused on the mathematics.',
            'Basic linear-algebra language is useful: matrix, vector, inverse, and eigenstate.',
          ]}
        >
          If you want to reconnect the mathematics to API calls before diving in, revisit{' '}
          <Link to="/qiskit" className="text-indigo-400 transition-colors hover:text-indigo-300">
            Qiskit
          </Link>
          .
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Understand single-qubit <Keyword tone="gate">gates</Keyword> as <GlossaryTooltip term="Unitary"><Keyword tone="unitary">unitary</Keyword></GlossaryTooltip> operators rather than as <Keyword tone="measurement">measurements</Keyword>.</li>
            <li>Predict how X, Z, H, S, and T act on both <Keyword tone="basis">basis states</Keyword> and <Keyword tone="superposition">superposition states</Keyword>.</li>
            <li>Recognize when a gate changes observable probabilities and when it changes only <Keyword tone="phase">phase</Keyword>.</li>
          </ul>
        </div>
      </div>

      <section id="gates-unitary" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Gates are reversible state transformations</h2>
        <p className="section-sub">
          Before distinguishing X from Z or H from S, it is worth fixing the common structure: every
          ordinary <Keyword tone="gate">gate</Keyword> is a reversible linear transformation on the state
          vector of the <Keyword tone="qubit">qubit</Keyword>.
        </p>

        <DefinitionBox term="Single-Qubit Gate">
          A single-qubit <GlossaryTooltip term="Gate"><Keyword tone="gate">gate</Keyword></GlossaryTooltip>{' '}
          is a <InlineMath>{'2 \\times 2'}</InlineMath> <Keyword tone="unitary">unitary</Keyword> matrix
          acting on a one-qubit state vector. It changes <Keyword tone="amplitude">amplitudes</Keyword>{' '}
          and <Keyword tone="phase">phases</Keyword> while preserving total probability.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="U†U = I">
            <Keyword tone="unitary">Unitarity</Keyword> means the adjoint <InlineMath>{'U^\\dagger'}</InlineMath>{' '}
            is the inverse of <InlineMath>{'U'}</InlineMath>. That is why a <Keyword tone="gate">gate</Keyword>{' '}
            can be undone exactly, unlike an ordinary <Keyword tone="measurement">measurement</Keyword>.
          </NotationBox>
        </div>

        <div className="mt-4">
          <NotationBox symbol="qc.x(0), qc.z(0), qc.h(0), qc.s(0), qc.t(0)">
            In Qiskit, the method names mirror the mathematical gates closely. The software syntax is
            intentionally thin because the matrix action is the real content.
          </NotationBox>
        </div>

        <div className="mt-6">
          <GateConceptVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Linear Action">
            <MathDisplay>{'U(\\alpha|0\\rangle + \\beta|1\\rangle) = \\alpha U|0\\rangle + \\beta U|1\\rangle'}</MathDisplay>
            <p>
              This is why understanding the gate action on basis states is so useful. Once you know what
              a gate does to <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>,
              linearity tells you how it acts on every superposition built from them.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Measurement is intentionally separate from this chapter&apos;s core idea. Gates are unitary and
            reversible. Measurement is neither. Confusing the two leads to most beginner mistakes.
          </RemarkBox>
        </div>
      </section>

      <section id="gates-x" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Pauli-X: basis-state flip, not universal change</h2>
        <p className="section-sub">
          X is the closest quantum analogue of a classical NOT gate, but that analogy is only fully
          reliable in the computational basis.
        </p>

        <DefinitionBox term="Pauli-X">
          The Pauli-X gate swaps the computational-basis states:
          <InlineMath>{'X|0\\rangle = |1\\rangle'}</InlineMath> and
          <InlineMath>{'X|1\\rangle = |0\\rangle'}</InlineMath>. On the Bloch sphere, it is a 180-degree
          rotation about the X axis.
        </DefinitionBox>

        <div className="mt-6">
          <XGateVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Why X Leaves |+⟩ Alone">
            <MathDisplay>{'X|+\\rangle = X\\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = \\frac{|1\\rangle + |0\\rangle}{\\sqrt{2}} = |+\\rangle'}</MathDisplay>
            <p>
              The state <InlineMath>{'|+\\rangle'}</InlineMath> is an eigenstate of X. That is why a gate
              that obviously flips <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>
              can appear to do nothing when the qubit is expressed in a different basis.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Do not overlearn the phrase "X flips the qubit." It flips computational-basis labels. More
            generally, it rotates the state vector, and some states lie directly on that rotation axis.
          </RemarkBox>
        </div>
      </section>

      <section id="gates-z" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Pauli-Z: phase changes that require the right viewpoint</h2>
        <p className="section-sub">
          Z is the cleanest illustration of why phase matters. It can change the state in a physically
          meaningful way without changing computational-basis probabilities at all.
        </p>

        <DefinitionBox term="Pauli-Z">
          The Pauli-Z gate leaves <InlineMath>{'|0\\rangle'}</InlineMath> unchanged and multiplies
          <InlineMath>{'|1\\rangle'}</InlineMath> by <InlineMath>{'-1'}</InlineMath>. It is therefore a
          phase operator rather than a bit-flip operator.
        </DefinitionBox>

        <div className="mt-4">
          <ExampleBox title="Worked Example: Z on the Plus State">
            <MathDisplay>{'Z|+\\rangle = Z\\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle'}</MathDisplay>
            <p>
              In the Z basis, both <InlineMath>{'|+\\rangle'}</InlineMath> and <InlineMath>{'|-\\rangle'}</InlineMath>
              still give 50/50 outcomes. The phase change becomes visible only after a basis change.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ZGateVisual />
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the right mental model for phase-sensitive computation: a gate can matter deeply even
            when a single measurement basis makes it look invisible.
          </RemarkBox>
        </div>
      </section>

      <section id="gates-h" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Hadamard: moving between the Z and X worlds</h2>
        <p className="section-sub">
          Hadamard is the gate that turns basis states into X-basis superpositions and turns those
          superpositions back into basis states. That is why it appears constantly in algorithms.
        </p>

        <DefinitionBox term="Hadamard Gate">
          The Hadamard gate maps <InlineMath>{'|0\\rangle'}</InlineMath> to
          <InlineMath>{'|+\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath> to
          <InlineMath>{'|-\\rangle'}</InlineMath>. It is its own inverse, so
          <InlineMath>{'H^2 = I'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <ExampleBox title="Worked Example: Basis Conversion Identity">
            <MathDisplay>{'HXH = Z \\qquad HZH = X'}</MathDisplay>
            <p>
              These identities formalize the idea that H changes viewpoint. Conjugating by Hadamard
              swaps which axis of the Bloch sphere looks like the "measurement axis" of interest.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <HadamardVisual />
        </div>

        <div className="mt-6">
          <RemarkBox>
            A Hadamard gate does not partially measure the qubit, and it does not "collapse
            superposition." It is a fully coherent unitary basis change.
          </RemarkBox>
        </div>
      </section>

      <section id="gates-phase" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">S and T: fractional phase control and the broader gate map</h2>
        <p className="section-sub">
          Once Z is understood as a phase flip, S and T become natural: they are smaller rotations about
          the same axis, useful when algorithms need more precise control over interference.
        </p>

        <DefinitionBox term="Phase Gates">
          The gates <InlineMath>{'S'}</InlineMath> and <InlineMath>{'T'}</InlineMath> act diagonally in the
          computational basis. They leave <InlineMath>{'|0\\rangle'}</InlineMath> unchanged and rotate only
          the phase of the <InlineMath>{'|1\\rangle'}</InlineMath> component.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="S² = Z, T² = S">
            These identities show that S and T are nested Z-axis rotations. The algebra and the geometry
            say the same thing in different languages.
          </NotationBox>
        </div>

        <div className="mt-6">
          <PhaseGatesVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Explicit Phase Factors">
            <MathDisplay>{'S|1\\rangle = i|1\\rangle \\qquad T|1\\rangle = e^{i\\pi/4}|1\\rangle'}</MathDisplay>
            <p>
              Neither gate changes computational-basis probabilities by itself. Their value is that they
              alter relative phase in a controlled way, which later circuits can convert into amplitude
              differences.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <GateSummaryVisual />
        </div>

        <div className="mt-6">
          <RemarkBox>
            In standard universality results, a small gate set can approximate arbitrary quantum
            computation. One common example is <InlineMath>{'{H, T, CNOT}'}</InlineMath>. In practical
            fault-tolerant settings, T gates are often the costly resource, which is why T-count
            optimization matters.
          </RemarkBox>
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Assuming a gate only matters if computational-basis measurement probabilities change immediately.',
              clarification:
                'Phase gates can alter the state without changing Z-basis probabilities. A later basis change can reveal the difference.',
            },
            {
              mistake: 'Thinking Hadamard performs a partial measurement or collapse.',
              clarification:
                'Hadamard is a unitary basis change. Measurement is a separate, non-unitary operation.',
            },
            {
              mistake: 'Believing X always "flips the qubit" in the same visible way for every state.',
              clarification:
                'X flips computational-basis states, but eigenstates such as |+⟩ behave differently because the action depends on basis.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Single-qubit gates are 2x2 unitary operators that transform amplitudes and phases reversibly.',
            'X is a computational-basis flip, Z is a phase operator, and H changes between the Z and X bases.',
            'S and T are fractional Z-axis rotations whose importance comes from precise phase control.',
            'Whether a gate looks observable depends on measurement basis, not just on the gate itself.',
          ]}
        />
      </div>

      <section id="gates-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Move from one wire to many</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next chapter extends this gate vocabulary to multi-qubit systems, where tensor products,
          control structure, and entanglement make the geometry more interesting and the bookkeeping more demanding.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/multiqubit" className="btn-primary">
            Continue to Multi-Qubit Systems
          </Link>
          <Link to="/qiskit" className="btn-secondary">
            Revisit Qiskit
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Review the Glossary
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
