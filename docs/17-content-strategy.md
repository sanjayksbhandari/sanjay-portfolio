# 17 — Content Strategy

## Voice

**Precise, calm, first-person, evidence-first.** The writing register is
closer to a well-written architecture decision record or a Stripe API doc
than to a marketing landing page. Short sentences. Active voice. Specific
nouns over vague adjectives.

## Absolute content rule

**Every claim is either traceable to a verified fact (company, project,
technology, certification from the approved lists) or explicitly marked
`[NEEDS INPUT: description]` in the content backlog — never invented, never
implied through vague phrasing to sound more impressive than it is.**
This applies especially to numbers: no percentage improvements, latency
figures, user counts, or team sizes are published unless Sanjay supplies
the real figure. Where no real number exists, the sentence is written to
be true without a number (e.g., "the authentication service handled login
for every internal application after rollout" rather than a fabricated
"reduced login failures by 40%").

## Banned words and phrases (explicit list)

Never used anywhere on the site:

- "I am passionate about..." / "I love coding" / "I am hardworking" /
  "I am a quick learner" / "I am a team player"
- "Results-driven," "detail-oriented," "self-starter," "go-getter"
- "Synergy," "leverage" (as a verb), "circle back," "move the needle"
- "Cutting-edge," "state-of-the-art," "world-class" (ironic given the
  brief's own framing — the *site* should be world-class through evidence,
  the *copy* should never claim it about itself)
- "Ninja," "rockstar," "guru," "wizard," "10x engineer"
- "Proven track record" (show the track record; don't name it)
- Any unqualified superlative ("the best," "the most innovative") without
  a specific, attributable comparison

## Structural content rules (enforced per content type)

### Case studies
Every case study must contain, in this order, with no section skippable:
1. **Context** — what the system was, who used it, what constraints
   existed (scale, regulatory, integration complexity)
   `[NEEDS INPUT: specific scale/constraint details per project]`
2. **My Role & Scope** — explicit first-person attribution distinguishing
   individual contribution from team output (critical for the Staff
   Engineer interviewer persona, document 04)
3. **Key Decisions & Tradeoffs** — at least one real "we chose X over Y,
   and gave up W" statement per case study
   `[NEEDS INPUT: the actual alternative(s) considered and why rejected]`
4. **Challenges** — a genuine difficulty, not a humble-brag disguised as
   a challenge ("my only weakness is I care too much")
5. **Outcome** — factual and qualitative unless a real, approved metric
   exists

### Leadership page
Every principle listed (Team Leadership, Mentoring, Architecture Reviews,
Code Reviews, Agile Delivery, Stakeholder Communication) must be paired
with **one concrete practice statement** — not a definition of the skill,
but what Sanjay specifically does. Example structure:
"Code Reviews: [specific practice, e.g., what Sanjay looks for first, how
feedback is delivered, how junior engineers are coached through review
comments]" `[NEEDS INPUT: Sanjay's actual code review/mentoring approach
in his own words]`.

### AI Engineering page
Framed explicitly as range, not a pivot away from Java: "17 years of
enterprise backend discipline applied to modern AI-native product
building." Each project (HiringEasy, ATS Resume Builder, AI Resume
Optimizer, Cover Letter Generator, Resume Parser, AI Resume Matching, RAG
Applications) gets a real problem statement, the specific technique used
(LangChain component, RAG retrieval design, prompt engineering approach),
and the stack (Python, FastAPI, Streamlit) — technical enough to survive
scrutiny from Persona 3 (CTO/VP Engineering, document 04).

### Achievements & Certifications
Plain factual statements only. No certification is listed without
issuer + date once real data is supplied. If the verified data set
contains no certifications, the page is not populated with filler — it is
omitted from navigation entirely (document 06) rather than shipped thin.

## Section-by-section content brief (cross-reference to document 06's IA)

| Page | Question answered | Content requirement | Target length |
|---|---|---|---|
| Home hero | Who is this, at what level? | Name, exact title, years, one factual domain sentence | ~25–40 words |
| Home (full page) | Fast, complete summary | Every section below, condensed to 1–3 sentences + link | ~500–700 words total |
| Journey | Is the trajectory coherent? | 3 company entries with role, scope, dates, linked projects | ~150–250 words |
| Expertise | Does the stack match? | 6 grouped categories, 1–2 contextual sentences each | ~300–400 words |
| Case Studies (each) | Can they design systems? | Full 5-part structure above | ~500–900 words each |
| Leadership | Can they lead/mentor? | 6 principle+practice pairs | ~400–600 words |
| Architecture | Can they reason about architecture? | 3–5 cross-cutting decision-record write-ups | ~600–900 words |
| AI Engineering | Are they current? | 7 project write-ups, problem/approach/stack | ~600–900 words |
| Achievements | Independently recognized delivery? | Factual list, attributed | ~100–200 words |
| Certifications | Formally validated? | Name/issuer/date list, or omitted | varies |
| Resume | Get the artifact | Minimal framing text + viewer + download | ~50 words |
| Contact | Reach directly | Minimal framing, response-time expectation | ~50 words |

## Content data-collection checklist (must be completed before final copywriting)

This is the honest gap list — real inputs required from Sanjay before any
page ships with specific claims:

- [ ] Exact dates (month/year) for each role at Opal BPM, TeamLease,
      InterGlobe
- [ ] Team sizes led/mentored, if any, at each company
- [ ] For each of the 5 enterprise projects: scale indicators that are
      safe to share (e.g., number of consuming applications, transaction
      volume tier, regulatory context) without violating any NDA
- [ ] For each enterprise project: the specific architectural
      decision(s) Sanjay owned, and at least one alternative that was
      considered and rejected
- [ ] Any real, approved-to-share metrics or outcomes (only include if
      Sanjay explicitly confirms accuracy and permission to share)
- [ ] Certification names, issuing bodies, and dates (if any exist)
- [ ] Preferred contact response-time commitment
- [ ] LinkedIn and GitHub URLs for `sameAs`/footer links
- [ ] A final, current resume PDF
- [ ] Confirmation on what, if anything, is under NDA and must stay
      abstracted (e.g., "a financial transaction platform" without naming
      the client)

## Editing standard

Every paragraph is edited toward removal, not addition. Draft, then cut
every sentence that doesn't answer the page's stated question (from the
table above). If a paragraph could be deleted without losing information —
only losing tone — it is deleted.
