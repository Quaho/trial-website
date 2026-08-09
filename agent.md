# agent.md — Current Codex Task

## TASK-019 — COMPLETE (reconciled 2026-08-09)
Phase 2 structure work. See `TASKS.md`.

## TASK-020 — COMPLETE (2026-08-09)
Diagnostic Placement Pilot — CLAUDE.md amendment (doc-only). See `TASKS.md`
and CLAUDE.md's "Diagnostic Placement & Concept Evidence" section, which
every later task in this pilot is bound by.

---

## TASK-021 — COMPLETE (2026-08-09)
Diagnostic Placement Pilot — concept graph + diagnostic question data model.

### What was built
- **`lib/data/concepts.js`** — `CONCEPTS` array, 14 entries across the 3
  pilot modules (5 intuition, 4 braket, 5 gates), each with `id`, `label`,
  `area`, `moduleId`, `sectionId` (the real `<section id="...">` in that
  page's outline — verified against `Intuition.jsx`/`BraKet.jsx`/
  `Gates.jsx` directly, not guessed), and concept-level `prereqs`. Plus
  `CONCEPTS_BY_ID` for O(1) lookup. Does not touch `MODULES[].prereqs` in
  `modules.js` — that keeps driving navigation/Roadmap unchanged.
- **`lib/data/diagnostic.js`** — `DIAGNOSTIC_VERSION = 1` with the
  bump-contract comment specified in CLAUDE.md, `DIAGNOSTIC_AREAS` (3:
  math-notation, states, gates), `DIAGNOSTIC_QUESTIONS` (22 questions: 7 +
  7 + 8), and `DIAGNOSTIC_QUESTIONS_BY_AREA` for the sectioned UI. Question
  content is grounded in what the pilot pages actually teach (e.g. the
  Z/H/S/T behavior, the `⟨0|0⟩=1`/`⟨0|1⟩=0` overlap examples already in
  `BraKet.jsx`, and several distractors lifted from `Gates.jsx`'s own
  `MistakesBox` misconceptions) — not generic textbook trivia.
- Per the authoring rule in CLAUDE.md, 9 of 14 concepts have ≥2 tagged
  questions and are collapsible-eligible once TASK-022's evidence
  derivation exists; 5 are deliberately left below threshold
  (`quantum-advantage-limits` has 0, `notation-reading`/`pauli-z`/
  `s-t-gates` have 1) — always insufficient-evidence, by design, not a gap.

### Verification performed
- Programmatic cross-check (ad hoc Node script, not persisted): every
  question's `concepts`/`area` ids resolve against `concepts.js`, every
  concept's `prereqs` resolve, all question ids unique, all concept ids
  unique, every `choices` array has exactly 4 entries with `correct` in
  range. All passed.
- `npm run build` — passes. Expected: neither file is imported anywhere
  yet, so this is a no-behavior-change addition.

### Non-goals honored
No hook, no UI, no wiring into any page — those are TASK-022 onward.

---

## TASK-022: `useDiagnostic` hook

### Why this task now
Third slice of the Diagnostic Placement pilot (Phase 3a). `concepts.js`
and `diagnostic.js` (TASK-021) exist but nothing reads them yet. This task
builds the one hook that turns raw stored answers into everything the UI
needs — area scores, per-concept evidence status, staleness detection —
per CLAUDE.md's "Diagnostic Placement & Concept Evidence" section and the
approved plan at `/Users/frank/.claude/plans/nifty-foraging-meteor.md`
(external to this repo — the rules that matter are already restated in
CLAUDE.md; treat CLAUDE.md as authoritative if the two ever disagree).

### File to create
`lib/hooks/useDiagnostic.js`, mirroring the load/save-to-localStorage
pattern already used by `lib/hooks/useProgress.js` (read that file first).

### Requirements

**Persistence — raw answers only, never precomputed scores:**
```js
const STORAGE_KEY = 'quantum_diagnostic_v1'
// shape: { version: number, answers: { [questionId]: choiceIndex }, completedAt: string | null }
```
`completedAt` is `null` while the student is mid-diagnostic (some areas
answered, not all), and set once every question across all 3
`DIAGNOSTIC_AREAS` has been answered.

**Staleness check:** on load, compare the stored `version` against
`DIAGNOSTIC_VERSION` from `diagnostic.js`. If they differ, treat the result
as stale: expose something like `isStale: true` and do not derive scores
from it. The hook should make it easy for the UI to say "your diagnostic
results are out of date, retake it" rather than silently grading old
answers against a changed question bank.

