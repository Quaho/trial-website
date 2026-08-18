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
import CodeBlock from '../../components/CodeBlock'
import GlossaryTooltip from '../../components/GlossaryTooltip'
import MentorNote from '../../components/MentorNote'

const LABS_OUTLINE = [
  { id: 'labs-create', label: 'Create a circuit' },
  { id: 'labs-gates', label: 'Apply gates and measure' },
  { id: 'labs-simulate', label: 'Simulate and read counts' },
  { id: 'labs-bell', label: 'Bell pair in Qiskit, end to end' },
  { id: 'labs-experiments', label: 'Mini experiments' },
  { id: 'labs-mistakes', label: 'Common mistakes' },
  { id: 'labs-next', label: 'Next steps' },
]

function LabsSupport() {
  return (
    <>
      <RailCard label="Key Calls" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-rose-300">QuantumCircuit(n)</span>: an n-qubit circuit, all qubits starting in |0&#x27E9;.</li>
          <li><span className="font-mono text-rose-300">.h(0)</span>, <span className="font-mono text-rose-300">.cx(0,1)</span>, <span className="font-mono text-rose-300">.measure_all()</span>: gate and measurement calls.</li>
          <li><span className="font-mono text-rose-300">AerSimulator().run(qc).result().get_counts()</span>: run and read out outcomes.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="Before You Trust the Output">
        <ul className="space-y-2">
          <li>The simulator is noise-free by default — real hardware is not.</li>
          <li>Exact shot-by-shot counts vary; the underlying probabilities do not.</li>
          <li>Every experiment here follows the same create &rarr; gate &rarr; measure &rarr; simulate pattern.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/projects/first-circuit" className="btn-secondary justify-center">Open First Circuit</Link>
          <Link to="/projects/bell-explorer" className="btn-ghost justify-center">Open Bell Explorer</Link>
        </div>
      </RailCard>
    </>
  )
}

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function CircuitSetupVisual() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      label: 'Step 1 — Import Qiskit',
      code: 'from qiskit import QuantumCircuit',
      desc: 'Load the QuantumCircuit class from Qiskit.',
    },
    {
      label: 'Step 2 — Create a circuit',
      code: 'from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2)',
      desc: 'Create a 2-qubit circuit. Both qubits start in |0⟩.',
    },
    {
      label: 'Step 3 — View the circuit',
      code: 'from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2)\nprint(qc)',
      desc: 'Print the circuit to see its structure — two empty wires, ready for gates.',
    },
  ]

  const s = steps[currentStep]

  return (
    <div className="rounded-2xl border border-rose-800/40 bg-rose-950/15 p-5">
      <p className="section-label text-rose-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Building a QuantumCircuit Step by Step</h3>

      <div className="mt-4 flex gap-2 justify-center">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${currentStep === i
                ? 'bg-rose-600 text-white focus-visible:outline-rose-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`Show step ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-4"
        >
          <p className="text-xs text-rose-400 font-medium uppercase tracking-wider mb-3">
            {s.label}
          </p>
          <CodeBlock code={s.code} language="python" label="python" />
          <p className="text-sm text-slate-400 mt-3">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 bg-slate-900/60 rounded-xl p-4">
        <div className="flex items-center justify-center gap-2 font-mono text-sm">
          <span className="text-rose-300">q0 |0&#x27E9;</span>
          <span className="text-slate-600">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</span>
        </div>
        <div className="flex items-center justify-center gap-2 font-mono text-sm mt-1">
          <span className="text-rose-300">q1 |0&#x27E9;</span>
          <span className="text-slate-600">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</span>
        </div>
        <p className="text-xs text-slate-500 text-center mt-3">
          Empty 2-qubit circuit — ready for gates.
        </p>
      </div>
    </div>
  )
}

