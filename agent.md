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

## TASK-026: `VideoAside` + `ExpandableAside` focus-visible fix + accessibility pass

### Why this task now
Final slice of the Diagnostic Placement pilot (Phase 3a). Everything
functional is built and verified (data model, hook, diagnostic UI,
`ConceptSection` collapsing, the study-sequence chain, save/restore
codes, Gates matrices). This task closes it out: the one deferred optional
feature (IBM video embeds) plus a real accessibility sweep across
everything added in TASK-020 through TASK-025, which so far has only had
build-level and logic-level verification, never a dedicated a11y pass.

### File to create
`components/VideoAside.jsx`

### Requirements — VideoAside (see CLAUDE.md's "IBM Video Sourcing")
- Text summary (title + description) is **permanently visible**, outside
  any `<details>` — not inside `<summary>` either, so a click on the
  description doesn't toggle playback.
- The `<details>`/`<summary>` only gates the video embed. Track "has this
  ever been opened" with React state (`hasLoaded`, set via `onToggle` when
  `event.currentTarget.open` is true) and render `{hasLoaded && <iframe
  .../>}` — gate on first-ever-open, not current-open state, so
  closing/reopening doesn't reload or reset playback.
- Explicit `focus-visible` styling on the `<summary>` toggle (see next
  bullet — `ExpandableAside` is missing this today; don't repeat the gap).
- Source only from IBM Quantum's official YouTube channel. Verify actual
  video URLs live at implementation time — none are pre-selected. One
  video per pilot module max (Intuition/Bra-Ket/Gates), placed only inside
  the fold, never in the main reading flow, never autoplay.

### Also fix: `components/ExpandableAside.jsx`
Its `<summary>` currently has no `focus-visible` classes at all (confirmed
by reading the file in an earlier session) — a real, if small, a11y gap.
Add the same `focus-visible:outline focus-visible:outline-2
focus-visible:outline-offset-2 focus-visible:outline-indigo-400` pattern
used everywhere else in this codebase (see `ConceptSection.jsx`'s
`<summary>` for the exact classes).

### Accessibility verification pass — everything built in this pilot
Not just VideoAside. Go through and actually check, not just read the
code:
- **Keyboard-only navigation**: `/diagnostic`'s choice buttons
  (`DiagnosticQuestion.jsx`), the intro/results screens' buttons and
  links, `ConceptSection`'s `<summary>` toggles on all 3 pilot pages, the
  new save/restore code inputs on the results view, and `VideoAside`'s
  toggle — all reachable via Tab, all operable via Enter/Space, all show a
  visible focus ring.
- **`aria-live` correctness**: `Diagnostic.jsx`'s question-progress
  announcement — confirm it actually fires on question change and reads
  sensibly with a screen reader, not just that the markup is present.
- **Color is not the only signal**: `ConceptSection`'s emerald "already
  known" styling and `StudyChainView`'s status colors (`start`/`continue`/
  `skim`) — confirm each also carries a text label, not color alone. (They
  do today — verify, don't just assume.)
- **`RestoreCodeSection`'s error state** (`Diagnostic.jsx`) — confirm the
  error message has `role="alert"` semantics that actually announce, and
  that the input's label is programmatically associated (it uses
  `htmlFor`/`id` today — verify it survived).
- **Reduced motion**: nothing added this pilot should animate beyond the
  `MotionConfig reducedMotion="user"` already set globally in `App.jsx` —
  confirm no new component bypasses that.

### Non-goals for TASK-026
- No new content changes to `Intuition.jsx`/`BraKet.jsx`/`Gates.jsx`
  beyond adding one `VideoAside` each.
- No rollout beyond the 3 pilot modules.
- No changes to `useDiagnostic.js`, `diagnosticCode.js`, `concepts.js`, or
  `diagnostic.js`.

### Acceptance criteria
- [ ] `VideoAside.jsx` exists, matches the behavior above
- [ ] `ExpandableAside.jsx`'s `<summary>` has `focus-visible` styling
- [ ] One `VideoAside` added to each of the 3 pilot pages, inside a fold,
      never in the main reading flow
- [ ] Keyboard-only pass completed and documented in `TASKS.md` — what was
      checked, not just "passed"
- [ ] `npm run build` passes

### Verification steps
1. `npm run build` — must pass.
2. Keyboard-only walkthrough of `/diagnostic` end to end (intro → all 22
   questions → results → save/restore) using only Tab/Enter/Space.
3. Keyboard-only walkthrough of `/intuition`, `/braket`, `/gates`,
   toggling every `ConceptSection` and `VideoAside` disclosure.
4. Confirm via network tab that no `VideoAside` iframe loads until its
   first open, and doesn't reload on close/reopen.

### Next task
None currently scoped — this closes out the Diagnostic Placement pilot
(Phase 3a). Per CLAUDE.md, review the pilot before deciding whether to
roll the concept graph + diagnostic out to the remaining 10 modules.
