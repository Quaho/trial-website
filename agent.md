# agent.md — Current Codex Task

## TASK-040 — COMPLETE (2026-08-18)
Direct user feedback on TASK-039's output, caught immediately after
deploy: "too much text right now" on the 8 Qiskit Practice Challenge
boxes. Two rounds of `AskUserQuestion` narrowed scope (those boxes
specifically, not module pages generally) and approach (add a small
visual AND trim text, not either alone).

New `components/StateTransition.jsx` — a compact before → after
ket/outcome pair (e.g. `|+⟩ → |-⟩`), passed as `CodeFillBlank`/
`CodeOrdering`'s new optional `visual` prop, rendered between the prompt
and the code. All 8 Track B instances (`qiskit`, `gates`, `multiqubit`,
`entanglement`, `circuits`, `measurement`, `algorithms`, `labs`) got one,
plus a real prose trim — prompts down to one short sentence, post-check
explanations down to one or two, cutting the per-distractor "here's why
each wrong answer is wrong" style from the original TASK-039 copy.

CLAUDE.md's "Qiskit Practice Challenges" section gained a "Keep the
prose short; lead with the visual" subsection so this doesn't regress
next time someone adds to this pattern, plus a `StateTransition`
Component Architecture row.

Verified: `npm run build` passes (bundle sizes actually shrank slightly
— trimmed text outweighed the new component); grep confirms all 8
Track B pages import `StateTransition`. Not visually verified in a
browser — standing project convention, though this whole task exists
because the user *did* look at the live deploy and reported back, which
is exactly the loop this convention relies on the user to close.

## TASK-039 — COMPLETE (2026-08-18)
Resolves the last item before Phase 4: whether to roll the Phase 3a
diagnostic pilot (Intuition/Bra-Ket/Gates) out to the rest of the
handbook. Done directly at the user's request ("finish everything
before phase 4"), then substantially redirected mid-planning — twice —
via clarifying questions rather than guessed defaults. Full detail in
`TASKS.md`.

**How the scope changed from the original plan**: the first plan (plain
MCQ diagnostic questions for all 11 non-pilot modules, full pilot
density) was rejected outright — "actually change everything, change
the diagnostic questions when it is available to use qiskit do a
leetcode style question or qiskit orchestration." Two follow-up
`AskUserQuestion` rounds pinned down: (1) real graded pass/fail
exercises, not more no-reveal MCQs, for modules where Qiskit is
"available" (module 5 onward); (2) mixed fill-in-the-blank/step-ordering
format, embedded one per module inline in the page, same integration
pattern as `MentorNote`/`StuckPath`.

**Two tracks shipped, not one.** Track A (plain MCQ diagnostic,
extending the reviewed pilot mechanism, lighter density than the pilot):
`math-language`, `phase`, `noise`, `usecases` — 5 new concepts
(`vector-normalization`, `phase-vs-probability`, `basis-dependent-phase`,
`hardware-noise`, `nisq-limitations`), 10 new questions, `phase` got 2
concepts as a CLAUDE.md-named difficult module, the other 3 got 1 each.
22 → 32 total diagnostic questions, 7 areas. No `DIAGNOSTIC_VERSION`
bump — pure additions don't require one per the documented contract; a
returning user's `isComplete` correctly flips to false until they answer
the new sections, their old answers stay valid.

Track B (new "Qiskit Practice Challenges" feature, real pass/fail +
retry — a **deliberate, documented exception** to the diagnostic's own
"never reveals correctness" design contract, written up in CLAUDE.md's
new "Qiskit Practice Challenges" section per its Authority Model's
scoped-exception rule): `qiskit`, `gates`, `multiqubit`, `entanglement`,
`circuits`, `measurement`, `algorithms`, `labs`. Two new components,
`CodeFillBlank.jsx` (select-based blanks — deliberately not free text,
so grading is exact-match reliable without a parser) and
`CodeOrdering.jsx` (keyboard move-up/move-down reordering, not
drag-and-drop, for accessibility). No code execution anywhere — this is
a static site with no Python/Qiskit sandbox and none was added; every
exercise's code uses only syntax already established elsewhere on the
site (`QuantumCircuit`, `.h`/`.x`/`.z`/`.s`/`.cx`, `.measure`/
`.measure_all`, `AerSimulator`, `.run().result()`, `.get_counts()`).
`gates` sits in both tracks — it kept its original pilot diagnostic
content and additionally got a Qiskit Practice Challenge, since it was
explicitly named in the user's "every module from Qiskit onward" scope.

