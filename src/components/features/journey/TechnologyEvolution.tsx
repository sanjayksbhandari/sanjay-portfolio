import type { JourneyEntry } from "@/types/content";
import type { TechnologyEvolutionCategory } from "@/content-engine";
import { Badge } from "@/components/ui/Badge";

/**
 * Engineering Journey, section 4 — Technology Evolution
 * (docs/phase-9-engineering-journey/01-architecture.md). Within each
 * category, technologies are grouped by the role that first introduced
 * them (e.g. "Since TeamLease Services Pvt. Ltd (Apr 2014 — Aug 2015)" /
 * "Since Opal BPM India Pvt Ltd (Sep 2015 — Apr 2025)") — the "growth
 * over time" the brief asks for, using only verified roles on record
 * rather than an invented year-by-year breakdown.
 */
export function TechnologyEvolution({ categories }: { categories: TechnologyEvolutionCategory[] }) {
  if (categories.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
      {categories.map((category) => (
        <div key={category.id}>
          <p className="type-label-muted">{category.label}</p>
          <div className="mt-3 space-y-4">
            {groupByEra(category.technologies).map((era) => (
              <div key={era.entry.slug}>
                <p className="text-xs text-neutral-600">
                  Since {era.entry.company} ({era.entry.dateRange})
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {era.technologies.map((name) => (
                    <Badge key={name}>{name}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function groupByEra(technologies: { name: string; firstSeenIn: JourneyEntry }[]) {
  const bySlug = new Map<string, { entry: JourneyEntry; technologies: string[] }>();
  for (const tech of technologies) {
    const bucket = bySlug.get(tech.firstSeenIn.slug) ?? {
      entry: tech.firstSeenIn,
      technologies: [] as string[],
    };
    bucket.technologies.push(tech.name);
    bySlug.set(tech.firstSeenIn.slug, bucket);
  }
  return Array.from(bySlug.values());
}
