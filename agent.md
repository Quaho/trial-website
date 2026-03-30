# agent.md — Current Codex Task

## TASK-019: Phase 2 — Structure (Navigation, Page Template Components, References Page)

### Why this task now
Phase 1 established the new SIGQuantum identity. Phase 2 creates the structural foundation: reorganized navigation that reflects the handbook's topic structure, reusable content block components for handbook pages, and a References page. These are prerequisites for Phase 3 (content rewriting).

### Relevant project standards from CLAUDE.md
- Navigation: calm, predictable, hierarchical. Must support linear reading order and direct topic access.
- Section template: title, prerequisites, definitions, main explanation, worked example, common confusion, key takeaways, next section
- Component architecture lists: DefinitionBox, NotationBox, ExampleBox, RemarkBox, PrereqList
- References page: curated external readings, Qiskit docs, textbooks, refreshers
- Suggested topic sequence: Part I Foundations, Part II Mathematical Language, Part III States and Operators, Part IV Circuits and Measurement, Part V Qiskit Preparation, Part VI Paths Forward

### Files to modify
1. `lib/data/modules.js` — update NAV_GROUPS to reflect handbook structure
2. `components/Navbar.jsx` — update desktop nav extras (Roadmap label, add References link)
3. `app/App.jsx` — add route for References page
4. `app/pages/References.jsx` — **new file**, curated references page

### Files to create (new components)
5. `components/DefinitionBox.jsx` — formal definition callout
6. `components/NotationBox.jsx` — notation/symbol explanation callout
7. `components/ExampleBox.jsx` — worked example block
8. `components/RemarkBox.jsx` — clarifying remark or caveat
9. `components/PrereqList.jsx` — prerequisites list for a page

### Requirements

#### 1. lib/data/modules.js — Update NAV_GROUPS

Replace the current 3 groups:
```js
export const NAV_GROUPS = [
  { label: 'Foundations', group: 'foundations' },
  { label: 'Circuits',    group: 'circuits'    },
  { label: 'Advanced',    group: 'advanced'    },
]
```

With 4 groups that better reflect the handbook's topic structure:
```js
export const NAV_GROUPS = [
  { label: 'Foundations',   group: 'foundations' },
  { label: 'Gates & Circuits', group: 'circuits' },
  { label: 'Advanced',     group: 'advanced'    },
]
```

Actually, keep the groups as-is but rename the second label from `'Circuits'` to `'Gates & Circuits'`. The module grouping by `group` field stays the same — modules are already well-grouped. Just the display label changes.

#### 2. components/Navbar.jsx — Update nav extras

In the desktop nav "extras" section (after the group dropdowns and the divider):
- Change the Roadmap link label from `'Roadmap'` to `'Study Paths'` (the route `/roadmap` stays the same)
- Add a References link: `{ to: '/references', icon: BookOpen, label: 'References' }` — place it after Glossary

In the mobile nav "Explore" section:
- Change `'Course Roadmap'` label to `'Study Paths'` (if not already changed in Phase 1 — verify first)
- Add `{ to: '/references', label: 'References' }` after Glossary

Note: Do NOT remove or change the `useProgress` import if it was already removed in Phase 1. Just check the current state of the file and make only the changes described above.

#### 3. app/App.jsx — Add References route

Add a lazy import for References:
```js
const References = lazy(() => import('./pages/References'))
```

Add a route alongside the glossary route:
```jsx
<Route path="/references" element={<References />} />
```

#### 4. app/pages/References.jsx — New file

Create a curated references page following the handbook style. Structure:

- Page title: "References & Further Reading"
- Short intro paragraph explaining the page's purpose
- Organized into sections:

**Section 1 — Textbooks and Course Notes**
- Nielsen & Chuang, *Quantum Computation and Quantum Information* — the standard graduate reference
- Yanofsky & Mannucci, *Quantum Computing for Computer Scientists* — accessible for CS students
- Mermin, *Quantum Computer Science: An Introduction* — concise and mathematically careful
- Kaye, Laflamme & Mosca, *An Introduction to Quantum Computing* — balanced theory and applications

**Section 2 — Online Resources**
- IBM Qiskit Textbook (learning.quantum.ibm.com) — interactive, code-first introduction
- Qiskit Documentation (docs.quantum.ibm.com) — API reference and tutorials
- Brilliant.org Quantum Computing course — visual, interactive fundamentals
- MIT OpenCourseWare 8.370x — rigorous university-level course

**Section 3 — Mathematical Background**
- 3Blue1Brown, *Essence of Linear Algebra* (YouTube) — visual linear algebra refresher
- Axler, *Linear Algebra Done Right* — clean theoretical treatment
- Khan Academy Linear Algebra — free, structured review

**Section 4 — Tools**
- Qiskit (qiskit.org) — open-source quantum SDK
- Quirk (algassert.com/quirk) — drag-and-drop circuit simulator
- IBM Quantum Composer — visual circuit builder with real hardware access

