import { Link } from 'react-router-dom'
import { ChevronLeft, ArrowRight } from 'lucide-react'

const GOAL_CHOOSER = [
  {
    goal: 'I want to build circuits in Python',
    advice: (
      <>
        Finish <Link to="/qiskit" className="text-indigo-400 hover:text-indigo-300 transition-colors">Qiskit</Link>{' '}
        and <Link to="/labs" className="text-indigo-400 hover:text-indigo-300 transition-colors">Labs</Link> here,
        then move to IBM Quantum Learning and IBM Quantum Documentation for the maintained workflow.
      </>
    ),
  },
  {
    goal: 'I want more coding drills',
    advice: (
      <>
        Microsoft Quantum Katas gives checked, self-paced exercises. It uses Q#, a different language from
        Qiskit — useful conceptually, but keep IBM Quantum Learning close if you are preparing for Qiskit projects specifically.
      </>
    ),
  },
  {
    goal: 'I want theory depth',
    advice: (
      <>
        MIT OpenCourseWare is the rigorous path. Wait until{' '}
        <Link to="/braket" className="text-indigo-400 hover:text-indigo-300 transition-colors">Bra-Ket Notation</Link> and{' '}
        <Link to="/gates" className="text-indigo-400 hover:text-indigo-300 transition-colors">Gates</Link>{' '}
        feel stable first — it is excellent but can feel abrupt otherwise.
      </>
    ),
  },
  {
    goal: 'I want to remember the concepts long-term',
    advice: (
      <>
        Quantum Country pairs spaced-repetition prompts with essay-style explanations — use it alongside this
        handbook if a topic makes sense while reading but fades a week later.
      </>
    ),
  },
  {
    goal: 'I am stuck on the math',
    advice: (
      <>
        Start with <Link to="/math-language" className="text-indigo-400 hover:text-indigo-300 transition-colors">Mathematical Language</Link>{' '}
        here, then Khan Academy Linear Algebra for slower, mastery-based practice before returning.
      </>
    ),
  },
  {
    goal: 'I found the old Qiskit Textbook',
    advice: (
      <>
        Treat it as historical and supplemental — the repository is archived, and{' '}
        <span className="font-mono text-xs text-slate-500">qiskit.org/textbook</span> now redirects into IBM
        Quantum Learning. Use IBM Quantum Learning for current, maintained Qiskit workflows.
      </>
    ),
  },
]

const sections = [
  {
    title: 'Textbooks and Course Notes',
    items: [
      { name: 'Nielsen & Chuang, Quantum Computation and Quantum Information', desc: 'The standard graduate reference for quantum computing and quantum information theory.' },
      { name: 'Yanofsky & Mannucci, Quantum Computing for Computer Scientists', desc: 'An accessible introduction designed for readers with a computer science background.' },
      { name: 'Mermin, Quantum Computer Science: An Introduction', desc: 'A concise and mathematically careful treatment of core quantum computing concepts.' },
      { name: 'Kaye, Laflamme & Mosca, An Introduction to Quantum Computing', desc: 'A balanced presentation covering both theory and applications.' },
    ],
  },
  {
    title: 'Continuation Resources',
    items: [
      {
        name: 'IBM Quantum Learning',
        desc: 'The primary, maintained continuation for Qiskit and IBM Quantum tools — courses from introductory material through algorithms, error correction, and utility-scale topics, plus the route from simulation to real hardware.',
        url: 'https://quantum.cloud.ibm.com/learning/en',
      },
      { name: 'Qiskit Documentation', desc: 'API reference, tutorials, and guides for the Qiskit SDK.', url: 'https://docs.quantum.ibm.com' },
      {
        name: 'Qiskit Textbook (archived)',
        desc: 'The old community-maintained textbook was influential but is no longer the maintained primary path — the repository is read-only and qiskit.org/textbook now redirects into IBM Quantum Learning. Useful for historical or supplemental explanations only; expect stale code and platform details.',
        url: 'https://github.com/qiskit-community/qiskit-textbook',
      },
      {
        name: 'Microsoft Quantum Katas',
        desc: 'The best continuation for hands-on coding drills with checked exercises and hints. A different ecosystem from Qiskit — exercises are written in Q#, not Python/Qiskit.',
        url: 'https://learn.microsoft.com/en-us/azure/quantum/katas-qdk-learning',
      },
      {
        name: 'MIT 18.435J, Quantum Computation',
        desc: 'A rigorous, university-level theory course. Choose this when you want depth — it may feel abrupt if bra-ket notation and linear algebra are not yet comfortable.',
        url: 'https://ocw.mit.edu/courses/18-435j-quantum-computation-fall-2003/',
      },
      {
        name: 'MIT 8.370x, Quantum Information Science I',
        desc: 'A second MIT OCW option covering quantum information formalism in more depth, with the same rigor warning as 18.435J.',
        url: 'https://ocw.mit.edu/courses/8-370x-quantum-information-science-i-spring-2018/',
      },
      {
        name: 'Quantum Country',
        desc: 'An essay-based introduction combined with spaced-repetition prompts, built specifically for long-term retention rather than first-pass reading.',
        url: 'https://quantum.country/qcvc',
      },
      { name: 'Brilliant.org Quantum Computing Course', desc: 'Visual, interactive fundamentals for building intuition.' },
    ],
  },
  {
    title: 'Mathematical Background',
    items: [
      { name: '3Blue1Brown, Essence of Linear Algebra', desc: 'A visual linear algebra refresher on YouTube — highly recommended before diving into state vectors.', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
      { name: 'Axler, Linear Algebra Done Right', desc: 'A clean theoretical treatment of linear algebra without determinants as a starting point.' },
      {
        name: 'Khan Academy Linear Algebra',
        desc: 'Prerequisite repair, not a quantum computing continuation — free, structured, mastery-based practice with vectors, matrices, and transformations. Use it before or alongside Mathematical Language if the math itself, not the quantum notation, is the blocker.',
        url: 'https://www.khanacademy.org/math/linear-algebra',
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Qiskit', desc: 'Open-source quantum SDK for building and running quantum circuits.', url: 'https://qiskit.org' },
      { name: 'Quirk', desc: 'Drag-and-drop quantum circuit simulator in the browser.', url: 'https://algassert.com/quirk' },
      { name: 'IBM Quantum Composer', desc: 'Visual circuit builder with access to real quantum hardware.', url: 'https://quantum.ibm.com/composer' },
    ],
  },
]

export default function References() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        References &amp; Further Reading
      </h1>
      <p className="text-slate-400 text-base leading-relaxed mb-10">
        A curated collection of textbooks, online resources, mathematical background material, and
        tools to support your preparation. These references complement the handbook and provide
        paths for deeper study once you are ready to go beyond it.
      </p>

      <section className="mb-12 rounded-2xl border border-indigo-800/40 bg-indigo-950/20 p-6">
        <p className="text-xs uppercase tracking-widest text-indigo-400 mb-1">Choose By Goal</p>
        <h2 className="text-xl font-semibold text-white mb-5">Where should I go next?</h2>
        <div className="space-y-4">
          {GOAL_CHOOSER.map(({ goal, advice }) => (
            <div key={goal} className="flex gap-3">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-indigo-400" aria-hidden="true" />
              <div>
                <p className="font-medium text-white">{goal}</p>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">{advice}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5"
              >
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="font-semibold text-white">{item.name}</span>
                )}
                <span className="text-slate-400"> — {item.desc}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mt-4
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  )
}
