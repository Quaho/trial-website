import { AlertTriangle } from 'lucide-react'

export default function MistakesBox({ items }) {
  return (
    <div className="bg-amber-950/30 border border-amber-800/40 rounded-2xl p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold text-amber-300">Common Mistakes & Confusions</h3>
      </div>
      <ul className="space-y-3">
        {items.map(({ mistake, clarification }, i) => (
          <li key={i} className="space-y-1">
            <p className="text-amber-200 text-sm font-medium">✗ {mistake}</p>
            <p className="text-slate-400 text-sm pl-4">{clarification}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
