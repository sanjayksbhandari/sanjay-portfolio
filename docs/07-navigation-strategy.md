# 07 — Navigation Strategy

## Primary navigation (max 6 visible items — Hick's Law)

```
[Logo/Wordmark]   Journey   Expertise   Case Studies   Leadership   AI Engineering   [Resume] [Contact]
```

- "Architecture" and "Achievements/Certifications" are intentionally not in
  the top-level bar — they are reachable from Home page sections, from
  in-content cross-links (e.g., a case study links to `/architecture`), and
  from the footer sitemap. This keeps Hick's Law compliance without hiding
  the pages from search engines or determined visitors.
- **Resume** and **Contact** are visually distinct from the rest of the nav
  (treated as CTAs — accent-colored or button-styled, not plain text
  links), because they are the two conversion actions the entire journey
  map (document 05) optimizes for.

## Header behavior

- **Sticky header**, present on scroll at all times, height ~64px desktop /
  56px mobile, subtle bottom border (1px, low-contrast gray) — not a
  shadow — to separate from content without adding visual weight.
- On scroll down past the hero, header may compress slightly (e.g., logo
  wordmark shrinks) — a micro-interaction, not a re-layout (see document 16
  for animation constraints: must be instant/sub-200ms, no bounce).
- Header never disappears on scroll-down/reappears-on-scroll-up gimmicks;
  it stays put. Predictability > cleverness (UX Vision, document 02).

## Mobile navigation

- Below `md` breakpoint (768px), primary nav collapses into a menu button
  (hamburger icon, from the single icon set) opening a **full-screen
  drawer**, not a small dropdown — because the nav includes CTAs that
  deserve full touch-target space.
- Drawer content: same nav items as desktop, each as a full-width row with
  ample touch target (≥44px height per document 13 accessibility spec);
  Resume and Contact remain visually distinct CTAs at the bottom of the
  drawer.
- Drawer open/close is a simple fade + slight slide (≤200ms), closes on:
  link click, backdrop click, Escape key.
- Body scroll is locked while drawer is open; focus is trapped inside the
  drawer for accessibility (document 13).

## In-page anchor navigation (Home page only)

Home page sections are also addressable via anchors
(`/#expertise`, `/#case-studies`, etc.) so nav links from other pages back
to a Home section behave correctly, but the **primary nav always points to
the full deep page**, not the anchor — anchors are a secondary convenience
for footer/cross-links, not the primary IA.

## Breadcrumbs

Used only on pages that are "children" of an index — i.e.
`/case-studies/[slug]`:

```
Home  /  Case Studies  /  OAuth2 Authentication Platform
```

Implemented with visible breadcrumb UI **and** `BreadcrumbList` JSON-LD
(document 12) — this is one of the highest-leverage, lowest-cost technical
SEO wins available. Home, Journey, Expertise, Leadership, Architecture,
AI Engineering, Achievements, Certifications, Resume, Contact are
top-level and do not need breadcrumbs (would be redundant with primary nav).

## Table of contents (long pages only)

`/case-studies/[slug]` and `/architecture` (both long-form) get a
lightweight sticky **table of contents** in a right-hand rail on desktop
only (hidden on mobile/tablet — replaced by nothing extra, since the page
length is manageable via normal scroll on smaller screens). TOC entries
correspond to the fixed section structure (Context, My Role, Architecture
Overview, Decisions, Challenges, Outcome). Active section highlighted via
scroll-spy (IntersectionObserver), not scroll-position math.

## Footer navigation

Full sitemap footer (all pages, including the ones excluded from the
primary nav — Architecture, Achievements, Certifications), grouped into
columns: "Explore" (Journey, Expertise, Case Studies, Leadership,
Architecture, AI Engineering), "Credentials" (Achievements, Certifications,
Resume), "Contact" (Contact page, direct email, LinkedIn). Plus copyright
line and a quiet "Built with Next.js" technical credibility note (optional,
consistent with the "site as work sample" philosophy in document 01).

## Command palette (Cmd/Ctrl+K) — Phase 3, not launch

A search/command palette (à la Linear, Vercel, Raycast) that lets a
technical visitor jump directly to any case study, skill category, or page
by typing. This is **deferred to Phase 3** (document 20) — it is a genuine
"engineering excellence" signal well-matched to this technical audience,
but it must not delay the MVP launch and must not become a gimmick; it
ships only if it's fast, keyboard-accessible, and adds real navigation
value once there are enough pages (case studies, and eventually blog posts)
for search to matter.

## Focus & keyboard navigation

Full keyboard operability is a navigation requirement, not just an
accessibility checkbox:
- Logical tab order following visual/DOM order.
- Visible focus rings (accent-colored, document 08) on every interactive
  element, distinct from hover state.
- Skip-to-content link as the very first focusable element on every page.
- Drawer, TOC, and any future command palette are fully keyboard operable
  (Escape closes, arrow keys navigate palette results).

## Navigation anti-patterns explicitly avoided

- Mega-menus with previews/screenshots (unnecessary complexity for 6–10
  pages total).
- Infinite scroll on the Case Studies index (breaks deep-linking,
  breaks footer reachability, harms perceived completeness).
- Auto-advancing carousels anywhere in navigation or content.
- Nav items that reorder or change based on scroll position (violates
  predictability).
