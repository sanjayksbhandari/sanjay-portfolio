import Link from "next/link";
import type { EngineeringResponsibility } from "@/types/content";

/**
 * Engineering Capability Matrix — Responsibilities Matrix
 * (docs/phase-14-capability-matrix/01-architecture.md). A semantic
 * definition list (not a skill-meter table): each brief category maps
 * to verified evidence, with an honest TODO where the *practice* behind
 * a verified *outcome* isn't documented yet. Plain HTML so it prints
 * and reads without JavaScript.
 */
export function ResponsibilitiesMatrix({
  responsibilities,
}: {
  responsibilities: EngineeringResponsibility[];
}) {
  return (
    <div className="surface overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th scope="col" className="type-label-muted px-4 py-3">
              Responsibility
            </th>
            <th scope="col" className="type-label-muted px-4 py-3">
              Verified evidence
            </th>
          </tr>
        </thead>
        <tbody>
          {responsibilities.map((row, i) => (
            <tr
              key={row.id}
              id={`responsibility-${row.id}`}
              className={
                i < responsibilities.length - 1
                  ? "scroll-anchor border-b border-neutral-200"
                  : "scroll-anchor"
              }
            >
              <th
                scope="row"
                className="px-4 py-3 align-top font-medium whitespace-nowrap text-neutral-800"
              >
                {row.category}
              </th>
              <td className="px-4 py-3 text-neutral-700">
                <p className="leading-relaxed">{row.evidence}</p>
                {row.relatedCaseStudySlug ? (
                  <p className="mt-2">
                    <Link
                      href={`/case-studies/${row.relatedCaseStudySlug}`}
                      className="text-accent-600 text-sm font-medium"
                    >
                      Related case study →
                    </Link>
                  </p>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
