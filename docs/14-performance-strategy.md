# 14 — Performance Strategy

## Target

Lighthouse **100 / 100 / 100 / 100** (Performance, Accessibility, Best
Practices, SEO) on both mobile and desktop profiles, held continuously via
CI gates — not achieved once and allowed to regress.

Internal budgets are set **stricter** than the generic "good" thresholds,
since this audience (engineers, CTOs) will notice sluggishness immediately
and it directly undermines the "engineering excellence" positioning:

| Metric | Google "Good" threshold | Our internal budget |
|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s | **≤ 1.8s** |
| INP (Interaction to Next Paint) | ≤ 200ms | **≤ 150ms** |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | **≤ 0.05** |
| TTFB (Time to First Byte) | — | **≤ 400ms** (static/edge-served) |
| Total JS shipped (per route, gzipped) | — | **≤ 100KB** |
| Total page weight (Home, first load) | — | **≤ 500KB** |

## Rendering & delivery

- Static Site Generation for all content routes (document 11) — no
  server-side data fetching on the request path for any primary page.
- Deployed on Vercel's edge network — static assets and pre-rendered HTML
  served from CDN edge nodes close to the visitor, minimizing TTFB
  regardless of visitor location.
- No client-side data fetching waterfall for above-the-fold content —
  content is inlined at build time.

## JavaScript budget discipline

- Default to **Server Components**; a component is only made a Client
  Component when it genuinely needs interactivity (form, drawer,
  accordion, scroll-driven reveal) — minimizing hydration cost.
- No heavy animation library shipped for the whole site — motion is
  implemented with CSS transitions/animations plus small,
  purpose-built hooks (`useIntersectionReveal`) wherever possible
  (document 11), avoiding a large JS dependency for what are, by design
  (document 16), simple effects.
- Route-level code splitting is automatic via the App Router; no manual
  dynamic-import needed except for any genuinely heavy, rarely-used
  component (e.g., a future command palette in Phase 3, lazy-loaded and
  only initialized on the `Cmd/Ctrl+K` keydown).
- No third-party scripts beyond a single, deferred, cookie-free analytics
  snippet. No chat widgets, no font-loading services beyond self-hosting,
  no marketing pixels.

## Fonts

- Self-hosted via `next/font`, subsetted to required character sets (Latin
  + basic punctuation), served as WOFF2.
- `font-display: swap` with a **matched fallback font** (system font
  metrics adjusted via `next/font`'s automatic fallback-metric
  calculation) to eliminate layout shift when the webfont loads (directly
  protects the CLS budget above).
- Single variable font file for the heading/body family where possible, to
  minimize the number of font requests; the monospace accent is loaded
  only with the specific weight actually used (likely just Regular/Medium).

## Images

- All raster imagery through `next/image`: automatic AVIF/WebP
  negotiation, responsive `srcset` generation, native lazy-loading below
  the fold, `priority` flag reserved for the single hero visual element
  (if any) to protect LCP.
- Architecture diagrams authored as **SVG** wherever feasible — smaller
  than raster screenshots, infinitely crisp, and trivially themeable
  (e.g., can inherit currentColor for line art).
- Explicit `width`/`height` (or `aspect-ratio`) on every image to reserve
  layout space and prevent CLS.

## CSS

- Tailwind's production build purges unused classes — CSS payload stays
  small regardless of how large the token/utility surface is during
  development.
- No render-blocking external stylesheets; all styles ship in the
  Next.js-managed critical CSS pipeline.

## Caching strategy

- Static assets (fonts, images, JS/CSS bundles) served with long-lived
  immutable cache headers (content-hashed filenames via Next.js build
  output).
- HTML for statically generated pages is edge-cached; case study pages
  regenerate only on redeploy (no ISR needed at this content velocity —
  document 11).

## Third-party & form performance

- The Contact form's Server Action runs at request time only for the
  submission itself — it does not affect the static page's load
  performance in any way (no client JS needed just to render the form
  shell; only the submit handler is a small client boundary).
- Email delivery (e.g., via Resend) happens server-side, asynchronously
  from the user's perspective beyond a brief loading state on the submit
  button.

## Performance in CI (enforcement, not aspiration)

- **Lighthouse CI** runs against the production build on every PR,
  against the budget table above; a regression below budget **fails the
  build** (document 11's CI/CD pipeline, step 5) — this is the mechanism
  that actually guarantees "Lighthouse 100" rather than just hoping for it.
- Bundle-size CI check (e.g., a size-limit style check) flags any PR that
  pushes a route's JS past the 100KB gzip budget.
- Web Vitals field data (real users, post-launch) monitored via Vercel
  Analytics/Speed Insights as the ground-truth check against lab-only
  Lighthouse scores, since lab and field data can diverge.

## Explicit tradeoffs accepted

- No blur-up/LQIP placeholder animation for images beyond what
  `next/image` provides natively — an extra custom placeholder pipeline
  isn't worth the added complexity given the low image count on this site.
- No service worker / offline support — irrelevant for this content type
  and would add complexity/cache-invalidation risk for no user benefit.
