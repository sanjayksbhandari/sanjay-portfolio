# 18 — Future Roadmap (Post-Launch)

Everything here is explicitly **out of scope** for the initial phases
(document 20) and is sequenced only after the core credibility pages are
live, correct, and stable. Shipping these early would either delay the
core launch or (in the case of the blog) create a thin/empty section that
actively hurts credibility more than omitting it.

## Near-term (3–6 months post-launch)

### Technical writing / Blog
The single highest-value future addition. Long-form technical writing
(architecture retrospectives, Java + AI integration patterns, lessons from
enterprise migrations) is one of the strongest possible signals for the
CTO/Principal Engineer persona (document 04) — but only if genuinely
substantive. Launch criteria: minimum 3 fully-written, non-thin posts
ready before the section goes live; ISR-based rendering (document 11);
RSS feed; each post gets full SEO/JSON-LD treatment (`Article` schema)
matching the case study standard (document 12).

### Testimonials / Recommendations
If genuine LinkedIn recommendations or manager/peer quotes exist and
permission is granted, a small, restrained testimonials section
(3–5 quotes max, attributed with name/role/company, no anonymous
"Client, Fortune 500 company" vagueness) strengthens the Leadership and
Case Study pages. Not launched without real, attributable quotes —
fabricated or anonymized testimonials would violate the project's core
"no invented content" rule and are explicitly rejected.

### Analytics-informed content refinement
Once real scroll-depth and conversion data exists (document 01's success
metrics), revisit case-study ordering, trim sections with high drop-off,
and expand sections with high engagement.

## Mid-term (6–12 months)

### Command palette (Cmd/Ctrl+K)
As previewed in document 07 — global fast navigation/search across case
studies, expertise, and (by then) blog posts. Ships once there is enough
content depth for search to add real value, and is scoped tightly to avoid
becoming a gimmick.

### Interactive architecture diagrams
Upgrade static SVG architecture diagrams on flagship case studies (e.g.,
OAuth2 Authentication Platform, Financial Transaction Platform) to
lightweight interactive versions (hover a component to see its role,
click to expand a sub-flow) — strictly additive to the existing static
diagram, never replacing it, and built with the same "purposeful
animation only" discipline (document 16).

### Headless CMS migration for content
If content update frequency increases (active blogging, frequent case
study additions), migrate `src/content/*` from typed TS files to a
git-based headless CMS (e.g., a Markdown/MDX + Git-backed system) so
non-code content edits don't require a PR review cycle for every
typo fix — while keeping the type-safety and version-control benefits
documented in document 11.

### Speaking / OSS / community contributions section
Only added if and when real, verifiable instances exist (a conference
talk, an open-source contribution, a published article elsewhere). Not
pre-built as an empty placeholder section.

## Long-term / opportunistic

### Multi-format resume export
Beyond the static PDF, offer a "print-optimized" web view of the resume
page and possibly a structured `JSON Resume`-style data export — a subtle
additional engineering-credibility signal for a technical audience that
appreciates structured data.

### Localization
Not currently justified — the target audience (document 04) is English-
reading global tech hiring managers/recruiters. Revisit only if there's a
specific, real business reason (e.g., targeting a specific regional
market).

### Dark mode
Explicitly **not prioritized**. The design philosophy (document 03)
centers on a bright, white, "clean documentation" aesthetic deliberately
distinct from "dark hacker" portfolio clichés the brief asks to avoid.
A dark mode could be added later purely as a user preference toggle
without changing the core identity, but it is not a v1–v3 priority and
must never become the default or primary experience.

## Explicit non-roadmap items (will not be built)

- Gamified or interactive "resume builder" tools aimed at other job
  seekers (that's the domain of Sanjay's *own product*, HiringEasy/ATS
  tools — mixing that into the personal portfolio would dilute both).
- A public blog comment system (maintenance burden, spam risk, no real
  benefit to the recruiter-conversion objective in document 01).
- Any monetization (ads, affiliate links, sponsorships) — inconsistent
  with a credibility-first professional portfolio.
