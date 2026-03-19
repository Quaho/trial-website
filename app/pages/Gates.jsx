import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../../components/ModuleLayout'
import LessonCard from '../../components/LessonCard'
import StepNav from '../../components/StepNav'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'
import { useProgress } from '../../lib/hooks/useProgress'
import { MODULE_LAYOUT_STYLES } from '../../lib/data/modules'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function GateConceptVisual() {
  const [applied, setApplied] = useState(false)

  return (
    <div className="card border-sky-800/30 my-6 text-center py-6">
      <p className="text-xs text-sky-400 uppercase tracking-wider mb-5">
        Quantum gate pipeline
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap mb-5">
        {/* Input state */}
        <div className={`px-4 py-3 rounded-xl border-2 font-mono text-lg transition-all duration-300
          ${applied
            ? 'border-slate-700 bg-slate-900/40 text-slate-500'
            : 'border-sky-500 bg-sky-900/30 text-sky-300'}`}>
          |&#x03C8;&#x27E9;
        </div>

        <div className="text-slate-600 text-xl">&rarr;</div>

        {/* Gate box */}
        <div className="w-14 h-14 rounded-xl bg-sky-900/40 border-2 border-sky-600/60
                        flex items-center justify-center text-sky-300 font-bold text-xl">
          U
        </div>

        <div className="text-slate-600 text-xl">&rarr;</div>

        {/* Output state */}
        <div className={`px-4 py-3 rounded-xl border-2 font-mono text-lg transition-all duration-300
          ${applied
            ? 'border-sky-500 bg-sky-900/30 text-sky-300'
            : 'border-slate-700 bg-slate-900/40 text-slate-500'}`}>
          U|&#x03C8;&#x27E9;
        </div>
      </div>

      <button
        onClick={() => setApplied(a => !a)}
        className="btn-primary text-sm"
        aria-label={applied ? 'Reverse gate to show input state' : 'Apply gate U to the input state'}
      >
        {applied ? 'Reverse (apply U\u2020)' : 'Apply gate U'}
      </button>

      <p className="text-xs text-slate-500 mt-4">
        {applied
          ? 'The output lights up. Every gate is reversible \u2014 press to undo.'
          : 'The input state is ready. Press to apply the gate.'}
      </p>
    </div>
  )
}

