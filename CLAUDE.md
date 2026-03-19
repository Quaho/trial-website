# CLAUDE.md — QuantumLeap Learning Site

## Project Status (March 2026)

### Stack
React 18 + Vite + Tailwind CSS v3 + KaTeX + React Router v6 + Framer Motion + Prism.js.
13 modules + Home + Glossary + Roadmap + Mini Challenges pages.
Components: Navbar, ModuleLayout, LessonCard, DiagramFrame, Quiz, DeepDive, StepNav,
SummaryBox, MistakesBox, CodeBlock, MathBlock, LearningPath, ModuleCard.
Progress tracked in localStorage via useProgress hook (module + lesson level).

### Completed
- All 4 original modules restructured into bite-sized lessons (LessonCard sequence)
- Quiz checkpoints with pass/retry and session persistence
- StepNav with dot indicators, connecting lines, and locked-lesson logic
- DeepDive collapsible sections
- CodeBlock with Prism.js syntax highlighting (Python + Bash)
- Home page with lesson counts, per-module progress bars, topic pills
- useProgress: module + lesson level tracking
- Full visual redesign: design system, Inter font, orb animations, refined components

---

## Product Vision

**"The best first friendly visual path into quantum computing."**

A guided, visual-first course that makes quantum computing approachable for curious beginners
and takes them all the way to understanding core algorithms and real hardware constraints.
Every screen answers exactly one question: *what is the one idea I'm learning right now?*

Target feel: welcoming, premium, interactive, structured. Never a wall of text. Never cramped.
Every lesson reduces cognitive load. Every interaction is obvious on first use.

**Teach like 3Blue1Brown + Khan Academy + Brilliant. Not like a textbook.**
- Diagram first, notation second
- Analogy first, equation second
- Progressive reveal, not information dump
- Winnable in 3–7 minutes per lesson

---

## Design System

### Typography

- **Font**: Inter (Google Fonts) — loaded in `index.html`
- **Display** (hero H1): `text-5xl sm:text-6xl`, `font-extrabold`, `tracking-tight`
- **Heading** (section H2): `text-2xl sm:text-3xl`, `font-bold`, `tracking-tight`
- **Subhead** (H3 / lesson hook): `text-xl sm:text-2xl`, `font-bold`
- **Body**: `text-base` (16px), `text-slate-300`, `leading-relaxed`
- **Caption / label**: `text-xs`, `text-slate-500`, `uppercase`, `tracking-widest`
- **Code**: JetBrains Mono / Fira Code, `text-sm`

### Color Palette

