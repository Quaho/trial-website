# TASKS.md — Current Backlog

## Completed
- **[TASK-001–016]** All APPROVED (a11y sweep, accent bullets, aria-live, mobile polish, celebration animation, GlossaryTooltip, tooltip integration, 375px mobile fixes, MP infrastructure + MP1)
- **[TASK-019]** Phase 2 — Structure (navigation, page template components, References page). Verified against the repo: `References.jsx`, `DefinitionBox`/`NotationBox`/`ExampleBox`/`RemarkBox`/`PrereqList`, and the Study Paths/References nav labels all exist as specified in `agent.md`'s TASK-019. This was done but never logged here — reconciled 2026-08-09.
- **[TASK-020]** Diagnostic Placement Pilot — CLAUDE.md amendment. Added "Diagnostic Placement & Concept Evidence" section, "IBM Video Sourcing" guidance, corrected stale Study Paths status, added Phase 3a to Build Plan. Doc-only; `npm run build` verified passing. Completed 2026-08-09.
- **[TASK-021]** Diagnostic Placement Pilot — concept graph + diagnostic question data model. Added `lib/data/concepts.js` (14 concepts across the 3 pilot modules) and `lib/data/diagnostic.js` (22 questions across 3 areas, `DIAGNOSTIC_VERSION` contract). Cross-checked programmatically: every question's concept/area ids resolve, every concept prereq resolves, all ids unique, all choice arrays valid. 9 of 14 concepts have ≥2 tagged questions (collapsible-eligible); the rest are deliberately left below threshold per the evidence-model rule. Not yet imported anywhere (no behavior change). `npm run build` verified passing. Completed 2026-08-09.
- **[TASK-022]** Diagnostic Placement Pilot — `useDiagnostic` hook. Added `lib/hooks/useDiagnostic.js`: raw-answer localStorage persistence (`quantum_diagnostic_v1`), `DIAGNOSTIC_VERSION` staleness detection, live-derived area scores, three-way `conceptStatus` (`demonstrated`/`needs-review`/`insufficient-evidence`), `demonstrated` Set, and `recommendedStartModuleId`/`reviewModuleIds` derived from area scores only — no `STUDY_PATHS` import. `npm run build` verified passing. Completed 2026-08-09.
- **[TASK-023]** Diagnostic Placement Pilot — Diagnostic page/route + Roadmap entry point. Added `components/DiagnosticQuestion.jsx`, `app/pages/Diagnostic.jsx` (intro → 3-area question flow → results view), `/diagnostic` route in `App.jsx` via `lazyWithRecovery`, and a plain entry-point CTA on `Roadmap.jsx` above the Study Path cards (no data coupling, no per-path badge). `npm run build` verified passing, produces a separate `Diagnostic-*.js` chunk. Not yet visually verified in a browser — pending user check. Completed 2026-08-09.

## Active
- **[TASK-017] MP2 — Bell State Explorer (full content)**
  Status: ASSIGNED TO CODEX
  Priority: feature — Circuits track capstone project
  Files: app/pages/projects/BellExplorer.jsx
  Note: confirmed still a stub (40-line "under construction" placeholder) as of 2026-08-09 — not done, despite drift elsewhere in project docs.

- **[TASK-024] Diagnostic Placement Pilot — `ConceptSection` + wiring into Intuition/Bra-Ket/Gates**
  Status: ASSIGNED TO CODEX
  Priority: infrastructure — fifth slice of the Diagnostic Placement + Concept-Level Blocks pilot (Phase 3a)
  Files: components/ConceptSection.jsx (new), app/pages/Intuition.jsx, app/pages/BraKet.jsx, app/pages/Gates.jsx

## Backlog (unordered, to be triaged)
- **[TASK-018]** MP3 — Algorithm Showdown (full content)
- **[TASK-025]** Diagnostic Placement Pilot — Gates.jsx matrix tables + Intuition.jsx analogy audit
- **[TASK-026]** Diagnostic Placement Pilot — `VideoAside` + `ExpandableAside` focus-visible fix + accessibility verification
