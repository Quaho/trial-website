# agent.md — Current Codex Task

## TASK-011: Mobile polish — Home page hero CTA and module card tap targets

### Why this task now
The Home page is the first thing every user sees. On mobile (375px), two issues reduce polish:
1. The hero "Continue — {module title}" CTA can overflow when the module name is long (e.g., "Phase & Measurement Angles"), causing horizontal scroll or text wrapping awkwardly.
2. The module cards have a small text-only CTA ("Start →") that could be easier to tap by making the entire card a tap target.

### Relevant project standards from CLAUDE.md
- Mobile: tap targets >= 44px
- Buttons: `rounded-xl`
- CTA copy: "Start →" / "Continue →" / "Review →"
- Never cramped — generous padding
- Spacing rhythm: card padding `p-5 sm:p-6`

### Files involved
- `app/pages/Home.jsx` — the only file that needs changes

### Requirements

**1. Truncate long module names in hero CTA on mobile**

The hero "Continue" button (~line 108) shows `Continue — {nextModule.title}`. On mobile, long titles overflow.

Fix: On small screens, truncate the title. Change the Link to:
```jsx
<Link to={nextModule.to} className="btn-primary text-base px-7 py-3 group max-w-full">
  <span className="truncate">Continue — {nextModule.title}</span>
  <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
</Link>
```
Key changes: add `max-w-full` to the Link, wrap text in `<span className="truncate">`, add `flex-shrink-0` to the arrow icon.

**2. Make unlocked module cards tappable as a whole**

Currently, only the small "Start →" / "Continue →" text is clickable. On mobile, users expect to tap the whole card.

Wrap the entire module card content in a Link (for unlocked modules) or keep it as a div (for locked modules). The card container (~line 175) should become:

For unlocked modules: wrap with `<Link to={m.to}>` and add `cursor-pointer` to the card classes.
For locked modules: keep as `<div>`.

Use this approach:
```jsx
const CardWrapper = isLocked ? 'div' : Link
const cardProps = isLocked ? {} : { to: m.to }
```
Then use `<CardWrapper {...cardProps} className={...}>`.

**Important**: If wrapping with Link, the existing small CTA link inside can either be removed or changed to a `<span>` to avoid nested links (which is invalid HTML). Change the CTA from a `<Link>` to a `<span>` when the card is already a link.

**3. Add focus-visible to the card wrapper**

When the card becomes a Link, add:
```
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400
```

### Non-goals
- Do not change the card visual design, layout, or content.
- Do not change locked card behavior.
- Do not change the "How each lesson works" section.
- Do not touch any other page or component.

### Acceptance criteria
- [ ] Hero "Continue" CTA truncates gracefully on 375px without horizontal overflow
- [ ] Unlocked module cards are fully tappable (the entire card navigates)
- [ ] No nested `<a>` tags (invalid HTML)
- [ ] Locked cards remain non-interactive
- [ ] Card focus-visible outline appears on keyboard Tab
- [ ] No layout changes on desktop
- [ ] Build passes

### Verification steps
1. `npm run build` — must pass
2. View Home page at 375px width — verify hero CTA doesn't overflow
3. Set a long module name in progress — verify truncation works
4. Tap/click an unlocked module card — verify it navigates to the module
5. Verify locked cards are not clickable
6. Tab through module cards — verify focus ring
7. Verify no nested anchor warnings in browser console

### Constraints
- Touch only `app/pages/Home.jsx`
- Keep the diff focused on the CTA and card wrapper changes
- Do not add new dependencies
