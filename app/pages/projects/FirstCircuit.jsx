import { Link } from 'react-router-dom'
import ProjectLayout from '../../../components/ProjectLayout'
import CodeBlock from '../../../components/CodeBlock'
import GlossaryTooltip from '../../../components/GlossaryTooltip'
import { PROJECTS } from '../../../lib/data/projects'

const SETUP_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(1, 1)  # 1 qubit, 1 classical bit`

const GATES_CODE = `qc.h(0)   # Hadamard -> creates |+> superposition
qc.s(0)   # S gate -> adds 90° phase to |1> component`

const MEASURE_CODE = `qc.measure(0, 0)

from qiskit_aer import AerSimulator
simulator = AerSimulator()
result = simulator.run(qc, shots=1024).result()
counts = result.get_counts()
print(counts)`

export default function FirstCircuit() {
  const project = PROJECTS.find((item) => item.id === 'first-circuit')
  const nextProject = PROJECTS.find((item) => item.id === 'bell-explorer')

  const steps = [
    {
      title: 'Understand the Goal',
      content: (
        <div className="space-y-4">
          <p>
            You are building the smallest circuit that still feels genuinely quantum. It starts with one
            qubit, spreads it into <GlossaryTooltip term="Superposition">superposition</GlossaryTooltip>,
            nudges the hidden phase, then ends with a measurement.
          </p>
          <p>
            Think of it like spinning a coin, twisting its timing while it spins, then asking only one
            yes-or-no question at the end. That final question is a{' '}
            <GlossaryTooltip term="Measurement">measurement</GlossaryTooltip>, so some information stays hidden
            unless you choose the right basis.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/intuition"
              className="btn-ghost border border-slate-700/60 rounded-full"
            >
              Review Intuition
            </Link>
            <Link
              to="/braket"
              className="btn-ghost border border-slate-700/60 rounded-full"
            >
              Review Bra-Ket
            </Link>
          </div>
          <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-indigo-400 mb-2">Predict</p>
            <p className="text-slate-300">
              Before you look at any code: if a qubit is in superposition, what kind of outcomes do you
              expect when you measure it many times?
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Set Up the Circuit',
      content: (
        <div className="space-y-4">
          <p>
            Start with the empty wiring. Qiskit needs one quantum wire and one classical wire so the
            result has somewhere to land.
          </p>
          <CodeBlock code={SETUP_CODE} language="python" label="setup.py" />
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><code className="text-indigo-300 font-mono">QuantumCircuit</code> is the object that holds the whole recipe.</li>
            <li>The first <GlossaryTooltip term="Qubit">qubit</GlossaryTooltip> argument says how many quantum wires you want.</li>
            <li>The second argument creates one classical bit for the readout after measurement.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Apply Gates',
      content: (
        <div className="space-y-4">
          <p>
            Now the interesting part: add two operations. The first <GlossaryTooltip term="Gate">gate</GlossaryTooltip>{' '}
            creates a balanced starting state. The second changes the hidden{' '}
            <GlossaryTooltip term="Phase">phase</GlossaryTooltip> of the |1⟩ branch without changing the
            raw Z-basis probabilities.
          </p>
          <CodeBlock code={GATES_CODE} language="python" label="gates.py" />
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><code className="text-indigo-300 font-mono">qc.h(0)</code> turns |0⟩ into the equal |+⟩ state.</li>
            <li><code className="text-indigo-300 font-mono">qc.s(0)</code> rotates only the |1⟩ component by 90°.</li>
            <li>The state has changed, but not in a way the default Z-basis measurement can immediately reveal.</li>
          </ul>
          <p className="text-sm text-slate-400">
            Need a refresher on what those operations do? Revisit{' '}
            <Link to="/gates" className="text-sky-400 hover:text-sky-300 transition-colors">Single-Qubit Gates</Link>.
          </p>
        </div>
      ),
    },
    {
      title: 'Measure and Simulate',
      content: (
        <div className="space-y-4">
          <p>
            Add the final <GlossaryTooltip term="Measurement">measurement</GlossaryTooltip>, then run the
            circuit many times with a simulator. One shot is noisy; 1,024 shots reveal the pattern.
          </p>
          <CodeBlock code={MEASURE_CODE} language="python" label="simulate.py" />
          <p>
            The simulator returns a counts dictionary, not the hidden state vector. That mirrors real
            hardware: you only get sampled outcomes after measurement.
          </p>
          <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">Predict</p>
            <p className="text-slate-300">
              Will the extra S gate change the 0/1 counts in the Z basis, or will you still see roughly
              a 50/50 split? Explain your guess before running it.
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
            You should see counts close to 50% |0⟩ and 50% |1⟩. That feels surprising at first, but it
            matches the theory: the S gate changes relative <GlossaryTooltip term="Phase">phase</GlossaryTooltip>,
            not the Z-basis probabilities.
          </p>
          <p>
            So did the S gate do nothing? Not at all. Its effect is real; you just need a different
            measurement basis to reveal it. If you add an H before measuring, you convert phase
            information into something the measurement can see.
          </p>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Reflect</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-300">
              <li>Why doesn&apos;t the S gate change the measurement probabilities in the Z basis?</li>
              <li>What would happen if you replaced the S gate with a Z gate?</li>
              <li>How could you verify the phase is there without changing the measurement basis?</li>
            </ol>
          </div>
        </div>
      ),
    },
  ]

  return (
    <ProjectLayout
      projectId="first-circuit"
      title={project?.title || 'First Quantum Circuit'}
      tagline={project?.tagline || 'Build and simulate a simple circuit using concepts from Intuition → Qiskit'}
      steps={steps}
      prevProject={null}
      nextProject={nextProject ? { to: nextProject.to, label: 'Next: Bell State Explorer' } : null}
    />
  )
}
