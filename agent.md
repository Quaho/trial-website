# agent.md — Current Codex Task

## TASK-010: Add aria-live region for lesson progress announcements

### Why this task now
CLAUDE.md explicitly requires: "Screen reader: lesson progress announced via `aria-live="polite"` when advancing." This is not implemented anywhere. Screen reader users currently get no announcement when they navigate between lessons. Since ModuleLayout wraps all 13 modules, a single change here covers the entire course.

### Relevant project standards from CLAUDE.md
- `aria-live="polite"` when advancing between lessons
- Accessibility: no information conveyed by visual only

### Files involved
- `components/ModuleLayout.jsx` — the only file that needs changes

### Requirements

Add a visually hidden `aria-live="polite"` region inside ModuleLayout that announces the current lesson position when `stepInfo.current` changes.

**Implementation:**

1. Add a visually hidden `<div>` with `aria-live="polite"` inside the sticky header section (or just after it). The div should be screen-reader-only using this pattern:
```jsx
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {stepInfo ? `Lesson ${stepInfo.current + 1} of ${stepInfo.total}` : ''}
</div>
```

2. Add the `sr-only` utility class to `app/index.css` if it doesn't already exist. Standard Tailwind includes it, but verify. The class should be:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Note: Tailwind CSS v3 includes `sr-only` by default. If it's already available, do NOT add a duplicate definition in index.css. Only add it if `sr-only` is not recognized by Tailwind.

3. The `aria-live` region will automatically announce when the text content changes (i.e., when the user navigates to a different lesson and `stepInfo.current` updates).

### Non-goals
- Do not add announcements for quiz pass/fail (that's a separate concern).
- Do not add focus management (moving focus on lesson change).
- Do not change layout, styling, or animations.
- Do not touch any other component.

### Acceptance criteria
- [ ] A visually hidden `aria-live="polite"` region exists in ModuleLayout
- [ ] It contains the current lesson position text ("Lesson X of Y")
- [ ] Text updates when `stepInfo.current` changes
- [ ] The region is invisible to sighted users
- [ ] No visual layout changes
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Inspect the DOM on any module page — verify the `aria-live` div exists with correct text
3. Navigate between lessons — verify the div text updates
4. Verify the div is not visible on screen

### Constraints
- Touch only `components/ModuleLayout.jsx` (and `app/index.css` only if `sr-only` is missing)
- Diff should be ~5 lines
- Do not add new props or change the component API
