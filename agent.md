# agent.md — Current Codex Task

## TASK-019 — COMPLETE (reconciled 2026-08-09)
Phase 2 structure work. See `TASKS.md`.

## TASK-020 — COMPLETE (2026-08-09)
CLAUDE.md amendment (doc-only). See `TASKS.md` and CLAUDE.md's "Diagnostic
Placement & Concept Evidence" section.

## TASK-021 — COMPLETE (2026-08-09)
Concept graph + diagnostic question data model
(`lib/data/concepts.js`, `lib/data/diagnostic.js`). See `TASKS.md`.

## TASK-022 — COMPLETE (2026-08-09)
`useDiagnostic` hook (`lib/hooks/useDiagnostic.js`). See `TASKS.md`.

## TASK-023 — COMPLETE (2026-08-09)
Diagnostic page/route + Roadmap entry point.

### What was built
- **`components/DiagnosticQuestion.jsx`** — one question, 4 lettered choice
  buttons, visually consistent with `Quiz.jsx` but behaviorally distinct:
  no correctness reveal, no retry, `role="radiogroup"`/`radio` semantics.
- **`app/pages/Diagnostic.jsx`** — three states in one page: an intro
  screen (what it is, ~10 minutes, explicit "Skip — go to Study Paths"
  link so it never reads as mandatory), a question flow across the 3
  `DIAGNOSTIC_AREAS` with a progress bar and `aria-live` announcement, and
  a results view (per-area score bars, demonstrated-concept list via
  `CONCEPTS_BY_ID`, suggested starting module + skim candidates via
  `MODULES`, a link to `/roadmap`, and a retake button calling
  `diagnostic.reset()`). Resumes mid-diagnostic from stored answers if the
  student reloads or leaves and comes back.
- **`/diagnostic` route** in `App.jsx`, registered via `lazyWithRecovery`
  exactly matching the existing pattern (not plain `lazy()`).
- **Roadmap entry point** — a plain CTA section added above the
  `STUDY_PATHS` cards in `Roadmap.jsx`: "Not sure where your knowledge
  stands? Take the placement diagnostic." No data dependency on
  `useDiagnostic`, no per-path recommendation badge — `STUDY_PATHS` and its
  matching logic are untouched, per CLAUDE.md.

### Verification performed
- `npm run build` — passes, produces a separate `Diagnostic-*.js` chunk
  (confirms the route code-splits correctly).
- Code review against `Quiz.jsx`, `ModuleLayout.jsx`, `Roadmap.jsx` for
  visual/interaction consistency (focus-visible states, `btn-primary`/
  `btn-secondary`/`btn-ghost` reuse, `section-label` conventions).
- **Not yet visually verified in an actual browser** — the user does that
  manually (this project's convention: no Playwright/Chromium tooling for
  verification here). If something renders wrong, expect a follow-up fix
  task rather than assuming this is pixel-perfect from code review alone.

### Non-goals honored
No `ConceptSection`, no wiring into the pilot module pages, no video
aside — those are TASK-024 onward. `Gates.jsx`/`Intuition.jsx`/
`BraKet.jsx` are untouched by TASK-023.

---

## TASK-024: `ConceptSection` + wiring into Intuition/Bra-Ket/Gates

### Why this task now
Fifth slice of the Diagnostic Placement pilot (Phase 3a). The diagnostic
now exists and can be taken, but nothing on the pilot pages reacts to its
results yet — `useDiagnostic()`'s `demonstrated` Set is unused outside the
results view. This task is what makes taking the diagnostic actually
change anything on `/intuition`, `/braket`, `/gates`.

### File to create
`components/ConceptSection.jsx`

### Requirements

**Props:** `conceptIds` (array of concept ids from `concepts.js`),
`demonstrated` (the `Set` from a page-level `useDiagnostic()` call — this
component does NOT call the hook itself), `children`.

**Behavior:**
- If every id in `conceptIds` is present in `demonstrated` → render
  `children` inside a collapsed `<details>` (closed by default), styled
  like `ExpandableAside.jsx`, labeled *"Your diagnostic suggests you
  already know this — expand to review"* (never "mastered").
- Otherwise (partial or no overlap, or diagnostic never taken) → render
  `children` exactly as-is, fully expanded. This must be pixel-identical
  to today's page for any visitor who hasn't taken the diagnostic — no
  behavior change is the default, not the exception.

**Wraps the box cluster only, never the section heading:** per CLAUDE.md,
the outer `<section id="...">` heading and intro sentence stay outside
`ConceptSection` — `Gates.jsx`'s and the other pages' outline nav anchors
on those ids, and collapsing them would break scroll-to-section and hide
chapter structure from someone scanning. Only the
`DefinitionBox`/`NotationBox`/`ExampleBox`/`RemarkBox` cluster underneath
a heading goes inside `ConceptSection`.

### Files to modify
`app/pages/Intuition.jsx`, `app/pages/BraKet.jsx`, `app/pages/Gates.jsx` —
add one `const diagnostic = useDiagnostic()` call near the top of each page
component, then wrap each section's content cluster in `ConceptSection`
using the `conceptIds`/`sectionId` mapping already defined in
`lib/data/concepts.js` (match by `sectionId`, e.g. `gates-x` →
`conceptIds={['pauli-x']}`). Concepts with only 1 tagged question
(`notation-reading`, `pauli-z`, `s-t-gates`) or 0 (`quantum-advantage-limits`)
will simply never collapse in this pilot — that's expected, not a bug to
route around.

### Non-goals for TASK-024
- No content rewriting — that's TASK-025 (Gates matrix tables, Intuition
  audit). Wrap existing content as-is.
- No changes to `concepts.js`, `diagnostic.js`, or `useDiagnostic.js`.
- No video aside — that's TASK-026.

### Acceptance criteria
- [ ] `components/ConceptSection.jsx` exists, matches the behavior above
- [ ] All 14 concepts from `concepts.js` are wired into their `sectionId`
      on the correct pilot page
- [ ] Fresh localStorage: all 3 pilot pages render identically to before
      this task (nothing collapsed)
- [ ] After answering all `dq-math-*` questions correctly in the
      diagnostic: `/braket`'s ket-notation, bra-notation, and
      inner-product sections render collapsed; `notation-reading` does not
      (only 1 tagged question, always insufficient-evidence)
- [ ] Section headings and outline-nav scroll anchors are unaffected in
      every case
- [ ] `npm run build` passes

### Verification steps
1. `npm run build` — must pass.
2. Fresh localStorage, visit all 3 pilot pages — confirm no visual change
   from before TASK-024.
3. Take the diagnostic, answer the `dq-gates-*` questions to get
   `unitary-gate`, `pauli-x`, and `hadamard` all correct (2/2 each) and
   `pauli-z`/`s-t-gates` however you like — revisit `/gates` and confirm
   exactly those 3 sections collapse, `gates-z` and `gates-phase` do not.
4. Confirm outline nav (the "On This Page" rail) still scrolls to the
   right heading even when that section's content is collapsed.

### Next task
TASK-025 — Gates.jsx explicit gate matrices (X/Z/H/S/T via `MathDisplay`
`pmatrix`) + Intuition.jsx analogy audit.
