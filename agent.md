# agent.md — Current Codex Task

## TASK-032 — COMPLETE (2026-08-17)
Migrate `Circuits.jsx` (module 9) off the legacy `LESSONS`/`LessonCard`/
`StepNav` lesson-stepper template onto the current `ModuleLayout`
outline+aside handbook template — the first of the "Advanced" group
(modules 9-14, all still legacy) to be migrated, one module at a time per
user direction. Full detail in `TASKS.md`.

Rewritten to match `Entanglement.jsx`'s established shape: intro
paragraph, `PrereqList` + Learning Objectives, 7-entry outline
(`circuits-reading`/`-elements`/`-stepping`/`-bell`/`-code`/`-mistakes`/
`-next`), `DefinitionBox`/`NotationBox`/`ExampleBox`/`RemarkBox` per
section, a `MistakesBox` section, `SummaryBox`, and a Next Steps section
with real `Link`s (`/measurement`, `/projects/first-circuit`,
`/references`). No `ConceptSection` — circuits is outside the diagnostic
pilot's 3-module scope, unchanged by this task.

**All 4 of the original page's SVG-diagram interactives were kept, not
discarded** — CLAUDE.md says keep the best interactive if it materially
helps, and these do real work. Reskinned to the modern card convention
(`rounded-2xl border-emerald-800/40 bg-emerald-950/15`, matching
`circuits`'s assigned module color) but logic untouched:
`CircuitAnatomyVisual`, `CircuitElementsVisual`, and
`CircuitStepperVisual` stayed in the main reading flow (sections 1-3);
`CircuitToCodeVisual` stayed in section 5. **`BellStepperVisual` was
moved into an `ExpandableAside`** in section 4 rather than kept expanded
— it substantially overlaps `CircuitStepperVisual` (same H+CNOT circuit)
and section 4's main flow already has a `MathDisplay` worked example, so
per CLAUDE.md's "keep only the most important one expanded, move
supplementary interactives into `ExpandableAside`" this was the one to
fold, not delete.

**Fixed in passing**: the old page's completion banner read "Module 8
complete" (stale since TASK-027 renumbered circuits to module 9) — moot
now, since `ModuleLayout`'s built-in "Mark as Complete" footer replaces
that custom banner entirely; the stale string no longer exists anywhere
in this file.

**GlossaryTooltip/Keyword usage checked against real data, not
assumed**: `GlossaryTooltip` terms used (`Circuit`, `Gate`,
`Measurement`) all exist verbatim in `glossary.js`; `Keyword` tones used
(`circuit`, `qubit`, `gate`, `measurement`, `bell`) all exist in
`Keyword.jsx`'s `KEYWORD_STYLES` map.

Verified: `npm run build` passes (`Circuits-*.js` chunk, 42.01kB, up from
the legacy version — consistent with real content added, not lost); grep
confirms all 7 outline `id`s have exactly one matching `id="..."`
section anchor each; grep confirms no `useProgress`/`LessonCard`/
`StepNav`/`MODULE_LAYOUT_STYLES` imports remain; grep confirms nothing
else in the repo imports from `Circuits.jsx`'s internals (only `App.jsx`
imports it as a route component, unchanged). Not yet visually verified
in a browser — standing project convention (no Playwright/Chromium
here).

### What's next
Measurement (module 10) is the next legacy page in sequence, still not
scoped — do one module at a time, per user direction, not in this task.

---

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

## TASK-025 — COMPLETE (2026-08-09)
Gates.jsx explicit gate matrices + Intuition.jsx analogy audit.

### What was built
- **`Gates.jsx`** — added the 5 confirmed-missing matrices (X, Z, H, S, T)
  via `MathDisplay`/`pmatrix`, matching `BraKet.jsx`'s established
  convention. Each is a `NotationBox` placed immediately after its gate's
  `DefinitionBox`, inside the same `ConceptSection` cluster TASK-024
  already wired — not outside it, so the matrix collapses/expands
  together with the rest of that gate's content, never orphaned. Scope
  stayed exactly these 5; no generic `U` matrix was added to
  `gates-unitary` (correctly out of scope).
