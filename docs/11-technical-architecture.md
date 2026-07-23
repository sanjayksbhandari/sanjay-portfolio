# 11 — Technical Architecture

## Guiding principle

The stack itself should be defensible in a technical interview — this is a
Java engineering leader's portfolio, so the frontend engineering choices
must read as deliberate and current, not as "whatever the AI generator
defaulted to." Every choice below has an explicit reason.

## Core stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router), latest stable** | Best-in-class static generation + SEO primitives (Metadata API, `sitemap.ts`, `robots.ts`, `ImageResponse` for OG images) with zero extra tooling |
| Language | **TypeScript, strict mode** | Type safety for content models (document 10's `types/`); also itself a credibility signal — a Java engineer's site should not ship loose JS |
| Styling | **Tailwind CSS**, configured to consume the design tokens from document 08 (colors, spacing, radius, type scale as theme extensions) | Fast, constrains styling to the token system by construction (a developer *can't* easily add an arbitrary color), small production CSS footprint |
| Motion | **CSS transitions/animations + IntersectionObserver-based hooks** as the default; a minimal animation utility (e.g., Motion for React) only if genuinely needed for orchestrated stagger/parallax | Avoids shipping a heavy animation library for what is, by design (document 16), a small set of simple effects |
| Content | **Typed local content modules** (`src/content/*.ts`) in Phase 1–3; optional headless CMS (e.g., a git-based CMS) introduced only in Phase 4+/blog phase | Zero infra needed to launch; content changes are PR-reviewable, versioned, and typo-checked by the compiler |
| Fonts | **`next/font`, self-hosted, subsetted** | Eliminates render-blocking external font requests, enables `font-display: swap` with matched fallback metrics (document 14) |
| Images | **`next/image`** for all raster/vector assets | Automatic responsive sizing, lazy loading, AVIF/WebP negotiation |
| Forms | **Next.js Server Action** posting to a transactional email provider (e.g., Resend) | No separate backend service required; keeps infra minimal |
| Hosting | **Vercel** | First-class Next.js support (ISR/edge caching, image optimization, preview deployments per PR), aligns with the Vercel-inspired design philosophy (document 03) |
| Analytics | **Privacy-respecting, cookie-free analytics** (e.g., Vercel Analytics or Plausible) | Avoids a cookie-consent banner entirely (a consent banner would visually contradict the "minimal, no clutter" design philosophy) while still capturing the success signals from document 01 |
| Domain/DNS | Custom domain (e.g., `sanjaysinghbhandari.com`), managed via Vercel or registrar DNS | Owned identity, required for credible SEO and professional presentation |

## Rendering strategy

- **Static Site Generation (SSG) for every content page** — Home, Journey,
  Expertise, Case Studies (index + all detail pages generated at build via
  `generateStaticParams`), Leadership, Architecture, AI Engineering,
  Achievements, Certifications, Resume. Content changes infrequently
  enough that build-time generation is strictly better than
  server-rendering per request for both performance and cost.
- **Server Action, no client-rendered page**, for the Contact form
  submission only — the page itself is still static; only the mutation is
  dynamic.
- **Incremental Static Regeneration (ISR)** is reserved for the future
  Blog (document 18), where content will change post-launch without a
  full redeploy.
- No client-side data fetching for primary content — content is imported
  directly from `src/content/*.ts` at build time. This removes an entire
  class of loading-spinner/empty-state UX problems and is why the
  performance strategy (document 14) can target Lighthouse 100 credibly.

## State management

Deliberately minimal:
- Local component state (`useState`) for UI-only concerns (mobile drawer
  open/closed, accordion expanded, form field values).
- No global state library (Redux/Zustand/etc.) — there is no cross-cutting
  application state that justifies one. Introducing one would be an
  over-engineering smell, which this project explicitly avoids in its own
  build as much as it avoids it in the case studies it describes.

## Data/content model (conceptual, not code)

Each content type (`CaseStudy`, `AIProject`, `JourneyEntry`,
`LeadershipPrinciple`, `Achievement`, `Certification`) is a typed object
with required fields enforced at compile time — e.g., a `CaseStudy` cannot
be authored without a `myRoleAndScope` field, structurally enforcing the
content rule from document 06/17 that every case study must attribute
individual contribution.

## Testing strategy

| Layer | Tool | Coverage target |
|---|---|---|
| Unit/component | Vitest + React Testing Library | UI components (Button, Badge, Accordion logic, form validation logic) |
| Integration | React Testing Library | Composed features (ContactForm submit flow, MobileNavDrawer open/focus-trap/close) |
| End-to-end | Playwright | Critical conversion paths: resume download click fires correctly, contact form submits and shows confirmation, primary nav reaches every page, mobile drawer opens/closes |
| Accessibility | `axe-core` via Playwright or `jest-axe` | Automated a11y assertions on every page as part of CI (document 13) |
| Visual regression | Optional, Phase 4 | Screenshot diffing on key breakpoints to catch unintended layout drift |

## CI/CD pipeline

GitHub Actions on every PR and on `main`:
1. Install + typecheck (`tsc --noEmit`)
2. Lint (ESLint + Tailwind/class-order plugin)
3. Unit + integration tests
4. Build (`next build`) — fails the pipeline on build errors or type errors
5. Lighthouse CI against the built output, with **hard budget thresholds**
   (document 14) — pipeline fails if Performance/Accessibility/Best
   Practices/SEO drop below target
6. Playwright e2e against a preview deployment
7. Auto-deploy: PRs get a Vercel preview URL; merges to `main` deploy to
   production

## Monitoring post-launch

- Vercel deployment + Web Vitals monitoring (real-user LCP/INP/CLS, not
  just lab data).
- Search Console monitoring for indexing status and Core Web Vitals field
  data.
- Uptime is not a meaningful concern on a static Vercel deployment, but
  broken-link checking is run periodically (e.g., a scheduled CI job) since
  case studies cross-link heavily.

## Explicit non-choices (and why)

- **No CMS at launch** — content volume (5 case studies, 7 AI projects, a
  handful of pages) does not justify CMS overhead; typed content files are
  faster to build, review, and deploy.
- **No client-side router state library** — App Router's native routing is
  sufficient.
- **No design-token-as-a-service / theming system for multiple brands** —
  this is a single-owner personal site; a multi-theme system would be
  speculative complexity.
- **No server framework beyond Next.js itself** (no separate Express/API
  layer) — the only "backend" need is the contact form, handled by a
  Server Action.
