# agent.md — Current Codex Task

## TASK-009: Navbar accessibility — focus-visible outlines + Escape key handling

### Why this task now
The Navbar is present on every page and has multiple interactive elements with no `focus-visible` outlines and no keyboard dismiss (Escape) behavior. This is the last major component missing focus ring coverage, and Escape-to-close is a standard a11y expectation for menus.

### Relevant project standards from CLAUDE.md
- Every interactive element must have: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Focus ring color: `indigo-400` (nav uses indigo as primary accent)
- Mobile nav open: `height 0→auto` slide down, 200ms
- All interactive elements keyboard navigable

### Files involved
- `components/Navbar.jsx` — the only file that needs changes

### Requirements

**1. Add focus-visible outlines to these elements:**

- **Mobile hamburger button (~line 157)**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`
- **Desktop "Home" link (~line 101)**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400` (it's a Link styled as a button)
- **Desktop dropdown trigger buttons (~line 28 in NavDropdown)**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`
- **Desktop dropdown menu links (~line 53 in NavDropdown)**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400` (inside the dropdown panel)
- **Desktop Roadmap/Glossary links (~line 130)**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`
- **Mobile menu links** (~lines 195, 230, 264): Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`
- **Mobile group expand buttons (~line 212)**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`

**2. Add Escape key handling:**

- When the **mobile menu** is open, pressing Escape should close it (`setOpen(false)`).
- When a **desktop NavDropdown** is open, pressing Escape should close it (`setOpen(false)`).
- Use a `useEffect` with a `keydown` event listener for the mobile menu (in the main `Navbar` component).
- Use a `useEffect` or `onKeyDown` on the dropdown wrapper for NavDropdown.

### Non-goals
- Do not change nav layout, animation, or routing logic.
- Do not change the dropdown positioning or styling.
- Do not add focus trapping (just Escape dismiss).
- Do not touch any other component.

### Acceptance criteria
- [ ] All interactive elements in Navbar show focus rings on keyboard Tab
- [ ] Pressing Escape closes the mobile menu when open
- [ ] Pressing Escape closes a desktop dropdown when open
- [ ] Focus rings use indigo-400
- [ ] No visual change to mouse/touch interactions
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. Tab through the desktop nav — verify focus rings on Home, dropdowns, Roadmap, Glossary
3. Open a dropdown, press Escape — verify it closes
4. At mobile width, Tab to hamburger — verify focus ring
5. Open mobile menu, press Escape — verify it closes
6. Tab through mobile menu links — verify focus rings

### Constraints
- Touch only `components/Navbar.jsx`
- Keep the diff focused on adding classes and the Escape handler
- Do not add new props or change the component API
