# Pinepoint — Design Skill Atlas

A single-page dashboard demonstrating thirty-plus AI-assisted design skills, applied to a fictional B2B SaaS called **Pinepoint** (strategic roadmap + customer-signal hub for product teams).

**Live:** https://pablowilliams.github.io/Pinepoint/

---

## What's in the page

| Section | What it shows | Skills exercised |
|---|---|---|
| Hero | Animated gradient backdrop, count-up stats, modular scale headline | `impeccable · craft`, `impeccable-bolder`, `impeccable-overdrive`, `impeccable-typeset` |
| Atlas | Filterable catalog of every AI design skill, with category chips and live counts | `impeccable-shape`, `ui-ux-pro-max` |
| Tokens | Live color palette with measured WCAG contrast ratios + AA/AAA verdicts, spacing scale, elevation tokens | `ui-design-system`, `design-system-auditor`, `impeccable-colorize`, `a11y-audit` |
| Type | Modular type ramp (Fraunces / Inter / JetBrains Mono) | `impeccable-typeset`, `impeccable-layout` |
| Motion | Six motion primitives with live duration + easing controls, reduced-motion opt-in | `impeccable-animate`, `impeccable-delight` |
| Before / After | Three sliders showing Bolder, Quieter, Distill in action | `impeccable-bolder`, `impeccable-quieter`, `impeccable-distill` |
| Components | Buttons, inputs, badges, insight card, sparkline, empty state | `frontend-design`, `senior-frontend`, `impeccable-harden`, `impeccable-clarify` |
| Personas | Three jobs-to-be-done cards | `ux-researcher-designer`, `impeccable-clarify` |
| Audits | Scorecards with animated rings — accessibility, performance, UX critique | `impeccable-audit`, `impeccable-critique`, `a11y-audit`, `impeccable-optimize` |
| Process | Six-phase build timeline with skill credits | `product-strategist`, `impeccable-polish` |

---

## Tech

- Vanilla HTML / CSS / JS — no build step, no framework, ~25 KB gz total
- Single-page: `index.html`, `styles.css`, `app.js`
- Deployed to GitHub Pages via `.github/workflows/deploy.yml`
- Inter, Fraunces, JetBrains Mono via Google Fonts (preconnected)

## Accessibility

Built to WCAG 2.2 AA, audited by `accessibility-agents:accessibility-lead`:

- Semantic landmarks (`header`, `nav`, `main`, `footer`) with one `<h1>` and no skipped levels
- Skip link, visible focus rings on every focusable element, `:focus-visible`
- Color-pair contrast measured live in the palette section; never communicated by color alone
- `prefers-reduced-motion` honored everywhere; motion playground has an explicit opt-in toggle
- Before/after sliders use native `<input type="range">` for free keyboard support (←/→, PgUp/PgDn, Home/End)
- Polite live region announces filter counts, theme changes, and clipboard copies
- Hit targets ≥ 24×24 px (most ≥ 36×36)
- Reflow tested 320 → 1440 px

## Run locally

```bash
git clone https://github.com/<your-handle>/Pinepoint.git
cd Pinepoint
open index.html
```

## Repo layout

```
Pinepoint/
├── README.md
├── PLAN.md                         # The detailed build plan
├── .github/workflows/deploy.yml    # GitHub Pages auto-deploy
├── .gitignore
├── index.html                      # The dashboard
├── styles.css                      # Tokens, themes, components
└── app.js                          # Theme, filters, sliders, motion, count-ups
```

## Credits

Designed and shipped with the AI design skill ecosystem — orchestrated through Claude Code, plus the `accessibility-agents` and `impeccable` skill families.
