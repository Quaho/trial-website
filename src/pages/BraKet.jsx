import ModuleLayout from '../components/ModuleLayout'
import SummaryBox from '../components/SummaryBox'
import MistakesBox from '../components/MistakesBox'
import { MathDisplay, Math } from '../components/MathBlock'
import { useState } from 'react'

function NotationCard({ symbol, name, read, example, children }) {
  return (
    <div className="card my-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-indigo-900/40 border border-indigo-700/50
                        flex items-center justify-center text-2xl font-mono text-indigo-300">
          {symbol}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-xs text-slate-500 mb-1">Pronounced: "{read}"</p>
          <div className="text-sm text-slate-400">{children}</div>
          {example && <p className="mt-2 text-xs font-mono text-indigo-300">{example}</p>}
        </div>
      </div>
    </div>
  )
}

function CheatSheet() {
  const items = [
    { sym: '|ψ⟩', name: 'Ket', desc: 'A quantum state (column vector)' },
    { sym: '⟨ψ|', name: 'Bra', desc: 'Conjugate transpose of a ket (row vector)' },
    { sym: '⟨φ|ψ⟩', name: 'Braket', desc: 'Inner product — overlap between two states' },
    { sym: '|0⟩', name: 'Zero ket', desc: 'Basis state representing classical 0' },
    { sym: '|1⟩', name: 'One ket', desc: 'Basis state representing classical 1' },
    { sym: '|+⟩', name: 'Plus ket', desc: 'Equal superposition: (|0⟩+|1⟩)/√2' },
    { sym: '|−⟩', name: 'Minus ket', desc: 'Equal superposition: (|0⟩−|1⟩)/√2' },
    { sym: 'α, β', name: 'Amplitudes', desc: 'Complex numbers; |α|²+|β|²=1' },
  ]
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2 px-3 text-left text-slate-500 font-medium">Symbol</th>
            <th className="py-2 px-3 text-left text-slate-500 font-medium">Name</th>
            <th className="py-2 px-3 text-left text-slate-500 font-medium">Meaning</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {items.map(({ sym, name, desc }) => (
            <tr key={sym} className="hover:bg-slate-800/30">
              <td className="py-2.5 px-3 font-mono text-indigo-300 text-base">{sym}</td>
              <td className="py-2.5 px-3 text-slate-300 font-medium">{name}</td>
              <td className="py-2.5 px-3 text-slate-400">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StateExplorer() {
  const [alpha, setAlpha] = useState(0.707)
  const beta = Math.sqrt(Math.max(0, 1 - alpha * alpha))
  const p0 = (alpha * alpha * 100).toFixed(1)
  const p1 = (beta * beta * 100).toFixed(1)

  return (
    <div className="card border-indigo-800/40 my-6">
      <h4 className="font-semibold text-white mb-1">Interactive: State Explorer</h4>
      <p className="text-sm text-slate-400 mb-4">
        Drag the slider to set α. β is calculated so that |α|² + |β|² = 1.
      </p>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>α = {alpha.toFixed(3)}</span>
          <span>β = {beta.toFixed(3)}</span>
        </div>
        <input
          type="range" min="0" max="1" step="0.001"
          value={alpha}
          onChange={e => setAlpha(parseFloat(e.target.value))}
          className="w-full accent-indigo-500"
        />
      </div>

      <div className="bg-slate-900 rounded-xl p-4 font-mono text-center text-lg mb-4">
        <span className="text-indigo-300">|ψ⟩ = {alpha.toFixed(3)}</span>
        <span className="text-slate-500"> |0⟩ + </span>
        <span className="text-violet-300">{beta.toFixed(3)}</span>
        <span className="text-slate-500"> |1⟩</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-indigo-950/40 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-indigo-300">{p0}%</div>
          <div className="text-xs text-slate-500 mt-0.5">P(measuring 0)</div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${p0}%` }} />
          </div>
        </div>
        <div className="bg-violet-950/40 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-violet-300">{p1}%</div>
          <div className="text-xs text-slate-500 mt-0.5">P(measuring 1)</div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${p1}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const SUMMARY = [
  'Bra-ket notation is a compact, powerful language for describing quantum states and operations.',
  '|ψ⟩ (ket) is a column vector representing a quantum state. ⟨ψ| (bra) is its conjugate transpose.',
  'The inner product ⟨φ|ψ⟩ measures "overlap" between states. Orthogonal states have inner product 0.',
  '|0⟩ and |1⟩ are the computational basis states, analogous to 0 and 1 in classical computing.',
  'Any qubit state is α|0⟩ + β|1⟩, where |α|² + |β|² = 1 (probabilities must sum to 1).',
  'The amplitudes α and β are complex numbers, not just probabilities — they carry phase information.',
]

const MISTAKES = [
  {
    mistake: '"α and β are probabilities directly."',
    clarification: 'α and β are amplitudes — complex numbers. The probabilities are |α|² and |β|². This distinction matters because amplitudes can be negative or complex, enabling interference.',
  },
  {
    mistake: '"⟨0| is the same as |0⟩."',
    clarification: 'No — |0⟩ is a column vector (ket); ⟨0| is its conjugate transpose, a row vector (bra). The braket ⟨0|1⟩ is 0 (they\'re orthogonal); |0⟩⟨0| is an outer product (a matrix).',
  },
  {
    mistake: '"A qubit is just a probabilistic bit — a coin with certain odds."',
    clarification: 'Probabilities are classical (always ≥ 0). Amplitudes are quantum (can be negative/complex). The difference is physical: negative amplitudes cause interference, which pure probability theory can\'t explain.',
  },
]

export default function BraKet() {
  return (
    <ModuleLayout
      moduleId="braket"
      title="Bra-Ket Notation"
      subtitle="The mathematical language physicists and quantum programmers use to describe quantum states."
      prev={{ to: '/intuition', label: 'Module 1: Intuition' }}
      next={{ to: '/phase', label: 'Module 3: Phase & Angles' }}
    >
      {/* Section 1: Why notation */}
      <section className="mb-12">
        <h2 className="section-heading">Why Do We Need Special Notation?</h2>
        <p className="section-sub">A language designed for quantum states</p>

        <div className="prose-quantum">
          <p>
            In module 1, we talked about qubits being "in superposition of 0 and 1."
            But to actually <em>compute</em> with qubits, we need precise math.
            Bra-ket notation (also called <strong className="text-white">Dirac notation</strong>),
            invented by physicist Paul Dirac, gives us a clean way to write quantum states,
            operations, and measurements.
          </p>
          <p>
            Don't be intimidated by the angle brackets — the concepts are simpler than they look.
          </p>
        </div>
      </section>

      {/* Section 2: Kets */}
      <section className="mb-12">
        <h2 className="section-heading">Kets: Quantum States</h2>
        <p className="section-sub">How we write a quantum state</p>

        <div className="prose-quantum">
          <p>
            A <strong className="text-white">ket</strong> is written as <code className="text-indigo-300">|ψ⟩</code>
            (the letter inside is just a label). It represents a quantum state as a column vector.
            The two most important kets are:
          </p>
        </div>

        <MathDisplay>{'|0\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\qquad |1\\rangle = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}'}</MathDisplay>

        <div className="prose-quantum">
          <p>
            These are the <strong className="text-white">computational basis states</strong>.
            Think of them as the quantum analogs of classical 0 and 1.
            Any qubit state is a combination of these two:
          </p>
        </div>

        <MathDisplay>{'|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}'}</MathDisplay>

        <div className="card my-4 bg-slate-900/50">
          <p className="text-sm text-slate-400">
            Where <Math>{'\\alpha'}</Math> and <Math>{'\\beta'}</Math> are complex numbers satisfying{' '}
            <Math>{'|\\alpha|^2 + |\\beta|^2 = 1'}</Math>. This ensures the probabilities of getting
            0 or 1 sum to 100%.
          </p>
        </div>

        <NotationCard symbol="|ψ⟩" name="Ket" read="ket psi">
          A column vector representing a quantum state. The label inside (ψ, 0, 1, +, etc.)
          is just a name. |0⟩ means "the state corresponding to classical 0."
        </NotationCard>

        <StateExplorer />
      </section>

      {/* Section 3: Bras */}
      <section className="mb-12">
        <h2 className="section-heading">Bras: The Other Half</h2>
        <p className="section-sub">The "mirror image" of a ket</p>

        <div className="prose-quantum">
          <p>
            Every ket has a corresponding <strong className="text-white">bra</strong>, written <code className="text-indigo-300">⟨ψ|</code>.
            The bra is the <em>conjugate transpose</em> (also called Hermitian conjugate or dagger) of the ket —
            a row vector with complex-conjugated entries.
          </p>
        </div>

        <MathDisplay>{'|\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} \\quad \\Rightarrow \\quad \\langle\\psi| = \\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix}'}</MathDisplay>

        <div className="prose-quantum">
          <p>
            For real amplitudes (which is often the case in introductory examples), the bra is just
            the row version of the ket: <Math>{'\\langle 0| = (1,\\, 0)'}</Math> and <Math>{'\\langle 1| = (0,\\, 1)'}</Math>.
          </p>
        </div>

        <NotationCard symbol="⟨ψ|" name="Bra" read="bra psi">
          The conjugate transpose of a ket. A row vector. Together, bra + ket = "braket."
          (Yes, Dirac named it after a bracket — he had a sense of humor.)
        </NotationCard>
      </section>

      {/* Section 4: Inner product */}
      <section className="mb-12">
        <h2 className="section-heading">Inner Products: Measuring Overlap</h2>
        <p className="section-sub">⟨φ|ψ⟩ tells you how "similar" two states are</p>

        <div className="prose-quantum">
          <p>
            The <strong className="text-white">inner product</strong> <Math>{'\\langle \\phi | \\psi \\rangle'}</Math> combines
            a bra and a ket to produce a single number (a scalar). Geometrically, it measures how much
            the two states overlap.
          </p>
        </div>

        <MathDisplay>{'\\langle \\phi | \\psi \\rangle = \\sum_i \\phi_i^* \\psi_i'}</MathDisplay>

        <div className="prose-quantum">
          <p>Key facts about inner products:</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 my-4">
          {[
            {
              label: '⟨0|0⟩ = 1',
              desc: 'A state\'s overlap with itself is 1 (it\'s normalized)',
              math: '\\langle 0|0\\rangle = (1)(1) + (0)(0) = 1',
            },
            {
              label: '⟨0|1⟩ = 0',
              desc: '|0⟩ and |1⟩ are orthogonal — totally different states',
              math: '\\langle 0|1\\rangle = (1)(0) + (0)(1) = 0',
            },
            {
              label: '⟨+|0⟩ = 1/√2',
              desc: '|+⟩ has 50% overlap with |0⟩',
              math: '\\langle +|0\\rangle = \\tfrac{1}{\\sqrt{2}}',
            },
            {
              label: '|⟨φ|ψ⟩|² = probability',
              desc: 'Squared magnitude = probability of measuring |φ⟩ when in state |ψ⟩',
              math: 'P(\\phi) = |\\langle \\phi | \\psi \\rangle|^2',
            },
          ].map(({ label, desc, math }) => (
            <div key={label} className="card">
              <code className="text-indigo-300 font-mono text-sm">{label}</code>
              <p className="text-slate-400 text-sm mt-1 mb-2">{desc}</p>
              <div className="text-center">
                <Math>{math}</Math>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cheat sheet */}
      <section className="mb-8">
        <h2 className="section-heading">Notation Cheat Sheet</h2>
        <p className="section-sub">Quick reference for all the symbols</p>
        <CheatSheet />
      </section>

      <SummaryBox points={SUMMARY} />
      <MistakesBox items={MISTAKES} />
    </ModuleLayout>
  )
}
