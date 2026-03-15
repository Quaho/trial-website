# CLAUDE.md — Quantum Learning Site

## Project Status (March 2026)

### Stack
React 18 + Vite + Tailwind CSS v3 + KaTeX + React Router v6 + Framer Motion + Prism.js.
4 module pages (Intuition, BraKet, PhaseAngle, Qiskit) + Home.
Components: Navbar, ModuleLayout, LessonCard, DiagramFrame, Quiz, DeepDive, StepNav,
SummaryBox, MistakesBox, CodeBlock, MathBlock, LearningPath.
Progress tracked in localStorage via useProgress hook (module + lesson level).

### Completed
- All 4 modules restructured into bite-sized lessons (LessonCard sequence)
- Quiz checkpoints with pass/retry and session persistence
- StepNav with dot indicators and locked-lesson logic
- DeepDive collapsible sections
- CodeBlock with Prism.js syntax highlighting (Python + Bash)
- Home page with lesson counts, per-module progress bars, topic pills
- useProgress: module + lesson level tracking

---

## Product Vision

**"Khan Academy meets Apple-like polish for quantum computing."**

A guided, visual-first course that makes quantum computing approachable for curious beginners.
Every screen answers exactly one question: *what is the one idea I'm learning right now?*

Target feel: welcoming, premium, interactive, structured. Never a wall of text. Never cramped.
Every lesson reduces cognitive load. Every interaction is obvious on first use.

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
| Module        | Accent       | Use                                          |
|---------------|--------------|----------------------------------------------|
| 1 – Intuition | `indigo`     | hero gradient, pills, numbered bullets       |
| 2 – BraKet    | `violet`     | hero gradient, pills, numbered bullets       |
| 3 – Phase     | `purple`     | hero gradient, pills, numbered bullets       |
| 4 – Qiskit    | `fuchsia`    | hero gradient, pills, numbered bullets       |

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

### Existing — keep and polish
| Component         | Role                                        | Key changes              |
|-------------------|---------------------------------------------|--------------------------|
| `Navbar`          | Site navigation + progress pill             | Animated mobile menu     |
| `ModuleLayout`    | Module page wrapper + hero + sticky header  | Color-coded per module   |
| `LessonCard`      | One lesson (concept→visual→bullets→quiz)    | Section labels + spacing |
| `DiagramFrame`    | Accessible figure wrapper for visuals       | Subtle label bar polish  |
| `Quiz`            | Multiple-choice checkpoint                  | Success pulse animation  |
| `StepNav`         | Dot nav + prev/next within module           | Connecting line, cleaner |
| `DeepDive`        | Collapsible deep-dive section               | No major changes needed  |
| `CodeBlock`       | Syntax-highlighted code (Prism.js)          | Done — no changes needed |
| `MathBlock`       | KaTeX math display                          | No changes needed        |

### Global CSS (`index.css`)
- Import Inter font via `@import`
- New utilities: `.lesson-label`, `.section-label`, `.concept-pill`, `.module-dot-line`
- Refined `.btn-primary` (subtle gradient)
- Improved `.card` and `.card-hover`
- Add `.gradient-text` for branded headings

---

## Information Architecture

```
/ (Home)
  ├── Hero — course value prop + progress CTA
  ├── Course at a glance — 5-step lesson structure
  ├── Module list — 4 cards, ordered, locked/unlocked states
  └── "Built for beginners" — 3 pillars

/intuition (Module 1 — indigo)
  ├── Lesson 1: Bits vs Qubits
  ├── Lesson 2: What is Superposition?
  ├── Lesson 3: Measurement Collapse
  ├── Lesson 4: Interference
  └── Lesson 5: Why Quantum Computing?

/braket (Module 2 — violet)
  ├── Lesson 1: What is Bra-Ket Notation?
  ├── Lesson 2: Ket States |ψ⟩
  ├── Lesson 3: Bra States ⟨ψ|
  └── Lesson 4: Inner Products

/phase (Module 3 — purple)
  ├── Lesson 1: What is Phase?
  ├── Lesson 2: Unit Circle Explorer
  ├── Lesson 3: Bloch Sphere
  ├── Lesson 4: Measurement Bases
  └── Lesson 5: Real Algorithms

/qiskit (Module 4 — fuchsia)
  ├── Lesson 1: What is Qiskit?
  ├── Lesson 2: Your First Circuit
  ├── Lesson 3: Essential Gates
  ├── Lesson 4: Bell State
  └── Lesson 5: Next Steps
```

