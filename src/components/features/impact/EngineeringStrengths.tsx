import Link from "next/link";
import { getEngineeringStrengths } from "@/content-engine";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Impact Dashboard Block 4 — Engineering Strengths. Each strength names
// the one specific case study/fact behind it (never a bare adjective) —
// see `src/content/impact/strengths.ts`.
export function EngineeringStrengths() {
  return (
    <div>
      <SectionHeading level={3} title="Engineering Strengths" />
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {getEngineeringStrengths().map((strength) => (
          <div key={strength.id}>
            <h4 className="type-h4">{strength.title}</h4>
            <p className="type-caption mt-2 leading-relaxed">{strength.explanation}</p>
            {strength.relatedCaseStudySlug ? (
              <Link
                href={`/case-studies/${strength.relatedCaseStudySlug}`}
                className="text-accent-600 mt-3 inline-block text-sm font-medium"
              >
                See the case study →
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
