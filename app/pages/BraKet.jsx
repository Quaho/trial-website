import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import DiagramFrame from '../../components/DiagramFrame'
import Keyword from '../../components/Keyword'
import RailCard from '../../components/RailCard'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import GlossaryTooltip from '../../components/GlossaryTooltip'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const BRAKET_OUTLINE = [
  { id: 'braket-kets', label: 'Kets and the computational basis' },
  { id: 'braket-bras', label: 'Bras as dual vectors' },
  { id: 'braket-inner-products', label: 'Inner products and overlap' },
  { id: 'braket-reading', label: 'Reading the notation in practice' },
  { id: 'braket-next', label: 'Next steps' },
]

function BraKetSupport() {
  return (
    <>
      <RailCard label="Core Symbols" title="Read The Notation">
        <ul className="space-y-2">
          <li><span className="font-mono text-indigo-300">|ψ⟩</span>: ket, the state vector.</li>
          <li><span className="font-mono text-violet-300">⟨ψ|</span>: bra, the conjugate-transposed dual vector.</li>
          <li><span className="font-mono text-emerald-300">⟨φ|ψ⟩</span>: inner product, measuring overlap.</li>
        </ul>
      </RailCard>

      <RailCard label="Checkpoint" title="What This Chapter Should Clarify">
        <ul className="space-y-2">
          <li>Amplitudes are not probabilities until you take absolute squares.</li>
          <li>Complex conjugation is part of the bra, not an optional flourish.</li>
          <li>Inner products connect notation directly to measurement rules.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/phase" className="btn-secondary justify-center">Go To Phase</Link>
          <Link to="/glossary" className="btn-ghost justify-center">Open Glossary</Link>
        </div>
      </RailCard>
    </>
  )
}

function BasisStatesFigure() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-5 text-center">
        <p className="font-mono text-lg text-indigo-300">|0⟩</p>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4">
          <MathDisplay>{'\\begin{pmatrix}1 \\\\ 0\\end{pmatrix}'}</MathDisplay>
        </div>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          Basis vector for the computational outcome 0.
        </p>
      </div>

      <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-5 text-center">
        <p className="font-mono text-lg text-violet-300">|1⟩</p>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4">
          <MathDisplay>{'\\begin{pmatrix}0 \\\\ 1\\end{pmatrix}'}</MathDisplay>
        </div>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          Basis vector for the computational outcome 1.
        </p>
      </div>
    </div>
  )
}

function DualVectorFigure() {
  return (
    <DiagramFrame
      label="Ket and Bra"
      description="A ket is written as a column vector; the matching bra is the conjugate transpose written as a row vector."
      aspect="auto"
    >
      <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-indigo-400">Ket</p>
          <p className="mt-2 font-mono text-lg text-indigo-300">|ψ⟩</p>
          <div className="mt-2 text-slate-200">
            <MathDisplay>{'\\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}'}</MathDisplay>
          </div>
        </div>

        <div className="hidden items-center justify-center text-slate-600 sm:flex">→</div>

        <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-violet-400">Bra</p>
          <p className="mt-2 font-mono text-lg text-violet-300">⟨ψ|</p>
          <div className="mt-2 text-slate-200">
            <MathDisplay>{'\\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix}'}</MathDisplay>
          </div>
        </div>
      </div>
    </DiagramFrame>
  )
}

