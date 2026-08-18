import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const NOISE_OUTLINE = [
  { id: 'noise-ideal-vs-real', label: 'Ideal simulators vs. real hardware' },
  { id: 'noise-decoherence', label: 'Noise and decoherence' },
  { id: 'noise-nocloning', label: 'The no-cloning theorem' },
  { id: 'noise-repetition', label: 'Repetition-code intuition' },
  { id: 'noise-overhead', label: 'Why error correction is hard' },
  { id: 'noise-mistakes', label: 'Common mistakes' },
  { id: 'noise-next', label: 'Next steps' },
]

function NoiseSupport() {
  return (
    <>
      <RailCard label="Key Formulas" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-slate-300">F(t) = e<sup>&minus;t/T</sup></span>: exponential fidelity decay over time T (T1 or T2).</li>
          <li><span className="font-mono text-slate-300">p<sub>threshold</sub> &asymp; 1%</span>: the fault-tolerance threshold for surface codes.</li>
          <li><span className="font-mono text-slate-300">~1,000 : 1</span>: today's typical physical-to-logical qubit ratio.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="Reading Real Hardware Output">
        <ul className="space-y-2">
          <li>Noise is continuous, not just a measurement-time event — it accumulates as a circuit runs.</li>
          <li>No-cloning is a mathematical fact, not a hardware limitation that better engineering removes.</li>
          <li>Error correction protects a state without ever reading it directly.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/labs" className="btn-secondary justify-center">Review Qiskit Labs</Link>
          <Link to="/usecases" className="btn-ghost justify-center">Preview Use Cases</Link>
        </div>
      </RailCard>
    </>
  )
}

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
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5">
      <p className="section-label text-slate-400">Comparison</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Ideal Simulator vs. Real Hardware</h3>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
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
            Perfect 50/50 — no errors
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
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
            Noise creates "impossible" outcomes
          </p>
        </div>
      </div>
    </div>
  )
}

function DecoherenceVisual() {
  const [time, setTime] = useState(0)

  const t1 = 100
  const t2 = 60

  const fidelityT1 = Math.exp(-time / t1) * 100
  const fidelityT2 = Math.exp(-time / t2) * 100
  const combinedFidelity = Math.min(fidelityT1, fidelityT2)

  return (
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5">
      <p className="section-label text-slate-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Decoherence Over Time</h3>

      <div className="mt-4">
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

      <div className="mt-5 space-y-4">
        <div className="bg-slate-950/70 rounded-xl p-4">
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

        <div className="bg-slate-950/70 rounded-xl p-4">
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
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5">
      <p className="section-label text-slate-400">Comparison</p>
      <h3 className="mt-3 text-lg font-semibold text-white">What CNOT Can and Cannot Copy</h3>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-800/30 bg-slate-950/70 p-4">
          <p className="text-xs text-green-400 uppercase tracking-wider mb-3 font-medium text-center">
            Known basis state — works
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

        <div className="rounded-xl border border-red-800/30 bg-slate-950/70 p-4">
          <p className="text-xs text-red-400 uppercase tracking-wider mb-3 font-medium text-center">
            Unknown superposition — impossible
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
    </div>
  )
}

