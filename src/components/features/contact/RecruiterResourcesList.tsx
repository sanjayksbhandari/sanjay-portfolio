import Link from "next/link";
import type { RecruiterResource } from "@/types/content";

/**
 * Professional Hub — Recruiter Resources shortcuts
 * (docs/phase-15-professional-hub/01-architecture.md). Internal links
 * only — validation requires every href start with `/`.
 */
export function RecruiterResourcesList({ resources }: { resources: RecruiterResource[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {resources.map((resource) => (
        <li key={resource.id}>
          <Link
            href={resource.href}
            className="surface surface-interactive hover:border-accent-600 block p-5"
          >
            <p className="font-medium text-neutral-800">{resource.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{resource.description}</p>
            <p className="text-accent-600 mt-3 text-sm font-medium">Open →</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
