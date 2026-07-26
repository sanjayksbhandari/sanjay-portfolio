"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import type { TocEntry } from "./TableOfContents";

/**
 * Experience Framework — Sticky Section Navigation
 * (docs/phase-8-experience-framework/00-README.md, "Navigation"). The
 * scroll-spy-highlighted sibling of the static `TableOfContents`: sticks
 * below the site header and highlights whichever section is currently
 * in view, using the `useActiveSection` hook Phase 3 built ahead of use
 * ("a future long-form page ... will need to know which heading is
 * currently in view" — that page is now this framework's
 * `DocumentationLayout`).
 *
 * Intended for genuinely long pages viewed at a width where a sidebar
 * makes sense (`DocumentationLayout`'s desktop/laptop breakpoint) — a
 * short page should use the static `TableOfContents` instead, per Phase
 * 6's own "minimal JavaScript" reasoning; this component is opt-in, not
 * a default every page pays the client-JS cost for.
 */
export function StickySectionNav({ items }: { items: TocEntry[] }) {
  const activeId = useActiveSection(items.map((item) => item.id));

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="print-hidden sticky top-[calc(var(--header-height)+1.5rem)] hidden max-h-[calc(100vh-var(--header-height)-3rem)] overflow-y-auto lg:block"
    >
      <p className="type-label-muted">On this page</p>
      <ul className="mt-4 space-y-2 border-l border-neutral-200 pl-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block text-sm transition-colors duration-[var(--motion-micro)]",
                  isActive
                    ? "text-accent-600 font-medium"
                    : "hover:text-accent-600 text-neutral-600"
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
