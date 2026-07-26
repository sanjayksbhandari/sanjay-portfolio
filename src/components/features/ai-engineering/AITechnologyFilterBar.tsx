"use client";

import { useEffect, useMemo, useState } from "react";

export interface AIProjectFilterable {
  /** Also the project card's own anchor `id` — used to look the element
   * up in the DOM to toggle `hidden`. */
  slug: string;
  technologies: string[];
}

/**
 * AI Engineering & Innovation Lab, section 3 — Technology filter (the
 * brief's own "Technology filters" interaction requirement). Same
 * architecture as `ShowcaseFilterBar` (docs/phase-11-engineering-
 * showcase/01-architecture.md): filtering is a derived value (`useMemo`
 * over `projects` + the selected technology), written to the DOM through
 * one effect that toggles each card's `hidden` attribute — never read
 * back from the DOM. Deliberately a single filter, not the Showcase's
 * three (search/technology/industry): this page's brief asks only for a
 * technology filter, and seven small AI-project cards don't need a
 * second axis on top of it.
 *
 * Degrades cleanly with JavaScript disabled — every card starts visible
 * (server-rendered), and this bar simply has no effect.
 */
export function AITechnologyFilterBar({
  technologies,
  projects,
}: {
  technologies: string[];
  projects: AIProjectFilterable[];
}) {
  const [technology, setTechnology] = useState("");

  const visibleSlugs = useMemo(() => {
    if (!technology) return new Set(projects.map((project) => project.slug));
    return new Set(
      projects.filter((project) => project.technologies.includes(technology)).map((p) => p.slug)
    );
  }, [projects, technology]);

  useEffect(() => {
    for (const project of projects) {
      const element = document.getElementById(project.slug);
      if (element) element.hidden = !visibleSlugs.has(project.slug);
    }
  }, [projects, visibleSlugs]);

  return (
    <div className="surface flex flex-wrap items-center gap-4 p-4">
      <div className="flex-1">
        <label htmlFor="ai-project-technology" className="text-xs text-neutral-600">
          Filter AI projects by technology
        </label>
        <select
          id="ai-project-technology"
          value={technology}
          onChange={(event) => setTechnology(event.target.value)}
          className="focus-visible:ring-accent-600 mt-1.5 block w-full max-w-xs rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none focus-visible:ring-2"
        >
          <option value="">All technologies</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
      <p aria-live="polite" className="text-sm text-neutral-600">
        Showing {visibleSlugs.size} of {projects.length} projects
      </p>
      {technology ? (
        <button
          type="button"
          onClick={() => setTechnology("")}
          className="hover:text-accent-600 text-sm font-medium text-neutral-600"
        >
          Clear filter
        </button>
      ) : null}
    </div>
  );
}
