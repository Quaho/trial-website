import ModuleLayout from '../components/ModuleLayout'
import SummaryBox from '../components/SummaryBox'
import MistakesBox from '../components/MistakesBox'
import CodeBlock from '../components/CodeBlock'
import { MathDisplay, Math } from '../components/MathBlock'

function GateCard({ symbol, name, desc, matrix }) {
  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-indigo-900/40 border border-indigo-700/50
                        flex items-center justify-center font-mono text-indigo-300 text-lg font-bold flex-shrink-0">
          {symbol}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-slate-400 mt-0.5">{desc}</p>
        </div>
      </div>
      {matrix && (
        <div className="bg-slate-950 rounded-lg p-3 text-center">
          <Math>{matrix}</Math>
        </div>
      )}
    </div>
  )
}

const SETUP_CODE = `# Install Qiskit (run in your terminal)
pip install qiskit

# Optional: install visualization tools
pip install qiskit-aer matplotlib pylatexenc`

const FIRST_CIRCUIT = `from qiskit import QuantumCircuit

# Create a circuit with 1 qubit and 1 classical bit
qc = QuantumCircuit(1, 1)

# Apply a Hadamard gate: puts |0⟩ into superposition
qc.h(0)

# Measure the qubit into the classical bit
qc.measure(0, 0)

# Draw the circuit (text mode — works anywhere)
print(qc.draw('text'))
# Output:
#      ┌───┐ ░ ┌─┐
# q_0: ┤ H ├─░─┤M├
#      └───┘ ░ └─┘
# c: 1/══════════╩═
#                0`

const RUN_CODE = `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

# Simulate the circuit 1000 times
simulator = AerSimulator()
job = simulator.run(qc, shots=1000)
result = job.result()
counts = result.get_counts()

print(counts)
# Example output: {'0': 512, '1': 488}
# ≈ 50/50 — superposition works!`

const GATES_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)  # 2 qubits

# X gate: flips |0⟩ → |1⟩  (like NOT)
qc.x(0)

# H gate: creates superposition
qc.h(1)

# CNOT gate: flips qubit 1 IF qubit 0 is |1⟩
qc.cx(0, 1)

# Z gate: phase flip — |1⟩ → -|1⟩
qc.z(0)

# S gate: phase rotation by π/2
qc.s(1)

print(qc.draw('text'))`

const BELL_CODE = `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Bell state: maximally entangled pair of qubits
qc = QuantumCircuit(2, 2)

# Step 1: Put qubit 0 into superposition
qc.h(0)

# Step 2: Entangle qubit 0 with qubit 1 via CNOT
qc.cx(0, 1)

# Step 3: Measure both qubits
qc.measure([0, 1], [0, 1])

print(qc.draw('text'))
# Output:
#      ┌───┐      ░ ┌─┐
# q_0: ┤ H ├──■──░─┤M├───
#      └───┘┌─┴─┐░ └─┘┌─┐
# q_1: ─────┤ X ├░────┤M├
#           └───┘░    └─┘

# Simulate
simulator = AerSimulator()
result = simulator.run(qc, shots=1000).result()
print(result.get_counts())
# Output: {'00': 503, '11': 497}
# NEVER '01' or '10' — perfectly correlated!`

const SUMMARY = [
  'Qiskit is IBM\'s open-source Python library for writing and running quantum circuits.',
  'A QuantumCircuit(n, m) creates n qubits and m classical bits to store measurement results.',
  'The H gate creates superposition, X flips a qubit, CNOT entangles two qubits.',
  'You measure with qc.measure() and run with a simulator (AerSimulator) or real hardware.',
  'The Bell state is the canonical "hello world" of quantum entanglement — always produces 00 or 11, never 01 or 10.',
  'Qiskit code is Python — if you know Python, you\'re halfway there already.',
]

const MISTAKES = [
  {
    mistake: '"I can see the superposition in the output."',
    clarification: 'No — running the circuit many times gives you a statistical distribution. Each individual shot collapses to a classical bit. You infer the superposition from the distribution.',
  },
  {
    mistake: '"qc.h(0) modifies qubit 0 in place immediately."',
    clarification: 'No — Qiskit builds a circuit description. Nothing runs until you call simulator.run(). Think of it like writing a recipe, not cooking it.',
  },
  {
    mistake: '"More shots = more accurate quantum state."',
    clarification: 'More shots reduce statistical sampling noise, but you\'ll never see the exact amplitudes. The Born rule gives you probabilities; shots are random samples from that distribution.',
  },
]

