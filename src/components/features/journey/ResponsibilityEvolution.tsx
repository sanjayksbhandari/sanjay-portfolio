import { ArrowDown } from "lucide-react";
import type { ExperienceProfile } from "@/content-engine";
import { Icon } from "@/components/primitives/Icon";

/**
 * Engineering Journey, section 3 — Responsibility Evolution
 * (docs/phase-9-engineering-journey/01-architecture.md). Renders exactly
 * the verified titles in `JourneyEntry.title` in chronological order —
 * today Software Programmer → Programmer → Senior Java Developer →
 * Senior Java Developer → Lead Java Developer — and nothing else. The
 * brief's own example
 * ladder ("Developer → Senior Developer → Lead Developer → Technical
 * Leader → Engineering Leader") is illustrative, not a target to fill
 * in: there is no verified "Technical Leader"/"Engineering Leader" title
 * on record, and inventing intermediate rungs to make a longer ladder
 * would violate the "use only verified titles" instruction.
 */
export function ResponsibilityEvolution({ profiles }: { profiles: ExperienceProfile[] }) {
  return (
    <ol className="mt-8 max-w-xl">
      {profiles.map((profile, i) => (
        <li key={profile.entry.slug}>
          {i > 0 ? (
            <div className="flex justify-center py-3" aria-hidden="true">
              <Icon icon={ArrowDown} size="sm" className="text-neutral-400" />
            </div>
          ) : null}
          <div className="surface p-6">
            <p className="type-h4">{profile.entry.title}</p>
            <p className="mt-1 text-sm font-semibold text-neutral-600">
              {profile.entry.company} · {profile.entry.dateRange}
            </p>
            {profile.caseStudies[0]?.myRole ? (
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {profile.caseStudies[0].myRole}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
