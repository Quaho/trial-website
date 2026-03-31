export default function RailCard({ label = 'Chapter Guide', title, children }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      {title && <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>}
      <div className="chapter-text mt-3">
        {children}
      </div>
    </section>
  )
}
