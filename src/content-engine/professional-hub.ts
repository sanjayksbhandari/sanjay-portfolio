import type { ContactMethod, SocialPresenceLink } from "@/types/content";
import {
  getContactMethods,
  getSocialPresenceLinks,
  getResumeArtifact,
  getRecruiterResources,
} from "./loaders";

/**
 * Content Engine — Professional Hub derivations
 * (docs/phase-15-professional-hub/01-architecture.md). Thin views over
 * `@/content/professional-hub` so `/contact` (the Hub) and `/resume`
 * never hardcode resume paths or contact hrefs inline.
 */

export function getPrimaryContactMethods(): ContactMethod[] {
  return getContactMethods().filter((method) => method.primary);
}

export function getSecondaryContactMethods(): ContactMethod[] {
  return getContactMethods().filter((method) => !method.primary);
}

export function getVerifiedSocialPresence(): SocialPresenceLink[] {
  return getSocialPresenceLinks().filter(
    (link) => link.status === "verified" && Boolean(link.href)
  );
}

export function getPlannedSocialPresence(): SocialPresenceLink[] {
  return getSocialPresenceLinks().filter((link) => link.status === "planned");
}

/** True only when a PDF is marked ready — callers must still not invent
 * a file; `ready` is the single gate for enabling download CTAs. */
export function isResumeDownloadReady(): boolean {
  return getResumeArtifact().ready;
}

/** Internal recruiter-resource hrefs that must resolve to real routes. */
export function getRecruiterResourceHrefs(): string[] {
  return getRecruiterResources().map((resource) => resource.href);
}
