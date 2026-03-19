# agent.md — Current Codex Task

## TASK-016: Machine Project infrastructure + MP1 (First Quantum Circuit)

### Why this task now
CLAUDE.md defines 3 Machine Projects — guided, multi-step projects placed after each track. This task builds the infrastructure (data, layout component, routes, nav links) and the first project: MP1 — First Quantum Circuit (after Foundations track, Modules 1–4).

### Relevant project standards from CLAUDE.md
- Machine Projects section: structure, routes, placement
- Design system: `rounded-2xl`, `bg-slate-900`, `border-slate-700/60`, module accent colors
- Motion: page entrance `opacity 0→1, y 12→0, 200ms`
- Accessibility: focus-visible, keyboard nav, aria labels
- Copy voice: friendly, encouraging, analogies before equations

### Files to create

1. **`lib/data/projects.js`** — project metadata
2. **`components/ProjectLayout.jsx`** — shared layout for all Machine Projects
3. **`app/pages/projects/FirstCircuit.jsx`** — MP1 content

### Files to modify

4. **`app/App.jsx`** — add routes for `/projects/first-circuit`, `/projects/bell-explorer`, `/projects/algorithm-showdown`
5. **`components/Navbar.jsx`** — add "Projects" link to mobile Explore section + desktop extras
6. **`app/pages/Roadmap.jsx`** — add MP cards after each track section

---

### Requirements

**1. Create `lib/data/projects.js`**

```js
import { Cpu, GitMerge, Brain } from 'lucide-react'

export const PROJECTS = [
  {
    id: 'first-circuit',
    to: '/projects/first-circuit',
    icon: Cpu,
    number: 1,
    title: 'First Quantum Circuit',
    tagline: 'Build and simulate a simple circuit using concepts from Intuition → Qiskit',
    track: 'foundations',
    prereqs: ['intuition', 'braket', 'phase', 'qiskit'],
    estMin: 25,
    steps: 5,
    accent: 'indigo',
  },
  {
    id: 'bell-explorer',
    to: '/projects/bell-explorer',
    icon: GitMerge,
    number: 2,
    title: 'Bell State Explorer',
    tagline: 'Construct, visualize, and measure a Bell pair end-to-end',
    track: 'circuits',
    prereqs: ['gates', 'multiqubit', 'entanglement', 'circuits'],
    estMin: 30,
    steps: 5,
    accent: 'teal',
  },
  {
    id: 'algorithm-showdown',
    to: '/projects/algorithm-showdown',
    icon: Brain,
    number: 3,
    title: 'Algorithm Showdown',
    tagline: 'Compare classical vs quantum approaches to a search problem',
    track: 'advanced',
    prereqs: ['measurement', 'algorithms', 'labs', 'noise', 'usecases'],
    estMin: 30,
    steps: 6,
    accent: 'orange',
  },
]

// Style map for project cards and layouts
export const PROJECT_STYLES = {
  'first-circuit': {
    gradient: 'from-indigo-950/70 via-indigo-950/20',
    accent: 'text-indigo-400',
    border: 'border-indigo-800/40',
    bg: 'bg-indigo-900/20',
    badge: 'bg-indigo-900/40 text-indigo-400 border-indigo-800/40',
    progressBar: 'bg-gradient-to-r from-indigo-500 to-violet-500',
  },
  'bell-explorer': {
    gradient: 'from-teal-950/70 via-teal-950/20',
    accent: 'text-teal-400',
    border: 'border-teal-800/40',
    bg: 'bg-teal-900/20',
    badge: 'bg-teal-900/40 text-teal-400 border-teal-800/40',
    progressBar: 'bg-gradient-to-r from-teal-500 to-cyan-500',
  },
  'algorithm-showdown': {
    gradient: 'from-orange-950/70 via-orange-950/20',
    accent: 'text-orange-400',
    border: 'border-orange-800/40',
    bg: 'bg-orange-900/20',
    badge: 'bg-orange-900/40 text-orange-400 border-orange-800/40',
    progressBar: 'bg-gradient-to-r from-orange-500 to-amber-500',
  },
}
```

