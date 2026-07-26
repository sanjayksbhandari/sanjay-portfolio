import type { LessonLearned } from "@/types/content";
import { ExpandableDetailBlock } from "@/components/experience/ExpandableDetailBlock";

/** Section 19 — Lessons Learned. Collapsed by default via the Experience
 * Framework's `ExpandableDetailBlock`. */
export function LessonsLearned({
  id,
  level,
  lessons,
}: {
  id: string;
  level?: 2 | 3;
  lessons?: LessonLearned[] | null;
}) {
  if (!lessons || lessons.length === 0) return null;

  return (
    <ExpandableDetailBlock id={id} title="Lessons Learned" level={level}>
      <ul className="space-y-4">
        {lessons.map((item, i) => (
          <li key={i}>
            <p className="text-base leading-relaxed text-neutral-600">{item.lesson}</p>
            {item.context ? <p className="mt-1 text-sm text-neutral-600">{item.context}</p> : null}
          </li>
        ))}
      </ul>
    </ExpandableDetailBlock>
  );
}
