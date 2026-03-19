# agent.md — Current Codex Task

## TASK-008: Add focus-visible outlines to all remaining module page inline buttons

### Why this task now
After fixing Intuition.jsx (TASK-005) and Circuits.jsx (TASK-007), 9 module/extra pages still have inline buttons with no `focus-visible` outlines. This completes the page-level a11y sweep so every interactive element in the app has keyboard focus feedback.

### Relevant project standards from CLAUDE.md
- Every interactive element must have: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Use each module's accent color for the focus ring on themed buttons
- Use `slate-400` for neutral/secondary buttons
- Buttons using `btn-primary` or `btn-secondary` class already have focus styles — skip those

### Module accent colors for focus rings
| Page | Module key | Focus ring color |
|------|-----------|-----------------|
| Gates.jsx | gates | `focus-visible:outline-sky-400` |
| MultiQubit.jsx | multiqubit | `focus-visible:outline-cyan-400` |
| Entanglement.jsx | entanglement | `focus-visible:outline-teal-400` |
| Measurement.jsx | measurement | `focus-visible:outline-amber-400` |
| Algorithms.jsx | algorithms | `focus-visible:outline-orange-400` |
| Labs.jsx | labs | `focus-visible:outline-rose-400` |
| Noise.jsx | noise | `focus-visible:outline-slate-400` |
| UseCases.jsx | usecases | `focus-visible:outline-lime-400` |
| Challenges.jsx | (extra page) | `focus-visible:outline-indigo-400` |

### Files involved
- `app/pages/Gates.jsx` — 3 buttons
- `app/pages/MultiQubit.jsx` — 3 buttons
- `app/pages/Entanglement.jsx` — 2 buttons
- `app/pages/Measurement.jsx` — 5 buttons
- `app/pages/Algorithms.jsx` — 2 buttons
- `app/pages/Labs.jsx` — 5 buttons
- `app/pages/Noise.jsx` — 3 buttons
- `app/pages/UseCases.jsx` — 4 buttons
- `app/pages/Challenges.jsx` — 4 buttons

### Requirements
For each `<button>` element in the listed files:

1. If the button uses `btn-primary` or `btn-secondary` class → **skip it** (already has focus styles).
2. If the button has module-accent styling (colored bg/border/text matching the module) → add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2` with the module's accent color from the table above.
3. If the button is neutral/slate styled → use `focus-visible:outline-slate-400`.
4. If the button is a toggle with active/inactive states → put the base `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2` outside the ternary, and put the color inside each branch (accent when active, slate when inactive).

### Non-goals
- Do not change any lesson content, animations, SVGs, or logic.
- Do not touch Intuition.jsx or Circuits.jsx (already done).
- Do not touch shared components (already done in TASK-001 through TASK-004).
- Do not refactor visual components.

### Acceptance criteria
- [ ] Every `<button>` in the 9 listed files has a focus-visible outline
- [ ] Focus ring colors match module accents for themed buttons
- [ ] Neutral buttons use slate focus rings
- [ ] Buttons with `btn-primary`/`btn-secondary` are untouched
- [ ] No visual change to mouse/touch interactions
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Spot-check 3-4 pages by tabbing through their interactive visuals
3. Verify no focus ring appears on mouse click (only `:focus-visible`)

### Constraints
- Only add focus-visible classes to existing className strings
- All Tailwind classes must be full static strings for JIT
- Do not add new state variables or change component props
