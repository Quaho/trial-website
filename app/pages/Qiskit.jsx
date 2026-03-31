import { Link } from 'react-router-dom'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import DiagramFrame from '../../components/DiagramFrame'
import CodeBlock from '../../components/CodeBlock'
import Keyword from '../../components/Keyword'
import RailCard from '../../components/RailCard'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const SETUP_CODE = `# Install Qiskit and the Aer simulator
pip install qiskit qiskit-aer

# Confirm that Python can import the package
python -c "import qiskit; print(qiskit.__version__)"`

const FIRST_CIRCUIT = `from qiskit import QuantumCircuit

# 1 qubit, 1 classical bit
qc = QuantumCircuit(1, 1)

# Put the qubit into equal superposition
qc.h(0)

# Measure into classical bit 0
qc.measure(0, 0)

print(qc.draw('text'))`

const RUN_CODE = `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

simulator = AerSimulator()
result = simulator.run(qc, shots=1000).result()
print(result.get_counts())
# Example output: {'0': 512, '1': 488}`

const GATES_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)

qc.x(0)      # Flip qubit 0
qc.h(1)      # Put qubit 1 into superposition
qc.cx(0, 1)  # Controlled-NOT
qc.z(0)      # Phase flip on qubit 0
qc.s(1)      # Quarter-turn phase on qubit 1

print(qc.draw('text'))`

const BELL_CODE = `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

result = AerSimulator().run(qc, shots=1000).result()
print(result.get_counts())
# Typical output: {'00': 503, '11': 497}`

const GATE_CARDS = [
  {
    symbol: 'H',
    name: 'Hadamard',
    action: 'Creates superposition from a basis state.',
    api: 'qc.h(0)',
    matrix: 'H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1 & 1 \\\\ 1 & -1\\end{pmatrix}',
    frame: 'border-indigo-800/40 bg-indigo-950/20',
    badge: 'bg-indigo-900/60 text-indigo-300 border-indigo-700/50',
  },
  {
    symbol: 'X',
    name: 'Pauli-X',
    action: 'Swaps |0⟩ and |1⟩.',
    api: 'qc.x(0)',
    matrix: 'X = \\begin{pmatrix}0 & 1 \\\\ 1 & 0\\end{pmatrix}',
    frame: 'border-sky-800/40 bg-sky-950/20',
    badge: 'bg-sky-900/60 text-sky-300 border-sky-700/50',
  },
  {
    symbol: 'Z',
    name: 'Pauli-Z',
    action: 'Flips the phase of the |1⟩ component.',
    api: 'qc.z(0)',
    matrix: 'Z = \\begin{pmatrix}1 & 0 \\\\ 0 & -1\\end{pmatrix}',
    frame: 'border-violet-800/40 bg-violet-950/20',
    badge: 'bg-violet-900/60 text-violet-300 border-violet-700/50',
  },
  {
    symbol: 'CX',
    name: 'Controlled-NOT',
    action: 'Flips the target qubit when the control is |1⟩.',
    api: 'qc.cx(0, 1)',
    matrix: 'CX = \\begin{pmatrix}1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0\\end{pmatrix}',
    frame: 'border-fuchsia-800/40 bg-fuchsia-950/20',
    badge: 'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700/50',
  },
]

const QISKIT_OUTLINE = [
  { id: 'qiskit-workflow', label: 'What Qiskit actually gives you' },
  { id: 'qiskit-first-circuit', label: 'A first circuit' },
  { id: 'qiskit-gate-api', label: 'Reading the gate API' },
  { id: 'qiskit-bell', label: 'Bell states in code' },
  { id: 'qiskit-judgment', label: 'From output to judgment' },
  { id: 'qiskit-next', label: 'Next steps' },
]

function QiskitSupport() {
  return (
    <>
      <RailCard label="Workflow" title="Four Things To Separate">
        <ul className="space-y-2">
          <li><span className="text-indigo-300">Author</span>: define qubits, gates, and measurements.</li>
          <li><span className="text-sky-300">Transpile</span>: rewrite the logical circuit for a target backend.</li>
          <li><span className="text-violet-300">Execute</span>: run shots on a simulator or hardware.</li>
          <li><span className="text-emerald-300">Interpret</span>: compare counts against the theoretical distribution.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="What To Look For">
        <ul className="space-y-2">
          <li>Method calls usually build a circuit object first rather than execute immediately.</li>
          <li>Counts are sampled measurement data, not direct amplitude access.</li>
          <li>Bell-state output is a fast sanity check for superposition plus control logic.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/projects/bell-explorer" className="btn-secondary justify-center">Open Bell Explorer</Link>
          <Link to="/references" className="btn-ghost justify-center">Open References</Link>
        </div>
      </RailCard>
    </>
  )
}

