# 08 — Design System Specification

This is the literal token table. Nothing in build phases should invent a
spacing value, color, or duration outside this document. If a value is
needed that isn't here, this document gets updated first — the design
system is the source of truth, not any individual component.

## 1. Spacing scale

Base unit: **4px**. All spacing (margin, padding, gap) is drawn from this
scale — no arbitrary values.

| Token | Value | Typical use |
|---|---|---|
| `space-1` | 4px | Icon-to-text gap, tight inline spacing |
| `space-2` | 8px | Badge padding, tight stacks |
| `space-3` | 12px | Compact card padding |
| `space-4` | 16px | Default component padding |
| `space-5` | 24px | Card padding (default) |
| `space-6` | 32px | Small section gaps |
| `space-7` | 48px | Component-to-component gaps |
| `space-8` | 64px | Section internal padding (mobile) |
| `space-9` | 96px | Section internal padding (desktop) |
| `space-10` | 128px | Major section separation (desktop) |
| `space-11` | 160px | Hero vertical padding (large desktop) |
| `space-12` | 192px | Reserved — large-screen hero/section max |

## 2. Typography scale

**Two typefaces only, plus a monospace accent:**

- **Display/Heading font:** A neutral, geometric-humanist grotesque
  (e.g., Inter or Geist Sans class) — carries hierarchy through weight and
  size, not decoration.
- **Body font:** Same family as heading (single-family system) for
  consistency and performance — differentiated by weight/size only. Using
  one variable font avoids extra font-loading cost (ties into Performance
  Strategy, document 14).
- **Monospace accent font:** A clean geometric mono (e.g., JetBrains Mono
  or Geist Mono) — used *only* for: tech-stack tags/badges, metadata labels
  (dates, "Role:", version-like labels), code snippets if ever shown,
  and the footer's technical credibility line. Never used for headings or
  body prose. This is the GitHub/Vercel-derived credibility signal from
  document 03.

**Type scale** (modular scale, ratio ~1.25, rem-based, 16px root):

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 12px / 0.75rem | 1.5 | 500 | Metadata, tags, captions |
| `text-sm` | 14px / 0.875rem | 1.5 | 400/500 | Secondary text, nav labels |
| `text-base` | 16px / 1rem | 1.65 | 400 | Body copy |
| `text-lg` | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs, case-study intros |
| `text-xl` | 20px / 1.25rem | 1.5 | 500 | Card titles |
| `text-2xl` | 24px / 1.5rem | 1.4 | 600 | Sub-section headings (h3) |
| `text-3xl` | 32px / 2rem | 1.3 | 600 | Section headings (h2) |
| `text-4xl` | 40px / 2.5rem | 1.2 | 650/700 | Page titles (h1, non-hero) |
| `text-5xl` | 56px / 3.5rem | 1.1 | 700 | Hero headline (desktop) |
| `text-6xl` | 72px / 4.5rem | 1.05 | 700 | Hero headline (large desktop, ≥1440px) |

**Reading measure (line length):** body/prose containers capped at
`65–75ch` max-width — never full-bleed paragraph text, even on large
screens (readability discipline from document 03).

**Tracking:** headings at `text-3xl` and above get slightly tightened
letter-spacing (-0.01em to -0.02em); body copy uses default tracking;
monospace tags use +0.01em (slightly loosened, standard practice for small
mono text legibility).

## 3. Color tokens

**Palette: near-monochrome neutral scale + one accent.** No secondary
"brand" color, no rainbow of semantic colors beyond what's functionally
necessary.

**Neutral scale** (11 steps, used for background/surface/border/text):

| Token | Approx. value | Use |
|---|---|---|
| `neutral-0` | #FFFFFF | Page background |
| `neutral-50` | #FAFAFA | Subtle surface (cards, alternating sections) |
| `neutral-100` | #F2F2F3 | Hover surface, table stripes |
| `neutral-200` | #E5E5E7 | Borders, dividers |
| `neutral-300` | #D4D4D7 | Disabled borders |
| `neutral-400` | #A3A3A8 | Placeholder text, disabled text |
| `neutral-500` | #7A7A82 | Secondary/muted text |
| `neutral-600` | #5C5C64 | Body text (secondary emphasis) |
| `neutral-700` | #404046 | Body text (primary) |
| `neutral-800` | #26262B | Headings |
| `neutral-950` | #0D0D0F | Maximum-emphasis text, footer background (if inverted footer is used) |

**Accent color:** one restrained, confident hue — recommend a **deep,
desaturated blue** (in the family of `#1D4ED8`–`#1E3A8A`, final exact hex
to be selected during visual design against contrast testing), not
purple/indigo (overused in AI-product templates) and not green (associated
with "success/fintech" clichés). The accent must pass **4.5:1 contrast**
against white for text use.

