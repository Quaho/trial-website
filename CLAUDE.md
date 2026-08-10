# CLAUDE.md — SIGQuantum Technical Onboarding Handbook

## Project Identity

This project is **not** a general event website and **not** a casual beginner course.

It is the **technical onboarding handbook** for students preparing to participate in **SIGQuantum** and **Fall Fest**. Its purpose is to give new members a structured, credible, academically oriented path into the core concepts, notation, tools, and expectations used in the group.

The site should feel like:
- a serious undergraduate technical primer
- a guided handbook for preparation
- a clean, modern academic reference

The site should **not** feel like:
- a marketing landing page
- an event logistics hub
- a playful edtech app
- a dense graduate textbook

---

## Project Status (August 2026)

### Stack
React 18 + Vite + Tailwind CSS v3 + KaTeX + React Router v6 + Framer Motion + Prism.js.

### Current State
The identity shift and structural phases are complete, and Phase 3 content work has substantially progressed. The site is branded **SIGQuantum — Technical Onboarding Handbook**. The handbook now spans **14 sequential modules**, Big-Picture Intuition through Use Cases (see Information Architecture below), each following the section template. `Roadmap.jsx` (Study Paths) is fully implemented: three background-based paths (CS/Python, physics/theory, new to both), a full topic map, and machine-project status, all driven by `useProgress`. Three **Machine Projects** (First Quantum Circuit, Bell State Explorer, Algorithm Showdown) are built end to end with real Qiskit code, predict/reflect checkpoints, and step-gated progress via `ProjectLayout`. The **Diagnostic Placement pilot** (Phase 3a) shipped in full, scoped to Intuition, Bra-Ket, and Gates: a soft/advisory placement quiz, concept-level content collapsing, a linked-list study sequence, and a no-account save/restore code (see Diagnostic Placement & Concept Evidence below). Separately, every one of the 14 modules — not just the 3 pilot modules — now carries one optional, source-verified video aside (see Video Sourcing); that rollout was content-only and did not extend the concept-graph/diagnostic-collapsing system itself beyond the pilot.

### What remains
- Continue Phase 3 rigor/clarity review on modules outside the diagnostic pilot — the concept-graph and evidence-based collapsing stop at Intuition/Bra-Ket/Gates by design, so other modules haven’t had that same line-by-line audit
- Decide whether to roll the concept graph + diagnostic out beyond the 3 pilot modules (see Phase 3a)
- Phase 4 polish: accessibility, mobile, and rendering audits

---

## Core Goal

Help a motivated student answer these questions quickly and confidently:

1. What technical background is expected?
2. What concepts do I need first?
3. What notation and language will SIGQuantum use?
4. What should I study before joining projects, workshops, or Fall Fest technical activities?
5. Where do I go next once I understand the basics?

Every page should reduce uncertainty and increase technical readiness.

---

## Product Vision

**“A clear and rigorous entry point into quantum computing for SIGQuantum members.”**

The site should present quantum computing as a structured subject that can be learned through careful progression. It must feel credible, disciplined, and readable.

Primary principles:
- Clarity before cleverness
- Structure before spectacle
- Definitions before intuition shortcuts
- Notation with explanation
- Rigor without unnecessary intimidation

This is onboarding, not entertainment.

---

## Audience

### Primary audience
- UIUC students interested in joining SIGQuantum
- students preparing for Fall Fest technical content
- beginners with some mathematical maturity
- students who want a serious introduction before participating more deeply

### Likely backgrounds
- CS students with Python experience
- Physics students with conceptual comfort but uneven programming background
- Math/engineering students with mixed exposure to linear algebra and computation

### Assumptions
The site may assume the learner is capable and motivated, but not yet fluent in quantum computing language.

The site must not assume prior mastery of:
- bra-ket notation
- linear algebra in Dirac form
- quantum circuit notation
- Qiskit workflow
- measurement formalism

---

## Tone and Voice

