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

function CorrelationVisual() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      {/* Classical */}
      <div className="card border-slate-700/50">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-medium text-center">
          Classical Correlation
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-900/30 border border-red-700/50
                          flex items-center justify-center text-lg">&#129511;</div>
          <div className="text-slate-600 text-sm">&amp;</div>
          <div className="w-10 h-10 rounded-full bg-red-900/30 border border-red-700/50
                          flex items-center justify-center text-lg">&#129511;</div>
        </div>
        <p className="text-sm text-slate-300 mb-3 text-center leading-relaxed">
          If you see a red sock from the pair, you know the other is red.
          The color was decided when they were packed.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-slate-400">
            <span className="text-slate-500 mt-0.5">&bull;</span>
            Outcomes are predetermined
          </li>
          <li className="flex items-start gap-2 text-xs text-slate-400">
            <span className="text-slate-500 mt-0.5">&bull;</span>
            No surprise &mdash; just revealing a hidden fact
          </li>
          <li className="flex items-start gap-2 text-xs text-slate-400">
            <span className="text-slate-500 mt-0.5">&bull;</span>
            Local hidden variables explain it
          </li>
        </ul>
      </div>

      {/* Quantum */}
      <div className="card border-teal-800/30">
        <p className="text-xs text-teal-400 uppercase tracking-wider mb-3 font-medium text-center">
          Quantum Entanglement
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-900/30 border border-teal-700/50
                          flex items-center justify-center font-mono text-teal-300 text-sm">|?&#x27E9;</div>
          <div className="text-teal-600 text-sm">&#x2194;</div>
          <div className="w-10 h-10 rounded-full bg-teal-900/30 border border-teal-700/50
                          flex items-center justify-center font-mono text-teal-300 text-sm">|?&#x27E9;</div>
        </div>
        <p className="text-sm text-slate-300 mb-3 text-center leading-relaxed">
          Measure one qubit and the other is instantly determined &mdash; but
          neither had a definite value before measurement.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-teal-300">
            <span className="text-teal-500 mt-0.5">&bull;</span>
            Outcomes are not predetermined
          </li>
          <li className="flex items-start gap-2 text-xs text-teal-300">
            <span className="text-teal-500 mt-0.5">&bull;</span>
            Violates Bell inequalities
          </li>
          <li className="flex items-start gap-2 text-xs text-teal-300">
            <span className="text-teal-500 mt-0.5">&bull;</span>
            No local hidden variable model works
          </li>
        </ul>
      </div>
    </div>
  )
}

function BellCreationVisual() {
  const steps = [
    {
      num: 1,
      gate: 'Start',
      formula: '|00\\rangle',
      desc: 'Both qubits in the ground state.',
    },
    {
      num: 2,
      gate: 'H on q\u2080',
      formula: '\\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}',
      desc: 'Qubit 0 is now in superposition. No entanglement yet.',
    },
    {
      num: 3,
      gate: 'CNOT',
      formula: '\\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
      desc: 'When q\u2080 = |1\u27E9, q\u2081 flips. Now they\u2019re entangled!',
    },
  ]

  return (
    <div className="card border-teal-800/30 my-6">
      <p className="text-xs text-teal-400 uppercase tracking-wider mb-5 text-center">
        Bell state creation &mdash; step by step
      </p>
      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.num} className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-teal-900/60 border border-teal-700/50
                            flex items-center justify-center text-teal-400 text-sm font-bold flex-shrink-0 mt-1">
              {s.num}
            </div>
            <div className="flex-1 bg-slate-900/60 rounded-xl p-4">
              <p className="text-xs text-teal-400 font-medium uppercase tracking-wider mb-2">
                {s.gate}
              </p>
              <div className="mb-2">
                <InlineMath>{s.formula}</InlineMath>
              </div>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-xl bg-teal-900/20 border border-teal-700/40 text-center">
        <p className="text-xs text-teal-400 uppercase tracking-wider mb-1 font-medium">Result</p>
        <p className="font-mono text-teal-300 text-base sm:text-lg">
          (|00&#x27E9; + |11&#x27E9;) / &#x221A;2 = |&#x03A6;&#x207A;&#x27E9;
        </p>
        <p className="text-xs text-slate-500 mt-2">
          The Bell state &mdash; the simplest maximally entangled state.
        </p>
      </div>
    </div>
  )
}

