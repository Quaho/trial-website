import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import CodeBlock from '../../components/CodeBlock'
import { useProgress } from '../../lib/hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../../lib/data/modules'

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
      desc: 'Create a 2-qubit circuit. Both qubits start in |0\u27E9.',
    },
    {
      label: 'Step 3 — View the circuit',
      code: 'from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2)\nprint(qc)',
      desc: 'Print the circuit to see its structure — two empty wires, ready for gates.',
    },
  ]

  const s = steps[currentStep]

  return (
    <div className="card border-rose-800/30 my-6">
      <p className="text-xs text-rose-400 uppercase tracking-wider mb-4 text-center">
        Building a QuantumCircuit step by step
      </p>

      <div className="flex gap-2 justify-center mb-5">
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
        >
          <p className="text-xs text-rose-400 font-medium uppercase tracking-wider mb-3">
            {s.label}
          </p>
          <CodeBlock code={s.code} language="python" label="python" />
          <p className="text-sm text-slate-400 mt-3">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Circuit diagram */}
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
      desc: 'H puts qubit 0 into superposition: equal chance of |0\u27E9 and |1\u27E9.',
    },
    {
      label: 'Add CNOT (q0 controls q1)',
      code: 'qc.h(0)\nqc.cx(0, 1)',
      circuit: [
        { wire: 'q0', gates: ['H', '\u25CF'], end: '───' },
        { wire: 'q1', gates: [' ', '\u2295'], end: '───' },
      ],
      desc: 'CNOT entangles the two qubits — now they are a Bell pair.',
    },
    {
      label: 'Measure all qubits',
      code: 'qc.h(0)\nqc.cx(0, 1)\nqc.measure_all()',
      circuit: [
        { wire: 'q0', gates: ['H', '\u25CF', 'M'], end: '' },
        { wire: 'q1', gates: [' ', '\u2295', 'M'], end: '' },
      ],
      desc: 'Measurement collapses the state. You get |00\u27E9 or |11\u27E9 — never |01\u27E9 or |10\u27E9.',
    },
  ]

  const s = steps[currentStep]

  return (
    <div className="card border-rose-800/30 my-6">
      <p className="text-xs text-rose-400 uppercase tracking-wider mb-4 text-center">
        Building a Bell circuit — gate by gate
      </p>

      <div className="flex gap-2 justify-center mb-5">
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
        >
          <p className="text-xs text-rose-400 font-medium uppercase tracking-wider mb-3">
            {s.label}
          </p>
          <CodeBlock code={s.code} language="python" label="python" />

          {/* Visual circuit */}
          <div className="mt-4 bg-slate-900/60 rounded-xl p-4">
            {s.circuit.map((row, ri) => (
              <div key={ri} className="flex items-center gap-2 font-mono text-sm mb-1">
                <span className="text-rose-300 w-14 text-right">{row.wire}</span>
                <span className="text-slate-600">\u2500</span>
                {row.gates.map((g, gi) => (
                  <span key={gi}>
                    {g === ' ' ? (
                      <span className="text-slate-600">\u2500\u2500\u2500</span>
                    ) : g === 'M' ? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-900/40 border border-amber-700/50 text-amber-300 text-xs">
                        M
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-rose-900/40 border border-rose-700/50 text-rose-300 text-xs">
                        {g}
                      </span>
                    )}
                    {gi < row.gates.length - 1 && <span className="text-slate-600">\u2500</span>}
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
  const [phase, setPhase] = useState('predict') // 'predict' | 'reveal'

  return (
    <div className="card border-rose-800/30 my-6">
      <p className="text-xs text-rose-400 uppercase tracking-wider mb-4 text-center">
        Simulate and read counts — predict before you reveal
      </p>

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

                {/* Bar chart */}
                <div className="flex items-end justify-center gap-8 mb-4" style={{ height: '120px' }}>
                  {[
                    { label: '|00\u27E9', count: 507, pct: '49.5%' },
                    { label: '|01\u27E9', count: 0, pct: '0%' },
                    { label: '|10\u27E9', count: 0, pct: '0%' },
                    { label: '|11\u27E9', count: 517, pct: '50.5%' },
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
    <div className="card border-rose-800/30 my-6">
      <p className="text-xs text-rose-400 uppercase tracking-wider mb-4 text-center">
        Complete Bell pair — end to end
      </p>

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

      {/* Histogram */}
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
      outcome: '|000\u27E9 and |111\u27E9 each ~50%. No other outcomes.',
      icon: '\uD83D\uDD17',
    },
    {
      title: 'Superposition Statistics',
      subtitle: 'Single H gate, many shots',
      code: `qc = QuantumCircuit(1)
qc.h(0)
qc.measure_all()

# Run with 4096 shots
result = simulator.run(qc, shots=4096).result()`,
      outcome: '|0\u27E9 and |1\u27E9 each ~50%. More shots = smoother ratio.',
      icon: '\uD83C\uDFB2',
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
      icon: '\u2728',
    },
  ]

  const exp = experiments[selected]

  return (
    <div className="card border-rose-800/30 my-6">
      <p className="text-xs text-rose-400 uppercase tracking-wider mb-4 text-center">
        Mini experiments — try these in Qiskit
      </p>

      <div className="flex gap-2 justify-center mb-5 flex-wrap">
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
            {e.icon} {e.title}
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

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Create a Circuit',
    hook: 'Every quantum program starts with one line of code.',
    hookSub: 'Import Qiskit, create a QuantumCircuit, and see what you get.',
    visual: <CircuitSetupVisual />,
    bullets: [
      'Qiskit circuits are built by calling methods on a QuantumCircuit object.',
      'The number you pass sets how many qubits.',
      'Every circuit starts with all qubits in |0\u27E9.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">Example:</strong>{' '}
          <code className="text-rose-300 font-mono">qc = QuantumCircuit(2)</code> creates a 2-qubit circuit
          with qubits q0 and q1, both starting at |0&#x27E9;.
        </p>
      </div>
    ),
    quiz: {
      question: 'What does QuantumCircuit(3) create?',
      choices: [
        'A circuit with 3 classical bits',
        'A circuit with 3 qubits, all in |0\u27E9',
        'A circuit with 3 gates',
        'A circuit with 3 measurements',
      ],
      correct: 1,
    },
  },
  {
    title: 'Apply Gates and Measure',
    hook: 'Gates transform qubits. Measurement reads them out.',
    hookSub: 'Build a Bell circuit one method call at a time.',
    visual: <GatesAndMeasureVisual />,
    bullets: [
      '.h(0) applies Hadamard to qubit 0.',
      '.cx(0,1) applies CNOT: qubit 0 controls qubit 1.',
      '.measure_all() adds measurement to every qubit.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">Example:</strong> After H on q0 and CNOT(0,1), the state is a
          Bell pair: 50% chance of |00&#x27E9;, 50% chance of |11&#x27E9;.
        </p>
      </div>
    ),
    quiz: {
      question: 'What does .cx(0, 1) do?',
      choices: [
        'Applies Hadamard to qubit 0',
        'Measures qubit 1',
        'Flips qubit 1 if qubit 0 is |1\u27E9',
        'Swaps qubits 0 and 1',
      ],
      correct: 2,
    },
  },
  {
    title: 'Simulate and Read Counts',
    hook: 'Run your circuit without a real quantum computer.',
    hookSub: 'The simulator gives you measurement statistics — predict them first.',
    visual: <SimulateVisual />,
    bullets: [
      'AerSimulator() runs your circuit on a classical computer \u2014 no real quantum hardware needed.',
      'result.get_counts() returns a dictionary of measurement outcomes.',
      'Run 1024 shots by default \u2014 more shots = smoother statistics.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">Example:</strong> For a Bell state circuit,{' '}
          <code className="text-rose-300 font-mono">{'counts \u2248 {\'00\': 512, \'11\': 512}'}</code>.
          Each run is random, so exact numbers vary.
        </p>
      </div>
    ),
    quiz: {
      question: 'What does get_counts() return?',
      choices: [
        'A dictionary of outcome counts',
        'The final quantum state',
        'A single measurement result',
        'The circuit diagram',
      ],
      correct: 0,
    },
  },
  {
    title: 'Bell Pair in Qiskit',
    hook: 'Put it all together: create, entangle, measure, simulate.',
    hookSub: 'The complete Bell pair workflow in one script.',
    visual: <BellLabVisual />,
    bullets: [
      'H + CNOT creates a Bell pair \u2014 the simplest entangled state.',
      'The simulator shows ~50/50 split between |00\u27E9 and |11\u27E9.',
      'You never see |01\u27E9 or |10\u27E9 \u2014 that\u2019s entanglement at work.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">Full recipe:</strong> Import QuantumCircuit and AerSimulator
          &rarr; create circuit &rarr; apply H(0) and CX(0,1) &rarr; measure_all &rarr; run simulator
          &rarr; print get_counts(). Five lines of real quantum code.
        </p>
      </div>
    ),
    quiz: {
      question: 'In a Bell state, which outcomes are possible?',
      choices: [
        '|00\u27E9 only',
        '|00\u27E9 and |11\u27E9 only',
        'All four: |00\u27E9, |01\u27E9, |10\u27E9, |11\u27E9',
        '|01\u27E9 and |10\u27E9 only',
      ],
      correct: 1,
    },
  },
  {
    title: 'Mini Experiments',
    hook: 'Three experiments to build your quantum intuition.',
    hookSub: 'GHZ states, superposition statistics, and teleportation \u2014 all in Qiskit.',
    visual: <ExperimentsVisual />,
    bullets: [
      'The GHZ state extends Bell pairs to 3+ qubits: equal mix of |000\u27E9 and |111\u27E9.',
      'A single H gate on |0\u27E9 gives 50/50 between |0\u27E9 and |1\u27E9 over many shots.',
      'These experiments build intuition for how quantum circuits behave.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">GHZ code:</strong>{' '}
          <code className="text-rose-300 font-mono">qc.h(0)</code>,{' '}
          <code className="text-rose-300 font-mono">qc.cx(0,1)</code>,{' '}
          <code className="text-rose-300 font-mono">qc.cx(0,2)</code> &mdash; now three qubits are entangled.
        </p>
      </div>
    ),
    quiz: {
      question: 'A GHZ state on 3 qubits produces which outcomes?',
      choices: [
        'All 8 possible 3-qubit states equally',
        'Only |000\u27E9 and |111\u27E9',
        'Only |000\u27E9',
        'Only |010\u27E9 and |101\u27E9',
      ],
      correct: 1,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Labs() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('labs', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['labs']) markDone('labs')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('labs', step)
  }

  return (
    <ModuleLayout
      moduleId="labs"
      title="Qiskit Labs"
      subtitle="Write, run, and interpret real quantum code."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/algorithms', label: 'Module 10: Core Algorithms' }}
      next={{ to: '/noise', label: 'Module 12: Noise & Hardware' }}
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
            bulletStyle={MODULE_LAYOUT_STYLES.labs.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 11 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Ready to explore noise and real hardware.</p>
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
