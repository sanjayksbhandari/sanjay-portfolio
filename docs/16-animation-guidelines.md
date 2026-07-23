# 16 — Animation Guidelines

## Governing rule

> **Every animation must make content easier to understand, or an
> interaction easier to trust. If it does neither, it is decoration, and
> decoration is not part of this design system.**

This is the operational test applied to every motion decision, referenced
from document 03's design philosophy.

## Approved motion patterns (the complete list — nothing outside this list ships)

| Pattern | Spec | Where used |
|---|---|---|
| **Fade** | Opacity 0→1, `motion-entrance` (320ms) | Section/card reveal on scroll, page transitions |
| **Slide (subtle)** | 8–16px translate-Y combined with fade, never translate alone | Scroll-reveal of cards, list items |
| **Scale (micro)** | 1.0 → 1.01–1.02 max, `motion-micro` (120ms) | Card hover, button press feedback |
| **Reveal / stagger** | Sequential child fade+slide with 40–60ms incremental delay | Expertise category grid, case study card grid, skill lists |
| **Parallax (very subtle)** | ≤ 20px translate tied to scroll position, applied to a single hero background layer only | Home hero background element only — disabled below `md` breakpoint and under reduced motion |
| **Micro-interactions** | Color/underline transition on link hover, focus-ring appearance, accordion chevron rotation (≤180°, 150ms) | Links, nav items, accordions |
| **Height transition** | Auto-height expand/collapse, `motion-standard` (200ms) | Accordion open/close (certifications detail, FAQ if added) |
| **Scroll progress** | Thin top bar width tied directly to scroll percentage, no easing lag | Long-form case study/architecture pages only |

## Timing discipline

- **Nothing exceeds 400ms.** Anything longer starts to feel like the site
  is "performing" rather than responding.
- **Reveal-on-scroll fires once per element**, never re-triggers when
  scrolling back up past it — re-triggering reads as gimmicky and
  distracts a visitor trying to re-read something.
- Stagger delay across a list is capped so that even a 10-item list
  finishes revealing within roughly 500–600ms total — long staggered
  reveals feel slow and precious, not premium.

## Explicitly forbidden (with rationale, restated from the brief and design philosophy)

| Forbidden pattern | Why |
|---|---|
| Bounce / spring overshoot | Reads as playful/consumer-app, undermines "engineering maturity" tone |
| Infinite loops (pulsing dots, breathing glows) | Draws continuous attention away from content; battery/CPU cost for zero information value |
| Typing/typewriter text effects | Actively delays the visitor from reading the message — a UX cost disguised as a flourish |
| Particle/animated backgrounds | Zero informational value, associated with generic AI-portfolio templates (explicitly what this project must not look like) |
| Rotating 3D objects | Irrelevant novelty for a backend/systems engineering narrative |
| Auto-playing carousels | Removes user control, associated with dated corporate marketing sites |
| Skill meters filling up on scroll | Combines two rejected patterns at once (meters + gratuitous animation) |
| Flashy page-load intros (splash screens, logo animations before content) | Delays time-to-content, directly hurts the performance and first-impression goals (documents 02, 14) |
| Hover effects that shift layout (not just transform) | Causes layout shift, directly hurts CLS (document 14) and feels unstable |

## Reduced motion is not an afterthought

Per document 13, `prefers-reduced-motion: reduce` disables:
- All `RevealOnScroll` transforms (content still appears, instantly or via
  opacity-only, never staying hidden)
- `ParallaxLayer` entirely
- `PageTransition` cross-fade (instant route change instead)

This is implemented once in a shared `useReducedMotion` hook (document 10)
consumed by every animation component, so compliance is structural, not
dependent on every future component author remembering to check it.

## Animation and performance

- Only `transform` and `opacity` are animated for scroll/hover effects —
  never `width`, `height`, `top`/`left`, or `box-shadow` directly (those
  trigger layout/paint, hurting both smoothness and the INP/CLS budgets in
  document 14). Height transitions (accordion) are the one deliberate
  exception, scoped narrowly and tested for jank.
- All scroll-driven effects use `IntersectionObserver`, never scroll-event
  listeners with manual throttling — better performance, less code, no
  jank risk.

## Review checklist before any animation ships

1. Does it use only an approved pattern from the table above?
2. Is duration within the token scale (document 08) and ≤ 400ms?
3. Does it fire once, not repeatedly, unless it's a persistent
   scroll-progress indicator?
4. Does it degrade correctly under `prefers-reduced-motion`?
5. Does it animate only `transform`/`opacity` (or a justified, tested
   exception)?
6. If removed entirely, would a reviewer notice a loss of clarity — or
   only a loss of decoration? If only decoration, cut it.