function RepetitionCodeVisual() {
  const [flipped, setFlipped] = useState(null)
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
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5 text-center">
      <p className="section-label text-slate-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Repetition Code — Click a Qubit to Flip It</h3>

      <p className="text-xs text-slate-500 mt-3 mb-3">
        Logical |0&#x27E9; encoded as |000&#x27E9;
      </p>

      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
        {displayed.map((q, i) => (
          <button
            key={i}
            onClick={() => handleFlip(i)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 font-mono text-xl sm:text-2xl
                        font-bold transition-all duration-200 flex items-center justify-center
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400
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
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5">
      <p className="section-label text-slate-400">Reference Table</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Physical-to-Logical Qubit Overhead</h3>

      <div className="mt-4 space-y-5">
        {ratios.map((r) => (
          <div key={r.label} className="bg-slate-950/70 rounded-xl p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-slate-300 font-medium">{r.label}</span>
              <span className="text-xs font-mono text-slate-400">
                {r.physical} : {r.logical}
              </span>
            </div>

            <div className="flex gap-1 mb-2 flex-wrap">
              {Array.from({ length: Math.min(r.physical, 50) }).map((_, j) => (
                <div key={j} className={`w-2 h-2 rounded-sm ${r.color}`} />
              ))}
              {r.physical > 50 && (
                <span className="text-xs text-slate-500 self-center ml-1">
                  +{r.physical - 50} more
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              {r.physical} physical qubits &rarr; 1 logical qubit
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
        <p className="text-sm text-slate-300">
          A useful quantum computer needs <strong className="text-white">millions</strong> of
          physical qubits to get <strong className="text-white">thousands</strong> of logical qubits.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Today's largest machines have ~1,000 physical qubits.
        </p>
      </div>
    </div>
  )
}

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Noise() {
  return (
    <ModuleLayout
      moduleId="noise"
      title="Noise & Hardware"
      subtitle="Why real qubits are hard — how noise, decoherence, and the no-cloning theorem shape what current hardware can and cannot do."
      prev={{ to: '/labs', label: 'Module 12: Qiskit Labs' }}
      next={{ to: '/usecases', label: 'Module 14: Use Cases' }}
      outline={NOISE_OUTLINE}
      aside={<NoiseSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Every circuit in the previous module ran on a noise-free simulator. Real hardware does not offer that
          guarantee: physical qubits lose energy, lose phase coherence, and produce measurement outcomes that an
          ideal circuit would never produce.
        </p>
        <p>
          This chapter quantifies that gap, states the{' '}
          <Keyword tone="unitary">no-cloning theorem</Keyword> that limits how errors can even be detected, and
          introduces the repetition-code idea behind quantum error correction &mdash; along with why its overhead
          is the central obstacle to useful, large-scale quantum computing today.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort simulating a circuit and reading measurement counts from Qiskit Labs.',
            'The Bell state and its ideal 50/50 measurement statistics.',
            'Basic familiarity with superposition and why measurement destroys it.',
          ]}
        >
          If simulated measurement statistics still feel unfamiliar, review{' '}
          <Link to="/labs" className="text-slate-300 transition-colors hover:text-white">
            Qiskit Labs
          </Link>{' '}
          before comparing them against the noisier statistics real hardware actually produces.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Explain why real hardware measurement statistics differ from ideal simulator output.</li>
            <li>Define T1 and T2 and estimate a fidelity loss from a given decoherence time.</li>
            <li>State the no-cloning theorem and its consequence for detecting errors.</li>
            <li>Explain why current physical-to-logical qubit overhead is so large.</li>
          </ul>
        </div>
      </div>

      <section id="noise-ideal-vs-real" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Ideal simulators vs. real hardware</h2>
        <p className="section-sub">
          A perfect simulator always returns the outcomes an ideal circuit predicts. Real quantum hardware
          introduces error at every step, and that error shows up directly in the measurement statistics.
        </p>

        <DefinitionBox term="Hardware Noise">
          <Keyword tone="qubit">Hardware noise</Keyword> refers to unwanted physical effects — stray bit flips,
          phase errors, and measurement mistakes — that cause a real device's output distribution to diverge from
          the distribution an ideal, noise-free circuit predicts.
        </DefinitionBox>

        <div className="mt-6">
          <IdealVsRealVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: The Same Bell Circuit, Two Outputs">
            <p>
              On a simulator: <span className="font-mono text-green-300">{'{"00": 500, "11": 500}'}</span>. On real
              hardware: <span className="font-mono text-amber-300">{'{"00": 472, "11": 481, "01": 28, "10": 19}'}</span>.
              The circuit is identical in both cases — the noise itself creates the outcomes that an ideal Bell
              state should never produce.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Seeing <span className="font-mono">|01&#x27E9;</span> or{' '}
            <span className="font-mono">|10&#x27E9;</span> from a Bell circuit on real hardware does not mean the
            circuit was built incorrectly. It is ordinary evidence of hardware noise, and it grows worse as
            circuits get deeper.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <VideoAside
            title="Mitigating Noise in Quantum Hardware — Part 1"
            description="A Qiskit Seminar Series talk on where noise comes from on real quantum hardware and how to work around it — a deeper companion to this section's introduction."
            source="Qiskit"
            videoId="Dv5cqB87nqk"
          />
        </div>

        <div className="mt-6">
          <MentorNote>
            If a SIGQuantum project's circuit ran cleanly on hardware last week and looks noisier today with
            no code changes, that is not automatically a sign something broke. Real devices are recalibrated
            regularly, and which specific qubits and gate pairs are noisiest can shift between calibration
            cycles — check the backend's current calibration data before assuming a regression in your code.
          </MentorNote>
        </div>
      </section>

      <section id="noise-decoherence" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Noise and decoherence</h2>
        <p className="section-sub">
          Two characteristic timescales, T1 and T2, describe how quickly a qubit's quantum information leaks into
          its environment even when no gate is being applied.
        </p>

        <DefinitionBox term="T1 and T2">
          T1 (relaxation) measures how quickly a qubit loses energy and falls toward{' '}
          <InlineMath>{'|0\\rangle'}</InlineMath>. T2 (dephasing) measures how quickly its relative phase
          information scrambles. Both processes drive{' '}
          <GlossaryTooltip term="Decoherence"><Keyword tone="unitary">decoherence</Keyword></GlossaryTooltip> as a
          circuit runs, whether or not a gate is actively applied.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="F(t) = e^(−t/T)">
            Fidelity decays exponentially with elapsed time <InlineMath>{'t'}</InlineMath>, where{' '}
            <InlineMath>{'T'}</InlineMath> is either T1 or T2. Longer circuits accumulate more decay before
            measurement.
          </NotationBox>
        </div>

        <div className="mt-6">
          <DecoherenceVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Estimating Fidelity Loss">
            <p>
              If T1 = 100&mu;s and a circuit takes 10&mu;s to run,{' '}
              <InlineMath>{'F = e^{-10/100} \\approx 0.90'}</InlineMath> — about 10% fidelity lost to relaxation
              alone, before accounting for T2 or gate errors. Deeper circuits lose proportionally more.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: how many gates fit before coherence is lost" label="Technical Aside">
            <p>
              T2 is always at most <InlineMath>{'2 \\cdot T1'}</InlineMath>, and dephasing is usually the dominant
              error source in practice. Current superconducting qubits typically have{' '}
              <InlineMath>{'T1 \\sim 50\\text{–}300\\,\\mu s'}</InlineMath>. With gate times around 20&ndash;50
              nanoseconds, that allows roughly 1,000&ndash;5,000 gates before coherence is effectively lost.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Decoherence is continuous, not something that only happens during measurement. A qubit sitting idle
            mid-circuit is still losing fidelity the entire time.
          </RemarkBox>
        </div>
      </section>

      <section id="noise-nocloning" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">The no-cloning theorem</h2>
        <p className="section-sub">
          Before error correction can be discussed, one constraint has to be stated precisely: an unknown quantum
          state cannot be copied, by any device, ever.
        </p>

        <DefinitionBox term="No-Cloning Theorem">
          No unitary operation can map an arbitrary, unknown state{' '}
          <InlineMath>{'|\\psi\\rangle'}</InlineMath> to two copies of itself,{' '}
          <InlineMath>{'|\\psi\\rangle|\\psi\\rangle'}</InlineMath>, for every possible{' '}
          <InlineMath>{'|\\psi\\rangle'}</InlineMath>. This is a proven mathematical consequence of the linearity
          of quantum mechanics, not a limitation of current technology.
        </DefinitionBox>

        <div className="mt-6">
          <NoCloningVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Why This Matters">
            <p>
              If arbitrary qubits could be cloned, entanglement-based protocols such as quantum key distribution
              could be broken by an eavesdropper silently copying transmitted qubits, and the uncertainty principle
              could be circumvented by measuring many copies of the same unknown state in different bases. Nature
              rules both out.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: proof sketch" label="Proof Sketch">
            <p>Suppose a unitary <InlineMath>{'U'}</InlineMath> could clone an arbitrary state:</p>
            <MathDisplay>{'U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle'}</MathDisplay>
            <p>
              For two states <InlineMath>{'|\\psi\\rangle'}</InlineMath> and{' '}
              <InlineMath>{'|\\phi\\rangle'}</InlineMath>, applying this to both and taking the inner product of the
              results gives:
            </p>
            <MathDisplay>{'\\langle\\psi|\\phi\\rangle = (\\langle\\psi|\\phi\\rangle)^2'}</MathDisplay>
            <p>
              This equation only holds when <InlineMath>{'\\langle\\psi|\\phi\\rangle = 0'}</InlineMath> (orthogonal
              states) or <InlineMath>{'\\langle\\psi|\\phi\\rangle = 1'}</InlineMath> (identical states). A general
              unitary cloning machine that works for every pair of states cannot exist.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the same limit behind the teleportation clarification in{' '}
            <Link to="/labs" className="text-slate-300 transition-colors hover:text-white">
              Qiskit Labs
            </Link>
            : teleportation can move a state to a new qubit, but it destroys the original in the process — it
            never produces a second, independent copy.
          </RemarkBox>
        </div>
      </section>

      <section id="noise-repetition" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Repetition-code intuition</h2>
        <p className="section-sub">
          Classical error correction has a simple answer to noise: redundancy and majority vote. The quantum
          version reuses that idea, with one essential modification forced by measurement.
        </p>

        <DefinitionBox term="Repetition Code">
          A classical <Keyword tone="unitary">repetition code</Keyword> stores a bit redundantly — 0 as 000, 1 as
          111 — so a single flipped bit can be identified and corrected by majority vote. The quantum version
          encodes <InlineMath>{'|0\\rangle'}</InlineMath> as <InlineMath>{'|000\\rangle'}</InlineMath> and{' '}
          <InlineMath>{'|1\\rangle'}</InlineMath> as <InlineMath>{'|111\\rangle'}</InlineMath> using CNOT gates.
        </DefinitionBox>

        <div className="mt-6">
          <RepetitionCodeVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Correcting a Single Flip">
            <p>
              Encode <InlineMath>{'|0\\rangle \\to |000\\rangle'}</InlineMath>. If noise flips qubit 2, the state
              becomes <InlineMath>{'|010\\rangle'}</InlineMath>. A{' '}
              <GlossaryTooltip term="Error Correction"><Keyword tone="unitary">syndrome measurement</Keyword></GlossaryTooltip>{' '}
              can detect "qubit 2 differs" and flip it back — without ever directly reading the logical value being
              protected.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The data qubits cannot simply be measured to check for errors, since measurement collapses the
            superposition being protected. Ancilla qubits carry out syndrome measurement instead, extracting only
            "which qubit disagrees," never the encoded value itself.
          </RemarkBox>
        </div>
      </section>

      <section id="noise-overhead" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Why error correction is hard</h2>
        <p className="section-sub">
          Real error-correcting codes need far more redundancy than three qubits, and that overhead — not
          algorithm design — is the single biggest barrier to large-scale, fault-tolerant quantum computing today.
        </p>

        <DefinitionBox term="Fault Tolerance">
          A quantum computer is <Keyword tone="unitary">fault-tolerant</Keyword> once its error correction is
          strong enough to run arbitrarily long computations reliably. The threshold theorem states that below a
          critical physical error rate, adding more physical qubits per logical qubit suppresses the logical error
          rate arbitrarily far.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="p_threshold ≈ 1%     p_L ~ (p / p_threshold)^(d/2)">
            Below the surface-code threshold of roughly 1%, increasing the code distance{' '}
            <InlineMath>{'d'}</InlineMath> exponentially suppresses the logical error rate{' '}
            <InlineMath>{'p_L'}</InlineMath>. Current best two-qubit gate error rates, around 0.1&ndash;0.5%, are
            close to this threshold but still require substantial overhead.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ErrorCorrectionVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="A Real Milestone">
            <p>
              Google's 2023 result showed a distance-5 surface code (49 physical qubits) outperforming a
              distance-3 code (17 physical qubits) — the first experimental demonstration that adding more qubits
              to a code actually reduces its logical error rate, rather than just adding overhead.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            "Fault-tolerant" and "useful today" are not the same claim. Current devices operate in the
            noisy, non-error-corrected regime — a constraint the next module takes as a given when surveying where
            quantum computing is and is not useful right now.
          </RemarkBox>
        </div>
      </section>

      <section id="noise-mistakes" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 6</p>
        <h2 className="section-heading">Common mistakes</h2>
        <p className="section-sub">
          Most confusion in this chapter comes from underestimating how fundamental these limits are, or from
          misreading noisy output as a sign of a broken circuit.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Assuming a Bell circuit producing |01⟩ or |10⟩ on hardware means the circuit was built incorrectly.',
              clarification:
                'An ideal Bell circuit is identical whether run on a simulator or real hardware. The unexpected outcomes come from noise, not from a logic error in the circuit itself.',
            },
            {
              mistake: 'Treating decoherence as something that only happens during measurement.',
              clarification:
                'T1 and T2 decay happen continuously while a qubit exists, including while it sits idle mid-circuit — not only at the moment it is read out.',
            },
            {
              mistake: 'Believing quantum error correction reads the data qubits directly to check for mistakes.',
              clarification:
                'Doing so would collapse the superposition being protected. Ancilla-based syndrome measurement extracts only which qubit disagrees, never the encoded value.',
            },
            {
              mistake: 'Treating the no-cloning theorem as a hardware gap that better engineering will eventually close.',
              clarification:
                'No-cloning is a proven mathematical consequence of the linearity of quantum mechanics. It cannot be engineered around, on any hardware, ever.',
            },
          ]}
        />
      </section>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Real hardware departs from ideal simulator statistics because of noise: unwanted bit flips, phase errors, and measurement mistakes.',
            "T1 (relaxation) and T2 (dephasing) characterize how quickly a qubit's fidelity decays, and both are finite — a practical limit on circuit depth.",
            'The no-cloning theorem proves an unknown quantum state cannot be copied — a mathematical fact, not an engineering limitation.',
            'Quantum error correction adapts the classical repetition-code idea using ancilla qubits, since directly measuring the data would destroy the superposition it protects.',
            'Below the fault-tolerance threshold, more physical qubits can suppress the logical error rate — but current overhead is roughly 1,000 physical qubits per logical qubit.',
          ]}
        />
      </div>

      <section id="noise-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Before You Claim It Works</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">From hardware limits to real applications</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The final module surveys where quantum computing offers genuine promise given today's noisy,
          non-fault-tolerant hardware — and where the honest answer is still "not yet, and possibly not soon."
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/usecases" className="btn-primary">
            Continue to Use Cases
          </Link>
          <Link to="/projects/bell-explorer" className="btn-secondary">
            Try Bell Explorer
          </Link>
          <Link to="/references" className="btn-secondary">
            Open References
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
