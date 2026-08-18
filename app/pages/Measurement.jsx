import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
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
import VideoAside from '../../components/VideoAside'
import GlossaryTooltip from '../../components/GlossaryTooltip'
import MentorNote from '../../components/MentorNote'
import CodeFillBlank from '../../components/CodeFillBlank'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const MEASUREMENT_OUTLINE = [
  { id: 'measurement-basis', label: 'The computational (Z) basis' },
  { id: 'measurement-bases', label: 'Measuring in different bases' },
  { id: 'measurement-why', label: 'Why basis matters' },
  { id: 'measurement-probability', label: 'Probability from amplitudes' },
  { id: 'measurement-change', label: 'Changing basis with Hadamard' },
  { id: 'measurement-mistakes', label: 'Common mistakes' },
  { id: 'measurement-next', label: 'Next steps' },
]

function MeasurementSupport() {
  return (
    <>
      <RailCard label="Key Formulas" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-amber-300">P(|0&#x27E9;) = |&alpha;|&sup2;</span>, <span className="font-mono text-amber-300">P(|1&#x27E9;) = |&beta;|&sup2;</span>: the Born rule.</li>
          <li><span className="font-mono text-amber-300">H|0&#x27E9; = |+&#x27E9;</span>, <span className="font-mono text-amber-300">H|+&#x27E9; = |0&#x27E9;</span>: Hadamard swaps the Z and X bases.</li>
          <li><span className="font-mono text-amber-300">|+&#x27E9;, |&minus;&#x27E9;</span>: the X-basis states, indistinguishable from each other in Z.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="Basis-Dependence Traps">
        <ul className="space-y-2">
          <li>A basis is a question you choose to ask, not a property fixed by the qubit itself.</li>
          <li>Relative phase is invisible in a basis that cannot distinguish it &mdash; that does not mean the phase is absent.</li>
          <li>Measurement is the one circuit operation that cannot be undone.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/projects/algorithm-showdown" className="btn-secondary justify-center">Open Algorithm Showdown</Link>
          <Link to="/circuits" className="btn-ghost justify-center">Review Quantum Circuits</Link>
        </div>
      </RailCard>
    </>
  )
}

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function ComputationalBasisVisual() {
  const [measured, setMeasured] = useState(false)
  const [result, setResult] = useState(null)

  const alpha = 0.6
  const beta = 0.8
  const p0 = alpha * alpha
  const p1 = beta * beta

  function measure() {
    setResult(Math.random() < p0 ? 0 : 1)
    setMeasured(true)
  }

  return (
    <div className="rounded-2xl border border-amber-800/40 bg-amber-950/15 p-5 text-center">
      <p className="section-label text-amber-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Z-Basis Measurement</h3>

      <div className="mt-4 bg-slate-900/60 rounded-xl p-4 font-mono text-base sm:text-lg">
        <span className="text-amber-300">|&psi;&#x27E9; = 0.6|0&#x27E9; + 0.8|1&#x27E9;</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 max-w-xs mx-auto">
        <div className="bg-slate-900 rounded-xl p-3 text-center">
          <div className="text-amber-300 font-mono text-sm mb-1">|0&#x27E9;</div>
          <div className="text-white font-bold text-xl">{(p0 * 100).toFixed(0)}%</div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500/70 rounded-full" style={{ width: `${p0 * 100}%` }} />
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 text-center">
          <div className="text-amber-300 font-mono text-sm mb-1">|1&#x27E9;</div>
          <div className="text-white font-bold text-xl">{(p1 * 100).toFixed(0)}%</div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500/70 rounded-full" style={{ width: `${p1 * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        {!measured ? (
          <button onClick={measure} className="btn-primary text-sm" aria-label="Measure the qubit in the Z basis">
            Measure in Z basis
          </button>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                            bg-amber-900/30 border border-amber-700/40 text-amber-300">
              Collapsed to |{result}&#x27E9;
            </div>
            <button
              onClick={() => { setMeasured(false); setResult(null) }}
              className="block mx-auto mt-3 text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 rounded"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-4">
        {measured
          ? `The qubit collapsed to |${result}⟩. The superposition is gone, and the original amplitudes cannot be recovered from it.`
          : 'P(0) = |0.6|² = 36%. P(1) = |0.8|² = 64%.'}
      </p>
    </div>
  )
}