### Voice
- precise
- calm
- formal but readable
- encouraging without being casual
- academically credible
- never theatrical

### Writing style
- Use full sentences and explicit transitions
- Prefer correct terminology over slang
- Avoid hype language
- Avoid excessive friendliness markers
- Avoid “magic” framing
- Avoid oversimplified analogies that replace the real idea

### Good tone examples
- “In this section, we define the computational basis and explain how measurement outcomes are derived.”
- “The Hadamard gate changes the measurement basis and is therefore central to many introductory circuits.”
- “You do not need full prior exposure to linear algebra, but you should be comfortable with vectors and matrices.”

### Avoid
- “Let’s have fun with qubits”
- “Quantum is weird and crazy”
- “No math needed”
- “You’ll master this in minutes”
- “Just trust the intuition for now” without later clarification

---

## Design Direction

### Overall feel
The interface should feel like a modern academic handbook:
- restrained
- legible
- spacious
- carefully organized
- technically trustworthy

### Inspirations
- textbook and reference hierarchy
- technical documentation clarity
- well-designed course notes
- carefully structured concept guides

### Avoid
- oversized hero marketing language
- overly playful badges
- decorative motion as a focal point
- excessive gamification
- appified lesson progression that trivializes the material

---

## Information Architecture

The site should be organized around **technical onboarding**, not event promotion.

### Core sections
- Home
- Foundations
- Mathematical Language
- Quantum States
- Gates and Circuits
- Measurement
- Qiskit Preparation
- Study Paths
- Glossary
- References

### Current structure
```text
/                    Home
/intuition           Module 1  — Big-Picture Intuition
/math-language       Module 2  — Mathematical Language
/braket              Module 3  — Bra-Ket Notation
/phase               Module 4  — Phase & Measurement Angles
/qiskit              Module 5  — Qiskit
/gates               Module 6  — Single-Qubit Gates
/multiqubit          Module 7  — Multi-Qubit Systems
/entanglement        Module 8  — Entanglement
/circuits            Module 9  — Quantum Circuits
/measurement         Module 10 — Measurement & Basis
/algorithms          Module 11 — Core Algorithms
/labs                Module 12 — Qiskit Labs
/noise               Module 13 — Noise & Hardware
/usecases            Module 14 — Use Cases
/diagnostic          Optional placement diagnostic — soft/advisory, see below
/roadmap             Study Paths — by-background routes + full topic map
/projects/*          Machine Projects — hands-on Qiskit walkthroughs
/glossary            Technical terms and notation
/references          External readings, tools, and next steps
```

This structure may still expand, but it must remain centered on readiness for SIGQuantum participation. Module order and prerequisites are the source of truth in `lib/data/modules.js`, not this list — update both together if they ever diverge.

---

## Homepage Design

The homepage should introduce the site as a **technical preparation resource**.

### Homepage must communicate
- what this handbook is
- who it is for
- what background helps
- what topics are covered
- how to begin

### Homepage sections
1. **Title and purpose**  
   concise, serious heading with a short paragraph describing the handbook’s role

2. **Who this is for**  
   students joining SIGQuantum, students preparing for Fall Fest technical content, and students seeking a structured entry point

3. **What you will learn**  
   foundations, notation, states, gates, measurement, and Qiskit basics

4. **How to use this handbook**  
   read sequentially if new, jump by topic if reviewing, use glossary and references as needed

5. **Footer**  
   minimal closing (organization name only). Detailed starting-path guidance by background lives on `/roadmap` (Study Paths), reached via the hero’s secondary CTA — it is not duplicated on the homepage itself.

### Homepage must avoid
- event schedules
- promotional countdowns
- generic “join now” marketing copy
- heavy visual spectacle

### Homepage hero guidance
- H1 should be sober and specific
- subheading should explain purpose, not advertise
- supporting content should emphasize preparation, structure, and readiness
- CTAs should be directional, such as “Begin with the Diagnostic” or “Choose a Study Path” — the current homepage hero uses exactly this pair, primary CTA to `/diagnostic` and secondary to `/roadmap`

