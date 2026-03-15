import { BookOpen } from 'lucide-react'

export default function SummaryBox({ points }) {
  return (
    <div className="bg-indigo-950/50 border border-indigo-800/50 rounded-2xl p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-indigo-400" />
        <h3 className="font-semibold text-indigo-300">Module Summary</h3>
      </div>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
            <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-indigo-600/30 text-indigo-400
                             flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
