# SPEC.md — Supplementary Product/UX Guidance

## Interaction State Standards

Every interactive element must show all four states per CLAUDE.md:
- Hover: subtle color shift (150ms)
- Focus: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- Active/Press: `active:scale-[0.99]`
- Disabled: `opacity-40 cursor-not-allowed`

Quiz choice buttons are the highest-frequency interactive element (used in every lesson checkpoint). They must meet all four states.

## Quiz Focus Ring Color Logic

- Default (unsubmitted): `focus-visible:outline-indigo-400`
- Correct answer revealed: `focus-visible:outline-green-400`
- Wrong answer revealed: `focus-visible:outline-red-400`

Keep focus rings simple — match the border color state the choice is already showing.
