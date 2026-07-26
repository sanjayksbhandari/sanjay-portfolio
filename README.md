# Sanjay Singh Bhandari — Engineering Portfolio

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 +
Radix UI + Framer Motion. Planning docs live in [`docs/`](./docs) — start
with [`docs/00-README.md`](./docs/00-README.md). The design system
specification is in [`docs/phase-1-design-system/`](./docs/phase-1-design-system/00-README.md)
and its implementation is documented in
[`docs/phase-2-design-system/`](./docs/phase-2-design-system/00-README.md).

## Status

**Phases 1–19 + recruiter completion sprint (v1.2.0).** Portfolio is
visitor-ready: no public TODOs, working resume PDF, verified contact
paths only. See `CHANGELOG.md`.

| Area                                                                                                                                              | Status                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Design tokens, incl. dark mode (docs/phase-1-design-system/03, docs/phase-2-design-system/03)                                                     | Implemented via Tailwind v4 `@theme` in `src/app/globals.css`; light + dark palettes both contrast-computed              |
| Theming (Light/Dark/System)                                                                                                                       | `ThemeProvider` (`next-themes`) + `ThemeToggle` in the header — light remains the default/primary experience             |
| Layout shell (header, footer, mobile drawer, skip link)                                                                                           | Built — `MobileNavDrawer` rebuilt on Radix `Dialog` for a real focus trap                                                |
| Design system foundation (primitives, forms, feedback, typography, motion, layout)                                                                | Built — see `docs/phase-2-design-system/07-component-documentation.md`; **foundation only, not yet adopted by any page** |
| Home, Journey, Expertise, Case Studies (+5 detail pages), Leadership, Architecture, AI Engineering, Achievements, Certifications, Resume, Contact | Built (Experience Framework + Content Engine)                                                                            |
| SEO / security / analytics / monitoring                                                                                                           | Phases 16–17                                                                                                             |
| Deployment                                                                                                                                        | Vercel-ready (`vercel.json`, launch checklists)                                                                          |
| Versioning & changelog                                                                                                                            | Semver in footer → `/CHANGELOG.md`; strategy in Phase 18                                                                 |
| CI quality gates                                                                                                                                  | `.github/workflows/ci.yml` + `npm run release:check`                                                                     |
| Continuous improvement                                                                                                                            | Phase 18 handbook, quarterly checklist, backlog                                                                          |
| Visual language                                                                                                                                   | Phase 19 — warm neutrals, charcoal dark, elevated surfaces                                                               |
| Contact form                                                                                                                                      | UI + server action + length limits; **email delivery not yet connected**                                                 |
| Resume PDF                                                                                                                                        | **Not yet uploaded** — download disabled until a real file exists                                                        |

## How to run & test in the browser (simple)

You only need these steps to open the site locally.  
**Do not stop `npm run dev`** while you are browsing — leave it running.

### Step 1 — Install (first time only)

```bash
cd sanjay-portfolio
npm install
```

### Step 2 — Start the app

```bash
npm run dev
```

Wait until the terminal shows something like `Ready` / `localhost:3000`.

### Step 3 — Open in browser

Go to: **http://localhost:3000**

Click through pages (Showcase, Journey, Case Studies, Contact, etc.) and
check whatever you want.

### Step 4 — Stop the app (only when you are done)

In the same terminal, press **`Ctrl + C`**.

That’s it for normal local testing.

---

### Optional checks (not needed just to view the site)

`typecheck` / `lint` / `build` are for catching code errors before a
commit or release. They are **not** required to browse the app.

- Keep `npm run dev` running in Terminal A.
- If you want checks, open a **second** terminal and run them there —
  you do **not** need to stop the dev server.

```bash
# only when you want a quality check (optional)
npm run typecheck
npm run lint
```

Before a release / PR (optional):

```bash
npm run release:check
```

## Tooling (reference)

```bash
npm run dev                 # start local site → http://localhost:3000
npm run build               # production build
npm run start               # serve production build (after build)
npm run lint                # ESLint
npm run typecheck           # TypeScript check
npm run format              # Prettier write
npm run format:check        # Prettier check
npm run validate:content    # Content Engine checks
npm run validate:links      # Internal link check
npm run validate            # lint + typecheck + format + content + links
npm run validate:production # validate + build
npm run launch:check        # same as validate:production
npm run release:check       # same — use before release/PR
npm run sync:changelog      # CHANGELOG.md → public/CHANGELOG.md
```

A Husky pre-commit hook runs `lint-staged` (ESLint + Prettier on staged
files) automatically. GitHub Actions runs quality gates on PRs to `main`
(`.github/workflows/ci.yml`).

## Content policy (important)

Every fact currently on the site is sourced from either:

1. The verified company/project/skill lists supplied directly, or
2. Sanjay's own public LinkedIn profile and the `ats_resume_creator` repo
   (both legitimate, independently checkable sources).

Anywhere a real detail (a metric, a date, a tradeoff, a diagram, a lesson
learned) isn't yet verifiable, the content is a typed `todos` array on that
content object, rendered on the live page as a visible, honestly-labeled
**"Content phase — pending verification"** block (`TodoNote` component) —
never invented prose. Search the codebase for `todos:` in `src/content/`
to see every open item, or grep for `TODO` across `src/`.

## Next steps

1. Operate from the [Final Product Handbook](./docs/phase-18-continuous-improvement/10-final-product-handbook.md).
2. Complete Vercel go-live ([Phase 17](./docs/phase-17-launch-readiness/03-launch-checklist.md)).
3. Run the [quarterly maintenance checklist](./docs/phase-18-continuous-improvement/02-quarterly-maintenance-checklist.md).
4. Fill verified content TODOs; upload resume PDF; wire contact email.
5. Enable analytics; use the [dashboard plan](./docs/phase-18-continuous-improvement/03-analytics-dashboard-plan.md).
6. Ship future surfaces from the [feature backlog](./docs/phase-18-continuous-improvement/07-future-feature-backlog.md) only when gates pass.

## Manual browser checks (optional)

While `npm run dev` is running and the site is open:

- Theme toggle: Light / System / Dark
- Mobile menu (narrow the browser width)
- Keyboard: Tab through header links; open mobile drawer with keyboard
- A few pages: Home, Showcase, one Case Study, Contact
