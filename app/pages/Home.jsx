import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* ── Data ──────────────────────────────────────────────────────────── */

const AUDIENCE = [
  {
    title: 'CS students',
    desc: 'You have Python experience and want to understand quantum computing concepts and notation before joining SIGQuantum projects.',
  },
  {
    title: 'Physics students',
    desc: 'You have conceptual comfort with quantum ideas but want structured preparation in circuit notation and Qiskit workflows.',
  },
  {
    title: 'Complete beginners',
    desc: 'You are motivated and capable but new to quantum computing language. This handbook starts from the ground up.',
  },
]

const TOPICS = [
  {
    name: 'Foundations',
    desc: 'Classical vs quantum information, the qubit, superposition, measurement',
  },
  {
    name: 'Mathematical Language',
    desc: 'Bra-ket notation, complex numbers, inner products',
  },
  {
    name: 'States and Operators',
    desc: 'Basis states, state vectors, single-qubit gates',
  },
  {
    name: 'Circuits and Measurement',
    desc: 'Circuit notation, multi-step evolution, measurement probabilities',
  },
  {
    name: 'Qiskit Preparation',
    desc: 'Creating circuits, applying gates, simulating and reading results',
  },
  {
    name: 'Paths Forward',
    desc: 'Study paths by background, next steps in SIGQuantum',
  },
]

const USAGE = [
  {
    title: 'Read sequentially',
    desc: 'If you are new to quantum computing, start with Foundations and work through each section in order.',
  },
  {
    title: 'Jump by topic',
    desc: 'If you have some background, navigate directly to the section you need to review.',
  },
  {
    title: 'Use the glossary',
    desc: 'Terms and notation are cross-referenced throughout. The glossary provides concise definitions and links to relevant sections.',
  },
]

/* ── Component ─────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div>
      {/* ── Section 1 — Title and Purpose ─────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
            Technical Onboarding for SIGQuantum
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            A structured introduction to the concepts, notation, and tools used in
            introductory quantum computing. This handbook prepares you for participation
            in SIGQuantum projects, workshops, and Fall Fest technical activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/intuition" className="btn-primary text-base px-7 py-3 group">
              Begin with Foundations
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <Link to="/roadmap" className="btn-secondary text-base px-7 py-3">
              Choose a Study Path
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Who This Is For ───────────────────────────── */}
      <section className="border-t border-slate-800 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">
            Who this is for
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {AUDIENCE.map(({ title, desc }) => (
              <div key={title} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — What You Will Learn ───────────────────────── */}
      <section className="border-t border-slate-800 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">
            What you will learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TOPICS.map(({ name, desc }) => (
              <div key={name} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-white text-sm mb-1.5">{name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 — How to Use This Handbook ──────────────────── */}
      <section className="border-t border-slate-800 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">
            How to use this handbook
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {USAGE.map(({ title, desc }) => (
              <div key={title} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 — Footer ────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-600">
        SIGQuantum · UIUC
      </footer>
    </div>
  )
}
