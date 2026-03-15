import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DeepDive from '../components/DeepDive'
import StepNav from '../components/StepNav'
import { MathDisplay, Math as InlineMath } from '../components/MathBlock'
import { useProgress } from '../hooks/useProgress'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function BitVsQubitVisual() {
  const [showQubit, setShowQubit] = useState(false)
  return (
    <div className="my-6">
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={() => setShowQubit(false)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${!showQubit ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
          Classical Bit
        </button>
        <button onClick={() => setShowQubit(true)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${showQubit ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
          Qubit
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showQubit ? (
          <motion.div key="bit"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="card text-center py-8">
            <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider">Classical Bit — always one or the other</p>
            <div className="flex justify-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-blue-900/50 border-2 border-blue-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-400">0</span>
              </div>
              <div className="flex items-center text-slate-600 font-bold text-xl">or</div>
              <div className="w-20 h-20 rounded-2xl bg-blue-900/50 border-2 border-blue-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-400">1</span>
              </div>
            </div>
            <p className="text-xs text-blue-400 mt-4">Like a light switch — definitely on or off</p>
          </motion.div>
        ) : (
          <motion.div key="qubit"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="card text-center py-8 border-indigo-800/50">
            <p className="text-xs text-indigo-400 mb-4 uppercase tracking-wider">Qubit — both until measured</p>
            <div className="flex justify-center gap-3 items-center mb-2">
              <div className="w-20 h-20 rounded-2xl bg-indigo-900/40 border-2 border-dashed border-indigo-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-400">0</span>
              </div>
              <div className="text-indigo-400 font-bold text-xl">+</div>
              <div className="w-20 h-20 rounded-2xl bg-violet-900/40 border-2 border-dashed border-violet-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-violet-400">1</span>
              </div>
            </div>
            <p className="text-xs text-indigo-400 mt-2">Like a spinning coin — both while spinning</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SuperpositionScaleVisual() {
  const data = [
    { n: 1, states: 2, label: '2' },
    { n: 2, states: 4, label: '4' },
    { n: 3, states: 8, label: '8' },
    { n: 10, states: 1024, label: '1,024' },
    { n: 50, states: null, label: '10¹⁵+' },
  ]
  return (
    <div className="card my-6 bg-indigo-950/20 border-indigo-800/30">
      <p className="text-center text-sm text-indigo-300 font-mono mb-4">n qubits → 2ⁿ simultaneous states</p>
      <div className="grid grid-cols-5 gap-2 text-center">
        {data.map(({ n, label }) => (
          <div key={n} className="bg-slate-900 rounded-xl p-3">
            <div className="text-indigo-400 font-bold text-xl">{n}</div>
            <div className="text-slate-600 text-xs mb-1">qubits</div>
            <div className="text-white font-mono text-xs">{label}</div>
            <div className="text-slate-600 text-xs">states</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MeasurementVisual() {
  const [measured, setMeasured] = useState(false)
  const [result, setResult] = useState(null)

  function measure() {
    setResult(Math.random() < 0.5 ? 0 : 1)
    setMeasured(true)
  }

  function reset() {
    setMeasured(false)
    setResult(null)
  }

  return (
    <div className="card my-6 text-center py-6">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Click to simulate a measurement</p>
      <div className="flex gap-4 justify-center items-center mb-4 flex-wrap">
        <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center transition-all duration-300
          ${!measured
            ? 'border-dashed border-indigo-500 bg-indigo-900/30'
            : result === 0
              ? 'border-green-500 bg-green-900/30'
              : 'border-violet-500 bg-violet-900/30'
          }`}>
          {!measured
            ? <span className="text-4xl">🌀</span>
            : <span className="text-4xl font-bold" style={{ color: result === 0 ? '#86efac' : '#c4b5fd' }}>{result}</span>
          }
        </div>
        <div className="text-slate-600 text-2xl">→</div>
        <div>
          {!measured ? (
            <button onClick={measure} className="btn-primary">
              Measure qubit
            </button>
          ) : (
            <div className="space-y-2">
              <div className={`text-sm font-medium ${result === 0 ? 'text-green-400' : 'text-violet-400'}`}>
                Collapsed to |{result}⟩
              </div>
              <button onClick={reset} className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2">
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-slate-600">
        {measured ? 'Superposition is gone. The qubit stays in this state now.' : 'The qubit is in superposition — both 0 and 1 simultaneously.'}
      </p>
    </div>
  )
}

function WaveInterferenceVisual() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      <div className="card text-center">
        <p className="text-sm font-semibold text-green-400 mb-3">Constructive</p>
        <svg viewBox="0 0 200 80" className="w-full h-20">
          <path d="M10,40 Q35,10 60,40 Q85,70 110,40 Q135,10 160,40 Q185,70 200,40"
                fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.45" />
          <path d="M10,40 Q35,10 60,40 Q85,70 110,40 Q135,10 160,40 Q185,70 200,40"
                fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.45" />
          <path d="M10,40 Q35,-10 60,40 Q85,90 110,40 Q135,-10 160,40 Q185,90 200,40"
                fill="none" stroke="#4ade80" strokeWidth="3" />
        </svg>
        <p className="text-xs text-slate-500 mt-1">Same direction → bigger amplitude</p>
      </div>
      <div className="card text-center">
        <p className="text-sm font-semibold text-red-400 mb-3">Destructive</p>
        <svg viewBox="0 0 200 80" className="w-full h-20">
          <path d="M10,40 Q35,10 60,40 Q85,70 110,40 Q135,10 160,40 Q185,70 200,40"
                fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.7" />
          <path d="M10,40 Q35,70 60,40 Q85,10 110,40 Q135,70 160,40 Q185,10 200,40"
                fill="none" stroke="#f87171" strokeWidth="2" opacity="0.7" />
          <line x1="10" y1="40" x2="190" y2="40" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="5 3" />
        </svg>
        <p className="text-xs text-slate-500 mt-1">Opposite directions → cancel out</p>
      </div>
    </div>
  )
}

function WhyQCMatters() {
  const apps = [
    { icon: '🔐', area: 'Cryptography', detail: "Shor's algorithm can factor huge numbers — breaking today's encryption." },
    { icon: '💊', area: 'Drug Discovery', detail: 'Simulate molecules at quantum scale — impossible on classical computers.' },
    { icon: '🗺️', area: 'Optimization', detail: 'Find the best route among trillions of options exponentially faster.' },
    { icon: '🤖', area: 'Machine Learning', detail: 'Speed up certain ML tasks via quantum kernels and amplitude encoding.' },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {apps.map(({ icon, area, detail }) => (
        <div key={area} className="card flex gap-3 items-start">
          <span className="text-2xl flex-shrink-0">{icon}</span>
          <div>
            <h4 className="font-semibold text-indigo-300 text-sm">{area}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Bits vs Qubits',
    hook: 'A qubit can hold 0, 1, or both at the same time.',
    bullets: [
      'Classical bits are always exactly 0 or 1 — like a light switch.',
      'Qubits can be 0, 1, or a superposition of both — like a spinning coin.',
      'The difference is only visible while computing. Measurement forces a definite 0 or 1.',
    ],
    visual: <BitVsQubitVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Analogy:</strong> A coin lying flat is a classical bit (heads = 1, tails = 0).
        A coin spinning in the air is a qubit — neither until it lands.</p>
      </div>
    ),
    quiz: {
      question: 'What is the key difference between a classical bit and a qubit?',
      choices: [
        'Qubits are faster than classical bits',
        'Qubits can be in a superposition of 0 and 1 simultaneously',
        'Classical bits can store more values',
        'Qubits can only store 0',
      ],
      correct: 1,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Qubits are physically implemented using two-level quantum systems: the spin of an electron
        (up = |0⟩, down = |1⟩), the polarization of a photon, or the energy levels of a superconducting
        circuit.</p>
        <p>The no-cloning theorem says you cannot copy an arbitrary qubit — unlike classical bits which
        can be freely duplicated. This has deep consequences for quantum error correction.</p>
      </div>
    ),
  },
  {
    title: 'Superposition',
    hook: 'n qubits in superposition can represent 2ⁿ states at once.',
    bullets: [
      '2 qubits = 4 states simultaneously. 10 qubits = 1,024 states. 50 qubits = over a quadrillion.',
      'The catch: you can only read one state when you measure.',
      'Quantum algorithms are carefully designed so the right answer is most likely to appear.',
    ],
    visual: <SuperpositionScaleVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Why it matters:</strong> A quantum computer with 300 qubits
        could represent more states simultaneously than there are atoms in the observable universe.</p>
      </div>
    ),
    quiz: {
      question: 'How many states can 3 qubits in superposition represent simultaneously?',
      choices: ['3', '6', '8', '16'],
      correct: 2,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>This exponential scaling is why quantum computers are hard to simulate classically.
        Simulating 50 qubits requires storing 2⁵⁰ ≈ 10¹⁵ complex numbers — about a petabyte of RAM.</p>
        <p>But more qubits doesn't automatically mean exponential speedup on every problem.
        Quantum advantage only appears for specific algorithms designed to exploit interference.</p>
      </div>
    ),
  },
  {
    title: 'Measurement & Collapse',
    hook: 'Looking at a qubit destroys the superposition — forever.',
    bullets: [
      'Measuring a qubit collapses it to either 0 or 1, probabilistically.',
      'The probability depends on how the superposition was set up (the amplitudes).',
      "You can't undo this. Measurement is irreversible — a one-way door.",
    ],
    visual: <MeasurementVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Example:</strong> A qubit in equal superposition
        (|0⟩ + |1⟩)/√2 collapses to 0 with 50% probability and 1 with 50% probability.
        Run it 1,000 times and you'll get roughly 500 zeros and 500 ones.</p>
      </div>
    ),
    quiz: {
      question: 'What happens to a qubit in superposition when you measure it?',
      choices: [
        'It stays in superposition so you can read both values',
        'It collapses to 0 or 1 based on its amplitudes',
        'It becomes a classical bit permanently',
        'The measurement has no effect',
      ],
      correct: 1,
    },
  },
  {
    title: 'Interference',
    hook: 'Quantum algorithms use interference to amplify right answers and cancel wrong ones.',
    bullets: [
      'Quantum amplitudes (unlike probabilities) can be negative or complex.',
      'Constructive interference: two amplitudes pointing the same way → bigger amplitude.',
      'Destructive interference: two amplitudes pointing opposite ways → cancel out.',
    ],
    visual: <WaveInterferenceVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Like sound waves:</strong> Two speakers playing the same
        frequency in sync get louder (constructive). Perfectly out of phase, they cancel each other —
        you hear silence (destructive). Quantum amplitudes work the same way.</p>
      </div>
    ),
    quiz: {
      question: 'What does destructive interference do in a quantum computation?',
      choices: [
        'Amplifies the probability of the correct answer',
        'Destroys the qubit',
        'Cancels out amplitudes for wrong answers, reducing their probability',
        'Collapses superposition prematurely',
      ],
      correct: 2,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Interference is why Grover's algorithm works. It repeatedly amplifies the amplitude of
        the target item and suppresses everything else, until a measurement almost certainly
        yields the correct answer.</p>
        <p>The key insight: amplitudes are complex numbers, not probabilities. Probabilities are
        always ≥ 0; amplitudes can be negative or imaginary, which enables cancellation.</p>
      </div>
    ),
  },
  {
    title: 'Why Quantum Computing Matters',
    hook: "Quantum computers aren't magic — they're specialized tools for specific hard problems.",
    bullets: [
      "QC isn't faster at everything. Most everyday tasks run better on classical computers.",
      'Quantum speedup appears for problems like factoring, search, and physical simulation.',
      "The field is still early-stage — today's machines are noisy, but growing fast.",
    ],
    visual: <WhyQCMatters />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Shor's algorithm</strong> can factor a 2048-bit number
        in hours on a large enough quantum computer. The same task would take classical computers
        longer than the age of the universe.</p>
      </div>
    ),
    quiz: {
      question: 'Which statement about quantum computers is TRUE?',
      choices: [
        'They are faster than classical computers at everything',
        'They are only useful for breaking encryption',
        'They excel at specific problem types like factoring and simulation',
        'They use qubits that can store any number of values simultaneously',
      ],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Intuition() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('intuition', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['intuition']) markDone('intuition')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('intuition', step)
  }

  function goNext() {
    if (step < LESSONS.length - 1) setStep(s => s + 1)
  }

  function goPrev() {
    if (step > 0) setStep(s => s - 1)
  }

  return (
    <ModuleLayout
      moduleId="intuition"
      title="Big-Picture Intuition"
      subtitle={`Lesson ${step + 1} of ${LESSONS.length} — ${lesson.title}`}
      next={{ to: '/braket', label: 'Module 2: Bra-Ket Notation' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Hook */}
          <div className="mb-6 p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-center">
            <p className="text-lg sm:text-xl font-semibold text-white leading-snug">{lesson.hook}</p>
          </div>

          {/* Visual — first, prominent */}
          {lesson.visual}

          {/* Bullets */}
          <ul className="space-y-2 my-5">
            {lesson.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-slate-300">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-900/60 border border-indigo-700/50
                                 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Example */}
          <div className="my-4">{lesson.example}</div>

          {/* Deep dive */}
          {lesson.deepDive && (
            <DeepDive title="Deep Dive">{lesson.deepDive}</DeepDive>
          )}

          {/* Quiz */}
          <Quiz
            question={lesson.quiz.question}
            choices={lesson.quiz.choices}
            correct={lesson.quiz.correct}
            onPass={handleQuizPass}
          />

          {/* If this is the last lesson and all passed, show completion */}
          {step === LESSONS.length - 1 && allPassed && (
            <div className="my-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-green-300 font-semibold">Module 1 Complete!</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 2 to learn Bra-Ket notation.</p>
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
