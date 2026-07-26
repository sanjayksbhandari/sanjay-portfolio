import { ExternalLink } from "@/components/ui/ExternalLink";
import Link from "next/link";

export interface ReferenceLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Experience Framework — References Panel. A generic "related reading /
 * sources" list — link `label` + `href` only, content-agnostic (unlike
 * Phase 6's `RelatedProjects`, which resolves full `CaseStudy` cards).
 * Intended for a future Publications/Blog page's "further reading," or
 * a Case Study's external references (a GitHub repo, a spec document).
 */
export function ReferencesPanel({
  title = "References",
  links,
}: {
  title?: string;
  links: ReferenceLink[];
}) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title} className="surface mt-12 p-6">
      <p className="type-label-muted">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href} className="text-sm">
            {link.external ? (
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            ) : (
              <Link href={link.href} className="hover:text-accent-600 text-neutral-700">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
