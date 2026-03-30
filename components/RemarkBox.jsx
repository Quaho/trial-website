export default function RemarkBox({ children }) {
  return (
    <div className="rounded-xl border-l-4 border-l-amber-500 border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">Remark</p>
      <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
