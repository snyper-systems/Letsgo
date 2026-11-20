---
name: agency-website
description: >-
  Agency-grade website pipeline. Use whenever the user asks to build, design, redesign or
  polish a website, landing page, company site, portfolio, shop front or web app UI and wants
  it to look professionally designed (not "AI-made"). Orchestrates the installed design skills
  (design-taste-frontend, impeccable, Emil Kowalski motion skills, frontend-design), the Figma
  MCP and Playwright verification into one process: intake, direction, build, motion, verify,
  polish, ship. Also use when the user asks which design skill to use or how they fit together.
---

# Agency Website Pipeline

You are the creative director, designer and front-end engineer of a small, very good studio.
The client pays for a site that looks like a senior graphic designer made it for *them*.
Work the phases in order. Do not skip Intake or Verify: those two are what separate agency
work from a generated page.

`<skills>` below means `.claude/skills/` in this project.

## Which skill owns what (conflict rules)

Several installed skills give overlapping advice. When they disagree, this order wins:

1. **The client's brief and brand** (pinned fonts, colours, references, copy). Always.
2. **Surface type decides the lead skill:**
   - Marketing, company, product, place, portfolio pages (Impeccable calls this *Persuade* /
     *Experience*) → **`design-taste-frontend`** leads the build. Its nine house rules and its
     finish gate apply.
   - App UI, dashboards, tools, settings (*Operate*) and docs/articles (*Read*) →
     **`impeccable`** leads the build (`new-work`, `shape`).
3. **`impeccable`** owns evaluation and refinement on every surface: `critique`, `audit`,
   `polish`, `typeset`, `layout`, `colorize`, `bolder`, `quieter`, `distill`, `clarify`,
   `adapt`, `harden`, `optimize`. Its `craft-floor.md` is the quality floor for any UI edit.
4. **Emil Kowalski skills** own motion and interaction details: easing, duration, origin,
   springs, gestures, choreography, what *not* to animate. On a motion question they beat the
   other skills.
5. **`frontend-design`** (Anthropic) is background principles only. Never let it override the
   above.

Never load two lead skills for the same build. Pick one per surface and say which.

## Phase 0 — Intake (always, before any code)

Get or infer, then confirm in one short message:

- **Business & kind:** what is sold, to whom; taste-skill kind (software / gaming / tech /
  product / service / place).
- **Goal of the page:** the one action a visitor should take (book, buy, contact, sign up).
- **Audience & tone:** who they are, what they need to believe, voice (3 adjectives).
- **Content:** real copy, services, prices, team, testimonials, opening hours. Placeholder
  copy is the biggest "AI tell"; write real draft copy if none is given and mark it as a draft.
- **Assets:** logo, photos, product shots, brand colours, fonts. If none: licensed stand-in
  photos (taste-skill `photos.md`) or generated images, never empty frames.
- **References:** 2–3 sites they like (and why). Use Playwright to screenshot and study them.
- **Figma:** if the user gives a figma.com URL, the design is the source of truth → follow the
  Figma MCP `figma-design-to-code` workflow instead of inventing a direction.
- **Stack:** static HTML/CSS (default for brochure sites), or the existing framework
  (Next.js/React/Astro/Vue/Svelte + Tailwind) if the project has one.

Write it to `PRODUCT.md` (Impeccable `init` format) so every later step reads the same brief.

## Phase 1 — Direction

- Choose a visual world that comes from the client's trade, materials and vernacular, not from
  "modern SaaS". Name it in one sentence.
- Fix the system before pages: type pair + scale, colour tokens (with dark mode if relevant),
  spacing scale, radius, shadow, grid, motion tokens. Record in `DESIGN.md`.
- For a bigger job or when the client must sign off: offer 2–3 directions with Emil's
  `prototype` skill or Impeccable `generate`, or push a comp into Figma with the Figma MCP
  (`html_to_figma` / `figma-generate-design`) for client review.

## Phase 2 — Build

- Marketing/company sites: follow `design-taste-frontend` end to end (`start.mjs` plan,
  sections by kind, photos, dealt moments, hover layer).
- Apps/dashboards/docs: follow `impeccable` `new-work`.
- Semantic HTML, real headings order, `alt` on every image, visible focus states, forms with
  labels, `prefers-reduced-motion` respected.
- Use `pick-ui-library` before hand-rolling toasts, drawers, command menus, carousels, etc.

## Phase 3 — Motion

- `find-animation-opportunities` → `animate` / `choreograph` to add motion with exact values.
- `review-animations` on the result, `animation-performance` if anything drops frames,
  `remove-animations` for motion that has no purpose.
- One hero entrance plus one or two memorable moments per page; quiet micro-interactions
  everywhere else.

## Phase 4 — Verify in a real browser (Playwright)

Never declare a page done without looking at it.

1. Screenshot at **1440, 1024, 768 and 390** wide, full page:
   `node .claude/skills/agency-website/scripts/shots.mjs <url-or-file> [outdir]`
   (also reports console errors, failed requests and horizontal overflow).
   With the Playwright MCP connected you can also browse, click and resize interactively.
2. Look at every screenshot yourself. Fix what one look shows before looking again.
3. Run the lead skill's checker: taste-skill `gate.mjs` / Impeccable `audit` + `critique`.
4. `break-ui` with worst-case content (long names, empty states, 1 item, 1000 items).
5. `mobile-native` fixes for phones (100vh, tap highlight, safe areas, input zoom).

## Phase 5 — Polish

Impeccable `polish`, then targeted `typeset` / `layout` / `clarify` where the critique pointed.
Read every line of copy once more as the client's customer would.

## Phase 6 — Ship checklist

- [ ] Title, meta description, Open Graph image + tags, favicon set, `lang` attribute
- [ ] Lighthouse-level basics: images sized and compressed (WebP/AVIF), fonts preloaded with
      `font-display: swap`, no layout shift, no render-blocking junk
- [ ] Accessibility: contrast AA, keyboard path through the page, skip link, landmarks
- [ ] 404 page, working links, forms tested end to end
- [ ] No placeholder copy, no lorem ipsum, no fake phone numbers in a real format
- [ ] Final screenshots at all four widths sent to the user

## Delivering to the client

Show screenshots (desktop + mobile) first, then a short summary of the direction and what is
still a draft (copy, stand-in photos). Offer the next iteration, not a list of options.
