import { Link } from 'react-router-dom'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import DiagramFrame from '../../components/DiagramFrame'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

function ClassicalVsQuantumFigure() {
  return (
    <DiagramFrame
      label="Classical and Quantum State Descriptions"
      description="A classical bit is described by one definite value at a time, while a qubit is described by amplitudes relative to a basis."
      aspect="auto"
    >
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Classical Bit</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-2xl font-semibold text-slate-200">
              0
            </div>
            <span className="text-slate-600">or</span>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-2xl font-semibold text-slate-200">
              1
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            At any given moment, the state description is one definite logical value.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-5">
          <p className="text-xs uppercase tracking-widest text-indigo-400">Qubit</p>
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-4">
            <MathDisplay>{'|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle'}</MathDisplay>
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            The state is described by amplitudes relative to the basis states
            <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>.
          </p>
        </div>
      </div>
    </DiagramFrame>
  )
}

function StateCountFigure() {
  const rows = [
    { qubits: 1, states: '2' },
    { qubits: 2, states: '4' },
    { qubits: 3, states: '8' },
    { qubits: 10, states: '1,024' },
    { qubits: 20, states: '1,048,576' },
  ]

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Scaling</p>
      <h3 className="mt-3 text-lg font-semibold text-white">State Descriptions Grow as 2^n</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="border-b border-slate-800 bg-slate-950/70">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Number of qubits</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Basis states in the description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row) => (
              <tr key={row.qubits}>
                <td className="px-4 py-3 text-slate-200">{row.qubits}</td>
                <td className="px-4 py-3 font-mono text-indigo-300">{row.states}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MeasurementFigure() {
  return (
    <DiagramFrame
      label="Measurement in the Computational Basis"
      description="Amplitudes determine probabilities, and measurement returns one classical outcome rather than the whole state."
      aspect="auto"
    >
      <div className="grid w-full gap-4 lg:grid-cols-[1.2fr_auto_1fr]">
        <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-4">
          <p className="text-sm font-semibold text-white">State before measurement</p>
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4">
            <MathDisplay>{'|\\psi\\rangle = \\tfrac{1}{\\sqrt{2}}|0\\rangle + \\tfrac{1}{\\sqrt{2}}|1\\rangle'}</MathDisplay>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <p className="text-xs uppercase tracking-widest text-slate-500">P(0)</p>
              <p className="mt-2 text-xl font-semibold text-indigo-300">50%</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <p className="text-xs uppercase tracking-widest text-slate-500">P(1)</p>
              <p className="mt-2 text-xl font-semibold text-violet-300">50%</p>
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-center text-slate-600 lg:flex">→</div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm font-semibold text-white">Possible outcomes</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-green-800/40 bg-green-950/20 p-3">
              <p className="font-mono text-lg text-green-300">|0⟩</p>
              <p className="mt-1 text-sm text-slate-400">Returned on one run with probability 1/2.</p>
            </div>
            <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-3">
              <p className="font-mono text-lg text-violet-300">|1⟩</p>
              <p className="mt-1 text-sm text-slate-400">Returned on one run with probability 1/2.</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFrame>
  )
}

function InterferenceFigure() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-green-800/40 bg-green-950/20 p-4 text-center">
        <p className="text-sm font-semibold text-green-300">Constructive interference</p>
        <svg viewBox="0 0 220 90" className="mt-4 h-24 w-full">
          <path
            d="M10,45 Q35,15 60,45 Q85,75 110,45 Q135,15 160,45 Q185,75 210,45"
            fill="none"
            opacity="0.4"
            stroke="#4ade80"
            strokeWidth="2"
          />
          <path
            d="M10,45 Q35,15 60,45 Q85,75 110,45 Q135,15 160,45 Q185,75 210,45"
            fill="none"
            opacity="0.4"
            stroke="#86efac"
            strokeWidth="2"
          />
          <path
            d="M10,45 Q35,-5 60,45 Q85,95 110,45 Q135,-5 160,45 Q185,95 210,45"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
          />
        </svg>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          Amplitudes add in the same direction, increasing the weight of a desired outcome.
        </p>
      </div>

      <div className="rounded-xl border border-red-800/40 bg-red-950/20 p-4 text-center">
        <p className="text-sm font-semibold text-red-300">Destructive interference</p>
        <svg viewBox="0 0 220 90" className="mt-4 h-24 w-full">
          <path
            d="M10,45 Q35,15 60,45 Q85,75 110,45 Q135,15 160,45 Q185,75 210,45"
            fill="none"
            opacity="0.65"
            stroke="#818cf8"
            strokeWidth="2"
          />
          <path
            d="M10,45 Q35,75 60,45 Q85,15 110,45 Q135,75 160,45 Q185,15 210,45"
            fill="none"
            opacity="0.65"
            stroke="#f87171"
            strokeWidth="2"
          />
          <line x1="10" y1="45" x2="210" y2="45" stroke="#94a3b8" strokeDasharray="5 3" strokeWidth="2.5" />
        </svg>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          Amplitudes cancel, reducing the probability of an unwanted outcome.
        </p>
      </div>
    </div>
  )
}

