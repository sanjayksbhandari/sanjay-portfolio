# 02 — UX Vision

## In one line

The site should feel the way a well-run engineering org feels from the
outside: calm, precise, nothing on fire, everything documented.

## Core UX principles

### 1. Evidence over adjectives
Never write "strong leadership skills." Show a leadership principle plus
the case study where it was exercised. Every claim links to proof or is
removed.

### 2. Clarity over cleverness
If a clever interaction requires a visitor to figure out how the UI works,
it has failed. Recruiters are not here to play; they are here to decide in
minutes whether to escalate a candidate. Novel interaction patterns are a
tax on their time and are rejected by default.

### 3. Scannability first, depth on demand
Every page must work at two reading speeds simultaneously:
- **Skim mode** (10–30 seconds): headline, one-line summary, a badge/tag
  row, a "read more" affordance. A skimmer should walk away with an
  accurate impression even having read almost nothing.
- **Study mode** (2–8 minutes): full case study, architecture reasoning,
  tradeoffs, role clarity. A CTO doing due diligence before an onsite gets
  full technical nutrition here.

This is executed through **progressive disclosure**: summary cards that
expand or link to full detail, not walls of text competing for attention.

### 4. Calm confidence, not salesmanship
No countdown timers, no "limited availability," no exclamation points, no
oversized "HIRE ME" buttons. Confidence is communicated through precision
of language and design restraint — the same way a senior engineer's PR
descriptions are calm and exact, not hype-driven.

### 5. Single, consistent path to action
Wherever a visitor is on the site, "Download Resume" and "Contact" are at
most one interaction away (sticky header). We do not force a funnel; we
make the exit always available, because senior hiring decisions are made
asynchronously by people who may only spend 45 seconds on this visit and
come back later.

## The emotional arc

| Stage | Visitor emotion (target) | Design mechanism |
|---|---|---|
| 0–5s (Hero) | "This person is serious." | Restrained typography, no photo-hero cliché, precise one-line positioning, real title and years, not a tagline |
| 5–20s (Expertise scan) | "This maps to what I need." | Skill grouping by domain (not a wall of 30 logos), plain-language category labels |
| 20–60s (Case studies) | "This isn't fluff — there's real system thinking here." | Problem → decision → tradeoff structure, architecture diagrams, named technologies tied to real constraints |
| 1–3 min (Leadership / Architecture) | "I can imagine this person running a team / owning an incident." | Concrete principles with concrete evidence, no leadership-poster language |
| 3–5 min (AI Engineering) | "This person is current, not stuck in 2015 Java." | Real shipped projects (HiringEasy, ATS tooling), technical specificity about RAG/LangChain use, not buzzword dropping |
| Exit | "I know exactly what to do next." | Persistent, unambiguous resume/contact CTA; no dead ends |

## Applied UX heuristics

- **Jakob's Law** — navigation, layout, and interaction patterns match
  what visitors already know from GitHub, Stripe docs, and Linear. We do
  not train visitors on a new interaction model.
- **Hick's Law** — primary navigation is capped at 6–7 items (document 07);
  every additional choice is deferred to secondary navigation or in-page
  content.
- **Fitts's Law** — primary CTAs (Resume, Contact) are large, high-contrast
  (via the single accent color), and consistently positioned (top-right of
  header, and repeated at natural page-end points).
- **Miller's Law / chunking** — the 25+ technology list is never shown as
  a flat list. It is grouped into 5–6 named domains (Backend & Frameworks,
  Data & Messaging, Cloud & Delivery, Security & Identity, AI Engineering,
  Leadership Practices) so a scanner processes categories, not items.
- **Von Restorff Effect (isolation effect)** — the single accent color is
  reserved almost exclusively for interactive/actionable elements (links,
  primary buttons, active nav state) so it always signals "you can act
  here," never used decoratively.
- **Peak-End Rule** — the strongest case study is not buried; it is
  either first or last in the case-study list, and the contact page ends
  on a specific, low-friction ask rather than a generic form wall.

## What "premium" means here (operationalized, not vibes)

Premium is not gold accents or heavy shadows. Premium, for this audience,
is:
- Type that is set with real optical care (line-height, measure/line
  length, tracking on headings) — see document 08.
- Nothing misaligned to the grid, ever.
- Zero layout shift, zero janky scroll.
- Content that is edited down, not padded up. Every section could be
  30% longer; it isn't, because restraint reads as confidence.
- Fast. A slow "premium" site reads as a contradiction to this specific
  audience of engineers.

## Non-goals for UX

- We do not optimize for session duration or pageviews. A hiring manager
  who downloads the resume in 40 seconds because everything was
  immediately clear is a **UX success**, not a failure to "engage."
- We do not gamify, personalize, or use dark patterns (fake scarcity,
  forced email gates before viewing content, cookie-consent dark patterns).
