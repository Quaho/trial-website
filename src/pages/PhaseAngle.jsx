import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DeepDive from '../components/DeepDive'
import StepNav from '../components/StepNav'
import { MathDisplay, Math } from '../components/MathBlock'
import { useProgress } from '../hooks/useProgress'

/* ── Visuals ──────────────────────────────────────────────────────────────── */

function PhaseIntuitionVisual() {
  return (
    <div className="my-6 grid sm:grid-cols-2 gap-4">
      <div className="card text-center">
        <p className="text-xs text-blue-400 uppercase tracking-wider mb-3">Probability</p>
        <div className="flex justify-center gap-2 mb-2">
          {[0.2, 0.5, 0.8, 1.0].map(v => (
            <div key={v} className="flex flex-col items-center gap-1">
              <div className="w-10 bg-blue-600/40 border border-blue-600/50 rounded-t-md"
                   style={{ height: `${v * 60}px` }} />
              <span className="text-xs text-blue-400">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Always ≥ 0 (no cancellation possible)</p>
      </div>
      <div className="card text-center">
        <p className="text-xs text-indigo-400 uppercase tracking-wider mb-3">Amplitude (quantum)</p>
        <div className="flex justify-center gap-2 mb-2">
          {[-0.7, -0.3, 0.5, 0.9].map(v => (
            <div key={v} className="flex flex-col items-center">
              <div className="relative w-10" style={{ height: '60px' }}>
                <div className="absolute bottom-1/2 left-0 right-0 border-t border-dashed border-slate-600" />
                {v > 0
                  ? <div className="absolute bottom-1/2 left-0 right-0 bg-indigo-500/50 border border-indigo-500 rounded-t-md"
                         style={{ height: `${v * 28}px`, transform: 'translateY(-100%)' }} />
                  : <div className="absolute top-1/2 left-0 right-0 bg-red-500/40 border border-red-500 rounded-b-md"
                         style={{ height: `${Math.abs(v) * 28}px` }} />
                }
              </div>
              <span className="text-xs text-indigo-400 mt-1">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Can be negative → enables cancellation!</p>
      </div>
    </div>
  )
}

function PhaseExplorer() {
  const [phiDeg, setPhiDeg] = useState(45)
  const phi = (phiDeg * Math.PI) / 180
  const cx = 80, cy = 80, r = 58

  const x = cx + r * Math.cos(phi)
  const y = cy - r * Math.sin(phi)

  const named = [
    { deg: 0, label: '1', labelX: cx + r + 8, labelY: cy + 4 },
    { deg: 90, label: 'i', labelX: cx + 4, labelY: cy - r - 6 },
    { deg: 180, label: '-1', labelX: cx - r - 22, labelY: cy + 4 },
    { deg: 270, label: '-i', labelX: cx - 8, labelY: cy + r + 14 },
  ]

  return (
    <div className="card border-violet-800/40 my-6">
      <p className="text-sm font-semibold text-white mb-1">Phase on the Unit Circle</p>
      <p className="text-xs text-slate-400 mb-4">Phase e<sup>iφ</sup> is a direction in the complex plane. Drag to rotate.</p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 160 160" className="w-40 h-40 flex-shrink-0">
          {/* Circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1.5" />
          {/* Axes */}
          <line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke="#475569" strokeWidth="1" />
          <line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke="#475569" strokeWidth="1" />
          {/* Named points */}
          {named.map(({ deg, label, labelX, labelY }) => {
            const a = (deg * Math.PI) / 180
            return (
              <g key={deg}>
                <circle cx={cx + r * Math.cos(a)} cy={cy - r * Math.sin(a)} r={3} fill="#475569" />
                <text x={labelX} y={labelY} fill="#64748b" fontSize="10" fontFamily="monospace">{label}</text>
              </g>
            )
          })}
          {/* Phase arc */}
          {phiDeg > 5 && (
            <path
              d={`M ${cx + 28} ${cy} A 28 28 0 ${phiDeg > 180 ? 1 : 0} 0 ${cx + 28 * Math.cos(phi)} ${cy - 28 * Math.sin(phi)}`}
              fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          )}
          {/* Vector */}
          <line x1={cx} y1={cy} x2={x} y2={y} stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={x} cy={y} r={5} fill="#8b5cf6" />
          {/* Labels */}
          <text x={cx + r + 4} y={cy + 4} fill="#64748b" fontSize="9">Re</text>
          <text x={cx + 2} y={cy - r - 4} fill="#64748b" fontSize="9">Im</text>
          <text x={cx + 32} y={cy + 14} fill="#a78bfa" fontSize="10">φ</text>
        </svg>

        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>0°</span>
            <span className="text-violet-300 font-mono">φ = {phiDeg}°</span>
            <span>360°</span>
          </div>
          <input type="range" min="0" max="360" value={phiDeg}
            onChange={e => setPhiDeg(parseInt(e.target.value))}
            className="w-full accent-violet-500"
            aria-label={`Phase angle: ${phiDeg} degrees`} />
          <div className="mt-4 bg-slate-900 rounded-xl p-3 font-mono text-xs text-center space-y-1">
            <div><span className="text-violet-300">e<sup>iφ</sup></span><span className="text-slate-500"> = cos({phiDeg}°) + i·sin({phiDeg}°)</span></div>
            <div className="text-slate-400">= {Math.cos(phi).toFixed(3)} + {Math.sin(phi).toFixed(3)}i</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlochCircle({ theta, phi }) {
  const r = 88; const cx = 108; const cy = 108
  const x = cx + r * Math.sin(theta) * Math.cos(phi)
  const y = cy - r * Math.cos(theta)
  return (
    <svg viewBox="0 0 216 216" className="w-full max-w-xs mx-auto">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.22} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />
      <line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke="#475569" strokeWidth="1" />
      <line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke="#475569" strokeWidth="1" />
      <text x={cx + 4} y={cy - r - 12} fill="#94a3b8" fontSize="12" fontFamily="monospace">|0⟩</text>
      <text x={cx + 4} y={cy + r + 20} fill="#94a3b8" fontSize="12" fontFamily="monospace">|1⟩</text>
      <text x={cx + r + 5} y={cy + 5} fill="#94a3b8" fontSize="11" fontFamily="monospace">x</text>
      <line x1={cx} y1={cy} x2={x} y2={y} stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={x} cy={y} r={5} fill="#6366f1" />
      <path
        d={`M ${cx} ${cy - 28} A 28 28 0 ${theta > Math.PI ? 1 : 0} 1 ${cx + 28 * Math.sin(theta)} ${cy - 28 * Math.cos(theta)}`}
        fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={cx + 10} y={cy - 14} fill="#a78bfa" fontSize="11" fontFamily="monospace">θ</text>
      <text x={cx} y={206} textAnchor="middle" fill="#6366f1" fontSize="10" fontFamily="monospace">
        {theta === 0 ? '|0⟩' : theta >= Math.PI - 0.01 ? '|1⟩' : `cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩`}
      </text>
    </svg>
  )
}

function BlochExplorer() {
  const [thetaDeg, setThetaDeg] = useState(90)
  const [phiDeg, setPhiDeg] = useState(0)
  const theta = (thetaDeg * Math.PI) / 180
  const phi = (phiDeg * Math.PI) / 180
  const alpha = Math.cos(theta / 2)
  const betaMag = Math.sin(theta / 2)
  const p0 = (alpha * alpha * 100).toFixed(1)
  const p1 = (betaMag * betaMag * 100).toFixed(1)

  return (
    <div className="card border-indigo-800/40 my-6">
      <p className="text-sm font-semibold text-white mb-1">Bloch Sphere Explorer</p>
      <p className="text-xs text-slate-400 mb-4">
        θ = "latitude" (superposition mix) · φ = "longitude" (phase)
      </p>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0 w-full sm:w-auto">
          <BlochCircle theta={theta} phi={phi} />
        </div>
        <div className="flex-1 w-full space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>θ (polar angle)</span>
              <span className="font-mono text-indigo-300">{thetaDeg}°</span>
            </div>
            <input type="range" min="0" max="180" value={thetaDeg}
                   onChange={e => setThetaDeg(parseInt(e.target.value))}
                   className="w-full accent-indigo-500"
                   aria-label={`Polar angle: ${thetaDeg} degrees`} />
            <div className="flex justify-between text-xs text-slate-600 mt-0.5">
              <span>|0⟩</span><span>|+⟩</span><span>|1⟩</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>φ (phase angle)</span>
              <span className="font-mono text-violet-300">{phiDeg}°</span>
            </div>
            <input type="range" min="0" max="360" value={phiDeg}
                   onChange={e => setPhiDeg(parseInt(e.target.value))}
                   className="w-full accent-violet-500"
                   aria-label={`Phase angle: ${phiDeg} degrees`} />
          </div>
          <div className="bg-slate-900 rounded-xl p-3 font-mono text-xs">
            <div className="text-slate-400 mb-1">State:</div>
            <div className="text-indigo-300">
              {alpha.toFixed(3)}|0⟩ + {betaMag.toFixed(3)}·e<sup>i{phiDeg}°</sup>|1⟩
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[{ pct: p0, label: 'P(0)', color: 'indigo' }, { pct: p1, label: 'P(1)', color: 'violet' }].map(({ pct, label, color }) => (
              <div key={label} className={`bg-${color}-950/40 rounded-lg p-2 text-center`}>
                <div className={`text-${color}-300 font-bold`}>{pct}%</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BasisTableVisual() {
  const bases = [
    { name: 'Z (standard)', color: 'indigo', states: ['|0⟩', '|1⟩'], gate: 'No gate', desc: 'Default. Just measure.' },
    { name: 'X (Hadamard)', color: 'violet', states: ['|+⟩', '|−⟩'], gate: 'H before measure', desc: '|+⟩ is 50/50 superposition.' },
    { name: 'Y', color: 'purple', states: ['|i+⟩', '|i−⟩'], gate: 'S†H before measure', desc: 'Uses complex amplitudes.' },
  ]
  return (
    <div className="space-y-3 my-6">
      {bases.map(({ name, color, states, gate, desc }) => (
        <div key={name} className={`card border-${color}-800/30`}>
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h4 className={`font-semibold text-${color}-300 text-sm`}>{name} Basis</h4>
            <span className="badge bg-slate-800 text-slate-400 font-mono text-xs">{gate}</span>
          </div>
          <div className="flex gap-2 mb-1.5">
            {states.map(s => (
              <span key={s} className={`badge bg-${color}-900/40 text-${color}-300 font-mono`}>{s}</span>
            ))}
          </div>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      ))}
    </div>
  )
}

function PhaseApplicationsVisual() {
  const apps = [
    { name: 'Hadamard (H)', desc: 'Turns |0⟩ into |+⟩ — equal superposition with phase structure.' },
    { name: 'Phase Gate (S, T)', desc: 'Adds e^(iπ/2) or e^(iπ/4) to |1⟩ — pure phase, no probability change.' },
    { name: "Grover's Algorithm", desc: 'Uses phase "kickback" to mark the answer, then amplifies via interference.' },
    { name: 'Quantum Fourier Transform', desc: 'The basis of Shor\'s algorithm — entirely phase manipulation.' },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {apps.map(({ name, desc }) => (
        <div key={name} className="card">
          <h4 className="text-sm font-semibold text-indigo-300 mb-1">{name}</h4>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Lessons ──────────────────────────────────────────────────────────────── */

const LESSONS = [
  {
    title: 'What Is Phase?',
    hook: 'Quantum amplitudes have a "direction" — and that direction enables interference.',
    bullets: [
      'Classical probabilities are always ≥ 0 and cannot cancel each other.',
      'Quantum amplitudes can be negative or complex — they have a direction (phase).',
      'Two amplitudes pointing opposite directions cancel: destructive interference.',
    ],
    visual: <PhaseIntuitionVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Key insight:</strong> Phase doesn't change the probability of measuring 0 or 1
        in the Z basis. But it changes how states <em>interfere</em> — which is the engine of quantum algorithms.</p>
      </div>
    ),
    quiz: {
      question: 'What makes quantum amplitudes different from classical probabilities?',
      choices: [
        'Amplitudes are always larger than probabilities',
        'Amplitudes can be negative or complex, enabling interference',
        'Probabilities can be negative too',
        'Amplitudes only apply to |0⟩, not |1⟩',
      ],
      correct: 1,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>Phase is "hidden" in a single measurement. If you measure |ψ⟩ and |e^(iφ)ψ⟩ in the Z basis,
        you get the same probability distribution. Phase only becomes observable when states interfere —
        that's why quantum algorithms are needed to "reveal" it.</p>
      </div>
    ),
  },
  {
    title: 'Phase on the Unit Circle',
    hook: 'The phase e^(iφ) is a rotation angle — a point on a unit circle.',
    bullets: [
      'Euler\'s formula: e^(iφ) = cos(φ) + i·sin(φ). It\'s just a point on a circle.',
      'φ = 0 → e^(i·0) = 1 (pointing right). φ = 90° → e^(i·90°) = i (pointing up).',
      'φ = 180° → e^(i·180°) = -1. That negative sign causes destructive interference!',
    ],
    visual: <PhaseExplorer />,
    example: (
      <div>
        <MathDisplay>{'e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">Euler's formula — connects rotation angles to complex numbers.</p>
      </div>
    ),
    quiz: {
      question: 'What is e^(iπ)? (φ = 180°)',
      choices: ['1', 'i', '-1', '0'],
      correct: 2,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>e^(iπ) + 1 = 0 is Euler's identity — often called "the most beautiful equation in mathematics."
        It combines the five most important constants: e, i, π, 1, and 0.</p>
        <p>In quantum computing, e^(iπ) = -1 is the phase factor of the Z gate's action on |1⟩.
        It's the same -1 that causes the |−⟩ = (|0⟩ - |1⟩)/√2 state to differ from |+⟩.</p>
      </div>
    ),
  },
  {
    title: 'The Full Qubit State',
    hook: 'Every qubit state lives on the surface of the Bloch sphere.',
    bullets: [
      'Full state: cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩. Two angles describe any qubit.',
      'θ = 0 → pure |0⟩ (north pole). θ = π → pure |1⟩ (south pole).',
      'φ (longitude) controls phase. Moving φ doesn\'t change P(0) or P(1) in the Z basis.',
    ],
    visual: <BlochExplorer />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Try it:</strong> Set θ = 90° (equator). Now change φ.
        Notice P(0) and P(1) stay at 50% — but the state changes. That change is visible
        when you apply gates before measuring.</p>
      </div>
    ),
    quiz: {
      question: 'In the Bloch sphere, what state is at θ = 180° (south pole)?',
      choices: ['|0⟩', '|+⟩', '|1⟩', '|−⟩'],
      correct: 2,
    },
    deepDive: (
      <div className="space-y-2 text-sm text-slate-400">
        <p>The Bloch sphere uses θ/2 in the amplitudes (not θ directly). This is because of how
        quantum states transform under rotations — they use "spinor" representations where a 360°
        rotation of the Bloch sphere corresponds to a 720° rotation in state space.</p>
        <p>The north pole (|0⟩) and south pole (|1⟩) are orthogonal states despite being
        geometrically opposite, not at 90°. This is another spinor artifact.</p>
      </div>
    ),
  },
  {
    title: 'Measurement Bases',
    hook: 'You can measure along any axis — not just Z. The gate you apply before measuring chooses the axis.',
    bullets: [
      'Z basis (default): asks "is it |0⟩ or |1⟩?" — no gate needed.',
      'X basis: asks "is it |+⟩ or |−⟩?" — apply H gate first.',
      'Phase matters here! The state |+⟩ and |−⟩ differ only in phase, but measuring in X tells them apart.',
    ],
    visual: <BasisTableVisual />,
    example: (
      <div>
        <div className="card bg-amber-950/20 border-amber-800/30 text-sm text-slate-400">
          <p className="text-amber-300 font-medium mb-1 text-xs">Why this matters:</p>
          <p>A global phase (e^(iφ)|ψ⟩) is unobservable. But a <em>relative</em> phase between
          |0⟩ and |1⟩ components is detectable when you rotate your measurement basis first.</p>
        </div>
        <MathDisplay>{'H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}'}</MathDisplay>
        <p className="text-xs text-slate-500 text-center -mt-2">The Hadamard gate rotates the Bloch sphere, turning the X-axis into the Z-axis.</p>
      </div>
    ),
    quiz: {
      question: 'To measure in the X basis (distinguishing |+⟩ from |−⟩), what do you do?',
      choices: [
        'Use special X-basis hardware',
        'Apply an H gate before measuring in the Z basis',
        'Measure twice and average',
        'Phase never affects measurement outcomes, so nothing changes',
      ],
      correct: 1,
    },
  },
  {
    title: 'Where Phase Shows Up',
    hook: 'Phase is the secret ingredient in almost every quantum algorithm.',
    bullets: [
      "Hadamard gate: creates equal-phase superposition — the starting point of most algorithms.",
      "Grover's algorithm: uses phase kickback to mark the answer, then interference to amplify it.",
      'Quantum Fourier Transform: rotates phases around the Bloch sphere — basis of Shor\'s algorithm.',
    ],
    visual: <PhaseApplicationsVisual />,
    example: (
      <div className="card bg-slate-900/50 text-sm text-slate-400">
        <p><strong className="text-white">Grover's oracle:</strong> The trick is to flip the phase of the target state
        from +1 to -1. Then repeated H + oracle + H amplifies the target while cancelling all others via destructive
        interference. After √N steps, the right answer is almost certain.</p>
      </div>
    ),
    quiz: {
      question: 'Which algorithm uses phase kickback and interference to search an unsorted list?',
      choices: ["Shor's algorithm", 'Quantum Fourier Transform', "Grover's algorithm", 'The Hadamard gate'],
      correct: 2,
    },
  },
]

/* ── Module Page ──────────────────────────────────────────────────────────── */

export default function PhaseAngle() {
  const [step, setStep] = useState(0)
  const { markDone, markLessonPassed, getLessonPassed, completed } = useProgress()
  const passed = getLessonPassed('phase', LESSONS.length)
  const allPassed = passed.every(Boolean)
  const lesson = LESSONS[step]

  useEffect(() => {
    if (allPassed && !completed['phase']) markDone('phase')
  }, [allPassed])

  function handleQuizPass() {
    markLessonPassed('phase', step)
  }

  return (
    <ModuleLayout
      moduleId="phase"
      title="Phase & Measurement Angles"
      subtitle={`Lesson ${step + 1} of ${LESSONS.length} — ${lesson.title}`}
      prev={{ to: '/braket', label: 'Module 2: Bra-Ket' }}
      next={{ to: '/qiskit', label: 'Module 4: Qiskit' }}
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

          {/* Visual */}
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

          {step === LESSONS.length - 1 && allPassed && (
            <div className="my-6 p-5 rounded-2xl bg-green-950/30 border border-green-800/40 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-green-300 font-semibold">Module 3 Complete!</p>
              <p className="text-slate-400 text-sm mt-1">Head to Module 4 to write real Qiskit code.</p>
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
