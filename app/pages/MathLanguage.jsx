import { Link } from 'react-router-dom'
import ModuleLayout from '../../components/ModuleLayout'
import DefinitionBox from '../../components/DefinitionBox'
import NotationBox from '../../components/NotationBox'
import ExampleBox from '../../components/ExampleBox'
import RemarkBox from '../../components/RemarkBox'
import PrereqList from '../../components/PrereqList'
import DiagramFrame from '../../components/DiagramFrame'
import Keyword from '../../components/Keyword'
import RailCard from '../../components/RailCard'
import SummaryBox from '../../components/SummaryBox'
import MistakesBox from '../../components/MistakesBox'
import { MathDisplay, MathInline as InlineMath } from '../../components/MathBlock'

const MATH_LANGUAGE_OUTLINE = [
  { id: 'math-complex', label: 'Why complex numbers' },
  { id: 'math-vectors', label: 'Vectors as columns' },
  { id: 'math-operations', label: 'Vector addition and scaling' },
  { id: 'math-normalization', label: 'Normalization' },
  { id: 'math-next', label: 'Next steps' },
]

function MathLanguageSupport() {
  return (
    <>
      <RailCard label="Core Symbols" title="Read The Notation">
        <ul className="space-y-2">
          <li><span className="font-mono text-blue-300">a + bi</span>: a complex number, real part <InlineMath>{'a'}</InlineMath>, imaginary part <InlineMath>{'b'}</InlineMath>.</li>
          <li><span className="font-mono text-blue-300">|z|</span>: the modulus of <InlineMath>{'z'}</InlineMath>, its distance from the origin.</li>
          <li><span className="font-mono text-cyan-300">(a; b)</span>: a vector written as a column of entries.</li>
        </ul>
      </RailCard>

      <RailCard label="Checkpoint" title="What This Chapter Should Clarify">
        <ul className="space-y-2">
          <li>A complex number is not mysterious — it is a precisely defined pair of real numbers.</li>
          <li>A vector's entries are not probabilities by themselves.</li>
          <li>Normalization is a checkable condition, not something every vector automatically satisfies.</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/braket" className="btn-secondary justify-center">Go To Bra-Ket Notation</Link>
          <Link to="/glossary" className="btn-ghost justify-center">Open Glossary</Link>
        </div>
      </RailCard>
    </>
  )
}

function ComplexNumberFigure() {
  return (
    <DiagramFrame
      label="A Complex Number and Its Modulus"
      description="A complex number a + bi has a real part and an imaginary part. Its modulus is the square root of the sum of their squares."
      aspect="auto"
    >
      <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-blue-400">Complex Number</p>
          <p className="mt-2 font-mono text-lg text-blue-300">z = a + bi</p>
          <p className="mt-2 text-xs text-slate-400">real part a, imaginary part b</p>
        </div>

        <div className="hidden items-center justify-center text-slate-600 sm:flex">→</div>

        <div className="rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Modulus</p>
          <p className="mt-2 text-slate-200">
            <MathDisplay>{'|z| = \\sqrt{a^2 + b^2}'}</MathDisplay>
          </p>
          <p className="mt-2 text-xs text-slate-400">distance from the origin</p>
        </div>
      </div>
    </DiagramFrame>
  )
}

function VectorColumnFigure() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-5 text-center">
        <p className="font-mono text-lg text-cyan-300">v = (a, b)</p>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4">
          <MathDisplay>{'\\begin{pmatrix} a \\\\ b \\end{pmatrix}'}</MathDisplay>
        </div>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          A vector with two entries, written as a column.
        </p>
      </div>

      <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-5 text-center">
        <p className="font-mono text-lg text-blue-300">v = (2, -1)</p>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4">
          <MathDisplay>{'\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}'}</MathDisplay>
        </div>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          A concrete example — entries can be positive, negative, or complex.
        </p>
      </div>
    </div>
  )
}

function VectorOpsFigure() {
  return (
    <DiagramFrame
      label="Addition and Scalar Multiplication"
      description="Addition combines entries position by position. Scalar multiplication scales every entry by the same number."
      aspect="auto"
    >
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Addition</p>
          <div className="mt-2 text-slate-200">
            <MathDisplay>{'\\begin{pmatrix} a \\\\ b \\end{pmatrix} + \\begin{pmatrix} c \\\\ d \\end{pmatrix} = \\begin{pmatrix} a+c \\\\ b+d \\end{pmatrix}'}</MathDisplay>
          </div>
        </div>
        <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-blue-400">Scalar Multiplication</p>
          <div className="mt-2 text-slate-200">
            <MathDisplay>{'c \\begin{pmatrix} a \\\\ b \\end{pmatrix} = \\begin{pmatrix} ca \\\\ cb \\end{pmatrix}'}</MathDisplay>
          </div>
        </div>
      </div>
    </DiagramFrame>
  )
}

