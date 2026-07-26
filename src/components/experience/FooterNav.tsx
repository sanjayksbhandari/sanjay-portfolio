import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";

export interface FooterNavEntry {
  href: string;
  label: string;
}

/**
 * Experience Framework — Footer Navigation. Generalizes Phase 6's
 * project-specific `ProjectNav` into a page-agnostic Previous/Next
 * pattern: callers pass a full `href` instead of a `basePath` + `slug`
 * pair, so this works for project-to-project navigation (Case Studies),
 * section-to-section navigation within one long page (a future
 * Documentation layout), or a future Blog post's prev/next.
 */
export function FooterNav({
  previous,
  next,
}: {
  previous?: FooterNavEntry | null;
  next?: FooterNavEntry | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Page navigation" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {previous ? (
        <Link href={previous.href} className="group surface p-5 hover:border-neutral-300">
          <span className="type-label-muted flex items-center gap-1.5">
            <Icon icon={ChevronLeft} size="sm" />
            Previous
          </span>
          <p className="type-h4 group-hover:text-accent-600 mt-2 transition-colors duration-[var(--motion-micro)]">
            {previous.label}
          </p>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link href={next.href} className="group surface p-5 hover:border-neutral-300 sm:text-right">
          <span className="type-label-muted flex items-center gap-1.5 sm:justify-end">
            Next
            <Icon icon={ChevronRight} size="sm" />
          </span>
          <p className="type-h4 group-hover:text-accent-600 mt-2 transition-colors duration-[var(--motion-micro)]">
            {next.label}
          </p>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
