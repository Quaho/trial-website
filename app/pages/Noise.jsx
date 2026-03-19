import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'
import { useProgress } from '../../lib/hooks/useProgress'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function IdealVsRealVisual() {
  const idealData = [
    { label: '|00⟩', count: 500, pct: 50 },
    { label: '|11⟩', count: 500, pct: 50 },
    { label: '|01⟩', count: 0, pct: 0 },
    { label: '|10⟩', count: 0, pct: 0 },
  ]

  const realData = [
    { label: '|00⟩', count: 472, pct: 47.2 },
    { label: '|11⟩', count: 481, pct: 48.1 },
    { label: '|01⟩', count: 28, pct: 2.8 },
    { label: '|10⟩', count: 19, pct: 1.9 },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      {/* Ideal simulator */}
      <div className="card border-slate-700/30">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-4 text-center font-medium">
          Ideal Simulator
        </p>
        <div className="space-y-2.5">
          {idealData.map(d => (
            <div key={d.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">{d.label}</span>
                <span className="text-slate-400">{d.count}</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500/70 rounded-full transition-all duration-300"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-green-400 mt-3 text-center">
          Perfect 50/50 &mdash; no errors
        </p>
      </div>

      {/* Real hardware */}
      <div className="card border-slate-700/30">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-4 text-center font-medium">
          Real Hardware
        </p>
        <div className="space-y-2.5">
          {realData.map(d => (
            <div key={d.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">{d.label}</span>
                <span className="text-slate-400">{d.count}</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    d.pct > 10 ? 'bg-amber-500/70' : 'bg-red-500/70'
                  }`}
                  style={{ width: `${d.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-red-400 mt-3 text-center">
          Noise creates &ldquo;impossible&rdquo; outcomes
        </p>
      </div>
    </div>
  )
}

function DecoherenceVisual() {
  const [time, setTime] = useState(0)

  const t1 = 100 // μs
  const t2 = 60  // μs

  const fidelityT1 = Math.exp(-time / t1) * 100
  const fidelityT2 = Math.exp(-time / t2) * 100
  const combinedFidelity = Math.min(fidelityT1, fidelityT2)

  return (
    <div className="card border-slate-700/30 my-6">
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-4 text-center">
        Decoherence over time
      </p>

      {/* Slider */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>0 &mu;s</span>
          <span className="text-slate-300 font-medium">
            Time elapsed: {time} &mu;s
          </span>
          <span>200 &mu;s</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="w-full accent-slate-400"
          aria-label="Adjust time elapsed in microseconds"
        />
      </div>

      {/* Fidelity bars */}
      <div className="space-y-4">
        {/* T1 */}
        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="text-sm font-semibold text-amber-400">T1</span>
              <span className="text-xs text-slate-500 ml-2">Energy relaxation</span>
            </div>
            <span className="text-sm font-mono text-slate-300">
              {fidelityT1.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500/70 rounded-full transition-all duration-150"
              style={{ width: `${fidelityT1}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            T1 = {t1} &mu;s &mdash; qubit falls to |0&#x27E9;
          </p>
        </div>

        {/* T2 */}
        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="text-sm font-semibold text-violet-400">T2</span>
              <span className="text-xs text-slate-500 ml-2">Dephasing</span>
            </div>
            <span className="text-sm font-mono text-slate-300">
              {fidelityT2.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500/70 rounded-full transition-all duration-150"
              style={{ width: `${fidelityT2}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            T2 = {t2} &mu;s &mdash; phase information scrambles
          </p>
        </div>

        {/* Combined */}
        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-slate-300">Combined fidelity</span>
            <span className={`text-sm font-mono font-bold ${
              combinedFidelity > 70 ? 'text-green-400' :
              combinedFidelity > 30 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {combinedFidelity.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-150 ${
                combinedFidelity > 70 ? 'bg-green-500/70' :
                combinedFidelity > 30 ? 'bg-amber-500/70' : 'bg-red-500/70'
              }`}
              style={{ width: `${combinedFidelity}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function NoCloningVisual() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      {/* Known state — works */}
      <div className="card border-green-800/30">
        <p className="text-xs text-green-400 uppercase tracking-wider mb-3 font-medium text-center">
          Known basis state &mdash; works
        </p>
        <div className="bg-slate-900/60 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-900/30 border border-green-700/50
                            flex items-center justify-center font-mono text-green-300 text-sm">
              |0&#x27E9;
            </div>
            <div className="text-slate-500 text-lg">&rarr;</div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">
              CNOT
            </div>
            <div className="text-slate-500 text-lg">&rarr;</div>
            <div className="flex flex-col gap-1">
              <div className="w-12 h-10 rounded-lg bg-green-900/30 border border-green-700/50
                              flex items-center justify-center font-mono text-green-300 text-xs">
                |0&#x27E9;
              </div>
              <div className="w-12 h-10 rounded-lg bg-green-900/30 border border-green-700/50
                              flex items-center justify-center font-mono text-green-300 text-xs">
                |0&#x27E9;
              </div>
            </div>
          </div>
        </div>
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2 text-xs text-green-300">
            <span className="text-green-500 mt-0.5">&#x2713;</span>
            CNOT copies |0&#x27E9; &rarr; |00&#x27E9;
          </li>
          <li className="flex items-start gap-2 text-xs text-green-300">
            <span className="text-green-500 mt-0.5">&#x2713;</span>
            CNOT copies |1&#x27E9; &rarr; |11&#x27E9;
          </li>
        </ul>
      </div>

      {/* Unknown state — impossible */}
      <div className="card border-red-800/30">
        <p className="text-xs text-red-400 uppercase tracking-wider mb-3 font-medium text-center">
          Unknown superposition &mdash; impossible
        </p>
        <div className="bg-slate-900/60 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-900/30 border border-violet-700/50
                            flex items-center justify-center font-mono text-violet-300 text-xs">
              |&psi;&#x27E9;
            </div>
            <div className="text-slate-500 text-lg">&rarr;</div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-red-700/50 text-xs text-red-300 font-mono">
              Clone?
            </div>
            <div className="text-slate-500 text-lg">&rarr;</div>
            <div className="w-14 h-14 rounded-xl bg-red-950/30 border-2 border-dashed border-red-700/50
                            flex items-center justify-center text-red-400 text-xl font-bold">
              &#x2717;
            </div>
          </div>
        </div>
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2 text-xs text-red-300">
            <span className="text-red-500 mt-0.5">&#x2717;</span>
            Superpositions cannot be cloned
          </li>
          <li className="flex items-start gap-2 text-xs text-red-300">
            <span className="text-red-500 mt-0.5">&#x2717;</span>
            Proved mathematically impossible
          </li>
        </ul>
      </div>
    </div>
  )
}

function RepetitionCodeVisual() {
  const [flipped, setFlipped] = useState(null) // index of flipped qubit
  const [showVote, setShowVote] = useState(false)

  const logicalValue = 0
  const qubits = [logicalValue, logicalValue, logicalValue]

  const displayed = qubits.map((q, i) => (i === flipped ? (q === 0 ? 1 : 0) : q))
  const majorityVote = displayed.filter(q => q === 0).length >= 2 ? 0 : 1
  const corrected = majorityVote === logicalValue

  function handleFlip(i) {
    if (flipped === i) {
      setFlipped(null)
      setShowVote(false)
    } else {
      setFlipped(i)
      setShowVote(false)
    }
  }

  function handleVote() {
    setShowVote(true)
  }

  function handleReset() {
    setFlipped(null)
    setShowVote(false)
  }

  return (
    <div className="card border-slate-700/30 my-6 text-center">
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-4">
        Repetition code &mdash; click a qubit to flip it
      </p>

      {/* Encoding label */}
      <p className="text-xs text-slate-500 mb-3">
        Logical |0&#x27E9; encoded as |000&#x27E9;
      </p>

      {/* Qubit display */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
        {displayed.map((q, i) => (
          <button
            key={i}
            onClick={() => handleFlip(i)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 font-mono text-xl sm:text-2xl
                        font-bold transition-all duration-200 flex items-center justify-center
                        ${i === flipped
                          ? 'bg-red-950/30 border-red-500/60 text-red-300 scale-105'
                          : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-slate-500'
                        }`}
            aria-label={`Qubit ${i}: value ${q}. Click to ${i === flipped ? 'unflip' : 'flip'}`}
          >
            |{q}&#x27E9;
          </button>
        ))}
      </div>

      {/* Status */}
      {flipped !== null && (
        <div className="mb-4">
          <p className="text-sm text-red-400 mb-3">
            Qubit {flipped} was flipped by noise!
          </p>
          {!showVote ? (
            <button
              onClick={handleVote}
              className="btn-primary text-sm"
              aria-label="Run majority vote to correct the error"
            >
              Run majority vote
            </button>
          ) : (
            <div className={`inline-block px-5 py-3 rounded-xl border ${
              corrected
                ? 'bg-green-950/30 border-green-800/40'
                : 'bg-red-950/30 border-red-800/40'
            }`}>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                Majority vote: {displayed.join(', ')} &rarr; {majorityVote}
              </p>
              <p className={`text-sm font-semibold ${corrected ? 'text-green-300' : 'text-red-300'}`}>
                {corrected
                  ? 'Corrected! Original value recovered.'
                  : 'Too many errors to correct.'}
              </p>
            </div>
          )}
        </div>
      )}

      {flipped === null && (
        <p className="text-sm text-slate-500 mb-4">
          Click any qubit to simulate a noise-induced bit flip.
        </p>
      )}

      {/* Reset */}
      {flipped !== null && (
        <button
          onClick={handleReset}
          className="btn-ghost text-sm mt-2"
          aria-label="Reset repetition code"
        >
          Reset
        </button>
      )}
    </div>
  )
}

function ErrorCorrectionVisual() {
  const ratios = [
    { label: 'Current (~0.1% error)', physical: 1000, logical: 1, color: 'bg-red-500/70' },
    { label: 'Near-term (~0.01%)', physical: 100, logical: 1, color: 'bg-amber-500/70' },
    { label: 'Future (< 0.001%)', physical: 10, logical: 1, color: 'bg-green-500/70' },
  ]

  return (
    <div className="card border-slate-700/30 my-6">
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-4 text-center">
        Physical-to-logical qubit overhead
      </p>

      <div className="space-y-5">
        {ratios.map((r, i) => (
          <div key={i} className="bg-slate-900/60 rounded-xl p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-slate-300 font-medium">{r.label}</span>
              <span className="text-xs font-mono text-slate-400">
                {r.physical} : {r.logical}
              </span>
            </div>

            {/* Ratio visualization */}
            <div className="flex gap-1 mb-2 flex-wrap">
              {Array.from({ length: Math.min(r.physical, 50) }).map((_, j) => (
                <div
                  key={j}
                  className={`w-2 h-2 rounded-sm ${r.color}`}
                />
              ))}
              {r.physical > 50 && (
                <span className="text-xs text-slate-500 self-center ml-1">
                  +{r.physical - 50} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: Math.min(r.physical, 50) }).map((_, j) => (
                  <div key={j} className={`w-1.5 h-1.5 rounded-sm ${r.color} opacity-50`} />
                )).slice(0, 0)}
              </div>
              <span className="text-xs text-slate-500">
                {r.physical} physical qubits &rarr; 1 logical qubit
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
        <p className="text-sm text-slate-300">
          A useful quantum computer needs <strong className="text-white">millions</strong> of
          physical qubits to get <strong className="text-white">thousands</strong> of logical qubits.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Today&apos;s largest machines have ~1,000 physical qubits.
        </p>
      </div>
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Ideal vs Real Hardware',
    hook: 'Simulators Lie — Real Qubits Make Mistakes',
    hookSub: 'A perfect simulator always gives the right answer. Real quantum hardware does not.',
    visual: <IdealVsRealVisual />,
    bullets: [
      'Simulators give perfect results \u2014 real quantum computers don\u2019t.',
      'Real hardware has noise: unwanted bit flips, phase errors, and measurement mistakes.',
      'Today\u2019s quantum computers have 50\u20131000+ qubits, but noise limits useful circuit depth.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Bell state comparison:</strong> On a simulator:
        {' '}<span className="font-mono text-green-300">{'{"00": 500, "11": 500}'}</span>.
        On real hardware: <span className="font-mono text-amber-300">{'{"00": 472, "11": 481, "01": 28, "10": 19}'}</span>.
        The noise creates outcomes that should be impossible.</p>
      </div>
    ),
    quiz: {
      question: 'Why does real hardware produce outcomes like |01\u27E9 from a Bell state?',
      choices: [
        'The simulator is wrong',
        'Bell states always produce all outcomes',
        'Noise introduces errors during the computation',
        'The circuit was built incorrectly',
      ],
      correct: 2,
    },
  },
  {
    title: 'Noise and Decoherence',
    hook: 'Qubits Have an Expiration Date',
    hookSub: 'Every qubit is a ticking clock \u2014 its quantum information leaks away into the environment.',
    visual: <DecoherenceVisual />,
    bullets: [
      'T1 (relaxation): the qubit loses energy and falls to |0\u27E9, like a ball rolling downhill.',
      'T2 (dephasing): the qubit\u2019s phase information scrambles, like a spinning coin wobbling.',
      'Both happen spontaneously \u2014 the longer your circuit runs, the more errors accumulate.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Concrete numbers:</strong> If T1 = 100&mu;s and your
        circuit takes 10&mu;s, you lose about 10% fidelity to relaxation alone.
        Deeper circuits = more noise.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>T2 &le; 2&middot;T1 always. Dephasing is usually the dominant error source.
        Current superconducting qubits have T1 ~ 50&ndash;300&mu;s. Gate times are ~20&ndash;50ns,
        so you can run ~1,000&ndash;5,000 gates before coherence is lost.</p>
        <p>The fidelity decay follows an exponential:
        <InlineMath>{'F(t) = e^{-t/T}'}</InlineMath> where T is either T1 or T2.</p>
      </div>
    ),
    quiz: {
      question: 'What happens to a qubit as T2 time passes?',
      choices: [
        'It gains energy',
        'It splits into two qubits',
        'Its phase information scrambles',
        'It becomes entangled with nearby qubits',
      ],
      correct: 2,
    },
  },
  {
    title: 'No-Cloning Theorem',
    hook: 'You Cannot Copy a Qubit',
    hookSub: 'This isn\u2019t a technology limitation \u2014 it\u2019s a fundamental law of quantum mechanics.',
    visual: <NoCloningVisual />,
    bullets: [
      'You cannot copy an unknown quantum state \u2014 this is a fundamental law of physics.',
      'Cloning |0\u27E9 or |1\u27E9 works fine (just use CNOT). But cloning a superposition fails.',
      'This isn\u2019t a technology limitation \u2014 it\u2019s mathematically impossible, proven from linearity of quantum mechanics.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Why it matters:</strong> If you could clone qubits,
        you could break entanglement-based cryptography and violate the uncertainty principle.
        Nature prevents it.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Proof sketch &mdash; suppose a unitary U clones:</p>
        <MathDisplay>{'U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle'}</MathDisplay>
        <p>For two states <InlineMath>{'|\\psi\\rangle'}</InlineMath> and <InlineMath>{'|\\phi\\rangle'}</InlineMath>,
        taking inner products gives:</p>
        <MathDisplay>{'\\langle\\psi|\\phi\\rangle = (\\langle\\psi|\\phi\\rangle)^2'}</MathDisplay>
        <p>This only holds if <InlineMath>{'\\langle\\psi|\\phi\\rangle = 0'}</InlineMath> or{' '}
        <InlineMath>{'\\langle\\psi|\\phi\\rangle = 1'}</InlineMath>.
        So only orthogonal or identical states can be cloned.</p>
      </div>
    ),
    quiz: {
      question: 'Why can\u2019t you copy an arbitrary qubit state?',
      choices: [
        'Linearity of quantum mechanics makes it mathematically impossible',
        'We haven\u2019t built good enough hardware yet',
        'Qubits are too small to measure',
        'Entanglement prevents copying',
      ],
      correct: 0,
    },
  },
  {
    title: 'Repetition-Code Intuition',
    hook: 'Outvote the Noise',
    hookSub: 'The simplest error correction idea: store your bit three times and let majority rule.',
    visual: <RepetitionCodeVisual />,
    bullets: [
      'Classical repetition: store 0 as 000, store 1 as 111. If one bit flips, majority vote fixes it.',
      'Quantum version: encode |0\u27E9 as |000\u27E9 and |1\u27E9 as |111\u27E9 using CNOT gates.',
      'Can\u2019t just \u201Clook\u201D at qubits (measurement destroys superposition), so use ancilla qubits to detect errors without reading the data.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Error correction in action:</strong> Encode |0&#x27E9;
        &rarr; |000&#x27E9;. If noise flips qubit 2: |010&#x27E9;. Syndrome measurement detects
        &ldquo;qubit 2 differs&rdquo; and flips it back, without ever reading the actual value.</p>
      </div>
    ),
    quiz: {
      question: 'Why can\u2019t you just measure all qubits to check for errors?',
      choices: [
        'It takes too long',
        'The hardware can\u2019t measure individual qubits',
        'Measurement would collapse the superposition you\u2019re protecting',
        'The qubits are entangled',
      ],
      correct: 2,
    },
  },
  {
    title: 'Why Error Correction Is Hard',
    hook: 'One Logical Qubit Costs a Thousand',
    hookSub: 'The overhead of quantum error correction is staggering \u2014 and it\u2019s the biggest barrier to useful quantum computing.',
    visual: <ErrorCorrectionVisual />,
    bullets: [
      'Current error rates (~0.1\u20131%) require massive redundancy \u2014 roughly 1,000 physical qubits per logical qubit.',
      'Surface codes are the leading approach: qubits arranged in a 2D grid with syndrome measurements.',
      '\u201CFault-tolerant quantum computing\u201D means enough error correction to run arbitrarily long circuits. We\u2019re not there yet.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">A real milestone:</strong> Google&apos;s 2023 result showed
        that a distance-5 surface code (using 49 qubits) performed better than distance-3 (17 qubits)
        &mdash; the first time adding more qubits actually helped. This is a key milestone.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The <strong className="text-white">threshold theorem</strong> says if individual gate
        error rates are below a threshold (~1%), you can do arbitrarily long computations by adding
        more qubits.</p>
        <p>Current best 2-qubit gate error rates are ~0.1&ndash;0.5%, tantalizingly close but
        still requiring huge overhead. The surface code threshold is approximately:</p>
        <MathDisplay>{'p_{\\text{threshold}} \\approx 1\\%'}</MathDisplay>
        <p>Below this threshold, increasing the code distance d exponentially suppresses the
        logical error rate: <InlineMath>{'p_L \\sim (p/p_{\\text{th}})^{d/2}'}</InlineMath>.</p>
      </div>
    ),
    quiz: {
      question: 'Approximately how many physical qubits are needed for one logical qubit with current error rates?',
      choices: [
        '2',
        '10',
        '~1,000',
        '1 million',
      ],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Noise() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('noise', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['noise']) markDone('noise')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('noise', step)
  }

  return (
    <ModuleLayout
      moduleId="noise"
      title="Noise & Hardware"
      subtitle="Why real qubits are hard."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/labs', label: 'Module 11: Qiskit Labs' }}
      next={{ to: '/usecases', label: 'Module 13: Use Cases' }}
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
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 12 complete.</p>
              <p className="text-slate-400 text-sm mt-1">One module left &mdash; where quantum actually matters.</p>
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
