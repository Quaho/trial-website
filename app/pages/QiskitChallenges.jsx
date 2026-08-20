import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import LeetCodeProblem from '../../components/LeetCodeProblem'
import { QISKIT_CHALLENGES } from '../../lib/data/qiskitChallenges'
import { MODULES } from '../../lib/data/modules'

function findModule(moduleId) {
  return MODULES.find((m) => m.id === moduleId) || null
}

export default function QiskitChallenges() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-slate-800/70 via-slate-900/40 to-slate-950 border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white mb-6 transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Study Paths
          </Link>

          <p className="section-label">Optional</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Qiskit Challenges
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            {QISKIT_CHALLENGES.length} short, self-contained problems in a LeetCode-style format —
            a statement, an example, and one line of Qiskit to fill in. Grading is real and
            immediate, with a retry, the same as the practice exercises embedded in each module.
            There is no score, streak, or leaderboard: each problem is independent, and nothing
            here is saved between visits.
          </p>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl">
            This is separate from the{' '}
            <Link to="/diagnostic" className="text-slate-300 hover:text-white underline underline-offset-2">
              placement diagnostic
            </Link>
            , which never reveals correctness. Every problem below reuses a fact already covered
            on its linked module page — nothing here introduces new Qiskit syntax.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {QISKIT_CHALLENGES.map((problem) => {
          const module = findModule(problem.moduleId)
          return (
            <LeetCodeProblem
              key={problem.id}
              problem={problem}
              moduleLink={module ? { to: module.to, title: module.title } : null}
            />
          )
        })}
      </div>
    </div>
  )
}
