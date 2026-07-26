import type { CareerFact } from "@/types/content";
import { site } from "@/config/site";

// Impact Dashboard — Career Snapshot (verified values only).
export const careerSnapshot: CareerFact[] = [
  {
    id: "most-recent-role",
    label: "Most recent role",
    value: "Lead Java Developer, Opal BPM (Sep 2015 – Apr 2025)",
  },
  {
    id: "total-experience",
    label: "Total Experience",
    value: `${site.yearsExperience} years`,
  },
  {
    id: "industries",
    label: "Industries",
    value:
      "Enterprise SaaS (Retail), Trading & Marketplace Platforms, Aviation & Financial Systems",
  },
  {
    id: "enterprise-clients",
    label: "Enterprise delivery",
    value: "Multiple client deployments (Opal BPM)",
  },
  {
    id: "leadership",
    label: "Leadership",
    value: "5–7 developers mentored directly",
  },
  {
    id: "location",
    label: "Based in",
    value: site.location,
  },
];