---

## Homepage Design

### Hero section
- **Layered background**: 3 colored orbs (indigo + violet + fuchsia) with blur-3xl,
  slow CSS drift animation, pointer-events-none
- **Badge**: "Free · Visual · Beginner-Friendly" with Atom icon
- **H1**: "Learn Quantum Computing" — gradient on "Quantum Computing" (indigo→violet)
- **Sub**: "4 modules · 19 lessons · interactive diagrams · no physics degree required"
- **Progress bar** (if started): max-w-xs centered, shows lessons done
- **CTA**: "Start Learning →" (primary) or "Continue — Module Name →" if in progress

### Course at a glance (5-step strip)
Replace emoji icons with Lucide icons in numbered colored circles.
Show as horizontal flow (desktop) or 2-col grid (mobile).
Numbered 1–5 with connecting dots between steps.
Steps: Key Idea → Visual First → 3-Line Explanation → Worked Example → Checkpoint Quiz

### Module cards
Each card:
- **Left border accent** (4px, module color) instead of bottom bar
- Module number as large faint watermark ("01") top-right, very low opacity
- Icon + "Module N" label
- Bold module title
- Topic pills (completed pills → colored, incomplete → slate)
- Inline progress bar (slim, at bottom of content area, not card bottom)
- CTA link: "Start →" / "Continue →" / "Review →"
- Locked state: 50% opacity, lock icon, no hover effect

### "Built for beginners" cards
3 feature cards with:
- Icon in a colored rounded square (not just plain icon)
- Short bold title
- 2-sentence max description

---

## Module Page Design

### Hero
Per-module gradient background:
- Module 1: `from-indigo-950/70 to-slate-950`
- Module 2: `from-violet-950/70 to-slate-950`
- Module 3: `from-purple-950/70 to-slate-950`
- Module 4: `from-fuchsia-950/70 to-slate-950`

Content:
- Back link (← Home)
- "Module N" label (small, colored pill)
- H1: module title
- Subtitle tagline
- Lesson count badge ("5 lessons")

### Sticky mini-header
When scrolling:
- Module title (truncated)
- Lesson counter "Lesson 2 of 5"
- Dot indicators (small, current = colored pill shape)
- Progress percentage "40%"

### Lesson card sequence
Each lesson (`LessonCard`) renders:
1. Lesson N of M label (small pill)
2. Hook headline (H2, large bold)
3. Hook subtitle (slate-400, 1 sentence)
4. Visual / interactive (DiagramFrame or raw JSX)
5. "Key ideas" section (numbered list, styled box)
6. "Worked example" section (labeled box with icon)
7. "See the math" deep dive (DeepDive, violet)
8. Checkpoint quiz (Quiz, indigo)

### Module footer
- "Mark as Complete" button (only shows after all lessons passed)
- → Next module link on right

---

## Navbar Design

- Height: 56px (`h-14`)
- Background: `bg-slate-950/90 backdrop-blur`
- Logo: Atom icon + "QuantumLeap" in bold
- Desktop links: pill shape, active = `bg-indigo-600 text-white`, inactive = hover `bg-slate-800`
- Progress indicator: thin bar + "N/19" text
- Mobile: hamburger → animated slide-down menu (Framer Motion AnimatePresence)

---

## Apple HIG-Inspired Patterns

1. **Progressive disclosure** — Deep math is always behind DeepDive, not shown by default
2. **One focused task** — Each lesson screen has one learning goal; nothing competes
3. **Feedback immediacy** — Every tap/click gets instant visual feedback (< 150ms)
4. **Spatial consistency** — Same component always appears in same position
5. **Accessible affordances** — Every button has an aria-label, focus rings are visible
6. **Clarity over decoration** — Gradients and motion enhance understanding, not aesthetics
7. **Restrained palette** — Only 2–3 colors on any given screen
8. **Breathing room** — Never pack content; use generous padding
9. **Confirmatory feedback** — Success state is obvious (green, icon, message)
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
- Skip-to-content link (already in index.css)
- Screen reader: lesson progress announced via `aria-live="polite"` when advancing

---

## Diagram Guidelines

