# agent.md — Current Codex Task

## TASK-006: Use module accent colors for LessonCard numbered bullets

### Why this task now
The "Key ideas" numbered bullets in LessonCard are hardcoded to indigo (`bg-indigo-900/60 border-indigo-700/50 text-indigo-400`) regardless of which module the user is in. Per CLAUDE.md, each module has a distinct accent color that should be used for numbered bullets. This is a design consistency gap visible on every lesson across all 13 modules.

### Relevant project standards from CLAUDE.md
From the Module Color Map:
```
bullet: 'bg-indigo-900/60 border-indigo-700/50 text-indigo-400'   (Module 1)
bullet: 'bg-violet-900/60 border-violet-700/50 text-violet-400'   (Module 2)
bullet: 'bg-purple-900/60 border-purple-700/50 text-purple-400'   (Module 3)
...etc per module accent color
```

### Files involved
1. `lib/data/modules.js` — add `bullet` field to `MODULE_LAYOUT_STYLES`
2. `components/LessonCard.jsx` — accept and use a `bulletStyle` prop
3. All 13 module pages in `app/pages/` — pass `bulletStyle` to `<LessonCard>`

### Requirements

**Step 1: Add `bullet` to `MODULE_LAYOUT_STYLES` in `lib/data/modules.js`**

Add a `bullet` field to each entry following this pattern (full Tailwind class strings for JIT):
```js
intuition:    { ..., bullet: 'bg-indigo-900/60 border-indigo-700/50 text-indigo-400' },
braket:       { ..., bullet: 'bg-violet-900/60 border-violet-700/50 text-violet-400' },
phase:        { ..., bullet: 'bg-purple-900/60 border-purple-700/50 text-purple-400' },
qiskit:       { ..., bullet: 'bg-fuchsia-900/60 border-fuchsia-700/50 text-fuchsia-400' },
gates:        { ..., bullet: 'bg-sky-900/60 border-sky-700/50 text-sky-400' },
multiqubit:   { ..., bullet: 'bg-cyan-900/60 border-cyan-700/50 text-cyan-400' },
entanglement: { ..., bullet: 'bg-teal-900/60 border-teal-700/50 text-teal-400' },
circuits:     { ..., bullet: 'bg-emerald-900/60 border-emerald-700/50 text-emerald-400' },
measurement:  { ..., bullet: 'bg-amber-900/60 border-amber-700/50 text-amber-400' },
algorithms:   { ..., bullet: 'bg-orange-900/60 border-orange-700/50 text-orange-400' },
labs:         { ..., bullet: 'bg-rose-900/60 border-rose-700/50 text-rose-400' },
noise:        { ..., bullet: 'bg-slate-800/60 border-slate-600/50 text-slate-400' },
usecases:     { ..., bullet: 'bg-lime-900/60 border-lime-700/50 text-lime-400' },
```

**Step 2: Update `components/LessonCard.jsx`**

Add an optional `bulletStyle` prop (string). Default to the current indigo if not provided:
```js
const defaultBullet = 'bg-indigo-900/60 border-indigo-700/50 text-indigo-400'
```

Replace the hardcoded indigo classes on the bullet `<span>` (currently line 67-68) with:
```jsx
className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${bulletStyle || defaultBullet}`}
```

**Step 3: Pass `bulletStyle` from each module page**

In each module page file, import `MODULE_LAYOUT_STYLES` from the data file (if not already imported) and pass the bullet style to LessonCard:
```jsx
<LessonCard
  lesson={lesson}
  lessonIndex={step}
  totalLessons={LESSONS.length}
  isPassed={passed[step]}
  onPass={handleQuizPass}
  bulletStyle={MODULE_LAYOUT_STYLES.intuition.bullet}  // use the correct module key
/>
```

The module pages and their keys:
- Intuition.jsx → `intuition`
- BraKet.jsx → `braket`
- PhaseAngle.jsx → `phase`
- Qiskit.jsx → `qiskit`
- Gates.jsx → `gates`
- MultiQubit.jsx → `multiqubit`
- Entanglement.jsx → `entanglement`
- Circuits.jsx → `circuits`
- Measurement.jsx → `measurement`
- Algorithms.jsx → `algorithms`
- Labs.jsx → `labs`
- Noise.jsx → `noise`
- UseCases.jsx → `usecases`

### Non-goals
- Do not change lesson content, quiz logic, or visual layout.
- Do not change the bullet size, font, or shape — only the color classes.
- Do not modify any component other than LessonCard.

### Acceptance criteria
- [ ] Each module's "Key ideas" bullets use that module's accent color
- [ ] LessonCard defaults gracefully to indigo if no bulletStyle is passed
- [ ] All 13 module pages pass the correct bulletStyle
- [ ] No visual layout changes — only color differences
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Open Module 1 (Intuition) — bullets should be indigo (same as before)
3. Open Module 2 (BraKet) — bullets should be violet
4. Open Module 5 (Gates) — bullets should be sky blue
5. Spot-check 2-3 more modules for correct accent colors

### Constraints
- All Tailwind classes must be full static strings (no dynamic concatenation) for JIT
- Keep LessonCard's default backward-compatible
- Diff should be moderate: ~1 line per module page + small changes to LessonCard and modules.js
