import { Link } from 'react-router-dom'
import ProjectLayout from '../../../components/ProjectLayout'
import CodeBlock from '../../../components/CodeBlock'
import GlossaryTooltip from '../../../components/GlossaryTooltip'
import { PROJECTS } from '../../../lib/data/projects'

const CLASSICAL_CODE = `def classical_search(items, target):
    for i, value in enumerate(items):
        if value == target:
            return i
    return -1

# Average case: N / 2 checks. Worst case: N checks.`

const ORACLE_CODE = `from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h([0, 1])   # equal superposition over 00, 01, 10, 11

# Oracle: flip the phase of the marked state |11>
qc.cz(0, 1)`

const DIFFUSER_CODE = `# Diffuser: reflect amplitudes about their average
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])

qc.measure([0, 1], [0, 1])`

export default function AlgorithmShowdown() {
  const project = PROJECTS.find((item) => item.id === 'algorithm-showdown')
  const prevProject = PROJECTS.find((item) => item.id === 'bell-explorer')

  const steps = [
    {
      title: 'Understand the Goal',
      content: (
        <div className="space-y-4">
          <p>
            You are comparing two approaches to the same problem: given an unsorted list of N items and
            no structure to exploit, find the one marked item. A classical computer has no shortcut — it
            has to check entries. A quantum computer using Grover&apos;s algorithm can route{' '}
            <GlossaryTooltip term="Amplitude">amplitude</GlossaryTooltip> toward the marked item and do
            meaningfully better, though not unboundedly better.
          </p>
          <p>
            This project builds a small version of both, then asks the more important question: where
            does that quantum advantage actually survive contact with real, noisy hardware?
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/algorithms" className="btn-ghost border border-slate-700/60 rounded-full">
              Review Core Algorithms
            </Link>
            <Link to="/noise" className="btn-ghost border border-slate-700/60 rounded-full">
              Review Noise &amp; Hardware
            </Link>
          </div>
          <div className="rounded-xl border border-orange-800/40 bg-orange-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-orange-400 mb-2">Predict</p>
            <p className="text-slate-300">
              For a list of 1,000,000 items, roughly how many checks does classical search need on
              average? Roughly how many do you expect Grover&apos;s algorithm to need?
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'The Classical Baseline',
      content: (
        <div className="space-y-4">
          <p>
            With no structure to exploit — the list isn&apos;t sorted, there&apos;s no index to search
            — the only guaranteed strategy is to check entries one at a time.
          </p>
          <CodeBlock code={CLASSICAL_CODE} language="python" label="classical_search.py" />
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Worst case: the marked item is last, or missing — N checks.</li>
            <li>Average case, across all possible positions: N / 2 checks.</li>
            <li>This scaling is fundamental to unstructured search, not a limitation of this particular implementation.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Build Grover's Oracle",
      content: (
        <div className="space-y-4">
          <p>
            Grover&apos;s algorithm starts the same way many introductory circuits do — an equal
            superposition over every possible answer — then uses an{' '}
            <GlossaryTooltip term="Oracle">oracle</GlossaryTooltip> that marks the correct one by flipping
            its phase, invisibly to a direct measurement.
          </p>
          <CodeBlock code={ORACLE_CODE} language="python" label="oracle.py" />
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><code className="text-orange-300 font-mono">qc.h([0, 1])</code> spreads the state equally over all 4 two-qubit outcomes — the &quot;unsorted list&quot; of this toy example.</li>
            <li><code className="text-orange-300 font-mono">qc.cz(0, 1)</code> marks <InlineCode>|11⟩</InlineCode> by flipping its phase. Measuring right now would still show all 4 outcomes equally — a marked phase isn&apos;t a marked probability yet.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Add the Diffuser',
      content: (
        <div className="space-y-4">
          <p>
            The oracle alone changes nothing measurable. The <strong className="text-white">diffuser</strong>{' '}
            is the step that turns the marked phase into a measurable boost in probability — the same
            amplitude-manipulation idea from{' '}
            <Link to="/algorithms" className="text-orange-400 hover:text-orange-300 transition-colors">Core Algorithms</Link>.
          </p>
          <CodeBlock code={DIFFUSER_CODE} language="python" label="diffuser.py" />
          <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">Predict</p>
            <p className="text-slate-300">
              After one oracle-plus-diffuser round on this 2-qubit example, do you expect <InlineCode>|11⟩</InlineCode>{' '}
              to be more likely, less likely, or unchanged compared to the other three outcomes?
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Compare Query Counts',
      content: (
        <div className="space-y-4">
          <p>
            Classical search needs roughly N/2 checks on average. Grover&apos;s algorithm needs roughly{' '}
            <InlineCode>√N</InlineCode> oracle calls — a quadratic, not exponential, speedup.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
            <table className="w-full border-collapse text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/70">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">List size (N)</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Classical (~N/2)</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Grover (~√N)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="px-4 py-3 text-slate-200">100</td>
                  <td className="px-4 py-3 font-mono text-slate-300">50</td>
                  <td className="px-4 py-3 font-mono text-orange-300">~10</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-200">10,000</td>
                  <td className="px-4 py-3 font-mono text-slate-300">5,000</td>
                  <td className="px-4 py-3 font-mono text-orange-300">~100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-200">1,000,000</td>
                  <td className="px-4 py-3 font-mono text-slate-300">500,000</td>
                  <td className="px-4 py-3 font-mono text-orange-300">~1,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-400">
            Quadratic speedups grow more valuable as N grows, but every oracle call is a real circuit —
            and every real circuit accumulates hardware noise.
          </p>
        </div>
      ),
    },
    {
      title: 'Analyze Results: Where the Advantage Survives',
      content: (
        <div className="space-y-4">
          <p>
            A quadratic speedup is a genuine result, not a rounding error — but it is also the kind of
            advantage that is most fragile in practice, per{' '}
            <Link to="/noise" className="text-orange-400 hover:text-orange-300 transition-colors">Noise &amp; Hardware</Link>{' '}
            and <Link to="/usecases" className="text-orange-400 hover:text-orange-300 transition-colors">Use Cases</Link>.
          </p>
          <p>
            Each Grover iteration is its own circuit, and each gate on real hardware has a small error
            rate. Enough iterations, and accumulated noise can erase the very amplitude boost the
            algorithm is trying to build — the theoretical ~√N count assumes a noiseless computation.
          </p>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Reflect</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-300">
              <li>Why is a quadratic speedup considered &quot;helpful but not transformative&quot; compared to Shor&apos;s exponential speedup?</li>
              <li>At what point might added noise from more iterations start to outweigh the amplitude gain from those same iterations?</li>
              <li>What kind of problem would need to look like, for an unstructured-search speedup to matter for a real application?</li>
            </ol>
          </div>
        </div>
      ),
    },
  ]

  return (
    <ProjectLayout
      projectId="algorithm-showdown"
      title={project?.title || 'Algorithm Showdown'}
      tagline={project?.tagline || 'Compare classical vs quantum approaches to a search problem'}
      steps={steps}
      prevProject={prevProject ? { to: prevProject.to, label: 'Back: Bell State Explorer' } : null}
      nextProject={null}
    />
  )
}

function InlineCode({ children }) {
  return <code className="font-mono text-slate-200 bg-slate-800/60 rounded px-1 py-0.5">{children}</code>
}