function FactoringAttemptVisual() {
  return (
    <div className="card border-teal-800/30 my-6">
      <p className="text-xs text-teal-400 uppercase tracking-wider mb-4 text-center">
        Proof by contradiction
      </p>

      {/* Assumption */}
      <div className="bg-slate-900/60 rounded-xl p-4 mb-3">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">Assume</p>
        <MathDisplay>
          {'\\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}} = (a|0\\rangle + b|1\\rangle) \\otimes (c|0\\rangle + d|1\\rangle)'}
        </MathDisplay>
      </div>

      {/* Expansion */}
      <div className="bg-slate-900/60 rounded-xl p-4 mb-3">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">Expand the product</p>
        <MathDisplay>
          {'= ac|00\\rangle + ad|01\\rangle + bc|10\\rangle + bd|11\\rangle'}
        </MathDisplay>
      </div>

      {/* Coefficient matching */}
      <div className="bg-slate-900/60 rounded-xl p-4 mb-3">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">Match coefficients</p>
        <div className="grid grid-cols-2 gap-2 text-sm font-mono">
          <div className="bg-slate-800/60 rounded-lg px-3 py-2 text-slate-300">
            ac = 1/&#x221A;2
          </div>
          <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-3 py-2 text-red-300">
            ad = 0
          </div>
          <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-3 py-2 text-red-300">
            bc = 0
          </div>
          <div className="bg-slate-800/60 rounded-lg px-3 py-2 text-slate-300">
            bd = 1/&#x221A;2
          </div>
        </div>
      </div>

      {/* Contradiction */}
      <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
        <p className="text-xs text-red-400 uppercase tracking-wider mb-2 font-bold">Contradiction</p>
        <ul className="space-y-1.5 text-sm text-slate-300">
          <li>ad = 0 means a = 0 or d = 0.</li>
          <li>But ac &#x2260; 0 requires a &#x2260; 0 and c &#x2260; 0.</li>
          <li>So d must be 0.</li>
          <li className="text-red-300 font-medium">
            But bd = 1/&#x221A;2 &#x2260; 0 requires d &#x2260; 0. Contradiction!
          </li>
        </ul>
      </div>
    </div>
  )
}