Style:
- Use `max-w-3xl mx-auto px-4 sm:px-6` for content width
- Each section: H2 heading, then a list of items
- Each item: resource name (bold/semibold, text-white), dash, short description (text-slate-400)
- Items in cards: `bg-slate-900 border border-slate-800 rounded-xl p-5` with a small vertical gap between items
- Back-to-home link at the bottom
- Do NOT use Framer Motion — keep static
- Import only Link from react-router-dom and ChevronLeft from lucide-react

#### 5–9. Reusable content block components

Create these 5 components. They will be used in module pages during Phase 3. Each should be simple, semantic, and visually distinct.

**All components share these principles:**
- Accept `children` as the main content
- Use semantic HTML
- Use the existing dark theme (slate-900 backgrounds, slate-800 borders)
- Use clear visual differentiation (left border color, icon, label)
- Accessible: proper heading levels or ARIA roles
- No Framer Motion — keep static
- Keep them small and focused (under 40 lines each)

**5. components/DefinitionBox.jsx**
```jsx
// Props: term (string), children (JSX)
// Visual: indigo left border, "Definition" label, term in bold, then content
// Style: rounded-xl border-l-4 border-l-indigo-500 border border-slate-800 bg-slate-900 p-5
```

Example usage:
```jsx
<DefinitionBox term="Qubit">
  A qubit is the fundamental unit of quantum information...
</DefinitionBox>
```

Render:
- Small "Definition" label (text-xs, uppercase, tracking-widest, text-indigo-400, mb-2)
- Term as h4 or strong (font-semibold, text-white, mb-2)
- Children as body text (text-slate-300, text-sm, leading-relaxed)

**6. components/NotationBox.jsx**
```jsx
// Props: symbol (string, optional), children (JSX)
// Visual: violet left border, "Notation" label
// Style: rounded-xl border-l-4 border-l-violet-500 border border-slate-800 bg-slate-900 p-5
```

Render:
- "Notation" label (text-xs, uppercase, tracking-widest, text-violet-400, mb-2)
- If symbol provided, show it in monospace (font-mono, text-white, text-lg, mb-2)
- Children as explanation (text-slate-300, text-sm, leading-relaxed)

**7. components/ExampleBox.jsx**
```jsx
// Props: title (string, optional, default "Worked Example"), children (JSX)
// Visual: emerald left border, title label
// Style: rounded-xl border-l-4 border-l-emerald-500 border border-slate-800 bg-slate-900 p-5
```

Render:
- Title label (text-xs, uppercase, tracking-widest, text-emerald-400, mb-3)
- Children as content (text-slate-300, text-sm, leading-relaxed)

**8. components/RemarkBox.jsx**
```jsx
// Props: children (JSX)
// Visual: amber left border, "Remark" label
// Style: rounded-xl border-l-4 border-l-amber-500 border border-slate-800 bg-slate-900 p-5
```

Render:
- "Remark" label (text-xs, uppercase, tracking-widest, text-amber-400, mb-2)
- Children as content (text-slate-300, text-sm, leading-relaxed)

**9. components/PrereqList.jsx**
```jsx
// Props: items (array of strings), children (optional JSX for extra context)
// Visual: clean list with check icons
// Style: rounded-xl border border-slate-800 bg-slate-900 p-5
```

Render:
- "Prerequisites" label (text-xs, uppercase, tracking-widest, text-slate-500, mb-3)
- Unordered list of items, each with a small circle bullet or dash
- Items as text-slate-300, text-sm
- Optional children rendered below the list

### Non-goals
- Do NOT modify any module page content (Intuition.jsx, BraKet.jsx, etc.)
- Do NOT modify Home.jsx, ModuleLayout.jsx, or ProjectLayout.jsx
- Do NOT modify glossary.js, projects.js
- Do NOT change existing module `group` assignments in modules.js
- Do NOT add new dependencies
- Do NOT change the Tailwind config

### Acceptance criteria
- [ ] NAV_GROUPS second label reads "Gates & Circuits"
- [ ] Desktop nav shows "Study Paths" and "References" links
- [ ] Mobile nav shows "Study Paths" and "References" in Explore section
- [ ] `/references` route works and shows curated references page
- [ ] References page has 4 sections with curated resources
- [ ] DefinitionBox, NotationBox, ExampleBox, RemarkBox, PrereqList components exist and export correctly
- [ ] Each content block component uses the specified left-border color and label
- [ ] `npm run build` passes with no errors

### Verification steps
1. `npm run build` — must pass
2. Navigate to `/references` — see curated references page with 4 sections
3. Check navbar desktop — "Gates & Circuits" dropdown label, "Study Paths" link, "References" link
4. Check navbar mobile — "Study Paths" and "References" in Explore section
5. Verify component files exist: `ls components/DefinitionBox.jsx components/NotationBox.jsx components/ExampleBox.jsx components/RemarkBox.jsx components/PrereqList.jsx`

### Constraints
- Only modify/create the files listed above
- Follow existing code patterns (Tailwind classes, component structure)
- Keep all accessibility features
- Components should be simple — no state management, no Framer Motion
