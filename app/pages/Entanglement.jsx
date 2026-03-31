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
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const ENTANGLEMENT_OUTLINE = [
  { id: 'entanglement-correlation', label: 'Correlation versus entanglement' },
  { id: 'entanglement-bell', label: 'Creating a Bell pair' },
  { id: 'entanglement-factor', label: 'Why the Bell state does not factor' },
  { id: 'entanglement-measurement', label: 'What measurement changes locally' },
  { id: 'entanglement-limits', label: 'Misconceptions and practical limits' },
  { id: 'entanglement-next', label: 'Next steps' },
]

function EntanglementSupport() {
  return (
    <>
      <RailCard label="Key States" title="What To Recognize">
        <ul className="space-y-2">
          <li><span className="font-mono text-teal-300">|Phi+&gt;</span>: the standard Bell pair with matching computational-basis outcomes.</li>
          <li><span className="font-mono text-teal-300">|psi_A&gt; ⊗ |psi_B&gt;</span>: a product state, so not entangled.</li>
          <li><span className="font-mono text-teal-300">P(00) = P(11) = 1/2</span>: ideal joint statistics for the Bell state in the Z basis.</li>
        </ul>
      </RailCard>

      <RailCard label="Reading Lens" title="What To Keep Straight">
        <ul className="space-y-2">
          <li>Perfect matching by itself does not prove entanglement; basis changes matter.</li>
          <li>Entanglement is about a joint state that cannot be factorized into independent local states.</li>
          <li>Measurement reveals correlations, but it does not create a faster-than-light communication channel.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/projects/bell-explorer" className="btn-secondary justify-center">Open Bell Explorer</Link>
          <Link to="/multiqubit" className="btn-ghost justify-center">Review Multi-Qubit</Link>
        </div>
      </RailCard>
    </>
  )
}

function CorrelationVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="section-label">Classical Case</p>
        <h3 className="mt-3 text-lg font-semibold text-white">Predetermined matching data</h3>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500">Source model</p>
          <p className="mt-3 font-mono text-sm text-white">50% -&gt; 00, 50% -&gt; 11</p>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
          <li>The source decides the pair before anyone measures it.</li>
          <li>Opening one side only reveals which pre-existing case was sent.</li>
          <li>A local hidden-variable story can account for the outcomes.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-teal-800/40 bg-teal-950/15 p-5">
        <p className="section-label text-teal-400">Quantum Case</p>
        <h3 className="mt-3 text-lg font-semibold text-white">A Bell pair</h3>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-slate-200">
          <MathDisplay>{'|\\Phi^+\\rangle = \\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}}'}</MathDisplay>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
          <li>The pair is described by one joint state, not two independent local state vectors.</li>
          <li>Each local result is random, but the joint outcomes are structured.</li>
          <li>Changing measurement basis reveals coherence that classical matching data cannot reproduce.</li>
        </ul>
      </div>
    </div>
  )
}

