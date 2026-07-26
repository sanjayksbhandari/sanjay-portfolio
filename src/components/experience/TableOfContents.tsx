export interface TocEntry {
  id: string;
  title: string;
}

/**
 * Experience Framework — Table of Contents. Generalizes Phase 6's
 * case-study-only `TableOfContents`: accepts a plain `{ id, title }[]`
 * instead of `CaseStudySectionDef[]`, so it works for any page's set of
 * anchored sections (Case Studies, a future Architecture deep-dive,
 * Leadership). Static and server-rendered — anchor links, deep linking,
 * and keyboard navigation all work with zero JavaScript; see
 * `StickySectionNav` for the client-side, scroll-spy-highlighted
 * variant used on longer pages.
 */
export function TableOfContents({ items, minItems = 3 }: { items: TocEntry[]; minItems?: number }) {
  if (items.length < minItems) return null;

  return (
    <nav aria-label="Table of contents" className="surface mt-10 p-6">
      <p className="type-label-muted">On this page</p>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="hover:text-accent-600 text-sm text-neutral-600 transition-colors duration-[var(--motion-micro)]"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
