import type { Person } from "@/types/entities";
import { site } from "@/config/site";

// The Person entity — Phase 7's Single Source of Truth for "who this
// portfolio is about." Every field is either copied straight from
// `@/config/site` (never re-typed by hand a second time) or, where no
// verified value exists yet, `null`/`[]` with `verified: false` /
// paired TODO rather than an invented value. Phase 15's Professional
// Hub (`/contact`) and `/resume` consume this via Content Engine
// loaders rather than reading `@/config/site` for contact facts
// directly.
export const person: Person = {
  id: "person-sanjay-singh-bhandari",
  slug: "sanjay-singh-bhandari",
  title: site.name,
  status: "published",
  name: site.name,
  headline: site.title,
  summary: site.description,
  description: site.description,
  location: site.location,
  yearsExperience: site.yearsExperience,
  tags: ["Java", "Engineering Leadership", "AI Engineering"],
  contact: {
    email: site.email || null,
    location: site.location,
    preferredResponseTime: null,
  },
  socialLinks: [
    {
      platform: "LinkedIn",
      url: site.social.linkedin,
      verified: Boolean(site.social.linkedin),
    },
    {
      platform: "GitHub",
      url: site.social.github,
      verified: Boolean(site.social.github),
    },
  ],
  // TODO (docs/17 data checklist): no verified language-proficiency
  // statement exists in any source document — leave empty rather than
  // assume "English" from context alone.
  languages: [],
  // TODO (docs/17 data checklist): no verified education record
  // (institution/degree/dates) exists in any source document yet.
  education: [],
  seo: {
    title: `${site.name} — ${site.title}`,
    description: site.description,
  },
  relations: {
    experience: ["opal-bpm-india", "teamlease-services", "pc-solutions", "comnet-innovations"],
  },
};
