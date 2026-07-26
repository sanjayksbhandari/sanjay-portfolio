import type { CaseStudy } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

/**
 * Case Study Header — identity block every project's detail page opens
 * with: status, company (enterprise projects only — personal projects
 * have none, and the layout doesn't reserve space pretending otherwise),
 * name, and the one-line summary. Deliberately minimal per the Phase 6
 * visual-design brief ("no large illustrations, whitespace first") —
 * this is the same information the card on the index page shows, just
 * promoted to the page's actual `<h1>`.
 */
export function CaseStudyHeader({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone="accent">{caseStudy.status}</Badge>
        {caseStudy.company ? (
          <span className="font-mono text-xs text-neutral-600">{caseStudy.company}</span>
        ) : null}
      </div>
      <h1 className="type-h1 mt-4">{caseStudy.name}</h1>
      <p className="type-lead mt-4">{caseStudy.oneLiner}</p>
    </div>
  );
}
