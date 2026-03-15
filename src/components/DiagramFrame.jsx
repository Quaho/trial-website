/**
 * Consistent wrapper for diagrams and interactive visuals.
 * Provides: accessible figure semantics, optional header label,
 * optional caption, constrained aspect ratio, and dark-theme styling.
 *
 * Props:
 *   label       – short label shown in the header bar (optional)
 *   description – accessible aria-label and visible caption text (optional)
 *   aspect      – CSS aspect-ratio string, e.g. "16/9" or "4/3" (default: "16/9")
 *   noPadding   – omit inner padding for full-bleed visuals (default: false)
 *   children    – diagram content
 */
export default function DiagramFrame({
  label,
  description,
  aspect = '16/9',
  noPadding = false,
  children,
}) {
  return (
    <figure
      className="w-full rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
      role="img"
      aria-label={description || label || 'Diagram'}
    >
      {label && (
        <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" aria-hidden="true" />
          <span className="text-xs text-slate-400 font-medium">{label}</span>
        </div>
      )}

      <div
        className={`flex items-center justify-center ${noPadding ? '' : 'p-4 sm:p-6'}`}
        style={{ aspectRatio: aspect }}
      >
        {children}
      </div>

      {description && (
        <figcaption className="px-4 py-2.5 text-xs text-slate-500 text-center
                               border-t border-slate-800 leading-relaxed bg-slate-900/30">
          {description}
        </figcaption>
      )}
    </figure>
  )
}
