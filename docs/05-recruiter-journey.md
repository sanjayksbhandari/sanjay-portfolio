# 05 — Recruiter Journey

## Purpose

Map the exact path a visitor takes from arrival to conversion (resume
download or contact), for both the fast-path (recruiter) and slow-path
(technical evaluator) personas, and identify where each stage can fail.

## The question map

Every section of the site exists to answer one recruiter/hiring-manager
question. This is the master mapping referenced by Information Architecture
(document 06) and Content Strategy (document 17):

| Section | Question it answers |
|---|---|
| Hero (Home) | Who is this, at what level, in what domain? |
| Technical Expertise | Does their stack match what we need? |
| Engineering Journey | Is their trajectory senior and coherent, not scattered? |
| Engineering Case Studies | Can this person design systems and solve real problems? |
| Leadership | Can this person lead and mentor a team? |
| Architecture | Can this person improve and reason about architecture at scale? |
| AI Engineering | Is this person current and adaptable, not legacy-only? |
| Achievements | What has been independently recognized or delivered? |
| Certifications | Is technical claim backed by formal validation? |
| Resume | Can I get the artifact I need to move this candidate forward? |
| Contact | How do I reach this person directly, with minimal friction? |

## Journey Stage Map

```
Arrival → First Impression → Orientation → Validation → Trust Building
   → Depth Check → Credibility Confirmation → Conversion → (Return Visit)
```

### Stage 1 — Arrival
**Entry points:** LinkedIn profile link, resume footer/header link, direct
search of name, referral link from a recruiter/colleague, GitHub profile
link.
**Design requirement:** The site must look intentional and load
instantly regardless of entry point — there is no "homepage-only" traffic
assumption. Deep links (e.g., directly to a case study) must still carry
full header/nav context so the visitor is never lost.

### Stage 2 — First Impression (0–5 seconds, Hero)
**What happens:** Visitor forms a snap judgment: serious professional vs.
generic portfolio.
**Failure modes:** Hero photo/illustration cliché, vague tagline
("Passionate developer building the future"), unclear seniority, slow load.
**Mitigation:** Precise, factual hero copy (name, exact title, years,
one-line domain statement), fast static rendering, no LCP-blocking assets.

### Stage 3 — Orientation (5–20 seconds, Expertise + Nav scan)
**What happens:** Visitor checks "does this match what I'm looking for"
via a fast scan of the nav bar and the expertise grouping.
**Failure modes:** Flat, ungrouped 30-item tech list; navigation with too
many choices (Hick's Law violation).
**Mitigation:** Grouped expertise categories (document 08/09), nav capped
at 6–7 items (document 07).

### Stage 4 — Validation (20–90 seconds, Case Study skim)
**What happens:** Visitor skims 1–2 case study summaries to see if claims
are backed by real substance.
**Failure modes:** Case studies read as marketing bullets ("Led
architecture initiatives"); no visible structure to scan.
**Mitigation:** Consistent card structure — Problem / My Role / Key
Decision / Stack tags — scannable in under 10 seconds per card.

### Stage 5 — Trust Building (1–3 minutes, Leadership + one full case study)
**What happens:** A qualified visitor (hiring manager) reads one case study
in full and checks the Leadership page.
**Failure modes:** Leadership claims without example; case study lacking a
tradeoffs/constraints section (feels dishonest by omission).
**Mitigation:** Every leadership principle paired with a concrete
practice; every case study has an explicit tradeoffs block.

### Stage 6 — Depth Check (2–5 minutes, Architecture + AI Engineering)
**What happens:** A technical evaluator (CTO, staff engineer) probes
whether the architecture reasoning holds up and whether the AI engineering
work is real or superficial.
**Failure modes:** Architecture page is a list of technologies, not
reasoning; AI section is buzzword-dense without concrete shipped projects.
**Mitigation:** Decision-record style writing ("we chose X over Y because
Z, and gave up W"); AI Engineering page anchored in real, named projects
(HiringEasy, ATS Resume Builder, RAG Applications) with technical
specificity.

### Stage 7 — Credibility Confirmation (Achievements + Certifications)
**What happens:** Quick verification pass — does formal/independent
evidence back the narrative?
**Failure modes:** Inflated or vague achievement language; missing
certification dates/issuers.
**Mitigation:** Plain factual statements, verifiable where possible (issuer
+ date), no adjectives doing the work numbers or facts should do.

### Stage 8 — Conversion (Resume download / Contact)
**What happens:** Visitor takes the action the entire site was built to
enable.
**Failure modes:** Resume behind extra clicks or a login/gate; contact
form asking for excessive information; no confirmation of receipt.
**Mitigation:** Resume is a single, direct download from a persistent
header CTA; contact form has 3 fields max (name, email, message) plus
optional company; immediate on-screen confirmation (not just a redirect).

### Stage 9 — Return Visit (pre/post-interview)
**What happens:** A hiring manager or interviewer returns to re-read a
specific case study before a screen or onsite.
**Failure modes:** No stable deep-linkable URLs; content changes without
version stability; slow repeat load.
**Mitigation:** Stable, human-readable URLs per case study
(`/case-studies/oauth2-authentication-platform`), strong caching, no
login/session required to revisit.

## Fast-path vs. slow-path journey

| | Recruiter fast path | Technical evaluator slow path |
|---|---|---|
| Typical duration | 20–60 seconds | 3–10 minutes, often 2 sessions |
| Pages visited | Home (hero + expertise) → Resume | Home → 1–2 Case Studies → Leadership → Architecture → AI Engineering → Contact |
| Conversion action | Resume download | Contact form or direct email/LinkedIn |
| Critical requirement | Zero friction to Resume | Zero shallowness in Case Studies/Architecture |

## Drop-off risk summary

The single highest-leverage failure point is **Stage 2 → 3**: if the hero
doesn't communicate seniority and relevance within 5 seconds, no amount of
excellent case-study writing downstream matters, because the recruiter
persona never gets there. This is why the Home page hero is treated as the
highest-priority piece of content and design in the entire project.
