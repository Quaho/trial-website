import { ChevronDown } from 'lucide-react'

/**
 * Wraps a coherent content cluster — a definition plus its notation,
 * example, and remark, not an individual box in isolation — with
 * diagnostic-evidence-aware collapsing. See CLAUDE.md's "Diagnostic
 * Placement & Concept Evidence" section for the governing rules.
 *
 * Props:
 *   conceptIds   – array of concept ids (lib/data/concepts.js) this
 *                  cluster teaches
 *   demonstrated – the `demonstrated` Set from a single page-level
 *                  `useDiagnostic()` call — this component does not call
 *                  the hook itself
 *   children     – the content cluster to wrap
 *
 * Default behavior (diagnostic never taken, or not every concept in
 * `conceptIds` reached demonstrated status): renders `children` exactly
 * as-is, fully expanded — identical to a page that never had this wrapper.
 * Only when EVERY id in `conceptIds` is in `demonstrated` does this
 * collapse into a closed disclosure. Never wrap the section heading or
 * intro sentence in this — only the box cluster underneath it — so
 * outline-nav scroll anchors and chapter structure survive regardless of
 * diagnostic state.
 */
export default function ConceptSection({ conceptIds, demonstrated, children }) {
  const allDemonstrated =
    conceptIds.length > 0 && conceptIds.every((id) => demonstrated.has(id))

  if (!allDemonstrated) {
    return <>{children}</>
  }

  return (
    <details className="group rounded-2xl border border-emerald-800/40 bg-emerald-950/10">
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-indigo-400 rounded-2xl"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Diagnostic: Already Known
          </p>
          <h3 className="mt-2 text-base font-semibold text-white">
            Your diagnostic suggests you already know this — expand to review
          </h3>
        </div>
        <ChevronDown
          className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="chapter-text space-y-6 border-t border-emerald-800/30 px-5 pb-5 pt-4">
        {children}
      </div>
    </details>
  )
}
