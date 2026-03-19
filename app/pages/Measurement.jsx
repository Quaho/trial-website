import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import GlossaryTooltip from '../../components/GlossaryTooltip'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'
import { useProgress } from '../../lib/hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../../lib/data/modules'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function ComputationalBasisVisual() {
  const [measured, setMeasured] = useState(false)
  const [result, setResult] = useState(null)

  // State: (0.6|0⟩ + 0.8|1⟩)
  const alpha = 0.6
  const beta = 0.8
  const p0 = alpha * alpha
  const p1 = beta * beta

  function measure() {
    setResult(Math.random() < p0 ? 0 : 1)
    setMeasured(true)
  }

  return (
    <div className="card border-amber-800/30 my-6 text-center">
      <p className="text-xs text-amber-400 uppercase tracking-wider mb-4">
        Z-basis measurement
      </p>

      <div className="bg-slate-900/60 rounded-xl p-4 mb-5 font-mono text-base sm:text-lg">
        <span className="text-amber-300">|ψ⟩ = 0.6|0⟩ + 0.8|1⟩</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5 max-w-xs mx-auto">
        <div className="bg-slate-900 rounded-xl p-3 text-center">
          <div className="text-amber-300 font-mono text-sm mb-1">|0⟩</div>
          <div className="text-white font-bold text-xl">{(p0 * 100).toFixed(0)}%</div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500/70 rounded-full" style={{ width: `${p0 * 100}%` }} />
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 text-center">
          <div className="text-amber-300 font-mono text-sm mb-1">|1⟩</div>
          <div className="text-white font-bold text-xl">{(p1 * 100).toFixed(0)}%</div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500/70 rounded-full" style={{ width: `${p1 * 100}%` }} />
          </div>
        </div>
      </div>

      {!measured ? (
        <button onClick={measure} className="btn-primary text-sm" aria-label="Measure the qubit in the Z basis">
          Measure in Z basis
        </button>
      ) : (
        <div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            ${result === 0
              ? 'bg-amber-900/30 border border-amber-700/40 text-amber-300'
              : 'bg-amber-900/30 border border-amber-700/40 text-amber-300'}`}>
            Collapsed to |{result}⟩
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

      <p className="text-xs text-slate-500 mt-4">
        {measured
          ? `The qubit collapsed to |${result}⟩. Superposition is gone.`
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
  const stateLabel = '|+⟩ = (|0⟩ + |1⟩)/√2'

  return (
    <div className="card border-amber-800/30 my-6">
      <p className="text-xs text-amber-400 uppercase tracking-wider mb-4 text-center">
        Same state, different measurement basis
      </p>

      <div className="bg-slate-900/60 rounded-xl p-3 font-mono text-center text-amber-300 text-sm sm:text-base mb-5">
        {stateLabel}
      </div>

      <div className="flex gap-2 justify-center mb-5">
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
              : 'X basis: |+⟩ IS a basis state — 100% probability!'}
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
      insight: 'Z basis gives certainty. X basis gives randomness.',
    },
    {
      state: '|+⟩',
      zResult: '50/50 |0⟩ or |1⟩',
      xResult: '100% |+⟩',
      insight: 'X basis gives certainty. Z basis gives randomness.',
    },
    {
      state: '|−⟩',
      zResult: '50/50 |0⟩ or |1⟩',
      xResult: '100% |−⟩',
      insight: '|+⟩ and |−⟩ look identical in Z. Only X tells them apart.',
    },
  ]

  return (
    <div className="space-y-3 my-6">
      {scenarios.map((s, i) => (
        <div key={i} className="card border-amber-800/30">
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
  )
}

function ProbabilityVisual() {
  const [alpha, setAlpha] = useState(0.6)
  const beta = Math.sqrt(Math.max(0, 1 - alpha * alpha))
  const p0 = (alpha * alpha * 100).toFixed(1)
  const p1 = (beta * beta * 100).toFixed(1)

  return (
    <div className="card border-amber-800/30 my-6">
      <p className="text-sm font-semibold text-white mb-1">Born Rule Explorer</p>
      <p className="text-xs text-slate-400 mb-4">
        Drag to set α. The probability of each outcome is the squared amplitude.
      </p>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>α = {alpha.toFixed(3)}</span>
          <span>β = {beta.toFixed(3)}</span>
        </div>
        <input type="range" min="0" max="1" step="0.001" value={alpha}
          onChange={e => setAlpha(parseFloat(e.target.value))}
          className="w-full accent-amber-500"
          aria-label={`Alpha amplitude: ${alpha.toFixed(3)}`} />
      </div>

      <div className="bg-slate-900/60 rounded-xl p-4 font-mono text-center text-sm mb-4">
        <span className="text-amber-300">|ψ⟩ = {alpha.toFixed(3)}</span>
        <span className="text-slate-500"> |0⟩ + </span>
        <span className="text-amber-300">{beta.toFixed(3)}</span>
        <span className="text-slate-500"> |1⟩</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { pct: p0, label: 'P(|0⟩) = |α|²', color: 'amber' },
          { pct: p1, label: 'P(|1⟩) = |β|²', color: 'amber' },
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

function BasisChangeVisual() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      label: 'Start: |−⟩',
      state: '|−⟩ = (|0⟩ − |1⟩)/√2',
      desc: 'In the Z basis, this gives 50/50 — you can\'t tell |+⟩ from |−⟩.',
      zProbs: [50, 50],
    },
    {
      label: 'Apply H',
      state: 'H|−⟩ = |1⟩',
      desc: 'The Hadamard transforms |−⟩ into |1⟩. Now the phase information is in the Z basis!',
      zProbs: [0, 100],
    },
    {
      label: 'Measure in Z',
      state: 'Result: |1⟩ with 100% certainty',
      desc: 'By applying H first, we effectively measured in the X basis. We know it was |−⟩, not |+⟩.',
      zProbs: [0, 100],
    },
  ]

  const s = steps[step]
  const basisLabels = ['|0⟩', '|1⟩']

  return (
    <div className="card border-amber-800/30 my-6">
      <p className="text-xs text-amber-400 uppercase tracking-wider mb-4 text-center">
        Basis change via Hadamard
      </p>

      {/* Step dots */}
      <div className="flex justify-center gap-2 mb-4">
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
          className="text-center mb-4"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
          <p className="font-mono text-amber-300 text-lg sm:text-xl font-semibold mb-1">{s.state}</p>
          <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Probability bars */}
      <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium text-center">
          Z-basis probabilities after step
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

      <div className="flex justify-center gap-3">
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

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'The Computational Basis',
    hook: 'Every measurement asks a yes/no question — and the basis decides which question.',
    hookSub: 'The computational (Z) basis is the default — but it\'s not the only option.',
    visual: <ComputationalBasisVisual />,
    bullets: [
      <>
        The Z <GlossaryTooltip term="Basis">basis</GlossaryTooltip> has two outcomes: |0⟩ and |1⟩. This is
        the default in every quantum computer.
      </>,
      <>
        P(outcome) = |<GlossaryTooltip term="Amplitude">amplitude</GlossaryTooltip>|². Square the amplitude
        to get the probability.
      </>,
      <>
        After <GlossaryTooltip term="Measurement">measurement</GlossaryTooltip> the qubit collapses — the
        superposition is destroyed.
      </>,
    ],
    example: (
      <div>
        <MathDisplay>{'P(|0\\rangle) = |\\alpha|^2 \\qquad P(|1\\rangle) = |\\beta|^2 \\qquad |\\alpha|^2 + |\\beta|^2 = 1'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          The Born rule — probabilities always sum to 1.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The Z basis is called "computational" because quantum computers physically measure in this basis.
        To measure in any other basis, you first apply a gate to rotate the state, then measure in Z.
        The gate effectively changes the "question" you're asking.</p>
      </div>
    ),
    quiz: {
      question: 'If a qubit is in state 0.6|0⟩ + 0.8|1⟩, what is P(|0⟩)?',
      choices: ['60%', '36%', '80%', '64%'],
      correct: 1,
    },
  },
  {
    title: 'Measuring in Different Bases',
    hook: 'The same quantum state gives completely different results depending on which basis you measure in.',
    hookSub: 'Choosing a basis is choosing what information you extract.',
    visual: <BasisComparisonVisual />,
    bullets: [
      'Z basis: asks "are you |0⟩ or |1⟩?" — the default on all hardware.',
      'X basis: asks "are you |+⟩ or |−⟩?" — apply H before measuring in Z.',
      '|+⟩ gives 50/50 in Z but 100% |+⟩ in X. The basis reveals different information.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Key insight:</strong> |+⟩ = (|0⟩+|1⟩)/√2 and |−⟩ = (|0⟩−|1⟩)/√2
        look identical in the Z basis (both give 50/50). Only the X basis can tell them apart.
        This is why choosing the right measurement basis matters.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>In quantum key distribution (BB84), Alice randomly prepares qubits in either the Z or X basis.
        Bob randomly measures in Z or X. When their bases match, they get correlated results.
        When they don't match, the results are random — and an eavesdropper is detected.</p>
      </div>
    ),
    quiz: {
      question: 'What result does |+⟩ give when measured in the X basis?',
      choices: [
        '50% |+⟩, 50% |−⟩',
        '100% |+⟩',
        '100% |0⟩',
        '50% |0⟩, 50% |1⟩',
      ],
      correct: 1,
    },
  },
  {
    title: 'Why Basis Matters',
    hook: 'Phase is invisible in the Z basis — but completely visible in the X basis.',
    hookSub: 'Choosing the wrong basis means missing the answer entirely.',
    visual: <WhyBasisMattersVisual />,
    bullets: [
      '|0⟩ is certain in Z, random in X. |+⟩ is certain in X, random in Z.',
      <>
        |+⟩ and |−⟩ differ only in <GlossaryTooltip term="Phase">phase</GlossaryTooltip>. Z can&apos;t see
        phase — X can.
      </>,
      'Quantum algorithms choose measurement bases to extract exactly the information they need.',
    ],
    example: (
      <div className="card bg-amber-950/10 border-amber-800/30 text-sm text-slate-400">
        <p className="font-semibold text-white mb-1">The phase-detection trick</p>
        <p>The Z gate turns |+⟩ into |−⟩. In the Z basis, both give 50/50 — you'd never notice.
        Apply H first (measure in X basis) and you get 100% |+⟩ vs 100% |−⟩. Phase detected!</p>
      </div>
    ),
    quiz: {
      question: 'Can the Z basis distinguish |+⟩ from |−⟩?',
      choices: [
        'Yes — they give different probabilities',
        'No — both give 50% |0⟩ and 50% |1⟩',
        'Only with multiple measurements',
        'Only if you apply X first',
      ],
      correct: 1,
    },
  },
  {
    title: 'Probability from Amplitudes',
    hook: 'Square the amplitude, get the probability — that\'s the Born rule.',
    hookSub: 'The most important equation in quantum mechanics.',
    visual: <ProbabilityVisual />,
    bullets: [
      'P(outcome) = |amplitude|². This works for any basis, any number of qubits.',
      'Amplitudes can be negative or complex. Probabilities are always ≥ 0.',
      'All probabilities must sum to 1 — guaranteed by the normalization condition.',
    ],
    example: (
      <div>
        <MathDisplay>
          {'|\\psi\\rangle = \\frac{1}{\\sqrt{3}}|0\\rangle + \\sqrt{\\frac{2}{3}}|1\\rangle \\quad \\Rightarrow \\quad P(0) = \\frac{1}{3},\\; P(1) = \\frac{2}{3}'}
        </MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Square the amplitudes: (1/√3)² = 1/3 and (√(2/3))² = 2/3.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>For complex amplitudes, |α|² means α·α* (multiply by the complex conjugate).
        If α = (1+i)/2, then |α|² = ((1+i)/2)·((1−i)/2) = (1+1)/4 = 1/2.</p>
        <p>The Born rule is a postulate of quantum mechanics — it cannot be derived from
        more fundamental principles. It's the bridge between the mathematical state
        and what we observe in experiments.</p>
      </div>
    ),
    quiz: {
      question: 'If a qubit has amplitude 1/√3 for |0⟩, what is P(|0⟩)?',
      choices: ['1/√3 ≈ 57.7%', '1/3 ≈ 33.3%', '2/3 ≈ 66.7%', '1/9 ≈ 11.1%'],
      correct: 1,
    },
  },
  {
    title: 'Basis Change via Hadamard',
    hook: 'Apply H before measuring and you\'ve switched from the Z basis to the X basis.',
    hookSub: 'This one trick turns hidden phase information into measurable probabilities.',
    visual: <BasisChangeVisual />,
    bullets: [
      'H converts between Z and X bases: H|0⟩ = |+⟩, H|+⟩ = |0⟩.',
      'To "measure in X": apply H, then measure in Z. The H does the basis rotation.',
      'This is how algorithms like Deutsch-Jozsa extract phase information at the end.',
    ],
    example: (
      <div>
        <MathDisplay>
          {'H|+\\rangle = |0\\rangle \\qquad H|-\\rangle = |1\\rangle'}
        </MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          H converts X-basis states into Z-basis states — making phase differences measurable.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>More generally, any unitary U applied before measurement changes the measurement basis.
        Measuring U|ψ⟩ in the Z basis is equivalent to measuring |ψ⟩ in the U†Z basis.</p>
        <p>For the Y basis, apply S†H before measuring. For an arbitrary basis defined by
        states |a⟩ and |b⟩, find the unitary that maps |a⟩→|0⟩ and |b⟩→|1⟩, then apply it.</p>
      </div>
    ),
    quiz: {
      question: 'To measure a qubit in the X basis, what do you do?',
      choices: [
        'Measure directly — X is the default',
        'Apply X gate then measure',
        'Apply H gate then measure in the Z basis',
        'Apply Z gate then measure',
      ],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Measurement() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('measurement', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['measurement']) markDone('measurement')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('measurement', step)
  }

  return (
    <ModuleLayout
      moduleId="measurement"
      title="Measurement & Basis"
      subtitle="How you look changes what you get."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/circuits', label: 'Module 8: Quantum Circuits' }}
      next={{ to: '/algorithms', label: 'Module 10: Core Algorithms' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <LessonCard
            lesson={lesson}
            lessonIndex={step}
            totalLessons={LESSONS.length}
            isPassed={passed[step]}
            onPass={handleQuizPass}
            bulletStyle={MODULE_LAYOUT_STYLES.measurement.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 9 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 10 to explore core quantum algorithms.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <StepNav
        steps={LESSONS.length}
        current={step}
        passed={passed}
        onNext={() => setStep(s => s + 1)}
        onPrev={() => setStep(s => s - 1)}
        onGoto={setStep}
      />
    </ModuleLayout>
  )
}
