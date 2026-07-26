import type { CaseStudy } from "@/types/content";

/** Suppressed for public visitors — unfinished sections are not advertised. */
export function ContentStatus(props: { caseStudy: CaseStudy; headingId?: string }) {
  void props;
  return null;
}
