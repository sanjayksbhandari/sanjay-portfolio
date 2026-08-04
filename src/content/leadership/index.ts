import type { LeadershipPrinciple } from "@/types/content";

export const leadershipPrinciples: LeadershipPrinciple[] = [
  {
    id: "team-leadership",
    title: "Team Leadership",
    practice:
      "During the last five years of my Opal BPM tenure, I provided technical leadership to a team of 5–7 developers after progressing from Senior Java Developer into Lead Java Developer.",
    evidence:
      "Opal BPM India Pvt Ltd — technical leadership of 5–7 developers, last ~5 years of Sep 2015–Apr 2025 tenure.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
    todos: [{ label: "A specific example of a team decision I led, in my own words" }],
  },
  {
    id: "mentoring",
    title: "Mentoring",
    practice:
      "I established code-quality and system-design practices for the team as it scaled, rather than relying on ad hoc review.",
    todos: [
      {
        label: "My actual mentoring approach — how I onboard/coach a developer, in my own words",
      },
      { label: "A specific example of mentoring that changed how someone worked" },
    ],
  },
  {
    id: "architecture-reviews",
    title: "Architecture Reviews",
    practice:
      "I owned the architectural decisions behind the Enterprise Exchange Platform's 16-service decomposition and the Beckn Protocol Verification Adapter's state-machine design — decisions made and defended, not just implemented from a spec.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
    todos: [
      {
        label:
          "How I actually run an architecture review — format, who's involved, what I look for",
      },
    ],
  },
  {
    id: "code-reviews",
    title: "Code Reviews",
    practice:
      "I set code-quality standards for a 5–7 developer team as part of technical leadership during the last five years of my Opal BPM tenure.",
    todos: [
      {
        label: "What I specifically look for first in a code review, and how I deliver feedback",
      },
    ],
  },
  {
    id: "agile-delivery",
    title: "Agile Delivery",
    practice:
      "I delivered incrementally across nine-plus years at Opal BPM and through a distinct onshore/offshore delivery model at InterGlobe.",
    relatedCaseStudySlug: "financial-transaction-platform",
    todos: [{ label: "Specific Agile practices used (sprint cadence, ceremonies, tooling)" }],
  },
  {
    id: "stakeholder-communication",
    title: "Stakeholder Communication",
    practice:
      "I collaborated directly with cross-functional teams and stakeholders to translate business requirements into technical architecture at Opal BPM, and aligned onshore/offshore delivery with finance-domain needs at InterGlobe.",
    relatedCaseStudySlug: "financial-transaction-platform",
    todos: [
      {
        label:
          "A specific example of translating a business requirement into an architecture decision",
      },
    ],
  },
];
