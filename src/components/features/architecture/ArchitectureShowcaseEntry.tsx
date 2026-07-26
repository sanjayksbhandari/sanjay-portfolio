import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import { SectionHeader } from "@/components/experience/SectionHeader";
import { BadgeCollection } from "@/components/experience/BadgeCollection";
import { MetricGrid } from "@/components/experience/MetricGrid";
import { DecisionCard } from "@/components/experience/DecisionCard";
import { TodoNote } from "@/components/ui/TodoNote";
import { getArchitectureRelevantTodos } from "@/content-engine";

/**
 * Architecture Gallery, section 4 — Verified Architecture Showcase
 * (docs/phase-10-architecture-gallery/01-architecture.md). Renders the
 * architecture-relevant subset of an already-verified `CaseStudy` —
 * `architectureSummary`, `decisions`, `stack`, `metrics` — rather than
 * a second, hand-authored description of the same system. TODOs shown
 * here are filtered to architecture-relevant sections only
 * (`getArchitectureRelevantTodos`) — business-impact/team-composition
 * gaps belong to the case study's own page, not this architecture-
 * focused view of it.
 */
export function ArchitectureShowcaseEntry({ caseStudy }: { caseStudy: CaseStudy }) {
  const basePath = caseStudy.kind === "personal" ? "/ai-engineering" : "/case-studies";
  const todos = getArchitectureRelevantTodos(caseStudy);
  const sectionId = `showcase-${caseStudy.slug}`;

  return (
    <div id={sectionId} className="scroll-anchor">
      <SectionHeader sectionId={sectionId} title={caseStudy.name} level={3} />
      <p className="mt-1 text-sm text-neutral-600">{caseStudy.company ?? "Personal project"}</p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
        {caseStudy.oneLiner}
      </p>

      {caseStudy.architectureSummary ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-700">
          {caseStudy.architectureSummary}
        </p>
      ) : null}

      {caseStudy.decisions && caseStudy.decisions.length > 0 ? (
        <div className="mt-6 space-y-6">
          {caseStudy.decisions.map((decision, i) => (
            <DecisionCard key={i} decision={decision} />
          ))}
        </div>
      ) : null}

      {caseStudy.stack && caseStudy.stack.length > 0 ? (
        <div className="mt-6">
          <p className="type-label-muted">Technology stack</p>
          <div className="mt-2">
            <BadgeCollection items={caseStudy.stack} />
          </div>
        </div>
      ) : null}

      <MetricGrid metrics={caseStudy.metrics} />

      <Link
        href={`${basePath}/${caseStudy.slug}`}
        className="text-accent-600 mt-6 inline-block text-sm font-medium"
      >
        Read the full case study →
      </Link>

      {todos.length > 0 ? <TodoNote className="mt-6" items={todos} /> : null}
    </div>
  );
}
