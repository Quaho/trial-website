# REVIEW.md — Review Log

## TASK-016: Machine Project infrastructure + MP1 (First Quantum Circuit)
- Status: **APPROVED**
- Reviewer: Claude (manager)
- Findings: Project data file with 3 projects + style maps. ProjectLayout component with vertical step timeline, progress tracking, expand/collapse, aria-live. MP1 has 5 well-structured steps with code blocks, predict/reflect boxes, GlossaryTooltips. MP2/MP3 stubs with correct accent colors. Routes lazy-loaded. Navbar and Roadmap updated with project links and cards (locked/unlocked/completed). Build passes.

## TASK-015: Mobile polish audit — fix layout issues at 375px
- Status: **APPROVED**
- Reviewer: Claude (manager)
- Findings: 8 targeted fixes. Home/Roadmap orbs responsive sized. Grover bars narrower on mobile. StepNav tooltips wrap. CodeBlock copy button 44px touch target. Phase gate SVG stacks vertically. Navbar mobile links min-h-[44px]. Circuit diagrams max-height clipped on mobile. Build passes.

## TASK-014: Integrate GlossaryTooltip into lesson content
- Status: **APPROVED**
- Reviewer: Claude (manager)
- Findings: 50 tooltip wrappings across all 13 module pages. First meaningful occurrence per lesson, max ~1 per lesson on average. No tooltips in headings, quizzes, or math. Terms wrapped: qubit, superposition, measurement, amplitude, interference, basis, phase, gate, unitary, Hadamard, entanglement, Bell state, circuit, oracle, decoherence, error correction, tensor product. Build passes.

## TASK-013: GlossaryTooltip component
- Status: **APPROVED**
- Reviewer: Claude (manager)
- Findings: Shared `lib/data/glossary.js` with 17 terms. GlossaryTooltip renders inline button with dotted underline; hover/focus shows animated tooltip (150ms, opacity + y shift) with term, definition, and "See glossary →" link. `role="tooltip"` + `aria-describedby` + `useId()`. Unknown terms gracefully render children only. Glossary.jsx imports from shared data — no duplication. Bonus: lazy-loaded routes + vendor chunk splitting in vite.config.js. Build passes.

## TASK-012: Module completion celebration animation
- Status: **APPROVED**
- Reviewer: Claude (manager)
- Findings: Bounce-scale entrance with overshoot ease on completion message. 6 particles burst outward. Static on revisit. aria-hidden particles. min-h prevents layout shift. Build passes.

## TASK-011–001: All APPROVED