function ApplicationsGrid() {
  const items = [
    {
      title: 'Physical simulation',
      body: 'Quantum systems are difficult to simulate classically, so quantum computers are natural candidates for selected chemistry and materials problems.',
    },
    {
      title: 'Structured search',
      body: "Algorithms such as Grover's search use amplitude amplification to improve performance on specific search-style problems.",
    },
    {
      title: 'Number-theoretic problems',
      body: "Shor's algorithm is the canonical example showing that some factoring-related tasks can admit strong quantum speedups.",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

export default function Intuition() {
  return (
    <ModuleLayout
      moduleId="intuition"
      title="Big-Picture Intuition"
      subtitle="An introductory chapter on qubits, superposition, measurement, and why interference matters."
      next={{ to: '/braket', label: 'Module 2: Bra-Ket Notation' }}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Quantum computing begins with a different way of describing information. The classical model
          uses bits that are always in one definite logical state. The quantum model uses state
          descriptions that support superposition, phase, and interference.
        </p>
        <p>
          This page is an orientation chapter rather than a full mathematical treatment. Its purpose is
          to establish the conceptual vocabulary you need before the notation becomes heavier in later
          modules.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'No prior quantum-computing background is required.',
            'Comfort reading short technical explanations is enough for this module.',
            'Some familiarity with algebraic symbols helps, but all essential notation is introduced explicitly.',
          ]}
        >
          If you are already comfortable with the motivation but not the symbols, you can move quickly
          into{' '}
          <Link to="/braket" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Bra-Ket Notation
          </Link>{' '}
          after finishing this page.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed">
            <li>Understand how a qubit differs from a classical bit at the level of state description.</li>
            <li>Recognize why superposition alone is not enough; measurement and interference are equally central.</li>
            <li>Leave with a realistic sense of where quantum computing helps and where it does not.</li>
          </ul>
        </div>
      </div>

      <section className="mt-10">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Classical bits and qubits</h2>
        <p className="section-sub">
          The first distinction is not "speed" but representation. A qubit is described relative to a
          basis, which already makes it different from a single classical bit.
        </p>

        <DefinitionBox term="Qubit">
          A qubit is the basic unit of quantum information. For an introductory one-qubit system, the
          state is described as a normalized combination of the basis states
          <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="|ψ⟩ = α|0⟩ + β|1⟩">
            The coefficients <InlineMath>{'\\alpha'}</InlineMath> and <InlineMath>{'\\beta'}</InlineMath> are
            amplitudes. Their squared magnitudes determine measurement probabilities, and they satisfy
            <InlineMath>{'|\\alpha|^2 + |\\beta|^2 = 1'}</InlineMath>.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ClassicalVsQuantumFigure />
        </div>

        <div className="mt-6">
          <RemarkBox>
            A qubit should not be understood as "two classical bits packed into one place." The state
            description is richer, but a single measurement still returns one classical outcome.
          </RemarkBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Superposition and state-space growth</h2>
        <p className="section-sub">
          Superposition means the state can be a linear combination of basis states. For many-qubit
          systems, that description grows exponentially with the number of qubits.
        </p>

        <DefinitionBox term="Superposition">
          A superposition is a valid quantum state formed by combining basis states with amplitudes.
          The state is not merely an unknown classical choice between those basis states; it is a new
          state description that can later participate in interference.
        </DefinitionBox>

        <div className="mt-6">
          <StateCountFigure />
        </div>

        <div className="mt-6">
          <ExampleBox>
            <MathDisplay>{'|+\\rangle = \\tfrac{1}{\\sqrt{2}}|0\\rangle + \\tfrac{1}{\\sqrt{2}}|1\\rangle'}</MathDisplay>
            <p>
              This equal superposition is one of the most common introductory states. It does not mean
              "half of a 0 and half of a 1" in a classical sense. It means the state has equal
              amplitudes relative to the computational basis.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Exponential growth in the state description does not imply that you can read out all
            <InlineMath>{'2^n'}</InlineMath> amplitudes in one measurement. The value of superposition appears
            only when an algorithm uses it together with interference and basis-sensitive measurement.
          </RemarkBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Measurement and collapse</h2>
        <p className="section-sub">
          Measurement converts a quantum state into a classical outcome. The probabilities come from
          amplitudes, and one run returns one outcome.
        </p>

        <DefinitionBox term="Measurement">
          Measurement is the process of extracting a classical result from a quantum state. In the
          computational basis, the outcome is 0 or 1 for a single qubit, with probabilities determined
          by the state amplitudes.
        </DefinitionBox>

        <div className="mt-6">
          <MeasurementFigure />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Equal Superposition">
            <p>
              For <InlineMath>{'|\\psi\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt{2}'}</InlineMath>, the
              amplitudes are both <InlineMath>{'1/\\sqrt{2}'}</InlineMath>. Squaring their magnitudes gives
              probability <InlineMath>{'1/2'}</InlineMath> for 0 and probability <InlineMath>{'1/2'}</InlineMath> for 1.
            </p>
            <p className="mt-3">
              If you run the same circuit many times, the frequencies approach those probabilities. A
              single shot, however, still returns only one of the two outcomes.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Later modules refine this picture by showing that measurement depends on basis. For now, the
            main point is that amplitudes control outcome probabilities rather than appearing directly as
            observable numbers.
          </RemarkBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Why interference matters</h2>
        <p className="section-sub">
          Superposition alone does not create a useful algorithm. The advantage comes from controlling
          amplitudes so that some outcomes are amplified while others are suppressed.
        </p>

        <DefinitionBox term="Interference">
          Interference is the way amplitudes combine. They can reinforce one another constructively or
          cancel one another destructively, which changes the final measurement probabilities.
        </DefinitionBox>

        <div className="mt-6">
          <InterferenceFigure />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Algorithmic Use">
            <p>
              In introductory quantum algorithms, the design goal is often to route amplitude toward a
              correct answer and away from incorrect answers. When that works, a final measurement is
              more likely to return the desired result than a naive classical guess.
            </p>
          </ExampleBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Why quantum computing matters, and its limits</h2>
        <p className="section-sub">
          Quantum computing is important because some problem classes appear to admit meaningful
          speedups. It is equally important to understand that the model is specialized rather than
          universally superior.
        </p>

        <ApplicationsGrid />

        <div className="mt-6">
          <RemarkBox>
            Quantum computing is not a replacement for classical computing. The practical question is
            always narrower: does a specific problem have structure that an algorithm can exploit using
            superposition, interference, and measurement?
          </RemarkBox>
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Thinking a qubit stores both classical answers in a directly readable way.',
              clarification:
                'A qubit is described by amplitudes over basis states, but one measurement still returns one classical outcome.',
            },
            {
              mistake: 'Assuming more qubits automatically imply a faster computer for every task.',
              clarification:
                'State-space size grows quickly, but speedup depends on algorithm structure, not on qubit count alone.',
            },
            {
              mistake: 'Treating measurement as passive observation with no effect on the state description.',
              clarification:
                'Measurement changes what information remains available and is central to how quantum algorithms are designed.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'A qubit differs from a classical bit because it is described by amplitudes relative to a basis.',
            'Superposition expands the state description, but useful computation depends on measurement and interference as well.',
            'Measurement returns classical outcomes with probabilities derived from amplitudes.',
            'Quantum computing matters for selected structured problems, not as a blanket replacement for classical systems.',
          ]}
        />
      </div>

      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">Move from intuition to notation</h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          The next chapter introduces bra-ket notation so the state descriptions on this page can be
          written and manipulated more formally.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/braket" className="btn-primary">
            Continue to Bra-Ket Notation
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Review Key Terms
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