function OverlapFigure() {
  const examples = [
    {
      math: '\\langle 0|0\\rangle = 1',
      title: 'Self-overlap',
      body: 'A normalized state has full overlap with itself.',
    },
    {
      math: '\\langle 0|1\\rangle = 0',
      title: 'Orthogonality',
      body: 'The computational basis states are perfectly distinct.',
    },
    {
      math: '\\langle +|0\\rangle = \\tfrac{1}{\\sqrt{2}}',
      title: 'Partial overlap',
      body: 'A superposition state can have nonzero overlap with more than one basis vector.',
    },
    {
      math: 'P(\\phi) = |\\langle \\phi | \\psi \\rangle|^2',
      title: 'Probability rule',
      body: 'Squared overlap gives the probability of obtaining the outcome |φ⟩.',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {examples.map((example) => (
        <div
          key={example.title}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
        >
          <p className="text-sm font-semibold text-white">{example.title}</p>
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-center text-slate-200">
            <MathDisplay>{example.math}</MathDisplay>
          </div>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{example.body}</p>
        </div>
      ))}
    </div>
  )
}

function StateExplorer() {
  const [alpha, setAlpha] = useState(0.8)
  const beta = Math.sqrt(Math.max(0, 1 - alpha * alpha))
  const p0 = Math.round(alpha * alpha * 100)
  const p1 = Math.round(beta * beta * 100)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Normalized Single-Qubit State</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        Adjust <InlineMath>{'\\alpha'}</InlineMath>. The value of <InlineMath>{'\\beta'}</InlineMath> is
        chosen so that <InlineMath>{'|\\alpha|^2 + |\\beta|^2 = 1'}</InlineMath> remains true.
      </p>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>α = {alpha.toFixed(3)}</span>
          <span>β = {beta.toFixed(3)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={alpha}
          onChange={(event) => setAlpha(Number(event.target.value))}
          aria-label={`Adjust alpha amplitude, current value ${alpha.toFixed(3)}`}
          className="w-full accent-indigo-500"
        />
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-center font-mono text-sm text-slate-200">
        |ψ⟩ = {alpha.toFixed(3)}|0⟩ + {beta.toFixed(3)}|1⟩
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-4">
          <p className="text-xs uppercase tracking-widest text-indigo-400">Measurement of 0</p>
          <p className="mt-2 text-2xl font-semibold text-indigo-300">{p0}%</p>
          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${p0}%` }} />
          </div>
        </div>

        <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-4">
          <p className="text-xs uppercase tracking-widest text-violet-400">Measurement of 1</p>
          <p className="mt-2 text-2xl font-semibold text-violet-300">{p1}%</p>
          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-violet-500" style={{ width: `${p1}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function CheatSheetTable() {
  const rows = [
    { symbol: '|ψ⟩', name: 'Ket', meaning: 'A state vector written as a column.' },
    { symbol: '⟨ψ|', name: 'Bra', meaning: 'The conjugate transpose of the ket.' },
    { symbol: '⟨φ|ψ⟩', name: 'Inner product', meaning: 'A complex number measuring overlap.' },
    { symbol: '|0⟩, |1⟩', name: 'Computational basis', meaning: 'The standard basis used for default measurement.' },
    { symbol: 'α, β', name: 'Amplitudes', meaning: 'Coefficients whose squared magnitudes determine probabilities.' },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
      <table className="w-full border-collapse text-sm">
        <thead className="border-b border-slate-800 bg-slate-950/70">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-slate-500">Symbol</th>
            <th className="px-4 py-3 text-left font-medium text-slate-500">Name</th>
            <th className="px-4 py-3 text-left font-medium text-slate-500">Meaning</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row) => (
            <tr key={row.symbol}>
              <td className="px-4 py-3 font-mono text-indigo-300">{row.symbol}</td>
              <td className="px-4 py-3 text-slate-200">{row.name}</td>
              <td className="px-4 py-3 text-slate-400">{row.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function BraKet() {
  return (
    <ModuleLayout
      moduleId="braket"
      title="Bra-Ket Notation"
      subtitle="A careful introduction to the notation used for quantum states, dual vectors, and overlaps."
      outline={BRAKET_OUTLINE}
      aside={<BraKetSupport />}
      prev={{ to: '/intuition', label: 'Module 1: Big-Picture Intuition' }}
      next={{ to: '/phase', label: 'Module 3: Phase & Measurement Angles' }}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Bra-ket notation, also called Dirac notation, is the compact language used throughout
          introductory quantum computing. It lets us write <Keyword tone="basis">basis states</Keyword>,
          general <Keyword tone="ket">state vectors</Keyword>, and <Keyword tone="measurement">measurement rules</Keyword>{' '}
          in a form that is concise but still mathematically precise.
        </p>
        <p>
          This page introduces the notation at the single-qubit level. The goal is not to cover all
          of linear algebra, but to make the symbols readable enough that later modules on
          <GlossaryTooltip term="Gate"><Keyword tone="gate">gates</Keyword></GlossaryTooltip>,{' '}
          <GlossaryTooltip term="Measurement"><Keyword tone="measurement">measurement</Keyword></GlossaryTooltip>, and{' '}
          <Keyword tone="circuit">circuits</Keyword> no longer feel mysterious.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <PrereqList
          items={[
            'Comfort with qubits, superposition, and measurement from the foundations module.',
            'Basic familiarity with vectors is helpful, but full linear-algebra fluency is not required.',
            'Willingness to read symbols carefully and translate them into plain English.',
          ]}
        >
          If you are still unsure what a qubit represents physically, review{' '}
          <Link to="/intuition" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Big-Picture Intuition
          </Link>{' '}
          first.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Read <Keyword tone="ket">kets</Keyword> such as |0⟩, |1⟩, and |ψ⟩ as vectors rather than as decorative symbols.</li>
            <li>Understand how <Keyword tone="bra">bras</Keyword> are formed from <Keyword tone="ket">kets</Keyword> and why complex conjugation matters.</li>
            <li>Use the <Keyword tone="inner">inner product</Keyword> to interpret orthogonality and <Keyword tone="measurement">measurement probability</Keyword>.</li>
          </ul>
        </div>
      </div>

      <section id="braket-kets" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Kets and the computational basis</h2>
        <p className="section-sub">
          A <Keyword tone="ket">ket</Keyword> is a vector that describes a quantum state. For a single{' '}
          <Keyword tone="qubit">qubit</Keyword>, the standard <Keyword tone="basis">basis</Keyword> consists of the two vectors |0⟩ and |1⟩.
        </p>

        <DefinitionBox term="Ket">
          A <Keyword tone="ket">ket</Keyword> is a state vector written with a right bracket, such as{' '}
          <InlineMath>{'|\\psi\\rangle'}</InlineMath>. In the single-qubit setting, every ket can be expressed
          as a linear combination of the <Keyword tone="basis">basis kets</Keyword>{' '}
          <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <DefinitionBox term="Computational Basis">
            The <Keyword tone="basis">computational basis</Keyword> is the default basis used to describe
            one-qubit states and the default basis associated with standard <Keyword tone="measurement">measurement</Keyword>{' '}
            outcomes 0 and 1.
          </DefinitionBox>
        </div>

        <div className="mt-4">
          <NotationBox symbol="|ψ⟩ = α|0⟩ + β|1⟩">
            The coefficients <InlineMath>{'\\alpha'}</InlineMath> and <InlineMath>{'\\beta'}</InlineMath> are
            {' '}<GlossaryTooltip term="Amplitude">amplitudes</GlossaryTooltip>. They can be complex numbers, and
            they must satisfy <InlineMath>{'|\\alpha|^2 + |\\beta|^2 = 1'}</InlineMath> so that total probability
            remains one.
          </NotationBox>
        </div>

        <div className="mt-6">
          <BasisStatesFigure />
        </div>

        <div className="mt-6">
          <ExampleBox>
            <MathDisplay>{'|\\psi\\rangle = \\tfrac{\\sqrt{3}}{2}|0\\rangle + \\tfrac{1}{2}|1\\rangle'}</MathDisplay>
            <p>
              This notation says the qubit has amplitude <InlineMath>{'\\tfrac{\\sqrt{3}}{2}'}</InlineMath> on
              <InlineMath>{'|0\\rangle'}</InlineMath> and amplitude <InlineMath>{'\\tfrac{1}{2}'}</InlineMath> on
              <InlineMath>{'|1\\rangle'}</InlineMath>. The measurement probabilities in the computational basis are
              therefore <InlineMath>{'\\tfrac{3}{4}'}</InlineMath> for 0 and <InlineMath>{'\\tfrac{1}{4}'}</InlineMath> for 1.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The amplitudes are not themselves probabilities. Probability appears only after taking the
            absolute square. That distinction is what later allows phase and interference to matter.
          </RemarkBox>
        </div>
      </section>

      <section id="braket-bras" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Bras as dual vectors</h2>
        <p className="section-sub">
          A bra is the dual form of a ket. It is written with a left bracket and behaves like a row
          vector obtained from the ket by conjugate transpose.
        </p>

        <DefinitionBox term="Bra">
          Given a ket <InlineMath>{'|\\psi\\rangle'}</InlineMath>, the corresponding bra
          <InlineMath>{'\\langle \\psi |'}</InlineMath> is formed by transposing the vector and taking complex
          conjugates of its entries.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="⟨ψ| = ( α*  β* )">
            If <InlineMath>{'|\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}'}</InlineMath>,
            then <InlineMath>{'\\langle \\psi| = \\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix}'}</InlineMath>.
            For real amplitudes, this looks like “turning the ket sideways,” but complex conjugation is
            the essential step.
          </NotationBox>
        </div>

        <div className="mt-6">
          <DualVectorFigure />
        </div>

        <div className="mt-6">
          <RemarkBox>
            The complex conjugate is easy to ignore when examples use only real coefficients. Do not
            build the habit of dropping it. Phase information enters precisely through those complex
            entries.
          </RemarkBox>
        </div>
      </section>

      <section id="braket-inner-products" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Inner products and overlap</h2>
        <p className="section-sub">
          The main purpose of introducing bras is that they pair naturally with kets to form inner
          products. This is how we express orthogonality, overlap, and measurement probabilities.
        </p>

        <DefinitionBox term="Inner Product">
          The inner product <InlineMath>{'\\langle \\phi | \\psi \\rangle'}</InlineMath> combines a bra with a ket
          to produce a single complex number. Its magnitude measures how much the two states overlap.
        </DefinitionBox>

        <div className="mt-6">
          <OverlapFigure />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Orthogonality and Probability">
            <p>
              Because <InlineMath>{'\\langle 0|1\\rangle = 0'}</InlineMath>, the states
              <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath> are orthogonal.
              A measurement in the computational basis can therefore distinguish them perfectly.
            </p>
            <p className="mt-3">
              More generally, if the system is in the state <InlineMath>{'|\\psi\\rangle'}</InlineMath> and you want
              the probability of obtaining the outcome <InlineMath>{'|\\phi\\rangle'}</InlineMath>, you compute
              <InlineMath>{'|\\langle \\phi | \\psi \\rangle|^2'}</InlineMath>.
            </p>
          </ExampleBox>
        </div>
      </section>

      <section id="braket-reading" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Reading the notation in practice</h2>
        <p className="section-sub">
          At this point, the notation should be interpreted operationally: the ket encodes the state,
          the bra provides the matching dual object, and the inner product tells you what a given basis
          can reveal.
        </p>

        <StateExplorer />

        <div className="mt-6">
          <CheatSheetTable />
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Reading α and β directly as probabilities.',
              clarification:
                'They are amplitudes. The probabilities are |α|² and |β|², not α and β themselves.',
            },
            {
              mistake: 'Treating a bra as only a ket written sideways.',
              clarification:
                'The transpose matters, but so does complex conjugation. Without conjugation, the inner product rule breaks.',
            },
            {
              mistake: 'Assuming ⟨0|1⟩ should equal 1 because both are valid states.',
              clarification:
                'Validity of a state does not imply overlap. Orthogonal states are perfectly distinct and have inner product zero.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'A ket is a state vector, and every single-qubit ket can be written in the computational basis.',
            'A bra is the conjugate transpose of a ket, not just a typographic reversal.',
            'The inner product measures overlap, and its squared magnitude gives measurement probability.',
            'Careful reading of the notation now will make later modules on phase, gates, and circuits substantially easier.',
          ]}
        />
      </div>

      <section id="braket-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">Continue into phase and basis changes</h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          The next module uses this notation to explain relative phase and basis-dependent measurement.
          If any symbol still feels uncertain, keep the glossary nearby while you read.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/phase" className="btn-primary">
            Continue to Phase &amp; Measurement Angles
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Review the Glossary
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
