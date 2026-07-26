import type { ExperienceProfile } from "@/content-engine";
import { SectionHeader } from "@/components/experience/SectionHeader";
import { BadgeCollection } from "@/components/experience/BadgeCollection";
import { AchievementPanel } from "@/components/experience/AchievementPanel";
import { ReferencesPanel } from "@/components/experience/ReferencesPanel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";

/**
 * Engineering Journey — Career Timeline entry
 * (docs/phase-9-engineering-journey/01-architecture.md). One `<li>` per
 * verified role, composed entirely from `ExperienceProfile`
 * (`content-engine/journey.ts`) and Experience Framework primitives —
 * this file adds layout only, no new content and no new fact.
 *
 * Structure: the role title and its always-visible teaser (the first,
 * most-defining line of `entry.scope`) are readable without any
 * interaction, so the "recruiter in three minutes" objective doesn't
 * depend on anyone expanding anything. Everything else — the rest of
 * the scope, leadership, business outcomes, achievements, projects,
 * stack — sits behind one "Full role details" disclosure (the brief's
 * "Expandable Details"), open by default so nothing is actually hidden
 * on first render; a reader can still collapse it to compare roles at a
 * glance. Uses the existing `Accordion` primitive
 * (`src/components/primitives/Accordion.tsx`, already established by
 * `SelectedHighlights` for this exact "item-level disclosure" shape)
 * rather than `ExpandableDetailBlock`, which is reserved for page-level,
 * `<h2>`-anchored sections (docs/phase-8-experience-framework/01).
 */
export function CareerTimelineEntry({
  profile,
  sticky = false,
}: {
  profile: ExperienceProfile;
  sticky?: boolean;
}) {
  const { entry, caseStudies, achievements, technologyStack, businessOutcomes, industries } =
    profile;
  const [teaser, ...restOfScope] = entry.scope;

  return (
    <li
      id={entry.slug}
      className="scroll-anchor grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr]"
      aria-labelledby={`${entry.slug}-title`}
    >
      <div
        className={
          sticky ? "lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start" : ""
        }
      >
        <p className="font-mono text-sm text-neutral-600">{entry.dateRange}</p>
        {entry.durationLabel ? (
          <p className="mt-1 text-xs text-neutral-600">{entry.durationLabel}</p>
        ) : null}
      </div>

      <div className="timeline-rail rounded-md py-1 pr-2 transition-[background-color] duration-[var(--motion-standard)] ease-[var(--ease-spring)] hover:bg-neutral-50/60 dark:hover:bg-neutral-100/40">
        <div id={`${entry.slug}-title`}>
          <SectionHeader sectionId={entry.slug} title={entry.title} level={3} />
        </div>
        <p className="mt-1 text-sm font-semibold text-neutral-600">
          {entry.company}
          {entry.location ? ` · ${entry.location}` : ""}
        </p>

        {industries.length > 0 ? (
          <div className="mt-3">
            <BadgeCollection items={industries} tone="accent" />
          </div>
        ) : null}

        {teaser ? (
          <p className="mt-4 text-base leading-relaxed text-neutral-600">{teaser}</p>
        ) : null}

        <Accordion type="single" collapsible defaultValue={entry.slug} className="mt-6">
          <AccordionItem value={entry.slug}>
            <AccordionTrigger>Full role details</AccordionTrigger>
            <AccordionContent>
              <LabeledList label="Major responsibilities" items={restOfScope} />
              <LabeledList
                label="Leadership responsibilities"
                items={entry.leadershipScope}
                className="mt-6"
              />
              <LabeledList label="Business outcomes" items={businessOutcomes} className="mt-6" />

              {achievements.length > 0 ? (
                <div className="mt-6">
                  <p className="type-label-muted">Key achievements</p>
                  <div className="mt-3">
                    <AchievementPanel
                      items={achievements.map((achievement) => ({
                        id: achievement.id,
                        statement: achievement.statement,
                      }))}
                    />
                  </div>
                </div>
              ) : null}

              <ReferencesPanel
                title="Projects delivered in this role"
                links={caseStudies.map((cs) => ({
                  label: cs.name,
                  href: `${cs.kind === "personal" ? "/ai-engineering" : "/case-studies"}/${cs.slug}`,
                }))}
              />

              {technologyStack.length > 0 ? (
                <div className="mt-6">
                  <p className="type-label-muted">Technology stack</p>
                  <div className="mt-3">
                    <BadgeCollection items={technologyStack} />
                  </div>
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </li>
  );
}

/** Restated `NarrativeBlock`-style bullet list, without `NarrativeBlock`'s
 * own `<h2>/<h3>` heading — this renders inside an already-nested
 * disclosure where a real heading would over-nest, so the label is a
 * plain, non-heading `<p>` (matching `ReferencesPanel`/`FactCard`'s own
 * label treatment). Renders nothing when there's nothing to show,
 * matching every other Experience Framework block's "absent, not
 * empty" rule. */
function LabeledList({
  label,
  items,
  className,
}: {
  label: string;
  items?: string[] | null;
  className?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className={className}>
      <p className="type-label-muted">{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((line, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-600">
            <span className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
