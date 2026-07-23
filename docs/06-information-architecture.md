# 06 — Information Architecture

## Architectural decision: hybrid depth model

Two extremes are both wrong for this audience:
- **Single long-scroll page** — great for fast recruiter scanning, terrible
  for deep technical evaluators who need stable, linkable, study-mode pages
  (and terrible for SEO, which wants distinct indexable pages per topic).
- **Deep multi-page site with thin content per page** — great for SEO
  surface area, terrible for the fast scanner who has to click around to
  get a basic impression.

**Decision:** The Home page is a **dense, complete single-page summary**
(hero, expertise, journey preview, case-study previews, leadership preview,
CTA) that fully serves the fast-path persona (document 05) on its own.
Every summary block on the Home page links to a **standalone deep page**
that fully serves the slow-path/technical-evaluator persona. Nobody is
forced to click through to get the gist; anybody who wants depth has a
stable, linkable, indexable page to go to.

## Full sitemap

```
/                          Home (complete summary + entry to every deep page)
/journey                   Engineering Journey (career narrative & timeline)
/expertise                 Technical Expertise (full skills architecture)
/case-studies              Case Studies index
/case-studies/[slug]       Individual case study detail
/leadership                Leadership philosophy & practices
/architecture              Architecture thinking & decision records
/ai-engineering            AI Engineering projects & approach
/achievements              Achievements
/certifications            Certifications
/resume                    Resume (view + download)
/contact                   Contact
/blog                      Future — Phase 2+, see document 18
/blog/[slug]               Future — Phase 2+
```

Supporting/system routes (not primary nav, required for SEO/UX):
`/sitemap.xml`, `/robots.txt`, `/rss.xml` (once blog exists),
`/opengraph-image` (dynamic per-route OG images), custom `/404`.

## Page-by-page specification

### `/` — Home
**Job:** Fully answer "who is this and should I keep looking" in under
60 seconds, and route every persona to the right deep page.
**Primary question answered:** Who is this, at what level, in what domain?
**Content blocks (in order):**
1. Hero — name, title, years, one-line domain statement, primary CTAs
   (Resume, Contact)
2. Proof strip — verified company names + years span (quiet, factual, not
   logos-as-decoration; text-based, monospace-accented)
3. Technical Expertise summary — grouped categories, link to `/expertise`
4. Featured Case Studies (2–3 cards) — link to `/case-studies`
5. Engineering Journey preview (condensed timeline) — link to `/journey`
6. Leadership preview (2–3 principles) — link to `/leadership`
7. AI Engineering preview — link to `/ai-engineering`
8. Closing CTA — Resume + Contact, restated

**Word budget:** ~500–700 words total (summary density, not sparse).

### `/journey` — Engineering Journey
**Primary question:** Is this person's trajectory senior and coherent?
**Content:** Reverse-chronological timeline across the three verified
companies (Opal BPM India Pvt Ltd, TeamLease Services Pvt Ltd, InterGlobe
Air Transport Ltd), each entry stating role, scope, and the enterprise
project(s) owned during that tenure, connecting to relevant case studies.
No big icon-timeline — plain, typographic, date-anchored entries (see
document 09, Timeline Components; document 16 forbids icon-heavy
timelines).

### `/expertise` — Technical Expertise
**Primary question:** Does the stack match the role?
**Content:** Skills grouped into named domains (not a flat cloud):
- Backend & Frameworks — Java, Spring Boot, Spring MVC, Spring Security
- Distributed Systems & Data — Microservices, REST APIs, Kafka, Redis,
  PostgreSQL, Oracle, MySQL
- Security & Identity — OAuth2, JWT
- Cloud & Delivery — Docker, Kubernetes, AWS, Jenkins, CI/CD, Maven, Gradle
- AI Engineering — LangChain, Prompt Engineering, RAG, Python, Streamlit,
  FastAPI
- Leadership Practice — Team Leadership, Mentoring, Architecture Reviews,
  Code Reviews, Agile Delivery, Stakeholder Communication

Each group has 1–2 sentences of *how* it's applied (context, not just a
tag), e.g., stating which case studies used which stack — cross-linked.
**Explicitly excluded:** percentage bars, star ratings, meters (see
document 03).

