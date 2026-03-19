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

function DeutschJozsaVisual() {
  const [oracleType, setOracleType] = useState('constant')

  const oracles = {
    constant: {
      label: 'Constant',
      mapping: [
        { input: '0', output: '1' },
        { input: '1', output: '1' },
      ],
      result: '|0⟩ — constant!',
      desc: 'Both inputs give the same output. One query tells you.',
    },
    balanced: {
      label: 'Balanced',
      mapping: [
        { input: '0', output: '0' },
        { input: '1', output: '1' },
      ],
      result: '|1⟩ — balanced!',
      desc: 'Inputs give different outputs. One query tells you.',
    },
  }

  const o = oracles[oracleType]

  return (
    <div className="card border-orange-800/30 my-6">
      <p className="text-xs text-orange-400 uppercase tracking-wider mb-4 text-center">
        Deutsch's algorithm — one query to classify the function
      </p>

      <div className="flex gap-2 justify-center mb-5">
        {Object.entries(oracles).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setOracleType(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${oracleType === key
                ? 'bg-orange-900/40 border-orange-500/60 text-orange-300 focus-visible:outline-orange-400'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`Select ${val.label} oracle`}
          >
            {val.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={oracleType}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {/* Oracle black box */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-5">
            <div className="space-y-2 text-right">
              {o.mapping.map(m => (
                <div key={m.input} className="font-mono text-sm text-orange-300">
                  f({m.input})
                </div>
              ))}
            </div>
            <div className="w-16 h-16 rounded-xl bg-orange-900/40 border-2 border-orange-600/60
                            flex items-center justify-center">
              <span className="text-orange-300 font-bold text-sm">f(x)</span>
            </div>
            <div className="space-y-2 text-left">
              {o.mapping.map(m => (
                <div key={m.input} className="font-mono text-sm text-white">
                  = {m.output}
                </div>
              ))}
            </div>
          </div>

          {/* Circuit flow */}
          <div className="bg-slate-900/60 rounded-xl p-4 text-center mb-4">
            <div className="flex items-center justify-center gap-2 font-mono text-sm flex-wrap">
              <span className="text-slate-400">|0⟩</span>
              <span className="text-slate-600">→</span>
              <span className="px-2 py-1 rounded-lg bg-orange-900/40 border border-orange-700/50 text-orange-300">H</span>
              <span className="text-slate-600">→</span>
              <span className="px-2 py-1 rounded-lg bg-orange-900/40 border border-orange-700/50 text-orange-300">Uf</span>
              <span className="text-slate-600">→</span>
              <span className="px-2 py-1 rounded-lg bg-orange-900/40 border border-orange-700/50 text-orange-300">H</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-300 font-bold">{o.result}</span>
            </div>
          </div>

          <p className="text-sm text-slate-400 text-center">{o.desc}</p>
          <p className="text-xs text-slate-500 text-center mt-2">
            Classically: 2 queries needed. Quantum: always 1.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function GroverVisual() {
  const [iteration, setIteration] = useState(0)

  const N = 8
  const target = 5
  const maxIters = 3

  function getAmplitudes(iter) {
    const amps = new Array(N).fill(1 / Math.sqrt(N))
    for (let i = 0; i < iter; i++) {
      // Oracle: flip target
      amps[target] = -amps[target]
      // Diffusion: invert about the mean
      const mean = amps.reduce((a, b) => a + b, 0) / N
      for (let j = 0; j < N; j++) {
        amps[j] = 2 * mean - amps[j]
      }
    }
    return amps
  }

  const amps = getAmplitudes(iteration)
  const maxAmp = Math.max(...amps.map(Math.abs))

  return (
    <div className="card border-orange-800/30 my-6">
      <p className="text-xs text-orange-400 uppercase tracking-wider mb-4 text-center">
        Grover's search — amplitude amplification
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: maxIters + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setIteration(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${iteration === i
                ? 'bg-orange-600 text-white focus-visible:outline-orange-400'
                : 'bg-slate-800 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`${i} iteration${i !== 1 ? 's' : ''}`}
          >
            {i === 0 ? 'Start' : `Iter ${i}`}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={iteration}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
            <div className="flex items-end justify-center gap-1.5" style={{ height: '120px' }}>
              {amps.map((a, i) => {
                const height = Math.abs(a) / (maxAmp || 1) * 100
                const isTarget = i === target
                return (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-[40px]">
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isTarget ? 'bg-orange-500' : 'bg-slate-600'
                      }`}
                      style={{ height: `${height}%`, minHeight: a !== 0 ? '2px' : '0' }}
                    />
                    <span className={`text-xs font-mono ${isTarget ? 'text-orange-400' : 'text-slate-500'}`}>
                      {i}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              Items 0–7. Target = <span className="text-orange-400">5</span>.
              Height = probability amplitude.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-900 rounded-xl p-3">
              <div className="text-xs text-slate-500 mb-1">P(target)</div>
              <div className="text-orange-300 font-bold text-xl">
                {(amps[target] * amps[target] * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-900 rounded-xl p-3">
              <div className="text-xs text-slate-500 mb-1">P(others each)</div>
              <div className="text-slate-300 font-bold text-xl">
                {(amps[0] * amps[0] * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function PhaseKickbackVisual() {
  const steps = [
    {
      num: 1,
      label: 'Prepare ancilla in |−⟩',
      formula: '|-\\rangle = (|0\\rangle - |1\\rangle)/\\sqrt{2}',
      desc: 'The ancilla qubit is set to the eigenstate of X with eigenvalue −1.',
    },
    {
      num: 2,
      label: 'Apply controlled-U',
      formula: 'U|u\\rangle = e^{i\\phi}|u\\rangle',
      desc: 'The phase e^(iφ) "kicks back" to the control qubit instead of affecting the target.',
    },
    {
      num: 3,
      label: 'Phase appears on control',
      formula: '|0\\rangle + e^{i\\phi}|1\\rangle',
      desc: 'The control qubit now carries the phase. Measure in X basis to extract it.',
    },
  ]

  return (
    <div className="card border-orange-800/30 my-6">
      <p className="text-xs text-orange-400 uppercase tracking-wider mb-5 text-center">
        Phase kickback — the engine of quantum algorithms
      </p>
      <div className="space-y-4">
        {steps.map(s => (
          <div key={s.num} className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-orange-900/60 border border-orange-700/50
                            flex items-center justify-center text-orange-400 text-sm font-bold flex-shrink-0 mt-1">
              {s.num}
            </div>
            <div className="flex-1 bg-slate-900/60 rounded-xl p-4">
              <p className="text-xs text-orange-400 font-medium uppercase tracking-wider mb-2">
                {s.label}
              </p>
              <div className="mb-2">
                <InlineMath>{s.formula}</InlineMath>
              </div>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-xl bg-orange-900/20 border border-orange-700/40 text-center">
        <p className="text-xs text-orange-400 uppercase tracking-wider mb-1 font-medium">Key idea</p>
        <p className="text-sm text-slate-300">
          The phase moves from target to control — information flows "backwards" through the gate.
        </p>
      </div>
    </div>
  )
}

function ShorVisual() {
  const comparisons = [
    {
      task: 'Factor 2048-bit number',
      classical: 'Longer than the age of the universe',
      quantum: 'Hours (with enough qubits)',
      icon: '🔐',
    },
    {
      task: 'Break RSA encryption',
      classical: 'Infeasible',
      quantum: 'Feasible with ~4000 logical qubits',
      icon: '🛡️',
    },
    {
      task: 'Find period of f(x)',
      classical: 'O(√N) — exhaustive trial',
      quantum: 'O((log N)³) — exponential speedup',
      icon: '🔄',
    },
  ]

  return (
    <div className="space-y-3 my-6">
      {comparisons.map((c, i) => (
        <div key={i} className="card border-orange-800/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{c.icon}</span>
            <h4 className="text-sm font-semibold text-white">{c.task}</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/60 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">Classical</p>
              <p className="text-sm text-red-400">{c.classical}</p>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">Quantum</p>
              <p className="text-sm text-green-400">{c.quantum}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AdvantageVisual() {
  const categories = [
    {
      label: 'Proven exponential speedup',
      color: 'green',
      items: ['Factoring (Shor)', 'Simulating quantum systems', 'Discrete logarithm'],
    },
    {
      label: 'Proven quadratic speedup',
      color: 'amber',
      items: ['Unstructured search (Grover)', 'Amplitude estimation', 'Collision finding'],
    },
    {
      label: 'No known speedup',
      color: 'red',
      items: ['Sorting', 'Most everyday computing', 'Simple arithmetic'],
    },
  ]

  return (
    <div className="space-y-3 my-6">
      {categories.map(c => (
        <div key={c.label} className={`card border-${c.color}-800/30`}>
          <h4 className={`text-sm font-semibold text-${c.color}-400 mb-3`}>{c.label}</h4>
          <div className="flex flex-wrap gap-2">
            {c.items.map(item => (
              <span key={item} className={`px-2.5 py-1 rounded-full text-xs font-medium
                bg-${c.color}-900/30 border border-${c.color}-800/40 text-${c.color}-300`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Deutsch-Jozsa Algorithm',
    hook: 'One quantum query answers a question that takes two classical queries.',
    hookSub: 'The simplest proof that quantum can beat classical — guaranteed.',
    visual: <DeutschJozsaVisual />,
    bullets: [
      'Problem: is f(x) constant (same output for all inputs) or balanced (different outputs)?',
      'Classical: must query f twice to be sure. Quantum: one query always suffices.',
      <>
        The trick: <GlossaryTooltip term="Superposition">superposition</GlossaryTooltip> queries all
        inputs at once, <GlossaryTooltip term="Interference">interference</GlossaryTooltip> reveals the
        pattern.
      </>,
    ],
    example: (
      <div>
        <MathDisplay>
          {'|0\\rangle \\xrightarrow{H} |+\\rangle \\xrightarrow{U_f} \\begin{cases} |+\\rangle & \\text{constant} \\\\ |-\\rangle & \\text{balanced} \\end{cases} \\xrightarrow{H} \\begin{cases} |0\\rangle \\\\ |1\\rangle \\end{cases}'}
        </MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Measure |0⟩ → constant. Measure |1⟩ → balanced. One shot, 100% certainty.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The full Deutsch-Jozsa algorithm works for n-bit inputs: is f constant or balanced?
        Classically, you need 2^(n−1) + 1 queries in the worst case. Quantum: always 1.
        This is an exponential separation — but the problem is artificial.</p>
        <p>The real significance is conceptual: it proved that quantum algorithms can be
        provably faster, not just heuristically faster. This opened the door to Shor and Grover.</p>
      </div>
    ),
    quiz: {
      question: 'How many queries does Deutsch-Jozsa need to determine if f is constant or balanced?',
      choices: ['2', '1', 'log(N)', 'N/2'],
      correct: 1,
    },
  },
  {
    title: 'Grover\'s Search',
    hook: 'Search an unsorted list of N items in √N steps instead of N.',
    hookSub: 'Not exponential — but quadratic speedup is still remarkable.',
    visual: <GroverVisual />,
    bullets: [
      <>
        <GlossaryTooltip term="Oracle">Oracle</GlossaryTooltip> marks the target by flipping its{' '}
        <GlossaryTooltip term="Amplitude">amplitude</GlossaryTooltip>&apos;s sign: positive → negative.
      </>,
      'Diffusion operator inverts all amplitudes about the mean — boosting the target.',
      'Repeat √N times. The target\'s probability grows to ~100%.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Concrete numbers:</strong> Searching a phone book with 1 million
        entries: classical needs up to 1,000,000 lookups. Grover needs ~1,000. That's 1000× faster.
        For a database of 10⁹, it's ~31,623 vs 1 billion.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Grover's algorithm is provably optimal — no quantum algorithm can search faster
        than O(√N) for an unstructured problem. This was shown by Bennett, Bernstein,
        Brassard, and Vazirani (1997).</p>
        <p>The diffusion operator is <InlineMath>{'2|s\\rangle\\langle s| - I'}</InlineMath> where
        |s⟩ is the uniform superposition. Geometrically, it reflects the state about |s⟩,
        which increases the component along the target direction.</p>
      </div>
    ),
    quiz: {
      question: 'How many Grover iterations are needed to search 1,000,000 items?',
      choices: ['1,000,000', '500,000', '~1,000', '~100'],
      correct: 2,
    },
  },
  {
    title: 'Phase Kickback',
    hook: 'Phase kickback is the trick that makes Deutsch-Jozsa, Grover, and Shor actually work.',
    hookSub: 'The phase "kicks" from the target qubit back onto the control qubit.',
    visual: <PhaseKickbackVisual />,
    bullets: [
      'When a controlled gate acts on an eigenstate, the eigenvalue becomes a phase on the control.',
      'The target qubit doesn\'t change — but the control qubit acquires the phase e^(iφ).',
      'This "kickback" is how quantum algorithms extract information without measuring the target.',
    ],
    example: (
      <div>
        <MathDisplay>
          {'\\text{CU}|+\\rangle|u\\rangle = \\frac{|0\\rangle|u\\rangle + e^{i\\phi}|1\\rangle|u\\rangle}{\\sqrt{2}} = \\left(\\frac{|0\\rangle + e^{i\\phi}|1\\rangle}{\\sqrt{2}}\\right)|u\\rangle'}
        </MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          The phase e^(iφ) moved to the control qubit. The target is unchanged.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Phase kickback is the key ingredient in quantum phase estimation (QPE).
        QPE uses multiple controlled-U gates with powers of 2, combined with the
        inverse QFT, to read out the phase φ in binary. This is the heart of Shor's algorithm.</p>
      </div>
    ),
    quiz: {
      question: 'In phase kickback, where does the phase end up?',
      choices: [
        'On the target qubit',
        'On the control qubit',
        'Equally distributed between both qubits',
        'It disappears',
      ],
      correct: 1,
    },
  },
  {
    title: 'Why Shor Matters',
    hook: 'Shor\'s algorithm can factor large numbers exponentially faster than any known classical method.',
    hookSub: 'This threatens RSA encryption — the backbone of internet security.',
    visual: <ShorVisual />,
    bullets: [
      'RSA security relies on factoring being hard. Shor makes it easy — with enough qubits.',
      'Key insight: factoring reduces to period-finding. The QFT finds periods exponentially fast.',
      'Current quantum computers are too small and noisy. But it\'s a matter of engineering, not physics.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">The recipe:</strong> To factor N: (1) pick random a &lt; N,
        (2) use QPE to find the period r of f(x) = a^x mod N, (3) use r to find factors via
        gcd(a^(r/2) ± 1, N). Steps 1 and 3 are classical. Step 2 is the quantum magic.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Shor's algorithm needs O((log N)³) quantum gates — polynomial in the number of digits.
        The best classical algorithm (General Number Field Sieve) runs in sub-exponential time
        <InlineMath>{'e^{O((\\log N)^{1/3} (\\log \\log N)^{2/3})}'}</InlineMath>.</p>
        <p>The crossover point where quantum beats classical is estimated at around 2048 bits.
        Current quantum computers have factored numbers up to about 21 (in research demonstrations).
        Useful factoring requires ~4000 error-corrected logical qubits — likely decades away.</p>
      </div>
    ),
    quiz: {
      question: 'What mathematical problem does Shor\'s algorithm reduce factoring to?',
      choices: [
        'Matrix multiplication',
        'Period-finding',
        'Shortest path',
        'Eigenvalue decomposition',
      ],
      correct: 1,
    },
  },
  {
    title: 'Quantum Advantage',
    hook: 'Quantum isn\'t faster at everything — it\'s faster at specific structured problems.',
    hookSub: 'Knowing where quantum helps (and where it doesn\'t) is the real insight.',
    visual: <AdvantageVisual />,
    bullets: [
      'Exponential speedup: factoring, quantum simulation, discrete log. These are the crown jewels.',
      'Quadratic speedup: unstructured search (Grover). Helpful but not transformative.',
      'No speedup: sorting, basic arithmetic, most everyday tasks. Classical computers win here.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">The honest picture:</strong> Quantum advantage requires
        (1) a problem with the right mathematical structure, (2) enough error-corrected qubits,
        and (3) a quantum algorithm that exploits the structure. Without all three, classical wins.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>"Quantum supremacy" demonstrations (Google 2019, IBM/China 2021+) showed tasks where
        quantum is faster — but these are artificial sampling problems, not useful computations.</p>
        <p>The most promising near-term applications are quantum simulation (chemistry, materials science)
        and optimization heuristics (QAOA, VQE). These may achieve practical advantage before
        full fault-tolerant computing arrives.</p>
      </div>
    ),
    quiz: {
      question: 'Which of these gets an exponential quantum speedup?',
      choices: [
        'Sorting a list',
        'Searching an unsorted database',
        'Factoring large numbers',
        'Adding two numbers',
      ],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Algorithms() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('algorithms', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['algorithms']) markDone('algorithms')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('algorithms', step)
  }

  return (
    <ModuleLayout
      moduleId="algorithms"
      title="Core Algorithms"
      subtitle="Why quantum beats classical — conceptually."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/measurement', label: 'Module 9: Measurement & Basis' }}
      next={{ to: '/labs', label: 'Module 11: Qiskit Labs' }}
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
            bulletStyle={MODULE_LAYOUT_STYLES.algorithms.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 10 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 11 for hands-on Qiskit labs.</p>
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
