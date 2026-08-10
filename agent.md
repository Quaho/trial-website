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

## TASK-027 — COMPLETE (2026-08-09) — NOT part of the pilot
A new "Mathematical Language" module (`app/pages/MathLanguage.jsx`,
`/math-language`, module 2) was added to fix a real content gap:
`BraKet.jsx` referenced "familiarity with vectors" with nothing to link to.
Full details in `TASKS.md`. **Important for TASK-024/025/026 below: this
did NOT expand the Diagnostic Placement pilot's scope.** `concepts.js`,
`diagnostic.js`, and `useDiagnostic.js` are untouched — the pilot is still
exactly Intuition/Bra-Ket/Gates. What DID change, relevant to those tasks:
- Every module downstream of Intuition was renumbered (old 2–13 → 3–14,
  `braket` is now module 3, `gates` is now module 6). If you're writing
  new copy that mentions a module number, use the current `MODULES` data,
  not a number from an earlier task description in this file.
- `braket`'s prereqs changed from `['intuition']` to `['math-language']` at
  the module level. `BraKet.jsx`'s own content/section ids
  (`braket-kets`, `braket-bras`, etc.) are unchanged — TASK-024's
  `ConceptSection` wiring plan for Bra-Ket is unaffected.

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

## TASK-024 — COMPLETE (2026-08-09)
`ConceptSection` + wiring into Intuition/Bra-Ket/Gates.

### What was built
- **`components/ConceptSection.jsx`** — exactly the spec below: collapses
  only when every id in `conceptIds` is in the `demonstrated` Set passed
  down as a prop (never calls `useDiagnostic()` itself); otherwise renders
  `children` exactly as-is. Collapsed state uses an emerald-accented
  `<details>` (visually distinct from `ExpandableAside`'s neutral gray, so
  "diagnostic says you know this" doesn't read as the same affordance as
  "optional aside"), labeled *"Your diagnostic suggests you already know
  this — expand to review,"* with `focus-visible` on the `<summary>`.
- **Wired into all 3 pilot pages** — one `useDiagnostic()` call per page
  (`Intuition.jsx`: 5 clusters, `BraKet.jsx`: 4 clusters, `Gates.jsx`: 5
  clusters), matching the `sectionId`→`conceptIds` mapping in
  `concepts.js` exactly. Section headings/intro sentences stay outside
  every wrapper — only the `DefinitionBox`/`NotationBox`/`ExampleBox`/
  `RemarkBox` cluster underneath is wrapped.

### Verification performed
- `npm run build` — passes; `useDiagnostic` now code-splits into its own
  shared chunk across the 4 pages importing it (Diagnostic + the 3 pilot
  pages), confirming the single-hook-per-page pattern is wired correctly
  rather than each page bundling its own copy.
- **Standalone Node script replicating `useDiagnostic`'s exact
  `conceptStatus` derivation** (not just reading the code) — simulated
  answering every `math-notation` and `gates` question correctly, left
  `states` untouched, and confirmed: `ket-notation`/`bra-notation`/
  `inner-product`/`unitary-gate`/`pauli-x`/`hadamard` → `demonstrated`;
  `notation-reading`/`pauli-z`/`s-t-gates` → `insufficient-evidence`
  (correctly capped by the ≥2-question threshold); every untouched-area
  concept → `insufficient-evidence`. Matches the acceptance criteria
  exactly.
- **Not yet visually verified in a browser** — same project convention as
  every prior task (no Playwright/Chromium here). The logic is verified;
  actual collapse styling/animation in a real browser is not.

---

## TASK-028 — COMPLETE (2026-08-09) — direct user feedback, inserted ahead of TASK-025
The user reviewed TASK-023's results view and said it "does not match the
initial description," specifically asking for (1) something like a linked
list for study ordering, driven by diagnostic results, and (2) a page to
save the result as a copyable code and re-enter it. Both were legitimate
gaps against the original plan (which had specified a Crockford Base32
save/restore code that never got built, and a flat recommendation instead
of an actual ordered sequence). Full detail in `TASKS.md`. Key points for
later tasks:
- `useDiagnostic()` no longer exposes `recommendedStartModuleId` /
  `reviewModuleIds` — if you were about to use those, use `studyChain`
  (array, weakest area first, each node has `.next`) and `studyChainHead`
  instead.