Good examples:
- “Technical Onboarding for SIGQuantum”
- “A structured introduction to the concepts, notation, and tools used in introductory quantum computing.”

Avoid:
- “The ultimate quantum experience”
- “Join the future”
- “Start your quantum journey today”

---

## Content Philosophy

This site should teach with discipline and structure.

### Content principles
1. Define terms explicitly
2. Introduce notation carefully
3. State what assumptions are being made
4. Use examples that are canonical, not gimmicky
5. Preserve correctness while simplifying
6. Show how concepts connect
7. Signal what is foundational versus optional
8. Keep strong interactive examples when they clarify the concept; if multiple interactives compete for attention, keep the primary one visible and move supplementary ones into foldable sections

### Teaching order
- concept
- definition
- notation
- example
- interpretation
- extension or caveat

### Do not rely on
- analogy alone
- interactivity alone
- visual flair alone

Visuals support the explanation; they do not replace it.

---

## Section Template

Each technical section should follow a consistent structure.

### Standard section order
1. Section title
2. Why this matters
3. Prerequisites
4. Core definitions
5. Main explanation
6. Worked example
7. Common confusion
8. Key takeaways
9. Next recommended section

### Optional blocks
- notation note
- mathematical aside
- proof sketch
- implementation note
- glossary links
- reference links
- foldable interactive aside for secondary calculators, state readers, or exploratory widgets

This structure should make the site feel systematic and dependable.

---

## Page Template

Each page should be readable like a handbook chapter, not a slide deck.

### Recommended page layout
1. Page title
2. One to two sentence overview
3. Prerequisites
4. Learning objectives
5. Main sections
6. Worked examples
7. Summary
8. Further reading / next steps

### Example support blocks
- **Definition**
- **Example**
- **Remark**
- **Common Mistake**
- **Notation**
- **Implementation Note**
- **Foldable Interactive Aside** for useful but non-essential exploratory widgets

These blocks should be visually distinct and reused consistently.

---

## Writing Rules

### Required
- Define symbols before using them heavily
- Explain notation in plain English
- Keep paragraphs reasonably short
- Use headings and subheadings generously
- State assumptions clearly
- Use mathematically standard language where appropriate

### Avoid
- walls of text
- vague summaries with no definitions
- motivational filler
- “quantum is strange” filler prose
- unexplained notation
- excessive simplification that creates misconceptions

### Preferred phrasing
- “We denote…”
- “In the computational basis…”
- “This follows because…”
- “The key distinction is…”
- “A common source of confusion is…”

---

## Technical Depth Guidelines

The site should be introductory, but not shallow.

### Include
- standard quantum terminology
- basic linear algebra language
- state vector interpretation
- unitary gate viewpoint
- basis dependence of measurement
- introductory circuit reasoning
- elementary Qiskit workflow

### Defer or place in optional sections
- full linear algebra proofs
- abstract Hilbert space formalism
- density matrices
- full hardware noise modeling
- advanced algorithm derivations
- research-level detail

### Philosophy
Be rigorous at the introductory level. Do not pretend advanced topics are simple if they are not.

---

## Mathematics Guidelines

Math should appear when it clarifies, not as decoration.

### Rules
- Every equation must be introduced in words
- Every symbol must be anchored to meaning
- Every displayed equation should have a short explanation
- Mathematical detail beyond the main flow should go in an aside or optional block

### Good math usage
- basis states
- normalization
- amplitudes and probabilities
- matrix representations of standard gates
- simple inner products
- tensor-product notation when needed

### Avoid
- dumping notation without interpretation
- long derivations in the main reading flow
- unexplained formalism

---

## Visual Guidelines

Visuals should support technical understanding.

### Prioritize
- basis state tables
- labeled state diagrams
- circuit diagrams
- matrix/operator layouts
- before/after gate visuals
- measurement basis comparisons
- simple probability bar displays
- clean notation panels

