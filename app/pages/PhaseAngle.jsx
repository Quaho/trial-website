import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import DiagramFrame from '../../components/DiagramFrame'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

function PhaseVsProbabilityFigure() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500">Classical probability</p>
        <div className="mt-4 flex justify-center gap-3">
          {[0.2, 0.5, 0.8, 1].map((value) => (
            <div key={value} className="flex flex-col items-center gap-2">
              <div
                className="w-10 rounded-t-md border border-sky-700/50 bg-sky-900/40"
                style={{ height: `${value * 60}px` }}
              />
              <span className="text-xs text-sky-400">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          Probabilities are nonnegative. They can be redistributed, but they do not cancel one another directly.
        </p>
      </div>

      <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-violet-400">Quantum amplitude</p>
        <div className="mt-4 flex justify-center gap-3">
          {[-0.7, -0.3, 0.5, 0.9].map((value) => (
            <div key={value} className="flex flex-col items-center">
              <div className="relative w-10" style={{ height: '64px' }}>
                <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-slate-600" />
                {value >= 0 ? (
                  <div
                    className="absolute left-0 right-0 bottom-1/2 rounded-t-md border border-violet-600 bg-violet-500/40"
                    style={{ height: `${value * 28}px`, transform: 'translateY(-100%)' }}
                  />
                ) : (
                  <div
                    className="absolute left-0 right-0 top-1/2 rounded-b-md border border-red-600 bg-red-500/30"
                    style={{ height: `${Math.abs(value) * 28}px` }}
                  />
                )}
              </div>
              <span className="mt-2 text-xs text-violet-300">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          Amplitudes carry phase information. Because of that, they can reinforce or cancel during interference.
        </p>
      </div>
    </div>
  )
}

function PhaseExplorer() {
  const [phiDeg, setPhiDeg] = useState(45)
  const phi = (phiDeg * Math.PI) / 180
  const cx = 80
  const cy = 80
  const radius = 58
  const x = cx + radius * Math.cos(phi)
  const y = cy - radius * Math.sin(phi)

  const labels = [
    { deg: 0, text: '1', x: cx + radius + 8, y: cy + 4 },
    { deg: 90, text: 'i', x: cx + 4, y: cy - radius - 8 },
    { deg: 180, text: '-1', x: cx - radius - 22, y: cy + 4 },
    { deg: 270, text: '-i', x: cx - 8, y: cy + radius + 16 },
  ]

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Phase on the Unit Circle</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        Move the phase angle <InlineMath>{'\\phi'}</InlineMath>. The complex factor
        <InlineMath>{'e^{i\\phi}'}</InlineMath> traces a point on the unit circle.
      </p>

      <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
        <svg viewBox="0 0 160 160" className="h-40 w-40 flex-shrink-0">
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#334155" strokeWidth="1.5" />
          <line x1={cx - radius - 10} y1={cy} x2={cx + radius + 10} y2={cy} stroke="#475569" strokeWidth="1" />
          <line x1={cx} y1={cy - radius - 10} x2={cx} y2={cy + radius + 10} stroke="#475569" strokeWidth="1" />

          {labels.map((label) => {
            const angle = (label.deg * Math.PI) / 180

            return (
              <g key={label.deg}>
                <circle cx={cx + radius * Math.cos(angle)} cy={cy - radius * Math.sin(angle)} r={3} fill="#475569" />
                <text x={label.x} y={label.y} fill="#64748b" fontFamily="monospace" fontSize="10">
                  {label.text}
                </text>
              </g>
            )
          })}

          {phiDeg > 5 && (
            <path
              d={`M ${cx + 28} ${cy} A 28 28 0 ${phiDeg > 180 ? 1 : 0} 0 ${cx + 28 * Math.cos(phi)} ${cy - 28 * Math.sin(phi)}`}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="1.5"
            />
          )}

          <line x1={cx} y1={cy} x2={x} y2={y} stroke="#8b5cf6" strokeLinecap="round" strokeWidth="2.5" />
          <circle cx={x} cy={y} r={5} fill="#8b5cf6" />
          <text x={cx + radius + 4} y={cy + 4} fill="#64748b" fontSize="9">Re</text>
          <text x={cx + 2} y={cy - radius - 4} fill="#64748b" fontSize="9">Im</text>
          <text x={cx + 32} y={cy + 14} fill="#a78bfa" fontSize="10">phi</text>
        </svg>

        <div className="w-full flex-1">
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>0 deg</span>
            <span className="font-mono text-violet-300">phi = {phiDeg} deg</span>
            <span>360 deg</span>
          </div>

          <input
            type="range"
            min="0"
            max="360"
            value={phiDeg}
            onChange={(event) => setPhiDeg(Number(event.target.value))}
            aria-label={`Phase angle ${phiDeg} degrees`}
            className="w-full accent-violet-500"
          />

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 font-mono text-xs text-center">
            <div className="text-violet-300">
              e^(iphi) = cos({phiDeg} deg) + i sin({phiDeg} deg)
            </div>
            <div className="mt-2 text-slate-400">
              = {Math.cos(phi).toFixed(3)} + {Math.sin(phi).toFixed(3)}i
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlochCircle({ theta, phi }) {
  const radius = 88
  const cx = 108
  const cy = 108
  const x = cx + radius * Math.sin(theta) * Math.cos(phi)
  const y = cy - radius * Math.cos(theta)

  return (
    <svg viewBox="0 0 216 216" className="mx-auto w-full max-w-xs">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#334155" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy} rx={radius} ry={radius * 0.22} fill="none" stroke="#334155" strokeDasharray="4 3" strokeWidth="1" />
      <line x1={cx} y1={cy - radius - 10} x2={cx} y2={cy + radius + 10} stroke="#475569" strokeWidth="1" />
      <line x1={cx - radius - 10} y1={cy} x2={cx + radius + 10} y2={cy} stroke="#475569" strokeWidth="1" />
      <text x={cx + 4} y={cy - radius - 12} fill="#94a3b8" fontFamily="monospace" fontSize="12">|0&gt;</text>
      <text x={cx + 4} y={cy + radius + 20} fill="#94a3b8" fontFamily="monospace" fontSize="12">|1&gt;</text>
      <line x1={cx} y1={cy} x2={x} y2={y} stroke="#6366f1" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx={x} cy={y} r={5} fill="#6366f1" />
      <path
        d={`M ${cx} ${cy - 28} A 28 28 0 ${theta > Math.PI ? 1 : 0} 1 ${cx + 28 * Math.sin(theta)} ${cy - 28 * Math.cos(theta)}`}
        fill="none"
        stroke="#a78bfa"
        strokeDasharray="3 2"
        strokeWidth="1.5"
      />
      <text x={cx + 10} y={cy - 14} fill="#a78bfa" fontFamily="monospace" fontSize="11">theta</text>
      <text x={cx} y={206} textAnchor="middle" fill="#6366f1" fontFamily="monospace" fontSize="10">
        cos(theta/2)|0&gt; + e^(iphi)sin(theta/2)|1&gt;
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
  const betaMagnitude = Math.sin(theta / 2)
  const p0 = (alpha * alpha * 100).toFixed(1)
  const p1 = (betaMagnitude * betaMagnitude * 100).toFixed(1)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="section-label">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Bloch-Sphere Coordinates</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        The angle <InlineMath>{'\\theta'}</InlineMath> controls the balance between
        <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath>. The angle
        <InlineMath>{'\\phi'}</InlineMath> controls relative phase.
      </p>

      <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="w-full sm:w-auto">
          <BlochCircle theta={theta} phi={phi} />
        </div>

        <div className="w-full flex-1 space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>theta (polar angle)</span>
              <span className="font-mono text-indigo-300">{thetaDeg} deg</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              value={thetaDeg}
              onChange={(event) => setThetaDeg(Number(event.target.value))}
              className="w-full accent-indigo-500"
              aria-label={`Polar angle ${thetaDeg} degrees`}
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>phi (phase angle)</span>
              <span className="font-mono text-violet-300">{phiDeg} deg</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={phiDeg}
              onChange={(event) => setPhiDeg(Number(event.target.value))}
              className="w-full accent-violet-500"
              aria-label={`Phase angle ${phiDeg} degrees`}
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 font-mono text-xs">
            <div className="text-slate-400">State</div>
            <div className="mt-2 text-indigo-300">
              {alpha.toFixed(3)}|0&gt; + {betaMagnitude.toFixed(3)} e^(i{phiDeg} deg)|1&gt;
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-indigo-800/40 bg-indigo-950/20 p-3 text-center">
              <div className="text-lg font-semibold text-indigo-300">{p0}%</div>
              <div className="text-xs text-slate-500">P(0)</div>
            </div>
            <div className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-3 text-center">
              <div className="text-lg font-semibold text-violet-300">{p1}%</div>
              <div className="text-xs text-slate-500">P(1)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BasisTable() {
  const bases = [
    {
      name: 'Z basis',
      states: ['|0>', '|1>'],
      prep: 'Direct computational-basis measurement',
      description: 'The default basis associated with the usual 0 and 1 outcomes.',
      cardClass: 'border-indigo-800/30',
      titleClass: 'text-indigo-300',
      pillClass: 'border-indigo-800/40 bg-indigo-950/30 text-indigo-300',
    },
    {
      name: 'X basis',
      states: ['|+>', '|->'],
      prep: 'Apply H before Z-basis measurement',
      description: 'Useful when relative phase distinguishes the states you care about.',
      cardClass: 'border-violet-800/30',
      titleClass: 'text-violet-300',
      pillClass: 'border-violet-800/40 bg-violet-950/30 text-violet-300',
    },
    {
      name: 'Y basis',
      states: ['|i+>', '|i->'],
      prep: 'Apply S-dagger then H before Z-basis measurement',
      description: 'Introduces explicitly complex phase structure.',
      cardClass: 'border-purple-800/30',
      titleClass: 'text-purple-300',
      pillClass: 'border-purple-800/40 bg-purple-950/30 text-purple-300',
    },
  ]

  return (
    <div className="space-y-3">
      {bases.map((basis) => (
        <div key={basis.name} className={`rounded-xl border bg-slate-900/60 p-4 ${basis.cardClass}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className={`text-sm font-semibold ${basis.titleClass}`}>{basis.name}</h3>
            <span className="rounded-full border border-slate-700/60 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-400">
              {basis.prep}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {basis.states.map((state) => (
              <span
                key={state}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${basis.pillClass}`}
              >
                {state}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">{basis.description}</p>
        </div>
      ))}
    </div>
  )
}

function PhaseApplicationsGrid() {
  const items = [
    {
      title: 'Hadamard gate',
      body: 'Creates an equal superposition whose relative phase becomes important once later gates act on it.',
    },
    {
      title: 'Phase gates',
      body: 'Gates such as S and T change phase without changing computational-basis probabilities on their own.',
    },
    {
      title: 'Grover-style search',
      body: 'Phase marking and interference work together to amplify the target outcome.',
    },
    {
      title: 'Quantum Fourier Transform',
      body: 'A structured manipulation of phases that sits under several advanced algorithms.',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

export default function PhaseAngle() {
  return (
    <ModuleLayout
      moduleId="phase"
      title="Phase & Measurement Angles"
      subtitle="An introductory chapter on phase, unit-circle intuition, basis choice, and why phase drives interference."
      prev={{ to: '/braket', label: 'Module 2: Bra-Ket Notation' }}
      next={{ to: '/qiskit', label: 'Module 4: Qiskit' }}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Once state notation is in place, the next conceptual step is phase. Phase is what makes
          quantum amplitudes more expressive than ordinary probabilities, and it is the reason
          interference can be used algorithmically rather than treated as a metaphor.
        </p>
        <p>
          This chapter introduces phase geometrically and operationally. The goal is to understand
          what phase changes, what it does not change, and why basis choice determines whether a
          phase difference becomes visible in measurement.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort reading single-qubit states in bra-ket notation.',
            'Basic familiarity with amplitudes and computational-basis measurement.',
            'Willingness to think of complex numbers geometrically rather than only algebraically.',
          ]}
        >
          If the notation <InlineMath>{'|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle'}</InlineMath> still
          feels unstable, review{' '}
          <Link to="/braket" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Bra-Ket Notation
          </Link>{' '}
          before continuing.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed">
            <li>Understand phase as part of an amplitude, not as an extra decorative label.</li>
            <li>See why relative phase can matter even when computational-basis probabilities do not change.</li>
            <li>Connect unit-circle intuition, Bloch-sphere coordinates, and basis choice in one picture.</li>
          </ul>
        </div>
      </div>

      <section className="mt-10">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Phase versus probability</h2>
        <p className="section-sub">
          Classical probabilities tell you how likely an outcome is. Quantum amplitudes do more than
          that: they also carry phase, which is what allows constructive and destructive interference.
        </p>

        <DefinitionBox term="Phase">
          Phase is the directional part of a complex amplitude. It does not by itself represent
          probability, but it changes how amplitudes combine when states or computational paths interfere.
        </DefinitionBox>

        <div className="mt-4">
          <RemarkBox>
            A single measurement in the computational basis can hide phase information completely. That
            does not mean phase is physically irrelevant; it means you need the right basis or the right
            interference pattern to reveal it.
          </RemarkBox>
        </div>

        <div className="mt-6">
          <PhaseVsProbabilityFigure />
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Phase on the unit circle</h2>
        <p className="section-sub">
          A phase factor can be written as a point on the complex unit circle. This turns phase into an
          angle rather than an abstract symbol.
        </p>

        <NotationBox symbol="e^(iphi) = cos(phi) + i sin(phi)">
          Euler's formula expresses a phase factor geometrically. The angle
          <InlineMath>{'\\phi'}</InlineMath> determines where the complex number sits on the unit circle.
        </NotationBox>

        <div className="mt-6">
          <PhaseExplorer />
        </div>

        <div className="mt-6">
          <ExampleBox>
            <p>
              When <InlineMath>{'\\phi = \\pi'}</InlineMath>, the phase factor is
              <InlineMath>{'e^{i\\pi} = -1'}</InlineMath>. That sign flip does not change a basis-state
              probability by itself, but it can reverse how that component interferes with another term.
            </p>
          </ExampleBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">The full one-qubit state and the Bloch sphere</h2>
        <p className="section-sub">
          A normalized single-qubit state can be parameterized by two angles. One angle controls the
          balance between basis states; the other controls relative phase.
        </p>

        <NotationBox symbol="|psi> = cos(theta/2)|0> + e^(iphi)sin(theta/2)|1>">
          The angle <InlineMath>{'\\theta'}</InlineMath> determines the magnitudes of the two basis-state
          amplitudes. The angle <InlineMath>{'\\phi'}</InlineMath> determines their relative phase.
        </NotationBox>

        <div className="mt-6">
          <BlochExplorer />
        </div>

        <div className="mt-6">
          <RemarkBox>
            Changing <InlineMath>{'\\phi'}</InlineMath> while holding <InlineMath>{'\\theta'}</InlineMath> fixed can
            leave <InlineMath>{'P(0)'}</InlineMath> and <InlineMath>{'P(1)'}</InlineMath> unchanged in the
            computational basis. That is why phase often feels hidden at first.
          </RemarkBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Measurement bases and relative phase</h2>
        <p className="section-sub">
          Phase becomes operationally visible when you measure in a basis that is sensitive to it.
          Changing basis is often implemented by applying a gate before measurement.
        </p>

        <DefinitionBox term="Measurement Basis">
          A measurement basis is the set of states used to interpret the outcome of a measurement. A
          state that looks indistinguishable in one basis can be easy to distinguish in another.
        </DefinitionBox>

        <div className="mt-6">
          <BasisTable />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: |+> versus |->">
            <p>
              The states <InlineMath>{'|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt{2}'}</InlineMath> and
              <InlineMath>{'|-\\rangle = (|0\\rangle - |1\\rangle)/\\sqrt{2}'}</InlineMath> have the same
              computational-basis probabilities: 50% for 0 and 50% for 1.
            </p>
            <p className="mt-3">
              They differ only by relative phase. Applying a Hadamard gate before measurement rotates
              that X-basis distinction into the Z basis, allowing the two states to be told apart.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Global phase and relative phase are different. Multiplying the entire state by the same
            factor <InlineMath>{'e^{i\\phi}'}</InlineMath> does not change measurement statistics, but changing
            the phase of one component relative to another can.
          </RemarkBox>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Where phase appears in algorithms</h2>
        <p className="section-sub">
          Phase is not a niche detail. It appears throughout introductory quantum computing because it
          is one of the main ways an algorithm reshapes amplitudes before measurement.
        </p>

        <div className="mt-6">
          <PhaseApplicationsGrid />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Grover-style Marking">
            <p>
              A common idea is to mark a target state by flipping its phase from +1 to -1. On its own,
              that may not change a direct measurement probability. But after the right sequence of
              reflections and basis changes, that phase difference becomes an amplitude advantage.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            The practical lesson is that phase is often manipulated first and observed only later,
            after additional gates convert the phase information into measurement bias.
          </RemarkBox>
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Treating phase as directly visible in any measurement.',
              clarification:
                'Phase can be invisible in one basis and highly consequential in another. Visibility depends on the measurement setup.',
            },
            {
              mistake: 'Assuming equal computational-basis probabilities imply the same quantum state.',
              clarification:
                'States such as |+> and |-> share Z-basis probabilities but differ by relative phase and behave differently under basis change.',
            },
            {
              mistake: 'Confusing global phase with relative phase.',
              clarification:
                'A common phase factor on the whole state is physically irrelevant, while a phase difference between components can alter interference.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Phase is part of the amplitude description and becomes important through interference.',
            "Euler's formula turns phase into geometry on the complex unit circle.",
            'The Bloch-sphere picture separates amplitude balance from relative phase.',
            'Basis choice determines whether a phase difference becomes visible in measurement.',
            'Many algorithms rely on phase manipulation before converting it into a final measurement advantage.',
          ]}
        />
      </div>

      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">Move into implementation</h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          The next module turns these ideas into code. You will see how states, basis choice, and gates
          are expressed concretely in an introductory Qiskit workflow.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/qiskit" className="btn-primary">
            Continue to Qiskit
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Review the Glossary
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
