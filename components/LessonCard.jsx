import { CheckCircle, Lightbulb, FlaskConical } from 'lucide-react'
import Quiz from './Quiz'
import DeepDive from './DeepDive'

const defaultBullet = 'bg-indigo-900/60 border-indigo-700/50 text-indigo-400'

/**
 * Renders one complete lesson unit in the standardised sequence:
 *   lesson label → hook headline → visual → key ideas → example → deep dive → checkpoint
 *
 * Props:
 *   lesson       – { hook, hookSub?, visual?, bullets?, example?, deepDive?, quiz }
 *   lessonIndex  – 0-based index
 *   totalLessons – total count for the module
 *   isPassed     – true if this lesson's checkpoint was passed in a prior session
 *   onPass       – called when the checkpoint is answered correctly
 *   bulletStyle  – optional module accent classes for numbered bullets
 */
export default function LessonCard({ lesson, lessonIndex, totalLessons, isPassed, onPass, bulletStyle }) {
  const { hook, hookSub, visual, bullets, example, deepDive, quiz } = lesson

  return (
    <div className="flex flex-col gap-8">

      {/* ── Lesson label ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                         bg-slate-800/80 border border-slate-700/50
                         text-xs font-medium text-slate-400">
          Lesson {lessonIndex + 1} of {totalLessons}
        </span>
        {isPassed && (
          <span className="inline-flex items-center gap-1 text-xs text-green-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            Complete
          </span>
        )}
      </div>

      {/* ── Hook headline ──────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
          {hook}
        </h2>
        {hookSub && (
          <p className="mt-2.5 text-slate-400 text-base leading-relaxed max-w-2xl">
            {hookSub}
          </p>
        )}
      </div>

      {/* ── Visual — always before explanation ─────────────────────── */}
      {visual && (
        <div className="w-full">
          {visual}
        </div>
      )}

      {/* ── Key ideas ──────────────────────────────────────────────── */}
      {bullets?.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center gap-2 mb-3.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <p className="section-label">Key ideas</p>
          </div>
          <ul className="flex flex-col gap-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-slate-300 leading-relaxed">
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center
                             text-xs font-bold flex-shrink-0 ${bulletStyle || defaultBullet}`}
                >
                  {i + 1}
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Example ────────────────────────────────────────────────── */}
      {example && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <p className="section-label">Worked example</p>
          </div>
          {example}
        </div>
      )}

      {/* ── Deep dive (collapsible) ─────────────────────────────────── */}
      {deepDive && (
        <DeepDive title="See the math">{deepDive}</DeepDive>
      )}

      {/* ── Checkpoint ─────────────────────────────────────────────── */}
      <Quiz
        question={quiz.question}
        choices={quiz.choices}
        correct={quiz.correct}
        onPass={onPass}
        isPassed={isPassed}
      />
    </div>
  )
}
