# Changelog

All notable changes to this portfolio are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/).
Versioning follows [Semantic Versioning](https://semver.org/) as defined in
`docs/phase-18-continuous-improvement/05-versioning-strategy.md`.

The live site footer displays `package.json` → `site.version`. This file is
also served at `/CHANGELOG.md`.

## [Unreleased]

### Planned

- Public email / GitHub URLs when confirmed
- Contact form email delivery provider
- Availability preferences (relocation, work mode) when confirmed

## [1.2.0] — 2026-07-24

### Added

- Recruiter-ready resume PDF (`public/resume/…`) generated from verified journey content
- Working Resume Center download / online / print paths with version metadata
- Full experience section on the online resume page

### Changed

- Public site no longer surfaces TODO / content-gap UI
- Professional Hub shows only verified contact channels (LinkedIn + portfolio)
- Career snapshot uses verified “most recent role” instead of empty current-position TODO
- Hero CTAs: Journey, Resume, Contact
- Page intros shortened for recruiter scan speed

### Removed

- Visitor-facing TodoNote / TodoInline / ContentStatus blocks
- Incomplete contact methods (email/GitHub/HiringEasy/Calendly placeholders)
- “Blog — coming soon” footer label
- Open-TODO fact cards and planned social rows

### Reason

Ship a complete, recruiter-ready release candidate without inventing unverified facts.

### Impact

Recruiters see a finished product: resume download works, LinkedIn is clear, no unfinished scaffolding.

## [1.1.0] — 2026-07-24

### Changed

- Premium visual refinement (Phase 19): warm light canvas, independent
  charcoal dark theme, elevated surfaces, refined typography rhythm,
  button elevation, ambient CSS backgrounds
- Hero spacing and ambient lighting only — **no content changes**

### Reason

Raise perceived quality to a calm, engineering-product standard without
redesigning IA or inventing visuals for their own sake.

### Impact

Same pages and features; clearer hierarchy and a more premium first
impression in light and dark mode.

## [1.0.1] — 2026-07-24

### Added

- Phase 18 continuous-improvement handbook, roadmaps, and checklists
- Public changelog (`CHANGELOG.md` / `/CHANGELOG.md`)
- CI workflow for lint, typecheck, content, links, and production build
- Contribution guide (`CONTRIBUTING.md`)

### Changed

- Footer version links to the public changelog
- Package version → `1.0.1`

### Reason

Establish long-term product ownership practices without redesigning pages
or inventing content.

### Impact

Operators have a repeatable release, maintenance, and measurement cadence;
visitors can see what changed between versions.

## [1.0.0] — 2026-07-24

### Added

- Initial production release of the engineering portfolio (Phases 1–17)
- App Router surfaces: Home, Showcase, Journey, Expertise, Case Studies,
  Leadership, Architecture, AI Engineering, Achievements, Certifications,
  Resume, Professional Hub
- Content Engine + Experience Framework
- Production hardening (security headers, SEO fixes, analytics hooks)
- Launch readiness (Vercel config, preview noindex, runbooks)

### Reason

Ship a credible, statically generated engineering portfolio with honest
content gaps marked as TODOs rather than invented facts.

### Impact

Site is engineering-ready for Vercel production; go-live still depends on
domain, env flags, and verified content integrations.