All diagrams must be:
- SVG preferred (scales cleanly, dark-theme friendly)
- Labeled with a header bar (via DiagramFrame)
- Captioned below (via DiagramFrame description prop)
- Mobile-safe: fluid width, no fixed pixel sizes for containers
- Colorblind-safe: don't rely solely on red/green; use icons + labels
- Accessible: `role="img"` + `aria-label` on the figure wrapper

Diagram catalog (one per lesson):
| Lesson                | Visual type               | Key elements                          |
|-----------------------|---------------------------|---------------------------------------|
| Bits vs Qubits        | Toggle comparison         | 0/1 box vs superposition blob         |
| Superposition         | Scaling table             | n qubits → 2ⁿ states grid            |
| Measurement collapse  | Before/after split        | wave → spike with arrow               |
| Interference          | Wave SVG                  | constructive vs destructive           |
| Why QC?               | Bar chart or info card    | exponential speedup                   |
| Ket notation          | Vector card               | column vector visual                  |
| State explorer        | Interactive slider        | amplitude visualization               |
| Bra notation          | Row vector card           | transposed visual                     |
| Inner product         | Two vectors → scalar      | dot product animation                 |
| Phase                 | Unit circle               | labeled tick marks at 0, π/2, π, 3π/2|
| Bloch sphere          | 2D interactive            | theta/phi sliders                     |
| Measurement bases     | Basis comparison          | Z-basis vs X-basis arrows             |
| Quantum gates         | Circuit wire + box        | H, X, CNOT gates                      |
| Bell state            | Step-by-step circuit      | 2-qubit state evolution               |

---

## Copy Guidelines

### Voice
- Friendly, intelligent, calm, precise
- Direct without being abrupt
- Analogies before equations
- Never condescending; always encouraging

### Headlines
- Verb-led or question-led: "Superposition isn't magic — it's probability."
- Max 10 words
- No jargon without immediate plain-English translation

### Buttons
- "Start Learning" → not "Begin Course"
- "Continue →" → not "Proceed to next lesson"
- "Check answer" → not "Submit"
- "Retry" → not "Try again"
- "See the math" → not "View mathematical derivation"
- "Mark as Complete" → not "Finish module"

### Feedback copy
- Correct: "Exactly right. Continue below."
- Wrong: "Not quite — try again."
- Locked: "Finish lesson N first."
- Complete (lesson): "Checkpoint complete."
- Complete (module): "Module complete."
- Course done: "You've finished the course."

### Lesson labels
- "Lesson 1 of 5" (not "Step 1/5" or "1.")
- "Key ideas" (not "Summary" or "Takeaways")
- "Worked example" (not "Example" alone)
- "Deep Dive — optional" (not "Advanced")
- "Checkpoint" (not "Quiz" or "Test")

### Tooltip copy
- Locked dot: "Finish lesson N first"
- Locked Next button: "Answer the checkpoint to continue"

---

## Concrete React/Tailwind/Framer Motion Patterns

### Animated hero orbs (Home page)
```jsx
// CSS keyframes in index.css
// @keyframes float { 0%,100% { transform: translateY(0) scale(1) }
//                    50% { transform: translateY(-20px) scale(1.05) } }
// .orb-float { animation: float 10s ease-in-out infinite }
// .orb-float-slow { animation: float 14s ease-in-out infinite reverse }

<div className="absolute inset-0 pointer-events-none overflow-hidden">
  <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px]
                  bg-indigo-600/10 rounded-full blur-3xl orb-float" />
  <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px]
                  bg-violet-600/8 rounded-full blur-3xl orb-float-slow" />
  <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px]
                  bg-fuchsia-600/6 rounded-full blur-3xl orb-float" />
</div>
```

### Staggered entrance (Framer Motion)
```jsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }
<motion.div variants={container} initial="hidden" animate="show">
  <motion.h1 variants={item}>...</motion.h1>
  <motion.p variants={item}>...</motion.p>
  <motion.div variants={item}>...</motion.div>
</motion.div>
```

### Animated mobile menu (Navbar)
```jsx
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
      className="md:hidden border-t border-slate-800 bg-slate-950"
    >
      {/* menu items */}
    </motion.div>
  )}
</AnimatePresence>
```

