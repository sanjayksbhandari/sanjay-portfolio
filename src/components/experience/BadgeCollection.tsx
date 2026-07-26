import { Badge } from "@/components/ui/Badge";

/**
 * Experience Framework — Badge Collection. A thin, generic wrapper over
 * the Phase 2 `Badge` primitive for rendering an arbitrary list of
 * short labels (technologies, tags, categories) — extracted so
 * `TechnologyList` and any future "list of short labels" section share
 * one implementation instead of each hand-rolling `items.map(...
 * <Badge>)`.
 */
export function BadgeCollection({
  items,
  tone = "neutral",
  className,
}: {
  items: string[];
  tone?: "neutral" | "accent";
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={className ?? "flex flex-wrap gap-2"}>
      {items.map((item) => (
        <Badge key={item} tone={tone}>
          {item}
        </Badge>
      ))}
    </div>
  );
}