function GatesAndMeasureVisual() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      label: 'Add Hadamard to qubit 0',
      code: 'qc.h(0)',
      circuit: [
        { wire: 'q0', gates: ['H'], end: '───' },
        { wire: 'q1', gates: [], end: '───────' },
      ],
      desc: 'H puts qubit 0 into superposition: equal chance of |0⟩ and |1⟩.',
    },
    {
      label: 'Add CNOT (q0 controls q1)',
      code: 'qc.h(0)\nqc.cx(0, 1)',
      circuit: [
        { wire: 'q0', gates: ['H', '●'], end: '───' },
        { wire: 'q1', gates: [' ', '⊕'], end: '───' },
      ],
      desc: 'CNOT entangles the two qubits — now they are a Bell pair.',
    },
    {
      label: 'Measure all qubits',
      code: 'qc.h(0)\nqc.cx(0, 1)\nqc.measure_all()',
      circuit: [
        { wire: 'q0', gates: ['H', '●', 'M'], end: '' },
        { wire: 'q1', gates: [' ', '⊕', 'M'], end: '' },
      ],
      desc: 'Measurement collapses the state. You get |00⟩ or |11⟩ — never |01⟩ or |10⟩.',
    },
  ]

  const s = steps[currentStep]

  return (
    <div className="rounded-2xl border border-rose-800/40 bg-rose-950/15 p-5">
      <p className="section-label text-rose-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Building a Bell Circuit, Gate by Gate</h3>

      <div className="mt-4 flex gap-2 justify-center">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${currentStep === i
                ? 'bg-rose-600 text-white focus-visible:outline-rose-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`Show step ${i + 1}: ${steps[i].label}`}
          >
            Step {i + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-4"
        >
          <p className="text-xs text-rose-400 font-medium uppercase tracking-wider mb-3">
            {s.label}
          </p>
          <CodeBlock code={s.code} language="python" label="python" />

          <div className="mt-4 bg-slate-900/60 rounded-xl p-4">
            {s.circuit.map((row, ri) => (
              <div key={ri} className="flex items-center gap-2 font-mono text-sm mb-1">
                <span className="text-rose-300 w-14 text-right">{row.wire}</span>
                <span className="text-slate-600">─</span>
                {row.gates.map((g, gi) => (
                  <span key={gi}>
                    {g === ' ' ? (
                      <span className="text-slate-600">───</span>
                    ) : g === 'M' ? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-900/40 border border-amber-700/50 text-amber-300 text-xs">
                        M
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-rose-900/40 border border-rose-700/50 text-rose-300 text-xs">
                        {g}
                      </span>
                    )}
                    {gi < row.gates.length - 1 && <span className="text-slate-600">─</span>}
                  </span>
                ))}
                <span className="text-slate-600">{row.end}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 mt-3">{s.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SimulateVisual() {
  const [phase, setPhase] = useState('predict')

  return (
    <div className="rounded-2xl border border-rose-800/40 bg-rose-950/15 p-5">
      <p className="section-label text-rose-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Simulate and Read Counts — Predict Before You Reveal</h3>

      <div className="mt-4">
        <CodeBlock
          code={`from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.measure_all()

simulator = AerSimulator()
result = simulator.run(qc).result()
counts = result.get_counts()
print(counts)`}
          language="python"
          label="Bell state simulation"
        />
      </div>

      <div className="mt-5">
        {phase === 'predict' ? (
          <div className="bg-slate-900/60 rounded-xl p-5 text-center">
            <p className="text-sm text-slate-300 mb-4">
              This circuit creates a Bell pair (H + CNOT on two qubits).
              <br />
              <strong className="text-white">What outcomes do you expect?</strong>
            </p>
            <button
              onClick={() => setPhase('reveal')}
              className="btn-primary text-sm"
              aria-label="Reveal simulation results"
            >
              Reveal results
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-slate-900/60 rounded-xl p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 text-center font-medium">
                  Histogram — 1024 shots
                </p>

                <div className="flex items-end justify-center gap-8 mb-4" style={{ height: '120px' }}>
                  {[
                    { label: '|00⟩', count: 507, pct: '49.5%' },
                    { label: '|01⟩', count: 0, pct: '0%' },
                    { label: '|10⟩', count: 0, pct: '0%' },
                    { label: '|11⟩', count: 517, pct: '50.5%' },
                  ].map(bar => {
                    const height = bar.count > 0 ? (bar.count / 517) * 100 : 0
                    return (
                      <div key={bar.label} className="flex flex-col items-center gap-1 w-14">
                        <span className="text-xs text-slate-400">{bar.pct}</span>
                        <div
                          className={`w-full rounded-t-md transition-all ${
                            bar.count > 0 ? 'bg-rose-500' : 'bg-slate-800'
                          }`}
                          style={{ height: `${height}%`, minHeight: bar.count > 0 ? '4px' : '2px' }}
                        />
                        <span className="text-xs font-mono text-slate-300">{bar.label}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <code className="text-sm text-rose-300 font-mono">
                    {`{'00': 507, '11': 517}`}
                  </code>
                </div>

                <p className="text-sm text-slate-400 mt-3 text-center">
                  Only |00&#x27E9; and |11&#x27E9; appear. That&rsquo;s entanglement at work.
                </p>

                <button
                  onClick={() => setPhase('predict')}
                  className="btn-ghost text-sm mt-3 mx-auto block"
                  aria-label="Reset prediction"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

function BellLabVisual() {
  return (
    <div className="rounded-2xl border border-rose-800/40 bg-rose-950/15 p-5">
      <p className="section-label text-rose-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Complete Bell Pair — End to End</h3>

      <div className="mt-4">
        <CodeBlock
          code={`from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# 1. Create a 2-qubit circuit
qc = QuantumCircuit(2)

# 2. Apply Hadamard to qubit 0
qc.h(0)

# 3. Apply CNOT (q0 controls q1)
qc.cx(0, 1)

# 4. Measure all qubits
qc.measure_all()

# 5. Simulate
simulator = AerSimulator()
result = simulator.run(qc, shots=1024).result()
counts = result.get_counts()
print(counts)`}
          language="python"
          label="bell_pair.py"
        />
      </div>

      <div className="mt-5 bg-slate-900/60 rounded-xl p-5">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 text-center font-medium">
          Expected output
        </p>
        <div className="flex items-end justify-center gap-6 mb-4" style={{ height: '100px' }}>
          {[
            { label: '00', count: 512, color: 'bg-rose-500' },
            { label: '01', count: 0, color: 'bg-slate-800' },
            { label: '10', count: 0, color: 'bg-slate-800' },
            { label: '11', count: 512, color: 'bg-rose-500' },
          ].map(bar => (
            <div key={bar.label} className="flex flex-col items-center gap-1 w-12">
              <span className="text-xs text-slate-400">{bar.count}</span>
              <div
                className={`w-full rounded-t-md ${bar.color}`}
                style={{ height: `${bar.count > 0 ? 100 : 2}%`, minHeight: '2px' }}
              />
              <span className="text-xs font-mono text-slate-300">|{bar.label}&#x27E9;</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-800 rounded-lg p-2.5">
            <p className="text-xs text-slate-500 mb-0.5">|00&#x27E9;</p>
            <p className="text-rose-300 font-bold text-lg">~50%</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2.5">
            <p className="text-xs text-slate-500 mb-0.5">|11&#x27E9;</p>
            <p className="text-rose-300 font-bold text-lg">~50%</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-3">
          |01&#x27E9; and |10&#x27E9; never appear — the qubits are entangled.
        </p>
      </div>
    </div>
  )
}

function ExperimentsVisual() {
  const [selected, setSelected] = useState(0)

  const experiments = [
    {
      title: 'GHZ State',
      subtitle: '3-qubit entanglement',
      code: `qc = QuantumCircuit(3)
qc.h(0)
qc.cx(0, 1)
qc.cx(0, 2)
qc.measure_all()`,
      outcome: '|000⟩ and |111⟩ each ~50%. No other outcomes.',
    },
    {
      title: 'Superposition Statistics',
      subtitle: 'Single H gate, many shots',
      code: `qc = QuantumCircuit(1)
qc.h(0)
qc.measure_all()

# Run with 4096 shots
result = simulator.run(qc, shots=4096).result()`,
      outcome: '|0⟩ and |1⟩ each ~50%. More shots = smoother ratio.',
    },
    {
      title: 'Quantum Teleportation',
      subtitle: '3-qubit protocol',
      code: `qc = QuantumCircuit(3, 3)
# Prepare Bell pair (q1, q2)
qc.h(1)
qc.cx(1, 2)
# Entangle q0 with q1
qc.cx(0, 1)
qc.h(0)
# Measure and correct
qc.measure([0, 1], [0, 1])
qc.cx(1, 2)
qc.cz(0, 2)`,
      outcome: 'Qubit 2 ends up in the original state of qubit 0 — teleportation.',
    },
  ]

  const exp = experiments[selected]

  return (
    <div className="rounded-2xl border border-rose-800/40 bg-rose-950/15 p-5">
      <p className="section-label text-rose-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Mini Experiments — Try These in Qiskit</h3>

      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        {experiments.map((e, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${selected === i
                ? 'bg-rose-600 text-white focus-visible:outline-rose-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`Select experiment: ${e.title}`}
          >
            {e.title}
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
          <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
            <p className="text-sm text-white font-semibold mb-1">{exp.title}</p>
            <p className="text-xs text-slate-400 mb-3">{exp.subtitle}</p>
            <CodeBlock code={exp.code} language="python" label="python" />
          </div>

          <div className="bg-rose-900/20 border border-rose-700/40 rounded-xl p-4">
            <p className="text-xs text-rose-400 uppercase tracking-wider mb-1 font-medium">
              Expected outcome
            </p>
            <p className="text-sm text-slate-300">{exp.outcome}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Labs() {
  return (
    <ModuleLayout
      moduleId="labs"
      title="Qiskit Labs"
      subtitle="Write, run, and interpret real quantum code — from an empty circuit to a working Bell pair and beyond."
      prev={{ to: '/algorithms', label: 'Module 11: Core Algorithms' }}
      next={{ to: '/noise', label: 'Module 13: Noise & Hardware' }}
      outline={LABS_OUTLINE}
      aside={<LabsSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Every idea covered so far &mdash; states, gates, circuits, measurement, algorithms &mdash; has a direct
          translation into a short Qiskit program. This chapter is that translation made concrete: building a
          circuit, applying gates, simulating it, and reading the resulting measurement statistics.
        </p>
        <p>
          The running example is the same Bell pair used throughout the handbook. By the end of this chapter, the
          same create&ndash;gate&ndash;measure&ndash;simulate pattern is applied to two further experiments: a
          three-qubit GHZ state and quantum teleportation.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Basic Qiskit workflow from the Qiskit module: creating a circuit, applying a gate, measuring.',
            'Comfort reading a short circuit diagram left to right.',
            'The Bell state and why H followed by CNOT produces it.',
          ]}
        >
          If circuit-to-code translation still feels unfamiliar, review{' '}
          <Link to="/circuits" className="text-rose-400 transition-colors hover:text-rose-300">
            Quantum Circuits
          </Link>{' '}
          before extending the pattern to new circuits in this chapter.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Create a QuantumCircuit and apply single- and two-qubit gates in code.</li>
            <li>Simulate a circuit with AerSimulator and read out measurement counts.</li>
            <li>Build a complete Bell pair from scratch and interpret its histogram.</li>
            <li>Extend the same pattern to a GHZ state and other short experiments.</li>
          </ul>
        </div>
      </div>

      <section id="labs-create" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Create a circuit</h2>
        <p className="section-sub">
          Every Qiskit program starts the same way: import the circuit class, and create an object that will hold
          every gate and measurement added afterward.
        </p>

        <DefinitionBox term="QuantumCircuit Object">
          A <GlossaryTooltip term="Circuit"><Keyword tone="circuit">QuantumCircuit</Keyword></GlossaryTooltip>{' '}
          object represents an entire circuit. Gates and measurements are added to it by calling methods; nothing
          runs until the circuit is later simulated or executed on hardware.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="QuantumCircuit(n)">
            Creates a circuit with <span className="font-mono">n</span>{' '}
            <Keyword tone="qubit">qubits</Keyword>, all starting in{' '}
            <span className="font-mono">|0&#x27E9;</span>. The argument sets qubit count only — gates are added
            afterward.
          </NotationBox>
        </div>

        <div className="mt-6">
          <CircuitSetupVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: A Two-Qubit Circuit">
            <p>
              <code className="text-rose-300 font-mono">qc = QuantumCircuit(2)</code> creates a 2-qubit circuit
              with qubits q0 and q1, both starting at <span className="font-mono">|0&#x27E9;</span>. No gates have
              been applied yet.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            If this workflow feels unfamiliar, it is the same one introduced in the{' '}
            <Link to="/qiskit" className="text-rose-400 transition-colors hover:text-rose-300">
              Qiskit
            </Link>{' '}
            module — this chapter applies it to longer, more complete programs.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <VideoAside
            title="Introduction to Qiskit — Coding with Qiskit 1.x"
            description="A Qiskit walkthrough of writing and running real code — a hands-on companion to this chapter's lab exercises."
            source="Qiskit"
            videoId="Tk9LOL9--Y4"
          />
        </div>
      </section>

      <section id="labs-gates" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Apply gates and measure</h2>
        <p className="section-sub">
          Gates are added one method call at a time, in the same left-to-right order they would appear in a
          circuit diagram.
        </p>

        <DefinitionBox term="Gate and Measurement Methods">
          Each <GlossaryTooltip term="Gate"><Keyword tone="gate">gate</Keyword></GlossaryTooltip> corresponds to a
          method call on the circuit object &mdash; <code className="text-rose-300">.h(0)</code>,{' '}
          <code className="text-rose-300">.cx(0, 1)</code> &mdash; and{' '}
          <code className="text-rose-300">.measure_all()</code> adds measurement to every qubit at once.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol=".h(0)    .cx(0, 1)    .measure_all()">
            <code className="text-rose-300">.h(0)</code> applies Hadamard to qubit 0.{' '}
            <code className="text-rose-300">.cx(0, 1)</code> applies CNOT with qubit 0 as control and qubit 1 as
            target. <code className="text-rose-300">.measure_all()</code> adds a measurement to every qubit.
          </NotationBox>
        </div>

        <div className="mt-6">
          <GatesAndMeasureVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: A Bell Pair in Three Calls">
            <p>
              After <code className="text-rose-300">.h(0)</code> and{' '}
              <code className="text-rose-300">.cx(0, 1)</code>, the state is a{' '}
              <GlossaryTooltip term="Bell State"><Keyword tone="bell">Bell pair</Keyword></GlossaryTooltip>: a 50%
              chance of <span className="font-mono">|00&#x27E9;</span> and a 50% chance of{' '}
              <span className="font-mono">|11&#x27E9;</span>.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the same diagram-to-code translation covered in{' '}
            <Link to="/circuits" className="text-rose-400 transition-colors hover:text-rose-300">
              Quantum Circuits
            </Link>
            : left-to-right position in the diagram becomes top-to-bottom order in the code.
          </RemarkBox>
        </div>
      </section>

      <section id="labs-simulate" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Simulate and read counts</h2>
        <p className="section-sub">
          A circuit is not automatically run when it is built. Running it &mdash; on a simulator or on real
          hardware &mdash; is a separate, explicit step.
        </p>

        <DefinitionBox term="AerSimulator">
          <code className="text-rose-300">AerSimulator</code> runs a circuit on a classical computer, no quantum
          hardware required. <code className="text-rose-300">result.get_counts()</code> returns a dictionary
          mapping each observed bitstring to how many of the requested shots produced it.
        </DefinitionBox>

        <div className="mt-6">
          <SimulateVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Reading a Counts Dictionary">
            <p>
              For a Bell-state circuit,{' '}
              <code className="text-rose-300 font-mono">{"counts ≈ {'00': 512, '11': 512}"}</code> out of 1024
              default shots. Each run is a random sample, so the exact numbers vary slightly from run to run.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Running more shots does not change a circuit's probabilities &mdash; those are fixed by its gates. More
            shots only make the sampled counts converge more closely to those fixed probabilities.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <MentorNote>
            The Bell-pair example above hides a real gotcha because <code className="text-rose-300">'00'</code>{' '}
            and <code className="text-rose-300">'11'</code> read the same forward or backward. In general,
            recall from Multi-Qubit Systems that Qiskit's counts keys list qubits in reverse order &mdash; for
            a two-qubit circuit, a key of <code className="text-rose-300">'01'</code> means qubit 1 = 0 and
            qubit 0 = 1, not the other way around.
          </MentorNote>
        </div>
      </section>

      <section id="labs-bell" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Bell pair in Qiskit, end to end</h2>
        <p className="section-sub">
          Combining the previous three sections gives a complete, five-step program: create, entangle, measure,
          simulate, and read out.
        </p>

        <ExampleBox title="Full Recipe: Create, Entangle, Measure, Simulate">
          <p>
            Import <code className="text-rose-300">QuantumCircuit</code> and{' '}
            <code className="text-rose-300">AerSimulator</code>, create the circuit, apply{' '}
            <code className="text-rose-300">.h(0)</code> and <code className="text-rose-300">.cx(0, 1)</code>, call{' '}
            <code className="text-rose-300">.measure_all()</code>, then run the simulator and print{' '}
            <code className="text-rose-300">get_counts()</code>. Five lines of real quantum code.
          </p>
        </ExampleBox>

        <div className="mt-6">
          <BellLabVisual />
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is exactly the circuit built interactively in the{' '}
            <Link to="/projects/bell-explorer" className="text-rose-400 transition-colors hover:text-rose-300">
              Bell Explorer project
            </Link>
            , which compares this ideal 50/50 split against real simulation output in more depth.
          </RemarkBox>
        </div>
      </section>

      <section id="labs-experiments" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Mini experiments</h2>
        <p className="section-sub">
          The same create&ndash;gate&ndash;measure&ndash;simulate pattern extends directly to circuits well beyond
          the two-qubit Bell pair.
        </p>

        <DefinitionBox term="Extending the Pattern">
          A <Keyword tone="bell">GHZ state</Keyword> extends the Bell pair to three or more qubits using the same
          gates. Running many shots on a single Hadamard reveals sampling statistics directly. Quantum
          teleportation reuses the same primitives &mdash; a Bell pair, a CNOT, and classical measurement &mdash;
          to move a state rather than merely correlate qubits.
        </DefinitionBox>

        <div className="mt-6">
          <ExperimentsVisual />
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: what quantum teleportation actually does" label="Clarification">
            <p>
              Despite the name, teleportation does not transport matter or send information faster than light. It
              transfers an unknown qubit's <em>state</em> onto a distant qubit, using a pre-shared{' '}
              <Keyword tone="bell">Bell pair</Keyword> and two classical bits sent by ordinary communication.
            </p>
            <p className="mt-3">
              The original qubit's state is destroyed in the process of measuring it &mdash; consistent with the
              no-cloning limits covered in Noise & Hardware &mdash; so nothing is duplicated, only moved.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Every one of these experiments still runs on a noise-free simulator. Section 6 and the next module
            cover what changes when the same circuits run on real, imperfect hardware.
          </RemarkBox>
        </div>
      </section>

      <section id="labs-mistakes" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 6</p>
        <h2 className="section-heading">Common mistakes</h2>
        <p className="section-sub">
          Most confusion at this stage comes from treating the simulator's idealized output as a guarantee about
          real hardware, or misunderstanding what randomness in the results actually means.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Assuming AerSimulator results reflect real quantum hardware behavior.',
              clarification:
                'By default the simulator is noise-free — no decoherence, no gate error, no readout error. Noise & Hardware covers how real devices depart from this ideal.',
            },
            {
              mistake: 'Expecting get_counts() to return identical numbers on every run.',
              clarification:
                'Each run is a random sample of a fixed set of probabilities. The probabilities are determined by the circuit; the exact shot-by-shot counts are not.',
            },
            {
              mistake: "Believing that running more shots changes a circuit's probabilities.",
              clarification:
                "More shots only make the sampled histogram converge more closely to probabilities that are already fixed by the circuit's gates — they do not change those probabilities.",
            },
            {
              mistake: 'Treating quantum teleportation as transporting matter or signaling faster than light.',
              clarification:
                'Teleportation transfers a quantum state using a shared Bell pair plus ordinary classical communication, and it destroys the original qubit\'s state in the process.',
            },
          ]}
        />
      </section>

      <div className="mt-10">
        <SummaryBox
          points={[
            'A Qiskit program is built by creating a QuantumCircuit and calling gate methods on it, such as .h() and .cx().',
            'AerSimulator runs a circuit without real hardware, and result.get_counts() returns a dictionary of measurement outcome counts.',
            'The five-line Bell pair recipe — create, entangle, measure, simulate, read out — is the template most short Qiskit programs still follow.',
            'The GHZ state, superposition statistics, and quantum teleportation are direct extensions of the same create-gate-measure-simulate pattern.',
            "The simulator's noise-free results are an idealization — Noise & Hardware covers how real devices depart from them.",
          ]}
        />
      </div>

      <section id="labs-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Where This Appears in Projects</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">From ideal simulation to real hardware</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Every circuit in this chapter ran on a noise-free simulator. The next module covers what changes when
          the same circuits run on real quantum hardware, and why that gap is the central engineering challenge in
          the field today.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/noise" className="btn-primary">
            Continue to Noise & Hardware
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