### Visual style
- restrained
- clearly labeled
- diagrammatic rather than decorative
- dark-theme compatible if dark theme is used
- printable in spirit, even if not literally printed

### Avoid
- ambient decorative graphics as focal content
- motion-heavy transitions
- abstract effects with no explanatory role

---

## Interactivity Guidelines

Interactivity is optional support, not the core identity of the site.

### Good uses of interaction
- toggling basis views
- stepping through a short circuit
- revealing notation explanations
- checking a worked example
- comparing measurement outcomes

### Bad uses
- gamified progression for its own sake
- flashy animations not tied to understanding
- mandatory interaction to access basic definitions

The site should remain useful even when read statically.

### Video Sourcing

Optional supplementary video is allowed under the same “optional support” rule:
- Prefer IBM/Qiskit’s official channels. Other reputable sources are acceptable — established institutions (e.g. MIT OpenCourseWare) and well-known science-education channels with a genuine track record (e.g. 3Blue1Brown, Veritasium) — never an unverified or low-subscriber channel picked up from a casual search result.
- Verify the source before using it. Search results and video titles are not proof of who uploaded something — confirm the actual channel (e.g. via YouTube’s oEmbed endpoint, `https://www.youtube.com/oembed?url=<video_url>&format=json`, which returns `author_name`/`author_url`) before treating any video as sourced from a given channel. Reject anything that doesn’t check out rather than assuming a plausible-looking title is correct.
- Place only inside a foldable aside, never in the main reading flow
- Always show a permanently visible text summary of the video’s content and its source — the summary is not itself inside the disclosure, so the page stays useful with the video collapsed and unwatched
- Never autoplay; defer loading the embed until the viewer’s first interaction with the disclosure, not merely on page load

---

## Navigation Guidelines

The site should support both sequential study and targeted review.

### Must support
- linear reading order for newcomers
- direct access to specific pages for review
- persistent sense of “where am I in the handbook?”
- next/previous section links
- glossary cross-links

### Navigation style
- calm
- predictable
- hierarchical
- low-friction

Avoid app-like navigation metaphors that make the site feel informal.

---

## Accessibility Requirements

- WCAG AA contrast minimum
- full keyboard navigation
- visible focus states
- semantic headings in order
- accessible labels on all controls
- diagrams with text alternatives or descriptive labels
- color is never the only carrier of meaning
- reduced-motion support
- readable body text sizing and line height

Accessibility should align with academic readability, not just compliance.

---

## Suggested Topic Sequence

### Part I — Foundations
- Classical vs quantum information
- The qubit as a state description
- Superposition
- Measurement as basis-dependent observation

### Part II — Mathematical Language
- Complex numbers
- Vectors and normalization
- Bra-ket notation
- Inner products

### Part III — States and Operators
- Basis states
- State vectors
- Single-qubit gates
- Matrix action on states

### Part IV — Circuits and Measurement
- Circuit notation
- Multi-step state evolution
- Measurement probabilities
- Basis change and Hadamard

### Part V — Qiskit Preparation
- What Qiskit is
- Creating a circuit
- Applying gates
- Measuring and reading counts
- Minimal workflow expectations

### Part VI — Paths Forward
- How to continue studying
- What background helps for projects
- Where to go next in SIGQuantum

---

## Study Paths

The handbook should provide guided preparation routes.

### Path A — CS student with Python background
Start with:
- foundations
- states
- gates
- measurement
- qiskit

### Path B — Physics student with stronger theory background
Start with:
- mathematical language
- states
- measurement
- circuits
- qiskit

### Path C — New to both notation and implementation
Start with:
- foundations
- mathematical language
- states
- gates
- measurement
- qiskit

These paths should feel advisory and practical.

---

## Diagnostic Placement & Concept Evidence

The handbook may offer a short, optional placement diagnostic so a student
who already knows some material isn’t re-taught it from zero. This is an
extension of the advisory philosophy above, not a departure from it.