function BasisComparisonVisual() {
  const [basis, setBasis] = useState('Z')

  const zData = [
    { label: '|0⟩', prob: 50 },
    { label: '|1⟩', prob: 50 },
  ]
  const xData = [
    { label: '|+⟩', prob: 100 },
    { label: '|−⟩', prob: 0 },
  ]

  const data = basis === 'Z' ? zData : xData

  return (
    <div className="rounded-2xl border border-amber-800/40 bg-amber-950/15 p-5">
      <p className="section-label text-amber-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Same State, Different Measurement Basis</h3>

      <div className="mt-4 bg-slate-900/60 rounded-xl p-3 font-mono text-center text-amber-300 text-sm sm:text-base">
        |+&#x27E9; = (|0&#x27E9; + |1&#x27E9;)/&radic;2
      </div>

      <div className="mt-4 flex gap-2 justify-center">
        {['Z', 'X'].map(b => (
          <button
            key={b}
            onClick={() => setBasis(b)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${basis === b
                ? 'bg-amber-900/40 border-amber-500/60 text-amber-300 focus-visible:outline-amber-400'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`Measure in ${b} basis`}
          >
            {b} basis
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={basis}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-5"
        >
          <div className="space-y-3 max-w-sm mx-auto">
            {data.map(d => (
              <div key={d.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-mono">{d.label}</span>
                  <span className="text-slate-400">{d.prob}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500/70 rounded-full transition-all duration-300"
                    style={{ width: `${d.prob}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-4 text-slate-500">
            {basis === 'Z'
              ? 'Z basis: |+⟩ has equal amplitudes for |0⟩ and |1⟩ — 50/50.'
              : 'X basis: |+⟩ is itself a basis state — 100% probability.'}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function WhyBasisMattersVisual() {
  const scenarios = [
    {
      state: '|0⟩',
      zResult: '100% |0⟩',
      xResult: '50/50 |+⟩ or |−⟩',
      insight: 'The Z basis gives certainty. The X basis gives randomness.',
    },
    {
      state: '|+⟩',
      zResult: '50/50 |0⟩ or |1⟩',
      xResult: '100% |+⟩',
      insight: 'The X basis gives certainty. The Z basis gives randomness.',
    },
    {
      state: '|−⟩',
      zResult: '50/50 |0⟩ or |1⟩',
      xResult: '100% |−⟩',
      insight: '|+⟩ and |−⟩ look identical in Z. Only X tells them apart.',
    },
  ]

  return (
    <div className="rounded-2xl border border-amber-800/40 bg-amber-950/15 p-5">
      <p className="section-label text-amber-400">Comparison Table</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Three States, Two Bases</h3>
      <div className="mt-4 space-y-3">
        {scenarios.map((s) => (
          <div key={s.state} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-amber-900/40 border border-amber-700/50
                               text-amber-300 font-mono text-sm font-bold">{s.state}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">Z basis</p>
                <p className="text-sm text-slate-300 font-mono">{s.zResult}</p>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">X basis</p>
                <p className="text-sm text-slate-300 font-mono">{s.xResult}</p>
              </div>
            </div>
            <p className="text-xs text-amber-400">{s.insight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProbabilityVisual() {
  const [alpha, setAlpha] = useState(0.6)
  const beta = Math.sqrt(Math.max(0, 1 - alpha * alpha))
  const p0 = (alpha * alpha * 100).toFixed(1)
  const p1 = (beta * beta * 100).toFixed(1)

  return (
    <div className="rounded-2xl border border-amber-800/40 bg-amber-950/15 p-5">
      <p className="section-label text-amber-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Born Rule Explorer</h3>
      <p className="mt-2 text-sm text-slate-400">
        Drag to set &alpha;. The probability of each outcome is the squared amplitude.
      </p>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>&alpha; = {alpha.toFixed(3)}</span>
          <span>&beta; = {beta.toFixed(3)}</span>
        </div>
        <input type="range" min="0" max="1" step="0.001" value={alpha}
          onChange={e => setAlpha(parseFloat(e.target.value))}
          className="w-full accent-amber-500"
          aria-label={`Alpha amplitude: ${alpha.toFixed(3)}`} />
      </div>

      <div className="mt-4 bg-slate-900/60 rounded-xl p-4 font-mono text-center text-sm">
        <span className="text-amber-300">|&psi;&#x27E9; = {alpha.toFixed(3)}</span>
        <span className="text-slate-500"> |0&#x27E9; + </span>
        <span className="text-amber-300">{beta.toFixed(3)}</span>
        <span className="text-slate-500"> |1&#x27E9;</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { pct: p0, label: 'P(|0⟩) = |α|²' },
          { pct: p1, label: 'P(|1⟩) = |β|²' },
        ].map(({ pct, label }) => (
          <div key={label} className="bg-amber-950/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-300">{pct}%</div>
            <div className="text-xs text-slate-500 mt-0.5 font-mono">{label}</div>
            <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-300"
                   style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center mt-3">
        Sum: {(parseFloat(p0) + parseFloat(p1)).toFixed(1)}% (always 100%)
      </p>
    </div>
  )
}

function NegativeAmplitudePredictReveal() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Predict Before You Reveal</p>
      <h3 className="mt-3 text-lg font-semibold text-white">A Negative Amplitude</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        A qubit is in the state <InlineMath>{'|\\psi\\rangle = -\\tfrac{3}{5}|0\\rangle + \\tfrac{4}{5}|1\\rangle'}</InlineMath>{' '}
        (a valid, normalized state, since <InlineMath>{'(-3/5)^2 + (4/5)^2 = 1'}</InlineMath>). Before
        revealing, predict P(0) and P(1).
      </p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="btn-secondary mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Reveal Probabilities
        </button>
      ) : (
        <div className="mt-4 rounded-xl border border-amber-800/40 bg-amber-950/20 p-4 text-sm text-slate-300 leading-relaxed">
          <InlineMath>{'P(0) = (-3/5)^2 = 9/25 = 0.36'}</InlineMath>, and{' '}
          <InlineMath>{'P(1) = (4/5)^2 = 16/25 = 0.64'}</InlineMath>. The negative sign on the first
          amplitude does not carry over — it disappears entirely once you square, and the result is never
          negative.
        </div>
      )}
    </div>
  )
}

function BasisChangeVisual() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      label: 'Start: |−⟩',
      state: '|−⟩ = (|0⟩ − |1⟩)/√2',
      desc: 'In the Z basis, this gives 50/50 — indistinguishable from |+⟩.',
      zProbs: [50, 50],
    },
    {
      label: 'Apply H',
      state: 'H|−⟩ = |1⟩',
      desc: 'The Hadamard transforms |−⟩ into |1⟩. The phase information is now visible in the Z basis.',
      zProbs: [0, 100],
    },
    {
      label: 'Measure in Z',
      state: 'Result: |1⟩ with 100% certainty',
      desc: 'Applying H first is equivalent to measuring the original state in the X basis directly.',
      zProbs: [0, 100],
    },
  ]

  const s = steps[step]
  const basisLabels = ['|0⟩', '|1⟩']

  return (
    <div className="rounded-2xl border border-amber-800/40 bg-amber-950/15 p-5">
      <p className="section-label text-amber-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Basis Change via Hadamard</h3>

      <div className="mt-4 flex justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === step
                ? 'w-6 bg-amber-500'
                : i < step
                  ? 'w-3 bg-amber-700'
                  : 'w-3 bg-slate-700'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center mt-4"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
          <p className="font-mono text-amber-300 text-lg sm:text-xl font-semibold mb-1">{s.state}</p>
          <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 bg-slate-900/60 rounded-xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium text-center">
          Z-basis probabilities after this step
        </p>
        <div className="space-y-2 max-w-sm mx-auto">
          {basisLabels.map((label, i) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">{label}</span>
                <span className="text-slate-400">{s.zProbs[i]}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500/70 rounded-full transition-all duration-300"
                  style={{ width: `${s.zProbs[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => setStep(c => c - 1)}
          disabled={step === 0}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-slate-800 text-slate-300 hover:bg-slate-700
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400
                     disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          &larr; Previous
        </button>
        <button
          onClick={() => setStep(c => c + 1)}
          disabled={step === steps.length - 1}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-colors
                     bg-amber-800/60 text-amber-300 hover:bg-amber-700/60
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400
                     disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next step"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Measurement() {
  return (
    <ModuleLayout
      moduleId="measurement"
      title="Measurement & Basis"
      subtitle="How you look changes what you get — measurement outcomes depend on the state, the Born rule, and the basis you choose to measure in."
      prev={{ to: '/circuits', label: 'Module 9: Quantum Circuits' }}
      next={{ to: '/algorithms', label: 'Module 11: Core Algorithms' }}
      outline={MEASUREMENT_OUTLINE}
      aside={<MeasurementSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          <GlossaryTooltip term="Measurement"><Keyword tone="measurement">Measurement</Keyword></GlossaryTooltip>{' '}
          converts a quantum state into a single classical outcome. Which outcomes are possible, and how likely
          each one is, depends on two things: the state itself, and the{' '}
          <GlossaryTooltip term="Basis"><Keyword tone="basis">basis</Keyword></GlossaryTooltip> chosen to measure
          it in.
        </p>
        <p>
          This chapter makes both dependencies precise. It states the Born rule that converts{' '}
          <Keyword tone="amplitude">amplitudes</Keyword> into probabilities, shows why the same state can give
          completely different results in different bases, and explains how a single gate &mdash; the Hadamard
          &mdash; lets a circuit effectively choose which basis it measures in.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with the computational basis states |0⟩ and |1⟩, and with superposition.',
            'Familiarity with reading circuit diagrams and the Hadamard gate.',
            'Basic bra-ket notation for writing a one-qubit state as α|0⟩ + β|1⟩.',
          ]}
        >
          If circuit notation still feels unfamiliar, review{' '}
          <Link to="/circuits" className="text-amber-400 transition-colors hover:text-amber-300">
            Quantum Circuits
          </Link>{' '}
          before treating measurement as the final step of a circuit.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>State the Born rule and compute outcome probabilities from amplitudes.</li>
            <li>Explain why the same state gives different results in different measurement bases.</li>
            <li>Explain why relative phase is invisible in the Z basis but visible in the X basis.</li>
            <li>Use a Hadamard gate to change which basis a circuit effectively measures in.</li>
          </ul>
        </div>
      </div>

      <section id="measurement-basis" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">The computational (Z) basis</h2>
        <p className="section-sub">
          Every real quantum computer measures in one default basis. Understanding it first makes every other
          basis easier to describe, since they are all reached by rotating into this one.
        </p>

        <DefinitionBox term="Computational (Z) Basis">
          The <Keyword tone="basis">computational basis</Keyword>, also called the Z basis, has two outcomes,{' '}
          <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>. It is the basis
          that quantum hardware measures in directly &mdash; every other basis is measured by first rotating the
          state, then measuring in Z.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="P(|0⟩) = |α|²    P(|1⟩) = |β|²    |α|² + |β|² = 1">
            For a state <InlineMath>{'|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle'}</InlineMath>, this is
            the <Keyword tone="unitary">Born rule</Keyword>: square each amplitude to get the probability of that
            outcome. The two probabilities always sum to one.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ComputationalBasisVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Applying the Born Rule">
            <MathDisplay>{'|\\psi\\rangle = 0.6|0\\rangle + 0.8|1\\rangle'}</MathDisplay>
            <p>
              <InlineMath>{'P(0) = |0.6|^2 = 0.36'}</InlineMath> and{' '}
              <InlineMath>{'P(1) = |0.8|^2 = 0.64'}</InlineMath>. The two probabilities sum to{' '}
              <InlineMath>{'1'}</InlineMath>, as required for any normalized state.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Measurement is not a gentle read of the state &mdash; it is destructive.
            <Keyword tone="measurement"> Collapse</Keyword> replaces the superposition with the single outcome
            observed, and the original amplitudes cannot be recovered from the qubit afterward.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <VideoAside
            title="Qubits and Quantum States, Quantum Circuits, Measurements — Part 2"
            description="A Qiskit lecture on measurement, continuing directly from the state/circuit formalism — a more formal companion to this section."
            source="Qiskit"
            videoId="SlZoTjkPy7o"
          />
        </div>
      </section>

      <section id="measurement-bases" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Measuring in different bases</h2>
        <p className="section-sub">
          The Z basis is the default, not the only option. Choosing a different basis means asking a different
          question of the same state &mdash; and the same state can answer differently depending on which
          question is asked.
        </p>

        <DefinitionBox term="Measurement Basis">
          A <Keyword tone="basis">measurement basis</Keyword> is a choice of two orthogonal reference states to
          measure against. The X basis uses <InlineMath>{'|+\\rangle = \\tfrac{|0\\rangle + |1\\rangle}{\\sqrt{2}}'}</InlineMath>{' '}
          and <InlineMath>{'|-\\rangle = \\tfrac{|0\\rangle - |1\\rangle}{\\sqrt{2}}'}</InlineMath> in place of{' '}
          <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-6">
          <BasisComparisonVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: One State, Two Bases">
            <p>
              <InlineMath>{'|+\\rangle'}</InlineMath> and <InlineMath>{'|-\\rangle'}</InlineMath> look identical
              when measured in the Z basis &mdash; both give 50/50. Only the X basis distinguishes them:{' '}
              <InlineMath>{'|+\\rangle'}</InlineMath> gives <InlineMath>{'|+\\rangle'}</InlineMath> with certainty,
              and <InlineMath>{'|-\\rangle'}</InlineMath> gives <InlineMath>{'|-\\rangle'}</InlineMath> with
              certainty. Choosing the right basis is what makes the difference visible.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: why this matters for quantum key distribution" label="Applied Aside">
            <p>
              In the BB84 quantum key distribution protocol, Alice randomly prepares qubits in either the Z or X
              basis and Bob randomly measures in Z or X. When their bases happen to match, their results are
              correlated. When the bases do not match, the results are random.
            </p>
            <p className="mt-3">
              An eavesdropper who measures in the wrong basis unavoidably disturbs the state, which Alice and Bob
              can detect by comparing a subset of their results afterward. The security of the protocol rests
              directly on the basis-dependence covered in this section.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The Z basis asks "are you <InlineMath>{'|0\\rangle'}</InlineMath> or{' '}
            <InlineMath>{'|1\\rangle'}</InlineMath>?" The X basis asks a different question entirely. Neither
            question is more correct &mdash; they extract different information from the same state.
          </RemarkBox>
        </div>
      </section>

      <section id="measurement-why" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Why basis matters</h2>
        <p className="section-sub">
          The practical stakes of choosing a basis become clear once <Keyword tone="phase">phase</Keyword> enters
          the picture: some information is only visible in the right basis, and invisible in every other one.
        </p>

        <DefinitionBox term="Relative Phase and Basis-Dependence">
          <InlineMath>{'|+\\rangle'}</InlineMath> and <InlineMath>{'|-\\rangle'}</InlineMath> differ only in{' '}
          <Keyword tone="phase">relative phase</Keyword> &mdash; a sign on the{' '}
          <InlineMath>{'|1\\rangle'}</InlineMath> amplitude. The Z basis cannot detect that sign; the X basis can.
        </DefinitionBox>

        <div className="mt-6">
          <WhyBasisMattersVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: The Phase-Detection Trick">
            <p>
              A Z gate turns <InlineMath>{'|+\\rangle'}</InlineMath> into <InlineMath>{'|-\\rangle'}</InlineMath>.
              Measured directly in the Z basis, both give 50/50 &mdash; the difference is invisible. Apply an H
              gate first, then measure in Z, and the two cases separate completely: 100%{' '}
              <InlineMath>{'|0\\rangle'}</InlineMath> versus 100% <InlineMath>{'|1\\rangle'}</InlineMath>. The
              phase has been made measurable.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Quantum algorithms routinely choose a specific measurement basis for exactly this reason: to turn a
            phase difference that a naive Z-basis measurement would miss into a directly observable probability.
            The next module builds on this idea directly.
          </RemarkBox>
        </div>
      </section>

      <section id="measurement-probability" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Probability from amplitudes</h2>
        <p className="section-sub">
          The Born rule from Section 1 generalizes to any basis and any number of qubits. It is the single
          equation connecting the mathematical state vector to observable experimental results.
        </p>

        <DefinitionBox term="Born Rule">
          For a normalized state, the probability of a given outcome is the squared magnitude of its amplitude:{' '}
          <InlineMath>{'P(\\text{outcome}) = |\\text{amplitude}|^2'}</InlineMath>. Amplitudes may be negative or
          complex; probabilities are always real and non-negative.
        </DefinitionBox>

        <div className="mt-6">
          <ProbabilityVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Unequal Amplitudes">
            <MathDisplay>
              {'|\\psi\\rangle = \\frac{1}{\\sqrt{3}}|0\\rangle + \\sqrt{\\frac{2}{3}}|1\\rangle \\quad \\Rightarrow \\quad P(0) = \\frac{1}{3},\\; P(1) = \\frac{2}{3}'}
            </MathDisplay>
            <p>
              Squaring each amplitude gives <InlineMath>{'(1/\\sqrt{3})^2 = 1/3'}</InlineMath> and{' '}
              <InlineMath>{'(\\sqrt{2/3})^2 = 2/3'}</InlineMath>, which sum to <InlineMath>{'1'}</InlineMath> as
              required.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: probabilities for complex amplitudes" label="Mathematical Aside">
            <p>
              For a complex amplitude <InlineMath>{'\\alpha'}</InlineMath>, <InlineMath>{'|\\alpha|^2'}</InlineMath>{' '}
              means <InlineMath>{'\\alpha \\cdot \\alpha^*'}</InlineMath> &mdash; multiplying by the complex
              conjugate. For example, if <InlineMath>{'\\alpha = (1+i)/2'}</InlineMath>, then{' '}
              <InlineMath>{'|\\alpha|^2 = \\tfrac{1+i}{2} \\cdot \\tfrac{1-i}{2} = \\tfrac{1+1}{4} = \\tfrac{1}{2}'}</InlineMath>.
            </p>
            <p className="mt-3">
              The Born rule is a postulate of quantum mechanics, not a consequence of more basic principles. It is
              the bridge between the mathematical state vector and what an experiment actually reports.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Negative or complex amplitudes are not themselves probabilities and never need to be interpreted as
            one. Only the squared magnitude, after normalization, plays the role of a probability.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <MentorNote>
            A negative amplitude does not mean a negative probability — probabilities can never be
            negative. Squaring late is the usual failure mode: writing down "P(0) = -0.6" is always wrong,
            because no valid probability is negative, regardless of what the amplitude looked like.
          </MentorNote>
        </div>

        <div className="mt-6">
          <NegativeAmplitudePredictReveal />
        </div>
      </section>

      <section id="measurement-change" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Changing basis with the Hadamard gate</h2>
        <p className="section-sub">
          Real hardware only measures in the Z basis directly. Every other basis is reached the same way: rotate
          first with a gate, then measure in Z.
        </p>

        <DefinitionBox term="Basis Change via a Unitary">
          Applying a <Keyword tone="unitary">unitary</Keyword> gate before measuring in Z is equivalent to
          measuring the original state in a different basis. The Hadamard gate specifically swaps the Z and X
          bases: <InlineMath>{'H|0\\rangle = |+\\rangle'}</InlineMath> and{' '}
          <InlineMath>{'H|+\\rangle = |0\\rangle'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="H|+⟩ = |0⟩    H|−⟩ = |1⟩">
            Applying H before a Z-basis measurement converts X-basis states into Z-basis states, making a
            previously invisible phase difference directly measurable.
          </NotationBox>
        </div>

        <div className="mt-6">
          <BasisChangeVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Recovering Which State You Had">
            <MathDisplay>{'H|+\\rangle = |0\\rangle \\qquad H|-\\rangle = |1\\rangle'}</MathDisplay>
            <p>
              To "measure in X," apply H and then measure in Z: an outcome of{' '}
              <InlineMath>{'|0\\rangle'}</InlineMath> means the original state was{' '}
              <InlineMath>{'|+\\rangle'}</InlineMath>, and <InlineMath>{'|1\\rangle'}</InlineMath> means it was{' '}
              <InlineMath>{'|-\\rangle'}</InlineMath> &mdash; with certainty, not just on average.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: measuring in an arbitrary basis" label="Extension">
            <p>
              More generally, any unitary <InlineMath>{'U'}</InlineMath> applied before measurement changes the
              effective measurement basis: measuring <InlineMath>{'U|\\psi\\rangle'}</InlineMath> in the Z basis
              is equivalent to measuring <InlineMath>{'|\\psi\\rangle'}</InlineMath> in the basis defined by{' '}
              <InlineMath>{'U^\\dagger'}</InlineMath>.
            </p>
            <p className="mt-3">
              For the Y basis, apply <InlineMath>{'S^\\dagger H'}</InlineMath> before measuring. For an arbitrary
              basis defined by states <InlineMath>{'|a\\rangle'}</InlineMath> and{' '}
              <InlineMath>{'|b\\rangle'}</InlineMath>, find the unitary that maps{' '}
              <InlineMath>{'|a\\rangle \\to |0\\rangle'}</InlineMath> and{' '}
              <InlineMath>{'|b\\rangle \\to |1\\rangle'}</InlineMath>, then apply it before measuring.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This gate-then-measure pattern is exactly how algorithms such as Deutsch&ndash;Jozsa extract
            phase-encoded information at their final step &mdash; a preview of the next module.
          </RemarkBox>
        </div>
      </section>

      <section id="measurement-mistakes" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 6</p>
        <h2 className="section-heading">Common mistakes</h2>
        <p className="section-sub">
          Most confusion about measurement comes from treating the basis as fixed by the qubit, rather than as a
          choice made by whoever is measuring it.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Treating the measurement basis as a fixed property of the qubit.',
              clarification:
                'The basis is a choice made by the experimenter, implemented by which gates are applied before the hardware\'s native Z-basis measurement. The same qubit can be measured in many different bases.',
            },
            {
              mistake: 'Assuming |+⟩ and |−⟩ are indistinguishable in general.',
              clarification:
                'They are indistinguishable only in the Z basis, where relative phase is invisible. The X basis tells them apart with certainty.',
            },
            {
              mistake: 'Expecting to recover the original amplitudes after measuring.',
              clarification:
                'Measurement is irreversible: it collapses the state to the observed outcome, and the pre-measurement amplitudes are gone, not merely hidden.',
            },
            {
              mistake: 'Reading a negative or complex amplitude as a negative probability.',
              clarification:
                'Amplitudes are not probabilities. A probability only appears after squaring the amplitude\'s magnitude, which is always real and non-negative.',
            },
          ]}
        />
      </section>

      <div className="mt-10">
        <CodeFillBlank
          title="Effectively Measure in the X Basis"
          prompt="Real hardware only measures in the Z basis directly. Which line, placed right before the measurement, converts this into an effective X-basis measurement?"
          before={['qc = QuantumCircuit(1, 1)', '# qubit prepared in |+⟩ or |-⟩']}
          choices={['qc.h(0)', 'qc.x(0)', 'qc.z(0)', 'qc.s(0)']}
          correctIndex={0}
          after={['qc.measure(0, 0)']}
          explanation="qc.h(0) rotates the X-basis states |+⟩/|-⟩ into the Z-basis states |0⟩/|1⟩, so the Z-basis measurement that follows now reports which X-basis state you actually had — the same H-then-measure trick from Section 5. qc.x(0), qc.z(0), and qc.s(0) all leave the qubit in a basis where |+⟩ and |-⟩ still can't be told apart by a plain Z measurement."
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'The Born rule converts amplitudes to probabilities: P = |amplitude|², and outcomes in any one basis sum to 1.',
            'Measurement collapses a superposition to a single basis state and destroys the information needed to recover the original amplitudes.',
            'The same quantum state can give completely different outcome distributions depending on which basis it is measured in.',
            'Relative phase is invisible to a measurement in a basis that cannot distinguish it — that is why |+⟩ and |−⟩ look identical in the Z basis.',
            'Applying a unitary such as the Hadamard gate before measuring in Z is equivalent to measuring in a different basis, such as X.',
          ]}
        />
      </div>

      <section id="measurement-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">From measurement to algorithmic advantage</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next module shows how algorithms like Deutsch&ndash;Jozsa and Grover's search use exactly this
          gate-then-measure pattern &mdash; choosing a basis deliberately so that a useful answer becomes visible
          in far fewer steps than any classical approach.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/algorithms" className="btn-primary">
            Continue to Core Algorithms
          </Link>
          <Link to="/projects/algorithm-showdown" className="btn-secondary">
            Try Algorithm Showdown
          </Link>
          <Link to="/references" className="btn-secondary">
            Open References
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
