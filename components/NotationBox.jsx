export default function NotationBox({ symbol, children }) {
  return (
    <div className="rounded-xl border-l-4 border-l-violet-500 border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Notation</p>
      {symbol && <p className="font-mono text-white text-lg mb-2">{symbol}</p>}
      <div className="chapter-text">{children}</div>
    </div>
  )
}
