import { SectionHeader } from "./SectionHeader";
import { BadgeCollection } from "./BadgeCollection";

/**
 * Experience Framework — Technology List. Generalizes Phase 6's
 * case-study-only `TechStackList`: the heading is now a prop (defaults
 * to "Technology Stack") and the badge rendering itself is
 * `BadgeCollection`, so this and any future "list of technologies"
 * section (an Architecture theme's stack, a future Blog post's tools)
 * share one implementation.
 */
export function TechnologyList({
  id,
  title = "Technology Stack",
  level = 2,
  stack,
}: {
  id: string;
  title?: string;
  level?: 2 | 3;
  stack?: string[] | null;
}) {
  if (!stack || stack.length === 0) return null;

  return (
    <section id={id} className="scroll-anchor mt-12">
      <SectionHeader sectionId={id} title={title} level={level} />
      <div className="mt-4">
        <BadgeCollection items={stack} />
      </div>
    </section>
  );
}
