import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import { useProgress } from '../../lib/hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../../lib/data/modules'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function ChemistryVisual() {
  const [selected, setSelected] = useState(null)

  const molecules = [
    {
      name: 'H\u2082',
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
      formula: 'C\u2088H\u2081\u2080N\u2084O\u2082',
      qubits: 160,
      difficulty: 'hard',
      color: 'bg-amber-500/70',
      barWidth: '45%',
      classical: 'Classically hard',
      desc: '~160 qubits needed. Beyond exact classical simulation, but approximate methods exist.',
    },
    {
      name: 'FeMoCo',
      formula: 'Fe\u2087MoS\u2089C',
      qubits: 2000,
      difficulty: 'impossible',
      color: 'bg-red-500/70',
      barWidth: '100%',
      classical: 'Classically impossible',
      desc: '~2,000 logical qubits. Would need ~10\u2074\u2078 classical bits. Key to nitrogen fixation.',
    },
  ]

  return (
    <div className="card border-lime-800/30 my-6">
      <p className="text-xs text-lime-400 uppercase tracking-wider mb-4 text-center">
        Molecular simulation — complexity vs qubits
      </p>

      <div className="space-y-3 mb-4">
        {molecules.map((mol, i) => (
          <button
            key={mol.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`w-full text-left rounded-xl p-4 transition-colors border
              ${selected === i
                ? 'bg-lime-900/30 border-lime-600/50'
                : 'bg-slate-900/60 border-slate-700/40 hover:border-slate-600/60'}`}
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

      <p className="text-xs text-slate-500 text-center">
        Click a molecule to learn more. Every electron roughly doubles the classical cost.
      </p>
    </div>
  )
}

function OptimizationVisual() {
  const [approach, setApproach] = useState('classical')

  const landscapePoints = [3, 5, 2, 7, 4, 8, 3, 6, 2, 9, 5, 4, 6, 3, 7, 4]

  const classicalPos = 7 // stuck at local minimum index 6 (value 3)
  const quantumPos = 9  // found global maximum index 9 (value 9)

  const currentPos = approach === 'classical' ? classicalPos : quantumPos

  return (
    <div className="card border-lime-800/30 my-6">
      <p className="text-xs text-lime-400 uppercase tracking-wider mb-4 text-center">
        Optimization landscape — classical vs quantum search
      </p>

      <div className="flex gap-2 justify-center mb-5">
        {[
          { key: 'classical', label: 'Classical' },
          { key: 'quantum', label: 'Quantum' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setApproach(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              ${approach === key
                ? 'bg-lime-900/40 border-lime-500/60 text-lime-300'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white'}`}
            aria-label={`Show ${label} approach`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Landscape visualization */}
      <div className="relative bg-slate-900/60 rounded-xl p-4 mb-4">
        <div className="flex items-end gap-[2px] h-32 justify-center">
          {landscapePoints.map((val, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {i === currentPos && (
                <motion.div
                  initial={{ y: -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-xs mb-1 ${approach === 'classical' ? 'text-amber-400' : 'text-lime-400'}`}
                >
                  {approach === 'classical' ? '\u25BC stuck' : '\u25BC best'}
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
          className="text-center"
        >
          {approach === 'classical' ? (
            <div>
              <p className="text-sm text-amber-400 font-medium">Classical: stuck in a local minimum</p>
              <p className="text-xs text-slate-500 mt-1">
                Gradient descent gets trapped. Can't "see" past the surrounding hills.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-lime-400 font-medium">Quantum: can tunnel through barriers</p>
              <p className="text-xs text-slate-500 mt-1">
                Quantum tunneling and superposition help explore more broadly — but speedup is modest, not exponential.
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
    <div className="card border-lime-800/30 my-6">
      <p className="text-xs text-lime-400 uppercase tracking-wider mb-4 text-center">
        Quantum cryptography — threat and opportunity
      </p>

      <div className="flex gap-2 justify-center mb-5">
        {[
          { key: 'threat', label: 'Threat', icon: '\u26A0\uFE0F' },
          { key: 'opportunity', label: 'Opportunity', icon: '\uD83D\uDD12' },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setPanel(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
              ${panel === key
                ? key === 'threat'
                  ? 'bg-red-900/30 border-red-500/50 text-red-300'
                  : 'bg-green-900/30 border-green-500/50 text-green-300'
                : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-white'}`}
            aria-label={`View ${label} panel`}
          >
            <span className="mr-1">{icon}</span> {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={panel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
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
                  Timeline: 10-30+ years. Current machines: ~1,000 noisy qubits.
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
                  Post-quantum cryptography (classical, quantum-resistant) is also being standardized by NIST.
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
      desc: 'Quantum kernels exist but haven\'t beaten classical ML on real-world tasks.',
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
    <div className="card border-lime-800/30 my-6">
      <p className="text-xs text-lime-400 uppercase tracking-wider mb-4 text-center">
        Quantum ML realism meter
      </p>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-5 text-xs text-slate-500">
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

      <div className="space-y-3">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left bg-slate-900/60 rounded-xl p-4 border border-slate-700/40 hover:border-slate-600/60 transition-colors"
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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4m0 12v4m-10-10h4m12 0h4m-3.5-7.5-2.8 2.8m-5.4 5.4-2.8 2.8m0-11.2 2.8 2.8m5.4 5.4 2.8 2.8" />
        </svg>
      ),
      color: 'text-lime-400 border-lime-700/40 bg-lime-900/20',
    },
    {
      label: 'Gate Error Rate',
      value: '~0.1-1%',
      sub: 'Per two-qubit gate',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      ),
      color: 'text-amber-400 border-amber-700/40 bg-amber-900/20',
    },
    {
      label: 'Useful Depth',
      value: '~100',
      sub: 'Gate layers before noise dominates',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      ),
      color: 'text-sky-400 border-sky-700/40 bg-sky-900/20',
    },
    {
      label: 'Fault-Tolerant',
      value: '10-20+ yr',
      sub: 'Estimated timeline',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      color: 'text-violet-400 border-violet-700/40 bg-violet-900/20',
    },
  ]

  return (
    <div className="card border-lime-800/30 my-6">
      <p className="text-xs text-lime-400 uppercase tracking-wider mb-4 text-center">
        Current state of quantum computing — key metrics
      </p>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`rounded-xl border p-4 text-center ${m.color}`}
          >
            <div className="flex justify-center mb-2 opacity-70">{m.icon}</div>
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
          We are here. The gap is ~1,000x in qubits and ~100x in error reduction.
        </p>
      </div>
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Chemistry & Materials',
    hook: 'Simulating nature is what quantum was born to do.',
    hookSub: 'Molecules are quantum systems. Only a quantum computer can simulate them efficiently.',
    visual: <ChemistryVisual />,
    bullets: [
      'Simulating molecules is exponentially hard for classical computers \u2014 every electron doubles the complexity.',
      'Quantum computers can simulate quantum systems naturally \u2014 it\u2019s what Feynman originally envisioned.',
      'Drug discovery, battery design, and fertilizer production could all benefit from better molecular simulation.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">FeMoCo catalyst:</strong> Simulating the FeMoCo molecule
          (used in nitrogen fixation for fertilizer) would require ~10<sup>48</sup> classical bits
          but only ~2,000 logical qubits. This single molecule could revolutionize fertilizer
          production and reduce ~2% of global energy consumption.
        </p>
      </div>
    ),
    quiz: {
      question: 'Why are quantum computers naturally good at simulating molecules?',
      choices: [
        'They\'re faster at all calculations',
        'Molecules are quantum systems, so quantum computers simulate them naturally',
        'They have more memory',
        'Classical computers can\'t do chemistry at all',
      ],
      correct: 1,
    },
  },
  {
    title: 'Optimization',
    hook: 'Finding the best solution among billions of possibilities.',
    hookSub: 'Quantum approaches explore solution spaces differently \u2014 but advantage is limited.',
    visual: <OptimizationVisual />,
    bullets: [
      'Many real-world problems are about finding the best solution among astronomically many options.',
      'Quantum approaches like QAOA and quantum annealing explore solution spaces differently \u2014 but proven advantage is limited.',
      'Logistics, finance, and scheduling are the most-hyped applications, but classical algorithms are strong competitors.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">Traveling salesman:</strong> Find the shortest route visiting
          N cities. For 20 cities, there are ~10<sup>18</sup> possible routes. Quantum won't solve
          this exponentially faster \u2014 but may offer modest speedups for structured variants.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>
          QAOA (Quantum Approximate Optimization Algorithm) is a hybrid classical-quantum
          approach: a quantum circuit proposes solutions, a classical optimizer tunes the circuit.
          Results so far show that QAOA struggles to beat highly-optimized classical solvers.
        </p>
        <p>
          Quantum annealing (D-Wave) has a larger qubit count but limited connectivity and unclear
          advantage. For most practical optimization problems, classical heuristics like simulated
          annealing remain competitive.
        </p>
      </div>
    ),
    quiz: {
      question: 'Does quantum computing solve all optimization problems exponentially faster?',
      choices: [
        'Yes, all optimization is exponentially faster',
        'Yes, but only for NP-hard problems',
        'No \u2014 advantage is limited and problem-dependent',
        'No, quantum computers can\'t do optimization',
      ],
      correct: 2,
    },
  },
  {
    title: 'Cryptography',
    hook: 'Quantum breaks some encryption \u2014 and offers new security.',
    hookSub: 'Shor\u2019s algorithm threatens RSA, but quantum key distribution provides physics-based protection.',
    visual: <CryptographyVisual />,
    bullets: [
      'Shor\u2019s algorithm can factor large numbers exponentially faster \u2014 this breaks RSA and ECC encryption.',
      'But you\u2019d need thousands of error-corrected logical qubits. Current machines are far from this.',
      'Post-quantum cryptography (classical algorithms resistant to quantum attacks) is already being standardized by NIST.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">RSA-2048:</strong> Estimated to need ~4,000 logical qubits
          (~4 million physical qubits) to break. Current largest quantum computers have ~1,000 noisy
          qubits. The timeline for a cryptographic threat is debated: estimates range from 10-30+ years.
        </p>
      </div>
    ),
    quiz: {
      question: 'What\'s the main quantum threat to current encryption?',
      choices: [
        'Shor\'s algorithm can break RSA by factoring large numbers efficiently',
        'Quantum computers are faster at guessing passwords',
        'Grover\'s algorithm breaks all encryption',
        'Quantum computers can read encrypted data directly',
      ],
      correct: 0,
    },
  },
  {
    title: 'ML: Promise vs Reality',
    hook: 'Quantum ML is the most overhyped application area.',
    hookSub: 'The bottleneck is getting classical data into a quantum state \u2014 and it\u2019s fundamental.',
    visual: <MLRealityVisual />,
    bullets: [
      'Quantum ML is the most overhyped application area \u2014 the bottleneck is getting classical data into a quantum state.',
      '"Quantum kernel methods" and "variational quantum classifiers" exist but haven\u2019t beaten classical ML on real tasks.',
      'The most honest assessment: quantum ML might help for quantum data (e.g., chemistry), but not for photos and text.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">The input bottleneck:</strong> Loading N classical data
          points into a quantum state takes O(N) time \u2014 the same time a classical algorithm
          takes to just read the data. This eliminates most claimed quantum speedups for ML.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>
          The "dequantization" results by Tang (2018) showed that many quantum ML speedups can be
          achieved classically with randomized linear algebra. This deflated several claims of
          exponential quantum advantage in recommendation systems and PCA.
        </p>
        <p>
          The remaining hope is that quantum-native data (from quantum sensors or simulations)
          could bypass the input bottleneck. For classical data like images and text, there is
          currently no convincing evidence of quantum advantage.
        </p>
      </div>
    ),
    quiz: {
      question: 'What\'s the biggest bottleneck for quantum machine learning on classical data?',
      choices: [
        'Quantum computers are too slow',
        'Loading classical data into quantum states erases the speedup',
        'Neural networks don\'t work on qubits',
        'Quantum computers can\'t do multiplication',
      ],
      correct: 1,
    },
  },
  {
    title: 'Current Limitations',
    hook: 'Quantum computing is real \u2014 but transformative applications are years away.',
    hookSub: 'An honest look at where we are, what\u2019s next, and what experts actually agree on.',
    visual: <LimitationsVisual />,
    bullets: [
      'Today\u2019s quantum computers are "NISQ" \u2014 Noisy Intermediate-Scale Quantum. Useful but limited.',
      'The gap between current hardware and fault-tolerant quantum computing is roughly 1,000x in qubit count and 100x in error reduction.',
      'Quantum computing is real and advancing fast, but transformative applications are still years away.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p>
          <strong className="text-white">Honest timeline:</strong> Quantum simulation for small
          molecules (now\u20135 years), practical optimization advantage (5\u201315 years, uncertain),
          breaking RSA (15\u201330+ years). Every expert disagrees on these numbers \u2014 but the
          order is roughly consistent.
        </p>
      </div>
    ),
    quiz: {
      question: 'What does NISQ stand for?',
      choices: [
        'New Integrated Silicon Quantum',
        'Noisy Intermediate-Scale Quantum',
        'Non-Interactive Standard Quantum',
        'Next-gen Intelligent Super Quantum',
      ],
      correct: 1,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function UseCases() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('usecases', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['usecases']) markDone('usecases')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('usecases', step)
  }

  return (
    <ModuleLayout
      moduleId="usecases"
      title="Use Cases"
      subtitle="Where quantum matters — and where it doesn't."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/noise', label: 'Module 12: Noise & Hardware' }}
      next={null}
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
            bulletStyle={MODULE_LAYOUT_STYLES.usecases.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Course complete!</p>
              <p className="text-slate-400 text-sm mt-1">You've finished all 13 modules. Congratulations!</p>
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
