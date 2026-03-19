# agent.md — Current Codex Task

## TASK-015: Mobile polish audit — fix layout issues at 375px

### Why this task now
All features are built. Before deploying, we need to ensure every page looks clean at 375px (iPhone SE / small Android). A code audit found several overflow, sizing, and touch-target issues.

### Fixes required

**1. Home page orbs — prevent horizontal scroll** (`app/pages/Home.jsx`)
The decorative orbs (`w-[480px]`, `w-[320px]`, `w-[260px]`) are larger than 375px. The parent has `overflow-hidden` which clips them, so they don't cause horizontal scroll — but verify this. If the parent container ever loses `overflow-hidden`, they would overflow. Add responsive sizes for safety:
- `w-[260px] sm:w-[480px]` (first orb)
- `w-[200px] sm:w-[320px]` (second orb)
- `w-[160px] sm:w-[260px]` (third orb)
Apply same height changes.

**2. Roadmap page orbs — same fix** (`app/pages/Roadmap.jsx`)
Apply the same responsive orb sizing pattern. Find the decorative orbs and add `sm:` responsive sizes.

**3. Grover amplitude bars — tighter on mobile** (`app/pages/Algorithms.jsx`)
The 8-bar amplitude visualization uses `max-w-[40px]` per bar. At 375px with padding, this is tight. Change to:
- `max-w-[28px] sm:max-w-[40px]` on each bar

**4. StepNav tooltip overflow** (`components/StepNav.jsx`)
The locked-lesson tooltip uses `whitespace-nowrap` which can overflow on 375px. Change to:
- `whitespace-nowrap` → `whitespace-normal max-w-[200px] text-center` for the tooltip
- This lets long text like "Finish lesson 4 first" wrap on narrow screens

**5. CodeBlock copy button — bigger touch target on mobile** (`components/CodeBlock.jsx`)
The copy button uses `px-2 py-1` making it ~24px tall, below the 44px touch minimum. Change to:
- `px-2.5 py-2 sm:px-2 sm:py-1` — larger on mobile, compact on desktop
- Keep the `-my-0.5` for desktop alignment but use `sm:-my-0.5 -my-0` for mobile

**6. Phase gate visual — stack on mobile** (`app/pages/Gates.jsx`)
The Z-gate visual at ~line 300 uses a flex row with `w-44 h-44 flex-shrink-0` SVG next to description text. On 375px this is too cramped. Change the container to:
- `flex flex-col sm:flex-row items-center gap-4 sm:gap-6`
- Change SVG from `w-44 h-44 flex-shrink-0` to `w-32 h-32 sm:w-44 sm:h-44 flex-shrink-0`

**7. Navbar dropdown width** (`components/Navbar.jsx`)
The desktop dropdown is `w-56` (224px). On mobile, the hamburger menu is used instead, so this only affects tablets. However, ensure the mobile hamburger menu items have adequate touch targets:
- Verify all mobile menu links have at least `py-2.5` or `min-h-[44px]`

**8. Circuit diagram SVGs — add max-height** (`app/pages/Circuits.jsx`)
Circuit diagrams with wide aspect ratios compress vertically on mobile. For any SVG with a very wide viewBox (e.g., `viewBox="0 0 440 160"`), wrap in a container with:
- `max-h-[140px] sm:max-h-none` to prevent them from becoming too flat

### Non-goals
- Do NOT change any lesson text, quiz content, or glossary data
- Do NOT restructure page layouts — only adjust sizing/spacing/responsiveness
- Do NOT add new components or files
- Do NOT change desktop appearance — all fixes should use `sm:` or mobile-first responsive classes

### Acceptance criteria
- [ ] Decorative orbs use responsive widths on Home and Roadmap pages
- [ ] Grover amplitude bars fit within 375px without overflow
- [ ] StepNav tooltip wraps instead of overflowing
- [ ] CodeBlock copy button meets 44px touch target on mobile
- [ ] Phase gate visual stacks vertically on mobile
- [ ] Mobile nav links have adequate touch targets
- [ ] Circuit SVGs don't compress too flat on mobile
- [ ] Build passes (`npm run build`)
- [ ] No visible horizontal scrollbar at 375px on any page

### Verification steps
1. `npm run build` — must pass
2. Open browser DevTools, set viewport to 375×667 (iPhone SE)
3. Check `/` — no horizontal scroll, orbs don't overflow, continue button fits
4. Check `/gates` — Z-gate visual stacks on mobile
5. Check `/algorithms` — Grover bars fit
6. Check `/circuits` — diagram not too compressed
7. Check any module with StepNav — locked tooltip wraps properly

### Constraints
- Mobile-first responsive approach: fix mobile, keep desktop unchanged
- Only modify existing files — no new files
- Keep changes minimal and targeted