function BellCreationVisual() {
  const steps = [
    {
      label: 'Start',
      state: '|00\\rangle',
      body: 'Both qubits begin in the computational basis state |00>.',
      frame: 'border-slate-800 bg-slate-950/70',
    },
    {
      label: 'Apply H to qubit 0',
      state: '\\tfrac{|00\\rangle + |10\\rangle}{\\sqrt{2}}',
      body: 'This is still a product state: |+> ⊗ |0>. Superposition alone is not entanglement.',
      frame: 'border-indigo-800/40 bg-indigo-950/20',
    },
    {
      label: 'Apply CNOT(0, 1)',
      state: '\\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
      body: 'The control-target interaction turns the one-qubit superposition into a joint two-qubit state.',
      frame: 'border-teal-800/40 bg-teal-950/20',
    },
  ]

  return (
    <div className="rounded-2xl border border-teal-800/40 bg-teal-950/15 p-5">
      <p className="section-label text-teal-400">State Preparation</p>
      <h3 className="mt-3 text-lg font-semibold text-white">From |00&gt; to a Bell pair</h3>
      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <div key={step.label} className={`rounded-xl border p-4 ${step.frame}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-widest text-slate-500">Step {index + 1}</p>
              <p className="text-sm font-semibold text-white">{step.label}</p>
            </div>
            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-slate-200">
              <MathDisplay>{step.state}</MathDisplay>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        The Hadamard gate creates <Keyword tone="superposition">superposition</Keyword>. The controlled
        gate creates <Keyword tone="entanglement">entanglement</Keyword>.
      </p>
    </div>
  )
}

function FactoringProofVisual() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500">Assume a product form</p>
        <MathDisplay>
          {'\\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}} = (a|0\\rangle + b|1\\rangle) \\otimes (c|0\\rangle + d|1\\rangle)'}
        </MathDisplay>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500">Expand the tensor product</p>
        <MathDisplay>{'ac|00\\rangle + ad|01\\rangle + bc|10\\rangle + bd|11\\rangle'}</MathDisplay>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500">Match coefficients</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 font-mono text-sm text-white">
            ac = 1/sqrt(2)
          </div>
          <div className="rounded-lg border border-red-800/30 bg-red-950/20 px-3 py-2 font-mono text-sm text-red-300">
            ad = 0
          </div>
          <div className="rounded-lg border border-red-800/30 bg-red-950/20 px-3 py-2 font-mono text-sm text-red-300">
            bc = 0
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 font-mono text-sm text-white">
            bd = 1/sqrt(2)
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-red-800/30 bg-red-950/15 p-4">
        <p className="text-xs uppercase tracking-widest text-red-400">Contradiction</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          The zero coefficients force either <InlineMath>{'a = 0'}</InlineMath> or
          <InlineMath>{' d = 0'}</InlineMath>, and either <InlineMath>{'b = 0'}</InlineMath> or
          <InlineMath>{' c = 0'}</InlineMath>. But the nonzero coefficients require
          <InlineMath>{'a, c, b, d \\neq 0'}</InlineMath>. Those conditions are incompatible, so the factorization fails.
        </p>
      </div>
    </div>
  )
}

function MeasurementEffectVisual() {
  const [history, setHistory] = useState([])
  const lastOutcome = history.at(-1)
  const count0 = history.filter((value) => value === 0).length
  const count1 = history.length - count0

  function measureLeftQubit() {
    const outcome = Math.random() < 0.5 ? 0 : 1
    setHistory((prev) => [...prev, outcome])
  }

  function reset() {
    setHistory([])
  }

  return (
    <div className="rounded-2xl border border-teal-800/40 bg-teal-950/15 p-5">
      <p className="section-label text-teal-400">Interactive Check</p>
      <h3 className="mt-3 text-lg font-semibold text-white">Measure One Qubit of a Bell Pair</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        Each run measures the left qubit of <InlineMath>{'|\\Phi^+\\rangle'}</InlineMath>. The local result
        is random, but the partner qubit always matches in the same measurement basis.
      </p>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        {lastOutcome === undefined ? (
          <>
            <div className="text-slate-200">
              <MathDisplay>{'|\\Phi^+\\rangle = \\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}}'}</MathDisplay>
            </div>
            <p className="mt-2 text-center text-sm text-slate-400">
              Before measurement, neither subsystem is assigned a definite computational-basis value.
            </p>
          </>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {['Left qubit', 'Right qubit'].map((label) => (
              <div key={label} className="rounded-xl border border-teal-800/30 bg-teal-950/20 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-teal-400">{label}</p>
                <div className="mt-3 font-mono text-3xl text-white">|{lastOutcome}&gt;</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={measureLeftQubit}
          className="btn-primary text-sm"
          aria-label="Measure the left qubit of the Bell pair"
        >
          Measure Left Qubit
        </button>
        <button
          onClick={reset}
          className="btn-secondary text-sm"
          aria-label="Reset the Bell-pair measurement simulator"
        >
          Reset
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Observed joint outcomes</p>
          <div className="mt-4 space-y-3">
            {[
              { label: '00', count: count0 },
              { label: '11', count: count1 },
            ].map((row) => {
              const width = history.length ? `${(row.count / history.length) * 100}%` : '0%'
              return (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300">{row.label}</span>
                    <span className="text-slate-400">{row.count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-teal-500 transition-all duration-300" style={{ width }} />
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            The simulator never produces 01 or 10 for the ideal Bell state in this basis.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Entanglement() {
  return (
    <ModuleLayout
      moduleId="entanglement"
      title="Entanglement"
      subtitle="Why some two-qubit states must be treated as one joint object rather than as independent local states."
      prev={{ to: '/multiqubit', label: 'Module 6: Multi-Qubit Systems' }}
      next={{ to: '/circuits', label: 'Module 8: Quantum Circuits' }}
      outline={ENTANGLEMENT_OUTLINE}
      aside={<EntanglementSupport />}
    >
      <div className="prose-quantum max-w-none">
        <p>
          <Keyword tone="entanglement">Entanglement</Keyword> is the first two-qubit phenomenon that resists
          classical reinterpretation. Once a joint state cannot be written as a <Keyword tone="tensor">tensor product</Keyword>{' '}
          of two independent one-qubit states, the pair must be analyzed as one object.
        </p>
        <p>
          This chapter focuses on the standard Bell-pair example. The goal is to make three points stable:
          matching outcomes do not automatically imply entanglement, Bell states are nonfactorizable, and
          <Keyword tone="measurement">measurement</Keyword> reveals strong correlations without opening a
          faster-than-light signalling channel.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PrereqList
          items={[
            'Comfort with two-qubit basis states and tensor products from the previous module.',
            'Basic familiarity with Hadamard and controlled-NOT gates.',
            'Willingness to reason about joint states rather than one subsystem at a time.',
          ]}
        >
          If the notation for multi-qubit states still feels unstable, review{' '}
          <Link to="/multiqubit" className="text-indigo-400 transition-colors hover:text-indigo-300">
            Multi-Qubit Systems
          </Link>{' '}
          before using Bell states as a conceptual template.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Distinguish ordinary <Keyword tone="correlation">correlation</Keyword> from genuine <Keyword tone="entanglement">entanglement</Keyword>.</li>
            <li>Read the Bell state <Keyword tone="bell">|Phi+&gt;</Keyword> and explain how a short circuit prepares it.</li>
            <li>Test whether a two-qubit pure state can be factorized into a product state.</li>
            <li>Explain why Bell-pair measurement correlations do not transmit controllable information.</li>
          </ul>
        </div>
      </div>

      <section id="entanglement-correlation" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Correlation versus entanglement</h2>
        <p className="section-sub">
          A pair of systems can be strongly <Keyword tone="correlation">correlated</Keyword> without being
          <Keyword tone="entanglement">entangled</Keyword>. The key distinction is whether the joint behavior can
          be explained by predetermined local data or whether the state itself resists factorization.
        </p>

        <DefinitionBox term="Entangled State">
          A pure two-qubit state is <Keyword tone="entanglement">entangled</Keyword> if it cannot be written as
          <InlineMath>{'|\\psi_A\\rangle \\otimes |\\psi_B\\rangle'}</InlineMath>. In that case, the pair has a
          genuinely joint state description rather than two independent local state vectors.
        </DefinitionBox>

        <div className="mt-6">
          <CorrelationVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Matching Outcomes Are Not Enough">
            <MathDisplay>{'|\\Phi^+\\rangle = \\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}} = \\tfrac{|++\\rangle + |--\\rangle}{\\sqrt{2}}'}</MathDisplay>
            <p>
              In the computational basis, a classical source that emits 00 half the time and 11 half the time
              can imitate the Bell pair perfectly. That is why matching Z-basis outcomes alone do not certify
              entanglement.
            </p>
            <p className="mt-3">
              The difference appears after a basis change. The Bell pair remains correlated because the coherent
              phase relation survives. A classical mixture lacks that coherence.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: Why Bell's theorem matters" label="Historical Landmark">
            <p>
              Local hidden-variable models assume that each subsystem carries predetermined instructions for every
              measurement setting. Bell showed that such models obey inequality constraints that quantum predictions violate.
            </p>
            <p className="mt-3">
              In one common form, the CHSH combination satisfies <InlineMath>{'|S| \\leq 2'}</InlineMath> for
              local hidden-variable theories, while quantum mechanics allows
              <InlineMath>{'|S| = 2\\sqrt{2}'}</InlineMath>.
            </p>
            <p className="mt-3">
              The important handbook-level takeaway is not the derivation itself. It is that Bell tests separate
              classical correlation from genuinely quantum joint structure.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Perfectly matched outcomes are a clue, not a definition. The nonclassical part is the joint structure
            that survives basis changes and defeats every local factorization story.
          </RemarkBox>
        </div>
      </section>

      <section id="entanglement-bell" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Creating a Bell pair</h2>
        <p className="section-sub">
          The standard introductory Bell state is created by combining one-qubit <Keyword tone="superposition">superposition</Keyword>{' '}
          with a two-qubit controlled interaction. The entanglement appears only after the controlled gate acts.
        </p>

        <DefinitionBox term="Bell State">
          A <Keyword tone="bell">Bell state</Keyword> is one of four maximally entangled two-qubit states. The
          most common introductory example is <InlineMath>{'|\\Phi^+\\rangle'}</InlineMath>, whose ideal Z-basis
          measurements produce only 00 and 11.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="|Phi+> = (|00> + |11>) / sqrt(2)">
            This state assigns equal amplitude to <InlineMath>{'|00\\rangle'}</InlineMath> and
            <InlineMath>{' |11\\rangle'}</InlineMath>, with zero amplitude on
            <InlineMath>{' |01\\rangle'}</InlineMath> and <InlineMath>{' |10\\rangle'}</InlineMath>.
          </NotationBox>
        </div>

        <div className="mt-6">
          <BellCreationVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Where Entanglement First Appears">
            <MathDisplay>{'|00\\rangle \\xrightarrow{H \\otimes I} |+\\rangle \\otimes |0\\rangle \\xrightarrow{CX} |\\Phi^+\\rangle'}</MathDisplay>
            <p>
              After the Hadamard gate, the state is still separable:
              <InlineMath>{' |+\\rangle \\otimes |0\\rangle'}</InlineMath>. The CNOT is the step that removes
              factorization and produces a Bell pair.
            </p>
            <p className="mt-3">
              The same construction is the core of the{' '}
              <Link to="/projects/bell-explorer" className="text-emerald-400 transition-colors hover:text-emerald-300">
                Bell Explorer project
              </Link>
              , where the ideal statistics can be compared against simulation output directly.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Superposition is necessary but not sufficient. A product of two single-qubit superpositions is still
            not entangled unless the joint state fails to factor.
          </RemarkBox>
        </div>
      </section>

      <section id="entanglement-factor" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Why the Bell state does not factor</h2>
        <p className="section-sub">
          For pure two-qubit states, entanglement is a statement about algebra as much as interpretation:
          the coefficients fail every attempt to rewrite the state as a product of local vectors.
        </p>

        <DefinitionBox term="Product State">
          A pure two-qubit <Keyword tone="tensor">product state</Keyword> has the form
          <InlineMath>{'(a|0\\rangle + b|1\\rangle) \\otimes (c|0\\rangle + d|1\\rangle)'}</InlineMath>. If a
          state cannot be written that way, it is entangled.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="alpha_00 alpha_11 = alpha_01 alpha_10">
            For a pure state written as
            <InlineMath>{'\\alpha_{00}|00\\rangle + \\alpha_{01}|01\\rangle + \\alpha_{10}|10\\rangle + \\alpha_{11}|11\\rangle'}</InlineMath>,
            this equality is the quick separability test. If it fails, the state is entangled.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Quick Separability Test">
            <MathDisplay>{'|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}|00\\rangle + 0|01\\rangle + 0|10\\rangle + \\tfrac{1}{\\sqrt{2}}|11\\rangle'}</MathDisplay>
            <p>
              Here <InlineMath>{'\\alpha_{00}\\alpha_{11} = 1/2'}</InlineMath> while
              <InlineMath>{' \\alpha_{01}\\alpha_{10} = 0'}</InlineMath>. Because those products do not match,
              the state cannot be separable.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: Coefficient-matching proof" label="Algebraic Aside">
            <FactoringProofVisual />
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is the structural reason entangled qubits do not have independent local descriptions. The
            meaningful object is the joint state vector of the pair.
          </RemarkBox>
        </div>
      </section>

      <section id="entanglement-measurement" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">What measurement changes locally</h2>
        <p className="section-sub">
          Measuring one subsystem of a Bell pair produces a definite joint outcome in that basis, but each local
          outcome remains individually random before the comparison is made.
        </p>

        <DefinitionBox term="Local Statistics">
          Local statistics describe what one observer can infer from one subsystem alone. For an ideal Bell pair,
          each observer sees a 50/50 distribution in the computational basis when they ignore the partner's record.
        </DefinitionBox>

        <div className="mt-4">
          <NotationBox symbol="P(A = 0) = P(A = 1) = 1/2">
            The Bell pair has definite joint structure but maximally uncertain local outcomes in the computational basis.
            That is why the measurements are correlated without giving either side a controllable message channel.
          </NotationBox>
        </div>

        <div className="mt-6">
          <MeasurementEffectVisual />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Why This Does Not Send A Signal">
            <MathDisplay>{'P(B = 0) = P(B = 1) = 1/2'}</MathDisplay>
            <p>
              Suppose Alice measures the left qubit. Her outcome is random. Bob's local statistics remain 50/50
              whether or not Alice measured, so Bob cannot tell from his data alone what Alice did.
            </p>
            <p className="mt-3">
              The correlation becomes visible only when the two records are compared later through ordinary classical communication.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <ExpandableAside title="Optional: Density-matrix shorthand" label="Technical Aside">
            <MathDisplay>{'\\rho_A = \\rho_B = I/2'}</MathDisplay>
            <p>
              This compact statement says each subsystem of the Bell pair is locally maximally mixed. It is a precise
              way to express why one qubit on its own does not carry a readable signal about the distant measurement choice.
            </p>
          </ExpandableAside>
        </div>

        <div className="mt-6">
          <RemarkBox>
            "Instantaneous collapse" is language about the updated joint description. It should not be mistaken for a usable
            physical signal transmitted between the two labs.
          </RemarkBox>
        </div>
      </section>

      <section id="entanglement-limits" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 5</p>
        <h2 className="section-heading">Misconceptions and practical limits</h2>
        <p className="section-sub">
          Entanglement is a real physical resource, but it is not a license for signalling, cloning, or ignoring noise.
        </p>

        <MistakesBox
          items={[
            {
              mistake: 'Assuming entanglement allows faster-than-light communication.',
              clarification:
                'The no-communication constraint comes from the fact that each local outcome distribution stays random until records are compared classically.',
            },
            {
              mistake: 'Thinking perfect matching means the values were simply hidden in advance.',
              clarification:
                'Classical hidden-data models can mimic one basis, but Bell-type tests and nonfactorizability show the Bell pair is not just a predetermined lookup table.',
            },
            {
              mistake: 'Treating entanglement as permanent once created.',
              clarification:
                'Real devices lose entanglement through noise and interaction with the environment, which is why decoherence control is central to hardware work.',
            },
            {
              mistake: 'Believing entanglement lets you clone or copy unknown states freely.',
              clarification:
                'Teleportation uses entanglement plus classical communication, and the original quantum state is not duplicated in the process.',
            },
          ]}
        />

        <div className="mt-6">
          <ExampleBox title="Where Entanglement Actually Matters">
            <p>
              Entanglement is useful because it enables tasks that product states do not: Bell-basis reasoning, teleportation,
              superdense coding, many-body state preparation, and parts of quantum error correction.
            </p>
            <p className="mt-3">
              In every case, the resource still has to be protected and manipulated by carefully designed circuits. Entanglement is
              powerful, but it is not self-executing.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            On hardware, <Keyword tone="decoherence">decoherence</Keyword> and gate noise are the practical enemies of entanglement.
            The ideal Bell pair is the reference model; experimental reality is always less clean.
          </RemarkBox>
        </div>
      </section>

      <div className="mt-10">
        <SummaryBox
          points={[
            'Entanglement is a statement about joint state structure, not just about observing matching outcomes.',
            'The standard Bell pair |Phi+> is created by combining single-qubit superposition with a controlled interaction.',
            'A Bell state cannot be written as a product of two one-qubit states, which is the algebraic signature of entanglement.',
            'Bell-pair measurements produce strong correlations, but each local observer still sees random outcomes until records are compared.',
          ]}
        />
      </div>

      <section id="entanglement-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Move from Bell pairs into full circuit structure</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The next module turns these state-level ideas into explicit circuit language. Keep the Bell-pair preparation
          pattern in mind: it is the cleanest bridge between state-vector reasoning and circuit design.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/circuits" className="btn-primary">
            Continue to Quantum Circuits
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