function WorkflowFigure() {
  const steps = [
    {
      title: 'Author',
      body: 'Create a circuit object, add gates, and declare measurements.',
      accent: 'border-indigo-800/40 bg-indigo-950/20 text-indigo-300',
    },
    {
      title: 'Transpile',
      body: 'Rewrite the circuit into a form a specific backend can accept.',
      accent: 'border-sky-800/40 bg-sky-950/20 text-sky-300',
    },
    {
      title: 'Execute',
      body: 'Run many shots on a simulator or on hardware and collect counts.',
      accent: 'border-violet-800/40 bg-violet-950/20 text-violet-300',
    },
    {
      title: 'Interpret',
      body: 'Compare the measured distribution with the theoretical prediction.',
      accent: 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300',
    },
  ]

  return (
    <DiagramFrame
      label="Qiskit workflow"
      description="A minimal engineering workflow for Qiskit: author a circuit, transpile it, execute many shots, and interpret the resulting counts."
      aspect="16/11"
    >
      <div className="grid w-full gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className={`rounded-xl border p-4 ${step.accent}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-500">Step {index + 1}</span>
              <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.body}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  )
}

function FirstCircuitFigure() {
  return (
    <DiagramFrame
      label="Text circuit and counts"
      description="A one-qubit Hadamard-plus-measurement circuit shown together with representative shot counts."
      aspect="16/10"
    >
      <div className="grid w-full gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">qc.draw('text')</p>
          <pre className="mt-4 overflow-x-auto text-sm leading-relaxed text-emerald-300">{`     ┌───┐ ░ ┌─┐
q_0: ┤ H ├─░─┤M├
     └───┘ ░ └─┘
c: 1/═══════════╩═
                0`}</pre>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Representative counts</p>
          <div className="mt-5 space-y-4">
            {[
              { label: '0', count: 512, width: '51.2%', accent: 'bg-indigo-500' },
              { label: '1', count: 488, width: '48.8%', accent: 'bg-violet-500' },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-mono text-white">{row.label}</span>
                  <span className="font-mono text-slate-400">{row.count}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div className={`h-3 rounded-full ${row.accent}`} style={{ width: row.width }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            The simulator does not return amplitudes directly. It returns a sampled distribution obtained
            from repeated measurements.
          </p>
        </div>
      </div>
    </DiagramFrame>
  )
}

function GateReferenceFigure() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {GATE_CARDS.map((gate) => (
        <div key={gate.symbol} className={`rounded-xl border p-5 ${gate.frame}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{gate.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{gate.action}</p>
            </div>
            <div className={`rounded-lg border px-3 py-1.5 font-mono text-sm ${gate.badge}`}>
              {gate.symbol}
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-center">
            <InlineMath>{gate.matrix}</InlineMath>
          </div>
          <p className="mt-3 font-mono text-xs text-slate-400">{gate.api}</p>
        </div>
      ))}
    </div>
  )
}

function BellOutcomeFigure() {
  const rows = [
    { bitstring: '00', status: 'Expected', note: 'Constructive support from the Bell state.', accent: 'text-emerald-300 bg-emerald-950/30 border-emerald-800/40' },
    { bitstring: '11', status: 'Expected', note: 'Constructive support from the Bell state.', accent: 'text-emerald-300 bg-emerald-950/30 border-emerald-800/40' },
    { bitstring: '01', status: 'Suppressed', note: 'Ideal circuit amplitude is zero.', accent: 'text-amber-300 bg-amber-950/30 border-amber-800/40' },
    { bitstring: '10', status: 'Suppressed', note: 'Ideal circuit amplitude is zero.', accent: 'text-amber-300 bg-amber-950/30 border-amber-800/40' },
  ]

  return (
    <DiagramFrame
      label="Bell-state measurement structure"
      description="For an ideal Bell pair, only the bitstrings 00 and 11 should appear after measurement."
      aspect="16/10"
    >
      <div className="grid w-full gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">State preparation</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-indigo-800/40 bg-indigo-950/20 p-3">
              <p className="text-xs uppercase tracking-widest text-indigo-300">Step 1</p>
              <p className="mt-2 text-sm text-slate-300">Apply <InlineMath>{'H'}</InlineMath> to qubit 0.</p>
              <p className="mt-2 font-mono text-sm text-white">{'|00⟩ → (|00⟩ + |10⟩)/√2'}</p>
            </div>
            <div className="rounded-lg border border-violet-800/40 bg-violet-950/20 p-3">
              <p className="text-xs uppercase tracking-widest text-violet-300">Step 2</p>
              <p className="mt-2 text-sm text-slate-300">Apply <InlineMath>{'CX_{0,1}'}</InlineMath>.</p>
              <p className="mt-2 font-mono text-sm text-white">{'(|00⟩ + |10⟩)/√2 → (|00⟩ + |11⟩)/√2'}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.bitstring} className={`rounded-xl border p-4 ${row.accent}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-lg text-white">{row.bitstring}</span>
                <span className="text-xs uppercase tracking-widest">{row.status}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  )
}

function HardwareRealityFigure() {
  const rows = [
    {
      title: 'Shots matter',
      body: 'Finite sampling means counts wobble around the ideal probabilities.',
    },
    {
      title: 'Backends differ',
      body: 'Available gate sets, coupling constraints, and noise properties depend on the backend.',
    },
    {
      title: 'Transpilation is part of the job',
      body: 'A circuit is a logical description first. Qiskit rewrites it to match the target machine.',
    },
    {
      title: 'Noise changes expectations',
      body: 'Simulator-perfect output is a baseline, not a guarantee of hardware behavior.',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.title} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <h3 className="text-sm font-semibold text-white">{row.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{row.body}</p>
        </div>
      ))}
    </div>
  )
}

export default function Qiskit() {
  return (
    <ModuleLayout
      moduleId="qiskit"
      title="Qiskit"
      subtitle="Programming, simulating, and analyzing quantum circuits with IBM's Python SDK."
      prev={{ to: '/phase', label: 'Module 3: Phase & Measurement Angles' }}
      next={{ to: '/gates', label: 'Module 5: Single-Qubit Gates' }}
      outline={QISKIT_OUTLINE}
      aside={<QiskitSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Up to this point, the handbook has focused on concepts: <Keyword tone="qubit">qubits</Keyword>,{' '}
          <Keyword tone="amplitude">amplitudes</Keyword>, <Keyword tone="basis">basis states</Keyword>,{' '}
          <Keyword tone="phase">phase</Keyword>, and <Keyword tone="measurement">measurement</Keyword>.{' '}
          <Keyword tone="qiskit">Qiskit</Keyword> is where those ideas become executable objects. Instead
          of talking abstractly about applying a Hadamard gate or measuring a Bell pair, you can specify
          a <Keyword tone="circuit">circuit</Keyword>, run many shots, and inspect the resulting distribution.
        </p>
        <p>
          This chapter is not intended as a complete software manual. Its purpose is narrower: to make
          the programming model legible enough that later modules on <Keyword tone="gate">gates</Keyword>,
          multi-qubit systems, and machine projects can refer to real code without introducing an entirely
          new language at the same time.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with single-qubit states, measurement, and phase from the previous modules.',
            'Basic Python familiarity: imports, variables, function calls, and lists.',
            'Willingness to read both code and circuit diagrams as two views of the same object.',
          ]}
        >
          If the phase notation still feels unstable, review{' '}
          <Link to="/phase" className="text-indigo-400 transition-colors hover:text-indigo-300">
            Phase &amp; Measurement Angles
          </Link>{' '}
          before treating the code examples here as more than syntax.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Understand how <Keyword tone="qiskit">Qiskit</Keyword> separates <Keyword tone="circuit">circuit</Keyword> definition, execution, and result analysis.</li>
            <li>Read the core API calls for single-qubit <Keyword tone="gate">gates</Keyword>, controlled gates, and <Keyword tone="measurement">measurement</Keyword>.</li>
            <li>Interpret counts from a simulator as sampled <Keyword tone="measurement">measurement data</Keyword> rather than exact state access.</li>
          </ul>
        </div>
      </div>

      <section id="qiskit-workflow" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">What Qiskit actually gives you</h2>
        <p className="section-sub">
          <Keyword tone="qiskit">Qiskit</Keyword> is not a quantum computer. It is a software toolkit for
          describing <Keyword tone="circuit">circuits</Keyword>, transforming them for a{' '}
          <Keyword tone="backend">backend</Keyword>, executing them, and inspecting the{' '}
          <Keyword tone="measurement">measurement data</Keyword> that comes back.
        </p>

        <DefinitionBox term="Qiskit">
          <Keyword tone="qiskit">Qiskit</Keyword> is a Python software development kit for quantum
          computing workflows. At the introductory level, its main role is to let you define a
          {' '}<Keyword tone="circuit">circuit</Keyword> mathematically, simulate it locally, and compare the
          measured statistics with theoretical expectations.
        </DefinitionBox>

        <div className="mt-4">
          <ExampleBox title="Environment Setup">
            <p>
              The minimal local workflow is to install the base package and a simulator backend, then
              verify that Python can import the package successfully.
            </p>
            <div className="mt-4">
              <CodeBlock code={SETUP_CODE} language="bash" label="terminal" />
            </div>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <WorkflowFigure />
        </div>

        <div className="mt-6">
          <RemarkBox>
            The important conceptual split is between the logical circuit and the target backend. A
            circuit says what operation you want. A backend determines how that operation is actually
            carried out, whether in an ideal simulator or on noisy hardware.
          </RemarkBox>
        </div>
      </section>

      <section id="qiskit-first-circuit" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">A first circuit: description first, execution second</h2>
        <p className="section-sub">
          The core beginner mistake is to read each method call as if it executes immediately. In
          Qiskit, you first build a circuit object. Only later do you submit it to a simulator or
          backend for repeated measurement.
        </p>

        <DefinitionBox term="QuantumCircuit">
          A <code className="text-slate-100">QuantumCircuit</code> object is a structured description of a quantum
          program. It records which qubits exist, which gates are applied, and how measurement results
          are written to classical bits.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="QuantumCircuit(num_qubits, num_clbits)">
            The first argument declares the quantum wires. The second declares classical storage for
            measurement results. For a single measured qubit, <code className="text-slate-100">QuantumCircuit(1, 1)</code>{' '}
            is enough.
          </NotationBox>
        </div>

        <div className="mt-6 grid gap-4">
          <CodeBlock code={FIRST_CIRCUIT} language="python" label="first_circuit.py" />
          <CodeBlock code={RUN_CODE} language="python" label="run_circuit.py" />
        </div>

        <div className="mt-6">
          <FirstCircuitFigure />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Why The Counts Are Near 50/50">
            <p>
              Starting from <InlineMath>{'|0\\rangle'}</InlineMath>, the Hadamard gate prepares the state
              <InlineMath>{'|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt{2}'}</InlineMath>. Measuring in the
              computational basis therefore yields probabilities
              <InlineMath>{'P(0) = P(1) = 1/2'}</InlineMath>.
            </p>
            <p className="mt-3">
              A run with 1000 shots will not usually produce exactly 500 zeros and 500 ones. Sampling
              noise is expected. What matters is that the observed counts cluster around the predicted
              distribution.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Think of the circuit object as a blueprint rather than an imperative trace. The gate calls
            modify the blueprint. The call to <code className="text-slate-100">run(...)</code> is what produces data.
          </RemarkBox>
        </div>
      </section>

      <section id="qiskit-gate-api" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Reading the gate API without mysticism</h2>
        <p className="section-sub">
          For simple circuits, Qiskit method names track the mathematical gate names directly. That is
          why it is worth understanding the notation before writing code: the API is thin, not magical.
        </p>

        <DefinitionBox term="Gate Application">
          Applying a gate in Qiskit means appending a unitary operation to one or more qubit wires in
          the circuit description. The integer arguments identify which qubits the operation acts on.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="qc.h(0), qc.x(0), qc.z(0), qc.cx(0, 1)">
            Single-qubit gates take one qubit index. Controlled gates take multiple indices, typically
            listed in control-then-target order. The syntax is short because the mathematical operation
            is the real object of interest.
          </NotationBox>
        </div>

        <div className="mt-6">
          <GateReferenceFigure />
        </div>

        <div className="mt-6">
          <CodeBlock code={GATES_CODE} language="python" label="gates.py" />
        </div>

        <div className="mt-6">
          <RemarkBox>
            You should not expect every backend to implement exactly the same primitive gate family.
            One reason transpilation exists is that Qiskit may need to rewrite a logical circuit into a
            backend-specific equivalent before execution.
          </RemarkBox>
        </div>
      </section>

      <section id="qiskit-bell" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Bell states in code</h2>
        <p className="section-sub">
          The Bell-state example is useful because it ties together superposition, controlled operations,
          and correlated measurement outcomes in one compact program.
        </p>

        <DefinitionBox term="Bell State">
          A Bell state is a maximally entangled two-qubit state. The standard introductory example is
          <InlineMath>{'|\\Phi^+\\rangle = (|00\\rangle + |11\\rangle)/\\sqrt{2}'}</InlineMath>, which produces
          perfectly correlated computational-basis outcomes in the ideal case.
        </DefinitionBox>

        <div className="mt-6">
          <CodeBlock code={BELL_CODE} language="python" label="bell_state.py" />
        </div>

        <div className="mt-6">
          <BellOutcomeFigure />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Reading The Result">
            <MathDisplay>{'|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)'}</MathDisplay>
            <p>
              The ideal state has support only on <InlineMath>{'|00\\rangle'}</InlineMath> and
              <InlineMath>{'|11\\rangle'}</InlineMath>. That is why the measured bitstrings should be
              concentrated on <code className="text-slate-100">"00"</code> and
              <code className="text-slate-100">"11"</code>, with no mass on
              <code className="text-slate-100">"01"</code> or <code className="text-slate-100">"10"</code> in the
              ideal simulation.
            </p>
            <p className="mt-3">
              If you want a more guided experiment around this idea, the
              {' '}
              <Link to="/projects/bell-explorer" className="text-emerald-400 transition-colors hover:text-emerald-300">
                Bell Explorer project
              </Link>
              {' '}turns the same circuit into a focused machine project.
            </p>
          </ExampleBox>
        </div>
      </section>

      <section id="qiskit-judgment" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">From simulator output to engineering judgment</h2>
        <p className="section-sub">
          Running a notebook cell is not yet experimental judgment. The next skill is learning what the
          returned counts do and do not justify.
        </p>

        <DefinitionBox term="Shot">
          A shot is one execution of the full circuit followed by measurement. Repeating many shots lets
          you estimate the probability distribution associated with a chosen measurement basis.
        </DefinitionBox>

        <div className="mt-4">
          <DefinitionBox term="Counts">
            Counts are a histogram of observed classical bitstrings across repeated shots. They are
            empirical data, not the full quantum state itself.
          </DefinitionBox>
        </div>

        <div className="mt-6">
          <HardwareRealityFigure />
        </div>

        <div className="mt-6">
          <RemarkBox>
            Treat the simulator as a controlled baseline. If theory and ideal simulation disagree, the
            bug is probably in the circuit logic. If ideal simulation and hardware disagree, the next
            suspects are transpilation details, noise, calibration, or insufficient sampling.
          </RemarkBox>
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Reading gate method calls as if they execute the experiment immediately.',
              clarification:
                'The circuit is constructed first. Execution happens only when you submit the circuit to a simulator or backend.',
            },
            {
              mistake: 'Expecting counts to reveal the exact amplitudes of a state.',
              clarification:
                'Counts are sampled measurement outcomes. They estimate probabilities after measurement, not the full amplitude vector.',
            },
            {
              mistake: 'Assuming simulator-perfect results should automatically appear on real hardware.',
              clarification:
                'Real devices introduce backend constraints and noise, so simulator output is a reference point, not a guarantee.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Qiskit separates circuit description, backend preparation, execution, and result analysis.',
            'A QuantumCircuit object is a program specification, not an already-running experiment.',
            'Core API calls such as h, x, z, cx, and measure map closely to the mathematical operations they name.',
            'Shot counts are statistical measurement data, which is why interpretation matters as much as syntax.',
          ]}
        />
      </div>

      <section id="qiskit-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Continue from syntax into circuit reasoning</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next module returns to the mathematics of single-qubit gates. If the code examples here
          made the abstractions more concrete, keep that mapping active as you move back into theory.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/gates" className="btn-primary">
            Continue to Single-Qubit Gates
          </Link>
          <Link to="/projects/first-circuit" className="btn-secondary">
            Try the First Circuit Project
          </Link>
          <Link to="/references" className="btn-secondary">
            Open References
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
