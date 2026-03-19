# agent.md — Current Codex Task

## TASK-013: Build GlossaryTooltip component

### Why this task now
CLAUDE.md lists GlossaryTooltip as a "new component to build" — a hover/focus tooltip that shows a term's definition and links to the glossary. This connects the glossary to lessons, reducing cognitive load (learners don't need to leave the page to remember what a term means). This task builds the component and its data file; integration into lessons will be a follow-up task.

### Relevant project standards from CLAUDE.md
- Component: `GlossaryTooltip` — "Hover tooltip linking to glossary terms"
- Progressive disclosure (Apple HIG): show definition on demand, not by default
- Accessibility: keyboard navigable, focus-visible states
- Design: `rounded-xl`, `bg-slate-900`, `border-slate-700/60`, `text-sm`
- Motion: tooltip enter/exit ~150ms, opacity + slight y shift

### Files to create
1. `lib/data/glossary.js` — shared glossary term data (extracted from Glossary.jsx's TERMS)
2. `components/GlossaryTooltip.jsx` — the tooltip component

### Requirements

**1. Create `lib/data/glossary.js`**

Extract the term data from `app/pages/Glossary.jsx` (the TERMS array) into a shared data file so both the Glossary page and GlossaryTooltip can use the same definitions. Export it as `GLOSSARY_TERMS`.

The shape should remain the same:
```js
export const GLOSSARY_TERMS = [
  {
    term: 'Amplitude',
    definition: 'The complex number multiplying a basis state in a quantum superposition.',
    analogy: 'Think of it as "how much" of that outcome is in the mix.',
    modules: [
      { label: 'Intuition', to: '/intuition' },
      { label: 'BraKet', to: '/braket' },
    ],
  },
  // ... all other terms
]
```

Then update `app/pages/Glossary.jsx` to import from this shared file instead of defining TERMS inline.

**2. Create `components/GlossaryTooltip.jsx`**

Build a tooltip component that wraps a term in the lesson text. Usage will be:
```jsx
<GlossaryTooltip term="superposition">superposition</GlossaryTooltip>
```

The component should:

- Render `children` as an inline `<button>` with a dotted underline (indicating it's a glossary term)
- Style: `text-inherit font-inherit border-b border-dashed border-slate-500 cursor-help`
- On **hover** or **focus**, show a tooltip above the term containing:
  - Term name (bold, small)
  - One-line definition
  - "See glossary →" link to `/glossary`
- Tooltip styling: `bg-slate-900 border border-slate-700/60 rounded-xl shadow-xl shadow-black/40 p-3 max-w-xs`
- Tooltip position: centered above the term, with a small offset (`bottom-full mb-2`)
- Use Framer Motion for enter/exit: `opacity 0→1, y 4→0`, duration 150ms
- Close on mouse leave / blur
- Accessible: `role="tooltip"`, connected via `aria-describedby`
- Focus-visible: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`
- The tooltip trigger must be keyboard accessible (button element, focusable)

**Term lookup:** The component looks up the term (case-insensitive) in `GLOSSARY_TERMS` to find the definition. If the term isn't found, just render the children with no tooltip behavior.

**3. Update Glossary.jsx imports**

Change `app/pages/Glossary.jsx` to import `GLOSSARY_TERMS` from `../../lib/data/glossary.js` instead of defining the TERMS array inline. Rename uses of `TERMS` to `GLOSSARY_TERMS` (or alias it: `import { GLOSSARY_TERMS as TERMS }`).

### Non-goals
- Do NOT integrate GlossaryTooltip into any lesson pages yet (that's a follow-up task).
- Do not change the Glossary page layout or styling.
- Do not add complex positioning logic (simple centered-above is fine; edge cases can be handled later).

### Acceptance criteria
- [ ] `lib/data/glossary.js` exports `GLOSSARY_TERMS` with all terms from Glossary.jsx
- [ ] `app/pages/Glossary.jsx` imports from the shared data file (no duplicate data)
- [ ] `components/GlossaryTooltip.jsx` renders an inline button with dotted underline
- [ ] Hovering/focusing shows a tooltip with term definition
- [ ] Tooltip has enter/exit animation (150ms)
- [ ] Tooltip is accessible: `role="tooltip"`, keyboard navigable, focus-visible
- [ ] Unknown terms render children without tooltip
- [ ] "See glossary →" link in tooltip navigates to `/glossary`
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Verify Glossary page still works correctly with imported data
3. The component can be tested by temporarily adding `<GlossaryTooltip term="qubit">qubit</GlossaryTooltip>` in any lesson (but don't commit this — just verify it works)

### Constraints
- Create only the 2 new files + update Glossary.jsx imports
- Keep the tooltip simple — no complex repositioning or collision detection
- Follow existing component patterns (functional component, Framer Motion, Tailwind)