**Live-derived area scores:** for each `DIAGNOSTIC_AREAS[].id`, compute
`{ correct, attempted, total }` by joining the stored `answers` against
the *current* `DIAGNOSTIC_QUESTIONS` (not a cached/persisted number).

**Three-way concept status — implement exactly as specified in CLAUDE.md:**
For each concept id appearing in any question's `concepts` array, compute
`attempted` (count of tagging questions answered) and `correct` (of those,
answered right), then:
- `attempted < 2` → `'insufficient-evidence'`
- `attempted >= 2 && correct === attempted` → `'demonstrated'`
- `attempted >= 2 && correct < attempted` → `'needs-review'`

Expose a `conceptStatus(id)` function returning one of the three strings,
and a `demonstrated` `Set` containing exactly the concept ids currently at
`'demonstrated'` status (this is the Set that TASK-024's `ConceptSection`
will receive as a prop — do not have `ConceptSection` call this hook
itself, per CLAUDE.md; call `useDiagnostic()` once per page).

**Recommendation signals (not a Study Path selection):** derive
`recommendedStartModuleId` and `reviewModuleIds` from the 3 pilot modules'
area scores (e.g. lowest-scoring area's `moduleId` → recommended start;
areas scoring high → review/skim candidates). Do **not** read
`STUDY_PATHS` and do **not** attempt to pick a `Path A/B/C` — CLAUDE.md is
explicit that a 3-area content diagnostic cannot distinguish background
(a CS major who knows no quantum vs. a total beginner), so this hook must
not try. `Roadmap.jsx`'s existing path-matching logic is out of scope for
this task entirely — do not touch `Roadmap.jsx` in TASK-022.

**Answer-recording API:** something like `recordAnswer(questionId,
choiceIndex)` that updates `answers` and persists, plus `reset()` mirroring
`useProgress.js`'s `reset()`.

**Call-site discipline:** nothing about the hook's own implementation
enforces "called once per page" — that's a TASK-023/024 usage concern — but
keep the hook cheap to call and side-effect-free on read so that discipline
is easy to honor later.

### Non-goals for TASK-022
- No new page, no new route, no UI component. This is the hook only.
- No changes to `Roadmap.jsx`, `App.jsx`, or any pilot module page.
- No changes to `concepts.js` or `diagnostic.js` (TASK-021 is closed;
  if you find an inconsistency, flag it rather than editing those files
  silently, since TASK-021's cross-check already passed).

### Acceptance criteria
- [ ] `lib/hooks/useDiagnostic.js` exists, exports a hook usable as
      `const diagnostic = useDiagnostic()`
- [ ] Raw answers persisted to `localStorage` under `quantum_diagnostic_v1`
      exactly as specified — no precomputed scores in storage
- [ ] Version mismatch is detected and surfaced (`isStale` or equivalent),
      not silently rescored
- [ ] Area scores derived live from current `DIAGNOSTIC_QUESTIONS`
- [ ] `conceptStatus(id)` implements the exact three-way rule above
- [ ] `demonstrated` Set contains only `'demonstrated'`-status concept ids
- [ ] `recommendedStartModuleId` / `reviewModuleIds` derived from area
      scores only — no `STUDY_PATHS` import, no path selection
- [ ] `npm run build` passes
- [ ] Nothing else in the repo changes behavior (hook isn't imported
      anywhere yet — that's TASK-023)

### Verification steps
1. `npm run build` — must pass.
2. Sanity-check the hook in isolation (e.g. a throwaway test harness or
   manual `console.log` from a temporary import) rather than trusting the
   implementation blind: simulate answering all `dq-math-*` questions
   correctly and confirm `ket-notation`, `bra-notation`, `inner-product`
   land in `demonstrated`, while `notation-reading` (only 1 tagged
   question) stays `insufficient-evidence` regardless of correctness.
3. Simulate a stored `version` of `0` against `DIAGNOSTIC_VERSION = 1` and
   confirm the hook reports staleness rather than deriving scores.

### Next task
TASK-023 — `Diagnostic.jsx` page + `DiagnosticQuestion.jsx` component +
`/diagnostic` route (via `lazyWithRecovery`, matching `App.jsx`'s existing
pattern exactly) + a plain entry-point CTA on `Roadmap.jsx` linking to it
(no data coupling, no per-path badge — see CLAUDE.md).
