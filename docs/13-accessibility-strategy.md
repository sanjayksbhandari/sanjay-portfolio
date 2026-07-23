# 13 — Accessibility Strategy

## Standard

**WCAG 2.1/2.2 Level AA**, verified — not assumed — through automated
testing in CI plus manual review before each launch phase. Accessibility
is treated the same way a senior engineer treats test coverage: a build
gate, not a nice-to-have.

## Color & contrast

- Body text (`neutral-700`/`neutral-800` on `neutral-0`/`neutral-50`)
  verified at **≥ 4.5:1** contrast ratio.
- Large text (headings ≥ 24px/18.66px-bold) verified at **≥ 3:1**.
- The accent color (document 08) is contrast-checked against white
  specifically for its use as link/button text — if the initially chosen
  hue fails 4.5:1 for text use, it is either darkened for text contexts or
  used only as a fill behind white text (button), never as small text on
  white.
- Focus rings use the accent color at full opacity with a minimum 2px
  offset outline — never relying on color alone (also has a visible
  outline shape, satisfying "not color alone" for state indication).
- No information is conveyed by color alone: status tags ("Production",
  "Personal Project") carry text labels, not color-only dots; form errors
  show icon + text, not just a red border.

## Keyboard navigation

- 100% of interactive elements reachable and operable via keyboard alone:
  nav links, mobile drawer, accordions, tooltips (focus-triggered, not
  hover-only), TOC links, contact form, future command palette.
- Logical tab order matches visual/reading order in every layout,
  including the two-column case-study + TOC layout (TOC is either after
  main content in DOM order with visual placement via CSS, or explicitly
  tested to confirm tab order isn't disorienting).
- **Skip-to-content link** is the first focusable element on every page,
  visually hidden until focused.
- **Focus trap** inside the mobile nav drawer while open; focus returns to
  the trigger button on close.
- **Escape key** closes any open overlay (drawer, tooltip, accordion where
  applicable).
- No keyboard traps anywhere (a common failure mode with poorly built
  drawers/modals) — explicitly tested.

## Focus states

- A distinct `:focus-visible` style (not `:focus`, to avoid unwanted
  rings on mouse clicks) is defined once at the design-token level
  (document 08) and applied consistently — never suppressed
  (`outline: none` without a replacement is banned project-wide).

## Semantic HTML & landmarks

- One `<header>` (site header), one `<nav>` for primary navigation
  (labeled `aria-label="Primary"`), one `<main>` per page, one `<footer>`.
- Case study TOC and mobile drawer nav are additional `<nav>` landmarks
  with distinguishing `aria-label`s (e.g., `"Table of contents"`,
  `"Mobile"`).
- Exactly one `<h1>` per page; heading levels never skip (no `<h2>` to
  `<h4>` jumps) — enforced by the `SectionHeading` component contract
  (document 09/12).
- Lists (skill groups, achievements, cert lists) use real `<ul>/<ol>`
  elements, not `<div>` soup with visual list styling.

## Screen reader support

- All icon-only buttons (menu, close, external-link) have explicit
  `aria-label`s describing the action, not the icon (e.g., "Open
  navigation menu", not "hamburger icon").
- Decorative elements (e.g., a subtle background shape) are marked
  `aria-hidden="true"` or implemented as CSS backgrounds, never as
  meaningful `<img>` elements without alt text.
- Form fields have programmatically associated `<label>`s (not
  placeholder-as-label); validation errors are associated via
  `aria-describedby` and announced via `aria-live="polite"` on submit
  (success/error confirmation).
- Dynamic content changes (drawer open, accordion expand) update
  `aria-expanded`/`aria-hidden` attributes correctly.

## Reduced motion

- `prefers-reduced-motion: reduce` is respected globally: all
  `motion-entrance` reveal transforms and `ParallaxLayer` movement are
  disabled; elements appear via instant or opacity-only transition
  instead of being skipped entirely (content must never depend on
  animation to become visible/reachable).
- Page transitions fall back to no-fade (instant) under reduced motion.
- This is implemented once, centrally (a `useReducedMotion` hook consumed
  by every animation component per document 10), not re-implemented
  per-component, to avoid drift/omission.

## Forms

- Every input has a visible label, correct `type` (`email`, `text`),
  and appropriate `autocomplete` attributes.
- Errors are specific and actionable ("Enter a valid email address," not
  "Invalid input") and are both visually and programmatically associated
  with their field.
- Submission confirmation is announced to assistive tech (`aria-live`
  region), not communicated by visual state change alone.

## Target sizes & touch

- Minimum 44×44px touch target for every interactive control on touch
  devices, per document 08's control-sizing tokens — verified explicitly
  for compact elements like tag/badge links and close buttons, which are
  the most common place this rule gets silently violated.

## Resize & zoom

- Layout verified to remain usable (no clipped text, no horizontal
  scroll, no overlapping elements) at 200% browser zoom and at 400%
  text-only zoom, per WCAG 1.4.4/1.4.10.
- No fixed-pixel container that could clip reflowed text at large zoom
  levels; containers use max-widths with fluid internal reflow.

## Testing & verification plan

| Method | Tooling | When |
|---|---|---|
| Automated audit | `axe-core` (via Playwright integration) | Every CI run, every page |
| Static lint | `eslint-plugin-jsx-a11y` | Every commit |
| Manual keyboard walkthrough | Human tester, full site, no mouse | Before each phase's launch (document 20) |
| Screen reader spot-check | VoiceOver (macOS/iOS) + NVDA (Windows, if available) | Before Phase 4 (polish) sign-off, on Home, one Case Study, Contact |
| Color contrast audit | Automated (axe) + manual spot-check on final chosen accent hex | Once accent color is finalized in visual design |
| Reduced-motion check | Manual, OS-level setting toggled | Before Phase 4 sign-off |

## Accessibility statement

A short, honest **Accessibility Statement** is planned for the footer
(linking to a brief page or section): what standard is targeted (WCAG 2.1
AA), how to report an issue (via the Contact page), and last-reviewed
date. This is itself a professionalism signal to the CTO/VP Engineering
persona (document 04) — very few personal portfolios bother, and doing so
consistently demonstrates the same rigor claimed in the "Architecture
Reviews" skill line.
