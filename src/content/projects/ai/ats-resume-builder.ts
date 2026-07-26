import type { CaseStudy } from "@/types/content";

export const atsResumeBuilder: CaseStudy = {
  slug: "ats-resume-builder",
  name: "ATS Resume Builder",
  kind: "personal",
  status: "Personal Project",
  oneLiner:
    "A production-ready resume editor with live ATS scoring, paid secure exports, and subscription billing — built and shipped end-to-end.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem:
    "Job seekers need a resume that is both genuinely well-written and reliably parseable by the ATS (applicant tracking system) software recruiters use — most tools optimize for only one of those two things.",
  architectureSummary:
    "Built a free-to-edit resume editor (contact, summary, skills, experience, education, projects, certifications, awards, languages, custom sections) with drag-and-drop section ordering and a live, 100-point ATS score (keywords: 30, structure: 40, readability: 30) computed against a pasted job description, plus AI-assisted bullet-point suggestions. Paid tiers unlock secure PDF/DOCX/TXT export and subscriptions, handled through a Flask backend that orchestrates Stripe and Razorpay payments, JWT-based auth with OTP verification, signed time-limited download links, and a billing dashboard with cancellation and refund flows. Every export is generated server-side to ATS-safe specifications: single-column layout, standard headings, no tables/icons/embedded images, standard fonts.",
  stack: ["Python", "Flask", "JWT", "Stripe", "Razorpay", "SQLite", "PWA"],
  industries: ["AI Products"],
  todos: [
    { label: "Live product URL, if currently deployed" },
    {
      label: "Any real usage numbers (users, resumes generated, downloads) approved to share",
      section: "Business Impact",
    },
    { label: "Screenshot(s) of the editor and ATS score view" },
  ],
};