**A third deviation flagged and resolved without another round-trip**:
"every module from Qiskit onward" literally includes `noise` and
`usecases`, but neither page shows any Qiskit code at all (`grep -c
"<CodeBlock"` confirmed 0 for both, vs. 5/1/5 for Qiskit/Circuits/Labs).
Rather than invent Qiskit syntax with no connection to either page's
real content — which would have violated the same no-fabrication
standard TASK-038 held to — those two stayed on the Track A plain-MCQ
path instead. Flagged explicitly in the plan file at approval time
rather than silently substituted.

Every Track B exercise's correct answer is grounded in that module's own
already-stated content, not invented: Gates' Z|+⟩=|−⟩, MultiQubit's own
"Reading |10⟩" example, Entanglement's own H-then-CX Bell-state
derivation (order matters — swapping the two lines leaves the qubits
unentangled, which is the actual lesson), Measurement's and Algorithms'
shared "H-then-measure" basis-change trick (Algorithms explicitly
reuses it from Measurement in its own prose), Labs' own "description
first, execution second" framing extended to `simulator.run()`.

**UI debt fixed while in `Diagnostic.jsx`/`Roadmap.jsx`**: hardcoded
`sm:grid-cols-3` on the results grid (→ responsive for 7 areas), a
"3 short sections — notation, states, gates" bullet and hero sentence
naming only the 3 pilot topics (→ dynamic, all `DIAGNOSTIC_AREAS`),
`StudyChainView`'s stale doc comment, and Roadmap's "about 10 minutes"
estimate (→ "about 15 minutes," proportional to the new 32-question
total). Also fixed in passing: `DiagnosticQuestion.jsx`'s doc comment
still compared its styling to the now-deleted `Quiz.jsx`.

Verified: `npm run build` passes after every batch. A standalone
programmatic check (`.mjs` script in the scratchpad, mirroring TASK-021's
pilot verification) confirms every new question's `concepts` id resolves,
every new concept's `prereqs` id resolves, all new ids are unique, every
new concept has exactly 2 tagging questions. `grep -c "<CodeFillBlank\|<CodeOrdering"`
across `app/pages` confirms exactly one per Track B module. All Track B
correct answers hand-checked against the real gate matrices/formulas
they're grounded in. Not visually verified in a browser — standing
project convention.

## TASK-038 — COMPLETE (2026-08-18)
Phase 3b in full: "Beginner Usefulness & Continuation Resources," scoped
from an external assessment (`LLM_ASSIGNMENT.md`) and governed by
CLAUDE.md's "Mentor Notes, Stuck Recovery & Continuation Resources"
section. Done directly (not through the usual one-Codex-task-at-a-time
flow) at the user's explicit request to "do phase 3b" as a single pass,
after a plan-mode proposal and two user decisions up front. Full detail
in `TASKS.md`.

**Two decisions resolved before implementation, both previously flagged
as open in CLAUDE.md**: delete `LessonCard.jsx`/`StepNav.jsx`/`Quiz.jsx`/
`DeepDive.jsx` (orphaned since TASK-037), and delete `/challenges`
(flagged since TASK-031). Both were user-approved via `AskUserQuestion`
before any files were touched. **Correction to a standing inaccuracy
found in the process**: `/challenges` was described in CLAUDE.md and
TASK-031 as "nav-unlinked," but it was actually reachable from the
mobile `Navbar.jsx`'s "Explore" menu ("Mini Challenges"). That link was
removed along with the route (`App.jsx`) and the page file itself.

**New components**: `components/MentorNote.jsx` (cyan, `border-l-4`
family styling matching `DefinitionBox`/`NotationBox`/`RemarkBox`, single
concrete stumble point, `role="note"`) and `components/StuckPath.jsx`
(rose, `type` prop keyed to CLAUDE.md's four blocker categories —
`math`/`notation`/`circuit-reading`/`implementation` — each with its own
icon reused from `lib/data/modules.js`'s existing icon choices for
visual continuity, `role="region"`).

