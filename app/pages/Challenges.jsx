import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Zap, Brain, AlertTriangle, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Challenge Data ──────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    id: 'circuits',
    label: 'Circuit Reading',
    icon: Zap,
    challenges: [
      {
        question: 'A circuit applies H to q0, then CNOT(0,1). What state does it produce?',
        choices: ['|00⟩', 'Bell state (|00⟩ + |11⟩)/√2', '|11⟩', '(|01⟩ + |10⟩)/√2'],
        correct: 1,
        explanation: 'H creates superposition on q0, then CNOT entangles q0 and q1, producing the Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2.',
      },
      {
        question: 'A circuit has 3 wires. How many qubits does it use?',
        choices: ['1', '2', '3', '6'],
        correct: 2,
        explanation: 'Each horizontal wire in a circuit diagram represents one qubit. Three wires means three qubits.',
      },
      {
        question: 'Which gate creates superposition from a definite state?',
        choices: ['X gate', 'Z gate', 'CNOT gate', 'Hadamard (H) gate'],
        correct: 3,
        explanation: 'The Hadamard gate transforms |0⟩ into (|0⟩+|1⟩)/√2, creating an equal superposition.',
      },
    ],
  },
  {
    id: 'states',
    label: 'State Prediction',
    icon: Brain,
    challenges: [
      {
        question: 'X gate applied to |0⟩ gives...',
        choices: ['|0⟩', '|1⟩', '(|0⟩ + |1⟩)/√2', '(|0⟩ − |1⟩)/√2'],
        correct: 1,
        explanation: 'The X gate is a bit flip — it swaps |0⟩ and |1⟩. So X|0⟩ = |1⟩.',
      },
      {
        question: 'H gate applied to |0⟩ gives...',
        choices: ['|0⟩', '|1⟩', '(|0⟩ + |1⟩)/√2', '(|0⟩ − |1⟩)/√2'],
        correct: 2,
        explanation: 'Hadamard creates equal superposition: H|0⟩ = (|0⟩ + |1⟩)/√2.',
      },
      {
        question: "What's the probability of measuring |0⟩ from the state 0.6|0⟩ + 0.8|1⟩?",
        choices: ['60%', '36%', '64%', '80%'],
        correct: 1,
        explanation: 'Probability = |amplitude|². P(|0⟩) = |0.6|² = 0.36 = 36%.',
      },
      {
        question: 'Z gate applied to |1⟩ gives...',
        choices: ['|0⟩', '|1⟩', '−|1⟩', '(|0⟩ − |1⟩)/√2'],
        correct: 2,
        explanation: 'The Z gate adds a phase of −1 to |1⟩: Z|1⟩ = −|1⟩. It leaves |0⟩ unchanged.',
      },
    ],
  },
  {
    id: 'misconceptions',
    label: 'Misconception Busters',
    icon: AlertTriangle,
    challenges: [
      {
        question: '"Qubits are in |0⟩ AND |1⟩ at the same time."',
        choices: ['True', 'False'],
        correct: 1,
        explanation: "False. Superposition isn't \"both at once\" — it's a fundamentally new kind of state with no classical analogue. The qubit has amplitudes for each outcome, but it isn't literally in two places.",
      },
      {
        question: '"Quantum computers are faster at everything."',
        choices: ['True', 'False'],
        correct: 1,
        explanation: 'False. Quantum speedup only applies to specific structured problems (factoring, searching, simulation). For most everyday tasks, classical computers are faster and cheaper.',
      },
      {
        question: '"Measuring a qubit destroys its superposition."',
        choices: ['True', 'False'],
        correct: 0,
        explanation: 'True. Measurement collapses the quantum state to a definite outcome (|0⟩ or |1⟩). The superposition is irreversibly lost — this is called wavefunction collapse.',
      },
      {
        question: '"You can copy an unknown quantum state."',
        choices: ['True', 'False'],
        correct: 1,
        explanation: "False. The no-cloning theorem proves it's mathematically impossible to copy an arbitrary unknown quantum state. This is a fundamental law of physics, not a technology limitation.",
      },
    ],
  },
]

/* ── ChallengeCard ───────────────────────────────────────────────────────── */

function ChallengeCard({ challenge, index }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = submitted && selected === challenge.correct

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
  }

  function handleRetry() {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`card transition-colors duration-300 ${
        submitted
          ? isCorrect
            ? 'border-green-800/40'
            : 'border-red-800/40'
          : 'border-slate-800'
      }`}
    >
      <p className="text-white font-medium text-sm sm:text-base mb-4 leading-relaxed">
        {challenge.question}
      </p>

      <div className="space-y-2 mb-4">
        {challenge.choices.map((choice, i) => {
          const isSelected = selected === i
          const isRight = i === challenge.correct
          const isWrong = submitted && isSelected && !isRight

          let style = 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
          if (isSelected && !submitted) style = 'border-indigo-500 bg-indigo-950/40'
          if (submitted && isRight) style = 'border-green-500/80 bg-green-950/25'
          if (isWrong) style = 'border-red-500/60 bg-red-950/20'

          let textStyle = 'text-slate-300'
          if (submitted && isRight) textStyle = 'text-green-300'
          if (isWrong) textStyle = 'text-red-300/80'
          if (submitted && !isRight && !isWrong) textStyle = 'text-slate-500'

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => !submitted && setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150
                ${style} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
              aria-label={`Choice: ${choice}`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex-1 transition-colors ${textStyle}`}>{choice}</span>
                {submitted && isRight && <Check className="w-4 h-4 text-green-400 flex-shrink-0" />}
                {isWrong && <X className="w-4 h-4 text-red-400/80 flex-shrink-0" />}
              </div>
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className={`btn-primary text-sm ${selected === null ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Check answer
        </button>
      ) : (
        <div>
          <div className={`rounded-xl p-3 text-sm mb-3 ${
            isCorrect
              ? 'bg-green-950/20 border border-green-800/30 text-green-300'
              : 'bg-red-950/20 border border-red-800/30 text-red-300'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              {isCorrect
                ? <Check className="w-4 h-4 text-green-400" />
                : <X className="w-4 h-4 text-red-400" />}
              <span className="font-semibold">{isCorrect ? 'Correct!' : 'Not quite.'}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">{challenge.explanation}</p>
          </div>
          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('circuits')
  const activeCat = CATEGORIES.find(c => c.id === activeTab)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 sm:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-slate-950 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" /> Home
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Mini Challenges
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            Test your quantum intuition with quick drills. No progress gating — jump in anywhere.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors border
                  ${activeTab === cat.id
                    ? 'bg-indigo-900/40 border-indigo-500/60 text-indigo-300'
                    : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600'}`}
                aria-label={`${cat.label} challenges`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Challenge cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {activeCat.challenges.map((ch, i) => (
              <ChallengeCard key={`${activeTab}-${i}`} challenge={ch} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
