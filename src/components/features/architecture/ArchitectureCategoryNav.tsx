import type { ArchitecturePatternGroup } from "@/content-engine";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/**
 * Architecture Gallery, section 2 — Architecture Categories
 * (docs/phase-10-architecture-gallery/01-architecture.md). A static,
 * zero-JS overview grid: each category card's pattern count and link
 * jump to that category's group in section 3 (`#pattern-<categoryId>`)
 * rather than duplicating the cards' own content here.
 */
export function ArchitectureCategoryNav({ groups }: { groups: ArchitecturePatternGroup[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map(({ category, patterns }) => (
        <Card as="article" key={category.id} className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="type-h4">{category.label}</h3>
            <Badge className="shrink-0">
              {patterns.length} pattern{patterns.length === 1 ? "" : "s"}
            </Badge>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
            {category.description}
          </p>
          <a
            href={`#pattern-${category.id}`}
            className="text-accent-600 mt-4 inline-block text-sm font-medium"
          >
            View patterns →
          </a>
        </Card>
      ))}
    </div>
  );
}
