# agent.md — Current Codex Task

## TASK-003: Add focus-visible outline to CodeBlock copy button

### Why this task now
Continuing the accessibility sweep of high-frequency interactive elements. The CodeBlock copy button appears in every Qiskit/coding lesson across multiple modules. It currently has no `focus-visible` outline, making it invisible to keyboard navigators. Same class of fix as TASK-001 and TASK-002.

### Relevant project standards from CLAUDE.md
- Every interactive element must have: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Focus ring default color: `indigo-400`
- Buttons must show hover, focus, active, and disabled states

### Files likely involved
- `components/CodeBlock.jsx` — the only file that needs changes

### Requirements
1. Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400` to the copy `<button>` element (currently line 27-29). Use `slate-400` to match the neutral chrome of the code block header.
2. Add `rounded-lg` to the button so the focus ring has a rounded shape matching the component aesthetic.
3. Add `px-2 py-1 -my-0.5` to give the button a proper minimum tap target area without changing the header layout. Currently the button has no padding, making the hit area very small.

### Non-goals
- Do not change the copy logic, Prism highlighting, or component structure.
- Do not touch any other component.
- Do not add new props or state.

### Acceptance criteria
- [ ] Keyboard Tab to the copy button shows a visible focus ring
- [ ] Focus ring is rounded
- [ ] Button tap target is at least reasonable size
- [ ] Copy functionality still works
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Open any module with a CodeBlock, Tab to the copy button, verify focus ring appears
3. Press Enter/Space — verify copy works
4. Verify no focus ring on mouse click (only `:focus-visible`)

### Constraints
- Touch only `components/CodeBlock.jsx`
- Diff should be ~1-2 lines changed
- Do not add new state variables or change component props
