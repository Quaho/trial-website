import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'
import { useProgress } from '../../lib/hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../../lib/data/modules'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function VectorVisual() {
  return (
    <div className="my-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1 card text-center py-6">
        <p className="text-xs text-indigo-400 uppercase tracking-wider mb-3">Ket |ψ⟩ = column vector</p>
        <div className="font-mono text-2xl text-indigo-300 my-2">
          <MathDisplay>{'\\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}'}</MathDisplay>
        </div>
        <p className="text-xs text-slate-500 mt-2">Points "into" the computation</p>
      </div>
      <div className="hidden sm:flex items-center text-slate-600 font-bold text-2xl">→</div>
      <div className="flex-1 card text-center py-6">
        <p className="text-xs text-violet-400 uppercase tracking-wider mb-3">Bra ⟨ψ| = row vector</p>
        <div className="font-mono text-2xl text-violet-300 my-2">
          <MathDisplay>{'\\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix}'}</MathDisplay>
        </div>
        <p className="text-xs text-slate-500 mt-2">The "mirror" of the ket</p>
      </div>
    </div>
  )
}

function BasisStatesVisual() {
  return (
    <div className="my-6 flex gap-4 flex-col sm:flex-row">
      {[
        { label: '|0⟩', color: 'indigo', vec: ['1', '0'], desc: 'Classical 0 — north pole of Bloch sphere' },
        { label: '|1⟩', color: 'violet', vec: ['0', '1'], desc: 'Classical 1 — south pole of Bloch sphere' },
      ].map(({ label, color, vec, desc }) => (
        <div key={label} className={`flex-1 card text-center border-${color}-800/40`}>
          <div className={`text-xl font-mono text-${color}-300 mb-3`}>{label}</div>
          <div className={`inline-block bg-${color}-950/40 rounded-xl p-4 font-mono text-${color}-200 mb-3`}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 bg-${color}-900/60 border border-${color}-600 rounded-lg flex items-center justify-center text-lg`}>{vec[0]}</div>
              <div className={`w-10 h-10 bg-${color}-900/60 border border-${color}-600 rounded-lg flex items-center justify-center text-lg`}>{vec[1]}</div>
            </div>
          </div>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      ))}
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
      <p className="text-sm font-semibold text-white mb-1">Try it: State Explorer</p>
      <p className="text-xs text-slate-400 mb-4">Drag to set α. β is auto-calculated so |α|² + |β|² = 1.</p>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>α = {alpha.toFixed(3)}</span>
          <span>β = {beta.toFixed(3)}</span>
        </div>
        <input type="range" min="0" max="1" step="0.001" value={alpha}
          onChange={e => setAlpha(parseFloat(e.target.value))}
          className="w-full accent-indigo-500"
          aria-label={`Alpha amplitude: ${alpha.toFixed(3)}`} />
      </div>

      <div className="bg-slate-900 rounded-xl p-4 font-mono text-center text-base mb-4">
        <span className="text-indigo-300">|ψ⟩ = {alpha.toFixed(3)}</span>
        <span className="text-slate-500"> |0⟩ + </span>
        <span className="text-violet-300">{beta.toFixed(3)}</span>
        <span className="text-slate-500"> |1⟩</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { pct: p0, label: 'P(measuring 0)', color: 'indigo' },
          { pct: p1, label: 'P(measuring 1)', color: 'violet' },
        ].map(({ pct, label, color }) => (
          <div key={label} className={`bg-${color}-950/40 rounded-lg p-3 text-center`}>
            <div className={`text-2xl font-bold text-${color}-300`}>{pct}%</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-${color}-500 rounded-full transition-all duration-300`}
                   style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InnerProductVisual() {
  const examples = [
    { label: '⟨0|0⟩ = 1', desc: 'A state has 100% overlap with itself', math: '\\langle 0|0\\rangle = 1', badge: 'Self' },
    { label: '⟨0|1⟩ = 0', desc: '|0⟩ and |1⟩ are orthogonal — zero overlap', math: '\\langle 0|1\\rangle = 0', badge: 'Orthogonal' },
    { label: '⟨+|0⟩ = 1/√2', desc: '|+⟩ is "halfway" between the basis states', math: '\\langle +|0\\rangle = \\tfrac{1}{\\sqrt{2}}', badge: 'Partial' },
    { label: '|⟨φ|ψ⟩|² = P', desc: 'Squared magnitude = measurement probability', math: 'P(\\phi) = |\\langle \\phi | \\psi \\rangle|^2', badge: 'Key Rule' },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {examples.map(({ label, desc, math, badge }) => (
        <div key={label} className="card">
          <div className="flex justify-between items-start mb-1">
            <code className="text-indigo-300 font-mono text-sm">{label}</code>
            <span className="badge bg-slate-800 text-slate-400 text-xs">{badge}</span>
          </div>
          <p className="text-slate-400 text-xs mb-2">{desc}</p>
          <div className="text-center bg-slate-900/50 rounded-lg py-2">
            <InlineMath>{math}</InlineMath>
          </div>
        </div>
      ))}
    </div>
  )
}

function CheatSheetVisual() {
  const items = [
    { sym: '|ψ⟩', name: 'Ket', desc: 'Quantum state (column vector)' },
    { sym: '⟨ψ|', name: 'Bra', desc: 'Conjugate transpose (row vector)' },
    { sym: '⟨φ|ψ⟩', name: 'Inner product', desc: 'Overlap between two states' },
    { sym: '|0⟩, |1⟩', name: 'Basis kets', desc: 'Classical 0 and 1 analogs' },
    { sym: '|+⟩, |−⟩', name: 'Superposition kets', desc: '(|0⟩±|1⟩)/√2' },
    { sym: 'α, β', name: 'Amplitudes', desc: 'Complex; |α|²+|β|²=1' },
  ]
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-700">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-700 bg-slate-900/50">
            <th className="py-2.5 px-4 text-left text-slate-500 font-medium">Symbol</th>
            <th className="py-2.5 px-4 text-left text-slate-500 font-medium">Name</th>
            <th className="py-2.5 px-4 text-left text-slate-500 font-medium">Meaning</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {items.map(({ sym, name, desc }) => (
            <tr key={sym} className="hover:bg-slate-800/20">
              <td className="py-2.5 px-4 font-mono text-indigo-300 text-base">{sym}</td>
              <td className="py-2.5 px-4 text-slate-300 font-medium">{name}</td>
              <td className="py-2.5 px-4 text-slate-400">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Kets — Writing Quantum States',
    hook: 'A ket |ψ⟩ is just a column vector with a fancy bracket.',
    bullets: [
      '|0⟩ and |1⟩ are the two basis states — quantum analogs of classical 0 and 1.',
      'Any qubit state is a mix: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers.',
      'The rule: |α|² + |β|² = 1. Probabilities always sum to 100%.',
    ],
    visual: <BasisStatesVisual />,
    example: (
      <div>
        <MathDisplay>{'|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">In plain English: "|ψ⟩ has amplitude α for 0 and amplitude β for 1."</p>
      </div>
    ),
    quiz: {
      question: 'For a valid qubit state α|0⟩ + β|1⟩, what must be true?',
      choices: [
        'α and β must be positive real numbers',
        '|α|² + |β|² = 1',
        'α + β = 1',
        'α and β must be equal',
      ],
      correct: 1,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>α and β are complex numbers, not just real numbers. This means they have both a
        magnitude and a phase angle. The probability of measuring 0 is |α|² (magnitude squared),
        which is always a real positive number.</p>
        <p>This distinction — amplitudes (complex) vs probabilities (real, non-negative) — is
        the key to understanding interference. Negative or imaginary amplitudes can cancel each
        other, something probabilities can never do.</p>
      </div>
    ),
  },
  {
    title: 'Explore the State Space',
    hook: 'Drag the slider to see how amplitudes control measurement probabilities.',
    bullets: [
      'At α=1, β=0: the state is pure |0⟩. You always measure 0.',
      'At α=0.707, β=0.707: equal superposition. 50/50 chance of 0 or 1.',
      'At α=0, β=1: the state is pure |1⟩. You always measure 1.',
    ],
    visual: <StateExplorer />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">The equal superposition state</strong> α = β = 1/√2 ≈ 0.707 is written |+⟩.
        It's what you get when you apply a Hadamard gate to |0⟩. You'll see it everywhere in quantum computing.</p>
      </div>
    ),
    quiz: {
      question: 'If α = 0 and β = 1, what happens when you measure the qubit?',
      choices: [
        'You get 0 with 100% probability',
        'You get 1 with 100% probability',
        'You get 0 or 1 with equal probability',
        'The qubit stays in superposition',
      ],
      correct: 1,
    },
  },
  {
    title: 'Bras — The Mirror Image',
    hook: 'A bra ⟨ψ| is the conjugate transpose of a ket — a row vector.',
    bullets: [
      'Every ket has a matching bra. |ψ⟩ → ⟨ψ|.',
      'Bra = row vector with complex-conjugated entries (α → α*).',
      'Together, "bra" + "ket" = "braket" — Dirac\'s pun on "bracket."',
    ],
    visual: <VectorVisual />,
    example: (
      <div>
        <MathDisplay>{'\\langle 0| = \\begin{pmatrix} 1 & 0 \\end{pmatrix} \\qquad \\langle 1| = \\begin{pmatrix} 0 & 1 \\end{pmatrix}'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">For real amplitudes, the bra is just the ket turned sideways.</p>
      </div>
    ),
    quiz: {
      question: 'What is ⟨ψ| (a bra)?',
      choices: [
        'The same as |ψ⟩, just written differently',
        'The conjugate transpose of |ψ⟩ — a row vector',
        'The probability of measuring ψ',
        'The inverse of the ket',
      ],
      correct: 1,
    },
  },
  {
    title: 'Inner Products & Overlap',
    hook: '⟨φ|ψ⟩ measures how "similar" two quantum states are.',
    bullets: [
      'The inner product combines a bra with a ket to give a single number.',
      '⟨0|1⟩ = 0: the basis states are orthogonal — completely different.',
      '|⟨φ|ψ⟩|² gives the probability of measuring |φ⟩ when the state is |ψ⟩.',
    ],
    visual: <InnerProductVisual />,
    example: (
      <div>
        <CheatSheetVisual />
      </div>
    ),
    quiz: {
      question: 'What is ⟨0|1⟩?',
      choices: ['1', '0', '1/√2', '-1'],
      correct: 1,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The inner product ⟨φ|ψ⟩ is computed as: multiply each component of ⟨φ| (conjugated)
        by the corresponding component of |ψ⟩, then sum. For real amplitudes, this is just the
        standard dot product.</p>
        <p>Orthogonal states (inner product = 0) are "distinguishable" — a measurement can tell
        them apart with certainty. Non-orthogonal states always have some ambiguity.</p>
      </div>
    ),
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function BraKet() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('braket', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['braket']) markDone('braket')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('braket', step)
  }

  return (
    <ModuleLayout
      moduleId="braket"
      title="Bra-Ket Notation"
      subtitle="The language of quantum states — vectors with style."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/intuition', label: 'Module 1: Intuition' }}
      next={{ to: '/phase', label: 'Module 3: Phase & Angles' }}
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
            bulletStyle={MODULE_LAYOUT_STYLES.braket.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-green-300 font-semibold">Module 2 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 3 to learn about phase angles.</p>
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