- **`Intuition.jsx`** — audited, not rewritten. Grepped for analogy-
  signaling language (`like a`, `similar to`, `imagine`, `think of`,
  `analog*`) — **zero matches**. Every section already leads with a formal
  `DefinitionBox`, and the only analogy-adjacent text is `RemarkBox`es
  that explicitly correct a naive analogy rather than rely on one.
  **Conclusion: no change needed.** Documented in `TASKS.md` per the
  task's explicit instruction not to force an edit to justify the task.

### Verification performed
- `npm run build` — passes; `Gates.jsx`'s chunk grew from 29.65kB to
  31.06kB, consistent with 4 new `NotationBox`/`MathDisplay` additions
  (S and T share one block).
- Grep-based audit of `Intuition.jsx`, not just re-reading it — a
  systematic check for the specific failure mode CLAUDE.md flags, not an
  impression.
- **Not yet visually verified in a browser** — same standing caveat as
  every task this pilot (no Playwright/Chromium here).

---

## TASK-026 — COMPLETE (2026-08-09)
`VideoAside` + `ExpandableAside` focus-visible fix + accessibility pass.
**This closes out the Diagnostic Placement pilot (Phase 3a) as originally
scoped.** Full detail in `TASKS.md`. Highlights:

- `components/VideoAside.jsx` built exactly to spec (text always visible
  outside `<details>`, iframe gated on first-ever-open via `hasLoaded`,
  `focus-visible` on `<summary>`). `ExpandableAside.jsx`'s missing
  `focus-visible` fixed too.
- **Video sourcing was actually verified, not trusted from search result
  titles**: every candidate was checked via YouTube's oEmbed JSON endpoint
  for its real `author_name`. Two looked IBM-adjacent from search
  snippets alone and turned out to be third parties (`Visualmatics`,
  `sentdex`) — rejected. Landed on 2 confirmed IBM videos (Qiskit channel
  + IBM Research channel), wired into `Intuition.jsx` and `Gates.jsx`.
  **No video on `BraKet.jsx`** — no verified-IBM match existed for
  Dirac/bra-ket notation, and per "max, not required," skipping it was
  judged better than a wrong attribution. If a future task finds one,
  adding it is a small, low-risk change.
- **The accessibility pass found and fixed a real bug**, not just a
  review: `DiagnosticQuestion.jsx` claimed `role="radiogroup"`/
  `role="radio"` without the roving-tabindex + arrow-key navigation that
  pattern requires — fixed with the full ARIA APG keyboard pattern.
  Everything else (focus-visible presence, color-not-only-signal,
  `role="alert"`/label association on the restore-code error) was
  checked and confirmed already correct, not assumed.
- **Found and documented, deliberately not fixed**: no sitewide CSS-level
  `prefers-reduced-motion` media query exists anywhere in this codebase —
  a pre-existing gap, not introduced by this pilot, out of scope to fix
  broadly in one task. None of this pilot's components use Framer Motion,
  so at least nothing here makes it worse.
- This was a rigorous code-level pass (caught a genuine interaction-
  pattern bug), not a literal screen-reader/browser session — consistent
  with this project's no-Playwright/Chromium convention. Said so
  explicitly rather than overclaiming a full manual audit.
- `npm run build` passes.

### What's next after the pilot
No task currently scoped. Per CLAUDE.md's Phase 3a note: review this
pilot (concept-graph model, evidence thresholds, the study-chain UX, the
save/restore code) before deciding whether to roll it out beyond
Intuition/Bra-Ket/Gates to the remaining 10 modules. That review is a
product decision for the user, not something to proceed on unprompted.

---

## TASK-017 / TASK-018 — COMPLETE (2026-08-09)
MP2 (Bell State Explorer) and MP3 (Algorithm Showdown) — the last two
items in the backlog, unrelated to the diagnostic pilot. Both were
40-line "under construction" stubs; both now have full content matching
`FirstCircuit.jsx`'s established `ProjectLayout` pattern (Predict/Reflect
callouts, `CodeBlock`, `GlossaryTooltip`, step-gated progress via
`useProgress`'s `project-<id>` key). Full detail in `TASKS.md`.