export default function Qiskit() {
  return (
    <ModuleLayout
      moduleId="qiskit"
      title="Qiskit"
      subtitle="Write real quantum programs. From your first circuit to a Bell state — with actual Python code."
      prev={{ to: '/phase', label: 'Module 3: Phase & Angles' }}
    >
      {/* Section 1: What is Qiskit */}
      <section className="mb-12">
        <h2 className="section-heading">What Is Qiskit?</h2>
        <p className="section-sub">Your gateway to real quantum hardware</p>

        <div className="prose-quantum">
          <p>
            <strong className="text-white">Qiskit</strong> (pronounced "kiss-kit") is IBM's open-source
            Python framework for quantum computing. It lets you:
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 my-6">
          {[
            { icon: '✏️', title: 'Design', desc: 'Build quantum circuits with gates and measurements in Python' },
            { icon: '💻', title: 'Simulate', desc: 'Run circuits on your laptop using AerSimulator (no hardware needed)' },
            { icon: '🔬', title: 'Execute', desc: 'Submit to real IBM quantum hardware via the cloud (free tier available)' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="card text-center">
              <div className="text-2xl mb-2">{icon}</div>
              <h4 className="font-semibold text-white mb-1">{title}</h4>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="prose-quantum">
          <p>
            The workflow is always: <strong className="text-white">build → simulate/run → measure → analyze</strong>.
            You write Python, Qiskit turns it into instructions for a quantum processor.
          </p>
        </div>
      </section>

      {/* Section 2: Setup */}
      <section className="mb-12">
        <h2 className="section-heading">Setup</h2>
        <p className="section-sub">Get Qiskit installed in under a minute</p>

        <div className="card my-4 bg-amber-950/20 border-amber-800/30">
          <p className="text-sm text-amber-300 font-medium mb-1">Prerequisites</p>
          <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
            <li>Python 3.8 or newer</li>
            <li>pip (comes with Python)</li>
            <li>A virtual environment is recommended (but not required)</li>
          </ul>
        </div>

        <CodeBlock code={SETUP_CODE} language="bash" label="terminal" />

        <p className="text-sm text-slate-500 mt-2">
          To verify installation: <code className="text-indigo-300">python -c "import qiskit; print(qiskit.__version__)"</code>
        </p>
      </section>

      {/* Section 3: First circuit */}
      <section className="mb-12">
        <h2 className="section-heading">Your First Circuit</h2>
        <p className="section-sub">Three lines of quantum logic</p>

        <div className="prose-quantum">
          <p>
            The simplest interesting quantum circuit: create a qubit, put it in superposition with
            a Hadamard gate, then measure it. When you run this 1000 times, you should get
            roughly 500 zeros and 500 ones — true quantum randomness.
          </p>
        </div>

        <CodeBlock code={FIRST_CIRCUIT} language="python" label="first_circuit.py" />

        <CodeBlock code={RUN_CODE} language="python" label="run_circuit.py" />

        <div className="card my-4 bg-indigo-950/30 border-indigo-800/40">
          <p className="text-sm text-indigo-300 font-medium mb-1">What just happened?</p>
          <ol className="text-sm text-slate-400 space-y-1.5 list-decimal list-inside">
            <li>We created a circuit with 1 qubit (starts in |0⟩ by default)</li>
            <li>The H gate put it in superposition: (|0⟩ + |1⟩)/√2</li>
            <li>Measurement collapsed it to 0 or 1 randomly</li>
            <li>After 1000 shots, we see ≈ 50/50 — matching our prediction!</li>
          </ol>
        </div>
      </section>

      {/* Section 4: Gate reference */}
      <section className="mb-12">
        <h2 className="section-heading">Essential Gates</h2>
        <p className="section-sub">The building blocks of quantum circuits</p>

        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <GateCard
            symbol="H"
            name="Hadamard Gate"
            desc="Creates superposition. |0⟩ → |+⟩ = (|0⟩+|1⟩)/√2"
            matrix={'H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}'}
          />
          <GateCard
            symbol="X"
            name="Pauli-X (NOT) Gate"
            desc="Flips |0⟩↔|1⟩. The quantum equivalent of a classical NOT gate."
            matrix={'X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}'}
          />
          <GateCard
            symbol="Z"
            name="Pauli-Z Gate"
            desc="Phase flip: |0⟩→|0⟩, |1⟩→−|1⟩. Flips the phase of the |1⟩ component."
            matrix={'Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}'}
          />
          <GateCard
            symbol="CX"
            name="CNOT (Controlled-X)"
            desc="Two-qubit gate. Flips target if control is |1⟩. Creates entanglement."
            matrix={'CX = \\begin{pmatrix} 1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0 \\end{pmatrix}'}
          />
        </div>

        <CodeBlock code={GATES_CODE} language="python" label="gates.py" />
      </section>

      {/* Section 5: Bell state */}
      <section className="mb-12">
        <h2 className="section-heading">Bell State: Hello, Entanglement</h2>
        <p className="section-sub">The most famous quantum state — and the cleanest test of entanglement</p>

        <div className="prose-quantum">
          <p>
            The <strong className="text-white">Bell state</strong> is a pair of qubits that are
            maximally entangled. When you measure them, you always get{' '}
            <strong className="text-white">both 0 or both 1</strong> — never one of each.
            And this holds even if the qubits are physically separated.
          </p>
        </div>

        <MathDisplay>{'|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)'}</MathDisplay>

        <div className="prose-quantum">
          <p>
            Two steps to create it:
          </p>
        </div>

        <div className="flex gap-4 my-4 flex-col sm:flex-row">
          {[
            { step: '1', title: 'Hadamard on qubit 0', desc: 'Creates superposition: |0⟩ → (|0⟩+|1⟩)/√2. Now qubit 0 is 50/50.' },
            { step: '2', title: 'CNOT (0 → 1)', desc: 'Entangles: flips qubit 1 whenever qubit 0 is |1⟩. The qubits are now correlated.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex-1 card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                  {step}
                </div>
                <h4 className="font-medium text-white">{title}</h4>
              </div>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock code={BELL_CODE} language="python" label="bell_state.py" />

        <div className="card my-4 bg-green-950/20 border-green-800/30">
          <p className="text-sm text-green-300 font-medium mb-1">The result tells the whole story</p>
          <p className="text-sm text-slate-400">
            The output <code className="text-green-300">{`{'00': ~500, '11': ~500}`}</code> proves
            entanglement. The two qubits are perfectly correlated — measuring one instantly
            tells you the other, regardless of distance. Einstein called this "spooky action
            at a distance." Quantum mechanics says: it's just how it works.
          </p>
        </div>
      </section>

      {/* Section 6: Next steps */}
      <section className="mb-8">
        <h2 className="section-heading">Where to Go Next</h2>
        <p className="section-sub">You've completed the foundations — here's how to continue</p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            { title: 'IBM Quantum Learning', desc: 'Official IBM courses covering Qiskit in depth, from circuits to algorithms.', tag: 'Free' },
            { title: 'Qiskit Textbook', desc: 'learn.qiskit.org — open-source textbook with interactive Jupyter notebooks.', tag: 'Free' },
            { title: 'Quantum Katas', desc: 'Microsoft\'s interactive exercises in Q#, great for building intuition through practice.', tag: 'Free' },
            { title: 'Nielsen & Chuang', desc: '"Quantum Computation and Quantum Information" — the definitive graduate textbook.', tag: 'Book' },
          ].map(({ title, desc, tag }) => (
            <div key={title} className="card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{title}</h4>
                <span className="badge bg-green-900/40 text-green-400">{tag}</span>
              </div>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="card bg-indigo-950/40 border-indigo-800/50 text-center py-8">
          <div className="text-3xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-white mb-2">You've completed QuantumLeap!</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            From bits vs qubits all the way to entangled Bell states. You now have the foundation
            to explore the quantum computing universe. Keep building.
          </p>
        </div>
      </section>

      <SummaryBox points={SUMMARY} />
      <MistakesBox items={MISTAKES} />
    </ModuleLayout>
  )
}