### The soft-only rule
The diagnostic must never hard-lock content. Skipping it, or answering
poorly, always leaves every page fully readable exactly as it is today —
per Interactivity Guidelines, the site must remain useful when read
statically. The diagnostic *recommends and pre-collapses already-covered
material*; it never restricts navigation, and there are no lock icons,
streaks, or forced sequencing anywhere in this system.

### Terminology: “demonstrated,” never “mastered”
A short multiple-choice diagnostic cannot establish mastery of a topic —
it can only note evidence toward it. Use “demonstrated” / “the diagnostic
suggests you already know this,” never “mastered.” A concept needs at
least two independently answered, correctly answered diagnostic questions
before it is treated as demonstrated; fewer than that is insufficient
evidence and must render exactly as it would for a student who never took
the diagnostic — fully expanded, never collapsed.

### Study Paths stay background-based, not diagnostic-derived
The diagnostic measures topic-content knowledge (e.g. notation, states,
gates). `Study Paths` above are keyed by a student’s self-reported
background (CS/Python, physics/theory, neither). A content diagnostic
cannot reliably distinguish “a CS major who knows no quantum yet” from “a
complete beginner who knows no quantum yet,” even though those students
belong on different paths — so the diagnostic must not auto-select a
`Study Path`. Instead it produces its own ordered study sequence (weakest
diagnosed area first, each entry pointing to the next) covering only the
modules it actually tested; the student still chooses their `Study Path`
by background the way they do today.

### Concept-level collapsing
Where module pages tag a coherent chunk of content (a definition plus its
notation, example, and remark — not individual boxes in isolation) with
the concept(s) it teaches, and the diagnostic has shown evidence the
student already knows all of them, that chunk may render collapsed by
default with a one-line “you already know this — review it” affordance.
The section heading and its introductory sentence are never part of the
collapse — outline navigation and chapter scanability must survive
regardless of diagnostic state.

### Save and restore, no accounts
A completed diagnostic can be exported as a short, copyable code and
re-imported later — on another device, after clearing browser data, or
simply to hand to someone else with the same result. This stays consistent
with “least data, no accounts”: the code is generated and read entirely in
the browser, nothing is transmitted anywhere, and it carries no
personally identifying information — only the raw answer set.

---

## Glossary Requirements

The glossary is essential.

Each entry should include:
- term
- concise definition
- plain-language explanation
- notation if relevant
- links to sections where it is used

Core entries should include:
- qubit
- amplitude
- basis
- superposition
- measurement
- unitary
- observable
- bra
- ket
- inner product
- tensor product
- Hadamard gate
- Pauli operators
- circuit
- entanglement
- decoherence
- Qiskit

---

## References Page

The site should include a curated references page.

### Include
- official Qiskit documentation
- selected introductory readings
- reliable visual references
- suggested textbooks or notes
- mathematically useful refreshers

### Exclude
- low-quality link dumps
- excessive quantity
- sources with no clear onboarding value

The references page should help learners continue independently.

---

## Component Architecture

### Keep and adapt
| Component | Role |
|---|---|
| `Navbar` | Main site navigation |
| `ModuleLayout` | Rework into handbook page layout |
| `SummaryBox` | Rework into key takeaways or section summary |
| `MistakesBox` | Rework into common confusion / common mistake box |
| `CodeBlock` | Technical code examples |
| `MathBlock` | Equations and notation display |

### Build or refactor
| Component | Role |
|---|---|
| `DefinitionBox` | Highlight formal definitions |
| `NotationBox` | Explain symbols and conventions |
| `ExampleBox` | Worked example with interpretation |
| `RemarkBox` | Clarifying nuance or caveat |
| `PrereqList` | Explicit prerequisites for a page |
| `ConceptSection` | Diagnostic-evidence-aware content collapsing — see Diagnostic Placement & Concept Evidence |
| `VideoAside` | Optional sourced video embed, deferred load — see Video Sourcing |
| `DiagnosticQuestion` | Placement-quiz choice UI (records and moves on; no reveal/retry, unlike `Quiz`) |
| `ProjectLayout` | Machine Project page shell — step list, progress bar, predict/reflect pattern |

