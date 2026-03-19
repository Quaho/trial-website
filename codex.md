# codex.md

## Authority model

1. `agent.md` = current assigned task
2. `CLAUDE.md` = project source of truth
3. `codex.md` = Codex operating rules
4. existing codebase patterns = implementation reference

## Interpretation rules

- Follow `agent.md` for the exact task to implement.
- Follow `CLAUDE.md` for design, pedagogy, architecture, accessibility, and product standards.
- Follow `codex.md` for behavior, scope discipline, verification, and response format.
- If `agent.md` appears to conflict with `CLAUDE.md`, prefer the narrower task only if it does not violate the project's core standards.
- If there is a serious conflict, implement conservatively and call it out in the handoff summary for Claude review.
