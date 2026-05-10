# Pinepoint — A Multi-Skill AI Design Showcase

**Codename:** Pinepoint
**Repo name on GitHub:** `pinepoint`
**Live target:** `https://<your-handle>.github.io/pinepoint/`
**Type:** Static, deployed via GitHub Pages (same model as your `SentimentTradingView` repo)
**Goal:** Ship one cohesive portfolio piece that visibly exercises every AI design skill in your toolbox, so a recruiter or client looking at the repo can see *both* a polished product *and* the orchestrated process that built it.

---

## 1. The concept

You design a **fictional B2B SaaS product called Pinepoint** — a strategic roadmap and customer-signal hub for product teams. Pinepoint is invented, but the design pretends it isn't: brand, marketing site, app dashboard, mobile companion, email templates, design system, plus a "Process" section that documents which skill produced what.

Why this concept:
- **Wide enough surface area** to legitimately need every design skill (landing, dashboard, charts, forms, email, mobile, settings, empty states, dark mode, motion).
- **Believable as real work.** Recruiters skim repos in 30 seconds — Pinepoint reads like a real shipped product, not a tutorial.
- **Built-in meta-narrative.** The `/process` section is where you cash in the showcase angle: "this hero was made with `impeccable-overdrive`, then trimmed by `impeccable-quieter`, then audited by `a11y-audit`."

If Pinepoint doesn't grab you, swap in any of these: **Driftwave** (sustainable shipping ops), **Quorum** (board-meeting prep), **Foreglow** (solar-energy monitoring), **Plotline** (story planning for writers). Same plan applies — just rebrand.

---

## 2. The repo at a glance

```
Pinepoint/
├── README.md                      # Front-door pitch + skill credits
├── PLAN.md                        # This file
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├── .gitignore
│
├── index.html                     # Marketing landing page
├── app/index.html                 # Product dashboard demo (interactive)
├── system/index.html              # Live design system (tokens + components)
├── mobile/index.html              # Mobile companion mockup
├── email/                         # Welcome + digest email HTML
├── process/index.html             # Case study with skill credits
│
├── tokens/
│   ├── colors.json                # Source of truth — exported by skill output
│   ├── typography.json
│   ├── spacing.json
│   └── motion.json
│
├── styles/
│   ├── tokens.css                 # CSS custom properties from tokens/*
│   ├── base.css                   # Reset, typography, layout primitives
│   ├── components.css             # Buttons, cards, nav, forms, charts, etc.
│   └── motion.css                 # Reusable transitions + reduced-motion guard
│
├── components/                    # HTML partials / reusable pieces
├── scripts/                       # Vanilla JS for interactions
├── assets/                        # Logos, illustrations, mock screenshots
└── docs/                          # Research artifacts as markdown
    ├── personas.md
    ├── journey-map.md
    ├── competitive-teardown.md
    ├── strategy-okrs.md
    ├── prd.md
    └── audit-reports/
        ├── a11y-audit.md
        ├── performance-audit.md
        └── critique.md
```

Optional later: a Next.js or React build under `/app-react/` for the senior-frontend skill, but start static so GitHub Pages just works.

---

## 3. Skill inventory — which skill produces what

This is the heart of the showcase. Each skill has a clear deliverable, a clear order, and ends in a file you can point to.

