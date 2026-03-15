# CLAUDE.md — Quantum Computing Education Website

## Project Goal
Build a polished, beginner-friendly educational website that teaches quantum computing
from first principles through Qiskit. Target: curious beginners with no prior QC knowledge.

## Audience
- Complete beginners to quantum computing
- May have some programming experience (Python helpful for Qiskit section)
- No physics degree required

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Math rendering**: KaTeX (via react-katex)
- **Routing**: React Router v6
- **Animations**: Framer Motion (light usage)
- **No backend** — fully static, deploy anywhere

## Module Plan

### Module 0 — Landing Page
- Hero section with tagline
- Visual learning path (4 steps)
- Progress overview widget
- "Start Learning" CTA

### Module 1 — Big-Picture Intuition
Topics: bits vs qubits, superposition, measurement, interference, why QC matters
- Animated bit-vs-qubit visual
- Superposition coin flip analogy
- Measurement collapse explanation
- Interference wave analogy
- Real-world QC applications

### Module 2 — Bra-Ket Notation
Topics: |0⟩, |1⟩, bras, kets, inner products, simple state examples
- Notation cheat sheet
- Interactive state builder
- Inner product examples
- Common mistakes section

### Module 3 — Phase & Measurement Angles
Topics: intuition → math → visual
- Bloch sphere intuition
- Phase angle explained visually
- Measurement angle and basis
- Interactive angle explorer (SVG)
- Common confusions

### Module 4 — Qiskit
Topics: what it is, simple circuits, basic gates, beginner examples
- Setup instructions
- First circuit walkthrough
- Gate reference (H, X, CNOT, measure)
- Bell state example
- Code snippets with syntax highlighting

## Coding Rules
- Functional components only, no class components
- Co-locate styles with components (Tailwind utilities)
- Reuse shared components from `src/components/`
- Module pages live in `src/pages/`
- Keep files under 300 lines; split if larger
- No inline style attributes — use Tailwind classes
- All math rendered with KaTeX, never plain text formulas
- Code examples use a consistent `<CodeBlock>` component

## UX Rules
- Mobile-first responsive design
- Smooth scroll navigation
- Progress stored in localStorage
- Each module has: intro, content sections, summary box, common mistakes
- Visual learning path always visible in header/nav
- Consistent color theme: indigo/violet for quantum, green for correct, amber for warnings
- Accessible: proper aria labels, sufficient color contrast

## Directory Structure
```
trial-website/
├── CLAUDE.md
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProgressTracker.jsx
│   │   ├── ModuleCard.jsx
│   │   ├── SummaryBox.jsx
│   │   ├── MistakesBox.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── MathBlock.jsx
│   │   └── LearningPath.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Intuition.jsx
│   │   ├── BraKet.jsx
│   │   ├── PhaseAngle.jsx
│   │   └── Qiskit.jsx
│   └── hooks/
│       └── useProgress.js
```

## Git Workflow
- Work in small milestones
- Update CLAUDE.md checklist before each commit
- Commit message format: `feat: <milestone description>`
- Push to origin/main after each commit
- Never commit broken/non-building code

## Progress Checklist

### Setup
- [x] Inspect repo
- [x] Create CLAUDE.md
- [x] Initialize Vite + React project
- [x] Install dependencies (Tailwind, React Router, KaTeX, Lucide, Framer Motion)
- [x] Configure Tailwind
- [x] Set up base layout and routing

### Milestone 1 — Shell & Navigation
- [x] App shell with Navbar
- [x] React Router routes
- [x] useProgress hook
- [x] Landing page skeleton

### Milestone 2 — Landing Page
- [x] Hero section
- [x] Visual learning path component
- [x] Module cards
- [x] Progress overview

### Milestone 3 — Module 1: Intuition
- [x] Bits vs Qubits section
- [x] Superposition explanation
- [x] Measurement & interference
- [x] Why QC matters
- [x] Summary + mistakes

### Milestone 4 — Module 2: Bra-Ket
- [x] Notation intro
- [x] Ket/bra/inner product sections
- [x] Notation cheat sheet
- [x] Interactive state examples
- [x] Summary + mistakes

### Milestone 5 — Module 3: Phase & Angles
- [x] Intuition-first explanation
- [x] Phase angle math + visuals
- [x] Measurement angle and basis
- [x] Interactive SVG angle explorer
- [x] Summary + mistakes

### Milestone 6 — Module 4: Qiskit
- [x] What is Qiskit section
- [x] Setup guide
- [x] First circuit walkthrough
- [x] Gate reference
- [x] Bell state example
- [x] Summary

### Milestone 7 — Polish & Push
- [x] Mobile responsiveness audit
- [x] Accessibility pass
- [x] Progress tracker wired end-to-end
- [x] Final visual polish
- [x] Final commit + push
