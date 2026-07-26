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
    <div className="surface p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="showcase-search" className="text-xs text-neutral-600">
            Search
          </label>
          <input
            id="showcase-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Project, technology, industry…"
            className="focus-visible:ring-accent-600 mt-1.5 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none focus-visible:ring-2"
          />
        </div>

        <div>
          <label htmlFor="showcase-technology" className="text-xs text-neutral-600">
            Technology
          </label>
          <select
            id="showcase-technology"
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            className="focus-visible:ring-accent-600 mt-1.5 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none focus-visible:ring-2"
          >
            <option value="">All technologies</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="showcase-industry" className="text-xs text-neutral-600">
            Industry
          </label>
          <select
            id="showcase-industry"
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
            className="focus-visible:ring-accent-600 mt-1.5 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none focus-visible:ring-2"
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

      <div className="mt-4 flex items-center justify-between gap-4">
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
            className="hover:text-accent-600 text-sm font-medium text-neutral-600"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
