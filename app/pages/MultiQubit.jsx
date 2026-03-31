import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import Keyword from '../../components/Keyword'
import RailCard from '../../components/RailCard'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import ExpandableAside from '../../components/ExpandableAside'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const MULTIQUBIT_OUTLINE = [
  { id: 'multiqubit-scaling', label: 'Exponential state-space growth' },
  { id: 'multiqubit-basis', label: 'The two-qubit computational basis' },
  { id: 'multiqubit-tensor', label: 'Tensor products describe independent subsystems' },
  { id: 'multiqubit-separable', label: 'Separable versus entangled states' },
  { id: 'multiqubit-born-rule', label: 'Reading amplitudes and probabilities' },
  { id: 'multiqubit-next', label: 'Next steps' },
]

function MultiQubitSupport() {
  return (
    <>
      <RailCard label="Key Notation" title="Read The Symbols">
        <ul className="space-y-2">
          <li><span className="font-mono text-cyan-300">|ij⟩</span>: ordered basis label for two qubits.</li>
          <li><span className="font-mono text-cyan-300">αij</span>: amplitude attached to the basis outcome <span className="font-mono text-cyan-300">|ij⟩</span>.</li>
          <li><span className="font-mono text-cyan-300">⊗</span>: tensor product, used for independent subsystem composition.</li>
        </ul>
      </RailCard>

      <RailCard label="Checkpoint" title="What This Page Should Settle">
        <ul className="space-y-2">
          <li>Why two qubits need four amplitudes rather than two.</li>
          <li>How to expand a simple tensor product correctly.</li>
          <li>Why Bell states are not factorizable.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/entanglement" className="btn-secondary justify-center">Preview Entanglement</Link>
          <Link to="/gates" className="btn-ghost justify-center">Review Gates</Link>
        </div>
      </RailCard>
    </>
  )
}

