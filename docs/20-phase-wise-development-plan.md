# 20 — Phase-Wise Development Plan

Each phase has explicit goals, deliverables, and **exit criteria** — a
phase is not "done" because time was spent on it, it's done because its
exit criteria are verifiably true.

---

## Phase 0 — Discovery & Content Collection
**Goal:** Close the gap between "verified facts" and "publishable content"
before any visual design or code work starts.

**Deliverables:**
- Completed data-collection checklist (document 17) — dates, scope
  details, decision/tradeoff detail per case study, certification data (if
  any), NDA-sensitivity review, final resume PDF, LinkedIn/GitHub URLs.
- Sign-off on the full sitemap (document 06) and this entire documentation
  set — i.e., this deliverable.
- Domain name selected/purchased.

**Exit criteria:** Every `[NEEDS INPUT]` marker in document 17 for at
least the first 2 flagship case studies is resolved with real answers.

---

## Phase 1 — Foundation (MVP build)
**Goal:** A small, complete, fully-polished site that already achieves the
core objective (document 01) — even before every deep page exists.

**Deliverables:**
- Next.js project scaffold per document 10's folder structure.
- Design tokens implemented exactly per document 08 (Tailwind config,
  CSS variables, fonts self-hosted).
- Layout shell: `SiteHeader`, `SiteFooter`, `PageShell`, mobile nav drawer.
- Home page: full hero, proof strip, expertise summary, featured case
  study previews (using placeholder/early-draft case study content if
  Phase 0 isn't fully complete for all 5), leadership preview, AI
  engineering preview, closing CTA.
- `/resume` page (viewer + download).
- `/contact` page (form + Server Action + email delivery working).
- Baseline SEO: metadata, sitemap, robots, `Person` JSON-LD.
- Baseline accessibility: semantic landmarks, skip link, focus states,
  keyboard nav across everything built so far.
- CI pipeline stood up (lint, typecheck, test, build, Lighthouse CI).

**Exit criteria:** Lighthouse scores meet or exceed the document 14
budget on Home/Resume/Contact; full keyboard-only walkthrough passes;
resume downloads and contact form submissions work end-to-end in
production.

**This phase alone is a legitimate, launchable v1.** Everything after this
is additive depth, not a blocker to going live.

---

## Phase 2 — Flagship Case Studies + Leadership + Architecture
**Goal:** Give the Engineering Manager and CTO personas (document 04) the
depth they need to convert.

**Deliverables:**
- 2–3 flagship case studies fully written and built (prioritize the
  projects with the richest available real detail from Phase 0 — likely
  OAuth2 Authentication Platform and Financial Transaction Platform,
  given their strong alignment to the Security/Identity and
  transactional-integrity themes recruiters search for).
- `/case-studies` index page.
- `/leadership` page, all 6 principles with real practice detail.
- `/architecture` page with 2–3 cross-cutting decision-record write-ups
  drawn from the flagship case studies.
- `CaseStudyDetail` template fully built (Context, Role & Scope,
  Architecture Overview, Decisions & Tradeoffs, Challenges, Outcome, Stack,
  Related), with `Article`/`BreadcrumbList` JSON-LD and TOC sidebar.
- Internal linking between case studies, expertise, leadership, and
  architecture pages (document 12).

**Exit criteria:** A cold technical reader (ideally a real outside
engineer, not the project team) can read one case study and correctly
explain, unprompted, what specific decision Sanjay made and what tradeoff
was accepted.

---

## Phase 3 — AI Engineering + Remaining Case Studies + Achievements
**Goal:** Complete the technical-depth surface area and the "current,
adaptable" differentiation story (Founder/Startup CTO persona, document
04).

**Deliverables:**
- `/ai-engineering` page: all 7 projects (HiringEasy, ATS Resume Builder,
  AI Resume Optimizer, Cover Letter Generator, Resume Parser, AI Resume
  Matching, RAG Applications) with problem/approach/stack detail.
- Remaining case studies (Enterprise Artwork Management Platform,
  Enterprise Exchange Platform, Beckn Protocol Verification Adapter).
- `/journey` page (full timeline across all 3 companies).
- `/expertise` page (full grouped skill matrix with cross-links).
- `/achievements` (and `/certifications` if real data justifies a
  standalone page per document 06's merge rule).
- Command palette **only if** ahead of schedule — otherwise deferred to
  Phase 6 per document 18 (not a Phase 3 requirement, a stretch item).

**Exit criteria:** Full sitemap (document 06) is live except Blog; every
page passes the same Lighthouse/accessibility bar as Phase 1.

---

## Phase 4 — Polish & Hardening
**Goal:** Move from "correct" to "handcrafted premium," and verify every
non-functional requirement rigorously rather than by assumption.

**Deliverables:**
- Full animation pass against document 16's checklist — remove anything
  that doesn't earn its place, verify reduced-motion fallback everywhere.
- Full accessibility audit: automated (axe in CI) + manual keyboard
  walkthrough + screen reader spot-check (VoiceOver + NVDA) per document 13.
- Full performance audit against document 14's budget table on real
  devices (not just lab/simulated throttling).
- Full responsive QA against document 15's device matrix, all breakpoints,
  both orientations where relevant.
- Cross-browser QA (Chrome, Safari, Firefox, Edge — desktop and mobile
  Safari/Chrome).
- Visual design consistency pass — every spacing/color/radius value
  traced back to a document 08 token, zero one-off exceptions.
- Copy edit pass against document 17's banned-phrase list and editing
  standard (cut, don't add).

**Exit criteria:** Lighthouse 100/100/100/100 on Home, one case study, and
Contact, verified on both mobile and desktop profiles, held for 3
consecutive CI runs (not a one-time lucky score).

---

## Phase 5 — Launch
**Goal:** Go live, be findable, be monitored.

**Deliverables:**
- Production deploy on the final domain.
- Google Search Console verification + sitemap submission.
- Analytics confirmed capturing the document 01 success signals (resume
  download, contact submit, scroll depth).
- Resume PDF, LinkedIn, and GitHub cross-linked consistently (`sameAs`,
  footer, resume header).
- Accessibility statement published (document 13).
- Uptime/Web Vitals field monitoring dashboard confirmed receiving real
  data.

**Exit criteria:** Site is publicly live at the final domain, indexed
within Search Console, and the name-query SERP (document 12) is verified
to surface the site correctly within the first review window (typically
1–2 weeks post-submission).

---

## Phase 6 — Post-Launch (ongoing, see document 18 for full detail)
**Goal:** Keep the site current and extend it deliberately, never
reactively.

**Cadence:**
- **Quarterly content review** — re-verify every fact still reflects
  current reality (job status, dates, any new verified projects), refresh
  the resume "last updated" date, and re-check for accidental staleness
  (document 19, risk 6).
- **Blog launch** once 3+ substantive posts are ready (document 18).
- **Command palette, interactive diagrams, testimonials, CMS migration** —
  built opportunistically per document 18, never at the expense of the
  core pages' accuracy or performance budget.

**Exit criteria for each future addition:** It must pass the exact same
bar as every Phase 1–4 deliverable — token-compliant design, Lighthouse
budget, WCAG AA, and zero invented content — before it ships. Nothing gets
a lower bar just because it ships later.
