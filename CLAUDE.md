# Letsgo: agency-grade websites

This repo is set up to build websites that look like a professional studio designed them.

## Default workflow
For any website, landing page, redesign or UI polish request, use the **`agency-website`**
skill (`.claude/skills/agency-website/SKILL.md`). It runs the phases Intake → Direction →
Build → Motion → Verify → Polish → Ship and decides which installed skill leads.

## Installed skills (see SKILLS.md for sources and licences)
- `design-taste-frontend`: Taste Skill; leads marketing/company/place/product sites
- `impeccable`: leads apps/dashboards/docs; owns critique, audit, polish and refinement commands
- Emil Kowalski skills: `emil-design-eng`, `animate`, `choreograph`, `review-animations`,
  `improve-animations`, `find-animation-opportunities`, `remove-animations`,
  `animation-performance`, `animation-vocabulary`, `apple-design`, `gestures`, `break-ui`,
  `mobile-native`, `pick-ui-library`, `prototype`, `learn-taste`
- `frontend-design`: Anthropic's background design principles
- `webapp-testing`: Anthropic's Playwright testing toolkit

## MCP servers
- **Playwright MCP** (`.mcp.json`): a real browser to open, click, resize and screenshot pages.
- **Figma MCP**: a user connector (claude.ai). Use it for Figma URLs (design → code) and to
  push comps into Figma for client review (code → design).

## Rules
- Never call a page finished without screenshots at 1440 / 1024 / 768 / 390
  (`node .claude/skills/agency-website/scripts/shots.mjs <file-or-url>`), looked at and fixed.
- No lorem ipsum, no empty image frames, no generic "AI" defaults (Inter + purple gradient +
  three rounded cards).
- Every site lives in its own folder under `sites/<client-slug>/`.
