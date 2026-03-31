import { AlertTriangle } from 'lucide-react'

export default function MistakesBox({ items }) {
  return (
    <div className="bg-amber-950/30 border border-amber-800/40 rounded-2xl p-6 my-8" role="region" aria-label="Common mistakes and confusions">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold text-amber-300">Common Mistakes & Confusions</h3>
      </div>
      <ul className="space-y-3">
        {items.map(({ mistake, clarification }, i) => (
          <li key={i} className="space-y-1">
            <p className="chapter-text font-medium text-amber-200"><span aria-hidden="true">✗ </span><span className="sr-only">Misconception: </span>{mistake}</p>
            <p className="chapter-muted pl-4">{clarification}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
