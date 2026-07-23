# 19 — Risks

Each risk includes likelihood/impact framing and a concrete mitigation
already reflected in the relevant document, not a vague "we'll be
careful."

## 1. Content risk: insufficient verified detail to make case studies credible
**Likelihood:** High (this is the single biggest real risk to the project).
**Impact:** High — thin case studies undermine the entire premise (document
01) that the site proves depth a resume can't.
**Mitigation:** The data-collection checklist in document 17 is completed
*before* final copywriting begins for each case study. Case studies are
sequenced (document 20) so the first 1–2 launched are the ones with the
richest available real detail, buying time to gather specifics on the
rest. No case study ships with invented tradeoffs or metrics — a
qualitative-but-true case study is always preferred over a
quantitative-but-fabricated one.

## 2. Design risk: drifting toward a generic "AI-generated portfolio" look
**Likelihood:** Medium — this is the default failure mode of fast-built
portfolio sites, and the explicit thing this brief must avoid.
**Impact:** High — directly contradicts the core positioning (document 01).
**Mitigation:** Strict, literal adherence to the token system (document
08) — no ad hoc gradients, shadows, or colors introduced during
implementation. A manual design review checklist (document 03's "test for
every visual decision") is applied before each phase's sign-off (document
20), not just at final QA.

## 3. Scope creep: attempting all 11+ pages before any launch
**Likelihood:** Medium.
**Impact:** Medium — delays getting real recruiter traffic and real
analytics feedback (document 01).
**Mitigation:** Phased plan (document 20) ships a working, complete-enough
MVP (Home, Resume, Contact, 2 flagship case studies) before building out
the remaining depth pages.

## 4. Over-animation risk
**Likelihood:** Medium — motion is fun to add and easy to over-apply once
the base components exist.
**Impact:** Medium — undermines the "invisible, purposeful" motion
principle (document 16) and can hurt performance/accessibility budgets
(documents 13, 14).
**Mitigation:** The document 16 review checklist is a required step before
any new animation is merged; reduced-motion and performance budgets are
enforced automatically in CI (documents 11, 13, 14), not left to reviewer
discretion alone.

## 5. SEO risk: thin-content pages hurting overall site ranking quality
**Likelihood:** Medium, specifically for Certifications/Achievements if
real data is sparse.
**Impact:** Low–Medium.
**Mitigation:** Document 06's explicit rule — merge thin pages into a
richer parent page (Certifications into Achievements) rather than
publishing a near-empty standalone page; only split them out once there's
genuinely enough content to justify a dedicated page and URL.

## 6. Maintenance risk: the site goes stale within months
**Likelihood:** Medium — common failure mode for personal sites once the
initial motivation fades.
**Impact:** Medium — a portfolio with a 2023 "last updated" resume date
undermines the freshness signal, especially for a candidate positioning
around current AI engineering relevance.
**Mitigation:** Content-as-typed-data architecture (document 10/11) makes
updates a small, low-friction PR rather than a redesign project; the
Resume page explicitly surfaces a "last updated" date (document 06) as a
forcing function/visible accountability signal.

## 7. Performance risk from architecture diagrams / imagery
**Likelihood:** Low–Medium if diagrams are done as heavy raster
screenshots instead of SVG.
**Impact:** Medium — directly threatens the Lighthouse-100 / LCP budget
(document 14).
**Mitigation:** Diagrams are authored as SVG by policy (document 12/14);
`next/image` handles any raster imagery with lazy-loading below the fold.

## 8. Accessibility regression risk introduced by future features (command palette, interactive diagrams)
**Likelihood:** Medium, specifically for Phase 3+ features (document 18).
**Impact:** Medium–High — a professionalism-critical failure for this
specific audience (a CTO noticing broken keyboard nav is a strong negative
signal).
**Mitigation:** Automated `axe-core` checks run in CI for every page,
including new Phase 3+ additions, before they can merge (documents 11, 13)
— accessibility is a build gate, not a launch-week audit.

## 9. Legal/confidentiality risk: enterprise project detail vs. NDA obligations
**Likelihood:** Medium — enterprise Java engineering roles commonly
involve confidential client/business context (this applies especially to
projects delivered through Opal BPM, TeamLease, and InterGlobe engagements).
**Impact:** High if violated (professional/legal consequences for Sanjay).
**Mitigation:** Case studies are written to describe **role, architecture,
and technical decisions**, not proprietary business logic, client
identities (unless already public), or confidential data. The content
checklist (document 17) explicitly requires confirming what must stay
abstracted before publishing any project detail.

## 10. Single point of failure: one-person project with no team redundancy
**Likelihood:** High (structurally true for a personal portfolio).
**Impact:** Low–Medium — mainly a velocity/maintenance risk, not a
launch-blocking one.
**Mitigation:** Documentation-first approach (this entire set) ensures
that if Sanjay pauses and resumes the project months later — or hands a
task to a freelance developer/designer — there is a complete, unambiguous
spec to work from without re-deriving decisions from memory.

## Risk monitoring cadence

Risks 1, 6, and 9 (content accuracy, staleness, confidentiality) are
**recurring** risks requiring periodic review (quarterly), not one-time
mitigations — flagged explicitly in document 20's post-launch phase.