- `lib/utils/diagnosticCode.js` is new and self-contained (no dependency
  on `useDiagnostic.js`) — reusable if `useProgress.js`'s module/lesson
  progress ever gets the same save/restore treatment later.
- This did NOT reopen the "diagnostic must not pick a `STUDY_PATH`"
  decision — `studyChain` still only covers the 3 diagnostic-tested
  modules and is entirely separate from `STUDY_PATHS`/Roadmap.

---

## TASK-025: Gates.jsx explicit gate matrices + Intuition.jsx analogy audit

### Why this task now
Sixth slice of the pilot. This is the one confirmed concrete content gap
from the original review (verified by grep — `Gates.jsx` contains zero
`pmatrix`/`bmatrix` usage anywhere despite extensively covering unitarity,
eigenstates, and every named gate's *action* on states). It is a targeted
fill, not a rewrite — re-reading `Intuition.jsx` and `Gates.jsx` in full
this session confirmed both are already handbook-quality (formal
definitions, worked examples, correct caveats). Treat this as an audit
that may conclude "no change needed" for `Intuition.jsx`, not a mandate to
rewrite it.

### Files to modify
`app/pages/Gates.jsx`, `app/pages/Intuition.jsx`

### Requirements

**Gates.jsx — add explicit 2×2 matrices, inside the existing
`ConceptSection` clusters (not outside them):**
- Pauli-X (`gates-x` cluster): `X = [[0,1],[1,0]]`
- Pauli-Z (`gates-z` cluster): `Z = [[1,0],[0,-1]]`
- Hadamard (`gates-h` cluster): `H = (1/√2)[[1,1],[1,-1]]`
- S and T (`gates-phase` cluster): `S = [[1,0],[0,i]]`,
  `T = [[1,0],[0,e^{iπ/4}]]`

Use `MathDisplay` with `pmatrix`, matching the exact convention
`BraKet.jsx` already established for showing `|0⟩`/`|1⟩` as column
vectors (see `BasisStatesFigure` there). Place each matrix in its gate's
existing `DefinitionBox` or immediately after it — do not add a new
`ConceptSection` wrapper; these matrices belong inside the cluster
TASK-024 already wired for that concept. Scope is exactly these 5
matrices — do not also invent a generic `U = [[u11,u12],[u21,u22]]` form
for the `gates-unitary` section; that wasn't the confirmed gap and isn't
required.

**Intuition.jsx — audit only:** re-read for any place an analogy
substitutes for a real definition rather than supplementing one (CLAUDE.md
flags this failure mode explicitly). On this session's full read, the page
already seems to actively guard against this (e.g. the existing remark
"A qubit should not be understood as 'two classical bits packed into one
place'" is *correcting* a bad analogy, not relying on one). If the audit
finds a genuine gap, fix it narrowly. If it doesn't, say so in `TASKS.md`
and change nothing — do not force an edit to justify the task.

### Non-goals for TASK-025
- No changes to `ConceptSection.jsx`, `concepts.js`, `diagnostic.js`, or
  `useDiagnostic.js`.
- No changes to `BraKet.jsx` or `MathLanguage.jsx`.
- No video aside — that's TASK-026.

### Acceptance criteria
- [ ] All 5 matrices present in `Gates.jsx`, each inside its existing
      `ConceptSection` cluster, using `MathDisplay`/`pmatrix`
- [ ] `Intuition.jsx` audit documented in `TASKS.md` regardless of outcome
      (edited or left as-is)
- [ ] `npm run build` passes
- [ ] Fresh localStorage: both pages still render fully expanded, matrices
      visible as part of the normal (non-collapsed) reading flow

### Verification steps
1. `npm run build` — must pass.
2. Visit `/gates` fresh (no diagnostic taken) — confirm all 5 matrices
   render correctly via KaTeX (no raw LaTeX source visible, no layout
   overflow) and sit inside the same visual cluster as their gate's
   existing definition/example/remark.
3. Take the diagnostic, get `pauli-x`/`hadamard` to `demonstrated` —
   confirm their matrices are still present once expanded from the
   collapsed state (i.e., they went inside `ConceptSection`'s children,
   not accidentally placed outside it).

### Next task
TASK-026 — `VideoAside` (+ `ExpandableAside` focus-visible fix) + a full
accessibility verification pass on everything built across this pilot.
