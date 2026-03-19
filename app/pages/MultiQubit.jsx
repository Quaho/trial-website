import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'
import { useProgress } from '../../lib/hooks/useProgress'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function QubitScalingVisual() {
  const data = [
    { n: 1, label: '2' },
    { n: 2, label: '4' },
    { n: 3, label: '8' },
    { n: 10, label: '1,024' },
    { n: 50, label: '10\u00B9\u2075+' },
  ]
  return (
    <div className="card my-6 bg-cyan-950/20 border-cyan-800/30">
      <p className="text-center text-sm text-cyan-300 font-mono mb-4">
        n qubits → 2ⁿ complex amplitudes
      </p>
      <div className="grid grid-cols-5 gap-2 text-center">
        {data.map(({ n, label }) => (
          <div key={n} className="bg-slate-900 rounded-xl p-3">
            <div className="text-cyan-400 font-bold text-xl">{n}</div>
            <div className="text-slate-600 text-xs mb-1">qubits</div>
            <div className="text-white font-mono text-xs">{label}</div>
            <div className="text-slate-600 text-xs">amplitudes</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BasisStatesVisual() {
  const states = [
    { ket: '|00⟩', qA: '0', qB: '0', vec: [1, 0, 0, 0] },
    { ket: '|01⟩', qA: '0', qB: '1', vec: [0, 1, 0, 0] },
    { ket: '|10⟩', qA: '1', qB: '0', vec: [0, 0, 1, 0] },
    { ket: '|11⟩', qA: '1', qB: '1', vec: [0, 0, 0, 1] },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      {states.map(({ ket, qA, qB, vec }) => (
        <div key={ket} className="card text-center bg-cyan-950/20 border-cyan-800/30">
          <div className="text-lg font-mono text-cyan-300 font-bold mb-2">{ket}</div>
          <p className="text-xs text-slate-400 mb-3">
            Qubit A = {qA}, Qubit B = {qB}
          </p>
          <div className="flex flex-col items-center gap-1">
            {vec.map((v, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono
                  ${v === 1
                    ? 'bg-cyan-900/60 border border-cyan-600 text-cyan-300'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-500'
                  }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TensorProductVisual() {
  const qStates = [
    { label: '|0⟩', amps: [1, 0] },
    { label: '|1⟩', amps: [0, 1] },
    { label: '|+⟩', amps: [0.707, 0.707] },
  ]
  const basisLabels = ['|00⟩', '|01⟩', '|10⟩', '|11⟩']

  const [leftIdx, setLeftIdx] = useState(0)
  const [rightIdx, setRightIdx] = useState(0)

  const left = qStates[leftIdx]
  const right = qStates[rightIdx]

  const result = [
    left.amps[0] * right.amps[0],
    left.amps[0] * right.amps[1],
    left.amps[1] * right.amps[0],
    left.amps[1] * right.amps[1],
  ]

  return (
    <div className="card my-6 bg-cyan-950/20 border-cyan-800/30">
      <p className="text-sm font-semibold text-white mb-1">Tensor product calculator</p>
      <p className="text-xs text-slate-400 mb-4">
        Pick two qubit states and see their combined two-qubit state.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-5">
        {/* Left qubit selector */}
        <div>
          <p className="text-xs text-slate-500 mb-1.5 text-center">Left qubit</p>
          <div className="flex gap-2">
            {qStates.map((s, i) => (
              <button
                key={i}
                onClick={() => setLeftIdx(i)}
                aria-label={`Select left qubit ${s.label}`}
                className={`px-3 py-1.5 rounded-full text-sm font-mono font-medium transition-colors
                  ${leftIdx === i
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <span className="text-cyan-400 font-bold text-lg hidden sm:block">⊗</span>

        {/* Right qubit selector */}
        <div>
          <p className="text-xs text-slate-500 mb-1.5 text-center">Right qubit</p>
          <div className="flex gap-2">
            {qStates.map((s, i) => (
              <button
                key={i}
                onClick={() => setRightIdx(i)}
                aria-label={`Select right qubit ${s.label}`}
                className={`px-3 py-1.5 rounded-full text-sm font-mono font-medium transition-colors
                  ${rightIdx === i
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-xl p-4 font-mono text-center text-sm mb-4">
        <span className="text-cyan-300">{left.label}</span>
        <span className="text-slate-500"> ⊗ </span>
        <span className="text-cyan-300">{right.label}</span>
        <span className="text-slate-500"> = </span>
        <span className="text-white">result below</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {basisLabels.map((label, i) => {
          const amp = result[i]
          const prob = amp * amp * 100
          return (
            <div key={label} className="bg-slate-900 rounded-xl p-3 text-center">
              <div className="text-cyan-300 font-mono text-sm mb-1">{label}</div>
              <div className="text-white font-mono text-xs mb-1">
                {amp.toFixed(3)}
              </div>
              <div className="text-slate-500 text-xs mb-1.5">
                {prob.toFixed(1)}%
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${prob}%` }}
                />
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
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      {/* Separable card */}
      <div className="card border-green-800/40 bg-green-950/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-400 text-lg">✓</span>
          <h4 className="text-sm font-semibold text-green-300">Separable</h4>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-3 font-mono text-center text-sm mb-3">
          <span className="text-cyan-300">|+⟩ ⊗ |0⟩</span>
          <span className="text-slate-500"> = </span>
          <span className="text-white">(|00⟩ + |10⟩)/√2</span>
        </div>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex gap-2 items-start">
            <span className="text-green-400 mt-0.5">•</span>
            Each qubit has its own independent state
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-green-400 mt-0.5">•</span>
            Measuring one tells you nothing about the other
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-green-400 mt-0.5">•</span>
            Can be written as a product of single-qubit states
          </li>
        </ul>
      </div>

      {/* Entangled card */}
      <div className="card border-amber-800/40 bg-amber-950/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-amber-400 text-lg">⚠</span>
          <h4 className="text-sm font-semibold text-amber-300">Entangled</h4>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-3 font-mono text-center text-sm mb-3">
          <span className="text-white">(|00⟩ + |11⟩)/√2</span>
        </div>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex gap-2 items-start">
            <span className="text-amber-400 mt-0.5">•</span>
            Cannot be written as a product of single-qubit states
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-amber-400 mt-0.5">•</span>
            Measuring one instantly determines the other
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-amber-400 mt-0.5">•</span>
            This is the Bell state — explored in Module 7
          </li>
        </ul>
      </div>
    </div>
  )
}

function AmplitudeReaderVisual() {
  const presets = [
    { label: '|00⟩',  amps: [1, 0, 0, 0] },
    { label: '|+0⟩',  amps: [0.707, 0, 0.707, 0] },
    { label: 'Equal',  amps: [0.5, 0.5, 0.5, 0.5] },
    { label: 'Bell',   amps: [0.707, 0, 0, 0.707] },
  ]
  const basisLabels = ['|00⟩', '|01⟩', '|10⟩', '|11⟩']

  const [stateIdx, setStateIdx] = useState(0)
  const amps = presets[stateIdx].amps

  return (
    <div className="card my-6 bg-cyan-950/20 border-cyan-800/30">
      <p className="text-sm font-semibold text-white mb-1">Amplitude reader</p>
      <p className="text-xs text-slate-400 mb-4">
        Select a two-qubit state and see the amplitude and probability for each basis state.
      </p>

      <div className="flex gap-2 flex-wrap justify-center mb-5">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => setStateIdx(i)}
            aria-label={`Select preset state ${p.label}`}
            className={`px-3 py-1.5 rounded-full text-sm font-mono font-medium transition-colors
              ${stateIdx === i
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {basisLabels.map((label, i) => {
          const amp = amps[i]
          const prob = amp * amp * 100
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="text-cyan-300 font-mono text-sm w-10 text-right flex-shrink-0">
                {label}
              </span>
              <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-cyan-500/70 rounded-full transition-all duration-300"
                  style={{ width: `${prob}%` }}
                />
                {prob > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/80">
                    {amp.toFixed(3)} → {prob.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-500 text-center mt-3">
        Sum of probabilities: {(amps.reduce((s, a) => s + a * a, 0) * 100).toFixed(1)}%
      </p>
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'One Qubit to Two',
    hook: "Adding a second qubit doesn\u2019t double the possibilities \u2014 it squares them.",
    hookSub: "This exponential scaling is the source of quantum computing\u2019s power.",
    visual: <QubitScalingVisual />,
    bullets: [
      'One qubit has 2 amplitudes (\u03B1|0\u27E9 + \u03B2|1\u27E9). Two qubits have 4. Three have 8.',
      'n qubits need 2\u207F amplitudes \u2014 exponential growth. This is the engine of quantum computing.',
      'Each amplitude corresponds to one computational basis state, like |01\u27E9 or |110\u27E9.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p className="font-semibold text-white mb-1">Why 50 qubits?</p>
        <p>
          Simulating 50 qubits requires storing 2⁵⁰ ≈ 10¹⁵ complex numbers.
          That is about a petabyte of RAM — beyond any classical computer.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>This exponential scaling is also why quantum error correction is so hard —
        errors grow exponentially too. Quantum advantage only occurs when algorithms
        exploit the structure of this exponential space.</p>
      </div>
    ),
    quiz: {
      question: 'How many amplitudes does a 3-qubit system need?',
      choices: ['3', '6', '8', '16'],
      correct: 2,
    },
  },
  {
    title: 'Two-Qubit Basis States',
    hook: 'Two qubits give four basis states: |00\u27E9, |01\u27E9, |10\u27E9, and |11\u27E9.',
    visual: <BasisStatesVisual />,
    bullets: [
      '|00\u27E9 means both qubits are 0. |11\u27E9 means both are 1. |01\u27E9 means first is 0, second is 1.',
      'Measurement always collapses to exactly one of these four outcomes.',
      'The probability of each outcome equals the squared magnitude of its amplitude.',
    ],
    example: (
      <div>
        <MathDisplay>{'|\\psi\\rangle = \\alpha_{00}|00\\rangle + \\alpha_{01}|01\\rangle + \\alpha_{10}|10\\rangle + \\alpha_{11}|11\\rangle'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          A general two-qubit state is a weighted sum of all four basis states.
        </p>
      </div>
    ),
    quiz: {
      question: 'In the state |10\u27E9, what is the value of the first (leftmost) qubit?',
      choices: ['0', 'Both 0 and 1', '1', 'Undefined until measured'],
      correct: 2,
    },
  },
  {
    title: 'Tensor Product Intuition',
    hook: 'The tensor product \u2297 combines two independent qubit states into one joint state.',
    hookSub: 'Concatenate labels, multiply amplitudes \u2014 that\u2019s the core rule.',
    visual: <TensorProductVisual />,
    bullets: [
      '|0\u27E9 \u2297 |1\u27E9 = |01\u27E9. Concatenate the labels and multiply the amplitudes.',
      '|+\u27E9 \u2297 |0\u27E9 = (|00\u27E9 + |10\u27E9)/\u221A2. Each term in |+\u27E9 pairs with |0\u27E9.',
      'The tensor product describes independent qubits \u2014 no correlations, no entanglement.',
    ],
    example: (
      <div>
        <MathDisplay>{'|+\\rangle \\otimes |0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) \\otimes |0\\rangle = \\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Each term in the first qubit pairs with each term in the second.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>
          The tensor product space has dimension 2ⁿ for n qubits. This is the Hilbert
          space of the composite system. Importantly, NOT every state in this space is a
          tensor product — the non-product states are entangled.
        </p>
      </div>
    ),
    quiz: {
      question: 'What is |+\u27E9 \u2297 |0\u27E9?',
      choices: [
        '|+0\u27E9 (undefined notation)',
        '(|00\u27E9 + |10\u27E9)/\u221A2',
        '|00\u27E9 + |01\u27E9 + |10\u27E9 + |11\u27E9',
        '(|00\u27E9 + |01\u27E9)/\u221A2',
      ],
      correct: 1,
    },
  },
  {
    title: 'Separable vs Entangled',
    hook: "If you can write it as a product, it\u2019s separable. If you can\u2019t, it\u2019s entangled.",
    hookSub: 'Entanglement is the resource that makes quantum computing truly different.',
    visual: <SeparabilityVisual />,
    bullets: [
      'Separable: |\u03C8\u27E9 \u2297 |\u03C6\u27E9 \u2014 each qubit has its own independent state.',
      'Entangled: (|00\u27E9 + |11\u27E9)/\u221A2 \u2014 cannot be written as a product of single-qubit states.',
      'Entanglement creates correlations impossible classically \u2014 you\u2019ll explore this in Module 7.',
    ],
    example: (
      <div className="card bg-amber-950/10 border-amber-800/30 text-sm text-slate-400">
        <p className="font-semibold text-white mb-1">Try to factor (|00⟩ + |11⟩)/√2</p>
        <p>
          You would need α₀β₀ = 1/√2, α₀β₁ = 0, α₁β₀ = 0, α₁β₁ = 1/√2.
          But if α₀β₁ = 0, then α₀ = 0 or β₁ = 0 — which contradicts α₀β₀ ≠ 0
          or α₁β₁ ≠ 0. Impossible!
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>
          Entanglement is quantified by measures like entanglement entropy. A maximally
          entangled two-qubit state (like the Bell state) has 1 ebit of entanglement.
          Entanglement is a resource — it can be consumed by quantum protocols like
          teleportation and superdense coding.
        </p>
      </div>
    ),
    quiz: {
      question: 'Is (|00\u27E9 + |11\u27E9)/\u221A2 separable?',
      choices: [
        'Yes \u2014 it\u2019s |0\u27E9 \u2297 |0\u27E9 plus |1\u27E9 \u2297 |1\u27E9',
        'No \u2014 it cannot be written as a product',
        'Yes \u2014 every state is separable',
        'Only if you measure it first',
      ],
      correct: 1,
    },
  },
  {
    title: 'Reading Two-Qubit Amplitudes',
    hook: 'A two-qubit state vector has four entries \u2014 one amplitude per basis state.',
    hookSub: 'Square each amplitude to get a probability. They must all sum to 1.',
    visual: <AmplitudeReaderVisual />,
    bullets: [
      'State vector: (\u03B1\u2080\u2080, \u03B1\u2080\u2081, \u03B1\u2081\u2080, \u03B1\u2081\u2081) \u2014 four complex numbers, one per basis state.',
      'Born rule: P(outcome) = |amplitude|\u00B2. All probabilities must sum to 1.',
      'Three qubits \u2192 8 entries. Ten \u2192 1,024. This exponential growth is why simulation is hard.',
    ],
    example: (
      <div>
        <MathDisplay>{'P(|01\\rangle) = |\\alpha_{01}|^2 \\qquad \\sum_j |\\alpha_j|^2 = 1'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Square the amplitude to get the probability. The sum of all probabilities is always 1.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>
          In practice, we never directly observe the state vector — we can only infer it
          statistically through many measurements (quantum state tomography). A single
          measurement gives a random outcome weighted by the amplitudes. The state vector
          is a mathematical model, not a directly observable quantity.
        </p>
      </div>
    ),
    quiz: {
      question: 'If a 2-qubit state has amplitudes [1/2, 1/2, 1/2, 1/2], what is P(|01\u27E9)?',
      choices: ['50%', '12.5%', '25%', '100%'],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function MultiQubit() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('multiqubit', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['multiqubit']) markDone('multiqubit')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('multiqubit', step)
  }

  function goNext() {
    if (step < LESSONS.length - 1) setStep(s => s + 1)
  }

  function goPrev() {
    if (step > 0) setStep(s => s - 1)
  }

  return (
    <ModuleLayout
      moduleId="multiqubit"
      title="Multi-Qubit Systems"
      subtitle="From one qubit to many — where the power begins."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/gates', label: 'Module 5: Single-Qubit Gates' }}
      next={{ to: '/entanglement', label: 'Module 7: Entanglement' }}
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
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-green-300 font-semibold">Module 6 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 7 to discover entanglement.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <StepNav
        steps={LESSONS.length}
        current={step}
        passed={passed}
        onNext={goNext}
        onPrev={goPrev}
        onGoto={setStep}
      />
    </ModuleLayout>
  )
}
