"use client";

import { useEffect, useMemo, useState } from "react";

export interface ShowcaseFilterableStory {
  /** Also the story's own anchor `id` — used to look the element up in
   * the DOM to toggle `hidden`. */
  slug: string;
  technologies: string[];
  industries: string[];
  /** Lower-cased, pre-joined name/summary/company/stack/industries text
   * — computed once server-side (`EngineeringStory` builds the same
   * string for its own `data-search` attribute) so this component never
   * re-derives it. */
  searchText: string;
}

const fieldLabelClass = "type-label-muted block";

const controlClass =
  "focus-visible:ring-accent-600 mt-1.5 flex h-11 w-full items-center rounded-md border border-neutral-300 bg-[var(--color-neutral-0)] px-3 text-sm leading-none text-neutral-800 outline-none focus-visible:ring-2";

/**
 * Engineering Showcase — Filter Bar
 * (docs/phase-11-engineering-showcase/01-architecture.md, "Filtering &
 * search"). The only client-rendered piece of `/showcase`: the ten
 * engineering stories below it are plain server-rendered markup (see
 * `EngineeringStory`). Which stories currently match is a *derived
 * value* (`useMemo` over `stories` + the three filter inputs, all React
 * state) — the DOM is only ever written to, via one effect that
 * synchronizes each story's `hidden` attribute with that already-
 * computed result, never read from to decide what's visible.
 *
 * `hidden` removes a filtered-out story from the accessibility tree and
 * print output for free — no extra ARIA or `@media print` rule needed
 * here. Degrades cleanly with JavaScript disabled: every story starts
 * visible (server-rendered), and this bar simply has no effect —
 * filtering is progressive enhancement, not a requirement to read any
 * story.
 */
export function ShowcaseFilterBar({
  technologies,
  industries,
  stories,
}: {
  technologies: string[];
  industries: string[];
  stories: ShowcaseFilterableStory[];
}) {
  const [query, setQuery] = useState("");
  const [technology, setTechnology] = useState("");
  const [industry, setIndustry] = useState("");

  const visibleSlugs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return new Set(
      stories
        .filter((story) => {
          const matchesTechnology = !technology || story.technologies.includes(technology);
          const matchesIndustry = !industry || story.industries.includes(industry);
          const matchesQuery = !normalizedQuery || story.searchText.includes(normalizedQuery);
          return matchesTechnology && matchesIndustry && matchesQuery;
        })
        .map((story) => story.slug)
    );
  }, [stories, query, technology, industry]);

  useEffect(() => {
    for (const story of stories) {
      const element = document.getElementById(story.slug);
      if (element) element.hidden = !visibleSlugs.has(story.slug);
    }
  }, [stories, visibleSlugs]);

  const hasActiveFilter = Boolean(query || technology || industry);

  return (
    <div className="surface p-5 sm:p-6">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-5">
        <div className="min-w-0">
          <label htmlFor="showcase-search" className={fieldLabelClass}>
            Search
          </label>
          <input
            id="showcase-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Project, technology, industry…"
            className={controlClass}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="showcase-technology" className={fieldLabelClass}>
            Technology
          </label>
          <select
            id="showcase-technology"
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            className={`${controlClass} appearance-auto pr-8`}
          >
            <option value="">All technologies</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label htmlFor="showcase-industry" className={fieldLabelClass}>
            Industry
          </label>
          <select
            id="showcase-industry"
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
            className={`${controlClass} appearance-auto pr-8`}
          >
            <option value="">All industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200/80 pt-4">
        <p aria-live="polite" className="text-sm text-neutral-600">
          Showing {visibleSlugs.size} of {stories.length} engineering{" "}
          {stories.length === 1 ? "story" : "stories"}
        </p>
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTechnology("");
              setIndustry("");
            }}
            className="hover:text-accent-600 shrink-0 text-sm font-medium text-neutral-600"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
