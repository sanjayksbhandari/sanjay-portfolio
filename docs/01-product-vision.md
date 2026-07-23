# 01 — Product Vision

## The problem this product solves

A resume is a claims document. A LinkedIn profile is a claims document with
endorsements. Neither lets a hiring manager or CTO *observe* how a candidate
actually thinks about systems, tradeoffs, and people. For a 17-year Java
engineering leader, the resume format actively works against the signal that
matters most at this seniority: judgment.

Recruiters and hiring managers spend, on average, seconds — not minutes — on
a first pass. They are pattern-matching against a small set of questions
("can this person own production, lead a team, and still write good code?").
A generic portfolio built from a template answers none of these questions —
it just repeats the resume with nicer fonts and a hero photo.

## What this product is

A **portfolio that functions as a work sample**. The site itself — its
structure, its restraint, its absence of noise, its clear technical
writing — is evidence of the same qualities the copy claims. A CTO reading
the "Architecture" page should think "this person writes documentation the
way I wish my team did," before they finish reading a single case study.

This is the core product insight: **for a candidate at this level, the
medium is part of the message.** The website is not a container for
credentials; it is itself a credential.

## What this product is not

- It is not a personal-brand / influencer site. No hot takes, no lifestyle
  content, no "my journey" narrative arc written for emotional appeal over
  information density.
- It is not a template gallery of animations. Motion is a supporting
  actor, never the lead.
- It is not a full CMS-driven blogging platform on day one. Blog is a
  **future** surface (see document 18), sequenced after the core
  credibility pages are solid, because an empty or thin blog actively hurts
  credibility more than no blog at all.
- It is not a "one page does everything" site nor a 20-page sprawl. It is a
  small number of dense, well-structured pages (see document 06).

## Primary objective

> Convert qualified visits (recruiters, hiring managers, CTOs, VPs of
> Engineering) into a resume download or a contact-form submission that
> leads to a first conversation.

Every design and content decision is judged against this objective. If a
design choice increases delight but does not increase the odds of that
conversion event, it is deprioritized in favor of one that does.

## Secondary objectives

1. Function as a **living reference** Sanjay can point to instead of
   re-explaining architecture decisions verbally in early interview screens
   — shortening the loop and letting technical conversations start deeper.
2. Serve as a **writing sample**. Case studies double as evidence of the
   "Stakeholder Communication" and "Architecture Reviews" skills listed —
   which are otherwise unverifiable from a resume line.
3. Be **maintainable by one person** without a design or dev team, so it
   stays current instead of rotting six months after launch.

## Success measurement (defined, not fabricated)

We will not publish invented metrics ("increased X by 40%"). We will,
however, instrument the *site itself* honestly, because these are our own
numbers and we control them:

| Signal | What it tells us | How it's measured |
|---|---|---|
| Resume download rate | Are visitors convinced enough to want the formal artifact? | Event on `/resume` download click |
| Contact form completion rate | Are visitors convinced enough to initiate contact? | Form submit / form start |
| Case study read-through (scroll depth ≥ 80%) | Is the technical depth actually being read, or skimmed and abandoned? | Scroll-depth analytics per case study |
| Time-to-first-CTA-view | Is the resume/contact CTA visible fast enough for a 10-second scanner? | Layout audit, not analytics |
| Return visits before contact | Are hiring managers coming back (e.g., before a second interview round) to re-read a case study? | Session analytics |
| Organic search impressions for name + role terms | Is the site being found when someone looks Sanjay up before an interview? | Search Console |

These are the *only* numbers this project will ever publish about itself,
and they will be real, sourced from analytics, once live — never invented
placeholders dressed up as results.

## Positioning statement

For engineering leaders and technical recruiters evaluating senior Java
talent, **sanjaysinghbhandari.com** is a portfolio site that demonstrates
system-design judgment and engineering leadership through real, verifiable
work — unlike a resume or LinkedIn profile, which can only assert it.

## Guiding question for every design decision

> "Does this make it easier or harder for a CTO to believe, within 60
> seconds, that this person has actually run production systems?"

If the honest answer is "harder" or "irrelevant," the decision is rejected
regardless of how visually appealing it is.
