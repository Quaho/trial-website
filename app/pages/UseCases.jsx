import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
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

const USECASES_OUTLINE = [
  { id: 'usecases-chemistry', label: 'Chemistry & materials' },
  { id: 'usecases-optimization', label: 'Optimization' },
  { id: 'usecases-cryptography', label: 'Cryptography' },
  { id: 'usecases-ml', label: 'Machine learning: promise vs. reality' },
  { id: 'usecases-limitations', label: 'Current limitations' },
  { id: 'usecases-mistakes', label: 'Common mistakes' },
  { id: 'usecases-next', label: 'Where to go from here' },
]

function UseCasesSupport() {
  return (
    <>
      <RailCard label="Key Numbers" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-lime-300">~2,000</span> logical qubits: estimated cost of simulating FeMoCo.</li>
          <li><span className="font-mono text-lime-300">~4,000</span> logical qubits (~4M physical): estimated cost of breaking RSA-2048.</li>
          <li><span className="font-mono text-lime-300">~1,000x / ~100x</span>: today's gap in qubit count / error rate versus fault-tolerant hardware.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="What To Keep Straight">
        <ul className="space-y-2">
          <li>Every claim in this chapter is qualified by a timeline — "promising" is not the same as "available now."</li>
          <li>Quantum advantage is problem-specific, not a blanket property of quantum computers.</li>
          <li>The honest picture is more useful than the exciting one.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/roadmap" className="btn-secondary justify-center">Review Study Paths</Link>
          <Link to="/glossary" className="btn-ghost justify-center">Open Glossary</Link>
        </div>
      </RailCard>
    </>
  )
}

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function ChemistryVisual() {
  const [selected, setSelected] = useState(null)

  const molecules = [
    {
      name: 'H₂',
      formula: 'Hydrogen',
      qubits: 2,
      difficulty: 'easy',
      color: 'bg-green-500/70',
      barWidth: '6%',
      classical: 'Classically easy',
      desc: 'Just 2 electrons. A classical laptop can simulate this exactly.',
    },
    {
      name: 'Caffeine',
      formula: 'C₈H₁₀N₄O₂',
      qubits: 160,
      difficulty: 'hard',
      color: 'bg-amber-500/70',
      barWidth: '45%',
      classical: 'Classically hard',
      desc: '~160 qubits needed. Beyond exact classical simulation, but approximate methods exist.',
    },
    {
      name: 'FeMoCo',
      formula: 'Fe₇MoS₉C',
      qubits: 2000,
      difficulty: 'impossible',
      color: 'bg-red-500/70',
      barWidth: '100%',
      classical: 'Classically impossible',
      desc: '~2,000 logical qubits. Would need ~10⁴⁸ classical bits. Key to nitrogen fixation.',
    },
  ]

  return (
    <div className="rounded-2xl border border-lime-800/40 bg-lime-950/15 p-5">
      <p className="section-label text-lime-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Molecular Simulation — Complexity vs. Qubits</h3>

      <div className="mt-4 space-y-3">
        {molecules.map((mol, i) => (
          <button
            key={mol.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`w-full text-left rounded-xl p-4 transition-colors border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${selected === i
                ? 'bg-lime-900/30 border-lime-600/50 focus-visible:outline-lime-400'
                : 'bg-slate-900/60 border-slate-700/40 hover:border-slate-600/60 focus-visible:outline-slate-400'}`}
            aria-label={`View details for ${mol.name}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lime-300 font-bold text-lg">{mol.name}</span>
                <span className="text-xs text-slate-500">{mol.formula}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border
                ${mol.difficulty === 'easy'
                  ? 'bg-green-900/30 border-green-700/40 text-green-400'
                  : mol.difficulty === 'hard'
                    ? 'bg-amber-900/30 border-amber-700/40 text-amber-400'
                    : 'bg-red-900/30 border-red-700/40 text-red-400'}`}>
                {mol.classical}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${mol.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: mol.barWidth }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              </div>
              <span className="text-xs text-slate-400 font-mono w-20 text-right">
                ~{mol.qubits.toLocaleString()} qubits
              </span>
            </div>

            <AnimatePresence>
              {selected === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-slate-400 mt-3"
                >
                  {mol.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        Click a molecule to learn more. Every electron roughly doubles the classical cost.
      </p>
    </div>
  )
}

function OptimizationVisual() {
  const [approach, setApproach] = useState('classical')

  const landscapePoints = [3, 5, 2, 7, 4, 8, 3, 6, 2, 9, 5, 4, 6, 3, 7, 4]

  const classicalPos = 7
  const quantumPos = 9

  const currentPos = approach === 'classical' ? classicalPos : quantumPos

  return (
    <div className="rounded-2xl border border-lime-800/40 bg-lime-950/15 p-5">
      <p className="section-label text-lime-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Optimization Landscape — Classical vs. Quantum Search</h3>

      <div className="mt-4 flex gap-2 justify-center">
        {[
          { key: 'classical', label: 'Classical' },
          { key: 'quantum', label: 'Quantum' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setApproach(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${approach === key
                ? 'bg-lime-900/40 border-lime-500/60 text-lime-300 focus-visible:outline-lime-400'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`Show ${label} approach`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative bg-slate-900/60 rounded-xl p-4 mt-4">
        <div className="flex items-end gap-[2px] h-32 justify-center">
          {landscapePoints.map((val, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {i === currentPos && (
                <motion.div
                  initial={{ y: -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-xs mb-1 ${approach === 'classical' ? 'text-amber-400' : 'text-lime-400'}`}
                >
                  {approach === 'classical' ? '▼ stuck' : '▼ best'}
                </motion.div>
              )}
              <motion.div
                className={`w-4 sm:w-5 rounded-t transition-colors
                  ${i === currentPos
                    ? approach === 'classical'
                      ? 'bg-amber-500/80'
                      : 'bg-lime-500/80'
                    : 'bg-slate-700/60'}`}
                initial={{ height: 0 }}
                animate={{ height: `${val * 12}px` }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={approach}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="text-center mt-4"
        >
          {approach === 'classical' ? (
            <div>
              <p className="text-sm text-amber-400 font-medium">Classical: stuck in a local minimum</p>
              <p className="text-xs text-slate-500 mt-1">
                Gradient descent gets trapped. It cannot "see" past the surrounding hills.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-lime-400 font-medium">Quantum: can tunnel through barriers</p>
              <p className="text-xs text-slate-500 mt-1">
                Quantum tunneling and superposition help explore more broadly — but the speedup is modest, not exponential.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CryptographyVisual() {
  const [panel, setPanel] = useState('threat')

  return (
    <div className="rounded-2xl border border-lime-800/40 bg-lime-950/15 p-5">
      <p className="section-label text-lime-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Quantum Cryptography — Threat and Opportunity</h3>

      <div className="mt-4 flex gap-2 justify-center">
        {[
          { key: 'threat', label: 'Threat' },
          { key: 'opportunity', label: 'Opportunity' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPanel(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${panel === key
                ? key === 'threat'
                  ? 'bg-red-900/30 border-red-500/50 text-red-300 focus-visible:outline-red-400'
                  : 'bg-green-900/30 border-green-500/50 text-green-300 focus-visible:outline-green-400'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white focus-visible:outline-slate-400'}`}
            aria-label={`View ${label} panel`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={panel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-4"
        >
          {panel === 'threat' ? (
            <div className="bg-red-950/20 rounded-xl border border-red-800/30 p-5">
              <h4 className="text-red-400 font-semibold text-sm mb-3">Shor's Algorithm Breaks RSA</h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-red-900/40 border border-red-700/40 flex items-center justify-center text-red-400 text-lg font-bold shrink-0">
                    N
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">RSA-2048</p>
                    <p className="text-xs text-slate-500">Current internet encryption standard</p>
                  </div>
                </div>

                <div className="text-center text-slate-600 text-sm">&darr; Shor's algorithm</div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500 mb-1">Qubits needed</p>
                    <p className="text-red-400 font-mono font-bold">~4,000</p>
                    <p className="text-xs text-slate-600">logical</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500 mb-1">Physical qubits</p>
                    <p className="text-red-400 font-mono font-bold">~4M</p>
                    <p className="text-xs text-slate-600">with error correction</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  Timeline: 10&ndash;30+ years. Current machines: ~1,000 noisy qubits.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-950/20 rounded-xl border border-green-800/30 p-5">
              <h4 className="text-green-400 font-semibold text-sm mb-3">Quantum Key Distribution (QKD)</h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-green-900/40 border border-green-700/40 flex items-center justify-center text-green-400 text-lg shrink-0">
                    &#x1F511;
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">Physics-based security</p>
                    <p className="text-xs text-slate-500">Eavesdropping disturbs quantum states — always detected</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-green-400">Alice</span>
                    <span className="text-xs text-slate-600">&rarr; quantum channel &rarr;</span>
                    <span className="text-xs text-green-400">Bob</span>
                  </div>
                  <div className="h-1 bg-green-500/30 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 w-4 bg-green-400/60 rounded-full"
                      animate={{ x: [0, 200, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Any interception changes the quantum states — Alice and Bob detect the eavesdropper.
                  </p>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  Post-quantum cryptography (classical, quantum-resistant algorithms) is also being standardized by NIST.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function MLRealityVisual() {
  const categories = [
    {
      name: 'Data Loading',
      level: 15,
      label: 'Major Bottleneck',
      color: 'bg-red-500/70',
      textColor: 'text-red-400',
      desc: 'Loading N data points takes O(N) — same as classical just reading the data.',
    },
    {
      name: 'Kernel Methods',
      level: 35,
      label: 'Theoretical Only',
      color: 'bg-amber-500/70',
      textColor: 'text-amber-400',
      desc: "Quantum kernels exist but haven't beaten classical ML on real-world tasks.",
    },
    {
      name: 'QML Training',
      level: 25,
      label: 'Unclear Advantage',
      color: 'bg-amber-500/70',
      textColor: 'text-amber-400',
      desc: 'Variational circuits face barren plateaus and trainability issues.',
    },
    {
      name: 'Quantum Data',
      level: 65,
      label: 'Promising',
      color: 'bg-green-500/70',
      textColor: 'text-green-400',
      desc: 'Quantum ML for quantum data (chemistry, materials) bypasses the input bottleneck.',
    },
  ]

  const [expanded, setExpanded] = useState(null)

  return (
    <div className="rounded-2xl border border-lime-800/40 bg-lime-950/15 p-5">
      <p className="section-label text-lime-400">Interactive Diagram</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Quantum ML Realism Meter</h3>

      <div className="mt-4 flex items-center justify-center gap-4 mb-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/70" /> Overhyped
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500/70" /> Uncertain
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500/70" /> Promising
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left bg-slate-900/60 rounded-xl p-4 border border-slate-700/40 hover:border-slate-600/60 transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            aria-label={`View details for ${cat.name}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-medium">{cat.name}</span>
              <span className={`text-xs ${cat.textColor}`}>{cat.label}</span>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${cat.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${cat.level}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-slate-400 mt-3"
                >
                  {cat.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        Click a category to learn more. Bar length = realism of near-term advantage.
      </p>
    </div>
  )
}

function LimitationsVisual() {
  const metrics = [
    {
      label: 'Qubits Available',
      value: '1,000+',
      sub: 'Noisy, physical qubits',
      color: 'text-lime-400 border-lime-700/40 bg-lime-900/20',
    },
    {
      label: 'Gate Error Rate',
      value: '~0.1–1%',
      sub: 'Per two-qubit gate',
      color: 'text-amber-400 border-amber-700/40 bg-amber-900/20',
    },
    {
      label: 'Useful Depth',
      value: '~100',
      sub: 'Gate layers before noise dominates',
      color: 'text-sky-400 border-sky-700/40 bg-sky-900/20',
    },
    {
      label: 'Fault-Tolerant',
      value: '10–20+ yr',
      sub: 'Estimated timeline',
      color: 'text-violet-400 border-violet-700/40 bg-violet-900/20',
    },
  ]

  return (
    <div className="rounded-2xl border border-lime-800/40 bg-lime-950/15 p-5">
      <p className="section-label text-lime-400">Reference Table</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Current State of Quantum Computing — Key Metrics</h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`rounded-xl border p-4 text-center ${m.color}`}
          >
            <p className="text-xl font-bold font-mono">{m.value}</p>
            <p className="text-xs text-white/80 font-medium mt-1">{m.label}</p>
            <p className="text-xs text-slate-500 mt-1">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 bg-slate-900/60 rounded-xl p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Current NISQ era</span>
          <span className="text-slate-400">Fault-tolerant era</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-lime-500/70 to-lime-500/20 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '18%' }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-[18%] w-2 h-2 rounded-full bg-lime-400 border-2 border-slate-900" />
        </div>
        <p className="text-xs text-slate-500 text-center mt-2">
          We are here. The gap is roughly 1,000x in qubits and 100x in error reduction.
        </p>
      </div>
    </div>
  )
}

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function UseCases() {
  return (
    <ModuleLayout
      moduleId="usecases"
      title="Use Cases"
      subtitle="Where quantum matters, and where it doesn't — an honest, timeline-aware survey of near-term applications."
      prev={{ to: '/noise', label: 'Module 13: Noise & Hardware' }}
      next={null}
      outline={USECASES_OUTLINE}
      aside={<UseCasesSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          The previous module established that today's hardware is noisy and far from fault-tolerant. This
          chapter takes that constraint as given and asks a more practical question: given the hardware that
          actually exists, where does quantum computing offer genuine promise, and where does it not?
        </p>
        <p>
          Four application areas are covered &mdash; chemistry, optimization, cryptography, and machine learning
          &mdash; followed by an honest summary of current limitations. Each area gets the same treatment: what
          the claim is, what evidence actually supports it, and what timeline is realistic.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'The distinction between exponential, quadratic, and absent quantum speedup from Core Algorithms.',
            "Noise & Hardware's account of why current devices are noisy and non-error-corrected.",
            'Basic familiarity with what a logical, error-corrected qubit costs in physical qubits.',
          ]}
        >
          If the speedup categories still feel unfamiliar, review{' '}
          <Link to="/algorithms" className="text-lime-400 transition-colors hover:text-lime-300">
            Core Algorithms
          </Link>{' '}
          before treating any claim in this chapter as evidence of a blanket quantum advantage.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Explain why simulating molecules is a natural fit for quantum computers.</li>
            <li>Describe the current state and limits of quantum optimization approaches.</li>
            <li>State the cryptographic threat from Shor's algorithm and the near-term physics-based alternative.</li>
            <li>Identify the main bottleneck limiting quantum machine learning on classical data.</li>
          </ul>
        </div>
      </div>

      <section id="usecases-chemistry" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Chemistry & materials</h2>
        <p className="section-sub">
          Molecules are themselves quantum systems, which makes molecular simulation the application area with the
          clearest theoretical case for quantum advantage.
        </p>

        <DefinitionBox term="Quantum Simulation">
          Simulating a molecule classically requires resources that grow exponentially with its number of
          electrons, largely because of the{' '}
          <GlossaryTooltip term="Entanglement"><Keyword tone="entanglement">entanglement</Keyword></GlossaryTooltip>{' '}
          between them. A quantum computer can represent that same entangled state directly, so its resource cost
          grows only polynomially.
        </DefinitionBox>

        <div className="mt-6">
          <ChemistryVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: The FeMoCo Catalyst">
            <p>
              Simulating the FeMoCo molecule, used in biological nitrogen fixation, would require roughly{' '}
              <span className="font-mono">10⁴⁸</span> classical bits but only about 2,000 logical qubits. A
              successful simulation could inform more efficient fertilizer production, a process currently
              responsible for roughly 2% of global energy consumption.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the same entanglement studied in{' '}
            <Link to="/entanglement" className="text-lime-400 transition-colors hover:text-lime-300">
              Entanglement
            </Link>
            , at a much larger scale — it is specifically the property that makes large molecules intractable for
            classical simulation.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <VideoAside
            title="Mapping a Problem to a Quantum Computer"
            description="A Qiskit talk from the Quantum Computing in Practice series on how real-world problems get translated into something a quantum computer can actually run — a practical companion to this chapter."
            source="Qiskit"
            videoId="BiKpHaev0XI"
          />
        </div>
      </section>

      <section id="usecases-optimization" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Optimization</h2>
        <p className="section-sub">
          Many real-world problems reduce to finding the best solution among an astronomically large number of
          options. Quantum approaches explore that space differently, but the resulting advantage is modest.
        </p>

        <DefinitionBox term="Quantum Optimization">
          Approaches such as QAOA (the Quantum Approximate Optimization Algorithm) and quantum annealing use{' '}
          <GlossaryTooltip term="Superposition"><Keyword tone="superposition">superposition</Keyword></GlossaryTooltip>{' '}
          and quantum tunneling to explore a solution landscape differently than classical local search. Proven
          advantage over the best classical solvers remains limited and problem-dependent.
        </DefinitionBox>

        <div className="mt-6">
          <OptimizationVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: The Traveling Salesman Problem">
            <p>
              Finding the shortest route through 20 cities has roughly{' '}
              <span className="font-mono">10¹⁸</span> possible routes. Quantum computing does not solve this
              exponentially faster — but may offer modest speedups for certain structured variants of such
              problems.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: why QAOA hasn't beaten classical solvers yet" label="Technical Aside">
            <p>
              QAOA is a hybrid classical-quantum approach: a quantum circuit proposes candidate solutions, and a
              classical optimizer tunes the circuit's parameters. Results so far show QAOA generally struggling to
              outperform highly optimized classical solvers on real problem instances.
            </p>
            <p className="mt-3">
              Quantum annealing hardware has larger qubit counts but limited qubit connectivity and unclear
              advantage in practice. For most practical optimization problems today, classical heuristics such as
              simulated annealing remain highly competitive.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the same pattern as Grover's search in{' '}
            <Link to="/algorithms" className="text-lime-400 transition-colors hover:text-lime-300">
              Core Algorithms
            </Link>
            : quadratic-or-smaller speedups are useful in principle, but they are not the transformative,
            exponential advantage popular coverage often implies.
          </RemarkBox>
        </div>
      </section>

      <section id="usecases-cryptography" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Cryptography</h2>
        <p className="section-sub">
          Quantum computing is both a threat to current encryption and a source of new, physics-based security —
          on very different timelines.
        </p>

        <DefinitionBox term="Quantum Threat and Quantum Defense">
          Shor's algorithm can factor large numbers exponentially faster than any known classical method, which
          threatens RSA and elliptic-curve encryption. Quantum key distribution (QKD) instead uses quantum
          mechanics defensively: any eavesdropping attempt on a quantum channel disturbs the transmitted states
          and is detectable.
        </DefinitionBox>

        <div className="mt-6">
          <CryptographyVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: The Cost of Breaking RSA-2048">
            <p>
              Breaking RSA-2048 is estimated to require roughly 4,000 error-corrected logical qubits, translating
              to millions of physical qubits under current error-correction overhead. Current largest quantum
              computers have on the order of 1,000 noisy physical qubits. Estimated timelines for a genuine
              cryptographic threat range from 10 to 30-plus years.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The qubit-count estimate here is the same one introduced in{' '}
            <Link to="/algorithms" className="text-lime-400 transition-colors hover:text-lime-300">
              Core Algorithms
            </Link>
            , and the physical-to-logical overhead behind the "millions of physical qubits" figure is exactly
            what{' '}
            <Link to="/noise" className="text-lime-400 transition-colors hover:text-lime-300">
              Noise & Hardware
            </Link>{' '}
            covers in detail. Post-quantum cryptography — classical algorithms believed resistant to quantum
            attack — is already being standardized by NIST as a near-term response.
          </RemarkBox>
        </div>
      </section>

      <section id="usecases-ml" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Machine learning: promise vs. reality</h2>
        <p className="section-sub">
          Quantum machine learning is arguably the most overhyped application area covered in this chapter, for a
          specific and fundamental reason.
        </p>

        <DefinitionBox term="The Data-Loading Bottleneck">
          Loading <span className="font-mono">N</span> classical data points into a quantum state takes{' '}
          <span className="font-mono">O(N)</span> time — no faster than a classical algorithm simply reading the
          same data. This bottleneck eliminates most claimed quantum speedups for machine learning on ordinary
          classical data such as images or text.
        </DefinitionBox>

        <div className="mt-6">
          <MLRealityVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Where the Speedup Disappears">
            <p>
              "Quantum kernel methods" and "variational quantum classifiers" exist and run on real hardware, but
              have not yet beaten well-tuned classical machine learning on real-world tasks. The honest assessment
              is that quantum ML may help specifically for quantum data, such as chemistry or materials
              simulation output — not for photos and text.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: the dequantization results" label="Research Context">
            <p>
              Work by Tang (2018) showed that several claimed exponential quantum ML speedups — including for
              recommendation systems and principal component analysis — can be matched classically using
              randomized linear algebra techniques. These "dequantization" results deflated a number of earlier
              quantum advantage claims in this area.
            </p>
            <p className="mt-3">
              The remaining credible hope is quantum-native data, produced by quantum sensors or quantum
              simulations, which could bypass the input bottleneck entirely because it never needs to be loaded
              from a classical representation in the first place.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            When a claimed quantum speedup for classical data sounds too good, checking whether it accounts for
            the cost of loading that data in the first place is usually the fastest way to evaluate it.
          </RemarkBox>
        </div>
      </section>

      <section id="usecases-limitations" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Current limitations</h2>
        <p className="section-sub">
          Every application area above is bounded by the same hardware reality: today's devices are real,
          improving, and still far short of what transformative applications require.
        </p>

        <DefinitionBox term="NISQ">
          NISQ stands for Noisy Intermediate-Scale Quantum &mdash; the current era of quantum hardware. NISQ
          devices are useful for research and small demonstrations, but they lack the error correction needed for
          long, reliable computations.
        </DefinitionBox>

        <div className="mt-6">
          <LimitationsVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="An Honest Timeline">
            <p>
              Rough, widely-debated estimates: quantum simulation for small molecules, now to five years;
              practical optimization advantage, five to fifteen years, with real uncertainty; breaking RSA, fifteen
              to thirty-plus years. Experts disagree on the exact numbers, but the relative ordering is broadly
              consistent across estimates.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The roughly 1,000x gap in qubit count and 100x gap in error rate shown above is exactly the gap{' '}
            <Link to="/noise" className="text-lime-400 transition-colors hover:text-lime-300">
              Noise & Hardware
            </Link>{' '}
            explains the physical origin of. Nothing in this chapter is a new limitation — it is that same
            hardware constraint, applied to four specific application areas.
          </RemarkBox>
        </div>
      </section>

      <section id="usecases-mistakes" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 6</p>
        <h2 className="section-heading">Common mistakes</h2>
        <p className="section-sub">
          Nearly every misconception about quantum applications comes from treating one impressive result as
          evidence of a general, unqualified advantage.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Assuming quantum computers will eventually be faster at everything.',
              clarification:
                'Proven speedup applies only to a small set of structured problems. Most everyday computing sees no quantum benefit at all, now or in principle.',
            },
            {
              mistake: 'Believing QAOA or quantum annealing already outperform classical solvers on real optimization problems.',
              clarification:
                'Evidence so far is mixed at best. Highly optimized classical heuristics remain competitive with or better than current quantum approaches on most practical instances.',
            },
            {
              mistake: 'Treating the RSA-breaking threat from Shor\'s algorithm as imminent.',
              clarification:
                'Breaking real RSA keys requires thousands of error-corrected logical qubits — millions of physical qubits under current overhead — which is decades away by most estimates.',
            },
            {
              mistake: 'Assuming quantum machine learning automatically helps with classical data like images or text.',
              clarification:
                'The data-loading bottleneck erases most claimed advantages there. The more credible near-term case is quantum ML applied to inherently quantum data.',
            },
          ]}
        />
      </section>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Quantum simulation of molecules is the clearest near-term application, since molecules are themselves quantum systems.',
            'Quantum optimization approaches like QAOA explore solution landscapes differently, but proven advantage over classical solvers remains limited and problem-dependent.',
            "Shor's algorithm threatens RSA in principle, but breaking real keys needs thousands of error-corrected logical qubits — likely a decade or more away; QKD and post-quantum cryptography are the near-term responses.",
            'Quantum machine learning on ordinary classical data faces a fundamental input bottleneck; the more credible case is quantum ML applied to inherently quantum data.',
            "Today's devices are NISQ-era: real and improving, but roughly 1,000x short in qubit count and 100x short in error rate compared to what fault-tolerant computing requires.",
          ]}
        />
      </div>

      <section id="usecases-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Where To Go From Here</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">You've reached the end of the sequential handbook</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          This module closes the 14-module sequence, from big-picture intuition through today's honest limitations.
          From here, the most useful next steps are review and practice, not more new material.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/roadmap" className="btn-primary">
            Review Study Paths
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Open Glossary
          </Link>
          <Link to="/references" className="btn-secondary">
            Open References
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