- **Bell State Explorer** (5 steps): reuses the exact H+CNOT circuit
  already established in `Circuits.jsx` rather than inventing new
  notation, then shows how prepending an X gate before the CNOT prepares
  `|Ψ+⟩` instead of `|Φ+⟩`.
- **Algorithm Showdown** (6 steps): classical linear search baseline →
  Grover's oracle/diffuser → a query-count table reusing `Algorithms.jsx`'s
  existing "~1,000 vs 500,000 at N=1,000,000" numbers rather than
  inventing new ones → a closing step tying the quadratic-speedup
  fragility argument to `/noise` and `/usecases`.
- **Caught two real content bugs before shipping, not after**: two
  `GlossaryTooltip` wraps in `AlgorithmShowdown.jsx` were checked against
  `glossary.js`'s actual term list rather than assumed correct —
  `term="Amplitude"` had been wrapped around the unrelated phrase
  "Grover's algorithm," and `term="Gate"` was wrapped around "oracle" when
  a dedicated `"Oracle"` glossary entry actually exists. Both fixed before
  the build/commit, not left for a later pass.

Backlog is now empty. `npm run build` passes for both. Neither has been
visually verified in a browser (standing project convention: no
Playwright/Chromium here).

---

## TASK-029 — COMPLETE (2026-08-09)
One `VideoAside` per module, all 14 — user request, sourcing broadened
beyond IBM-only ("ideally from IBM, but other reputable sources also
works"). Full detail in `TASKS.md`.

**Policy change, made in CLAUDE.md first, before touching any page:**
"IBM Video Sourcing" → "Video Sourcing." IBM/Qiskit still preferred;
other verified-reputable sources (established institutions, well-known
science-education channels) are now acceptable. The **verify-before-use
rule is unchanged and non-negotiable regardless of source** — every
candidate this task used was checked via YouTube's oEmbed endpoint for
its actual `author_name`, not assumed from a search-result title. Two
more third-party channels were caught and rejected in this pass
(`For the Love of Physics`, `Spectral Forge Labs`), on top of the two
caught in TASK-026 — the discipline is holding up, not a one-time thing.

**`VideoAside.jsx` changed shape**: `source` is now a prop (was
hardcoded `"IBM Quantum"`). If you add a video anywhere, pass the real
verified channel name.

**Final sourcing, all confirmed via oEmbed:**
9 Qiskit official channel, 1 IBM Research (`gates`, from TASK-026), 1
MIT OpenCourseWare (`braket`), 1 3Blue1Brown (`math-language`), 1
Veritasium (`entanglement`).

**Placement pattern differs by page type — know this before adding more:**
- Pilot pages with `ConceptSection` (`intuition`/`braket`/`gates`): video
  goes inside the relevant existing cluster.
- Other "modern" outline+aside pages, no `ConceptSection`
  (`math-language`/`phase`/`qiskit`/`multiqubit`/`entanglement`): video is
  a standalone block inside the most topically relevant `<section>`.
- "Legacy" `stepInfo`/`LESSONS`-array pages
  (`circuits`/`measurement`/`algorithms`/`labs`/`noise`/`usecases`): no
  per-lesson slot exists without restructuring `LESSONS` data, so the
  video is placed once, persistently, between the lesson stepper's
  `</AnimatePresence>` and `<StepNav>` — visible on every lesson step,
  not tied to one.

**Also fixed, found by accident while in `UseCases.jsx`**: its module-
complete message said "You've finished all 13 modules" — stale since
TASK-027 made Mathematical Language module 14. Grepped the whole
codebase for the same stale count; it was the only occurrence.

**Verification, not just "looks right":** `grep -c "<VideoAside"` across
all 14 pages confirms exactly one each; a dedupe pass on all 14
`videoId`s confirms none were accidentally reused. `npm run build`
passes; `VideoAside` code-splits into one shared chunk reused across all
14 pages (confirms the component itself, not 14 copies of it). Not
visually verified in a browser — standing project convention.
