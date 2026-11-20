# Webdesign-toolkit: overzicht

Alles wat Claude in deze repo gebruikt om websites op agency-niveau te bouwen.

## Hoe je het gebruikt
Vraag in een Claude Code-sessie in deze repo bijvoorbeeld:

> "Bouw een website voor [bedrijf]: [wat ze doen], doelgroep [x], doel: [afspraak maken]."

Claude volgt dan automatisch de **`agency-website`**-skill:

| Fase | Wat er gebeurt | Welke skill |
|---|---|---|
| 0. Intake | Bedrijf, doel, doelgroep, content, assets en referenties vastleggen in `PRODUCT.md` | agency-website, impeccable `init` |
| 1. Richting | Visuele wereld, typografie, kleuren en tokens vastleggen in `DESIGN.md`, eventueel 2–3 richtingen | impeccable, `prototype`, Figma MCP |
| 2. Bouwen | Marketing- en bedrijfssites via Taste Skill; apps en dashboards via Impeccable | design-taste-frontend / impeccable |
| 3. Motion | Animaties met de juiste easing en timing, en zonder overbodige beweging | Emil Kowalski-skills |
| 4. Controle | Screenshots op 1440/1024/768/390, console-errors, gate, audit, break-ui | Playwright, shots.mjs, webapp-testing |
| 5. Polish | Laatste ronde op typografie, ritme en copy | impeccable `polish` |
| 6. Opleveren | SEO, OG-image, toegankelijkheid, performance, 404 | checklist in agency-website |

Losse commando's: `/impeccable critique`, `/impeccable polish`, `/impeccable audit`,
`/review-animations`, `/break-ui`, `/prototype`, enz.

## Geïnstalleerd

| Skill / tool | Bron (upstream commit) | Licentie |
|---|---|---|
| `design-taste-frontend` (Taste Skill 2.5) | github.com/Leonxlnx/taste-skill (`f6b7657`) | MIT |
| `impeccable` 4.10 | github.com/pbakaus/impeccable (`b49177d`) | Apache-2.0 |
| 16 Emil Kowalski-skills | github.com/emilkowalski/skill (`64eb3de`) | MIT |
| `frontend-design`, `webapp-testing` | github.com/anthropics/skills (`e4bb5d9`) | Apache-2.0 |
| `agency-website` + `shots.mjs` | zelf geschreven voor deze repo | — |
| Playwright MCP 0.0.84 | npm `@playwright/mcp` (via `.mcp.json`) | Apache-2.0 |
| Figma MCP | claude.ai-connector (al gekoppeld aan je account) | — |

**Bewust niet opgenomen:** UI/UX Pro Max en `design-motion-principles` (overlappen met
Taste/Impeccable en Emil, en meer regels die elkaar tegenspreken maken de output slechter), en
de Emil-skills voor Swift, Expo en Sonner (niet voor web).

## Let op: scripts die automatisch draaien
- **Taste Skill** heeft een *Stop-hook*: na elke beurt waarin die skill actief is, draait
  automatisch `scripts/gate.mjs` (de kwaliteitscontrole in een echte browser). Dat is zo bedoeld,
  maar het is code die zonder aparte vraag uitgevoerd wordt.
- **Impeccable** downloadt bij het eerste gebruik een eigen binary (`scripts/impeccable`).
- Beide hebben Node 22+ en Chrome/Chromium nodig.

## Bijwerken
Kopieer de nieuwste versie uit de upstream-repo's over de map in `.claude/skills/` heen. De
installatiepaden: `impeccable` ← `.claude/skills/impeccable`, `design-taste-frontend` ←
`skills/taste-skill`, Emil ← `skills/<naam>`.