`PathCard`, `ReferenceList`, and `FigureFrame` were planned but never built as named; their roles are covered instead by `Roadmap.jsx`’s own path cards, the References page’s plain list, and `DiagramFrame` respectively. Update this table rather than reintroducing the unused names if that ever changes.

### Optional
| Component | Role |
|---|---|
| `GlossaryTooltip` | Hover or inline term explanation |
| `ExpandableAside` | Optional mathematical or implementation detail |
| `DiagramFrame` | Labeled technical diagram wrapper (the built equivalent of the originally-planned `FigureFrame`) |

`CircuitStepper` was planned but never built as a standalone component; `Quiz`/`LessonCard`/`StepNav`/`DeepDive` cover step-by-step circuit walkthroughs on the module pages that still use the older lesson-stepper pattern (see Build Plan — Phase 3).

When rewriting Phase 3 pages:
- Keep the best interactive example in the main reading flow if it materially improves understanding
- If a section accumulates too many interactives, keep only the most important one expanded
- Move supplementary interactives into `ExpandableAside` so the chapter remains readable without removing the tool entirely
- Apply the shared handbook body-text sizing rather than page-local body text classes
- Color-code a few core terms per page, especially in intros, objectives, and high-value definitions; this should aid scanning without becoming decorative noise

---

## Visual System

### Typography
Use typography that supports dense but readable technical content.
- strong H1/H2 hierarchy
- readable body size
- keep handbook body text on a shared scale across rewritten pages; avoid ad hoc mixes of `text-sm` and `text-base` for equivalent body copy
- good line spacing
- monospaced font for code
- clear math rendering

### Color
Use a restrained palette.
- neutral base
- one primary accent
- limited secondary accents for semantic callouts
- color-code a small, recurring set of key terms on each rewritten chapter page to improve scanning; use it sparingly and consistently
- avoid rainbow-like module identity styling unless it serves actual structure

### Surfaces
- clean cards or panels for definitions, examples, and notes
- subtle borders
- minimal shadow
- strong separation by spacing and hierarchy, not decoration

---

## Motion Guidelines

Motion should be minimal.

Allowed:
- subtle fades
- small collapsible transitions
- restrained feedback on navigation or reveal

Avoid:
- floating hero effects as identity
- ornamental motion
- motion competing with technical content

This project should feel stable and composed.

---

## Copy Examples

### Good headings
- “Computational Basis”
- “Why Measurement Depends on Basis”
- “Single-Qubit Gates as Linear Operators”
- “Minimal Qiskit Workflow”
- “What Background Do You Need?”

### Good labels
- “Prerequisites”
- “Definitions”
- “Worked Example”
- “Common Confusion”
- “Key Takeaways”
- “Further Reading”

### Avoid labels like
- “Quick win”
- “Try this fun thing”
- “Level up”
- “Challenge unlocked”

---

## What This Site Is Not

To preserve direction, this project must not drift into:
- a general SIGQuantum club website
- a Fall Fest logistics page
- a marketing funnel
- a casual course platform
- a research archive
- an advanced textbook replacement

It is specifically a **technical onboarding handbook**.

---

## Success Criteria

The project succeeds if a new student can use the site and say:
- “I understand what I need to know before joining.”
- “The material feels serious but approachable.”
- “The notation no longer feels mysterious.”
- “I know what to study next.”
- “This feels like a trustworthy technical guide.”

The project fails if the site feels:
- too casual
- too decorative
- too promotional
- too shallow
- too dense to enter

---

## Authority Model

- **CLAUDE.md** is the canonical source of truth for project direction and standards.
- **agent.md** is the current task handoff file for implementation.
- If implementation details conflict with this file, this file governs unless an intentional scoped exception is documented.
- All planning and review should align with the identity of the project as a technical onboarding handbook.

