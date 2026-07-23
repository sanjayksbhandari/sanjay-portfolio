# 12 — SEO Strategy

## Objective

Ensure the site ranks for the exact queries a recruiter or hiring manager
runs before or during a hiring process: the candidate's name, name +
role/company combinations, and role-defining technical terms. SEO here is
about **being correctly and completely found and understood**, not about
generic organic traffic growth.

## Target query patterns

- `Sanjay Singh Bhandari` (name, must be the #1 result, own the SERP)
- `Sanjay Singh Bhandari Java`
- `Sanjay Singh Bhandari [company name]` (Opal BPM, TeamLease, InterGlobe)
- `Senior Java Engineering Leader portfolio`
- `Java Spring Boot Architect [location, once known]`
- `Java engineer AI engineering LangChain RAG`

## On-page metadata

Implemented via the Next.js Metadata API, per route, with a shared base
config in `lib/seo/metadata.ts`:

- **Title tag pattern:** `{Page Title} — Sanjay Singh Bhandari` (Home:
  `Sanjay Singh Bhandari — Senior Java Engineering Leader`)
- **Meta description:** unique per page, 140–160 characters, written as a
  genuine summary (never keyword-stuffed), following the content-strategy
  voice (document 17)
- **Canonical URL:** explicit `<link rel="canonical">` on every page,
  self-referencing, to prevent duplicate-content ambiguity from trailing
  slashes/query params
- **`lang="en"`** on `<html>`, correct per document 13

## Open Graph & Twitter Cards

- Every route defines OG `title`, `description`, `type` (`profile` for
  Home, `article` for case studies), `url`, and a dynamically generated
  `image` (1200×630) via `opengraph-image.tsx`.
- OG image design: text-first (page title + kicker + wordmark), consistent
  with the site's typographic identity — not a generic gradient card
  template, so a shared link preview still looks hand-built.
- Twitter Card: `summary_large_image`, mirroring OG data (no separate
  copywriting needed).

## Structured data (JSON-LD)

| Schema | Applied to | Key fields |
|---|---|---|
| `Person` | Global (root layout or Home) | `name`, `jobTitle: "Senior Java Engineering Leader"`, `url`, `sameAs: [LinkedIn, GitHub]`, `knowsAbout: [Java, Spring Boot, Microservices, AWS, Kafka, ...]` |
| `ProfilePage` / `WebSite` | Home | Ties the `Person` to the site as the canonical profile |
| `BreadcrumbList` | Case study detail pages | Mirrors visible breadcrumb (document 07) |
| `Article` / `TechArticle` | Each case study | `headline`, `datePublished`, `dateModified`, `author` (Person reference), `about` (technologies) |
| `ItemList` | Case Studies index, Expertise page | Structured listing for rich-result eligibility |

All structured data is generated from the same typed content objects
(document 10/11) that render the visible page — **no divergence between
what's shown and what's marked up**, which avoids structured-data spam
penalties and keeps maintenance to one source of truth.

## Sitemap & robots

- `app/sitemap.ts` dynamically enumerates every static route + every
  `case-studies/[slug]` from the content module — new case studies appear
  in the sitemap automatically, no manual step.
- `app/robots.ts` allows all crawlers, points to the sitemap, disallows
  nothing (no admin/private routes exist in this project).
- `certifications` route is included in the sitemap only when it exists
  (see document 06's merge-if-thin rule) — no sitemap entries for pages
  that don't ship.

## URL design

- All URLs are lowercase, hyphenated, human-readable, and stable:
  `/case-studies/oauth2-authentication-platform`, not
  `/case-studies/cs-004` or query-string-based routing.
- No trailing slash inconsistency (Next.js config enforces one convention
  site-wide, redirects the other).

## Heading hierarchy discipline

- Exactly one `<h1>` per page (page title / hero headline).
- `<h2>` for major sections, `<h3>` for sub-sections — enforced by the
  `SectionHeading` component API (document 09), which requires an explicit
  `level` prop rather than letting authors default to whatever "looks
  right" visually. Visual size is decoupled from semantic level via the
  type scale tokens (document 08), so hierarchy is never sacrificed for a
  visual effect.

## Internal linking strategy

- Every case study links to: the Architecture page (if a relevant theme
  applies), the Leadership page (if a leadership practice was exercised),
  and 1–2 related case studies.
- The Expertise page links each skill group to the case studies/projects
  that used it, and vice versa — creating a dense, relevant internal link
  graph without resorting to a generic "related posts" widget.
- The AI Engineering page cross-links every project to each other where
  they share a pipeline stage (e.g., Resume Parser feeding ATS Resume
  Builder).

## Image SEO

- Every image (primarily architecture diagrams) has descriptive,
  specific `alt` text (e.g., "Sequence diagram of the OAuth2 authorization
  code flow used in the Authentication Platform," not "diagram" or a blank
  string) — doubles as the accessibility requirement in document 13.
- Diagrams are authored as SVG where possible for crisp rendering and
  smaller file size than raster screenshots.

## Performance as SEO

Core Web Vitals are a ranking factor; document 14's performance budget is
therefore also part of this SEO strategy, not a separate concern. A
technically excellent, fast site is itself SEO work.

## Off-page / verification

- Google Search Console verification on launch; submit sitemap
  immediately.
- LinkedIn profile and GitHub profile both link back to the site (and are
  referenced via `sameAs` in the `Person` schema) — reciprocal signals that
  reinforce entity recognition for the name query.
- Resume PDF metadata (title/author fields) set to match the site's
  canonical name, for consistency across artifacts.

## What we explicitly do not do

- No keyword stuffing, no hidden text, no doorway pages per role/location
  combination — these are outdated/penalized tactics and are also simply
  inconsistent with a site whose entire value proposition is credibility
  and restraint.
- No purchased backlinks or link schemes.
- No auto-generated thin blog content purely for SEO volume (document 18's
  future blog is only technical writing with real substance).
