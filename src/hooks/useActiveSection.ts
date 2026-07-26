"use client";

import { useEffect, useState } from "react";

/**
 * Active Section Detection (docs/phase-3-application-shell/05-motion-
 * strategy.md "Scroll Experience"). Foundation only — no current page has
 * an in-page nav yet, but a future long-form page (e.g. a case study with
 * a sticky table of contents) will need to know which heading is
 * currently in view. Takes the list of section ids up front so it can
 * register one `IntersectionObserver` for all of them rather than one
 * per section.
 *
 * Returns `null` until a section has actually entered the configured
 * viewport band, and never guesses a value during SSR/first paint.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sections are provided as a literal array by the caller (e.g.
  // `useActiveSection(["overview", "architecture", "outcome"])`), so a
  // stable dependency is the joined string, not the array reference.
  const key = sectionIds.join(",");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Fires when a section is within the band just below the sticky
      // header down to the vertical center of the viewport — the same
      // "just past the header" offset `.scroll-anchor` uses for jump
      // targets, kept in sync deliberately.
      { rootMargin: "-96px 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeId;
}
