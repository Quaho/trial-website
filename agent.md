# agent.md — Current Codex Task

## TASK-004: Fix StepNav dot button focus offset and tap target size

### Why this task now
The StepNav dot buttons already have `focus-visible:outline` but are missing `outline-offset-2`, which means the focus ring sits flush against the tiny dot and is hard to see. Additionally, the dots are only 12px tall (`w-3 h-3`), far below the 44px minimum tap target required by CLAUDE.md. This affects every module page — StepNav appears at the bottom of every lesson.

### Relevant project standards from CLAUDE.md
- Focus: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Mobile: tap targets >= 44px
- Accessibility: all interactive elements keyboard navigable with visible focus

### Files likely involved
- `components/StepNav.jsx` — the only file that needs changes

### Requirements
1. Add `focus-visible:outline-offset-2` to the dot `<button>` element (line 46 currently has `focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400` but no offset).
2. Increase the clickable area of each dot button without changing its visual size. Add `p-2` padding to the button so the tap target becomes ~28px (the dot + padding). This is a practical improvement toward the 44px target without disrupting the compact dot layout.
3. To prevent the padding from pushing dots apart too much, add `-m-2` (negative margin) to counteract the padding visually, keeping the dots at the same visual spacing.

### Non-goals
- Do not change the dot visual appearance (colors, sizes, shapes).
- Do not change navigation logic, tooltips, or connecting lines.
- Do not touch Prev/Next buttons (they already have proper sizing).
- Do not touch any other component.

### Acceptance criteria
- [ ] Dot buttons have `focus-visible:outline-offset-2` for visible focus ring separation
- [ ] Dot tap targets are larger than before (padding-based expansion)
- [ ] Visual dot spacing looks unchanged or nearly unchanged
- [ ] Keyboard navigation through dots still works
- [ ] Tooltips on locked dots still appear on hover
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Open any module page, Tab through the StepNav dots, verify focus ring has visible offset
3. On mobile viewport (375px), verify dots are easier to tap
4. Verify locked-dot tooltips still show on hover
5. Verify connecting lines between dots look correct

### Constraints
- Touch only `components/StepNav.jsx`
- Keep the diff small — just add/modify classes on the dot button
- Do not add new state variables or change component props
