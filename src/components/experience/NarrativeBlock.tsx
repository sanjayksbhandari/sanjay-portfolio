import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Experience Framework — Narrative Block. Generalizes Phase 6's
 * `CaseStudySection` — a heading plus prose and/or a short bullet list,
 * the shape most long-form content actually is (Project Overview,
 * Business Problem, System Context, a Leadership principle's practice
 * description, an Architecture theme's summary, …). One implementation
 * instead of a near-identical one per page.
 *
 * Renders nothing when there's no content — an empty section is
 * *absent*, not an empty placeholder box (matches Phase 6's "every
 * section must be optional" rule, generalized to every content-rich
 * page this framework serves).
 */
export function NarrativeBlock({
  id,
  title,
  content,
  items,
  level = 2,
  emphasized = false,
  showCopyLink = true,
  className,
}: {
  id: string;
  title: string;
  content?: string | null;
  items?: string[] | null;
  level?: 2 | 3;
  /** Visually lifts the block (subtle surface + padding) for the
   * content a reader is most likely scanning for first. */
  emphasized?: boolean;
  showCopyLink?: boolean;
  className?: string;
}) {
  const hasContent = Boolean(content && content.trim().length > 0);
  const hasItems = Boolean(items && items.length > 0);
  if (!hasContent && !hasItems) return null;

  return (
    <section id={id} className={cn("scroll-anchor mt-12", className)}>
      <SectionHeader sectionId={id} title={title} level={level} showCopyLink={showCopyLink} />
      {hasContent ? (
        <div
          className={cn(
            "type-body mt-3 leading-relaxed",
            emphasized && "rounded-lg bg-neutral-50 p-6"
          )}
        >
          {content}
        </div>
      ) : null}
      {hasItems ? (
        <ul className={cn("space-y-2", hasContent ? "mt-4" : "mt-3")}>
          {(items ?? []).map((line, i) => (
            <li key={i} className="flex gap-2 text-base leading-relaxed text-neutral-600">
              <span
                className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full"
                aria-hidden="true"
              />
              {line}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