Base surface:
- Background: `slate-950` (#020617)
- Surface: `slate-900` (#0f172a)
- Surface raised: `slate-800` (#1e293b)
- Border default: `slate-800`
- Border subtle: `slate-700/50`

Text:
- Primary: `white`
- Secondary: `slate-300`
- Muted: `slate-400`
- Disabled: `slate-500`

Accent / Interactive:
- Primary CTA: `indigo-600` hover `indigo-500`
- Focus ring: `indigo-400`

Module accent colors (used consistently per module):
| Module                  | Accent     | Use                                    |
|-------------------------|------------|----------------------------------------|
| 1 – Intuition           | `indigo`   | hero gradient, pills, numbered bullets |
| 2 – BraKet              | `violet`   | hero gradient, pills, numbered bullets |
| 3 – Phase               | `purple`   | hero gradient, pills, numbered bullets |
| 4 – Qiskit              | `fuchsia`  | hero gradient, pills, numbered bullets |
| 5 – Single-Qubit Gates  | `sky`      | hero gradient, pills, numbered bullets |
| 6 – Multi-Qubit Systems | `cyan`     | hero gradient, pills, numbered bullets |
| 7 – Entanglement        | `teal`     | hero gradient, pills, numbered bullets |
| 8 – Quantum Circuits    | `emerald`  | hero gradient, pills, numbered bullets |
| 9 – Measurement & Basis | `amber`    | hero gradient, pills, numbered bullets |
| 10 – Core Algorithms    | `orange`   | hero gradient, pills, numbered bullets |
| 11 – Qiskit Labs        | `rose`     | hero gradient, pills, numbered bullets |
| 12 – Noise & Hardware   | `slate`    | hero gradient, pills, numbered bullets |
| 13 – Use Cases          | `lime`     | hero gradient, pills, numbered bullets |

State colors:
- Success: `green-400 / green-500 / green-900/30`
- Error / wrong: `red-400 / red-500/60 / red-950/20`
- Warning / locked: `amber-500`
- Info / deep dive: `violet-400 / violet-800/30`

### Spacing Rhythm

- Section padding: `py-16 sm:py-24`
- Module hero: `py-12 sm:py-16`
- Card padding: `p-5 sm:p-6`
- Lesson gap (between sections): `gap-7`
- Card gap (grid/list): `gap-4`
- List item gap: `gap-2.5`
- Max content width: `max-w-3xl`
- Layout gutter: `px-4 sm:px-6`

### Radius & Shadows

- Cards: `rounded-2xl`
- Buttons: `rounded-xl`
- Badges / pills: `rounded-full`
- Code blocks: `rounded-xl`
- Diagrams: `rounded-xl`
- Card hover shadow: `shadow-lg shadow-black/20`
- No neumorphic or skeuomorphic effects

### Motion Guidelines

Use Framer Motion. All motion must improve understanding or confirm an action — never decorative.

| Context                     | Animation                               | Duration |
|-----------------------------|-----------------------------------------|----------|
| Page / lesson entrance      | `opacity 0→1` + `y 12→0`              | 200ms    |
| Mobile nav open             | `height 0→auto` slide down             | 200ms    |
| Quiz wrong answer           | `x` shake `[0,-8,8,-6,6,-3,3,0]`      | 400ms    |
| Quiz correct container      | `scale 1→1.005→1` + green glow pulse  | 300ms    |
| DeepDive expand/collapse    | `height 0↔auto` + `opacity 0↔1`       | 250ms    |
| Dot nav transition          | color + width transitions               | 200ms    |
| Button hover                | `scale 1.004` max                       | 150ms    |
| Button press                | `scale 0.996`                           | 100ms    |
| Hero orbs                   | slow CSS `@keyframes` drift/pulse       | 8–12s    |
| Circuit stepper             | gate slide-in `x -20→0` + opacity      | 250ms    |
| Module celebration          | confetti-style scale + opacity burst    | 600ms    |

**Respect `prefers-reduced-motion`** — wrap all decorative motion in a check.
Never animate > 1 element simultaneously unless they are part of the same semantic unit.

### Interaction States

Every interactive element must have:
- **Hover**: subtle color shift or border brightening (`150ms transition`)
- **Focus**: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- **Active/Press**: `active:scale-[0.99]`
- **Disabled**: `opacity-40 cursor-not-allowed`
- **Correct answer**: green border + bg + checkmark icon
- **Wrong answer**: red border + bg + X icon + shake
- **Completed lesson**: compact green pill with checkmark

---

## Component Architecture

### Existing — keep and extend
| Component         | Role                                        |
|-------------------|---------------------------------------------|
| `Navbar`          | Site navigation + progress pill             |
| `ModuleLayout`    | Module page wrapper + hero + sticky header  |
| `LessonCard`      | One lesson (concept→visual→bullets→quiz)    |
| `ModuleCard`      | Home page module card with progress         |
| `DiagramFrame`    | Accessible figure wrapper for visuals       |
| `Quiz`            | Multiple-choice checkpoint                  |
| `StepNav`         | Dot nav + prev/next within module           |
| `DeepDive`        | Collapsible deep-dive section               |
| `CodeBlock`       | Syntax-highlighted code (Prism.js)          |
| `MathBlock`       | KaTeX math display (MathInline + MathDisplay)|
| `SummaryBox`      | Module summary card with numbered bullets   |
| `MistakesBox`     | Common misconceptions amber warning box     |
| `LearningPath`    | 4-module progress flow (to be extended)     |
| `ScrollToTop`     | Scroll effect on route change               |

### New components to build
| Component         | Role                                          |
|-------------------|-----------------------------------------------|
| `CircuitStepper`  | Step through gates one at a time, show state  |
| `GateAnimator`    | Visualize how a gate transforms a qubit state |
| `GlossaryTooltip` | Hover tooltip linking to glossary terms       |
| `CourseRoadmap`   | Visual dependency graph of all modules        |
| `MiniChallenge`   | Short timed concept-check card                |

### Global CSS (`index.css`)
- Inter font import
- Orb keyframe animations (float, float-slow, float-alt)
- `.prose-quantum`, `.gradient-text`, `.lesson-label`, `.section-label`
- `.concept-pill`, `.module-dot-line`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- `.card`, `.card-hover`, `.card-interactive`
- Prism.js token colors
- `.katex` and `.katex-display` overrides
- `.skip-link` accessibility
- `prefers-reduced-motion` media query guards

---

## Information Architecture

```
/ (Home)
  ├── Hero — value prop + progress CTA + orb background
  ├── Course at a glance — 5-step lesson structure
  ├── Module list — 13 cards, ordered, locked/unlocked, prerequisite labels
  └── "Built for beginners" — 3 pillars

/roadmap
  ├── Visual dependency graph of all 13 modules
  ├── Locked/unlocked states
  ├── Jump-to-module links
  └── Estimated time per module

/glossary
  ├── Alphabetical term list
  ├── One-sentence definition + analogy
  └── Links back to lessons where term appears

/challenges
  ├── Circuit reading drills
  ├── State prediction drills
  └── Misconception correction cards

/intuition (Module 1 — indigo)
  5 lessons: Bits vs Qubits, Superposition, Measurement, Interference, Why QC?

/braket (Module 2 — violet)
  4 lessons: Bra-Ket Notation, Ket States, Bra States, Inner Products

/phase (Module 3 — purple)
  5 lessons: Phase, Unit Circle, Bloch Sphere, Measurement Bases, Algorithms

/qiskit (Module 4 — fuchsia)
  5 lessons: What is Qiskit?, First Circuit, Essential Gates, Bell State, Next Steps

/gates (Module 5 — sky)
  6 lessons: Gates as Actions, X Gate, Z Gate, Hadamard, S and T Gates, Visual Summary

/multiqubit (Module 6 — cyan)
  5 lessons: One to Two Qubits, Basis States, Tensor Product Intuition,
             Separable States, Reading Amplitudes

/entanglement (Module 7 — teal)
  5 lessons: Correlation vs Entanglement, Bell State Creation, Why It Can't Factor,
             Measurement Effects, Common Misconceptions

/circuits (Module 8 — emerald)
  5 lessons: How to Read a Circuit, Wires/Gates/Measurement, State Evolution,
             Bell State Circuit, Circuit to Code

/measurement (Module 9 — amber)
  5 lessons: Computational Basis, Measuring in Different Basis, Why Basis Matters,
             Probability from Amplitudes, Basis-Change via Hadamard

/algorithms (Module 10 — orange)
  5 lessons: Deutsch-Jozsa, Grover's Search, Phase Kickback, Why Shor Matters,
             Quantum Advantage

/labs (Module 11 — rose)
  5 lessons: Create a Circuit, Apply Gates and Measure, Simulate and Read Counts,
             Bell Pair in Qiskit, Mini Experiments

/noise (Module 12 — slate)
  5 lessons: Ideal vs Real Hardware, Noise and Decoherence, No-Cloning Theorem,
             Repetition-Code Intuition, Why Error Correction Is Hard

/usecases (Module 13 — lime)
  5 lessons: Chemistry and Materials, Optimization, Cryptography,
             ML: Promise vs Reality, Current Limitations
```

---

## Lesson Structure (Non-Negotiable)

Every lesson must follow this exact order:
1. **Lesson N of M label** — small pill
2. **Hook headline** — H2, large bold, ≤ 10 words, verb-led or question-led
3. **Hook subtitle** — 1 sentence, slate-400
4. **Visual** — SVG diagram, interactive, or animation (DiagramFrame wrapper)
5. **Key ideas** — numbered list, ≤ 3 bullets, ≤ 20 words each (styled box)
6. **Worked example** — labeled box with icon, concrete and specific
7. **Deep Dive** — optional, behind DeepDive collapse (math, derivations)
8. **Checkpoint** — Quiz component, must pass to advance

No wall-of-text. No paragraph > 60 words. No symbols without plain-English explanation.

---

## Homepage Design

### Hero section
- Layered background: 3 colored orbs (indigo + violet + fuchsia) with blur-3xl, slow CSS drift
- Badge: "Free · Visual · Beginner-Friendly" with Atom icon
- H1: "Learn Quantum Computing" — gradient on "Quantum Computing"
- Sub: "13 modules · 63 lessons · interactive diagrams · no physics degree required"
- Progress bar (if started): max-w-xs centered, shows lessons done
- CTA: "Start Learning →" or "Continue — Module Name →" if in progress

### Module cards (updated for 13 modules)
- Left border accent (4px, module color)
- Module number watermark top-right, very low opacity
- Icon + "Module N" label + estimated time badge
- Bold module title + 1-line description
- Topic pills (completed → colored, incomplete → slate)
- Inline progress bar (slim)
- CTA: "Start →" / "Continue →" / "Review →"
- Locked state: 50% opacity, lock icon, prerequisite label, no hover

---

## Module Page Design

### Hero
Per-module gradient background using module accent color.

### Sticky mini-header
- Module title (truncated)
- "Lesson 2 of 5" counter
- Dot indicators (current = colored pill shape)
- Progress percentage

### Module footer
- "Mark as Complete" (only after all lessons passed)
- → Next module link
- Module celebration animation on first completion

---

## Navbar Design

- Height: 56px (`h-14`)
- Background: `bg-slate-950/90 backdrop-blur`
- Logo: Atom icon + "QuantumLeap"
- Desktop links: pill shape, active = `bg-indigo-600 text-white`
- Progress indicator: thin bar + "N/63" text
- Mobile: hamburger → animated slide-down (AnimatePresence)
- With 13 modules: group into "Foundations / Circuits / Advanced" dropdown sections

---

## Module Color Map

```js
const MODULE_STYLES = {
  intuition:   { gradient: 'from-indigo-950/70',  accent: 'text-indigo-400',  border: 'border-indigo-800/40',  bg: 'bg-indigo-900/20',  bullet: 'bg-indigo-900/60 border-indigo-700/50 text-indigo-400',  num: '01' },
  braket:      { gradient: 'from-violet-950/70',  accent: 'text-violet-400',  border: 'border-violet-800/40',  bg: 'bg-violet-900/20',  bullet: 'bg-violet-900/60 border-violet-700/50 text-violet-400',  num: '02' },
  phase:       { gradient: 'from-purple-950/70',  accent: 'text-purple-400',  border: 'border-purple-800/40',  bg: 'bg-purple-900/20',  bullet: 'bg-purple-900/60 border-purple-700/50 text-purple-400',  num: '03' },
  qiskit:      { gradient: 'from-fuchsia-950/70', accent: 'text-fuchsia-400', border: 'border-fuchsia-800/40', bg: 'bg-fuchsia-900/20', bullet: 'bg-fuchsia-900/60 border-fuchsia-700/50 text-fuchsia-400', num: '04' },
  gates:       { gradient: 'from-sky-950/70',     accent: 'text-sky-400',     border: 'border-sky-800/40',     bg: 'bg-sky-900/20',     bullet: 'bg-sky-900/60 border-sky-700/50 text-sky-400',           num: '05' },
  multiqubit:  { gradient: 'from-cyan-950/70',    accent: 'text-cyan-400',    border: 'border-cyan-800/40',    bg: 'bg-cyan-900/20',    bullet: 'bg-cyan-900/60 border-cyan-700/50 text-cyan-400',         num: '06' },
  entanglement:{ gradient: 'from-teal-950/70',    accent: 'text-teal-400',    border: 'border-teal-800/40',    bg: 'bg-teal-900/20',    bullet: 'bg-teal-900/60 border-teal-700/50 text-teal-400',         num: '07' },
  circuits:    { gradient: 'from-emerald-950/70', accent: 'text-emerald-400', border: 'border-emerald-800/40', bg: 'bg-emerald-900/20', bullet: 'bg-emerald-900/60 border-emerald-700/50 text-emerald-400', num: '08' },
  measurement: { gradient: 'from-amber-950/70',   accent: 'text-amber-400',   border: 'border-amber-800/40',   bg: 'bg-amber-900/20',   bullet: 'bg-amber-900/60 border-amber-700/50 text-amber-400',     num: '09' },
  algorithms:  { gradient: 'from-orange-950/70',  accent: 'text-orange-400',  border: 'border-orange-800/40',  bg: 'bg-orange-900/20',  bullet: 'bg-orange-900/60 border-orange-700/50 text-orange-400',   num: '10' },
  labs:        { gradient: 'from-rose-950/70',    accent: 'text-rose-400',    border: 'border-rose-800/40',    bg: 'bg-rose-900/20',    bullet: 'bg-rose-900/60 border-rose-700/50 text-rose-400',         num: '11' },
  noise:       { gradient: 'from-slate-800/70',   accent: 'text-slate-400',   border: 'border-slate-700/40',   bg: 'bg-slate-800/20',   bullet: 'bg-slate-800/60 border-slate-600/50 text-slate-400',      num: '12' },
  usecases:    { gradient: 'from-lime-950/70',    accent: 'text-lime-400',    border: 'border-lime-800/40',    bg: 'bg-lime-900/20',    bullet: 'bg-lime-900/60 border-lime-700/50 text-lime-400',         num: '13' },
}
```

---

## Apple HIG-Inspired Patterns

1. **Progressive disclosure** — Deep math always behind DeepDive
2. **One focused task** — Each lesson has one learning goal
3. **Feedback immediacy** — Every tap gets visual feedback (< 150ms)
4. **Spatial consistency** — Same component always in same position
5. **Accessible affordances** — Every button has aria-label, focus rings visible
6. **Clarity over decoration** — Gradients and motion enhance understanding
7. **Restrained palette** — Only 2–3 colors per screen
8. **Breathing room** — Generous padding, never cramped
9. **Confirmatory feedback** — Success state obvious (green, icon, message)
10. **Forgiving UX** — Wrong answer = retry immediately, no penalty

---

## Accessibility Requirements

- WCAG AA contrast for all text on dark backgrounds
- All interactive elements keyboard navigable (Tab + Enter/Space)
- Focus rings visible at all times (`:focus-visible`)
- `aria-label` on all icon-only buttons
- `aria-expanded` on DeepDive toggle
- `role="navigation"` + `aria-label` on StepNav dots
- `role="img"` + `aria-label` on DiagramFrame
- `alt` or `aria-label` on all SVG diagrams
- No information conveyed by color alone (icons + text always accompany color)
- Mobile: tap targets ≥ 44px
- `prefers-reduced-motion`: disable all decorative animation
- Skip-to-content link (in index.css)
- Screen reader: lesson progress announced via `aria-live="polite"` when advancing

---

## Diagram Guidelines

All diagrams must be:
- SVG preferred (scales cleanly, dark-theme friendly)
- Labeled with a header bar (via DiagramFrame)
- Captioned below (via DiagramFrame description prop)
- Mobile-safe: fluid width, no fixed pixel sizes for containers
- Colorblind-safe: don't rely solely on red/green; use icons + labels
- Accessible: `role="img"` + `aria-label` on figure wrapper

---

## Copy Guidelines

### Voice
- Friendly, intelligent, calm, precise
- Analogies before equations
- Never condescending; always encouraging

### Buttons
- "Start Learning" / "Continue →" / "Check answer" / "Retry" / "See the math" / "Mark as Complete"

### Feedback copy
- Correct: "Exactly right. Continue below."
- Wrong: "Not quite — try again."
- Locked: "Finish lesson N first."
- Complete (lesson): "Checkpoint complete."
- Complete (module): "Module complete."
- Course done: "You've finished the course."

### Lesson labels
- "Lesson 1 of 5" / "Key ideas" / "Worked example" / "Deep Dive — optional" / "Checkpoint"

---

## New Module Details

### Module 5 — Single-Qubit Gates (`/gates` — sky)
6 lessons: Gates as Actions · X Gate (bit flip) · Z Gate (phase flip) · Hadamard (basis changer) · S and T Gates · Visual Summary
New component needed: `GateAnimator` — shows before/after qubit state on Bloch sphere

### Module 6 — Multi-Qubit Systems (`/multiqubit` — cyan)
5 lessons: One Qubit to Two · Basis States |00⟩ etc. · Tensor Product Intuition · Separable States · Reading Amplitudes
Visual: 2×2 amplitude grid, basis state table

### Module 7 — Entanglement (`/entanglement` — teal)
5 lessons: Correlation vs Entanglement · Bell State Creation · Why It Can't Factor · Measurement Effects · Misconceptions
Visual: paired-outcome visualizer, Bell circuit animation

### Module 8 — Quantum Circuits (`/circuits` — emerald)
5 lessons: Reading a Circuit · Wires/Gates/Measurement · State Evolution · Bell State Circuit · Circuit to Code
New component needed: `CircuitStepper` — step through a circuit gate by gate with state shown

### Module 9 — Measurement & Basis (`/measurement` — amber)
5 lessons: Computational Basis · Measuring in Different Basis · Why Basis Matters · Probability from Amplitudes · Basis-Change via H
Visual: live probability bars, toggle between Z-basis and X-basis

### Module 10 — Core Algorithms (`/algorithms` — orange)
5 lessons: Deutsch-Jozsa · Grover's Search · Phase Kickback · Why Shor Matters · Quantum Advantage
Visual: oracle black-box, amplitude amplification animation

### Module 11 — Qiskit Labs (`/labs` — rose)
5 lessons: Create a Circuit · Apply Gates and Measure · Simulate and Read Counts · Bell Pair · Mini Experiments
Features: copy-to-clipboard code blocks, "predict before reveal" checkpoints

### Module 12 — Noise & Hardware (`/noise` — slate)
5 lessons: Ideal vs Real Hardware · Noise and Decoherence · No-Cloning Theorem · Repetition-Code Intuition · Why Error Correction Is Hard
Visual: noise slider, decoherence animation, repetition-code diagram

### Module 13 — Use Cases (`/usecases` — lime)
5 lessons: Chemistry & Materials · Optimization · Cryptography · ML: Promise vs Reality · Current Limitations
Visual: "good fit / bad fit" sorting cards, realism meter

---

## Extra Pages

### `/roadmap` — Course Roadmap
- Visual dependency graph of all 13 modules
- Locked/unlocked per progress
- Jump-to-module CTAs
- Estimated time per module (~30 min each)
- Track labels: Foundations / Circuits / Advanced

### `/glossary` — Glossary
Terms: amplitude, phase, basis, superposition, entanglement, interference, unitary, decoherence,
oracle, tensor product, qubit, gate, circuit, measurement, Bell state, Hadamard, error correction
Each entry: one-sentence definition + plain-English analogy + links to relevant lessons

### `/challenges` — Mini Challenges
- Circuit reading drills
- State prediction drills
- Misconception correction cards (true/false with explanation)
- No progress gating — always accessible

---

## Codex Workflow

### Authority Model
- **CLAUDE.md** is the canonical source of truth for the project.
- **agent.md** is the active task handoff file for Codex.
- Codex must be given exactly one scoped task through `agent.md`.
- When planning or reviewing, always align with CLAUDE.md first.
- If `agent.md` conflicts with CLAUDE.md, Claude must rewrite `agent.md` to match CLAUDE.md unless the task is an intentional narrow exception.
- Claude owns creating and updating `agent.md` each loop.
- `agent.md` is temporary and task-specific — not a long-term standards file.

### Process
When generating a task prompt/brief for Codex, always save the full prompt to `agent.md` in the project root. This serves as the active handoff record and allows Codex to read its instructions directly from the file.

---

## Git Workflow
- Branch: main
- Commit format: `feat: milestone <X> — <description>` or `feat: module N — <title>`
- Deploy: `npm run deploy`
- Never commit non-building code
- Update progress checklist before each commit
- Check in with user after each milestone

---

## Build Plan — Milestones

### Foundation (done)
- [x] Audit + CLAUDE.md
- [x] Quiz, DeepDive, StepNav, useProgress
- [x] Modules 1–4 with lessons and checkpoints
- [x] Visual redesign: design system, Home, Navbar, components

### Milestone 1 — Polish existing modules
- [x] Audit all 4 modules: fix any UX rough edges, diagram gaps, quiz quality
- [x] Ensure StepNav, DeepDive, Quiz are rock-solid and reusable
- [x] Create `/src/data/modules.js` — single source of truth for all 13 modules + style maps
- [x] Update Navbar — grouped dropdown nav (Foundations/Circuits/Advanced), 13 modules, lesson progress
- [x] Update useProgress — imports MODULES from data, exposes totalLessons + getTotalLessonsDone
- [x] Update Home.jsx — imports from data file, prereq-based locking logic
- [x] Update ModuleLayout.jsx — imports MODULE_LAYOUT_STYLES from data file
- [x] Add routes for all 13 modules + extras (ComingSoon stubs for new ones)
- [x] Create ComingSoon.jsx placeholder page for unbuilt modules

### Milestone 2 — Module 5 + Module 6
- [x] Module 5: Single-Qubit Gates (`/gates`, sky) — 6 lessons + GateAnimator component
- [x] Module 6: Multi-Qubit Systems (`/multiqubit`, cyan) — 5 lessons + amplitude grid visual

### Milestone 3 — Module 7 + Module 8
- [x] Module 7: Entanglement (`/entanglement`, teal) — 5 lessons + paired-outcome visual
- [x] Module 8: Quantum Circuits (`/circuits`, emerald) — 5 lessons + CircuitStepper component

### Milestone 4 — Module 9 + Module 10
- [x] Module 9: Measurement & Basis (`/measurement`, amber) — 5 lessons + live probability bars
- [x] Module 10: Core Algorithms (`/algorithms`, orange) — 5 lessons + amplitude amplification visual

### Milestone 5 — Module 11 + 12 + 13
- [x] Module 11: Qiskit Labs (`/labs`, rose) — 5 lessons + predict-before-reveal checkpoints
- [x] Module 12: Noise & Hardware (`/noise`, slate) — 5 lessons + noise slider visual
- [x] Module 13: Use Cases (`/usecases`, lime) — 5 lessons + realism meter visual

### Milestone 6 — Extra Pages
- [x] `/roadmap` — visual course map with dependency graph
- [x] `/glossary` — full term list with definitions + lesson links
- [x] `/challenges` — mini challenge cards (circuit drills, state predictions)

### Milestone 7 — Mobile, Accessibility, Deploy
- [x] Test all pages at 375px, 390px, 430px
- [x] Fix overflow, cramped tap targets, truncation
- [x] `prefers-reduced-motion` guards on all animations (MotionConfig reducedMotion="user")
- [x] WCAG AA contrast audit
- [x] Keyboard navigation end-to-end
- [x] `npm run deploy` to GitHub Pages