**2. Create `components/ProjectLayout.jsx`**

A page wrapper for Machine Projects, similar to ModuleLayout but adapted for the project structure:

- **Hero section**: gradient background (from project style), back link to `/roadmap`, project badge ("Machine Project 1"), title, tagline, estimated time, step count
- **Progress bar**: shows steps completed out of total (track via `useProgress` with project id prefix, e.g., `project-first-circuit`)
- **Step list**: numbered vertical step cards that the user works through
- **Each step card** shows:
  - Step number badge (accent colored)
  - Step title (bold)
  - Step content (children passed as array)
  - A "Mark step complete" button (saves to useProgress)
  - Completed state: green checkmark, collapsed content
- **Footer**: "Back to Roadmap" link + next project link if available
- **Accessibility**: focus-visible on all buttons, aria-live for step completion

Props:
```jsx
ProjectLayout({
  projectId,    // string — for useProgress key
  title,        // string
  tagline,      // string
  steps,        // array of { title, content: ReactNode }
  prevProject,  // { to, label } or null
  nextProject,  // { to, label } or null
})
```

The component should NOT use the LessonCard/StepNav pattern — this is a different experience. Steps are a vertical scrolling list (not a paginated stepper), each with its own completion checkbox.

Design details:
- Step cards: `rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 sm:p-6`
- Step number: small accent-colored circle with number
- Connecting line between steps: `w-px bg-slate-700/60` vertical line (like the Roadmap)
- Completed step: border turns green, content collapses to title + checkmark
- "Mark step complete" button: `btn-primary` style, inside each step card
- Use Framer Motion for step completion animation (scale + opacity, 200ms)

**3. Create `app/pages/projects/FirstCircuit.jsx`** — MP1 content

This is the Foundations track capstone. The learner builds a simple quantum circuit step by step.

Structure (5 steps):

**Step 1 — Understand the Goal**
- Brief: "You'll build a circuit that creates superposition, applies a phase gate, and measures the result."
- Concept recap: link back to relevant lessons (Intuition, BraKet)
- "Predict: What do you think happens when you measure a qubit in superposition?"
- Content: 2–3 short paragraphs explaining what we're building and why

**Step 2 — Set Up the Circuit**
- Show Qiskit code to create a 1-qubit, 1-classical-bit circuit
- Use CodeBlock component for the code
- Explain each line in plain English
- Content: code block + 3 bullet explanations

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(1, 1)  # 1 qubit, 1 classical bit
```

**Step 3 — Apply Gates**
- Add Hadamard gate to create superposition
- Add S gate for a phase shift
- Explain what each gate does (link to Gates module)

```python
qc.h(0)   # Hadamard → creates |+⟩ superposition
qc.s(0)   # S gate → adds 90° phase to |1⟩ component
```

**Step 4 — Measure and Simulate**
- Add measurement
- Show simulation code
- "Predict: Will you see 50/50 results? Why or why not?"

```python
qc.measure(0, 0)

from qiskit_aer import AerSimulator
simulator = AerSimulator()
result = simulator.run(qc, shots=1024).result()
counts = result.get_counts()
print(counts)
```

**Step 5 — Analyze Results**
- Explain the output: ~50% |0⟩, ~50% |1⟩ (phase doesn't affect Z-basis measurement probabilities)
- "But wait — the S gate did something! How would you reveal its effect?"
- Answer: measure in the X-basis (add H before measurement)
- Reflection questions:
  1. "Why doesn't the S gate change the measurement probabilities in the Z-basis?"
  2. "What would happen if you replaced the S gate with a Z gate?"
  3. "How could you verify the phase is there without changing the measurement basis?"

Use these components:
- `CodeBlock` for all code snippets (language="python")
- `GlossaryTooltip` for key terms (superposition, gate, measurement, phase — max 2 per step)
- Plain HTML for text, bullets, and reflection questions

**4. Update `app/App.jsx`**

Add lazy-loaded routes:
```jsx
const FirstCircuit = lazy(() => import('./pages/projects/FirstCircuit'))
const BellExplorer = lazy(() => import('./pages/projects/BellExplorer'))
const AlgorithmShowdown = lazy(() => import('./pages/projects/AlgorithmShowdown'))

