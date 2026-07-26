import Link from "next/link";

/**
 * Breadcrumb trail (navigation infrastructure — docs/phase-3-application-
 * shell/03-seo-architecture.md "Breadcrumb Framework").
 *
 * Fixed this phase: the wrapping `<nav>` previously set the link color via
 * `text-neutral-400` (2.85:1 against white — fails AA even for large text),
 * inherited by every `<Link>` since they had no color class of their own.
 * Only the final, non-link item explicitly overrode to `neutral-600`. This
 * is the same class of defect Phase 1/2 already fixed elsewhere
 * (`neutral-500` → `neutral-600`); it had not been caught in this specific
 * component until this pass. Links now use `neutral-600` explicitly rather
 * than relying on inheritance.
 */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-xs">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-accent-600 text-neutral-600">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-neutral-600">
                {item.name}
              </span>
            )}
            {i < items.length - 1 ? (
              <span aria-hidden="true" className="text-neutral-400">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