| Token | Use |
|---|---|
| `accent-600` | Primary interactive color — links, primary button background, active nav indicator, focus ring |
| `accent-700` | Hover/pressed state for accent elements |
| `accent-50` | Extremely subtle accent tint for selected/active backgrounds (e.g., active nav pill) — used sparingly |

**Semantic tokens** (functional only, not decorative — used only where
truly needed, e.g., a "Production" status tag on a case study, or form
validation states):

| Token | Use |
|---|---|
| `success` | Muted green, form success confirmation only |
| `danger` | Muted red, form validation errors only |
| `warning` | Not used in v1 — no scenario requires it |

**Explicit rule:** the accent color is never used for large background
fills (no accent-colored hero backgrounds, no accent gradients). It marks
*interactivity*, full stop.

## 4. Border radius scale

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 6px | Tags, badges, small buttons |
| `radius-md` | 10px | Buttons, form fields |
| `radius-lg` | 16px | Cards |
| `radius-xl` | 24px | Large feature cards / hero panels |
| `radius-full` | 9999px | Pills, avatar, circular icon buttons |

Corners are consistent across the whole system — no mixing sharp and
heavily rounded elements in the same view.

## 5. Elevation (shadow) scale

Maximum **3 shadow levels**, all very soft/low-opacity (no hard drop
shadows, no colored shadows):

| Token | Spec (approx.) | Use |
|---|---|---|
| `elevation-0` | none, 1px neutral-200 border instead | Default card resting state |
| `elevation-1` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.03)` | Hover state on cards |
| `elevation-2` | `0 8px 24px rgba(0,0,0,0.06)` | Dropdowns, mobile drawer, modal/dialog |

Most static surfaces (cards, sections) use **borders, not shadows**, for
definition — shadows are reserved for elements that are transiently
"above" the page (menus, drawers) — consistent with the flat, print-like
aesthetic of Stripe/Linear rather than skeuomorphic depth.

## 6. Container widths

| Token | Value | Use |
|---|---|---|
| `container-prose` | 720px | Case study body text, long-form reading |
| `container-content` | 1120px | Standard page content width |
| `container-wide` | 1280px | Hero sections, card grids |
| `container-full` | 1440px (hard cap) | Absolute max — content never stretches full-bleed on ultrawide monitors |

## 7. Responsive breakpoints

| Token | Min-width | Target device |
|---|---|---|
| `xs` | 375px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape) / small laptops |
| `xl` | 1280px | Laptops/desktops |
| `2xl` | 1536px | Large desktop monitors |

(Full behavioral spec per breakpoint in document 15.)

## 8. Animation tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-micro` | 120ms | ease-out | Hover state, focus ring, button press |
| `motion-standard` | 200ms | ease-out | Nav drawer open/close, dropdown, tooltip |
| `motion-entrance` | 320ms | cubic-bezier(0.16, 1, 0.3, 1) | Scroll-reveal fade/slide-in |
| `motion-page` | 200ms | ease-in-out | Route/page transition fade |

Global rule: **nothing exceeds 400ms.** Nothing loops. Nothing bounces
(no spring overshoot). Full rationale and forbidden-pattern list in
document 16. `prefers-reduced-motion` disables `motion-entrance` and
`motion-page` transforms entirely, leaving only instant or opacity-only
changes.

## 9. Icon system

- **Single icon set:** Lucide (or an equivalent single-weight, open
  outline set) — never mix icon sets.
- **Stroke width:** 1.5–1.75px consistently.
- **Sizes:** 16px (inline with text-sm), 20px (default UI), 24px
  (standalone/nav icons). No other sizes used.
- Icons are **never decorative filler** — every icon must label a specific
  function (external link, download, menu, close, arrow) or accompany a
  skill-category header at most. Explicitly no "floating tech logos"
  (document 03).

## 10. Grid system

- **12-column grid** at `lg` and above; collapses to 4 columns at `sm`–`md`,
  single column below `sm`.
- **Gutter:** `space-6` (32px) at `xl`+, `space-5` (24px) at `md`–`lg`,
  `space-4` (16px) below `md`.
- Card grids (case studies, expertise categories) use CSS Grid with
  `auto-fit`/`minmax` for natural reflow rather than fixed breakpoint-only
  column counts, reducing the chance of awkward orphaned cards.

## 11. Component sizing tokens (buttons/inputs)

| Token | Height | Use |
|---|---|---|
| `control-sm` | 32px | Compact inline actions |
| `control-md` | 40px | Default buttons/inputs |
| `control-lg` | 48px | Primary CTAs (Resume/Contact) |

All interactive controls respect a **minimum 44×44px touch target** on
touch devices even if the visual control is smaller (via padding), per
document 13.