**`References.jsx` rewrite**: split the entry that mislabeled
`quantum.cloud.ibm.com/learning/en` as "IBM Qiskit Textbook" into two
accurate entries — IBM Quantum Learning (primary, maintained) and Qiskit
Textbook (archived, github.com/qiskit-community/qiskit-textbook,
historical/supplemental framing). Added Microsoft Quantum Katas, MIT
18.435J and 8.370x as two distinct links with the "may feel abrupt"
rigor warning, and Quantum Country. Added a goal-sorted chooser (six
rows) above the existing categorized sections, which were kept rather
than replaced. Tightened the Khan Academy entry's wording to read as
prerequisite repair only. Added a short "Where To Go Next" enhancement
to `UseCases.jsx`'s existing closing section (it already linked to
`/references`; the intro sentence and button label were adjusted to
preview the new goal-sorted framing rather than duplicating content).

**Per-module rollout, all 14 modules in `app/pages/`**: one `MentorNote`
per module, each anchored to a specific concrete stumble point next to
the triggering content (e.g. BraKet's "the probability is not 0.8, it is
0.64" — the LLM_ASSIGNMENT's own example; MultiQubit/Labs on Qiskit's
little-endian counts-key ordering; Algorithms on phase kickback leaving
no readable trace on the target register). Each MentorNote was checked
against content already present on its page to avoid restating a nearby
RemarkBox/MistakesBox item verbatim — several planned MentorNotes were
redirected to a different angle mid-implementation for exactly this
reason (e.g. Gates' Z-gate note, Entanglement's factoring note, Noise's
calibration-drift note, all picked *because* the obvious angle was
already covered elsewhere on the same page).

`StuckPath` placed once per blocker type, not on every module: `type="math"`
on BraKet (→ Mathematical Language, Khan Academy), `type="notation"` on
PhaseAngle (→ Bra-Ket, Glossary), `type="circuit-reading"` on
Entanglement (→ Gates, Multi-Qubit, Circuits), `type="implementation"`
on Algorithms (→ Qiskit, Labs, IBM Quantum Learning).

Predict-before-reveal added to the six modules CLAUDE.md names as
carrying a `ConceptSection` or amplitude/probability calculation —
Intuition, BraKet, PhaseAngle, Gates, Measurement, Algorithms — each a
local `useState('predict'/'reveal')` toggle mirroring `Labs.jsx`'s
existing `SimulateVisual` pattern (the only page that already had one).
BraKet's converts an existing passive-answer `ExampleBox` into an active
one rather than adding a redundant second copy of the same numbers.
Algorithms' reuses the page's own established N=1,000,000 → ~1,000-query
Grover numbers as the worked example, then asks the reader to predict a
*new* N=10,000 case rather than restating the given answer. Labs.jsx
already had a predict/reveal moment and was left alone.

**Section-title variation**: grepped for CLAUDE.md's named repeated
phrases; found the RailCard title "What To Keep Straight" verbatim in 8
modules (Noise, Algorithms, Entanglement, Measurement, Circuits, Labs,
UseCases, PhaseAngle) and gave each a module-specific title instead.
Varied the closing-section label away from "Next Steps" on 7 of 13
modules that had it (Intuition → "Before You Continue", Qiskit/Labs →
"Where This Appears in Projects", Noise → "Before You Claim It Works",
Algorithms → "Before You Implement", Gates → "Before You Continue",
Circuits → "Reading Checklist"), leaving the rest unchanged — CLAUDE.md
asked for *some* pages to vary, not a second uniform relabeling.

**Docs updated in the same pass**: CLAUDE.md's Current State, What
Remains, Component Architecture table, and Phase 3b checklist (now
checked off, dated); two stale historical notes corrected in the same
file (the TASK-037-era "not yet resolved" orphaned-components note, and
the Component Architecture table's own "not yet built" MentorNote/
StuckPath rows).

