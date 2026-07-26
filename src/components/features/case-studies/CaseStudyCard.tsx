import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

/**
 * The one card every case study/AI project index and "related projects"
 * grid uses (docs/phase-6-case-study-framework/00-README.md — one
 * framework, one card, regardless of `kind`). `basePath` follows
 * `kind` rather than being passed in separately: enterprise case
 * studies live at `/case-studies/[slug]`, personal projects at
 * `/ai-engineering/[slug]` (two IA-appropriate URLs sharing one
 * `CaseStudyDetail` template — see `src/lib/case-study-sections.ts`).
 */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const basePath = caseStudy.kind === "personal" ? "/ai-engineering" : "/case-studies";

  return (
    <Card as="article" elevated className="group h-full overflow-hidden">
      <Link href={`${basePath}/${caseStudy.slug}`} className="block">
        <div className="card-accent-edge" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3">
          <Badge tone="accent">{caseStudy.status}</Badge>
          {caseStudy.company ? (
            <span className="font-mono text-xs tracking-[-0.01em] text-neutral-600">
              {caseStudy.company}
            </span>
          ) : null}
        </div>
        <h3 className="type-h4 dark:group-hover:text-accent-600 mt-5 transition-colors duration-[var(--motion-standard)] group-hover:text-[var(--color-accent-royal)]">
          {caseStudy.name}
        </h3>
        <p className="type-caption mt-2.5 leading-relaxed">{caseStudy.oneLiner}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(caseStudy.stack ?? []).slice(0, 5).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <span className="dark:text-accent-600 mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-royal)] transition-transform duration-[var(--motion-standard)] ease-[var(--ease-spring)] group-hover:translate-x-0.5">
          Read case study
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </Card>
  );
}
