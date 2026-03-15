import { useState } from 'react'
import ModuleLayout from '../components/ModuleLayout'
import SummaryBox from '../components/SummaryBox'
import MistakesBox from '../components/MistakesBox'
import { MathDisplay, Math } from '../components/MathBlock'

/* ── Bloch Sphere SVG (simplified 2D cross-section) ───────────────────────── */
function BlochCircle({ theta, phi }) {
  const r = 90
  const cx = 110, cy = 110

  // State vector tip on the circle (using theta as polar angle from +Z)
  const x = cx + r * Math.sin(theta) * Math.cos(phi)
  const y = cy - r * Math.cos(theta)

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-xs mx-auto">
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1.5" />
      {/* Equator ellipse (perspective) */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.2} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />
      {/* Axes */}
      <line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke="#475569" strokeWidth="1" />
      <line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke="#475569" strokeWidth="1" />
      {/* Labels */}
      <text x={cx + 4} y={cy - r - 12} fill="#94a3b8" fontSize="12" fontFamily="monospace">|0⟩</text>
      <text x={cx + 4} y={cy + r + 20} fill="#94a3b8" fontSize="12" fontFamily="monospace">|1⟩</text>
      <text x={cx + r + 5} y={cy + 4} fill="#94a3b8" fontSize="11" fontFamily="monospace">x</text>
      {/* State vector */}
      <line x1={cx} y1={cy} x2={x} y2={y} stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
      {/* Dot at tip */}
      <circle cx={x} cy={y} r={5} fill="#6366f1" />
      {/* Theta arc */}
      <path
        d={`M ${cx} ${cy - 30} A 30 30 0 ${theta > Math.PI ? 1 : 0} 1 ${cx + 30 * Math.sin(theta)} ${cy - 30 * Math.cos(theta)}`}
        fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 2"
      />
      <text x={cx + 10} y={cy - 15} fill="#a78bfa" fontSize="11" fontFamily="monospace">θ</text>
      {/* Current state label */}
      <text x={cx} y={210} textAnchor="middle" fill="#6366f1" fontSize="11" fontFamily="monospace">
        {theta === 0 ? '|0⟩' : theta >= Math.PI - 0.01 ? '|1⟩' : `cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩`}
      </text>
    </svg>
  )
}

