import { Link } from 'react-router-dom'
import ProjectLayout from '../../../components/ProjectLayout'
import CodeBlock from '../../../components/CodeBlock'
import GlossaryTooltip from '../../../components/GlossaryTooltip'
import { PROJECTS } from '../../../lib/data/projects'

const SETUP_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)  # 2 qubits, 2 classical bits`

const ENTANGLE_CODE = `qc.h(0)        # Hadamard -> q0 becomes |+>
qc.cx(0, 1)    # CNOT: q0 controls q1 -> entangles them`

const MEASURE_CODE = `qc.measure([0, 1], [0, 1])

from qiskit_aer import AerSimulator
simulator = AerSimulator()
result = simulator.run(qc, shots=1024).result()
counts = result.get_counts()
print(counts)`

const VARIANT_CODE = `qc.h(0)
qc.x(1)        # flip q1 before entangling
qc.cx(0, 1)    # now prepares |Psi+> instead of |Phi+>`

export default function BellExplorer() {
  const project = PROJECTS.find((item) => item.id === 'bell-explorer')
  const prevProject = PROJECTS.find((item) => item.id === 'first-circuit')
  const nextProject = PROJECTS.find((item) => item.id === 'algorithm-showdown')

  const steps = [
    {
      title: 'Understand the Goal',
      content: (
        <div className="space-y-4">
          <p>
            You are building a <GlossaryTooltip term="Bell State">Bell pair</GlossaryTooltip> — two
            qubits prepared so that measuring one instantly tells you the outcome of the other, every
            time, even though neither qubit has a definite value on its own beforehand.
          </p>
          <p>
            This is not classical correlation, like two coins glued together. It is{' '}
            <GlossaryTooltip term="Entanglement">entanglement</GlossaryTooltip>: the two-qubit state
            cannot be written as a product of two separate one-qubit states. You built single-qubit{' '}
            <GlossaryTooltip term="Superposition">superposition</GlossaryTooltip> in the first project;
            this one adds a second qubit and one correlating gate.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/entanglement" className="btn-ghost border border-slate-700/60 rounded-full">
              Review Entanglement
            </Link>
            <Link to="/circuits" className="btn-ghost border border-slate-700/60 rounded-full">
              Review Circuits
            </Link>
          </div>
          <div className="rounded-xl border border-teal-800/40 bg-teal-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-teal-400 mb-2">Predict</p>
            <p className="text-slate-300">
              If you measure both qubits of an ideal Bell pair many times, which of these outcomes do
              you expect to see: 00 and 11 only, 01 and 10 only, or all four roughly equally?
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Set Up Two Qubits',
      content: (
        <div className="space-y-4">
          <p>
            The wiring is almost identical to the first project, just doubled: two quantum wires and two
            classical wires so both measurement outcomes have somewhere to land.
          </p>
          <CodeBlock code={SETUP_CODE} language="python" label="setup.py" />
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <code className="text-teal-300 font-mono">QuantumCircuit(2, 2)</code> allocates{' '}
              <GlossaryTooltip term="Qubit">qubits</GlossaryTooltip> q0 and q1, both starting in{' '}
              <InlineCode>|0⟩</InlineCode>.
            </li>
            <li>Right now the two qubits are completely independent — a product state, not entangled.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Entangle Them',
      content: (
        <div className="space-y-4">
          <p>
            Two gates turn the independent pair into a Bell state: a Hadamard to create superposition on
            q0, then a <GlossaryTooltip term="Gate">CNOT</GlossaryTooltip> to correlate q1 with it.
          </p>
          <CodeBlock code={ENTANGLE_CODE} language="python" label="entangle.py" />
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><code className="text-teal-300 font-mono">qc.h(0)</code> puts q0 into <InlineCode>|+⟩</InlineCode>, the equal superposition of <InlineCode>|0⟩</InlineCode> and <InlineCode>|1⟩</InlineCode>.</li>
            <li><code className="text-teal-300 font-mono">qc.cx(0, 1)</code> flips q1 exactly when q0 is <InlineCode>|1⟩</InlineCode> — the step that removes the product-state structure.</li>
          </ul>
          <p className="text-sm text-slate-400">
            Need the gate-by-gate breakdown? Revisit{' '}
            <Link to="/circuits" className="text-teal-400 hover:text-teal-300 transition-colors">Quantum Circuits</Link>,
            which walks through this exact circuit.
          </p>
        </div>
      ),
    },
    {
      title: 'Measure and Simulate',
      content: (
        <div className="space-y-4">
          <p>
            Measure both qubits and run many shots. A single run only ever returns one classical outcome
            per qubit — the entanglement shows up in the pattern across many runs, not in any one shot.
          </p>
          <CodeBlock code={MEASURE_CODE} language="python" label="simulate.py" />
          <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">Predict</p>
            <p className="text-slate-300">
              Before running: will the counts dictionary contain a <InlineCode>'01'</InlineCode> or{' '}
              <InlineCode>'10'</InlineCode> key at all for an ideal simulator? Why or why not?
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Analyze Results',
      content: (
        <div className="space-y-4">
          <p>
            An ideal simulator returns only <InlineCode>00</InlineCode> and <InlineCode>11</InlineCode>,
            each close to 50% of shots. <InlineCode>01</InlineCode> and <InlineCode>10</InlineCode> never
            appear — the CNOT tied the two outcomes together exactly.
          </p>
          <p>
            This is the state <GlossaryTooltip term="Bell State"><InlineCode>|Φ+⟩</InlineCode></GlossaryTooltip>{' '}
            — one of four Bell states. Adding a gate before the CNOT prepares a different one:
          </p>
          <CodeBlock code={VARIANT_CODE} language="python" label="variant.py" />
          <p>
            Flipping q1 with an X gate before entangling produces <InlineCode>|Ψ+⟩</InlineCode>, where the
            two qubits always disagree instead of always agreeing — still perfectly correlated, just the
            opposite pattern.
          </p>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Reflect</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-300">
              <li>Why can&apos;t <InlineCode>|Φ+⟩</InlineCode> be written as a product of two one-qubit states?</li>
              <li>What circuit would prepare <InlineCode>|Φ-⟩</InlineCode> instead, where the sign flips?</li>
              <li>If you measured both qubits in the X basis instead of the computational basis, would the perfect correlation survive?</li>
            </ol>
          </div>
        </div>
      ),
    },
  ]

  return (
    <ProjectLayout
      projectId="bell-explorer"
      title={project?.title || 'Bell State Explorer'}
      tagline={project?.tagline || 'Construct, visualize, and measure a Bell pair end-to-end'}
      steps={steps}
      prevProject={prevProject ? { to: prevProject.to, label: 'Back: First Quantum Circuit' } : null}
      nextProject={nextProject ? { to: nextProject.to, label: 'Next: Algorithm Showdown' } : null}
    />
  )
}

function InlineCode({ children }) {
  return <code className="font-mono text-slate-200 bg-slate-800/60 rounded px-1 py-0.5">{children}</code>
}
