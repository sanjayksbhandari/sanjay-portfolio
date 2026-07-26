import { ExpandableDetailBlock } from "@/components/experience/ExpandableDetailBlock";

/** Section 20 — Future Improvements. Collapsed by default via the
 * Experience Framework's `ExpandableDetailBlock`. */
export function FutureImprovements({
  id,
  title = "Future Improvements",
  level,
  items,
}: {
  id: string;
  title?: string;
  level?: 2 | 3;
  items?: string[] | null;
}) {
  if (!items || items.length === 0) return null;

  return (
    <ExpandableDetailBlock id={id} title={title} level={level}>
      <ul className="space-y-2">
        {items.map((line, i) => (
          <li key={i} className="flex gap-2 text-base leading-relaxed text-neutral-600">
            <span className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
    </ExpandableDetailBlock>
  );
}
