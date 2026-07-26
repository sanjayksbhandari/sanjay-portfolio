import type { LeadershipPrinciple } from "@/types/content";

export const leadershipPrinciples: LeadershipPrinciple[] = [
  {
    id: "team-leadership",
    title: "Team Leadership",
    practice:
      "Provided technical leadership to a team of 5–7 developers at Opal BPM, having grown into that role from being the company's second engineering hire.",
    evidence: "Opal BPM India Pvt Ltd — Lead Java Developer, Sep 2015–Apr 2025.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
    todos: [{ label: "A specific example of a team decision you led, in your own words" }],
  },
  {
    id: "mentoring",
    title: "Mentoring",
    practice:
      "Established code-quality and system-design practices for the team as it scaled, rather than relying on ad hoc review.",
    todos: [
      {
        label:
          "Your actual mentoring approach — how you onboard/coach a developer, in your own words",
      },
      { label: "A specific example of mentoring that changed how someone worked" },
    ],
  },
  {
    id: "architecture-reviews",
    title: "Architecture Reviews",
    practice:
      "Owned the architectural decisions behind the Enterprise Exchange Platform's 16-service decomposition and the Beckn Protocol Verification Adapter's state-machine design — decisions made and defended, not just implemented from a spec.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
    todos: [
      {
        label:
          "How you actually run an architecture review — format, who's involved, what you look for",
      },
    ],
  },
  {
    id: "code-reviews",
    title: "Code Reviews",
    practice:
      "Set code-quality standards for a 5–7 developer team as part of the technical leadership role at Opal BPM.",
    todos: [
      {
        label:
          "What you specifically look for first in a code review, and how you deliver feedback",
      },
    ],
  },
  {
    id: "agile-delivery",
    title: "Agile Delivery",
    practice:
      "Delivered incrementally across nine-plus years at Opal BPM and through a distinct onshore/offshore delivery model at InterGlobe.",
    relatedCaseStudySlug: "financial-transaction-platform",
    todos: [{ label: "Specific Agile practices used (sprint cadence, ceremonies, tooling)" }],
  },
  {
    id: "stakeholder-communication",
    title: "Stakeholder Communication",
    practice:
      "Collaborated directly with cross-functional teams and stakeholders to translate business requirements into technical architecture at Opal BPM, and aligned onshore/offshore delivery with finance-domain needs at InterGlobe.",
    relatedCaseStudySlug: "financial-transaction-platform",
    todos: [
      {
        label:
          "A specific example of translating a business requirement into an architecture decision",
      },
    ],
  },
];