function MeasurementEffectVisual() {
  const [results, setResults] = useState([])
  const [lastResult, setLastResult] = useState(null)

  function measure() {
    const outcome = Math.random() < 0.5 ? 0 : 1
    setLastResult(outcome)
    setResults(prev => [...prev, outcome])
  }

  function reset() {
    setResults([])
    setLastResult(null)
  }

  const count0 = results.filter(r => r === 0).length
  const count1 = results.filter(r => r === 1).length

  return (
    <div className="card border-teal-800/30 my-6 text-center">
      <p className="text-xs text-teal-400 uppercase tracking-wider mb-4">
        Bell pair measurement simulator
      </p>

      {lastResult === null ? (
        <p className="font-mono text-teal-300 text-base mb-5">
          (|00&#x27E9; + |11&#x27E9;) / &#x221A;2 &mdash; both qubits undetermined
        </p>
      ) : (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Qubit A</p>
            <div className="w-14 h-14 rounded-xl bg-teal-900/30 border-2 border-teal-500/60
                            flex items-center justify-center font-mono text-xl text-teal-300">
              |{lastResult}&#x27E9;
            </div>
          </div>
          <div className="text-teal-500 text-lg">=</div>
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Qubit B</p>
            <div className="w-14 h-14 rounded-xl bg-teal-900/30 border-2 border-teal-500/60
                            flex items-center justify-center font-mono text-xl text-teal-300">
              |{lastResult}&#x27E9;
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={measure}
          className="btn-primary text-sm"
          aria-label="Measure qubit A of the Bell pair"
        >
          Measure Qubit A
        </button>
        <button
          onClick={reset}
          className="btn-ghost text-sm"
          aria-label="Reset the simulator"
        >
          Reset
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-slate-900/60 rounded-xl p-4 max-w-xs mx-auto">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">
            Results ({results.length} measurements)
          </p>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">|00&#x27E9;</span>
                <span className="text-slate-400">{count0}</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500/70 rounded-full transition-all duration-300"
                  style={{ width: results.length ? `${(count0 / results.length) * 100}%` : '0%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">|11&#x27E9;</span>
                <span className="text-slate-400">{count1}</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500/70 rounded-full transition-all duration-300"
                  style={{ width: results.length ? `${(count1 / results.length) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Always matching &mdash; never |01&#x27E9; or |10&#x27E9;.
          </p>
        </div>
      )}
    </div>
  )
}

function MisconceptionsVisual() {
  const myths = [
    {
      myth: 'Entanglement allows faster-than-light communication.',
      reality: 'No information is transmitted. Correlations are only visible after classical comparison.',
    },
    {
      myth: 'Measuring one qubit "sends a signal" to the other.',
      reality: 'No signal is sent. The correlations were established when the qubits interacted.',
    },
    {
      myth: 'Entangled qubits stay entangled forever.',
      reality: 'Entanglement is fragile. Interaction with the environment (decoherence) destroys it.',
    },
    {
      myth: 'You can use entanglement to clone a quantum state.',
      reality: 'The no-cloning theorem forbids it. Teleportation works, but the original is destroyed.',
    },
  ]

  return (
    <div className="space-y-3 my-6">
      {myths.map((m, i) => (
        <div key={i} className="card border-slate-700/50">
          <div className="flex items-start gap-3 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                             bg-red-950/30 border border-red-800/30 text-red-400
                             text-xs font-medium flex-shrink-0">
              &#x2717; Myth
            </span>
            <p className="text-sm text-slate-300">{m.myth}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                             bg-green-950/30 border border-green-800/30 text-green-400
                             text-xs font-medium flex-shrink-0">
              &#x2713; Reality
            </span>
            <p className="text-sm text-teal-300">{m.reality}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Correlation vs Entanglement',
    hook: 'Entanglement isn\u2019t just correlation \u2014 it\u2019s correlation that no classical system can reproduce.',
    hookSub: 'Classical physics can explain matched socks. It can\u2019t explain Bell pairs.',
    visual: <CorrelationVisual />,
    bullets: [
      'Classical correlation: outcomes are predetermined. Opening one envelope reveals the other.',
      <>
        Quantum <GlossaryTooltip term="Entanglement">entanglement</GlossaryTooltip>: outcomes are genuinely
        undetermined until <GlossaryTooltip term="Measurement">measurement</GlossaryTooltip>.
      </>,
      'Bell\u2019s theorem (1964) proved no local hidden variable theory can reproduce quantum predictions.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">The sock analogy:</strong> You pack two identical socks in separate
        boxes. Opening one box tells you the other&apos;s color. That&apos;s classical correlation &mdash; boring.
        Entanglement is fundamentally different: neither sock has a color until you open a box.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>In 1964, John Bell derived inequalities that any local hidden variable theory must satisfy.
        Quantum mechanics predicts violations of these inequalities.</p>
        <p>The CHSH inequality bounds a particular combination of correlations:
        <InlineMath>{'|S| \\leq 2'}</InlineMath> classically, but quantum mechanics allows
        <InlineMath>{'|S| = 2\\sqrt{2} \\approx 2.83'}</InlineMath>.</p>
        <p>Alain Aspect&apos;s 1982 experiments confirmed the quantum prediction, ruling out local hidden
        variables. The 2022 Nobel Prize in Physics was awarded for this line of work.</p>
      </div>
    ),
    quiz: {
      question: 'What distinguishes quantum entanglement from classical correlation?',
      choices: [
        'Entangled particles communicate faster than light',
        'Entangled outcomes are not predetermined \u2014 they\u2019re created by measurement',
        'Classical correlations are always weaker',
        'Entanglement only works at short distances',
      ],
      correct: 1,
    },
  },
  {
    title: 'Creating a Bell State',
    hook: 'One Hadamard plus one CNOT \u2014 that\u2019s all it takes to create maximal entanglement.',
    visual: <BellCreationVisual />,
    bullets: [
      <>
        H on <GlossaryTooltip term="Qubit">qubit</GlossaryTooltip> 0 creates superposition: |00\u27E9 \u2192
        (|00\u27E9 + |10\u27E9)/\u221A2.
      </>,
      'CNOT entangles: when qubit 0 is |1\u27E9, qubit 1 flips. Result: (|00\u27E9 + |11\u27E9)/\u221A2.',
      <>
        This is the <GlossaryTooltip term="Bell State">Bell state</GlossaryTooltip> |\u03A6\u207A\u27E9 \u2014
        the simplest and most famous entangled state.
      </>,
    ],
    example: (
      <div>
        <MathDisplay>
          {'|00\\rangle \\xrightarrow{H \\otimes I} \\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}} \\xrightarrow{\\text{CNOT}} \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}} = |\\Phi^+\\rangle'}
        </MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Two gates, one entangled state. The CNOT is what creates the entanglement.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>There are four Bell states, forming a complete orthonormal basis for two-qubit states:</p>
        <MathDisplay>
          {'|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}} \\qquad |\\Phi^-\\rangle = \\frac{|00\\rangle - |11\\rangle}{\\sqrt{2}}'}
        </MathDisplay>
        <MathDisplay>
          {'|\\Psi^+\\rangle = \\frac{|01\\rangle + |10\\rangle}{\\sqrt{2}} \\qquad |\\Psi^-\\rangle = \\frac{|01\\rangle - |10\\rangle}{\\sqrt{2}}'}
        </MathDisplay>
        <p>Any two-qubit state can be expressed as a combination of these four.
        They are maximally entangled: measuring one qubit gives a completely random outcome,
        but the two outcomes are perfectly correlated.</p>
      </div>
    ),
    quiz: {
      question: 'Which gate creates the entanglement in the Bell circuit?',
      choices: [
        'Hadamard',
        'Z gate',
        'CNOT',
        'Measurement',
      ],
      correct: 2,
    },
  },
  {
    title: 'Why the Bell State Can\u2019t Factor',
    hook: 'Try to write (|00\u27E9 + |11\u27E9)/\u221A2 as a product \u2014 you\u2019ll hit a contradiction every time.',
    hookSub: 'This impossibility is the mathematical definition of entanglement.',
    visual: <FactoringAttemptVisual />,
    bullets: [
      'Expand the product: (a|0\u27E9+b|1\u27E9)\u2297(c|0\u27E9+d|1\u27E9) = ac|00\u27E9 + ad|01\u27E9 + bc|10\u27E9 + bd|11\u27E9.',
      'Match coefficients: ac = 1/\u221A2, ad = 0, bc = 0, bd = 1/\u221A2.',
      'Contradiction: ad = 0 requires a=0 or d=0, but ac \u2260 0 and bd \u2260 0 need both nonzero.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">What it means:</strong> This isn&apos;t just math trivia &mdash; it means
        the two qubits don&apos;t have individual states. They only have a joint state.
        You can&apos;t describe qubit A without mentioning qubit B.</p>
      </div>
    ),
    quiz: {
      question: 'Why can\u2019t (|00\u27E9 + |11\u27E9)/\u221A2 be written as a product state?',
      choices: [
        'It has too many terms',
        'The coefficient equations lead to a contradiction',
        'Products can only have real amplitudes',
        'It requires three qubits',
      ],
      correct: 1,
    },
  },
  {
    title: 'Measurement Effects',
    hook: 'Measure one qubit in a Bell pair and the other\u2019s fate is sealed \u2014 instantly.',
    hookSub: 'But no information travels. The correlation was built in when they were entangled.',
    visual: <MeasurementEffectVisual />,
    bullets: [
      'Before measurement: neither qubit has a definite value \u2014 only the pair has a joint state.',
      'After measuring qubit A: if you get 0, qubit B is also 0. If 1, qubit B is also 1.',
      'This happens instantly \u2014 but it\u2019s not communication. No useful information is transmitted.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Analogy:</strong> Think of it as tearing a page in half.
        Before you look, neither half &ldquo;has&rdquo; the top or bottom.
        But once you see which half you have, you instantly know what the other
        person holds. No signal was sent.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The no-communication theorem proves entanglement cannot transmit information.
        Mathematically, the reduced density matrix of qubit B is the same regardless of whether
        qubit A was measured:</p>
        <MathDisplay>
          {'\\rho_B = \\text{Tr}_A(|\\Phi^+\\rangle\\langle\\Phi^+|) = \\frac{I}{2}'}
        </MathDisplay>
        <p>Qubit B always looks completely random on its own. Only when A and B compare
        results via classical communication can they detect the correlations.
        This is why entanglement is useful for cryptography (quantum key distribution)
        but not for faster-than-light signaling.</p>
      </div>
    ),
    quiz: {
      question: 'After measuring one qubit of a Bell pair and getting |0\u27E9, what is the other qubit\u2019s state?',
      choices: [
        '|0\u27E9 \u2014 determined instantly',
        '|1\u27E9 \u2014 always opposite',
        'Still in superposition',
        'Random \u2014 they\u2019re independent',
      ],
      correct: 0,
    },
  },
  {
    title: 'Common Misconceptions',
    hook: 'Entanglement doesn\u2019t send signals, clone qubits, or let you peek without disturbing.',
    hookSub: 'Let\u2019s clear up the most common myths.',
    visual: <MisconceptionsVisual />,
    bullets: [
      'No FTL communication: the no-communication theorem is mathematically proven.',
      'Entanglement is fragile: any interaction with the environment can break it (decoherence).',
      'No cloning: you can teleport a state using entanglement, but the original is always destroyed.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Quantum teleportation:</strong> uses entanglement + classical
        communication to transfer a state. It requires sending 2 classical bits per qubit &mdash;
        so it&apos;s limited by the speed of light. Not magic, just clever physics.</p>
      </div>
    ),
    quiz: {
      question: 'Which statement about entanglement is TRUE?',
      choices: [
        'Entangled qubits can communicate instantly',
        'Measurement of one qubit sends a signal to the other',
        'Entanglement cannot be used to send information faster than light',
        'Entangled states last forever once created',
      ],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Entanglement() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('entanglement', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['entanglement']) markDone('entanglement')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('entanglement', step)
  }

  return (
    <ModuleLayout
      moduleId="entanglement"
      title="Entanglement"
      subtitle="Correlation that defies classical intuition."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/multiqubit', label: 'Module 6: Multi-Qubit Systems' }}
      next={{ to: '/circuits', label: 'Module 8: Quantum Circuits' }}
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
            bulletStyle={MODULE_LAYOUT_STYLES.entanglement.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 7 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 8 to learn quantum circuits.</p>
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
