import Link from "next/link";
import type { LeadershipPrinciple } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { TodoNote } from "@/components/ui/TodoNote";

export function LeadershipPrincipleCard({ principle }: { principle: LeadershipPrinciple }) {
  return (
    <Card elevated className="flex h-full flex-col">
      <h3 className="type-h4">{principle.title}</h3>
      <p className="type-caption mt-2 leading-relaxed">{principle.practice}</p>
      {principle.evidence ? (
        <p className="mt-2 font-mono text-xs text-neutral-400">{principle.evidence}</p>
      ) : null}
      {principle.relatedCaseStudySlug ? (
        <Link
          href={`/case-studies/${principle.relatedCaseStudySlug}`}
          className="text-accent-600 mt-3 inline-block text-sm font-medium"
        >
          See it applied in a case study →
        </Link>
      ) : null}
      {principle.todos ? <TodoNote items={principle.todos} className="mt-4" /> : null}
    </Card>
  );
}
