import { ChevronDown } from 'lucide-react'

export default function ExpandableAside({ title, label = 'Optional Detail', children, defaultOpen = false }) {
  return (
    <details
      className="group rounded-2xl border border-slate-800 bg-slate-900/60"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
          <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>
        </div>
        <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="chapter-text border-t border-slate-800 px-5 pb-5 pt-4">
        {children}
      </div>
    </details>
  )
}
