import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Optional video embed. See CLAUDE.md's "Video Sourcing": prefer IBM/
 * Qiskit, other verified-reputable sources acceptable (checked via
 * YouTube's oEmbed endpoint before use, never assumed from a title),
 * foldable-aside only, permanently visible text summary, never autoplay,
 * embed deferred until first interaction.
 *
 * Two things this deliberately does NOT do, both corrections from review:
 *  1. The title/description are NOT inside <summary> — a click on the
 *     description shouldn't itself toggle playback. Only "Watch on
 *     YouTube" is the disclosure trigger.
 *  2. The iframe is gated on "has this ever been opened", not "is this
 *     currently open" — closing the disclosure does not unmount the
 *     iframe, so reopening it doesn't reload the video or reset playback.
 *
 * Props:
 *   title       – video title
 *   description – 1-2 sentence summary, shown whether or not the
 *                 disclosure has been opened
 *   source      – channel/publisher name, e.g. "Qiskit", "MIT OpenCourseWare"
 *                 — verify via oEmbed before use, never assume from a title
 *   videoId     – YouTube video id
 */
export default function VideoAside({ title, description, source, videoId }) {
  const [hasLoaded, setHasLoaded] = useState(false)

  function handleToggle(event) {
    if (event.currentTarget.open) setHasLoaded(true)
  }

  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        Optional Video{source ? ` — ${source}` : ''}
      </p>
      <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>

      <details className="group mt-4" onToggle={handleToggle}>
        <summary
          className="inline-flex cursor-pointer list-none items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium
                     text-indigo-400 marker:content-none hover:text-indigo-300
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-indigo-400"
        >
          Watch on YouTube
          <ChevronDown
            className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-black" style={{ aspectRatio: '16/9' }}>
          {hasLoaded && (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </details>
    </aside>
  )
}
