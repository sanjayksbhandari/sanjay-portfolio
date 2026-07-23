# 10 — Folder Structure

Next.js App Router, TypeScript, feature-oriented organization. No code is
included here — this is the directory contract that document 20's phases
build against.

```
sanjay-portfolio/
├── docs/                          # This documentation set (planning artifacts)
│
├── public/
│   ├── fonts/                     # Self-hosted font files (see doc 14)
│   ├── images/
│   │   ├── case-studies/          # Architecture diagrams (SVG preferred), real only
│   │   └── og/                    # Static OG fallback images
│   ├── resume/
│   │   └── sanjay-singh-bhandari-resume.pdf
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml                # Or generated at build (see app/sitemap.ts)
│
├── src/
│   ├── app/                                   # App Router
│   │   ├── layout.tsx                         # Root layout: fonts, providers, SiteHeader/Footer
│   │   ├── page.tsx                           # Home
│   │   ├── globals.css                        # Design tokens as CSS variables, resets
│   │   ├── sitemap.ts                         # Dynamic sitemap generation
│   │   ├── robots.ts                          # Dynamic robots.txt
│   │   ├── opengraph-image.tsx                # Default OG image
│   │   ├── not-found.tsx                      # Custom 404
│   │   │
│   │   ├── journey/
│   │   │   └── page.tsx
│   │   ├── expertise/
│   │   │   └── page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx                       # Index
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── opengraph-image.tsx        # Per-case-study OG image
│   │   ├── leadership/
│   │   │   └── page.tsx
│   │   ├── architecture/
│   │   │   └── page.tsx
│   │   ├── ai-engineering/
│   │   │   └── page.tsx
│   │   ├── achievements/
│   │   │   └── page.tsx
│   │   ├── certifications/                    # Only if real cert data exists (doc 06)
│   │   │   └── page.tsx
│   │   ├── resume/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── actions.ts                     # Server action for form submission
│   │   └── blog/                              # Phase 2+, not built at launch
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                                # Section A: Button, Badge, Card, Divider, etc.
│   │   ├── layout/                            # Section C: SiteHeader, SiteFooter, PageShell, Container, Section
│   │   ├── navigation/                        # Section H: NavBar, MobileNavDrawer, Breadcrumbs, TOC
│   │   ├── animation/                         # Section D: FadeIn, RevealOnScroll, StaggerChildren, ParallaxLayer, PageTransition
│   │   ├── seo/                                # Section E: JsonLdPerson, JsonLdBreadcrumb, JsonLdArticle
│   │   └── features/                          # Section B/F/G: business + case study + timeline components
│   │       ├── hero/
│   │       ├── expertise/
│   │       ├── case-studies/
│   │       ├── leadership/
│   │       ├── architecture/
│   │       ├── ai-engineering/
│   │       ├── achievements/
│   │       ├── journey/
│   │       ├── resume/
│   │       └── contact/
│   │
│   ├── content/                               # Content-as-data (see doc 11) — typed content, no hardcoded strings in components
│   │   ├── case-studies/
│   │   │   ├── enterprise-artwork-management-platform.ts
│   │   │   ├── oauth2-authentication-platform.ts
│   │   │   ├── enterprise-exchange-platform.ts
│   │   │   ├── beckn-protocol-verification-adapter.ts
│   │   │   └── financial-transaction-platform.ts
│   │   ├── ai-projects/
│   │   │   ├── hiringeasy.ts
│   │   │   ├── ats-resume-builder.ts
│   │   │   ├── ai-resume-optimizer.ts
│   │   │   ├── cover-letter-generator.ts
│   │   │   ├── resume-parser.ts
│   │   │   ├── ai-resume-matching.ts
│   │   │   └── rag-applications.ts
│   │   ├── journey.ts                         # Company/role timeline entries
│   │   ├── expertise.ts                       # Skill category groupings
│   │   ├── leadership.ts                      # Leadership principles + evidence
│   │   ├── achievements.ts
│   │   ├── certifications.ts
│   │   └── site-meta.ts                       # Name, title, social links, canonical domain
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useIntersectionReveal.ts
│   │   ├── useLockBodyScroll.ts
│   │   └── useFocusTrap.ts
│   │
│   ├── lib/                                   # Utilities (non-React logic)
│   │   ├── seo/
│   │   │   ├── metadata.ts                    # buildMetadata() helper per page
│   │   │   └── jsonld.ts                      # JSON-LD builders
│   │   ├── analytics.ts                       # Event tracking wrapper (resume download, form submit, scroll depth)
│   │   ├── validation.ts                      # Contact form schema (e.g., zod)
│   │   └── utils.ts                           # cn()/classnames, formatting helpers
│   │
│   ├── config/
│   │   ├── nav.ts                             # Primary/footer nav item definitions
│   │   ├── site.ts                            # Site-wide constants (domain, social handles)
│   │   └── design-tokens.ts                   # Token values mirrored for JS use (e.g., animation durations)
│   │
│   ├── types/
│   │   ├── case-study.ts
│   │   ├── ai-project.ts
│   │   ├── journey-entry.ts
│   │   ├── leadership-principle.ts
│   │   ├── achievement.ts
│   │   ├── certification.ts
│   │   └── nav-item.ts
│   │
│   └── styles/
│       └── tokens.css                         # CSS custom properties generated from design-tokens.ts values
│
├── tests/
│   ├── unit/                                  # Vitest + RTL component tests
│   └── e2e/                                   # Playwright: nav, resume download, contact form, a11y smoke
│
├── .github/
│   └── workflows/
│       └── ci.yml                             # Lint, typecheck, test, build, Lighthouse CI
│
├── next.config.ts
├── tailwind.config.ts                         # Tokens from design-tokens.ts wired in
├── tsconfig.json
├── package.json
└── README.md
```

## Rationale for key decisions

- **`content/` is separated from `components/`** — every case study,
  project, and journey entry is typed data, not JSX with copy baked in.
  This means a content edit (fixing a fact, adding a metric once verified)
  never requires touching component code, and content can later be lifted
  into a headless CMS (document 18) without a rewrite.
- **`components/features/*` is organized by domain, not by component
  type** — because most work on this site is "build out the Leadership
  page," not "build a generic Card," so co-locating by feature reduces
  file-hunting.
- **`components/ui`, `layout`, `navigation`, `animation`, `seo` are
  type-organized** because these are shared primitives reused across every
  feature — matches the categories mandated by the brief exactly.
- **No `pages/`-style flat routing** — App Router route groups keep the
  file tree mirroring the sitemap in document 06 one-to-one, so anyone can
  find a page's code by reading the sitemap.
