# 15 — Responsive Strategy

## Approach: desktop-quality design, mobile-first implementation

These are not contradictory. **Visual design and content density
decisions** are made by first perfecting the desktop/laptop experience
(1280–1440px), because the highest-value personas (CTO, Engineering
Manager, Staff Engineer, per document 04) predominantly review candidate
portfolios on a laptop or external monitor, often while multitasking
across a case study and a resume/ATS tool. The desktop layout is where the
"premium, handcrafted" impression must land hardest.

**Implementation**, however, is built mobile-first in code (base styles
target the smallest breakpoint, larger breakpoints add complexity via
`min-width` media queries) — this is simply better engineering practice
that produces more robust CSS and is itself consistent with the site's
"engineering excellence" positioning. The two statements resolve as: design
review happens desktop-first, code is written mobile-first, and every
breakpoint in between is treated as a first-class citizen, not an
afterthought.

## Breakpoint behavior specification

Using the breakpoint tokens from document 08:

### Mobile (< 640px)
- Single column throughout.
- Primary nav collapses to hamburger + full-screen drawer (document 07).
- Hero headline drops to `text-4xl`–`text-5xl` range (not the full desktop
  `text-6xl`) to avoid excessive line-wrapping.
- Case study two-column layout (content + TOC) becomes single column; TOC
  is either omitted or collapsed into an expandable "On this page"
  accordion at the top of the article.
- Expertise category grid becomes a single-column stacked list.
- `ParallaxLayer` effects are disabled entirely (performance + motion
  sickness consideration, and diminishing visual value on small
  viewports).
- Touch targets enforced at minimum 44×44px throughout (document 13).

### Large phones / small tablets (640–768px, `sm`)
- Expertise/case-study cards may move to a 2-column grid where space
  allows, still governed by `auto-fit`/`minmax` (document 08) rather than
  a hard-coded column count.
- Hero CTAs (Resume/Contact) stack or sit side-by-side depending on
  available width — governed by content length, tested explicitly rather
  than assumed.

### Tablets, portrait/landscape (768–1024px, `md`–`lg`)
- Primary nav may still collapse to drawer up to `lg` (1024px) if the full
  nav item set doesn't comfortably fit — this threshold is verified during
  visual design with the actual final nav copy, not assumed at the exact
  768px boundary.
- Case study TOC reappears as a sidebar once width comfortably
  accommodates content + sidebar without cramming the prose column below
  its `container-prose` minimum comfortable width.

### Laptops/desktops (1024–1536px, `lg`–`2xl`)
- Full multi-column layouts, full primary nav, TOC sidebar present, full
  type scale (`text-5xl`/`text-6xl` hero) active.
- This is the primary design target range — most QA and visual polish
  time is spent here.

### Large/ultra-wide screens (> 1536px)
- Content width is **hard-capped** at `container-full` (1440px, document
  08) and centered — text and layouts never stretch full-bleed across a
  27"+ or ultrawide monitor, which would blow out the reading measure and
  look unfinished/templated. Background surface color extends full-bleed;
  content does not.

## Component-specific responsive rules

| Component | Mobile | Desktop |
|---|---|---|
| `SiteHeader` | Logo + hamburger only | Full nav + Resume/Contact CTAs visible |
| `HeroIntro` | Stacked, center or left-aligned single column | Potential two-zone layout (headline block + proof strip), still left-aligned per document 03's restraint principle (no centered-hero-with-giant-illustration cliché) |
| `ExpertiseMatrix` | 1 column | 2–3 column grid |
| `CaseStudyCard` grid | 1 column | 2–3 column grid |
| `JourneyTimeline` | Single-column, date above content | Two-column (date column + content column) |
| `CaseStudyDetail` + TOC | Single column, optional collapsed "On this page" | Two-column with sticky TOC rail |
| `ContactForm` | Full-width fields, stacked | Constrained to `container-prose`-like width, not full page width, for a "considered" appearance |

## Device/viewport testing matrix

Explicit QA pass required at each of the following before any phase's
sign-off (document 20):

| Device class | Representative viewport |
|---|---|
| Small phone | 375×667 (iPhone SE) |
| Standard phone | 390×844 / 428×926 (iPhone 14/15 range) |
| Tablet portrait | 768×1024 (iPad) |
| Tablet landscape | 1024×768 |
| Small laptop | 1366×768 |
| Standard laptop/desktop | 1440×900 |
| Large desktop | 1920×1080 |
| Ultra-wide | 2560×1080 (content-cap verification) |

Testing includes both orientation states for tablets and confirms no
horizontal scrollbars appear at any tested width — a hard requirement,
tested as part of the Playwright e2e suite (document 11) via
viewport-parametrized smoke tests, not left to manual spot-checks alone.

## Typography responsiveness

- Type scale tokens (document 08) are not simply linearly scaled down;
  specific step-downs are defined per breakpoint for the hero and page
  titles only (the sizes most sensitive to line-wrap awkwardness), while
  body/UI text sizes remain constant across breakpoints for reading
  consistency.
- Line length (`ch`-based max-width) is maintained across all breakpoints
  so paragraph readability never degrades on wide mobile-landscape or
  tablet views.

## What "perfect on every device" means operationally

Not "looks fine" — specifically: no orphaned single words on their own
line in headings where avoidable, no cramped touch targets, no horizontal
scroll, no text overlapping images, no CLS from responsive image swaps, and
consistent vertical rhythm at every breakpoint (not just the two or three
that got the most design attention).