function QubitScalingVisual() {
  const data = [
    { qubits: 1, amplitudes: '2' },
    { qubits: 2, amplitudes: '4' },
    { qubits: 3, amplitudes: '8' },
    { qubits: 10, amplitudes: '1,024' },
    { qubits: 20, amplitudes: '1,048,576' },
  ]

  return (
    <div className="rounded-2xl border border-cyan-800/30 bg-cyan-950/20 p-5">
      <p className="section-label">Scaling</p>
      <h3 className="mt-3 text-lg font-semibold text-white">State Descriptions Grow as 2^n</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        Each added qubit doubles the dimension of the state space. That is why a modest increase in
        qubit count quickly becomes expensive for classical simulation.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {data.map((row) => (
          <div key={row.qubits} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-center">
            <div className="text-xl font-bold text-cyan-300">{row.qubits}</div>
            <div className="text-xs text-slate-500">qubits</div>
            <div className="mt-2 font-mono text-sm text-white">{row.amplitudes}</div>
            <div className="text-xs text-slate-500">amplitudes</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BasisStatesVisual() {
  const states = [
    { ket: '|00⟩', vector: [1, 0, 0, 0], note: 'first qubit 0, second qubit 0' },
    { ket: '|01⟩', vector: [0, 1, 0, 0], note: 'first qubit 0, second qubit 1' },
    { ket: '|10⟩', vector: [0, 0, 1, 0], note: 'first qubit 1, second qubit 0' },
    { ket: '|11⟩', vector: [0, 0, 0, 1], note: 'first qubit 1, second qubit 1' },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {states.map((state) => (
        <div key={state.ket} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-center">
          <div className="font-mono text-lg font-semibold text-cyan-300">{state.ket}</div>
          <p className="mt-2 text-xs text-slate-500">{state.note}</p>
          <div className="mt-4 flex justify-center gap-2">
            {state.vector.map((entry, index) => (
              <div
                key={index}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-sm ${
                  entry === 1
                    ? 'border-cyan-600 bg-cyan-900/50 text-cyan-200'
                    : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TensorProductVisual() {
  const states = [
    { label: '|0⟩', amps: [1, 0] },
    { label: '|1⟩', amps: [0, 1] },
    { label: '|+⟩', amps: [0.707, 0.707] },
  ]
  const basisLabels = ['|00⟩', '|01⟩', '|10⟩', '|11⟩']

  const [leftIndex, setLeftIndex] = useState(0)
  const [rightIndex, setRightIndex] = useState(0)

  const left = states[leftIndex]
  const right = states[rightIndex]
  const result = [
    left.amps[0] * right.amps[0],
    left.amps[0] * right.amps[1],
    left.amps[1] * right.amps[0],
    left.amps[1] * right.amps[1],
  ]

  return (
    <div className="rounded-2xl border border-cyan-800/30 bg-cyan-950/20 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Tensor Product Builder</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        Choose two independent one-qubit states and inspect the resulting two-qubit amplitudes. This
        widget is useful because it makes the multiplication rule concrete.
      </p>

      <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div>
          <p className="mb-1.5 text-center text-xs text-slate-500">Left qubit</p>
          <div className="flex gap-2">
            {states.map((state, index) => (
              <button
                key={state.label}
                onClick={() => setLeftIndex(index)}
                aria-label={`Select left qubit ${state.label}`}
                className={`rounded-full px-3 py-1.5 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  leftIndex === index
                    ? 'bg-cyan-600 text-white focus-visible:outline-cyan-400'
                    : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'
                }`}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>

        <span className="hidden text-lg font-bold text-cyan-300 sm:block">⊗</span>

        <div>
          <p className="mb-1.5 text-center text-xs text-slate-500">Right qubit</p>
          <div className="flex gap-2">
            {states.map((state, index) => (
              <button
                key={state.label}
                onClick={() => setRightIndex(index)}
                aria-label={`Select right qubit ${state.label}`}
                className={`rounded-full px-3 py-1.5 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  rightIndex === index
                    ? 'bg-cyan-600 text-white focus-visible:outline-cyan-400'
                    : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'
                }`}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-900/70 p-4 text-center font-mono text-sm">
        <span className="text-cyan-300">{left.label}</span>
        <span className="text-slate-500"> ⊗ </span>
        <span className="text-cyan-300">{right.label}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {basisLabels.map((label, index) => {
          const amplitude = result[index]
          const probability = amplitude * amplitude * 100
          return (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-center">
              <div className="font-mono text-sm text-cyan-300">{label}</div>
              <div className="mt-1 font-mono text-xs text-white">{amplitude.toFixed(3)}</div>
              <div className="mt-1 text-xs text-slate-500">{probability.toFixed(1)}%</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-500 transition-all duration-300" style={{ width: `${probability}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SeparabilityVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/10 p-5">
        <div className="flex items-center gap-2">
          <span className="text-lg text-emerald-400">✓</span>
          <h3 className="text-sm font-semibold text-emerald-300">Separable state</h3>
        </div>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-center font-mono text-sm">
          <span className="text-cyan-300">|+⟩ ⊗ |0⟩</span>
          <span className="text-slate-500"> = </span>
          <span className="text-white">(|00⟩ + |10⟩)/√2</span>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
          <li>Each subsystem still has its own independent state description.</li>
          <li>Knowing the outcome of one qubit does not by itself force the outcome of the other.</li>
          <li>The expression can be factored into a product of one-qubit states.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-800/40 bg-amber-950/10 p-5">
        <div className="flex items-center gap-2">
          <span className="text-lg text-amber-400">⚠</span>
          <h3 className="text-sm font-semibold text-amber-300">Entangled state</h3>
        </div>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-center font-mono text-sm text-white">
          (|00⟩ + |11⟩)/√2
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
          <li>The joint state cannot be factored into independent one-qubit pieces.</li>
          <li>Measurement outcomes become correlated in a way separable states cannot reproduce.</li>
          <li>This is the bridge into the dedicated entanglement chapter that follows.</li>
        </ul>
      </div>
    </div>
  )
}

function AmplitudeReaderVisual() {
  const presets = [
    { label: '|00⟩', amplitudes: [1, 0, 0, 0] },
    { label: '|+0⟩', amplitudes: [0.707, 0, 0.707, 0] },
    { label: 'Equal', amplitudes: [0.5, 0.5, 0.5, 0.5] },
    { label: 'Bell', amplitudes: [0.707, 0, 0, 0.707] },
  ]
  const basisLabels = ['|00⟩', '|01⟩', '|10⟩', '|11⟩']

  const [presetIndex, setPresetIndex] = useState(0)
  const amplitudes = presets[presetIndex].amplitudes
  const total = amplitudes.reduce((sum, amplitude) => sum + amplitude * amplitude, 0) * 100

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {presets.map((preset, index) => (
          <button
            key={preset.label}
            onClick={() => setPresetIndex(index)}
            aria-label={`Select preset state ${preset.label}`}
            className={`rounded-full px-3 py-1.5 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              presetIndex === index
                ? 'bg-cyan-600 text-white focus-visible:outline-cyan-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={presets[presetIndex].label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-5 space-y-2.5"
        >
          {basisLabels.map((label, index) => {
            const amplitude = amplitudes[index]
            const probability = amplitude * amplitude * 100
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="w-10 flex-shrink-0 text-right font-mono text-sm text-cyan-300">{label}</span>
                <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-cyan-500/70 transition-all duration-300"
                    style={{ width: `${probability}%` }}
                  />
                  {probability > 0 && (
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/80">
                      {amplitude.toFixed(3)} → {probability.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-center text-xs text-slate-500">
        Sum of probabilities: {total.toFixed(1)}%
      </p>
    </div>
  )
}

export default function MultiQubit() {
  return (
    <ModuleLayout
      moduleId="multiqubit"
      title="Multi-Qubit Systems"
      subtitle="How tensor products, basis states, and correlations change the bookkeeping once a system has more than one qubit."
      outline={MULTIQUBIT_OUTLINE}
      aside={<MultiQubitSupport />}
      prev={{ to: '/gates', label: 'Module 5: Single-Qubit Gates' }}
      next={{ to: '/entanglement', label: 'Module 7: Entanglement' }}
    >
      <div className="prose-quantum max-w-none">
        <p>
          A single <Keyword tone="qubit">qubit</Keyword> already requires <Keyword tone="amplitude">amplitudes</Keyword>,{' '}
          <Keyword tone="phase">phase</Keyword>, and <Keyword tone="basis">basis-dependent</Keyword>{' '}
          reasoning. Once two or more qubits are involved, the description changes qualitatively rather
          than incrementally. The combined state space grows exponentially, and the language of{' '}
          <Keyword tone="tensor">tensor products</Keyword> becomes unavoidable.
        </p>
        <p>
          This chapter introduces the minimal structure needed to read multi-qubit states correctly. It
          focuses on the <Keyword tone="basis">computational basis</Keyword>, the <Keyword tone="tensor">tensor product</Keyword>{' '}
          rule for independent systems, and the distinction between separable and{' '}
          <Keyword tone="entanglement">entangled states</Keyword>.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with single-qubit state notation, amplitudes, and the Born rule.',
            'Basic familiarity with gates and basis changes from the previous modules.',
            'Willingness to track left-to-right qubit ordering carefully.',
          ]}
        >
          If the one-qubit gate language still feels unstable, revisit{' '}
          <Link to="/gates" className="text-indigo-400 transition-colors hover:text-indigo-300">
            Single-Qubit Gates
          </Link>{' '}
          before moving deeper into composite systems.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Understand why an n-qubit pure state requires <Keyword tone="amplitude">2^n amplitudes</Keyword>.</li>
            <li>Read and manipulate two-qubit <Keyword tone="basis">basis states</Keyword> and <Keyword tone="tensor">tensor-product</Keyword> expressions.</li>
            <li>Distinguish independent product states from genuinely <Keyword tone="entanglement">entangled</Keyword> joint states.</li>
          </ul>
        </div>
      </div>

      <section id="multiqubit-scaling" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">From one qubit to many: exponential state-space growth</h2>
        <p className="section-sub">
          The first important fact is purely structural. Adding <Keyword tone="qubit">qubits</Keyword>{' '}
          multiplies the size of the state space, which is why multi-qubit reasoning is both powerful and expensive.
        </p>

        <DefinitionBox term="Composite State Space">
          An n-qubit pure state is described by a normalized vector in a complex vector space of
          dimension <InlineMath>{'2^n'}</InlineMath>. The description therefore needs one <Keyword tone="amplitude">amplitude</Keyword>{' '}
          for each <Keyword tone="basis">computational-basis</Keyword> label of length n.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="|ψ⟩ = Σx αx|x⟩">
            For n qubits, the index <InlineMath>{'x'}</InlineMath> runs over all n-bit strings. The
            coefficients <InlineMath>{'\\alpha_x'}</InlineMath> are amplitudes satisfying
            <InlineMath>{'\\sum_x |\\alpha_x|^2 = 1'}</InlineMath>.
          </NotationBox>
        </div>

        <div className="mt-6">
          <QubitScalingVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Why 50 Qubits Matter">
            <p>
              A 50-qubit pure-state description requires <InlineMath>{'2^{50}'}</InlineMath> complex
              amplitudes, which is on the order of one quadrillion numbers. Even before accounting for
              overhead, that already pushes beyond the comfortable memory range of ordinary classical systems.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Exponential state-space growth is not itself a proof of quantum advantage. The important
            question is whether an algorithm can exploit this structure while still producing a useful,
            measurable output.
          </RemarkBox>
        </div>
      </section>

      <section id="multiqubit-basis" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">The two-qubit computational basis</h2>
        <p className="section-sub">
          Before discussing entanglement or algorithms, the notation must be stable. Two qubits have
          four computational-basis states, and left-to-right ordering matters.
        </p>

        <DefinitionBox term="Two-Qubit Computational Basis">
          The standard basis for a two-qubit system is
          <InlineMath>{'\\{|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle\\}'}</InlineMath>. Each label
          records one classical bit value per qubit position.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="|ψ⟩ = α00|00⟩ + α01|01⟩ + α10|10⟩ + α11|11⟩">
            A general two-qubit state carries one amplitude per basis state. Measuring in the
            computational basis returns exactly one of those four bitstrings.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Reading |10⟩">
            <p>
              The ket <InlineMath>{'|10\\rangle'}</InlineMath> means the first qubit is in the basis state
              <InlineMath>{'|1\\rangle'}</InlineMath> and the second qubit is in
              <InlineMath>{'|0\\rangle'}</InlineMath>. The ordering is positional, not alphabetical or interchangeable.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Open the Two-Qubit Basis Lookup" label="Optional Interactive">
            <p className="mb-4">
              Use this lookup if you want a quick visual reminder of how the four basis labels align with
              the standard basis vectors.
            </p>
            <BasisStatesVisual />
          </ExpandableAside>
        </div>
      </section>

      <section id="multiqubit-tensor" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Tensor products describe independent subsystems</h2>
        <p className="section-sub">
          When two qubits are prepared independently, their joint state is formed by the tensor product.
          This rule multiplies amplitudes and concatenates basis labels.
        </p>

        <DefinitionBox term="Tensor Product">
          The tensor product combines state spaces. If the first qubit is in state
          <InlineMath>{'|\\psi\\rangle'}</InlineMath> and the second is in state
          <InlineMath>{'|\\phi\\rangle'}</InlineMath>, then the joint independent state is
          <InlineMath>{'|\\psi\\rangle \\otimes |\\phi\\rangle'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="(a|0⟩ + b|1⟩) ⊗ (c|0⟩ + d|1⟩)">
            Expanding the tensor product gives
            <InlineMath>{'ac|00\\rangle + ad|01\\rangle + bc|10\\rangle + bd|11\\rangle'}</InlineMath>.
            The amplitudes multiply because each basis component of the first state pairs with each basis
            component of the second.
          </NotationBox>
        </div>

        <div className="mt-6">
          <TensorProductVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: |+⟩ ⊗ |0⟩">
            <MathDisplay>{'|+\\rangle \\otimes |0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) \\otimes |0\\rangle = \\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}'}</MathDisplay>
            <p>
              Only the basis states with the second qubit fixed at 0 appear. This is a product state,
              not an entangled one.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Tensor products describe independence. Entanglement begins precisely where this product
            description stops being possible.
          </RemarkBox>
        </div>
      </section>

      <section id="multiqubit-separable" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Separable versus entangled states</h2>
        <p className="section-sub">
          The most important conceptual break in multi-qubit systems is the appearance of states that
          cannot be factored into single-qubit pieces.
        </p>

        <DefinitionBox term="Separable State">
          A two-qubit state is separable if it can be written as
          <InlineMath>{'|\\psi\\rangle \\otimes |\\phi\\rangle'}</InlineMath> for some one-qubit states
          <InlineMath>{'|\\psi\\rangle'}</InlineMath> and <InlineMath>{'|\\phi\\rangle'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <DefinitionBox term="Entangled State">
            A state is entangled if no such factorization exists. Its full description belongs to the
            joint system rather than to either qubit independently.
          </DefinitionBox>
        </div>

        <div className="mt-6">
          <SeparabilityVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Why the Bell State Does Not Factor">
            <p>
              Suppose <InlineMath>{'(|00\\rangle + |11\\rangle)/\\sqrt{2}'}</InlineMath> could be written as
              <InlineMath>{'(a|0\\rangle + b|1\\rangle) \\otimes (c|0\\rangle + d|1\\rangle)'}</InlineMath>.
              Expansion would force
              <InlineMath>{'ac = 1/\\sqrt{2}'}</InlineMath>,
              <InlineMath>{'ad = 0'}</InlineMath>,
              <InlineMath>{'bc = 0'}</InlineMath>, and
              <InlineMath>{'bd = 1/\\sqrt{2}'}</InlineMath> simultaneously.
            </p>
            <p className="mt-3">
              Those constraints are inconsistent, because the middle two equations force one of the
              factors to vanish in a way that breaks the first or last equation. The state is therefore entangled.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Entanglement does not mean faster-than-light signaling. It means the joint state has
            correlations that cannot be reduced to two independent local state descriptions.
          </RemarkBox>
        </div>
      </section>

      <section id="multiqubit-born-rule" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Reading amplitudes and probabilities in a two-qubit state</h2>
        <p className="section-sub">
          Once the basis labels are clear, the Born rule works exactly as before: each basis state has
          an amplitude, and its measurement probability is the squared magnitude of that amplitude.
        </p>

        <DefinitionBox term="Two-Qubit Born Rule">
          For a state
          <InlineMath>{'|\\psi\\rangle = \\sum_{ij} \\alpha_{ij}|ij\\rangle'}</InlineMath>, the probability
          of observing the basis outcome <InlineMath>{'|ij\\rangle'}</InlineMath> is
          <InlineMath>{'|\\alpha_{ij}|^2'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="P(|01⟩) = |α01|²">
            The normalization condition remains the same in spirit:
            <InlineMath>{'|\\alpha_{00}|^2 + |\\alpha_{01}|^2 + |\\alpha_{10}|^2 + |\\alpha_{11}|^2 = 1'}</InlineMath>.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Equal-Amplitude State">
            <MathDisplay>{'|\\psi\\rangle = \\tfrac{1}{2}(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle)'}</MathDisplay>
            <p>
              Each basis amplitude has magnitude <InlineMath>{'1/2'}</InlineMath>, so each basis outcome
              has probability <InlineMath>{'1/4'}</InlineMath>. This is the two-qubit analogue of an equal
              superposition over all computational-basis states.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Open the Amplitude Reader" label="Optional Interactive">
            <p className="mb-4">
              Use this reader to inspect a few common two-qubit states and verify how amplitude entries
              convert into measurement probabilities.
            </p>
            <AmplitudeReaderVisual />
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The full state vector is still not directly observable in one shot. In practice, amplitudes
            are inferred indirectly from repeated experiments, modeling assumptions, or tomography procedures.
          </RemarkBox>
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Assuming two qubits only require twice as much information as one qubit.',
              clarification:
                'A two-qubit pure state requires four amplitudes, not two, because the state space dimension multiplies.',
            },
            {
              mistake: 'Treating every two-qubit state as a simple tensor product of one-qubit states.',
              clarification:
                'Only separable states factor that way. Entangled states require a genuinely joint description.',
            },
            {
              mistake: 'Reading the basis label |10⟩ as an unordered pair rather than a positional string.',
              clarification:
                'The left and right qubit positions matter. Swapping them changes the state label and often the physical meaning.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'An n-qubit pure state uses 2^n amplitudes, which is why composite-system descriptions grow exponentially.',
            'The two-qubit computational basis consists of four ordered basis states: |00⟩, |01⟩, |10⟩, and |11⟩.',
            'Tensor products describe independent subsystems; entanglement begins when factorization becomes impossible.',
            'Measurement probabilities still come from amplitude magnitudes squared, one basis outcome at a time.',
          ]}
        />
      </div>

      <section id="multiqubit-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Continue into entanglement directly</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next chapter takes the factorization failure from this page and treats it as the main
          subject. That is where Bell states, correlation structure, and the nonclassical character of
          composite systems are developed in full.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/entanglement" className="btn-primary">
            Continue to Entanglement
          </Link>
          <Link to="/gates" className="btn-secondary">
            Review Single-Qubit Gates
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Review the Glossary
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