| # | Skill | Deliverable | Lives at |
|---|------|-------------|----------|
| 1 | `competitive-teardown` | Competitive matrix vs. Linear, Productboard, Aha! | `docs/competitive-teardown.md` |
| 2 | `product-manager-toolkit` | RICE-prioritized feature list + PRD | `docs/prd.md` |
| 3 | `product-strategist` | Vision, OKRs, roadmap | `docs/strategy-okrs.md` |
| 4 | `ux-researcher-designer` | Personas + journey map | `docs/personas.md`, `docs/journey-map.md` |
| 5 | `experiment-designer` | One A/B test hypothesis for the landing CTA | `docs/experiments.md` |
| 6 | `impeccable-shape` | Design brief for each surface | `docs/briefs/*.md` |
| 7 | `impeccable` (`teach`) | Design context: brand, tone, references | `docs/design-context.md` |
| 8 | `ui-design-system` | Token files, scale rules, component spec | `tokens/*.json`, `system/index.html` |
| 9 | `design-system-auditor` | Token contrast + focus-ring + spacing audit | `docs/audit-reports/tokens.md` |
| 10 | `impeccable` (`craft`) | Marketing landing page | `index.html` |
| 11 | `landing-page-generator` | Hero, features, pricing, FAQ, CTA blocks | `index.html` (sections) |
| 12 | `frontend-design` | Dashboard layout + components | `app/index.html` |
| 13 | `senior-frontend` | Component refactor to clean primitives | `components/*` |
| 14 | `ui-ux-pro-max` | Charts, tables, side nav, modal | `app/index.html` (widgets) |
| 15 | `email-template-builder` | Welcome + weekly digest emails | `email/*.html` |
| 16 | `apple-hig-expert` | Mobile companion (iOS-feel) | `mobile/index.html` |
| 17 | `impeccable-adapt` | Responsive breakpoints + touch targets | `styles/components.css` |
| 18 | `impeccable-typeset` | Type system pass | `styles/base.css` |
| 19 | `impeccable-layout` | Layout rhythm + spacing pass | `styles/base.css` |
| 20 | `impeccable-colorize` | Strategic color injection | `tokens/colors.json` |
| 21 | `impeccable-bolder` | Hero amplification | `index.html` (hero) |
| 22 | `impeccable-quieter` | Settings & docs surfaces toned down | `app/settings.html` |
| 23 | `impeccable-distill` | Pricing page declutter | `index.html` (pricing) |
| 24 | `impeccable-clarify` | Microcopy + error message pass | site-wide |
| 25 | `impeccable-animate` | Micro-interactions + page transitions | `styles/motion.css`, `scripts/*` |
| 26 | `impeccable-delight` | One signature delight moment | `app/index.html` (e.g. confetti on goal hit) |
| 27 | `impeccable-overdrive` | One ambitious moment (shader-y hero, scroll-driven reveal) | `index.html` (hero) |
| 28 | `impeccable-harden` | Empty states, error states, loading, i18n hooks | site-wide |
| 29 | `impeccable-optimize` | Asset & bundle size pass | reports |
| 30 | `impeccable-polish` | Final 1-pixel pass | site-wide |
| 31 | `impeccable-audit` | Scored quality report | `docs/audit-reports/quality.md` |
| 32 | `impeccable-critique` | UX critique with persona walkthroughs | `docs/audit-reports/critique.md` |
| 33 | `a11y-audit` | WCAG 2.2 AA compliance scan | `docs/audit-reports/a11y-audit.md` |
| 34 | `playwright-pro` (optional) | E2E smoke for landing + dashboard | `tests/*` |
| 35 | `accessibility-agents:accessibility-lead` | Final accessibility sign-off | comments in PRs |

You don't need to use all 35 in one weekend — see the schedule in §7.

---

## 4. The product story (the fiction that makes everything cohere)

**Pinepoint** is a strategic roadmap and customer-signal hub for B2B product teams. Three pillars:

1. **Signal Inbox** — auto-aggregates user feedback from Intercom, Linear, support tickets, app store reviews, and clusters them by theme.
2. **Roadmap Canvas** — quarterly RICE-scored roadmap with public + private views, OKR alignment, and a "what's blocked" lens.
3. **Insight Threads** — async product-discovery threads that link signals, hypotheses, experiments, and outcomes in one timeline.

Tagline: *"From customer signal to shipped strategy — in one thread."*

Personas:
- **Maya, Senior PM at a 200-person SaaS** — drowning in Slack signals, wants confidence in prioritization.
- **Dev, VP Product at a Series B** — needs roadmap defensibility for the board.
- **Sara, founding designer** — wants to know *why* the team is building what it's building.

Pricing:
- Free (1 project, 1 user)
- Team — $24/user/mo
- Scale — custom

That's enough fiction to drive every screen. Don't overbuild lore.

---

## 5. The five phases — what to do in what order

### Phase 0 — Discovery (1 day)
**Goal:** know what you're building before you touch CSS.

