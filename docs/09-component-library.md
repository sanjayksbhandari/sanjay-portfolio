# 09 — Component Library

Specification only (name, purpose, key states/props) — no implementation.
Organized by the categories required. Every component must consume design
tokens from document 08 exclusively.

## A. UI Components (generic, content-agnostic primitives)

| Component | Purpose | Key states/variants |
|---|---|---|
| `Button` | Primary action trigger | Variants: `primary` (accent fill), `secondary` (neutral border), `ghost` (text-only). States: default, hover, focus-visible, disabled, loading (subtle, no spinner icon — text change like "Sending…") |
| `IconButton` | Icon-only action (menu, close, external-link) | Always paired with `aria-label`; min 44px touch target |
| `Badge` / `Tag` | Tech-stack pill, status label ("Production", "Personal Project") | Monospace font per document 08; neutral by default, accent only if it represents an active/current state |
| `Card` | Generic content container | Elevation-0 default, elevation-1 on hover only if the card is a link |
| `Divider` | Visual section break | Hairline, `neutral-200`, used sparingly — whitespace is the default separator, dividers are the exception |
| `SectionHeading` | Standard heading + optional kicker/eyebrow + optional intro line | Enforces consistent heading hierarchy site-wide |
| `Kicker` (eyebrow label) | Small uppercase/mono label above a heading (e.g., "CASE STUDY") | Monospace, `text-xs`, `neutral-500` |
| `Prose` | Wrapper enforcing `container-prose` width + typographic rhythm for long-form text | Used for case study body, architecture write-ups |
| `Callout` | Sparingly used highlighted note (e.g., "My role" clarifier) | Neutral surface + left accent border, never colorful alert-box styling |
| `Stat` | A single factual figure presented plainly (e.g., "17+ years", "5 enterprise platforms") | Plain large number + label; explicitly NOT a progress bar or meter |
| `ExternalLink` | Link that leaves the site (LinkedIn, GitHub, external docs) | Always shows a small external-link icon + opens in new tab with `rel="noopener"` |
| `Avatar` | Optional small identity image (footer/contact) | Square-ish with `radius-lg`, not a circular headshot cliché unless a professional photo is supplied |
| `Tooltip` | Supplemental info on hover/focus (e.g., full cert issuer on hover of abbreviation) | Keyboard accessible (focus-triggered, not hover-only) |
| `Accordion` | Progressive disclosure for FAQ-like or certification detail lists | Single-open or multi-open per context; animated height via `motion-standard` |
| `DataTable` | Optional tabular presentation (e.g., certifications list: name/issuer/date) | Plain, bordered, no zebra-striping gimmicks beyond `neutral-50` |

## B. Business / Feature Components (content-aware, domain-specific)

| Component | Purpose |
|---|---|
| `HeroIntro` | Home page hero: name, title, years, one-liner, primary CTAs, proof strip |
| `ProofStrip` | Quiet text-based row of verified companies + year range |
| `ExpertiseMatrix` | Grouped skill categories with short contextual description per group (no meters) |
| `CaseStudyCard` | Summary card for index/home: name, problem one-liner, role, stack tags |
| `CaseStudyDetail` | Composed detail page: Context, Role & Scope, Architecture Overview, Decisions & Tradeoffs, Challenges, Outcome, Stack, Related |
| `RoleScopeBlock` | Explicit "My Role" callout inside a case study — critical per Persona 4 (document 04) |
| `DecisionRecord` | Repeatable block: "Decision / Alternative considered / Why chosen / Tradeoff accepted" |
| `LeadershipPrincipleCard` | One leadership practice + concrete supporting example, optionally cross-linked to a case study |
| `ArchitectureThemeBlock` | Cross-cutting architecture topic write-up (used on `/architecture`) |
| `AIProjectCard` | Personal AI project summary (HiringEasy, ATS Resume Builder, etc.) with problem/approach/stack |
| `AchievementItem` | Single factual achievement entry with context (company/project) |
| `CertificationCard` | Name, issuer, date, optional verification link |
| `ContactForm` | Name, email, message, optional company; client + server validation; accessible error states |
| `ResumeViewer` | Inline resume preview + download button + last-updated date |
| `JourneyTimelineEntry` | One role/company entry: dates, title, scope, linked projects |
| `TechStackList` | Rendered list of monospace tags tied to a case study or project |

## C. Layout Components

