import type { ReactNode } from "react";
import type { CaseStudy } from "@/types/content";

/**
 * Metadata Panel — compact facts. Omits unverified team composition.
 */
export function MetadataPanel({ caseStudy }: { caseStudy: CaseStudy }) {
  const facts: { label: string; value: ReactNode }[] = [
    {
      label: "Type",
      value: caseStudy.kind === "enterprise" ? "Enterprise case study" : "Personal project",
    },
  ];

  if (caseStudy.company) {
    facts.push({ label: "Client / company", value: caseStudy.company });
  }

  if (caseStudy.teamComposition) {
    facts.push({ label: "Team", value: caseStudy.teamComposition });
  }

  if (caseStudy.stack && caseStudy.stack.length > 0) {
    facts.push({
      label: "Stack",
      value: `${caseStudy.stack.length} ${caseStudy.stack.length === 1 ? "technology" : "technologies"}`,
    });
  }

  return (
    <dl className="surface mt-8 grid grid-cols-2 gap-6 p-6 sm:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="type-label-muted">{fact.label}</dt>
          <dd className="mt-1.5 text-sm text-neutral-800">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
