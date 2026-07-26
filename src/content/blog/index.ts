import type { Publication, Presentation, OpenSourceProject } from "@/types/entities";

// Future content sources (Phase 7 brief: "Future blog articles, Future
// conference talks, Future certifications, Future projects"). Genuinely
// empty — no publication, talk, or named open-source project has been
// verified from the resume, LinkedIn, GitHub, or HiringEasy yet. These
// arrays exist so `content-engine/loaders.ts` has a real, typed source
// to read from the moment one is confirmed, instead of the loader
// needing a follow-up code change. See
// docs/phase-7-content-engine/06-future-extension-points.md.
export const publications: Publication[] = [];

export const presentations: Presentation[] = [];

export const openSourceProjects: OpenSourceProject[] = [];
