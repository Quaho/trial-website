# CLAUDE.md — Quantum Learning Site Redesign

## Project Audit (March 2026)

### What exists
React 18 + Vite + Tailwind CSS v3 + KaTeX + React Router v6 + Framer Motion.
4 module pages (Intuition, BraKet, PhaseAngle, Qiskit) plus a Home page.
Custom components: Navbar, LearningPath, ModuleCard, ModuleLayout, SummaryBox,
MistakesBox, CodeBlock, MathBlock. Progress tracked in localStorage via useProgress hook.

### Strengths
- Pedagogically sound: intuition-first order, analogies, common mistakes sections
- Clean component architecture, accessible markup, responsive layout
- Solid interactive tools: StateExplorer (slider), PhaseExplorer (unit circle), BlochExplorer (2D Bloch sphere)
- KaTeX math rendering, copy-button code blocks, progress persistence
- Dark theme, consistent indigo/violet/amber color system

### Weaknesses — what must change
- **Walls of text**: every module is one long scrolling page; no bite-sized chunking
- **No checkpoints**: learner can scroll through without absorbing anything
- **No diagrams-first flow**: text paragraph precedes visuals instead of following them
- **No lesson progress within modules**: only module-level completion
- **Interactive tools are buried**: sandwiched between prose, not the centerpiece
- **CodeBlock has no syntax highlighting**: Python code is unreadable wall of white
- **Home page doesn't communicate "course journey"** strongly enough
- **Module cards are too vague**: descriptions don't show what you'll actually learn
- **No quiz/checkpoint component** exists at all

---

## Redesign Strategy

### Core mental model shift
Current: long essay with interactive widgets embedded
Target: short card-based lessons where **the visual is slide 1**, explanation is slide 2,
example is slide 3, and checkpoint is the "door" to the next lesson.

### Lesson unit structure (non-negotiable)
Every lesson = exactly this sequence:
1. **Concept card** — one key idea, headline + 1-sentence hook
2. **Visual** — diagram, animation, or interactive first (before any prose)
3. **Explanation** — max 3 short sentences or 3 bullet points
4. **Example** — one concrete worked example
5. **Checkpoint** — 1 multiple-choice question; must answer to proceed
6. **Deep dive** (optional, collapsible) — extra math or context for curious learners

### Teaching sequence (unchanged)
1. Ideas & Intuition (Module 1)
2. Bra-Ket Notation (Module 2)
3. Phase & Measurement Angle (Module 3)
4. Qiskit (Module 4)

---

## Content Simplification Rules
- Max 3 sentences per prose block (then stop or use bullets)
- No paragraph > 60 words
- Lead with the visual, follow with words
- One concept per section — no combining two ideas in one block
- Avoid jargon without immediate plain-language translation
- Analogies before equations, always
- Every equation must be followed by a "in plain English this means…" line

---

## Diagram Strategy
- **Bits vs Qubits**: animated toggle showing bit (0/1) vs qubit (superposition blob)
- **Superposition**: coin-flip animation (spinning → landing → collapsing)
- **Measurement collapse**: before/after diagram with arrow
- **Interference**: animated wave SVG (constructive vs destructive)
- **Bloch sphere**: keep existing 2D interactive, promote it to lesson centerpiece
- **Bra-ket states**: visual vector cards (column vs row vectors)
- **Inner product**: dot-product visual (two vectors → scalar)
- **Phase**: unit circle stays, add labeled tick marks for common angles
- **Quantum gates**: circuit diagram visuals (wire + gate box notation)
- **Bell state**: step-by-step circuit animation

All diagrams: SVG preferred, labeled, dark-theme friendly, mobile-safe.

---

## Interaction Strategy
- **Sliders**: keep existing (amplitude, phase angle, theta/phi for Bloch)
- **Multiple-choice checkpoints**: new Quiz component after every lesson
- **Reveal/collapse**: "See the math" collapsible for deep-dives
- **Animated diagrams**: use Framer Motion for entrance animations on key visuals
- **Step navigator**: within each module, prev/next lesson buttons with lesson dot indicator
- **Copy buttons**: keep on CodeBlock; add syntax highlighting

---

## Architecture Changes
- Add `src/components/Quiz.jsx` — multiple-choice checkpoint with feedback
- Add `src/components/LessonCard.jsx` — wrapper for one lesson (concept + visual + text + example + quiz)
- Add `src/components/DeepDive.jsx` — collapsible deep-dive section
- Add `src/components/StepNav.jsx` — within-module lesson navigator (dots + prev/next)
- Refactor `src/components/CodeBlock.jsx` — add Prism.js syntax highlighting
- Refactor all 4 module pages: break into arrays of lesson objects, rendered as step sequence
- Update `src/hooks/useProgress.js` — track lesson-level completion within modules

---

## Progress System
- **Module level**: existing (4 modules, mark complete button)
- **Lesson level**: NEW — track which lessons within a module are done
- Checkpoint pass = lesson complete
- All lessons complete = module complete (auto-trigger)
- Navbar shows module progress bar (existing)
- Within module: dot indicator shows which lesson you're on

---

## Progress Checklist

### Foundation
- [x] Audit existing site
- [x] Write CLAUDE.md
- [x] Build Quiz component (multiple-choice checkpoint)
- [x] Build DeepDive (collapsible deep dive) component
- [x] Build StepNav component (lesson dots + prev/next)
- [x] Update useProgress for lesson-level tracking

### Module Restructure
- [x] Milestone A: Home page redesign — lesson counts, per-module progress bars, topic pills
- [x] Milestone B: Intuition module — 5 bite-sized lessons with interactive visuals + checkpoints
- [x] Milestone C: BraKet module — 4 lessons with StateExplorer + checkpoints
- [x] Milestone D: PhaseAngle module — 5 lessons with PhaseExplorer + BlochExplorer + checkpoints
- [x] Milestone E: Qiskit module — 5 lessons with code + circuit visuals + checkpoints

### Polish
- [ ] Milestone F: CodeBlock syntax highlighting (Prism.js)
- [ ] Milestone G: Mobile audit + final polish
- [ ] Milestone H: Deploy to GitHub Pages

---

## Git Workflow
- Branch: main
- Commit format: `feat: milestone <X> — <description>`
- Deploy: `npm run deploy` (gh-pages)
- Never commit non-building code
- Update this checklist before each commit

---

## Tech Stack
- React 18 + Vite
- Tailwind CSS v3
- Lucide React (icons)
- KaTeX / react-katex (math)
- React Router v6
- Framer Motion (animations)
- Prism.js (syntax highlighting — to add)
- No backend — fully static

## Directory Structure
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProgressTracker.jsx
│   ├── ModuleCard.jsx
│   ├── ModuleLayout.jsx
│   ├── SummaryBox.jsx
│   ├── MistakesBox.jsx
│   ├── CodeBlock.jsx          ← add Prism.js
│   ├── MathBlock.jsx
│   ├── LearningPath.jsx
│   ├── Quiz.jsx               ← NEW
│   ├── DeepDive.jsx           ← NEW
│   └── StepNav.jsx            ← NEW
├── pages/
│   ├── Home.jsx               ← redesign
│   ├── Intuition.jsx          ← restructure into lessons
│   ├── BraKet.jsx             ← restructure into lessons
│   ├── PhaseAngle.jsx         ← restructure into lessons
│   └── Qiskit.jsx             ← restructure into lessons
└── hooks/
    └── useProgress.js         ← extend for lesson tracking
```
