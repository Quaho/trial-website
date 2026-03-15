import ModuleLayout from '../components/ModuleLayout'
import SummaryBox from '../components/SummaryBox'
import MistakesBox from '../components/MistakesBox'

function InfoCard({ emoji, title, children }) {
  return (
    <div className="card my-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          <div className="text-slate-400 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function CompareTable() {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-3 px-4 text-left text-slate-400 font-medium">Property</th>
            <th className="py-3 px-4 text-left text-blue-400 font-medium">Classical Bit</th>
            <th className="py-3 px-4 text-left text-indigo-400 font-medium">Qubit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {[
            ['Possible values', '0 or 1', '0, 1, or any superposition'],
            ['While computing', 'Always 0 or 1', 'Can be in superposition'],
            ['After measurement', '0 or 1', '0 or 1 (collapses!)'],
            ['Physical example', 'Transistor on/off', 'Spin of an electron, photon polarization'],
            ['Copying allowed?', 'Yes, freely', 'No — no-cloning theorem'],
          ].map(([prop, bit, qubit]) => (
            <tr key={prop} className="hover:bg-slate-800/30">
              <td className="py-3 px-4 text-slate-300 font-medium">{prop}</td>
              <td className="py-3 px-4 text-blue-300">{bit}</td>
              <td className="py-3 px-4 text-indigo-300">{qubit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SuperpositionVisual() {
  return (
    <div className="my-6 flex flex-col sm:flex-row gap-4">
      {/* Classical */}
      <div className="flex-1 card text-center">
        <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider">Classical bit</p>
        <div className="flex justify-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-xl bg-blue-900/40 border-2 border-blue-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-400">0</span>
          </div>
          <div className="flex items-center text-slate-600 font-bold">or</div>
          <div className="w-16 h-16 rounded-xl bg-blue-900/40 border-2 border-blue-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-400">1</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">Always exactly one value</p>
      </div>

      {/* Qubit */}
      <div className="flex-1 card text-center border-indigo-800/50">
        <p className="text-xs text-indigo-400 mb-3 uppercase tracking-wider">Qubit (in superposition)</p>
        <div className="flex justify-center gap-2 mb-3">
          <div className="w-16 h-16 rounded-xl bg-indigo-900/40 border-2 border-dashed border-indigo-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-indigo-400">0</span>
          </div>
          <div className="flex items-center text-indigo-500 font-bold">+</div>
          <div className="w-16 h-16 rounded-xl bg-violet-900/40 border-2 border-dashed border-violet-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-violet-400">1</span>
          </div>
        </div>
        <p className="text-xs text-indigo-400">Both simultaneously, until measured</p>
      </div>
    </div>
  )
}

function WaveInterference() {
  // Simple SVG showing constructive/destructive interference
  return (
    <div className="my-6 grid sm:grid-cols-2 gap-4">
      <div className="card text-center">
        <p className="text-sm font-medium text-green-400 mb-3">Constructive Interference</p>
        <svg viewBox="0 0 200 80" className="w-full h-20">
          <path d="M10,40 Q35,10 60,40 Q85,70 110,40 Q135,10 160,40 Q185,70 200,40"
                fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.5" />
          <path d="M10,40 Q35,10 60,40 Q85,70 110,40 Q135,10 160,40 Q185,70 200,40"
                fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.5" />
          <path d="M10,40 Q35,-10 60,40 Q85,90 110,40 Q135,-10 160,40 Q185,90 200,40"
                fill="none" stroke="#4ade80" strokeWidth="3" />
        </svg>
        <p className="text-xs text-slate-500 mt-1">Amplitudes add → bigger wave</p>
      </div>
      <div className="card text-center">
        <p className="text-sm font-medium text-red-400 mb-3">Destructive Interference</p>
        <svg viewBox="0 0 200 80" className="w-full h-20">
          <path d="M10,40 Q35,10 60,40 Q85,70 110,40 Q135,10 160,40 Q185,70 200,40"
                fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.7" />
          <path d="M10,40 Q35,70 60,40 Q85,10 110,40 Q135,70 160,40 Q185,10 200,40"
                fill="none" stroke="#f87171" strokeWidth="2" opacity="0.7" />
          <line x1="10" y1="40" x2="190" y2="40" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
        </svg>
        <p className="text-xs text-slate-500 mt-1">Amplitudes cancel → flat line</p>
      </div>
    </div>
  )
}

const SUMMARY = [
  'Classical bits are always 0 or 1. Qubits can be in a superposition of both simultaneously — but only while we\'re not looking.',
  'Measurement collapses superposition: the qubit picks a definite value (0 or 1) and stays there.',
  'Interference lets quantum computers amplify paths to correct answers and cancel paths to wrong ones.',
  'Quantum computers aren\'t universally faster — they excel at specific problem types like factoring, search, and simulation.',
  'Entanglement links qubits so measuring one instantly tells you something about the other.',
]

const MISTAKES = [
  {
    mistake: '"Superposition means the qubit is secretly 0 or 1, we just don\'t know which."',
    clarification: 'No — superposition is genuinely both. It\'s not hidden information; the qubit really exists in both states until measured. Bell\'s theorem experiments confirm this.'
  },
  {
    mistake: '"Quantum computers are faster at everything."',
    clarification: 'False. Quantum speedup only applies to specific problems. For most everyday tasks, classical computers are faster and cheaper.'
  },
  {
    mistake: '"Measuring more qubits gives you the superposition values."',
    clarification: 'Measurement always collapses to a classical 0 or 1. You never directly "read out" a superposition — that\'s why algorithm design is hard.'
  },
]

export default function Intuition() {
  return (
    <ModuleLayout
      moduleId="intuition"
      title="Big-Picture Intuition"
      subtitle="Understand what quantum computing is — and why it's strange — before touching any math."
      next={{ to: '/braket', label: 'Module 2: Bra-Ket Notation' }}
    >
      {/* Section 1: Bits vs Qubits */}
      <section className="mb-12">
        <h2 className="section-heading">Bits vs Qubits</h2>
        <p className="section-sub">The fundamental unit of information</p>

        <div className="prose-quantum">
          <p>
            A classical computer stores everything as <strong className="text-white">bits</strong> — tiny switches that
            are either <em>off</em> (0) or <em>on</em> (1). Every photo, song, and email is ultimately billions of these
            switches flipping.
          </p>
          <p>
            A quantum computer uses <strong className="text-indigo-300">qubits</strong> instead. A qubit can be
            0, or 1, or — here's where it gets strange — <em>both at the same time</em>. This is called
            <strong className="text-indigo-300"> superposition</strong>.
          </p>
        </div>

        <SuperpositionVisual />
        <CompareTable />

        <InfoCard emoji="🪙" title="The Coin Analogy">
          Think of a classical bit as a coin lying flat: it's either heads or tails.
          A qubit is like a coin <em>spinning in the air</em> — it's genuinely neither heads nor
          tails until it lands (is measured). Once it lands, it picks a side and stays there.
        </InfoCard>
      </section>

      {/* Section 2: Superposition */}
      <section className="mb-12">
        <h2 className="section-heading">Superposition</h2>
        <p className="section-sub">Being in multiple states at once — and why it matters</p>

        <div className="prose-quantum">
          <p>
            Superposition isn't just a weird philosophical claim. It has measurable consequences.
            A qubit in superposition can <strong className="text-white">participate in multiple computations
            simultaneously</strong>. Two qubits in superposition represent four states at once
            (00, 01, 10, 11). Ten qubits represent 1,024 states. Fifty qubits represent
            over a quadrillion states — simultaneously.
          </p>
          <p>
            But here's the catch: you can only read out <em>one</em> of those states when you measure.
            The art of quantum algorithm design is arranging the math so the answer you want
            is the one most likely to appear.
          </p>
        </div>

        <div className="card my-6 bg-indigo-950/30 border-indigo-800/40">
          <p className="text-sm text-indigo-300 font-mono text-center">
            n qubits in superposition → 2ⁿ states simultaneously
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
            {[[1,'2'],[2,'4'],[10,'1,024'],[50,'1,125,899,906,842,624']].map(([n, s]) => (
              <div key={n} className="bg-slate-900 rounded-lg p-2">
                <div className="text-indigo-400 font-bold text-lg">{n}</div>
                <div className="text-slate-500">qubits</div>
                <div className="text-white font-mono text-xs mt-1">{s}</div>
                <div className="text-slate-500">states</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Measurement */}
      <section className="mb-12">
        <h2 className="section-heading">Measurement & Collapse</h2>
        <p className="section-sub">Looking at a qubit changes it — forever</p>

        <div className="prose-quantum">
          <p>
            When you measure a qubit, something strange happens: the superposition <strong className="text-white">collapses</strong>.
            The qubit instantly picks 0 or 1 — probabilistically, based on how the superposition was set up —
            and the other possibility vanishes. You can't undo this.
          </p>
          <p>
            This is why quantum algorithms must be carefully designed: you can't just "read out"
            all the states in the superposition. Measurement is destructive. You get one shot.
          </p>
        </div>

        <div className="flex gap-4 my-6 flex-col sm:flex-row">
          <div className="flex-1 card border-indigo-800/40 text-center">
            <p className="text-4xl mb-2">🌀</p>
            <p className="text-indigo-300 font-medium">Before Measurement</p>
            <p className="text-slate-400 text-sm mt-1">Qubit is in superposition<br />both 0 and 1 simultaneously</p>
          </div>
          <div className="flex items-center justify-center text-slate-600 font-bold text-2xl">
            →
          </div>
          <div className="flex-1 card border-green-800/40 text-center">
            <p className="text-4xl mb-2">🎯</p>
            <p className="text-green-300 font-medium">After Measurement</p>
            <p className="text-slate-400 text-sm mt-1">Qubit collapses to 0 or 1<br />superposition is gone</p>
          </div>
        </div>
      </section>

      {/* Section 4: Interference */}
      <section className="mb-12">
        <h2 className="section-heading">Interference</h2>
        <p className="section-sub">The trick that makes quantum algorithms work</p>

        <div className="prose-quantum">
          <p>
            Quantum states have something classical bits don't: <strong className="text-white">amplitudes</strong> —
            numbers that can be positive, negative, or complex. When two paths through a computation meet,
            their amplitudes can add together (<em>constructive interference</em>) or cancel out
            (<em>destructive interference</em>).
          </p>
          <p>
            A good quantum algorithm uses interference to <em>amplify</em> paths that lead to the correct
            answer and <em>cancel</em> paths that lead to wrong answers. By the time you measure, the
            right answer has a high probability of appearing.
          </p>
        </div>

        <WaveInterference />

        <InfoCard emoji="🎸" title="Guitar String Analogy">
          Two guitar strings vibrating can interfere. Pluck them perfectly in sync and they
          get louder (constructive). Pluck them exactly out of phase and they cancel each other out
          (destructive). Quantum amplitudes work the same way — just with probability amplitudes
          instead of sound waves.
        </InfoCard>
      </section>

      {/* Section 5: Why QC matters */}
      <section className="mb-8">
        <h2 className="section-heading">Why Does Quantum Computing Matter?</h2>
        <p className="section-sub">What problems does it actually help with?</p>

        <div className="prose-quantum">
          <p>
            Quantum computers aren't magic speed machines. They're specialized tools that solve
            certain problems exponentially faster than any classical computer ever could.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            { area: 'Cryptography', detail: 'Shor\'s algorithm factors large numbers exponentially faster, threatening RSA encryption.' },
            { area: 'Drug Discovery', detail: 'Simulating molecular interactions at quantum scale — impossible classically.' },
            { area: 'Optimization', detail: 'Finding the best route, schedule, or configuration among trillions of options.' },
            { area: 'Machine Learning', detail: 'Quantum kernel methods and amplitude encoding may speed up certain ML tasks.' },
          ].map(({ area, detail }) => (
            <div key={area} className="card">
              <h4 className="font-semibold text-indigo-300 mb-1">{area}</h4>
              <p className="text-sm text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <SummaryBox points={SUMMARY} />
      <MistakesBox items={MISTAKES} />
    </ModuleLayout>
  )
}
