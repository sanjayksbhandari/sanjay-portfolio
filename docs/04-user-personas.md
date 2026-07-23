# 04 — User Personas

Five personas cover the realistic visitor set for a senior Java engineering
leader's portfolio. These are behavioral personas (how they browse, what
convinces or repels them), not demographic fluff.

---

## Persona 1 — The Technical Recruiter ("Priya")

**Role:** Agency or in-house technical recruiter, sources 50–100 profiles/week.
**Technical depth:** Low-to-moderate; pattern-matches keywords and titles,
does not evaluate architecture quality directly.
**Time budget:** 20–45 seconds on first visit.
**Primary questions:** Does this person's title/seniority match the req?
Do the listed technologies match the job description? Is there a resume I
can forward immediately? Is contact information easy to find?
**What convinces her:** Clear title ("Senior Java Engineering Leader, 17+
years"), an immediately visible, groupable skills list, a one-click resume
download, a working contact method.
**What repels her:** Having to hunt for the resume, unclear seniority
level, walls of text with no scannable structure, broken/slow pages (she
will bounce and move to the next candidate — no patience for friction).
**Design implication:** Hero and header must make title, years of
experience, and Resume CTA visible without scrolling, on both desktop and
mobile.

---

## Persona 2 — The Engineering Manager / Hiring Manager ("David")

**Role:** Manages a team of 6–12 engineers, owns the hiring decision for a
senior/staff Java role.
**Technical depth:** High; was an engineer, now manages, still reads code
and architecture with a critical eye.
**Time budget:** 3–7 minutes, often during a commute or between meetings,
often revisits before/after a screening call.
**Primary questions:** Can this person own production incidents? Can they
mentor mid-level engineers without micromanaging? Will they clash with or
strengthen my team's existing practices? Can they communicate technical
tradeoffs to non-technical stakeholders?
**What convinces him:** Specific, named case studies with real tradeoffs
described (not "improved performance"), a Leadership page with concrete
practices (code review approach, mentoring approach) rather than platitudes,
evidence of Agile/stakeholder communication in context.
**What repels him:** Generic "team player" language, unverifiable superlatives,
leadership claims with zero supporting example.
**Design implication:** Case studies and Leadership page carry the real
weight for this persona — they must be readable in "study mode" (see
document 02) with enough technical detail to be credible to a peer.

---

## Persona 3 — The CTO / VP Engineering ("Meera")

**Role:** Owns technical strategy across multiple teams, evaluates
principal/lead-level hires primarily on judgment and system-level thinking.
**Technical depth:** Very high; will scrutinize the *quality of reasoning*
in an architecture write-up more than the specific tech named.
**Time budget:** Variable — can be 90 seconds (quick credibility check) or
10+ minutes (serious evaluation before an onsite).
**Primary questions:** Does this person understand tradeoffs, or just name
technologies? Have they made and owned real architectural decisions (not
just "used microservices")? Are they current on where the industry is
heading (AI engineering, not just legacy Java maintenance)? Is their written
communication as clear as their code should be?
**What convinces her:** An Architecture page that discusses *why* a
decision was made and what was given up, not just what was built; the
combination of deep enterprise Java experience *and* credible AI engineering
work (LangChain, RAG) signals range and adaptability rather than a
one-trick specialist.
**What repels her:** Buzzword soup without substance, architecture
diagrams that are decorative rather than explanatory, any sign of
overclaiming.
**Design implication:** Architecture and AI Engineering pages must survive
expert scrutiny — every technical claim must be precise and defensible.

---

## Persona 4 — The Principal/Staff Engineer Interviewer ("Arjun")

**Role:** Will be a peer interviewer or panel member assessing technical
depth in a system design round.
**Technical depth:** Very high, adversarial by professional habit (job is
to find holes).
**Time budget:** Pre-interview, 5–10 minutes of deliberate reading to
prepare better interview questions.
**Primary questions:** What specific decisions did this person make (vs.
"the team decided")? What would I ask them to probe deeper? Do they
understand failure modes, not just happy-path architecture?
**What convinces him:** Explicit "my role" delineation in case studies
(critical for enterprise projects that are inherently team efforts), honest
articulation of constraints/tradeoffs, mention of what didn't work or what
would be done differently.
**What repels him:** Case studies that read as team accomplishments with no
individual attribution, or suspiciously flawless narratives with no
tradeoffs mentioned.
**Design implication:** Every case study must have an explicit "My Role &
Scope" block, and a "Tradeoffs & Constraints" block — not just an outcome.

---

## Persona 5 — The Founder / Startup CTO ("Alex")

**Role:** Early-stage founder or small-company CTO hiring a versatile
senior engineer who can own systems end-to-end and move fast.
**Technical depth:** High but pragmatic — cares less about enterprise
process, more about range, speed, and independent ownership.
**Time budget:** 2–4 minutes, scans for versatility and modern relevance.
**Primary questions:** Can this person work without heavy enterprise
scaffolding? Have they shipped anything solo, end-to-end? Are they
comfortable with modern AI tooling, or only classic enterprise Java?
**What convinces him:** The personal projects (HiringEasy, ATS Resume
Builder, AI Resume Matching, RAG Applications) shown as real, shipped,
end-to-end work — full-stack ownership including Python/FastAPI/Streamlit,
not just enterprise Java.
**What repels him:** A portfolio that only proves "large company process
experience" with nothing showing individual, scrappy, end-to-end building.
**Design implication:** Personal/AI projects need their own credible
section (AI Engineering page) — not buried as an afterthought below
enterprise work.

---

## Cross-persona summary table

| Persona | Time budget | Page(s) that matter most | #1 fear if we get it wrong |
|---|---|---|---|
| Recruiter | 20–45s | Home hero, Resume | Can't find resume/contact fast → bounces |
| Eng. Manager | 3–7 min | Case Studies, Leadership | Reads as generic → can't differentiate from other candidates |
| CTO/VP Eng | 90s–10min | Architecture, AI Engineering | Buzzwords without reasoning → distrust |
| Staff/Principal interviewer | 5–10 min | Case Studies (role/tradeoffs) | No individual attribution → can't assess actual contribution |
| Founder/Startup CTO | 2–4 min | AI Engineering, Personal Projects | Only sees "big company" experience → doubts scrappy ownership |
