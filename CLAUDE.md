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

## Project Status (March 2026)

### Stack
React 18 + Vite + Tailwind CSS v3 + KaTeX + React Router v6 + Framer Motion + Prism.js.

### Current State
The identity shift is complete. The site is now branded as **SIGQuantum — Technical Onboarding Handbook** (previously “QuantumLeap”). The homepage has been rewritten around technical onboarding with five sections (title/purpose, audience, topics, usage guidance, footer). The navbar is rebranded, marketing elements and progress gamification are removed, and navigation includes Study Paths, Glossary, and References. Structural components are in place: DefinitionBox, NotationBox, ExampleBox, RemarkBox, and PrereqList are ready for use in module pages. A curated References page exists at `/references`. Orb animations and decorative motion have been removed from the homepage and CSS.

### What remains
- Rewrite module page content for rigor, clarity, and handbook tone (Phase 3)
- Add study paths by background (Phase 3)
- Accessibility, mobile, and rendering polish (Phase 4)
- Existing module pages still use the old casual/course tone and need content revision

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

### Recommended structure
```text
/                    Home
/foundations         Why quantum information is different from classical information
/math-language       Vectors, complex numbers, inner products, bra-ket notation
/states              Qubits, superposition, basis states, amplitudes
/gates               Single-qubit gates, multi-qubit structure, circuit notation
/measurement         Measurement postulate, basis dependence, probabilities
/qiskit              Basic Qiskit workflow and minimal programming preparation
/study-paths         Suggested preparation routes by background
/glossary            Technical terms and notation
/references          External readings, tools, and next steps
```

This structure may expand, but it must remain centered on readiness for SIGQuantum participation.

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

5. **Recommended starting paths**  
   for CS students, for physics students, and for complete beginners to quantum notation

### Homepage must avoid
- event schedules
- promotional countdowns
- generic “join now” marketing copy
- heavy visual spectacle

### Homepage hero guidance
- H1 should be sober and specific
- subheading should explain purpose, not advertise
- supporting content should emphasize preparation, structure, and readiness
- CTAs should be directional, such as “Begin with Foundations” or “Choose a Study Path”

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
| `PathCard` | Recommended study path cards |
| `ReferenceList` | Curated reading links |
| `FigureFrame` | Labeled technical diagrams |
| `PrereqList` | Explicit prerequisites for a page |

### Optional
| Component | Role |
|---|---|
| `CircuitStepper` | Small, focused circuit walkthrough |
| `GlossaryTooltip` | Hover or inline term explanation |
| `ExpandableAside` | Optional mathematical or implementation detail |

---

## Visual System

### Typography
Use typography that supports dense but readable technical content.
- strong H1/H2 hierarchy
- readable body size
- good line spacing
- monospaced font for code
- clear math rendering

### Color
Use a restrained palette.
- neutral base
- one primary accent
- limited secondary accents for semantic callouts
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
- [ ] Add study paths by background

### Phase 4 — Polish
- [ ] Accessibility audit
- [ ] Mobile readability audit
- [ ] Math and code rendering polish
- [ ] Final consistency review for tone and hierarchy

