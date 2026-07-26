import type { CaseStudy } from "@/types/content";
import { SectionHeader } from "@/components/experience/SectionHeader";

/**
 * Role Card — sections 3 (My Role) and 4 (Team Composition) together,
 * since they answer one question ("who did what, with how many
 * people?"). Reads both fields as authored — personal projects set
 * their own "solo, independently built" values directly in content
 * (see `src/content/ai-projects/*`) rather than the component guessing a
 * default, so this stays in sync with `getMissingSections`, which reads
 * the same two raw fields for the Table of Contents and Content Status
 * tracker.
 */
export function RoleCard({
  id,
  title = "My Role",
  level = 2,
  caseStudy,
}: {
  id: string;
  title?: string;
  level?: 2 | 3;
  caseStudy: CaseStudy;
}) {
  const { myRole, teamComposition } = caseStudy;

  if (!myRole && !teamComposition) return null;

  return (
    <section id={id} className="scroll-anchor mt-12">
      <SectionHeader sectionId={id} title={title} level={level} />
      <div className="surface-sm mt-4 space-y-3 p-6">
        {myRole ? <p className="text-base leading-relaxed text-neutral-600">{myRole}</p> : null}
        {teamComposition ? (
          <p className="text-sm text-neutral-600">
            <span className="type-label-muted">Team — </span>
            {teamComposition}
          </p>
        ) : null}
      </div>
    </section>
  );
}
