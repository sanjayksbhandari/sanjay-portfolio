import { Card } from "@/components/ui/Card";

export interface AchievementItem {
  id: string;
  statement: string;
  context?: string;
}

/**
 * Experience Framework — Achievement Panel. A generic statement +
 * context card list for achievement-shaped content — extracted from the
 * pattern `/achievements` (Phase 5) already hand-rolled with a bare
 * `Card`, so a future page (Leadership, a Case Study's own achievements)
 * can reuse the same treatment instead of a new one.
 */
export function AchievementPanel({ items }: { items: AchievementItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <Card as="article" key={item.id} className="flex h-full flex-col">
          <p className="text-base text-neutral-800">{item.statement}</p>
          {item.context ? (
            <p className="mt-2 flex-1 text-sm text-neutral-600">{item.context}</p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