function XGateVisual() {
  const states = [
    { input: '|0\u27E9', output: '|1\u27E9', changed: true, desc: 'Flipped: 0 becomes 1' },
    { input: '|1\u27E9', output: '|0\u27E9', changed: true, desc: 'Flipped: 1 becomes 0' },
    { input: '|+\u27E9', output: '|+\u27E9', changed: false, desc: 'Unchanged! |+\u27E9 is an eigenvector of X' },
    { input: '|\u2212\u27E9', output: '|\u2212\u27E9', changed: false, desc: 'Also unchanged \u2014 |\u2212\u27E9 is an X eigenvector too' },
  ]
  const [selected, setSelected] = useState(0)
  const s = states[selected]

  return (
    <div className="card border-sky-800/30 my-6">
      <p className="text-xs text-sky-400 uppercase tracking-wider mb-4 text-center">
        X Gate \u2014 choose an input state
      </p>
      <div className="flex gap-2 justify-center mb-5 flex-wrap">
        {states.map((st, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-mono font-medium transition-colors
              ${i === selected
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            aria-label={`Select input state ${st.input}`}
          >
            {st.input}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-4"
        >
          <div className="px-4 py-3 rounded-xl border-2 border-sky-600/50 bg-sky-900/20
                          font-mono text-lg text-sky-300">
            {s.input}
          </div>
          <div className="text-slate-600 text-xl">&rarr;</div>
          <div className="w-12 h-12 rounded-lg bg-sky-900/40 border-2 border-sky-600/60
                          flex items-center justify-center text-sky-300 font-bold text-lg">
            X
          </div>
          <div className="text-slate-600 text-xl">&rarr;</div>
          <div className={`px-4 py-3 rounded-xl border-2 font-mono text-lg transition-colors
            ${s.changed
              ? 'border-amber-500/60 bg-amber-900/20 text-amber-300'
              : 'border-green-500/60 bg-green-900/20 text-green-300'}`}>
            {s.output}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className={`text-center text-sm font-medium
        ${s.changed ? 'text-amber-400' : 'text-green-400'}`}>
        {s.desc}
      </p>
    </div>
  )
}

function ZGateVisual() {
  return (
    <div className="card border-sky-800/30 my-6">
      <p className="text-xs text-sky-400 uppercase tracking-wider mb-3 text-center">
        Z applied to |+&#x27E9;
      </p>
      <div className="text-center mb-5">
        <p className="font-mono text-sky-300 text-base sm:text-lg">
          Z|+&#x27E9; = (|0&#x27E9; &minus; |1&#x27E9;) / &radic;2 = |&minus;&#x27E9;
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Z-basis measurement */}
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">
            Z-basis measurement
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">|0&#x27E9;</span>
                <span className="text-slate-400">50%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500/70 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">|1&#x27E9;</span>
                <span className="text-slate-400">50%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500/70 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Same as |+&#x27E9; &mdash; Z is invisible here</p>
        </div>

        {/* X-basis measurement */}
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">
            X-basis measurement
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">|+&#x27E9;</span>
                <span className="text-slate-400">0%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500/70 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-mono">|&minus;&#x27E9;</span>
                <span className="text-amber-400">100%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500/70 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
          <p className="text-xs text-amber-400 mt-3">Completely flipped &mdash; phase matters here!</p>
        </div>
      </div>
    </div>
  )
}

function HadamardVisual() {
  const states = [
    { input: '|0\u27E9', output: '|+\u27E9', desc: 'Definite 0 \u2192 equal superposition' },
    { input: '|1\u27E9', output: '|\u2212\u27E9', desc: 'Definite 1 \u2192 superposition with minus sign' },
    { input: '|+\u27E9', output: '|0\u27E9', desc: 'Superposition \u2192 back to definite 0' },
    { input: '|\u2212\u27E9', output: '|1\u27E9', desc: 'Superposition \u2192 back to definite 1' },
  ]
  const [selected, setSelected] = useState(0)
  const s = states[selected]
  const isCreating = selected < 2

  return (
    <div className="card border-sky-800/30 my-6">
      <p className="text-xs text-sky-400 uppercase tracking-wider mb-4 text-center">
        Hadamard gate &mdash; choose an input state
      </p>
      <div className="flex gap-2 justify-center mb-5 flex-wrap">
        {states.map((st, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-mono font-medium transition-colors
              ${i === selected
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            aria-label={`Select input state ${st.input}`}
          >
            {st.input}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-4"
        >
          <div className="px-4 py-3 rounded-xl border-2 border-sky-600/50 bg-sky-900/20
                          font-mono text-lg text-sky-300">
            {s.input}
          </div>
          <div className="text-slate-600 text-xl">&rarr;</div>
          <div className="w-12 h-12 rounded-lg bg-sky-900/40 border-2 border-sky-600/60
                          flex items-center justify-center text-sky-300 font-bold text-lg">
            H
          </div>
          <div className="text-slate-600 text-xl">&rarr;</div>
          <div className="px-4 py-3 rounded-xl border-2 border-sky-500/60 bg-sky-900/20
                          font-mono text-lg text-sky-300">
            {s.output}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-center text-sm font-medium text-sky-400">{s.desc}</p>
      <p className="text-center text-xs text-slate-500 mt-2">
        {isCreating ? 'Creates superposition' : 'Collapses superposition'}
      </p>
    </div>
  )
}

function PhaseGatesVisual() {
  const gates = [
    { label: 'T', angle: 45, color: '#f97316', desc: '\u03C0/4 (45\u00B0)' },
    { label: 'S', angle: 90, color: '#8b5cf6', desc: '\u03C0/2 (90\u00B0)' },
    { label: 'Z', angle: 180, color: '#38bdf8', desc: '\u03C0 (180\u00B0)' },
  ]

  const cx = 80, cy = 80, r = 58

  function toXY(deg) {
    const rad = (deg * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) }
  }

  function arcPath(deg) {
    const rad = (deg * Math.PI) / 180
    const ex = cx + r * Math.cos(rad)
    const ey = cy - r * Math.sin(rad)
    const large = deg > 180 ? 1 : 0
    return `M ${cx + r} ${cy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`
  }

  return (
    <div className="card border-sky-800/30 my-6">
      <p className="text-xs text-sky-400 uppercase tracking-wider mb-4 text-center">
        Phase gates on the unit circle
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 160 160" className="w-44 h-44 flex-shrink-0" role="img"
             aria-label="Unit circle showing T at 45 degrees, S at 90 degrees, and Z at 180 degrees">
          {/* Circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1.5" />
          {/* Axes */}
          <line x1={cx - r - 8} y1={cy} x2={cx + r + 8} y2={cy} stroke="#475569" strokeWidth="1" />
          <line x1={cx} y1={cy - r - 8} x2={cx} y2={cy + r + 8} stroke="#475569" strokeWidth="1" />
          {/* Start point (1) */}
          <circle cx={cx + r} cy={cy} r={4} fill="#94a3b8" />
          <text x={cx + r + 6} y={cy + 4} fill="#94a3b8" fontSize="9" fontFamily="monospace">1</text>
          {/* Arcs and endpoints */}
          {gates.map(({ label, angle, color }) => {
            const pt = toXY(angle)
            return (
              <g key={label}>
                <path d={arcPath(angle)} fill="none" stroke={color} strokeWidth="2" opacity="0.5"
                      strokeDasharray="4 3" />
                <circle cx={pt.x} cy={pt.y} r={5} fill={color} />
                <text x={pt.x + (angle <= 90 ? 8 : -16)} y={pt.y + (angle <= 90 ? -6 : 4)}
                      fill={color} fontSize="11" fontWeight="bold" fontFamily="monospace">{label}</text>
              </g>
            )
          })}
          <text x={cx + 2} y={cy - r - 4} fill="#64748b" fontSize="9">Im</text>
          <text x={cx + r + 4} y={cy + 12} fill="#64748b" fontSize="9">Re</text>
        </svg>

        <div className="flex-1 space-y-3 w-full">
          {gates.map(({ label, desc, color }) => (
            <div key={label} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold font-mono text-base flex-shrink-0"
                   style={{ backgroundColor: color + '20', border: `1px solid ${color}50`, color }}>
                {label}
              </div>
              <div>
                <span className="text-sm text-white font-medium">{label} gate</span>
                <span className="text-sm text-slate-400"> &mdash; phase {desc}</span>
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-500 pl-1">
            T&sup2; = S &middot; S&sup2; = Z &middot; Each is half the previous.
          </p>
        </div>
      </div>
    </div>
  )
}

function GateSummaryVisual() {
  const gates = [
    { sym: 'X', name: 'Bit Flip', action: '|0\u27E9\u2194|1\u27E9', axis: '180\u00B0 around X-axis' },
    { sym: 'Z', name: 'Phase Flip', action: '|1\u27E9\u2192\u2212|1\u27E9', axis: '180\u00B0 around Z-axis' },
    { sym: 'H', name: 'Hadamard', action: 'Z\u2194X basis', axis: '180\u00B0 around (X+Z)/\u221A2' },
    { sym: 'S', name: 'Phase \u03C0/2', action: '|1\u27E9\u2192i|1\u27E9', axis: '90\u00B0 around Z-axis' },
    { sym: 'T', name: 'Phase \u03C0/4', action: '|1\u27E9\u2192e^(i\u03C0/4)|1\u27E9', axis: '45\u00B0 around Z-axis' },
    { sym: 'Y', name: 'Bit+Phase', action: '|0\u27E9\u2194i|1\u27E9', axis: '180\u00B0 around Y-axis' },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {gates.map(({ sym, name, action, axis }) => (
        <div key={sym} className="card flex gap-3 items-start">
          <div className="w-10 h-10 rounded-lg bg-sky-900/40 border border-sky-700/50
                          flex items-center justify-center text-sky-400 font-bold font-mono text-lg flex-shrink-0">
            {sym}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="font-mono text-sky-400 text-xs mt-0.5">{action}</p>
            <p className="text-xs text-slate-500 mt-0.5">{axis}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'Gates as Actions',
    hook: 'A quantum gate rotates a qubit\u2019s state \u2014 reversibly, without measuring it.',
    hookSub: 'Gates are the verbs of quantum computing.',
    visual: <GateConceptVisual />,
    bullets: [
      'Every gate is a unitary matrix \u2014 it preserves probabilities and is always reversible.',
      'Gates rotate the state on the Bloch sphere. Different gates rotate around different axes.',
      'Combining gates in sequence builds algorithms \u2014 like assembling a recipe from steps.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Analogy:</strong> A quantum gate is like a Rubik&apos;s cube move.
        Every move has a reverse. No information is lost.</p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Unitarity means <InlineMath>{'U^\\dagger U = I'}</InlineMath>. Every gate has an inverse
        that perfectly undoes it. This is fundamentally different from classical computing where gates
        like AND and OR are irreversible &mdash; you can&apos;t recover the inputs from the output.</p>
        <p>Reversibility is not optional. Quantum mechanics requires all evolution
        (except measurement) to be unitary. This constraint is what makes quantum error
        correction possible.</p>
      </div>
    ),
    quiz: {
      question: 'What property must every quantum gate have?',
      choices: [
        'It must double the number of qubits',
        'It must be reversible (unitary)',
        'It must create superposition',
        'It must measure the qubit',
      ],
      correct: 1,
    },
  },
  {
    title: 'The X Gate (Bit Flip)',
    hook: 'The X gate swaps |0\u27E9 and |1\u27E9 \u2014 the quantum NOT gate.',
    visual: <XGateVisual />,
    bullets: [
      'X|0\u27E9 = |1\u27E9 and X|1\u27E9 = |0\u27E9. It flips the computational basis states.',
      'On the Bloch sphere, X is a 180\u00B0 rotation around the x-axis.',
      'Apply X twice and you\u2019re back: XX = I. Every flip can be unflipped.',
    ],
    example: (
      <div>
        <MathDisplay>{'X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          The X matrix: swap the top and bottom entries of any state vector.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p><InlineMath>{'X|+\\rangle = |+\\rangle'}</InlineMath> because <InlineMath>{'|+\\rangle'}</InlineMath> is
        an eigenvector of X with eigenvalue +1.
        Similarly, <InlineMath>{'X|-\\rangle = -|-\\rangle'}</InlineMath> with eigenvalue &minus;1.</p>
        <p>X is one of the three Pauli matrices (X, Y, Z). Each is Hermitian
        (<InlineMath>{'X = X^\\dagger'}</InlineMath>), unitary, and its own
        inverse (<InlineMath>{'X^2 = I'}</InlineMath>). They form the basis of single-qubit error
        descriptions.</p>
      </div>
    ),
    quiz: {
      question: 'What is X applied to |+\u27E9 = (|0\u27E9 + |1\u27E9)/\u221A2?',
      choices: [
        '|\u2212\u27E9 = (|0\u27E9 \u2212 |1\u27E9)/\u221A2',
        '|0\u27E9',
        '|+\u27E9 (unchanged)',
        '|1\u27E9',
      ],
      correct: 2,
    },
  },
  {
    title: 'The Z Gate (Phase Flip)',
    hook: 'The Z gate flips the sign of |1\u27E9 \u2014 invisible in Z, game-changing in X.',
    hookSub: 'Phase changes are silent \u2014 until you look from a different angle.',
    visual: <ZGateVisual />,
    bullets: [
      'Z|0\u27E9 = |0\u27E9 and Z|1\u27E9 = \u2212|1\u27E9. Only the phase of |1\u27E9 changes.',
      'Measure in Z basis: probabilities are identical. Z is completely invisible.',
      'Measure in X basis: Z turns |+\u27E9 into |\u2212\u27E9. The phase flip is now detectable.',
    ],
    example: (
      <div>
        <MathDisplay>{'Z|+\\rangle = Z \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Z flips the relative phase: + becomes &minus;. Probabilities in Z basis? Still 50/50.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Z is diagonal: <InlineMath>{'Z = \\text{diag}(1, -1)'}</InlineMath>. Diagonal matrices only
        affect phases, never probabilities in the computational basis. That is why Z
        is &ldquo;invisible&rdquo; when measured in the Z basis.</p>
        <p>To detect a Z gate, change your measurement basis. Applying H before measuring
        converts a Z-basis measurement into an X-basis measurement, revealing the phase flip.</p>
      </div>
    ),
    quiz: {
      question: 'If you apply Z to |0\u27E9 and measure in the Z basis, what do you get?',
      choices: [
        'Always 1 \u2014 Z flips everything',
        'Always 0 \u2014 Z leaves |0\u27E9 unchanged',
        '50/50 \u2014 Z creates superposition',
        'An error \u2014 Z can\u2019t be applied to |0\u27E9',
      ],
      correct: 1,
    },
  },
  {
    title: 'The Hadamard Gate',
    hook: 'The Hadamard gate is the bridge between definite states and superposition.',
    hookSub: 'It\u2019s the most-used gate in quantum computing \u2014 and it\u2019s its own inverse.',
    visual: <HadamardVisual />,
    bullets: [
      'H|0\u27E9 = |+\u27E9 and H|1\u27E9 = |\u2212\u27E9. It creates superposition from definite states.',
      'H|+\u27E9 = |0\u27E9 and H|\u2212\u27E9 = |1\u27E9. Applied again, it undoes itself: HH = I.',
      'H converts between Z-basis and X-basis \u2014 it starts nearly every quantum algorithm.',
    ],
    example: (
      <div>
        <MathDisplay>{'H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\qquad H^2 = I'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          H is symmetric and self-inverse. Apply it twice and nothing changes.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Geometrically, H is a 180&deg; rotation around the (X+Z)/&radic;2 axis on the Bloch sphere.
        It swaps the north pole (|0&#x27E9;) with the +x point (|+&#x27E9;).</p>
        <p>Applied to n qubits in parallel, <InlineMath>{'H^{\\otimes n}|0\\rangle^{\\otimes n}'}</InlineMath> produces
        an equal superposition of all <InlineMath>{'2^n'}</InlineMath> computational basis states.
        This is why H appears at the start of nearly every quantum algorithm.</p>
      </div>
    ),
    quiz: {
      question: 'What is H applied twice to any state |\u03C8\u27E9?',
      choices: [
        'A random state \u2014 double superposition',
        '|\u03C8\u27E9 \u2014 back to the original state',
        '|0\u27E9 \u2014 everything resets',
        'An entangled state',
      ],
      correct: 1,
    },
  },
  {
    title: 'S and T Gates',
    hook: 'S and T are fractional Z rotations \u2014 the precision tools of quantum circuits.',
    hookSub: 'Z rotates by \u03C0. S by \u03C0/2. T by \u03C0/4.',
    visual: <PhaseGatesVisual />,
    bullets: [
      'S adds 90\u00B0 phase to |1\u27E9: S|1\u27E9 = i|1\u27E9. Think of it as the square root of Z.',
      'T adds 45\u00B0 phase to |1\u27E9: T|1\u27E9 = e^(i\u03C0/4)|1\u27E9. It\u2019s the square root of S.',
      'T\u00B2 = S and S\u00B2 = Z. These fractional rotations enable precise phase control.',
    ],
    example: (
      <div>
        <MathDisplay>{'S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix} \\qquad T = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Both are diagonal &mdash; they only affect the phase of |1&#x27E9;, never the probabilities.
        </p>
      </div>
    ),
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The set &#123;H, T, CNOT&#125; forms a <em>universal gate set</em>. Any quantum computation
        can be approximated to arbitrary precision using just these three gates (the Solovay-Kitaev
        theorem).</p>
        <p>In fault-tolerant quantum computing, T gates are extremely expensive. They require a
        technique called &ldquo;magic state distillation&rdquo; which consumes many physical qubits
        to produce one clean T gate. Minimizing T-count is a major optimization goal.</p>
      </div>
    ),
    quiz: {
      question: 'What does applying S twice give you?',
      choices: [
        'The identity (nothing)',
        'The T gate',
        'The Z gate',
        'The Hadamard gate',
      ],
      correct: 2,
    },
  },
  {
    title: 'Gate Reference',
    hook: 'Every single-qubit gate is a rotation on the Bloch sphere.',
    hookSub: 'Different axes, different angles \u2014 but always a rotation.',
    visual: <GateSummaryVisual />,
    bullets: [
      'X, Y, Z rotate by 180\u00B0 around their respective axes \u2014 the Pauli gates.',
      'H rotates by 180\u00B0 around the (X+Z)/\u221A2 axis \u2014 bridging the Z and X worlds.',
      'S and T are partial Z-axis rotations. They add phase without changing probabilities.',
    ],
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">The quantum toolbox:</strong> With just H, T, and CNOT (a
        two-qubit gate you&apos;ll meet in the next module), you can approximate any quantum computation.
        This is quantum universality.</p>
      </div>
    ),
    quiz: {
      question: 'Which gate converts between the Z basis and the X basis?',
      choices: [
        'The X gate',
        'The Z gate',
        'The Hadamard gate',
        'The T gate',
      ],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function Gates() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('gates', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['gates']) markDone('gates')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('gates', step)
  }

  return (
    <ModuleLayout
      moduleId="gates"
      title="Single-Qubit Gates"
      subtitle="The building blocks that transform qubit states."
      stepInfo={{ current: step, total: LESSONS.length, passed }}
      prev={{ to: '/qiskit', label: 'Module 4: Qiskit' }}
      next={{ to: '/multiqubit', label: 'Module 6: Multi-Qubit Systems' }}
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
            bulletStyle={MODULE_LAYOUT_STYLES.gates.bullet}
          />

          {step === LESSONS.length - 1 && allPassed && (
            <div className="mt-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">&#127881;</div>
              <p className="text-green-300 font-semibold">Module 5 complete.</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 6 to explore multi-qubit systems.</p>
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