export default function MathLanguage() {
  return (
    <ModuleLayout
      moduleId="math-language"
      title="Mathematical Language"
      subtitle="The complex-number and vector toolkit that bra-ket notation is built on top of."
      outline={MATH_LANGUAGE_OUTLINE}
      aside={<MathLanguageSupport />}
      prev={{ to: '/intuition', label: 'Module 1: Big-Picture Intuition' }}
      next={{ to: '/braket', label: 'Module 3: Bra-Ket Notation' }}
    >
      <div className="prose-quantum max-w-none">
        <p>
          Quantum states are described using <Keyword tone="vector">vectors</Keyword> whose entries can
          be <Keyword tone="complex">complex numbers</Keyword>. Before bra-ket notation can make sense,
          it helps to be comfortable with that underlying toolkit on its own terms — not yet attached to
          qubits, just as ordinary mathematics.
        </p>
        <p>
          This page does not require prior linear algebra. It introduces exactly what the next few
          modules use: what a complex number is, how a vector is written as a column, how vectors combine,
          and what it means for a vector to be <Keyword tone="normalization">normalized</Keyword>.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <PrereqList
          items={[
            'Comfortable with basic algebra — solving simple equations, working with square roots.',
            'No prior exposure to complex numbers or linear algebra is assumed.',
            'Comfort with qubits and measurement from the foundations module is helpful context, not required.',
          ]}
        >
          If you are unsure why any of this matters for qubits, review{' '}
          <Link to="/intuition" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Big-Picture Intuition
          </Link>{' '}
          first.
        </PrereqList>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="section-label">Learning Objectives</p>
          <ul className="chapter-list mt-3 space-y-2">
            <li>Read a <Keyword tone="complex">complex number</Keyword> a + bi and compute its modulus.</li>
            <li>Read a <Keyword tone="vector">vector</Keyword> written as a column and identify its entries.</li>
            <li>Add vectors and scale them by a constant, including a complex constant.</li>
            <li>Check whether a vector is <Keyword tone="normalization">normalized</Keyword>.</li>
          </ul>
        </div>
      </div>

      <section id="math-complex" className="mt-10 scroll-mt-28">
        <p className="section-label">Section 1</p>
        <h2 className="section-heading">Why complex numbers</h2>
        <p className="section-sub">
          Quantum amplitudes are generally <Keyword tone="complex">complex</Keyword>, not just positive
          or negative real numbers. Complex numbers are a standard, precisely defined number system —
          nothing about them is vague or optional.
        </p>

        <DefinitionBox term="Complex Number">
          A complex number has the form <InlineMath>{'z = a + bi'}</InlineMath>, where{' '}
          <InlineMath>{'a'}</InlineMath> and <InlineMath>{'b'}</InlineMath> are real numbers and{' '}
          <InlineMath>{'i'}</InlineMath> is defined by <InlineMath>{'i^2 = -1'}</InlineMath>.{' '}
          <InlineMath>{'a'}</InlineMath> is called the real part and <InlineMath>{'b'}</InlineMath> the
          imaginary part.
        </DefinitionBox>

        <div className="mt-6">
          <ComplexNumberFigure />
        </div>

        <div className="mt-6">
          <NotationBox symbol="|z| = √(a² + b²)">
            The <Keyword tone="complex">modulus</Keyword> of a complex number measures its size,
            regardless of the sign of its parts. Later, squaring a modulus is exactly the step that turns
            an amplitude into a probability.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Computing a Modulus">
            <MathDisplay>{'z = 3 + 4i \\quad\\Rightarrow\\quad |z| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5'}</MathDisplay>
            <p>
              The real part is 3, the imaginary part is 4, and the modulus is 5 — the same Pythagorean
              computation used for the length of a 2D vector.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            Do not read <Keyword tone="complex">complex</Keyword> as "not real" in the everyday sense.
            The real numbers are a subset of the complex numbers (the case <InlineMath>{'b = 0'}</InlineMath>).
            Complex numbers extend that system; they do not replace it with something undefined.
          </RemarkBox>
        </div>
      </section>

      <section id="math-vectors" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 2</p>
        <h2 className="section-heading">Vectors as columns</h2>
        <p className="section-sub">
          A <Keyword tone="vector">vector</Keyword> here is simply an ordered list of numbers, written
          vertically. The entries can be real or complex.
        </p>

        <DefinitionBox term="Vector">
          A vector is an ordered list of numbers, written as a column. A two-entry vector has the form{' '}
          <InlineMath>{'(a, b)'}</InlineMath>, written vertically as shown below. The number of entries is
          the vector's dimension.
        </DefinitionBox>

        <div className="mt-6">
          <VectorColumnFigure />
        </div>

        <div className="mt-6">
          <RemarkBox>
            The next module attaches special notation — <InlineMath>{'|\\psi\\rangle'}</InlineMath> — to
            vectors exactly like these, once their entries are interpreted as quantum amplitudes. Nothing
            about the underlying vector changes; only the notation and interpretation do.
          </RemarkBox>
        </div>
      </section>

      <section id="math-operations" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 3</p>
        <h2 className="section-heading">Vector addition and scalar multiplication</h2>
        <p className="section-sub">
          Two operations are used constantly throughout the rest of the handbook: adding two vectors, and
          scaling a vector by a number.
        </p>

        <DefinitionBox term="Vector Addition and Scalar Multiplication">
          Vectors add component by component. Multiplying a vector by a scalar{' '}
          <InlineMath>{'c'}</InlineMath> (which may itself be complex) multiplies every entry by{' '}
          <InlineMath>{'c'}</InlineMath>.
        </DefinitionBox>

        <div className="mt-6">
          <VectorOpsFigure />
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Combining Two Scaled Vectors">
            <MathDisplay>{'\\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\0\\end{pmatrix} + \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}0\\\\1\\end{pmatrix} = \\begin{pmatrix}1/\\sqrt{2}\\\\1/\\sqrt{2}\\end{pmatrix}'}</MathDisplay>
            <p>
              Each basis vector is scaled by <InlineMath>{'1/\\sqrt{2}'}</InlineMath>, then the two scaled
              vectors are added. This exact combination reappears once basis vectors are relabeled{' '}
              <InlineMath>{'|0\\rangle'}</InlineMath> and <InlineMath>{'|1\\rangle'}</InlineMath> in the
              next module.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is ordinary vector algebra with no quantum content yet. What makes it relevant later is
            only that the entries will be interpreted as amplitudes, not that the operations themselves
            are special.
          </RemarkBox>
        </div>
      </section>

      <section id="math-normalization" className="mt-12 scroll-mt-28">
        <p className="section-label">Section 4</p>
        <h2 className="section-heading">Normalization</h2>
        <p className="section-sub">
          A <Keyword tone="normalization">normalized</Keyword> vector satisfies a specific, checkable
          condition on its entries — it is not something every vector automatically has.
        </p>

        <DefinitionBox term="Normalized Vector">
          A vector <InlineMath>{'v = (a, b)'}</InlineMath> is normalized when the sum of the squared
          moduli of its entries equals 1: <InlineMath>{'|a|^2 + |b|^2 = 1'}</InlineMath>. This uses the
          same modulus defined in Section 1, so it applies whether the entries are real or complex.
        </DefinitionBox>

        <div className="mt-6">
          <NotationBox symbol="‖v‖² = |a|² + |b|² = 1">
            The condition is stated in terms of squared moduli, never the raw entries directly — an entry
            can be negative or complex and the vector can still be normalized.
          </NotationBox>
        </div>

        <div className="mt-6">
          <ExampleBox title="Worked Example: Checking Normalization">
            <MathDisplay>{'v = \\begin{pmatrix}1/\\sqrt{2}\\\\1/\\sqrt{2}\\end{pmatrix} \\quad\\Rightarrow\\quad \\left|\\tfrac{1}{\\sqrt{2}}\\right|^2 + \\left|\\tfrac{1}{\\sqrt{2}}\\right|^2 = \\tfrac{1}{2} + \\tfrac{1}{2} = 1'}</MathDisplay>
            <p>
              The squared moduli of the two entries sum to 1, so this vector is normalized.
            </p>
          </ExampleBox>
        </div>

        <div className="mt-6">
          <RemarkBox>
            This is exactly the condition a quantum state vector must satisfy so that measurement
            probabilities sum to 1. The full connection to probability is covered once{' '}
            <Link to="/braket" className="text-indigo-400 hover:text-indigo-300 transition-colors">Bra-Ket Notation</Link>{' '}
            and later{' '}
            <Link to="/measurement" className="text-indigo-400 hover:text-indigo-300 transition-colors">Measurement &amp; Basis</Link>{' '}
            attach that meaning to the entries — here, it is only a property of the vector.
          </RemarkBox>
        </div>
      </section>

      <div className="mt-12">
        <MistakesBox
          items={[
            {
              mistake: 'Treating i as some vague or undefined "imaginary" quantity.',
              clarification:
                'i is precisely defined by i² = -1. Complex numbers form a standard, well-behaved number system, not a fuzzy add-on to real numbers.',
            },
            {
              mistake: "Reading a vector's entries directly as probabilities.",
              clarification:
                'Entries can be negative or complex. Only their squared moduli — and only once the vector represents a quantum state — connect to probability.',
            },
            {
              mistake: 'Assuming any vector already satisfies the normalization condition.',
              clarification:
                'Normalization is a specific constraint, |a|² + |b|² = 1, that must be checked. Most vectors do not satisfy it as written.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <SummaryBox
          points={[
            'A complex number a + bi has a real part, an imaginary part, and a modulus |a + bi| = √(a² + b²).',
            'A vector is an ordered list of numbers written as a column; its entries can be real or complex.',
            'Vectors add component by component, and scalar multiplication scales every entry — the two operations used throughout the rest of the handbook.',
            'A normalized vector has squared-modulus entries that sum to 1 — the same condition quantum states must satisfy.',
          ]}
        />
      </div>

      <section id="math-next" className="mt-10 scroll-mt-28 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="section-label">Next Steps</p>
        <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">Continue into bra-ket notation</h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          The next module attaches quantum notation — kets, bras, and inner products — to exactly the
          vectors and operations introduced here.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/braket" className="btn-primary">
            Continue to Bra-Ket Notation
          </Link>
          <Link to="/glossary" className="btn-secondary">
            Review the Glossary
          </Link>
        </div>
      </section>
    </ModuleLayout>
  )
}