| Step | Skill | Output |
|---|---|---|
| Frame the product | `competitive-teardown` | `docs/competitive-teardown.md` |
| Personas + journey | `ux-researcher-designer` | `docs/personas.md`, `docs/journey-map.md` |
| Product strategy | `product-strategist` | `docs/strategy-okrs.md` |
| Feature scope (RICE) | `product-manager-toolkit` | `docs/prd.md` |
| One A/B hypothesis | `experiment-designer` | `docs/experiments.md` |
| Design brief per surface | `impeccable-shape` | `docs/briefs/landing.md`, `app.md`, `email.md`, `mobile.md` |

**Done when:** you can describe Pinepoint in one sentence and list five concrete screens.

### Phase 1 — Foundations (1 day)
**Goal:** lock the visual system before drawing pages.

| Step | Skill | Output |
|---|---|---|
| Brand & design context | `impeccable` (`teach`) | `docs/design-context.md` |
| Token system (color, type, space, motion) | `ui-design-system` | `tokens/*.json` |
| Live system page | `ui-design-system` | `system/index.html` |
| Token audit | `design-system-auditor` | `docs/audit-reports/tokens.md` |
| Type pass on tokens | `impeccable-typeset` | `tokens/typography.json` |
| Layout grid + spacing rhythm | `impeccable-layout` | `styles/base.css` |
| Strategic color | `impeccable-colorize` | `tokens/colors.json` |
| Repo + Pages + workflow | manual | `.github/workflows/deploy.yml` |

**Done when:** `system/index.html` shows tokens, type ramp, color swatches with contrast values, base components.

### Phase 2 — Build the surfaces (3–5 days)
**Goal:** ship the actual pages.

| Day | Surface | Primary skills |
|---|---|---|
| 1 | Landing page | `impeccable craft`, `landing-page-generator`, `impeccable-bolder` (hero), `impeccable-distill` (pricing) |
| 2 | Dashboard (Signal Inbox + Roadmap) | `frontend-design`, `ui-ux-pro-max`, `senior-frontend` |
| 3 | Mobile companion | `apple-hig-expert`, `impeccable-adapt` |
| 4 | Email templates | `email-template-builder` |
| 5 | Empty/error/loading + i18n hooks | `impeccable-harden`, `impeccable-clarify` |

**Done when:** every URL renders, no obviously-broken state, light + dark themes consistent.

### Phase 3 — Polish (1–2 days)
**Goal:** go from good to great.

| Step | Skill |
|---|---|
| Motion + micro-interactions | `impeccable-animate` |
| One signature delight moment | `impeccable-delight` |
| One ambitious hero moment | `impeccable-overdrive` |
| Final pixel-pass | `impeccable-polish` |
| Performance pass | `impeccable-optimize` |
| Calm down anything that screams | `impeccable-quieter` |

**Done when:** scroll the landing page, run a sim in the dashboard, you feel "ship it."

### Phase 4 — Audit (1 day)
**Goal:** prove quality with receipts.

| Step | Skill | Output |
|---|---|---|
| Quality audit | `impeccable-audit` | `docs/audit-reports/quality.md` |
| UX critique | `impeccable-critique` | `docs/audit-reports/critique.md` |
| WCAG 2.2 AA scan | `a11y-audit` | `docs/audit-reports/a11y-audit.md` |
| Accessibility lead sign-off | `accessibility-agents:accessibility-lead` | PR comment trail |
| Optional E2E smoke | `playwright-pro` | `tests/smoke.spec.ts` |

**Done when:** every report exists, every P0/P1 finding fixed.

### Phase 5 — Ship & narrate (½ day)
**Goal:** make the showcase legible to a stranger.

| Step | Output |
|---|---|
| Write the README front-door (pitch, screenshots, skills used, link to live site) | `README.md` |
| Build `/process/index.html` — case study with before/after thumbs and skill credits | `process/index.html` |
| Add OG image + meta tags | `index.html` `<head>` |
| Tag a `v1.0.0` release with notes | GitHub release |
| Pin the repo on your GitHub profile | profile setting |

**Done when:** anyone can land on `https://<you>.github.io/pinepoint/`, scroll, click into Process, and understand both the product and the meta-story.

---

## 6. Definition of done

A surface ships only when all of these are true:

- ✅ Renders with no console errors in Chrome, Safari, Firefox
- ✅ Keyboard reachable: Tab order is logical, focus visible
- ✅ Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI
- ✅ `prefers-reduced-motion` honored (all major animations have a static fallback)
- ✅ Responsive 320 → 1440 without breakage
- ✅ All images have `alt` (decorative ones use `alt=""`)
- ✅ One H1 per page, no skipped heading levels
- ✅ All forms have visible labels and error states
- ✅ Empty / loading / error states designed, not just happy path
- ✅ Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95

