# agent.md — Current Codex Task

## TASK-012: Module completion celebration animation

### Why this task now
CLAUDE.md specifies a "confetti-style scale + opacity burst, 600ms" celebration animation when a module is completed for the first time. Currently, clicking "Mark as Complete" instantly swaps to a static "Module complete." message with no visual reward. This is a key feedback moment in the Khan Academy-inspired learning model — the learner deserves a satisfying confirmation.

### Relevant project standards from CLAUDE.md
- Motion table: "Module celebration — confetti-style scale + opacity burst — 600ms"
- Respect `prefers-reduced-motion` (already handled by `MotionConfig reducedMotion="user"` wrapping the app)
- Never animate > 1 element simultaneously unless they are part of the same semantic unit
- Feedback immediacy: every tap gets visual feedback < 150ms
- Confirmatory feedback: success state obvious (green, icon, message)
- Copy: "Module complete."

### Files involved
- `components/ModuleLayout.jsx` — the only file that needs changes

### Requirements

**1. Import Framer Motion**

Add `import { motion, AnimatePresence } from 'framer-motion'` to the imports.

**2. Track "just completed" state**

Add a `useState` to track whether the user just clicked "Mark as Complete" in this session (as opposed to returning to an already-completed module):

```jsx
const [justCompleted, setJustCompleted] = useState(false)
```

Update the button handler to set this state:
```jsx
onClick={() => { markDone(moduleId); setJustCompleted(true) }}
```

**3. Animate the completion message**

Replace the current static "Module complete." div (~line 160-164) with an animated version that plays only when `justCompleted` is true. When revisiting an already-completed module, show the static version (no animation).

Use `AnimatePresence` with `mode="wait"` to animate the transition from button → completion message:

```jsx
<AnimatePresence mode="wait">
  {!done ? (
    <motion.button
      key="mark-complete"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      onClick={() => { markDone(moduleId); setJustCompleted(true) }}
      className="btn-primary focus-visible:outline focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    >
      <CheckCircle className="w-4 h-4" />
      Mark as Complete
    </motion.button>
  ) : (
    <motion.div
      key="completed"
      initial={justCompleted ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={justCompleted ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0 }}
      className="flex items-center gap-2 text-green-400 font-medium"
    >
      <CheckCircle className="w-5 h-5" />
      Module complete.
    </motion.div>
  )}
</AnimatePresence>
```

The ease curve `[0.34, 1.56, 0.64, 1]` creates an overshoot/bounce effect (scale goes slightly past 1 then settles), giving the "burst" feel specified in CLAUDE.md.

**4. Add celebratory particles (optional but encouraged)**

For the "confetti-style" aspect, add 4-6 small decorative dots that burst outward from the completion message and fade out. These should be absolutely positioned, animate outward with opacity 1→0 and scale, and use green/emerald colors.

A simple approach using Framer Motion:
```jsx
{justCompleted && done && (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 1, scale: 0 }}
        animate={{
          opacity: 0,
          scale: 1,
          x: Math.cos((i / 6) * Math.PI * 2) * 40,
          y: Math.sin((i / 6) * Math.PI * 2) * 40,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-1/2 left-4 w-2 h-2 rounded-full bg-green-400"
      />
    ))}
  </div>
)}
```

Position the particle container `relative` on the parent wrapper so particles burst from the completion message area.

### Non-goals
- Do not change the "Mark as Complete" logic or useProgress hook.
- Do not add sound effects.
- Do not change the "Next module" link behavior.
- Do not touch any other component.
- Do not animate on page load for already-completed modules (only on first completion in-session).

### Acceptance criteria
- [ ] Clicking "Mark as Complete" triggers a scale+opacity animation on the success message
- [ ] The animation has a satisfying bounce/burst feel (~600ms)
- [ ] Decorative particles burst outward and fade (confetti-style)
- [ ] Revisiting an already-completed module shows static "Module complete." with no animation
- [ ] Particles are `aria-hidden` and `pointer-events-none`
- [ ] Animation respects `prefers-reduced-motion` via the existing MotionConfig wrapper
- [ ] No layout shift during animation
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Open any incomplete module, complete all quizzes, click "Mark as Complete"
3. Verify the button animates out, the success message scales in with bounce, and particles burst
4. Navigate away and back — verify static "Module complete." with no animation
5. In browser devtools, set `prefers-reduced-motion: reduce` — verify no animation plays

### Constraints
- Touch only `components/ModuleLayout.jsx`
- Keep the animation tasteful and brief (not distracting)
- All particle elements must be decorative (aria-hidden)