Verified: `npm run build` passes after every batch of edits, not just at
the end. `grep -c "<MentorNote"` totals 14 across `app/pages` (one per
module); `grep -c "<StuckPath"` totals 4. `grep -rln "challenges\|LessonCard\|StepNav\|DeepDive\|<Quiz"`
across `app`/`components`/`lib` returns nothing. Predict/reveal numeric
answers (BraKet's 3/4 and 1/4, Measurement's 0.36 and 0.64, Gates' S²=Z
identity, Algorithms' √10,000=100) hand-checked against the stated
formulas. Not visually verified in a browser — standing project
convention (no Playwright/Chromium here).

## TASK-037 — COMPLETE (2026-08-17)
Migrate `UseCases.jsx` (module 14) off the legacy `LESSONS`/`LessonCard`/
`StepNav` template onto `ModuleLayout` outline+aside, same pattern as
TASK-032 through 036. Sixth and last of the "Advanced" group (modules
9-14) — this closes out the full legacy-template migration. Full detail
in `TASKS.md`.

7-entry outline (`usecases-chemistry`/`-optimization`/`-cryptography`/
`-ml`/`-limitations`/`-mistakes`/`-next`). All 5 original visuals kept in
the main flow, reskinned to `border-lime-800/40 bg-lime-950/15`
(use cases' assigned color).

**This is the final module (`next={null}`), so the closing section was
written as a genuine close, not a templated "Next Steps" pointing to a
module 15 that doesn't exist**: "Where To Go From Here" points to
`/roadmap`, `/glossary`, `/references` instead. The old page's
celebratory "Course complete! You've finished all 14 modules.
Congratulations!" banner (with a 🎉) is gone — `ModuleLayout`'s own
plain "Module complete." checkmark replaces it, same as every other
migrated module lost its custom banner. This is a deliberate, visible
behavior change worth calling out explicitly (not hidden in the diff):
per CLAUDE.md's Motion/Interactivity guidelines ("avoid excessive
gamification," restrained feedback only), the plain checkmark is more
consistent with the handbook's tone than a bespoke congratulatory
banner, but it is a real, user-facing loss of a small celebratory
moment — flagged here rather than silently dropped.

Heavy cross-module linking added, appropriate for a closing chapter:
chemistry section links to `/entanglement`, optimization and
cryptography both link to `/algorithms`, cryptography also links to
`/noise` for the physical-qubit-overhead math behind its own numbers,
and the limitations section links back to `/noise` for the physical
origin of the NISQ-era gap it displays. None of this existed in the
legacy lesson-stepper version, which had no mechanism for section-level
cross-links at all.

`GlossaryTooltip` terms (`Entanglement`, `Superposition`) and `Keyword`
tones (`entanglement`, `superposition`) checked against
`glossary.js`/`Keyword.jsx`'s real data. Grep confirmed no stale
"13 modules" or "Course complete" strings remain anywhere in the file.

**Repo-wide consequence of finishing this series, found and flagged, not
acted on**: `components/LessonCard.jsx`, `StepNav.jsx`, `Quiz.jsx`, and
`DeepDive.jsx` are now fully orphaned — a repo-wide grep confirms zero
pages import `LessonCard` or `StepNav` anymore (every page that did has
now been migrated), and `Quiz`/`DeepDive` are each only imported by
`LessonCard.jsx` itself. `CLAUDE.md`'s Component Architecture table
already documents these four as covering "the module pages that still
use the older lesson-stepper pattern" — that pattern no longer exists on
any page. Whether to delete these four components (and update that
CLAUDE.md table row) is a real follow-up decision, deliberately not
made here — same posture as `/challenges` being flagged rather than
deleted in TASK-031.

Verified: `npm run build` passes (`UseCases-*.js`, 33.28kB); grep
confirms all 7 outline ids match section anchors (empty diff), no
legacy imports remain, exactly one `VideoAside`, and nothing else in
the repo references `UseCases.jsx` internals. Not yet visually verified
in a browser (standing project convention).

### What's next
The "Advanced" group (modules 9-14) migration that started with
TASK-032 is now fully complete — no legacy `LESSONS`/`LessonCard`
module page remains anywhere in the handbook. Two follow-ups surfaced
but not actioned: (1) whether to delete the now-orphaned
`LessonCard`/`StepNav`/`Quiz`/`DeepDive` components, and (2) the
still-open `/challenges` question from TASK-031. Both are product
decisions for the user.

---

## TASK-036 — COMPLETE (2026-08-17)
Migrate `Noise.jsx` (module 13) off the legacy `LESSONS`/`LessonCard`/
`StepNav` template onto `ModuleLayout` outline+aside, same pattern as
TASK-032 through 035. Fifth of the "Advanced" group (modules 9-14). Full
detail in `TASKS.md`.

7-entry outline (`noise-ideal-vs-real`/`-decoherence`/`-nocloning`/
`-repetition`/`-overhead`/`-mistakes`/`-next`). All 5 original visuals
kept in the main flow, reskinned to a neutral
`border-slate-700/40 bg-slate-900/40` treatment matching noise's
assigned slate module color (rather than a saturated accent, since slate
*is* the module color here).

**Cleaned up a real dead-code bug found while migrating**:
`ErrorCorrectionVisual` had a second dot-grid block whose map result was
immediately `.slice(0, 0)`'d, so it always rendered nothing — pure dead
code, removed rather than ported forward.

Genuine connective content added: Section 3 (no-cloning) now links
directly to `Labs.jsx`'s teleportation clarification (TASK-035) — both
describe the same underlying limit, move-not-copy, from two different
angles. Section 5 (error-correction overhead) closes with a remark
framing "fault-tolerant" versus "useful today" as distinct claims,
setting up the next module's premise (current hardware is noisy and
non-error-corrected) explicitly rather than leaving it implicit.

Same stale-completion-banner pattern as every prior task in this series
("Module 12 complete" on the module-13 page), resolved the same way.

`GlossaryTooltip` terms (`Decoherence`, `Error Correction`) and
`Keyword` tones (`qubit`, `unitary`) checked against
`glossary.js`/`Keyword.jsx`'s real data.

Verified: `npm run build` passes (`Noise-*.js`, 31.76kB); grep confirms
all 7 outline ids match section anchors (empty diff), no legacy imports
remain, exactly one `VideoAside`, and nothing else in the repo
references `Noise.jsx` internals. Not yet visually verified in a browser
(standing project convention).

### What's next
Use Cases (module 14) is next — the last module in the "Advanced" group
and the last one on the legacy template overall. Not yet scoped.

---

## TASK-035 — COMPLETE (2026-08-17)
Migrate `Labs.jsx` (module 12) off the legacy `LESSONS`/`LessonCard`/
`StepNav` template onto `ModuleLayout` outline+aside, same pattern as
TASK-032/033/034. Fourth of the "Advanced" group (modules 9-14). Full
detail in `TASKS.md`.

7-entry outline (`labs-create`/`-gates`/`-simulate`/`-bell`/
`-experiments`/`-mistakes`/`-next`). All 5 original visuals kept in the
main flow (circuit-setup stepper, gate-by-gate Bell builder, predict/
reveal simulate visual, end-to-end Bell recipe, mini-experiments
selector), reskinned to `border-rose-800/40 bg-rose-950/15` (labs'
assigned color).

**Added one genuine rigor fix, not just a straight port**: the original
page's "Quantum Teleportation" mini experiment gave code and an outcome
with zero explanation of the mechanism — exactly the kind of unexplained
formalism CLAUDE.md warns against. Added an `ExpandableAside` clarifying
that teleportation moves a state via a Bell pair plus classical
communication, does not send information faster than light, and
destroys the original qubit's state per no-cloning — with a forward
link to `/noise` where no-cloning is covered properly.

Same stale-completion-banner pattern as TASK-032/033/034 ("Module 11
complete" on the module-12 page), resolved the same way.

`GlossaryTooltip` terms (`Bell State`, `Circuit`, `Gate`) and `Keyword`
tones (`bell`, `circuit`, `gate`, `qubit`) checked against
`glossary.js`/`Keyword.jsx`'s real data.

Verified: `npm run build` passes (`Labs-*.js`, 28.96kB); grep confirms
all 7 outline ids match section anchors (empty diff), no legacy imports
remain, exactly one `VideoAside`, and nothing else in the repo
references `Labs.jsx` internals. Not yet visually verified in a browser
(standing project convention).

### What's next
Noise (module 13) is next in sequence, not yet scoped.

---

## TASK-034 — COMPLETE (2026-08-17)
Migrate `Algorithms.jsx` (module 11) off the legacy `LESSONS`/
`LessonCard`/`StepNav` template onto `ModuleLayout` outline+aside, same
pattern as TASK-032/033. Third of the "Advanced" group (modules 9-14),
one module at a time. Full detail in `TASKS.md`.

7-entry outline (`algorithms-deutsch`/`-grover`/`-kickback`/`-shor`/
`-advantage`/`-mistakes`/`-next`). All 5 original visuals kept in the
main flow (Deutsch-Jozsa oracle toggle, Grover amplitude-amplification
stepper, phase-kickback step list, Shor comparison table, quantum-
advantage category table), reskinned to `border-orange-800/40
bg-orange-950/15` (algorithms' assigned color).

**Fixed a real pre-existing bug while migrating, not just cosmetics**:
`AdvantageVisual` built Tailwind classes via template strings
(`` `border-${c.color}-800/30` ``, etc.) — exactly the anti-pattern
`modules.js`'s own comment warns about ("all classes must be full
strings for Tailwind JIT to detect them"). Those dynamic classes were
never in Tailwind's scanned output and were silently no-ops. Replaced
with an explicit `ADVANTAGE_CATEGORY_STYLES` lookup of full literal
class strings, one per color, matching the pattern `MODULE_STYLES`
already uses in `modules.js`.

Content additions beyond a straight port: Section 3 (phase kickback) now
cross-references the |−⟩ phase-detection example from `Measurement.jsx`
directly (φ=π case), and Section 4 (Shor) links forward to `/noise` for
what "error-corrected logical qubit" actually costs in physical qubits —
both genuine connective tissue the legacy lesson-stepper format had no
place for.

Same stale-completion-banner pattern as TASK-032/033 ("Module 10
complete" on the module-11 page), resolved the same way via
`ModuleLayout`'s own footer.

`GlossaryTooltip` terms (`Amplitude`, `Interference`, `Oracle`,
`Superposition`) and `Keyword` tones (`amplitude`, `gate`,
`interference`, `superposition`, `unitary`) checked against
`glossary.js`/`Keyword.jsx`'s real data.

Verified: `npm run build` passes (`Algorithms-*.js`, 31.91kB); grep
confirms all 7 outline ids match section anchors 1:1 (empty diff), no
legacy imports remain, exactly one `VideoAside` (moved into section 2,
Grover, matching its actual content — the original page had it
oddly placed after the lesson stepper with no section association), and
nothing else in the repo references `Algorithms.jsx` internals. Not yet
visually verified in a browser (standing project convention).

### What's next
Labs (module 12) is next in sequence, not yet scoped.

---

## TASK-033 — COMPLETE (2026-08-17)
Migrate `Measurement.jsx` (module 10) off the legacy `LESSONS`/
`LessonCard`/`StepNav` template onto `ModuleLayout` outline+aside, same
pattern as TASK-032's `Circuits.jsx`. Second of the "Advanced" group
(modules 9-14), one module at a time. Full detail in `TASKS.md`.

7-entry outline (`measurement-basis`/`-bases`/`-why`/`-probability`/
`-change`/`-mistakes`/`-next`). All 5 of the original page's interactive
visuals were kept in the main flow, reskinned to
`rounded-2xl border-amber-800/40 bg-amber-950/15` (measurement's assigned
module color) — none were redundant enough to demote to
`ExpandableAside` this time, unlike TASK-032's Bell stepper. Two of the
original page's `deepDive` asides (BB84 motivation, complex-amplitude
Born rule) were kept as `ExpandableAside`s rather than dropped, plus one
new one (arbitrary-basis measurement via a general unitary) covering
content that was previously part of a `deepDive` too.

Same stale-number bug pattern as TASK-032, fixed the same way: the old
completion banner said "Module 9 complete" (should have been 10); moot
now that `ModuleLayout`'s own footer replaces it.

`GlossaryTooltip` terms (`Basis`, `Measurement`) and `Keyword` tones
(`amplitude`, `basis`, `measurement`, `phase`, `unitary`) checked against
`glossary.js`/`Keyword.jsx`'s real data, not assumed.

Verified: `npm run build` passes (`Measurement-*.js`, 31.22kB); grep
confirms all 7 outline ids match section anchors 1:1, no legacy imports
remain, and nothing else in the repo references `Measurement.jsx`
internals. Not yet visually verified in a browser (standing project
convention).

### What's next
Algorithms (module 11) is next in sequence, not yet scoped.

---

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
Superseded by TASK-037 above — Use Cases (module 14) has since been
migrated, closing out the full Advanced-group migration.

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