/* ── Phase Explorer ────────────────────────────────────────────────────────── */
function PhaseExplorer() {
  const [phiDeg, setPhiDeg] = useState(0)
  const phi = (phiDeg * Math.PI) / 180
  const cx = 80, cy = 80, r = 60

  const x = cx + r * Math.cos(phi)
  const y = cy - r * Math.sin(phi)

  return (
    <div className="card border-violet-800/40 my-6">
      <h4 className="font-semibold text-white mb-1">Interactive: Phase on the Unit Circle</h4>
      <p className="text-sm text-slate-400 mb-4">
        Phase e<sup>iφ</sup> is a point on the unit circle. Drag the slider to rotate it.
        Notice: phase doesn't change measurement probabilities — only interference effects.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 160 160" className="w-40 h-40 flex-shrink-0">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1.5" />
          <line x1={cx - r - 8} y1={cy} x2={cx + r + 8} y2={cy} stroke="#475569" strokeWidth="1" />
          <line x1={cx} y1={cy - r - 8} x2={cx} y2={cy + r + 8} stroke="#475569" strokeWidth="1" />
          {/* Phase arc */}
          {phiDeg !== 0 && (
            <path
              d={`M ${cx + 30} ${cy} A 30 30 0 ${phiDeg > 180 ? 1 : 0} 0 ${cx + 30 * Math.cos(phi)} ${cy - 30 * Math.sin(phi)}`}
              fill="none" stroke="#a78bfa" strokeWidth="1.5"
            />
          )}
          {/* Vector */}
          <line x1={cx} y1={cy} x2={x} y2={y} stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={x} cy={y} r={5} fill="#8b5cf6" />
          {/* Labels */}
          <text x={cx + r + 5} y={cy + 4} fill="#64748b" fontSize="10">Re</text>
          <text x={cx + 2} y={cy - r - 3} fill="#64748b" fontSize="10">Im</text>
          <text x={cx + 35} y={cy + 14} fill="#a78bfa" fontSize="10">φ</text>
        </svg>

        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>0°</span>
            <span className="text-violet-300 font-mono">φ = {phiDeg}°</span>
            <span>360°</span>
          </div>
          <input
            type="range" min="0" max="360" value={phiDeg}
            onChange={e => setPhiDeg(parseInt(e.target.value))}
            className="w-full accent-violet-500"
          />
          <div className="mt-4 bg-slate-900 rounded-xl p-3 font-mono text-sm text-center">
            <span className="text-violet-300">e<sup>iφ</sup></span>
            <span className="text-slate-500"> = cos({phiDeg}°) + i·sin({phiDeg}°)</span>
            <br />
            <span className="text-slate-400 text-xs">
              = {Math.cos(phi).toFixed(3)} + {Math.sin(phi).toFixed(3)}i
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Bloch Explorer ────────────────────────────────────────────────────────── */
function BlochExplorer() {
  const [thetaDeg, setThetaDeg] = useState(90)
  const [phiDeg, setPhiDeg] = useState(0)
  const theta = (thetaDeg * Math.PI) / 180
  const phi   = (phiDeg   * Math.PI) / 180

  const alpha = Math.cos(theta / 2)
  const betaMag = Math.sin(theta / 2)
  const p0 = (alpha * alpha * 100).toFixed(1)
  const p1 = (betaMag * betaMag * 100).toFixed(1)

  return (
    <div className="card border-indigo-800/40 my-6">
      <h4 className="font-semibold text-white mb-1">Interactive: Bloch Sphere Explorer</h4>
      <p className="text-sm text-slate-400 mb-4">
        Every single-qubit state lives on the surface of the Bloch sphere.
        θ sets the "latitude" (superposition mix), φ sets the "longitude" (phase).
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
                   className="w-full accent-indigo-500" />
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
                   className="w-full accent-violet-500" />
          </div>

          <div className="bg-slate-900 rounded-xl p-3 font-mono text-xs">
            <div className="text-slate-400 mb-1">State:</div>
            <div className="text-indigo-300">{alpha.toFixed(3)}|0⟩ + {betaMag.toFixed(3)}·e<sup>i{phiDeg}°</sup>|1⟩</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-indigo-950/40 rounded-lg p-2 text-center text-sm">
              <div className="text-indigo-300 font-bold">{p0}%</div>
              <div className="text-slate-500 text-xs">P(0)</div>
            </div>
            <div className="bg-violet-950/40 rounded-lg p-2 text-center text-sm">
              <div className="text-violet-300 font-bold">{p1}%</div>
              <div className="text-slate-500 text-xs">P(1)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Measurement Basis ─────────────────────────────────────────────────────── */
function BasisTable() {
  const bases = [
    { name: 'Z (computational)', states: ['|0⟩', '|1⟩'], gate: 'None needed', desc: 'The standard basis. What you get if you just measure without any gate.' },
    { name: 'X (Hadamard)', states: ['|+⟩', '|−⟩'], gate: 'H gate before measure', desc: 'Measures in the superposition basis. |+⟩ = (|0⟩+|1⟩)/√2.' },
    { name: 'Y', states: ['|i+⟩', '|i−⟩'], gate: 'S†H before measure', desc: 'Uses complex (imaginary) amplitudes. Less common in intro courses.' },
  ]
  return (
    <div className="space-y-3 my-6">
      {bases.map(({ name, states, gate, desc }) => (
        <div key={name} className="card">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-white">{name} Basis</h4>
            <span className="badge bg-slate-800 text-slate-400 font-mono text-xs">{gate}</span>
          </div>
          <div className="flex gap-2 mb-2">
            {states.map(s => (
              <span key={s} className="badge bg-indigo-900/40 text-indigo-300 font-mono">{s}</span>
            ))}
          </div>
          <p className="text-sm text-slate-400">{desc}</p>
        </div>
      ))}
    </div>
  )
}

const SUMMARY = [
  'A qubit state is written cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩. Every state lives on the Bloch sphere.',
  'θ (polar angle) controls the mix of |0⟩ and |1⟩. θ=0 is pure |0⟩, θ=π is pure |1⟩, θ=π/2 is 50/50.',
  'φ (phase angle) rotates the state around the Z-axis. It doesn\'t change measurement probabilities in the Z basis, but matters for interference and measurements in other bases.',
  'Measuring in a different basis means rotating the state first (with gates), then measuring in the Z basis.',
  'The Hadamard gate H rotates the Bloch sphere so Z-basis |+⟩/|−⟩ become the new poles — this is X-basis measurement.',
]

const MISTAKES = [
  {
    mistake: '"Phase is irrelevant because it doesn\'t affect probabilities."',
    clarification: 'Global phase is unobservable, but relative phase (between |0⟩ and |1⟩ components) absolutely matters. It determines interference behavior and changes outcomes when measured in a rotated basis.',
  },
  {
    mistake: '"Measuring in a different basis requires different hardware."',
    clarification: 'No — you always measure in the Z basis. Measuring in another basis means applying a rotation gate (like H) before the standard measurement. The basis change is done in software.',
  },
  {
    mistake: '"θ in the Bloch sphere is the same angle as in the state α|0⟩ + β|1⟩."',
    clarification: 'The Bloch sphere uses θ/2. If θ = 90° on the Bloch sphere, the state is cos(45°)|0⟩ + sin(45°)|1⟩ = |+⟩. The half-angle is a geometric artifact of representing spinors.',
  },
]

export default function PhaseAngle() {
  return (
    <ModuleLayout
      moduleId="phase"
      title="Phase & Measurement Angles"
      subtitle="Intuition first: what phase really means, why it matters, and how measurement bases work."
      prev={{ to: '/braket', label: 'Module 2: Bra-Ket' }}
      next={{ to: '/qiskit', label: 'Module 4: Qiskit' }}
    >
      {/* Section 1: Intuition */}
      <section className="mb-12">
        <h2 className="section-heading">What Is Phase? The Intuition</h2>
        <p className="section-sub">Think of waves before thinking of math</p>

        <div className="prose-quantum">
          <p>
            In module 1, we said quantum states have <strong className="text-white">amplitudes</strong> —
            not just probabilities. Here's the key difference: probabilities are always positive numbers
            between 0 and 1. Amplitudes can be <em>negative</em> or even <em>complex numbers</em>.
          </p>
          <p>
            The <strong className="text-white">phase</strong> of an amplitude is its "direction" in the
            complex number plane — like the angle of a clock hand. Two amplitudes with the same
            magnitude but different phases can <em>interfere</em>: they add if they point the same
            direction, and cancel if they point opposite directions.
          </p>
        </div>

        <div className="card my-6 bg-slate-900/50">
          <p className="text-sm font-medium text-white mb-2">Key insight:</p>
          <p className="text-sm text-slate-400">
            Phase doesn't directly change the probability of measuring 0 or 1.
            But it changes <em>how states interfere with each other</em>, which is
            the engine of quantum algorithms.
          </p>
        </div>

        <PhaseExplorer />
      </section>

      {/* Section 2: Math */}
      <section className="mb-12">
        <h2 className="section-heading">The Math of Phase</h2>
        <p className="section-sub">Complex amplitudes and the Bloch sphere</p>

        <div className="prose-quantum">
          <p>
            The most general single-qubit state is written:
          </p>
        </div>

        <MathDisplay>{'|\\psi\\rangle = \\cos\\!\\frac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\!\\frac{\\theta}{2}|1\\rangle'}</MathDisplay>

        <div className="prose-quantum">
          <p>
            Here <Math>{'\\theta'}</Math> (theta) is the <strong className="text-white">polar angle</strong> —
            it controls how much of |0⟩ vs |1⟩ is in the state.
            And <Math>{'\\varphi'}</Math> (phi) is the <strong className="text-white">phase angle</strong> —
            it rotates the |1⟩ component in the complex plane using Euler's formula:
          </p>
        </div>

        <MathDisplay>{'e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi'}</MathDisplay>

        <div className="card my-4 bg-slate-900/50">
          <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
            {[
              { cond: 'θ = 0', result: '|ψ⟩ = |0⟩', desc: 'Pure |0⟩, North pole' },
              { cond: 'θ = π', result: '|ψ⟩ = |1⟩', desc: 'Pure |1⟩, South pole' },
              { cond: 'θ = π/2', result: '|ψ⟩ = |+⟩', desc: 'Equal superposition, equator' },
            ].map(({ cond, result, desc }) => (
              <div key={cond} className="bg-indigo-950/30 rounded-lg p-3">
                <code className="text-xs text-slate-500">{cond}</code>
                <div className="text-indigo-300 font-mono my-1">{result}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <BlochExplorer />
      </section>

      {/* Section 3: Measurement angle */}
      <section className="mb-12">
        <h2 className="section-heading">Measurement Angle & Bases</h2>
        <p className="section-sub">Choosing how you look at a qubit changes what you can learn</p>

        <div className="prose-quantum">
          <p>
            So far, we've been measuring in the <strong className="text-white">Z basis</strong> —
            asking "is it |0⟩ or |1⟩?" But you can rotate your measurement to ask different questions.
          </p>
          <p>
            Imagine the Bloch sphere as a globe. The Z basis measures along the north-south axis.
            The X basis measures along the east-west axis. A state that's a 50/50 superposition
            in Z (like |+⟩) is <em>definitely</em> |+⟩ in X — measuring it in X gives a certain answer!
          </p>
        </div>

        <BasisTable />

        <div className="prose-quantum">
          <p>
            This might feel abstract. Here's the punchline: <strong className="text-white">
            to measure in a different basis, you apply a rotation gate before measuring in Z</strong>.
            The Hadamard gate H rotates the Bloch sphere 90°, turning the X-axis into the Z-axis.
          </p>
        </div>

        <MathDisplay>{'H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}'}</MathDisplay>

        <div className="card my-4 bg-amber-950/20 border-amber-800/30">
          <p className="text-sm text-amber-300 font-medium mb-1">Why does this matter?</p>
          <p className="text-sm text-slate-400">
            Phase matters <em>only when combined with a rotation</em>. A state |0⟩ and e<sup>iφ</sup>|0⟩
            are identical in the Z basis. But rotate by H first, and they give different outcomes!
            This is how quantum gates manipulate phase to create interference.
          </p>
        </div>
      </section>

      {/* Section 4: Real-world relevance */}
      <section className="mb-8">
        <h2 className="section-heading">Where Phase Shows Up</h2>
        <p className="section-sub">Why you'll need this in real quantum algorithms</p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            { name: 'Hadamard Gate', desc: 'Creates superposition. Turns |0⟩ into |+⟩, building equal-phase combinations of |0⟩ and |1⟩.' },
            { name: 'Phase Gate (S, T)', desc: 'Adds a phase e^(iπ/2) or e^(iπ/4) to |1⟩ without changing probabilities — pure phase manipulation.' },
            { name: 'Grover\'s Algorithm', desc: 'Uses phase "kickback" to mark the answer, then interference to amplify it. Phase is the engine.' },
            { name: 'QFT', desc: 'The quantum Fourier transform — the basis of Shor\'s and many other algorithms — is entirely phase manipulation.' },
          ].map(({ name, desc }) => (
            <div key={name} className="card">
              <h4 className="font-semibold text-indigo-300 mb-1">{name}</h4>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SummaryBox points={SUMMARY} />
      <MistakesBox items={MISTAKES} />
    </ModuleLayout>
  )
}
