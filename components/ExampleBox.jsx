export default function ExampleBox({ title = 'Worked Example', children }) {
  return (
    <div className="rounded-xl border-l-4 border-l-emerald-500 border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-widest text-emerald-400 mb-3">{title}</p>
      <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
