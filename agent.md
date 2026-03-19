# agent.md — Current Codex Task

## TASK-007: Add focus-visible outlines to Circuits.jsx inline buttons

### Why this task now
Circuits.jsx (Module 8 — Quantum Circuits) has 8 inline interactive buttons across its custom visuals, none of which have `focus-visible` outlines. This is one of the most interactive module pages and a key part of the learning path. Continuing the per-page a11y sweep.

### Relevant project standards from CLAUDE.md
- Every interactive element must have: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Module 8 accent color: emerald → use `focus-visible:outline-emerald-400` for themed buttons
- Neutral/slate buttons: use `focus-visible:outline-slate-400`
- Buttons using `btn-primary` or `btn-secondary` already have focus styles — skip those

### Files involved
- `app/pages/Circuits.jsx` — the only file that needs changes

### Requirements

Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400` to all inline buttons that use emerald accent styling. For neutral/slate buttons, use `focus-visible:outline-slate-400`.

The buttons to update (approximate line numbers):

1. **Line ~101 — Circuit annotation buttons** (grid of 4): These toggle highlighting. Use `focus-visible:outline-emerald-400`.
2. **Line ~194 — Tab buttons** (Wires/Gates/Measurement tabs): Use `focus-visible:outline-emerald-400`.
3. **Line ~362 — "Previous" step button**: Neutral slate styling → use `focus-visible:outline-slate-400`.
4. **Line ~372 — "Next" step button**: Emerald styling → use `focus-visible:outline-emerald-400`.
5. **Lines ~539, ~549 — Second stepper** (if present): Same pattern as #3/#4.
6. **Line ~674 — Any remaining buttons**: Apply the appropriate focus ring.

Check if any buttons already use `btn-primary` or `btn-secondary` classes — those already have focus styles and should be skipped.

### Non-goals
- Do not change lesson content, animations, SVGs, or stepper logic.
- Do not touch any other page or component.
- Do not refactor the visual components.

### Acceptance criteria
- [ ] All inline buttons in Circuits.jsx show focus rings on keyboard Tab
- [ ] Emerald-themed buttons get emerald focus rings
- [ ] Neutral buttons get slate focus rings
- [ ] No visual change to mouse/touch interactions
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Open `/circuits`, Tab through the circuit annotation buttons in lesson 1 — verify emerald focus rings
3. Tab through the tab buttons in lesson 2 — verify focus rings
4. Tab through stepper Previous/Next buttons — verify focus rings
5. Verify no focus ring on mouse click

### Constraints
- Touch only `app/pages/Circuits.jsx`
- Only add focus-visible classes to existing className strings
- Do not add new state variables or change component props