| Component | Purpose |
|---|---|
| `SiteHeader` | Sticky global header: logo, primary nav, Resume/Contact CTAs, mobile menu trigger |
| `SiteFooter` | Full sitemap, contact links, copyright, technical credibility line |
| `PageShell` | Top-level per-page wrapper: sets `<main>` landmark, skip-link target, consistent top/bottom padding |
| `Container` | Enforces one of the container-width tokens (document 08) |
| `Section` | Standard vertical rhythm wrapper (`space-8`/`space-9` padding) used for every homepage/page section |
| `TwoColumnLayout` | Content + sticky sidebar (used for case study body + TOC) |
| `MobileNavDrawer` | Full-screen mobile nav overlay (see document 07) |
| `StickyCTA` | Optional persistent bottom-corner or header-embedded Resume/Contact reminder on long pages (evaluate necessity in Phase 4 polish — must not become intrusive) |

## D. Animation Components (thin wrappers, purpose-bound — see document 16)

| Component | Purpose |
|---|---|
| `FadeIn` | Opacity 0→1 on mount/reveal, `motion-entrance` timing |
| `RevealOnScroll` | IntersectionObserver-driven fade + 8–16px slide-up, once per element (no re-trigger on scroll-back) |
| `StaggerChildren` | Applies incremental delay (40–60ms) to a list of `RevealOnScroll` children (e.g., expertise category cards) |
| `ParallaxLayer` | Extremely subtle (≤20px translate) scroll-tied movement, hero background only, disabled below `md` and under `prefers-reduced-motion` |
| `PageTransition` | Cross-fade between route changes, `motion-page` timing |
| `ScrollProgressIndicator` | Thin (2px) top-of-viewport bar showing read progress, used only on long-form pages (case study detail, architecture) |

All animation components must have a documented "reduced motion" fallback
per document 13/16 — this is not optional per component, it's enforced at
the wrapper level so individual usages can't forget it.

## E. SEO Components

| Component | Purpose |
|---|---|
| `SeoHead` / metadata config | Per-page title, description, canonical URL, OG/Twitter tags (implemented via Next.js Metadata API, not a literal component — see document 12) |
| `JsonLdPerson` | Person schema (name, jobTitle, alumniOf/worksFor is avoided since current employer isn't listed; sameAs links to LinkedIn/GitHub) |
| `JsonLdProfilePage` | ProfilePage/WebSite schema for Home |
| `JsonLdBreadcrumb` | BreadcrumbList schema paired with visible breadcrumbs |
| `JsonLdArticle` | Article/TechArticle schema for each case study (headline, datePublished/Modified, author) |
| `OgImageTemplate` | Dynamic Open Graph image generation template (page title + kicker, rendered via Next.js `ImageResponse`) — consistent branded but text-first design, not a generic gradient card |

## F. Case Study Components

Covered above under Business Components (`CaseStudyCard`, `CaseStudyDetail`,
`RoleScopeBlock`, `DecisionRecord`, `TechStackList`) — grouped here by
reference: this is the most content-critical component family in the
system since case studies carry the primary conversion weight for the
Engineering Manager and CTO personas (document 04).

## G. Timeline Components

| Component | Purpose |
|---|---|
| `JourneyTimeline` | Vertical, typographic timeline — a left-aligned date column + connecting hairline + entry content. Explicitly no large circular icons or logos per entry (document 03's anti-pattern list) |
| `TimelineEntry` | Single entry: date range, title, company, one-line scope, optional linked case studies |
| `TimelineConnector` | Thin vertical line + small dot marker (not an icon) connecting entries |

## H. Navigation Components

| Component | Purpose |
|---|---|
| `NavBar` | Desktop primary nav row |
| `NavLink` | Single nav item with active-state underline/color (accent) |
| `MobileNavDrawer` | (see Layout section) |
| `Breadcrumbs` | Visible breadcrumb trail, paired with JSON-LD |
| `TableOfContents` | Sticky in-page section jump list with scroll-spy highlighting |
| `BackToTop` | Small, appears after significant scroll on long pages only, unobtrusive |
| `CommandPalette` | Phase 3 — Cmd/Ctrl+K global search/jump (document 07) |

## Component governance rules

1. No component may introduce a color, spacing, radius, shadow, or
   duration value that isn't a token from document 08.
2. Every component with motion must expose/respect reduced-motion
   behavior — no exceptions.
3. Every interactive component must be keyboard operable and have a
   visible focus state before it is considered "done."
4. Business components compose UI components; they never duplicate a UI
   component's styling inline.
