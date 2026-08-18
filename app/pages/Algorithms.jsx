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
import StuckPath from '../../components/StuckPath'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const ALGORITHMS_OUTLINE = [
  { id: 'algorithms-deutsch', label: 'Deutsch–Jozsa: one query beats two' },
  { id: 'algorithms-grover', label: "Grover's search: quadratic speedup" },
  { id: 'algorithms-kickback', label: 'Phase kickback: the shared engine' },
  { id: 'algorithms-shor', label: "Why Shor's algorithm matters" },
  { id: 'algorithms-advantage', label: 'Where quantum advantage actually lies' },
  { id: 'algorithms-mistakes', label: 'Common mistakes' },
  { id: 'algorithms-next', label: 'Next steps' },
]

function AlgorithmsSupport() {
  return (
    <>
      <RailCard label="Key Formulas" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-orange-300">|0&#x27E9; or |1&#x27E9;</span>: Deutsch&ndash;Jozsa's one-shot answer &mdash; constant or balanced.</li>
          <li><span className="font-mono text-orange-300">2|s&#x27E9;&#x27E8;s| &minus; I</span>: Grover's diffusion operator, reflecting about the mean.</li>
          <li><span className="font-mono text-orange-300">CU|+&#x27E9;|u&#x27E9; = ((|0&#x27E9;+e<sup>i&phi;</sup>|1&#x27E9;)/&radic;2)|u&#x27E9;</span>: phase kickback.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="Where the Speedup Actually Lives">
        <ul className="space-y-2">
          <li>Speedup type varies by algorithm: exponential (Shor), quadratic (Grover), none (most everyday tasks).</li>
          <li>Every algorithm in this chapter relies on interference and phase kickback, not brute-force parallel evaluation.</li>
          <li>Current hardware cannot yet run these algorithms at a cryptographically or commercially relevant scale.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/projects/algorithm-showdown" className="btn-secondary justify-center">Open Algorithm Showdown</Link>
          <Link to="/measurement" className="btn-ghost justify-center">Review Measurement & Basis</Link>
        </div>
      </RailCard>
    </>
  )
}

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
    <div className="rounded-2xl border border-orange-800/40 bg-orange-950/15 p-5">
      <p className="section-label text-orange-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Deutsch's Algorithm — One Query to Classify f</h3>

      <div className="mt-4 flex gap-2 justify-center">
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
          className="mt-5"
        >
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
      amps[target] = -amps[target]
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
    <div className="rounded-2xl border border-orange-800/40 bg-orange-950/15 p-5">
      <p className="section-label text-orange-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Grover's Search — Amplitude Amplification</h3>

      <div className="mt-4 flex justify-center gap-2">
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
          className="mt-4"
        >
          <div className="bg-slate-900/60 rounded-xl p-4 mb-4">
            <div className="flex items-end justify-center gap-1.5" style={{ height: '120px' }}>
              {amps.map((a, i) => {
                const height = Math.abs(a) / (maxAmp || 1) * 100
                const isTarget = i === target
                return (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-[28px] sm:max-w-[40px]">
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
              Items 0–7. Target = <span className="text-orange-400">5</span>. Height = probability amplitude.
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

function GroverQueryPredictReveal() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Predict Before You Reveal</p>
      <h3 className="mt-3 text-lg font-semibold text-white">A Smaller Database</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        The example above used <InlineMath>{'N = 1{,}000{,}000'}</InlineMath> entries. Using the same{' '}
        <InlineMath>{'\\sqrt{N}'}</InlineMath> relationship, predict roughly how many queries Grover's
        algorithm needs for a database of <InlineMath>{'N = 10{,}000'}</InlineMath> entries &mdash; and how
        many a classical worst-case search would need.
      </p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="btn-secondary mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Reveal Answer
        </button>
      ) : (
        <div className="mt-4 rounded-xl border border-orange-800/40 bg-orange-950/20 p-4 text-sm text-slate-300 leading-relaxed">
          Classical worst case is up to 10,000 lookups. Grover needs about{' '}
          <InlineMath>{'\\sqrt{10{,}000} = 100'}</InlineMath> queries &mdash; a hundredfold improvement,
          smaller than the thousandfold improvement at <InlineMath>{'N = 1{,}000{,}000'}</InlineMath>{' '}
          because the quadratic speedup scales with the square root, not with a fixed multiplier.
        </div>
      )}
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
      desc: 'The control qubit now carries the phase. Measure in the X basis to extract it.',
    },
  ]

  return (
    <div className="rounded-2xl border border-orange-800/40 bg-orange-950/15 p-5">
      <p className="section-label text-orange-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Phase Kickback — The Engine of Quantum Algorithms</h3>
      <div className="mt-4 space-y-4">
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
      task: 'Factor a 2048-bit number',
      classical: 'Longer than the age of the universe',
      quantum: 'Hours (with enough qubits)',
    },
    {
      task: 'Break RSA encryption',
      classical: 'Infeasible',
      quantum: 'Feasible with ~4000 logical qubits',
    },
    {
      task: 'Find the period of f(x)',
      classical: 'O(√N) — exhaustive trial',
      quantum: 'O((log N)³) — exponential speedup',
    },
  ]

  return (
    <div className="rounded-2xl border border-orange-800/40 bg-orange-950/15 p-5">
      <p className="section-label text-orange-400">Comparison Table</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Classical vs. Quantum, Task by Task</h3>
      <div className="mt-4 space-y-3">
        {comparisons.map((c) => (
          <div key={c.task} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <h4 className="text-sm font-semibold text-white mb-3">{c.task}</h4>
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
    </div>
  )
}

const ADVANTAGE_CATEGORY_STYLES = {
  green: { card: 'border-green-800/30', heading: 'text-green-400', pill: 'bg-green-900/30 border border-green-800/40 text-green-300' },
  amber: { card: 'border-amber-800/30', heading: 'text-amber-400', pill: 'bg-amber-900/30 border border-amber-800/40 text-amber-300' },
  red: { card: 'border-red-800/30', heading: 'text-red-400', pill: 'bg-red-900/30 border border-red-800/40 text-red-300' },
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
    <div className="rounded-2xl border border-orange-800/40 bg-orange-950/15 p-5">
      <p className="section-label text-orange-400">Reference Table</p>
      <h3 className="mt-3 text-lg font-semibold text-white">What Is (and Isn't) Sped Up</h3>
      <div className="mt-4 space-y-3">
        {categories.map(c => {
          const style = ADVANTAGE_CATEGORY_STYLES[c.color]
          return (
            <div key={c.label} className={`rounded-xl border bg-slate-950/70 p-4 ${style.card}`}>
              <h4 className={`text-sm font-semibold mb-3 ${style.heading}`}>{c.label}</h4>
              <div className="flex flex-wrap gap-2">
                {c.items.map(item => (
                  <span key={item} className={`px-2.5 py-1 rounded-full text-xs font-medium ${style.pill}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Algorithms() {
  return (
    <ModuleLayout
      moduleId="algorithms"
      title="Core Algorithms"
      subtitle="Why quantum beats classical, conceptually — and exactly where that advantage does and does not apply."
      prev={{ to: '/measurement', label: 'Module 10: Measurement & Basis' }}
      next={{ to: '/labs', label: 'Module 12: Qiskit Labs' }}
      outline={ALGORITHMS_OUTLINE}
      aside={<AlgorithmsSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Quantum algorithms do not speed up computing in general &mdash; they exploit{' '}
          <GlossaryTooltip term="Superposition"><Keyword tone="superposition">superposition</Keyword></GlossaryTooltip>{' '}
          and <GlossaryTooltip term="Interference"><Keyword tone="interference">interference</Keyword></GlossaryTooltip>{' '}
          for a small number of problems with the right mathematical structure. This chapter covers the four
          algorithms that best illustrate why, what mechanism they share, and where the resulting advantage
          actually applies.
        </p>
        <p>
          Deutsch&ndash;Jozsa and Grover's search are worked through concretely. Phase kickback, the shared
          mechanism behind both of them and behind Shor's algorithm, gets its own section. The chapter closes by
          separating genuine quantum advantage from tasks where quantum offers nothing at all.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with the Born rule and basis-dependent measurement.',
            'The Hadamard gate and how it converts between the Z and X bases.',
            'Reading a short circuit diagram left to right.',
          ]}
        >
          If basis-dependent measurement still feels unfamiliar, review{' '}
          <Link to="/measurement" className="text-orange-400 transition-colors hover:text-orange-300">
            Measurement & Basis
          </Link>{' '}
          before treating a phase difference as something a Z-basis measurement could ever reveal directly.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Explain why one query settles the Deutsch&ndash;Jozsa problem, and why the problem is artificial.</li>
            <li>Describe Grover's oracle-and-diffusion loop and state its query complexity.</li>
            <li>Explain phase kickback and identify it inside Deutsch&ndash;Jozsa, Grover, and Shor.</li>
            <li>Distinguish exponential, quadratic, and absent quantum speedup by example.</li>
          </ul>
        </div>
      </div>

      <section id="algorithms-deutsch" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Deutsch–Jozsa: one query beats two</h2>
        <p className="section-sub">
          Deutsch&ndash;Jozsa is the simplest proof that a quantum algorithm can be guaranteed faster than any
          classical one, not just faster on average.
        </p>

        <DefinitionBox term="Deutsch–Jozsa Problem">
          Given a function <InlineMath>{'f'}</InlineMath> promised to be either constant (the same output for
          every input) or balanced (different outputs for different inputs), determine which. Classically, this
          can require querying <InlineMath>{'f'}</InlineMath> twice in the one-bit case. Quantum mechanically, one
          query always suffices.
        </DefinitionBox>

        <div className="mt-6">
          <DeutschJozsaVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: One Query, Certain Answer">
            <MathDisplay>
              {'|0\\rangle \\xrightarrow{H} |+\\rangle \\xrightarrow{U_f} \\begin{cases} |+\\rangle & \\text{constant} \\\\ |-\\rangle & \\text{balanced} \\end{cases} \\xrightarrow{H} \\begin{cases} |0\\rangle \\\\ |1\\rangle \\end{cases}'}
            </MathDisplay>
            <p>
              Measuring <InlineMath>{'|0\\rangle'}</InlineMath> means <InlineMath>{'f'}</InlineMath> is constant;
              measuring <InlineMath>{'|1\\rangle'}</InlineMath> means it is balanced &mdash; with certainty, from a
              single query.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the exact gate-then-measure pattern from{' '}
            <Link to="/measurement" className="text-orange-400 transition-colors hover:text-orange-300">
              Measurement & Basis
            </Link>
            : the oracle writes its answer into relative phase, and the second Hadamard converts that phase into a
            directly measurable Z-basis outcome.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: the general n-bit case" label="Extension">
            <p>
              For an <InlineMath>{'n'}</InlineMath>-bit input, the classical worst case needs{' '}
              <InlineMath>{'2^{n-1} + 1'}</InlineMath> queries. The quantum algorithm still needs exactly one, an
              exponential separation. The promise that <InlineMath>{'f'}</InlineMath> is either constant or
              balanced is somewhat artificial &mdash; few real problems come with that guarantee.
            </p>
            <p className="mt-3">
              Its significance is conceptual: Deutsch&ndash;Jozsa was the first proof that a quantum algorithm
              could be provably, not just heuristically, faster than every classical algorithm. That result opened
              the door to Grover's search and Shor's factoring algorithm.
            </p>
          </ExpandableAside>
        </div>
      </section>

      <section id="algorithms-grover" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Grover's search: quadratic speedup</h2>
        <p className="section-sub">
          Grover's algorithm searches an unsorted list of <InlineMath>{'N'}</InlineMath> items in roughly{' '}
          <InlineMath>{'\\sqrt{N}'}</InlineMath> steps. It is not exponential, but the speedup is real and provably
          optimal for this problem.
        </p>

        <DefinitionBox term="Amplitude Amplification">
          Grover's algorithm repeats two steps: an{' '}
          <GlossaryTooltip term="Oracle"><Keyword tone="gate">oracle</Keyword></GlossaryTooltip> that flips the
          sign of the target's <GlossaryTooltip term="Amplitude"><Keyword tone="amplitude">amplitude</Keyword></GlossaryTooltip>,
          and a diffusion step that reflects every amplitude about their mean. Together they boost the target's
          probability toward 1 over roughly <InlineMath>{'\\sqrt{N}'}</InlineMath> repetitions.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="2|s⟩⟨s| − I">
            This is the diffusion operator, where <InlineMath>{'|s\\rangle'}</InlineMath> is the uniform
            superposition over all <InlineMath>{'N'}</InlineMath> items. Geometrically, it reflects the current
            state about <InlineMath>{'|s\\rangle'}</InlineMath>, which increases the component pointing toward the
            oracle-marked target.
          </NotationBox>
        </div>

        <div className="mt-6">
          <GroverVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Concrete Query Counts">
            <p>
              Searching a phone book with 1,000,000 entries: a classical search needs up to 1,000,000 lookups in
              the worst case, while Grover needs about 1,000 &mdash; roughly a thousandfold improvement. For a
              database of <InlineMath>{'10^9'}</InlineMath> entries, that becomes about 31,623 lookups instead of a
              billion.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <GroverQueryPredictReveal />
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: why Grover's algorithm is provably optimal" label="Theoretical Aside">
            <p>
              Bennett, Bernstein, Brassard, and Vazirani proved in 1997 that no quantum algorithm can search an
              unstructured space faster than <InlineMath>{'O(\\sqrt{N})'}</InlineMath>. Grover's algorithm meets
              this bound exactly, so no future quantum algorithm can do better on this specific problem.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The{' '}
            <Link to="/projects/algorithm-showdown" className="text-orange-400 transition-colors hover:text-orange-300">
              Algorithm Showdown project
            </Link>{' '}
            builds this oracle-and-diffusion circuit directly and compares its query count against classical
            linear search at several problem sizes.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <VideoAside
            title="Grover's Algorithm — Coding with Qiskit"
            description="A Qiskit walkthrough implementing Grover's search algorithm in code — a hands-on companion to this section's conceptual coverage."
            source="Qiskit"
            videoId="0RPFWZj7Jm0"
          />
        </div>
      </section>

      <section id="algorithms-kickback" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Phase kickback: the shared engine</h2>
        <p className="section-sub">
          Deutsch&ndash;Jozsa's oracle, Grover's oracle, and Shor's period-finding step all rely on the same
          underlying trick for writing information into phase rather than into the target qubit's value.
        </p>

        <DefinitionBox term="Phase Kickback">
          When a controlled-<InlineMath>{'U'}</InlineMath> gate acts on a target prepared in an eigenstate of{' '}
          <InlineMath>{'U'}</InlineMath>, the resulting eigenvalue &mdash; a phase &mdash; appears on the control
          qubit instead of changing the target. The target is left unchanged; the control carries the answer.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="CU|+⟩|u⟩ = ((|0⟩ + e^(iφ)|1⟩)/√2)|u⟩">
            Here <InlineMath>{'U|u\\rangle = e^{i\\phi}|u\\rangle'}</InlineMath>. The phase{' '}
            <InlineMath>{'e^{i\\phi}'}</InlineMath> has moved entirely onto the control qubit, which can then be
            measured &mdash; in the appropriate basis &mdash; to extract <InlineMath>{'\\phi'}</InlineMath>.
          </NotationBox>
        </div>

        <div className="mt-6">
          <PhaseKickbackVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: A Familiar Special Case">
            <p>
              Take <InlineMath>{'\\phi = \\pi'}</InlineMath>, so <InlineMath>{'U'}</InlineMath> acts like a phase
              flip. Kickback leaves the control qubit in{' '}
              <InlineMath>{'\\tfrac{|0\\rangle - |1\\rangle}{\\sqrt{2}}'}</InlineMath> &mdash; exactly the state{' '}
              <InlineMath>{'|-\\rangle'}</InlineMath> from the phase-detection example in Measurement & Basis. The
              same H-then-measure trick used there is how that phase gets read out.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: phase kickback in quantum phase estimation" label="Extension">
            <p>
              Quantum phase estimation (QPE) applies a sequence of controlled-<InlineMath>{'U'}</InlineMath> gates
              raised to increasing powers of 2, each kicking back a bit of phase information onto a separate
              control qubit. An inverse quantum Fourier transform then reads out the phase{' '}
              <InlineMath>{'\\phi'}</InlineMath> in binary. This is the core subroutine inside Shor's algorithm.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Once phase kickback is recognizable, Deutsch&ndash;Jozsa's oracle and Grover's oracle stop looking like
            two unrelated tricks &mdash; both are the same mechanism, applied to different problems.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <MentorNote>
            It's tempting to expect the target register to end up storing the function's output somewhere
            you can read it off directly. It doesn't — after kickback, measuring the target gives back
            exactly the state you prepared it in, with no directly readable trace of{' '}
            <InlineMath>{'f(x)'}</InlineMath>. All the new information moved into the relative phase of the
            control register instead.
          </MentorNote>
        </div>

        <div className="mt-6">
          <StuckPath type="implementation">
            <p>
              If the algebra of kickback makes sense but you can't picture how any of this becomes runnable
              code, that's an implementation gap, not an algorithms gap.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link to="/qiskit" className="btn-secondary">Review Qiskit</Link>
              <Link to="/labs" className="btn-secondary">Open Qiskit Labs</Link>
              <a
                href="https://quantum.cloud.ibm.com/learning/en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                IBM Quantum Learning
              </a>
            </div>
          </StuckPath>
        </div>
      </section>

      <section id="algorithms-shor" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Why Shor's algorithm matters</h2>
        <p className="section-sub">
          Shor's algorithm factors large integers exponentially faster than the best known classical method,
          which is why it is treated as a genuine long-term threat to RSA encryption.
        </p>

        <DefinitionBox term="Shor's Algorithm">
          Shor's algorithm reduces integer factoring to <em>period-finding</em>: finding the period{' '}
          <InlineMath>{'r'}</InlineMath> of <InlineMath>{'f(x) = a^x \\bmod N'}</InlineMath>. Quantum phase
          estimation finds <InlineMath>{'r'}</InlineMath> in polynomial time; classical computers are not known to
          be able to do this efficiently.
        </DefinitionBox>

        <div className="mt-6">
          <ShorVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: The Recipe">
            <p>
              To factor <InlineMath>{'N'}</InlineMath>: pick a random <InlineMath>{'a < N'}</InlineMath>, use QPE
              to find the period <InlineMath>{'r'}</InlineMath> of <InlineMath>{'f(x) = a^x \\bmod N'}</InlineMath>,
              then compute <InlineMath>{'\\gcd(a^{r/2} \\pm 1, N)'}</InlineMath> to recover the factors. Only the
              middle step is quantum; the rest is ordinary classical arithmetic.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: complexity and current hardware reality" label="Technical Aside">
            <p>
              Shor's algorithm needs <InlineMath>{'O((\\log N)^3)'}</InlineMath> quantum gates &mdash; polynomial
              in the number of digits. The best known classical algorithm, the general number field sieve, runs in
              sub-exponential time <InlineMath>{'e^{O((\\log N)^{1/3} (\\log \\log N)^{2/3})}'}</InlineMath>.
            </p>
            <p className="mt-3">
              The crossover point where quantum overtakes classical is estimated near 2048-bit numbers. Research
              demonstrations to date have factored numbers only up to about 21. Useful factoring at cryptographic
              scale is estimated to require on the order of 4000 error-corrected logical qubits &mdash; likely
              decades of hardware progress away.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            "Error-corrected logical qubit" is doing a lot of work in that estimate.{' '}
            <Link to="/noise" className="text-orange-400 transition-colors hover:text-orange-300">
              Noise & Hardware
            </Link>{' '}
            covers why a single logical qubit currently requires many physical qubits working together.
          </RemarkBox>
        </div>
      </section>

      <section id="algorithms-advantage" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Where quantum advantage actually lies</h2>
        <p className="section-sub">
          Quantum computers are not faster at everything. Knowing which category a problem falls into is as
          important as knowing the algorithms themselves.
        </p>

        <DefinitionBox term="Quantum Advantage">
          <Keyword tone="unitary">Quantum advantage</Keyword> requires three things at once: a problem with the
          right mathematical structure, enough error-corrected qubits to run the algorithm, and an algorithm that
          actually exploits that structure. Missing any one of the three, classical computing wins.
        </DefinitionBox>

        <div className="mt-6">
          <AdvantageVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="The Honest Picture">
            <p>
              Exponential speedup (factoring, quantum simulation, discrete logarithm) is rare and requires
              hardware far beyond today's. Quadratic speedup (unstructured search) is useful but not
              transformative. Everyday computing &mdash; sorting, arithmetic, most business logic &mdash; sees no
              quantum benefit at all, now or in principle.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: what quantum supremacy demonstrations actually showed" label="Context">
            <p>
              Widely reported "quantum supremacy" results (Google, 2019; IBM and others since) demonstrated tasks
              where a quantum device outperformed classical simulation &mdash; but the tasks were artificial
              sampling problems chosen for that comparison, not useful computations.
            </p>
            <p className="mt-3">
              The most promising near-term applications are quantum simulation of chemistry and materials, and
              optimization heuristics such as QAOA and VQE. These may reach practical advantage before
              fault-tolerant, error-corrected hardware exists at scale.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            <Link to="/usecases" className="text-orange-400 transition-colors hover:text-orange-300">
              Use Cases
            </Link>{' '}
            surveys these near-term application areas in more detail, including where the promise is strongest and
            where it remains unproven.
          </RemarkBox>
        </div>
      </section>

      <section id="algorithms-mistakes" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 6</p>
        <h2 className="section-heading">Common mistakes</h2>
        <p className="section-sub">
          Most misconceptions about quantum algorithms come from generalizing from one famous result to quantum
          computing as a whole.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Assuming every quantum algorithm gives an exponential speedup.',
              clarification:
                'Most problems get no speedup at all. Grover\'s search gives a quadratic speedup, and only a small class of structured problems — factoring, simulation, discrete log — are known to get an exponential one.',
            },
            {
              mistake: 'Thinking a single Deutsch–Jozsa query reveals every individual output of f.',
              clarification:
                'Interference answers only the global constant-versus-balanced question. It does not reveal f(0) or f(1) individually — that information is never extracted.',
            },
            {
              mistake: 'Believing current hardware can already run Shor\'s algorithm on cryptographically relevant numbers.',
              clarification:
                'Research demonstrations have factored numbers only up to about 21. Breaking real RSA keys is estimated to require on the order of 4000 error-corrected logical qubits, which does not yet exist.',
            },
            {
              mistake: 'Treating "quantum supremacy" demonstrations as proof of general quantum advantage.',
              clarification:
                'Those results used artificial sampling tasks selected specifically to be hard for classical simulation, not evidence of speedup on a useful computation.',
            },
          ]}
        />
      </section>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Deutsch–Jozsa proves quantum can be provably, not just probabilistically, faster for a specific problem: one query instead of up to 2ⁿ⁻¹ + 1.',
            "Grover's search gives a quadratic (√N) speedup for unstructured search, and this is provably optimal — no faster quantum algorithm exists for this problem.",
            'Phase kickback — a controlled-U eigenvalue landing on the control qubit instead of the target — is the shared mechanism behind Deutsch–Jozsa, Grover, and Shor.',
            "Shor's algorithm reduces factoring to period-finding and threatens RSA, but needs on the order of thousands of error-corrected logical qubits, far beyond current hardware.",
            'Quantum advantage is problem-specific: exponential for a few structured problems, quadratic for unstructured search, and absent for most everyday computing.',
          ]}
        />
      </div>

      <section id="algorithms-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Before You Implement</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">From theory to running code</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next module moves from algorithm structure to hands-on Qiskit practice: building, running, and
          interpreting the output of real circuits, including a small Grover implementation.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/labs" className="btn-primary">
            Continue to Qiskit Labs
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
