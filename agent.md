# agent.md — Current Codex Task

## TASK-001: Add `focus-visible` outlines to Quiz choice buttons

### Why this task now
The Quiz checkpoint is the single most-used interactive element — every lesson in all 13 modules ends with one. Currently, keyboard users tabbing through choices receive zero visual feedback. This is a WCAG failure and violates the project's own CLAUDE.md accessibility requirements.

### Relevant project standards from CLAUDE.md
- Every interactive element must have: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Focus ring color: `indigo-400` (default), contextual color when submitted
- Buttons must show hover, focus, active, and disabled states
- No information conveyed by color alone

### Files likely involved
- `components/Quiz.jsx` — the only file that needs changes

### Requirements
1. Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2` to each quiz choice `<motion.button>`.
2. Focus ring color should be contextual:
   - Before submission: `focus-visible:outline-indigo-400`
   - After submission, correct choice: `focus-visible:outline-green-500`
   - After submission, wrong selected choice: `focus-visible:outline-red-500`
   - After submission, other (non-selected, non-correct) choices: `focus-visible:outline-slate-600`
3. The "Retry" text button (line ~172) should also get a `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded` treatment.

### Non-goals
- Do not change quiz logic, animations, or layout.
- Do not refactor the component structure.
- Do not modify the compact "already passed" state.
- Do not touch any other component.

### Acceptance criteria
- [ ] Keyboard Tab through quiz choices shows a visible focus ring on each choice
- [ ] Focus ring color matches the choice's current visual state (indigo before submit, green for correct, red for wrong)
- [ ] Retry button shows focus ring when focused via keyboard
- [ ] No visual change to mouse/touch interactions
- [ ] Build passes with no warnings related to this change

### Verification steps
1. `npm run build` — must pass
2. Open any module page in browser, Tab to a quiz, verify focus ring appears on each choice
3. Submit a wrong answer, verify the focus ring on correct answer is green, wrong is red
4. Click Retry, verify focus ring returns to indigo
5. Verify no focus ring appears on mouse click (only `:focus-visible`)

### Constraints
- Touch only `components/Quiz.jsx`
- Keep the diff minimal — only add focus-visible classes to existing className strings
- Do not add new state variables or change component props