---

## Codex Workflow

### Rule
Codex should always be assigned one scoped task at a time through `agent.md`.

### Process
1. Read `CLAUDE.md`
2. Read current `agent.md`
3. Implement one scoped task only
4. Keep changes aligned with handbook identity
5. Avoid introducing playful, promotional, or event-logistics patterns
6. Preserve technical clarity and consistency

### Review standard
Every review should ask:
- Does this feel more academically credible?
- Is the information hierarchy clearer?
- Is the content technically useful for onboarding?
- Did the UI become more restrained and structured?
- Did anything drift toward marketing or casual edtech?

---

## Git Workflow

- Branch: `main`
- Commit format:
  - `feat: handbook — <description>`
  - `refactor: handbook — <description>`
  - `style: handbook — <description>`
- Never commit non-building code
- Update progress notes before commit
- Keep changes scoped and reviewable

---

## Build Plan — Phases

### Phase 1 — Identity shift ✓ (completed 2026-03-30)
- [x] Rewrite homepage copy around technical onboarding
- [x] Remove event-marketing framing
- [x] Replace casual course language with academic handbook language
- [x] Simplify visual style and reduce decorative emphasis

### Phase 2 — Structure ✓ (completed 2026-03-30)
- [x] Reorganize navigation around foundations, notation, states, gates, measurement, and Qiskit
- [x] Create reusable page template with prerequisites, objectives, definitions, examples, and summary
- [x] Add glossary and references architecture

### Phase 3 — Content
- [ ] Rewrite core pages for rigor and clarity
- [ ] Add notation support and explicit definitions
- [ ] Add canonical worked examples
- [x] Add study paths by background (`Roadmap.jsx` — three paths, full handbook map, machine-project status)

### Phase 3a — Diagnostic Placement Pilot ✓ (completed 2026-08-09)
Scope: Intuition, Bra-Ket, and Gates only. See “Diagnostic Placement &
Concept Evidence” above for the governing rules. Full slicing lives in
`agent.md`’s task history (TASK-020 through TASK-026). The concept graph
and diagnostic-collapsing system remain scoped to these 3 modules — do
not roll out further without reviewing this pilot first.
- [x] Concept graph + diagnostic question data model, with an explicit
      version-bump contract so edited questions can’t silently rescore old
      answers
- [x] `useDiagnostic` hook — raw-answer persistence, staleness detection,
      live-derived area scores and three-way concept evidence status
- [x] Diagnostic page/route + Roadmap entry point (link only, no data
      coupling into Study Paths)
- [x] Concept-level section collapsing wired into the 3 pilot pages
- [x] Gates.jsx gate-matrix content gap + Intuition.jsx analogy audit
- [x] Optional video aside, deferred-load, source-verified
- [x] Accessibility verification pass on all new interactive elements
- [x] Study-sequence chain (linked-list, weakest area first) + no-account
      save/restore code, added after user review of the initial results
      view (TASK-028)

**Follow-on work, broader than the pilot (does not reopen pilot scope):**
- [x] One video aside per module, all 14 — not just the 3 pilot modules.
      Video sourcing policy broadened from IBM-only to “IBM/Qiskit
      preferred, other verified-reputable sources acceptable” (TASK-029).
      This expanded video coverage only; the concept graph and diagnostic
      collapsing are still Intuition/Bra-Ket/Gates only.
- [x] New “Mathematical Language” module (module 2), fixing a real gap —
      `BraKet.jsx` referenced vector familiarity with nothing to link to
      (TASK-027)
- [x] Both remaining Machine Projects (Bell State Explorer, Algorithm
      Showdown) — full content (TASK-017/018)
- [x] Home hero primary CTA rewired to `/diagnostic` (TASK-030)

### Phase 4 — Polish
- [ ] Accessibility audit
- [ ] Mobile readability audit
- [ ] Math and code rendering polish
- [ ] Final consistency review for tone and hierarchy