### Quiz success pulse
```jsx
<motion.div
  animate={justPassed ? { scale: [1, 1.008, 1] } : {}}
  transition={{ duration: 0.3 }}
  className={`rounded-2xl border overflow-hidden transition-colors duration-300
    ${justPassed ? 'border-green-600/50 bg-green-950/15' : 'border-indigo-800/40 bg-indigo-950/20'}`}
>
```

### Module color map (ModuleLayout / LessonCard)
```js
const MODULE_STYLES = {
  intuition: { gradient: 'from-indigo-950/70',  accent: 'text-indigo-400', border: 'border-indigo-800/40', bg: 'bg-indigo-900/20', bullet: 'bg-indigo-900/60 border-indigo-700/50 text-indigo-400', num: '01' },
  braket:    { gradient: 'from-violet-950/70',  accent: 'text-violet-400', border: 'border-violet-800/40', bg: 'bg-violet-900/20', bullet: 'bg-violet-900/60 border-violet-700/50 text-violet-400', num: '02' },
  phase:     { gradient: 'from-purple-950/70',  accent: 'text-purple-400', border: 'border-purple-800/40', bg: 'bg-purple-900/20', bullet: 'bg-purple-900/60 border-purple-700/50 text-purple-400', num: '03' },
  qiskit:    { gradient: 'from-fuchsia-950/70', accent: 'text-fuchsia-400', border: 'border-fuchsia-800/40', bg: 'bg-fuchsia-900/20', bullet: 'bg-fuchsia-900/60 border-fuchsia-700/50 text-fuchsia-400', num: '04' },
}
```

### StepNav connecting line
```jsx
<div className="relative flex items-center gap-2">
  {Array.from({ length: steps }, (_, i) => (
    <Fragment key={i}>
      <button className={`rounded-full transition-all duration-200 ...`} />
      {i < steps - 1 && (
        <div className={`h-px flex-1 transition-colors duration-300
          ${passed[i] ? 'bg-green-600/50' : 'bg-slate-700/50'}`} />
      )}
    </Fragment>
  ))}
</div>
```

---

## Build Plan (Remaining Milestones)

### Milestone F — Design System + Visual Polish (current)
Priority order:
1. `src/index.css` — Inter font, orb keyframes, new utilities, refined components
2. `src/pages/Home.jsx` — animated hero, step flow, redesigned module cards
3. `src/components/Navbar.jsx` — animated mobile menu, polished active states
4. `src/components/ModuleLayout.jsx` — color-coded hero, decorative number watermark
5. `src/components/LessonCard.jsx` — section labels, better visual hierarchy
6. `src/components/Quiz.jsx` — success pulse animation, green glow on correct
7. `src/components/StepNav.jsx` — connecting line between dots, cleaner design
8. `src/components/DiagramFrame.jsx` — minor polish to header bar

### Milestone G — Mobile audit + final polish
- Test all pages at 375px, 390px, 430px (iPhone SE, 14, 15 Pro Max)
- Fix any overflow, cramped tap targets, or truncation issues
- Add `prefers-reduced-motion` guards around all animations
- Audit color contrast with Chrome DevTools accessibility panel
- Test keyboard navigation flow end-to-end

### Milestone H — Deploy
- `npm run deploy` (gh-pages)
- Verify BrowserRouter basename is correct
- Confirm all routes work on GitHub Pages

---

## Git Workflow
- Branch: main
- Commit format: `feat: milestone <X> — <description>`
- Deploy: `npm run deploy`
- Never commit non-building code
- Update progress checklist before each commit

---

## Progress Checklist

### Foundation
- [x] Audit existing site + write CLAUDE.md
- [x] Quiz, DeepDive, StepNav components
- [x] useProgress (module + lesson level)

### Module Restructure
- [x] Milestone A: Home page — lesson counts, progress bars, topic pills
- [x] Milestone B: Intuition module — 5 lessons + checkpoints
- [x] Milestone C: BraKet module — 4 lessons + checkpoints
- [x] Milestone D: PhaseAngle module — 5 lessons + checkpoints
- [x] Milestone E: Qiskit module — 5 lessons + checkpoints

### Polish
- [ ] Milestone F: Full visual redesign — design system, Home, Navbar, components
- [ ] Milestone G: Mobile audit + accessibility + reduced motion
- [ ] Milestone H: Deploy to GitHub Pages