// Inside Routes:
<Route path="/projects/first-circuit" element={<FirstCircuit />} />
<Route path="/projects/bell-explorer" element={<BellExplorer />} />
<Route path="/projects/algorithm-showdown" element={<AlgorithmShowdown />} />
```

For MP2 and MP3, create simple placeholder pages (like ComingSoon but project-themed):

Create `app/pages/projects/BellExplorer.jsx` and `app/pages/projects/AlgorithmShowdown.jsx` as stubs:
```jsx
import { Link } from 'react-router-dom'
import { ChevronLeft, Lock } from 'lucide-react'

export default function BellExplorer() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-teal-950/70 to-slate-950 border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/roadmap" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Course Roadmap
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-teal-800/40 bg-teal-900/40 text-teal-400">
              Machine Project 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Bell State Explorer</h1>
          <p className="text-slate-400 mt-2">Coming soon — complete the Circuits track to unlock.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 text-slate-500">
          <Lock className="w-5 h-5" />
          <p>This project is under construction. Check back soon!</p>
        </div>
      </div>
    </div>
  )
}
```

(Same pattern for AlgorithmShowdown with orange styling.)

**5. Update `components/Navbar.jsx`**

Add "Projects" to the mobile Explore section:
```jsx
{ to: '/projects/first-circuit', label: 'Machine Projects' },
```

Add it between "Mini Challenges" and the end of the explore list. On desktop, add a "Projects" link next to Roadmap/Glossary/Challenges in the top nav (if those exist as desktop links) — or at minimum ensure the mobile nav has it.

**6. Update `app/pages/Roadmap.jsx`**

After each track's module list, add a Machine Project card:
- Import `PROJECTS` and `PROJECT_STYLES` from `../../lib/data/projects`
- After each track section, render the matching project card (filter by `track`)
- Card design: similar to module cards but with a distinct "MP" badge and different accent
- Locked if prerequisites not met (same logic as modules — check `completed` from `useProgress`)
- Style: `rounded-2xl border-2 border-dashed` to visually distinguish from module cards

---

### Non-goals
- Do NOT build full content for MP2 or MP3 (just stubs)
- Do NOT modify useProgress — it already supports arbitrary string keys
- Do NOT change any existing module pages
- Do NOT add project progress to the Home page progress bar (projects are optional, extra credit)

### Acceptance criteria
- [ ] `lib/data/projects.js` exports PROJECTS and PROJECT_STYLES
- [ ] `components/ProjectLayout.jsx` renders a project page with step cards
- [ ] `app/pages/projects/FirstCircuit.jsx` has 5 complete steps with code, explanations, predictions, reflections
- [ ] MP2 and MP3 stub pages exist and render
- [ ] Routes registered in App.jsx (lazy loaded)
- [ ] "Machine Projects" link appears in Navbar mobile menu
- [ ] Roadmap page shows MP cards after each track
- [ ] MP cards on Roadmap respect locked/unlocked state
- [ ] Build passes (`npm run build`)

### Verification steps
1. `npm run build` — must pass
2. Navigate to `/projects/first-circuit` — see full project with 5 steps
3. Complete steps, verify progress saves
4. Check `/roadmap` — MP cards appear after each track
5. Check mobile nav — "Machine Projects" link works
6. Navigate to `/projects/bell-explorer` and `/projects/algorithm-showdown` — see stub pages

### Constraints
- Create only the listed new files
- Follow existing component patterns (Framer Motion, Tailwind, functional components)
- Keep step content concise — no step > 200 words
- Use CodeBlock for all code, GlossaryTooltip for key terms (max 2 per step)