### `/case-studies` — Case Studies Index
**Primary question:** Can this person design systems and solve real
problems?
**Content:** Card grid/list of all case studies (Enterprise Artwork
Management Platform, OAuth2 Authentication Platform, Enterprise Exchange
Platform, Beckn Protocol Verification Adapter, Financial Transaction
Platform), each card showing: name, one-line problem statement, role,
primary stack tags, link to detail.

### `/case-studies/[slug]` — Case Study Detail
**Primary question:** Can this person actually reason about architecture
and tradeoffs, and what specifically did *they* do?
**Content structure (fixed template, applied to all 5):**
1. Context — what the system was for, at what scale/constraints
   `[SCALE DETAILS NEEDED FROM SANJAY WHERE NOT ALREADY VERIFIED]`
2. My Role & Scope — explicit individual attribution (see Persona 4,
   document 04)
3. Architecture Overview — diagram + explanation
4. Key Decisions & Tradeoffs — decision-record style ("chose X over Y
   because Z; gave up W")
5. Challenges — real friction encountered
6. Outcome — factual, qualitative if no verified metric exists;
   `[METRIC NEEDED]` placeholder never shown live, only in content backlog
7. Stack used (tags)
8. Related case studies

### `/leadership` — Leadership
**Primary question:** Can this person lead and mentor a team?
**Content:** Structured as principles-with-evidence, not a values poster:
each of Team Leadership, Mentoring, Architecture Reviews, Code Reviews,
Agile Delivery, Stakeholder Communication gets a short concrete paragraph
describing the actual practice used, cross-linked to the case study where
it was exercised where applicable.

### `/architecture` — Architecture
**Primary question:** Can this person improve and reason about
architecture at scale?
**Content:** Cross-cutting architectural themes observed across the
verified projects (e.g., authentication/identity architecture from the
OAuth2 Platform, integration/adapter architecture from the Beckn Protocol
Adapter, transactional integrity from the Financial Transaction Platform).
Written as decision records, not a technology list.

### `/ai-engineering` — AI Engineering
**Primary question:** Is this person current and adaptable?
**Content:** HiringEasy, ATS Resume Builder, AI Resume Optimizer, Cover
Letter Generator, Resume Parser, AI Resume Matching, RAG Applications —
each with problem, approach (LangChain/RAG/Prompt Engineering specifics),
and stack (Python, FastAPI, Streamlit). Framed explicitly as the bridge
between 17 years of enterprise Java rigor and modern AI-native product
building — this is the differentiation story for this persona set.

### `/achievements` — Achievements
**Primary question:** What has been independently recognized or delivered?
**Content:** Factual list; each item states what was delivered and in what
context (company/project), never a floating unattributed claim.

### `/certifications` — Certifications
**Primary question:** Is technical claim backed by formal validation?
**Content:** `[CERTIFICATION NAMES, ISSUERS, DATES NEEDED FROM SANJAY]` —
none listed in the verified data provided; page ships once real data is
supplied. If none exist, this page is removed from navigation rather than
populated with generic placeholders (see document 19, content risk).

### `/resume` — Resume
**Primary question:** Can I get the artifact I need?
**Content:** Inline resume preview (rendered, not just a raw PDF link) +
prominent download button (PDF) + "last updated" date for freshness signal.

### `/contact` — Contact
**Primary question:** How do I reach this person directly?
**Content:** Minimal form (name, email, message, optional company),
direct email link, LinkedIn link, response-time expectation stated
plainly (e.g., "I respond within 2 business days") — no gimmicks.

### `/blog` — Future
See document 18. Not built in Phase 1–3.

## Page depth budget (SEO + UX balance)

To avoid thin-content SEO risk (document 19), pages with naturally little
unique content are either merged or deferred:
- Certifications is merged into `/achievements` as a section if fewer than
  3 real certifications exist, rather than shipped as a sparse standalone
  page.
- Engineering Journey and Architecture remain standalone because they
  carry genuinely distinct content (career narrative vs. cross-cutting
  technical reasoning).