---

## 7. The first-week schedule (aggressive)

| Day | Morning | Afternoon |
|---|---|---|
| Mon | `competitive-teardown` + personas | `product-strategist` OKRs + PRD |
| Tue | Tokens via `ui-design-system` | `design-system-auditor` + `impeccable-colorize` |
| Wed | Landing page (`impeccable craft` + `landing-page-generator`) | `impeccable-bolder` hero, `impeccable-distill` pricing |
| Thu | Dashboard (`frontend-design` + `ui-ux-pro-max`) | Mobile companion (`apple-hig-expert`) |
| Fri | Email templates + empty states | `impeccable-animate` motion pass |
| Sat | `impeccable-overdrive` hero, `impeccable-delight` moment | `impeccable-polish` final pixels |
| Sun | `impeccable-audit`, `a11y-audit`, `impeccable-critique` | README + `/process` page + ship |

Stretch into a second week if you want to add the React port and Playwright smoke tests.

---

## 8. The README as the front-door (template)

Your README is the first thing seen. Structure it like this:

```
# Pinepoint
A fictional B2B SaaS designed end-to-end as a portfolio of AI-assisted design craft.

[Live site] · [Process write-up] · [Design system]

## What it is
One sentence on the product + one sentence on the showcase angle.

## Screens
[Hero screenshot]
[Dashboard screenshot]
[Mobile screenshot]
[Email screenshot]

## Designed with
A grid of skill chips, each linking to the matching `/process` section.

## Quality receipts
- Lighthouse scores (badges)
- WCAG 2.2 AA report
- Performance audit

## Stack
HTML / CSS / vanilla JS, deployed to GitHub Pages.

## Run locally
git clone … && open index.html
```

---

## 9. The `/process` page (the meta-story)

This is what makes it a *showcase*, not just a project. Structure:

1. **Brief** — what was the prompt, who was Pinepoint for, what were the constraints.
2. **Process timeline** — chronological, with thumbnails and the skill name as a chip on each step.
3. **Before / after** — at least three side-by-side comparisons (e.g. hero before/after `impeccable-bolder`; settings before/after `impeccable-quieter`; pricing before/after `impeccable-distill`).
4. **Audit excerpts** — pull the headline finding from each audit doc.
5. **What I learned** — short, honest reflection. Recruiters love this.

---

## 10. Stretch goals (only after v1.0.0 ships)

- React/Next.js port of the dashboard (`senior-frontend`)
- Playwright smoke tests (`playwright-pro`)
- Multi-language toggle EN/ES (`impeccable-adapt` + i18n)
- A live Storybook of components
- A figma-style "tokens.json" you can import into Style Dictionary
- A 60-second video walk-through embedded in `/process`

---

## 11. Anti-goals (don't do these)

- ❌ Don't build a backend. This is a static showcase.
- ❌ Don't hand-author a design system from scratch. Use `ui-design-system` and refine.
- ❌ Don't try to use every skill on every page. Map skill → surface, then move on.
- ❌ Don't skip the audits. They're the differentiator.
- ❌ Don't ship before the README + `/process` page exist. Without the meta-story it's just another dashboard demo.

---

## 12. First commands when you start

```bash
cd /Users/pablomini/Desktop/Pinepoint
git init
echo "node_modules/\n.DS_Store\n.env" > .gitignore
gh repo create pinepoint --public --source=. --remote=origin
mkdir -p .github/workflows app system mobile email process tokens styles components scripts assets docs/audit-reports docs/briefs
# Then start Phase 0 with: claude → /impeccable-shape
```

Then add the same `deploy.yml` from `SentimentTradingView/.github/workflows/deploy.yml` and push `main`.

---

## 13. Success looks like

When this is shipped, you should be able to send one URL to a hiring manager and have them, in under five minutes:

1. Believe Pinepoint is a real product
2. Click into the dashboard and feel the polish
3. Land on `/process` and understand you orchestrated 30+ AI design skills
4. Bookmark the repo

That's the whole goal. Everything in this plan serves it.
