import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DeepDive from '../components/DeepDive'
import StepNav from '../components/StepNav'
import CodeBlock from '../components/CodeBlock'
import { MathDisplay, MathInline as InlineMath } from '../components/MathBlock'
import { useProgress } from '../hooks/useProgress'

/* ── Code snippets ────────────────────────────────────────────────────────── */

const SETUP_CODE = `# Install Qiskit (in your terminal)
pip install qiskit qiskit-aer

# Verify installation
python -c "import qiskit; print(qiskit.__version__)"
`

const FIRST_CIRCUIT = `from qiskit import QuantumCircuit

# 1 qubit, 1 classical bit
qc = QuantumCircuit(1, 1)

# H gate: put |0⟩ into superposition
qc.h(0)

# Measure qubit → classical bit
qc.measure(0, 0)

print(qc.draw('text'))
# Output:
#      ┌───┐ ░ ┌─┐
# q_0: ┤ H ├─░─┤M├
#      └───┘ ░ └─┘`

const RUN_CODE = `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

simulator = AerSimulator()
result = simulator.run(qc, shots=1000).result()
print(result.get_counts())
# {'0': 512, '1': 488}  ← roughly 50/50`

const GATES_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)

qc.x(0)    # X: flip |0⟩ → |1⟩  (quantum NOT)
qc.h(1)    # H: superposition
qc.cx(0,1) # CNOT: flip qubit 1 if qubit 0 is |1⟩
qc.z(0)    # Z: phase flip — |1⟩ → -|1⟩
qc.s(1)    # S: phase rotation by π/2

print(qc.draw('text'))`

const BELL_CODE = `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)

# Step 1: superposition on qubit 0
qc.h(0)

# Step 2: entangle via CNOT
qc.cx(0, 1)

# Step 3: measure both
qc.measure([0, 1], [0, 1])

