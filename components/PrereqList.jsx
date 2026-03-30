export default function PrereqList({ items = [], children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Prerequisites</p>
      {items.length > 0 && (
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
              <span className="text-slate-600 mt-1.5 shrink-0">&#8211;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {children && <div className="text-slate-300 text-sm leading-relaxed mt-3">{children}</div>}
    </div>
  )
}
