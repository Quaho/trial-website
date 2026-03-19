# agent.md — Current Codex Task

## TASK-014: Integrate GlossaryTooltip into lesson content

### Why this task now
The GlossaryTooltip component (`components/GlossaryTooltip.jsx`) exists and works, but isn't used anywhere yet. Wrapping key terms in lessons makes the glossary useful — learners can hover/focus any unfamiliar term to see its definition without leaving the page. This is the highest-value follow-up after TASK-013.

### Relevant project standards from CLAUDE.md
- Progressive disclosure: show definition on demand, not by default
- One focused task per lesson — tooltips should aid, not distract
- Never a wall of text — tooltips reduce cognitive load

### Strategy: selective wrapping
Do NOT wrap every occurrence of every term. Follow these rules:

1. **First meaningful occurrence per lesson** — wrap the term the first time it appears in that lesson's content (not in the headline/hook — only in bullet points, running text, worked examples, and deep dives)
2. **Maximum 3 tooltips per lesson** — more than that creates visual noise
3. **Only wrap when the term is used as a concept** — e.g., wrap "qubit" in "A qubit can hold 0 and 1" but NOT in "two-qubit gate" (compound term)
4. **Never wrap inside headings (h1–h3)** or quiz questions/answers
5. **Never wrap inside MathBlock or KaTeX expressions**

### Files to modify

Update these 13 module pages to import and use GlossaryTooltip:

1. `app/pages/Intuition.jsx` — wrap: qubit, superposition, interference, measurement, amplitude
2. `app/pages/BraKet.jsx` — wrap: basis, amplitude, interference
3. `app/pages/PhaseAngle.jsx` — wrap: phase, superposition, interference
4. `app/pages/Qiskit.jsx` — wrap: circuit, gate, qubit, superposition
5. `app/pages/Gates.jsx` — wrap: gate, qubit, unitary, phase, Hadamard
6. `app/pages/MultiQubit.jsx` — wrap: qubit, tensor product, basis, entanglement
7. `app/pages/Entanglement.jsx` — wrap: entanglement, Bell state, measurement, qubit
8. `app/pages/Circuits.jsx` — wrap: circuit, gate, measurement, qubit
9. `app/pages/Measurement.jsx` — wrap: measurement, basis, amplitude, phase
10. `app/pages/Algorithms.jsx` — wrap: oracle, interference, amplitude, superposition
11. `app/pages/Labs.jsx` — wrap: circuit, gate, qubit, Bell state
12. `app/pages/Noise.jsx` — wrap: decoherence, error correction, qubit
13. `app/pages/UseCases.jsx` — wrap: entanglement, superposition, qubit

### How to wrap

Import:
```jsx
import GlossaryTooltip from '../../components/GlossaryTooltip'
```

Usage — wrap the visible text, pass the canonical term name:
```jsx
// Before:
<li>A qubit can hold 0 and 1 simultaneously.</li>

// After:
<li>A <GlossaryTooltip term="qubit">qubit</GlossaryTooltip> can hold 0 and 1 simultaneously.</li>
```

The `term` prop must match a term in `lib/data/glossary.js` (case-insensitive). Available terms:
Amplitude, Basis, Bell State, Circuit, Decoherence, Entanglement, Error Correction, Gate, Hadamard, Interference, Measurement, Oracle, Phase, Qubit, Superposition, Tensor Product, Unitary

### Non-goals
- Do NOT modify the GlossaryTooltip component itself
- Do NOT modify `lib/data/glossary.js`
- Do NOT add tooltips to Glossary.jsx, Roadmap.jsx, Challenges.jsx, or Home.jsx
- Do NOT wrap terms inside Quiz components, headings, or MathBlock/KaTeX
- Do NOT wrap more than 3 terms per lesson card

### Acceptance criteria
- [ ] All 13 module pages import and use GlossaryTooltip
- [ ] Each page wraps 2–3 terms per lesson (first meaningful occurrence only)
- [ ] No tooltips in headings, quizzes, or math blocks
- [ ] No more than 3 tooltips per LessonCard
- [ ] Build passes (`npm run build`)

### Verification steps
1. `npm run build` — must pass
2. Spot-check a few modules in the browser: hover terms, see tooltip appear
3. Keyboard test: Tab to a wrapped term, tooltip appears on focus

### Constraints
- Modify only the 13 module page files listed above
- Follow the wrapping rules strictly — quality over quantity
