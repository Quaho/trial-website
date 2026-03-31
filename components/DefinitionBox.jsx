export default function DefinitionBox({ term, children }) {
  return (
    <div className="rounded-xl border-l-4 border-l-indigo-500 border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-widest text-indigo-400 mb-2">Definition</p>
      {term && <h4 className="font-semibold text-white mb-2">{term}</h4>}
      <div className="chapter-text">{children}</div>
    </div>
  )
}