result = AerSimulator().run(qc, shots=1000).result()
print(result.get_counts())
# {'00': 503, '11': 497}
# NEVER '01' or '10' — they're entangled!`

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function QiskitWorkflowVisual() {
  const steps = [
    { icon: '✏️', step: '1. Design', desc: 'Build a circuit with gates in Python' },
    { icon: '💻', step: '2. Simulate', desc: 'Run on AerSimulator locally' },
    { icon: '🔬', step: '3. Execute', desc: 'Submit to real IBM quantum hardware' },
  ]
  return (
    <div className="my-6">
      <div className="flex flex-col sm:flex-row gap-0">
        {steps.map(({ icon, step, desc }, i) => (
          <div key={step} className="flex sm:flex-col items-center sm:items-start flex-1">
            <div className="flex sm:flex-col items-center gap-3 sm:gap-0 w-full">
              <div className="card sm:rounded-none sm:rounded-t-xl text-center flex-1 sm:flex-none py-5">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-sm font-semibold text-white">{step}</div>
                <div className="text-xs text-slate-400 mt-1">{desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="text-slate-600 font-bold text-xl sm:hidden">→</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden sm:flex justify-center gap-0 mt-0">
        <div className="flex-1 h-0.5 bg-slate-700 mt-0" />
      </div>
      <p className="text-xs text-center text-slate-500 mt-3">
        Workflow: build → simulate → measure → analyze
      </p>
    </div>
  )
}

function CircuitDiagramVisual() {
  return (
    <div className="card my-6 font-mono text-sm bg-slate-950 border-slate-700">
      <p className="text-xs text-slate-500 mb-3">Circuit diagram (from qc.draw('text'))</p>
      <div className="overflow-x-auto">
        <pre className="text-green-400 text-xs sm:text-sm leading-relaxed">{`     ┌───┐ ░ ┌─┐
q_0: ┤ H ├─░─┤M├
     └───┘ ░ └─┘
c: 1/═══════════╩═
                0`}</pre>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-indigo-950/30 rounded-lg p-2 text-center">
          <div className="text-indigo-300 font-bold">┤ H ├</div>
          <div className="text-slate-500">Hadamard gate</div>
        </div>
        <div className="bg-violet-950/30 rounded-lg p-2 text-center">
          <div className="text-violet-300 font-bold">░</div>
          <div className="text-slate-500">Barrier</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-2 text-center">
          <div className="text-green-300 font-bold">┤M├</div>
          <div className="text-slate-500">Measure</div>
        </div>
      </div>
    </div>
  )
}

function GateCardsVisual() {
  const gates = [
    {
      symbol: 'H', name: 'Hadamard', color: 'indigo',
      action: '|0⟩ → |+⟩ = (|0⟩+|1⟩)/√2',
      matrix: 'H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}',
    },
    {
      symbol: 'X', name: 'Pauli-X (NOT)', color: 'blue',
      action: '|0⟩ ↔ |1⟩ (quantum flip)',
      matrix: 'X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}',
    },
    {
      symbol: 'Z', name: 'Pauli-Z', color: 'violet',
      action: '|0⟩→|0⟩, |1⟩→−|1⟩ (phase flip)',
      matrix: 'Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}',
    },
    {
      symbol: 'CX', name: 'CNOT', color: 'purple',
      action: 'Flip target if control is |1⟩',
      matrix: 'CX = \\begin{pmatrix} 1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0 \\end{pmatrix}',
    },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {gates.map(({ symbol, name, color, action, matrix }) => (
        <div key={symbol} className={`card border-${color}-800/30`}>
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl bg-${color}-900/40 border border-${color}-700/50
                             flex items-center justify-center font-mono text-${color}-300 text-lg font-bold flex-shrink-0`}>
              {symbol}
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{name}</h4>
              <p className={`text-xs text-${color}-300 mt-0.5 font-mono`}>{action}</p>
            </div>
          </div>
          <div className="bg-slate-950 rounded-lg p-2 text-center">
            <InlineMath>{matrix}</InlineMath>
          </div>
        </div>
      ))}
    </div>
  )
}

function BellCircuitVisual() {
  return (
    <div className="my-6 space-y-4">
      {[
        {
          step: 1, title: 'Hadamard on qubit 0',
          desc: '|00⟩ → (|00⟩ + |10⟩)/√2',
          note: 'Qubit 0 is now in superposition. Qubit 1 is still |0⟩.',
          color: 'indigo',
        },
        {
          step: 2, title: 'CNOT (qubit 0 → qubit 1)',
          desc: '→ (|00⟩ + |11⟩)/√2',
          note: 'When qubit 0 is |1⟩, qubit 1 flips to |1⟩. They\'re entangled!',
          color: 'violet',
        },
      ].map(({ step, title, desc, note, color }) => (
        <div key={step} className={`card border-${color}-800/30`}>
          <div className="flex gap-3 items-start">
            <div className={`w-8 h-8 rounded-full bg-${color}-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
              {step}
            </div>
            <div>
              <h4 className={`font-semibold text-${color}-300 text-sm`}>{title}</h4>
              <div className="font-mono text-white text-sm mt-1 mb-1">{desc}</div>
              <p className="text-xs text-slate-400">{note}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="card bg-green-950/20 border-green-800/30 text-center">
        <MathDisplay>{'|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)'}</MathDisplay>
        <p className="text-xs text-green-300 -mt-1">The Bell state — maximally entangled</p>
      </div>
    </div>
  )
}

function NextStepsVisual() {
  const resources = [
    { title: 'IBM Quantum Learning', tag: 'Free', desc: 'Official IBM courses with Qiskit depth.' },
    { title: 'Qiskit Textbook', tag: 'Free', desc: 'Interactive Jupyter notebooks at learn.qiskit.org.' },
    { title: 'Quantum Katas', tag: 'Free', desc: "Microsoft's interactive Q# exercises." },
    { title: 'Nielsen & Chuang', tag: 'Book', desc: 'The definitive graduate textbook on QC.' },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {resources.map(({ title, tag, desc }) => (
        <div key={title} className="card">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-white text-sm">{title}</h4>
            <span className="badge bg-green-900/40 text-green-400 text-xs">{tag}</span>
          </div>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'What Is Qiskit?',
    hook: 'Qiskit is IBM\'s Python library for writing real quantum programs.',
    bullets: [
      'Design circuits in Python → simulate on your laptop → run on real IBM quantum hardware.',
      'No physics degree required — if you know Python, you\'re ready.',
      'AerSimulator lets you test circuits locally for free.',
    ],
    visual: <QiskitWorkflowVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Install Qiskit:</strong></p>
        <CodeBlock code={SETUP_CODE} language="bash" label="terminal" />
      </div>
    ),
    quiz: {
      question: 'What does AerSimulator let you do?',
      choices: [
        'Access IBM quantum hardware for free',
        'Simulate quantum circuits on your laptop without real hardware',
        'Automatically optimize your Qiskit code',
        'Visualize the Bloch sphere in 3D',
      ],
      correct: 1,
    },
  },
  {
    title: 'Your First Circuit',
    hook: 'Three gates: create a qubit, put it in superposition, measure it.',
    bullets: [
      'QuantumCircuit(1, 1) — 1 qubit, 1 classical bit for the result.',
      'qc.h(0) — Hadamard gate puts qubit 0 into equal superposition.',
      'qc.measure(0, 0) — collapses qubit 0 into classical bit 0.',
    ],
    visual: <CircuitDiagramVisual />,
    example: (
      <div>
        <CodeBlock code={FIRST_CIRCUIT} language="python" label="first_circuit.py" />
        <CodeBlock code={RUN_CODE} language="python" label="run_circuit.py" />
      </div>
    ),
    quiz: {
      question: 'After running the H-gate circuit 1000 times, what do you expect to see?',
      choices: [
        'Always 0 — the qubit starts in |0⟩',
        'Always 1 — the H gate flips the qubit',
        'Roughly 500 zeros and 500 ones',
        'The superposition values directly',
      ],
      correct: 2,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Important: Qiskit builds a circuit <em>description</em> — nothing runs until you call
        simulator.run(). Think of it like writing a recipe. Calling run() is when you actually cook.</p>
        <p>Each "shot" is one run of the full circuit. The output is a count of how many times each
        classical bit pattern appeared. You never see the raw quantum amplitudes — only the
        statistical distribution from many measurements.</p>
      </div>
    ),
  },
  {
    title: 'Essential Gates',
    hook: 'H, X, Z, and CNOT are the building blocks of almost every quantum circuit.',
    bullets: [
      'H (Hadamard): creates superposition. The most-used gate.',
      'X (NOT): flips |0⟩ ↔ |1⟩. The quantum equivalent of a classical NOT.',
      'CNOT: the key entangling gate. Flips the target qubit if control is |1⟩.',
    ],
    visual: <GateCardsVisual />,
    example: (
      <CodeBlock code={GATES_CODE} language="python" label="gates.py" />
    ),
    quiz: {
      question: 'What does the CNOT gate do?',
      choices: [
        'Creates superposition on the target qubit',
        'Flips the target qubit if and only if the control qubit is |1⟩',
        'Measures both qubits simultaneously',
        'Applies a phase rotation to the target qubit',
      ],
      correct: 1,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Any quantum computation can be decomposed into single-qubit gates + CNOT. This is
        quantum universality — these gates are the quantum analog of NAND gates in classical computing.</p>
        <p>The Z gate doesn't change measurement probabilities (it's a phase flip), but combined with
        H and CNOT it enables the full range of quantum operations.</p>
      </div>
    ),
  },
  {
    title: 'Bell State: Hello, Entanglement',
    hook: 'Two qubits, two gates, one of the most remarkable states in quantum physics.',
    bullets: [
      'H on qubit 0 → superposition. CNOT (0→1) → entanglement.',
      'Result: (|00⟩ + |11⟩)/√2. Measuring always gives 00 or 11, never 01 or 10.',
      'The qubits are perfectly correlated — even if physically separated.',
    ],
    visual: <BellCircuitVisual />,
    example: (
      <div>
        <CodeBlock code={BELL_CODE} language="python" label="bell_state.py" />
        <div className="card bg-green-950/20 border-green-800/30 text-sm text-slate-400 mt-3">
          <p className="text-green-300 font-medium mb-1 text-xs">The output proves entanglement:</p>
          <p>You always get <code className="text-green-300">00</code> or <code className="text-green-300">11</code>.
          Never 01 or 10. Einstein called this "spooky action at a distance."
          Quantum mechanics says: that's just how it works.</p>
        </div>
      </div>
    ),
    quiz: {
      question: 'What is the Bell state output when you measure both qubits 1000 times?',
      choices: [
        'Always 00 — both qubits start in |0⟩',
        '25% each: 00, 01, 10, 11',
        'Roughly 50% "00" and 50% "11", never "01" or "10"',
        '50% "01" and 50% "10"',
      ],
      correct: 2,
    },
  },
  {
    title: 'Where to Go Next',
    hook: "You've learned the foundations. Now go build something real.",
    bullets: [
      'IBM Quantum Learning and the Qiskit Textbook are the best free next steps.',
      'Explore Grover\'s algorithm — it uses everything you learned in this course.',
      'Try running a circuit on real IBM hardware via the IBM Quantum cloud (free tier).',
    ],
    visual: <NextStepsVisual />,
    example: (
      <div className="card bg-indigo-950/40 border-indigo-800/50 text-center py-6">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-lg font-bold text-white mb-2">You've completed QuantumLeap!</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          From bits vs qubits to entangled Bell states. You have the foundation to
          explore the quantum computing universe.
        </p>
      </div>
    ),
    quiz: {
      question: 'Which of these is a good next step after completing this course?',
      choices: [
        'Build a quantum circuit using only classical bits',
        "Study Grover's algorithm, which uses superposition, interference, and measurement",
        'Wait until quantum computers are commercially available',
        'Learn assembly language first',
      ],
      correct: 1,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Qiskit() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('qiskit', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['qiskit']) markDone('qiskit')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('qiskit', step)
  }

  return (
    <ModuleLayout
      moduleId="qiskit"
      title="Qiskit"
      subtitle={`Lesson ${step + 1} of ${LESSONS.length} — ${lesson.title}`}
      prev={{ to: '/phase', label: 'Module 3: Phase & Angles' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Hook */}
          <div className="mb-6 p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-center">
            <p className="text-lg sm:text-xl font-semibold text-white leading-snug">{lesson.hook}</p>
          </div>

          {/* Visual */}
          {lesson.visual}

          {/* Bullets */}
          <ul className="space-y-2 my-5">
            {lesson.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-slate-300">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-900/60 border border-indigo-700/50
                                 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Example */}
          <div className="my-4">{lesson.example}</div>

          {/* Deep dive */}
          {lesson.deepDive && (
            <DeepDive title="Deep Dive">{lesson.deepDive}</DeepDive>
          )}

          {/* Quiz */}
          <Quiz
            question={lesson.quiz.question}
            choices={lesson.quiz.choices}
            correct={lesson.quiz.correct}
            onPass={handleQuizPass}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="my-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-green-300 font-semibold">Course Complete!</p>
              <p className="text-slate-400 text-sm mt-1">All 4 modules done. You've learned quantum computing from scratch.</p>
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
