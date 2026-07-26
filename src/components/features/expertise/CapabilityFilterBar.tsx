"use client";

import { useEffect, useMemo, useState } from "react";
import type { CapabilityFilterable } from "@/content-engine";

/**
 * Engineering Capability Matrix — Filter Bar
 * (docs/phase-14-capability-matrix/01-architecture.md). Same
 * architecture as `ShowcaseFilterBar` / `AITechnologyFilterBar`:
 * filtering is a derived value (`useMemo`), written to the DOM via one
 * effect that toggles each card's `hidden` attribute. Search +
 * technology filter (the brief's own interaction requirements for this
 * page). Degrades cleanly with JavaScript disabled — every card starts
 * visible (server-rendered).
 */
export function CapabilityFilterBar({
  technologies,
  capabilities,
}: {
  technologies: string[];
  capabilities: CapabilityFilterable[];
}) {
  const [query, setQuery] = useState("");
  const [technology, setTechnology] = useState("");

  const visibleIds = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return new Set(
      capabilities
        .filter((capability) => {
          const matchesTechnology = !technology || capability.technologies.includes(technology);
          const matchesQuery = !normalizedQuery || capability.searchText.includes(normalizedQuery);
          return matchesTechnology && matchesQuery;
        })
        .map((capability) => capability.id)
    );
  }, [capabilities, query, technology]);

  useEffect(() => {
    for (const capability of capabilities) {
      const element = document.getElementById(capability.id);
      if (element) element.hidden = !visibleIds.has(capability.id);
    }
  }, [capabilities, visibleIds]);

  const hasActiveFilter = Boolean(query || technology);

  return (
    <div className="surface p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="capability-search" className="text-xs text-neutral-600">
            Search capabilities
          </label>
          <input
            id="capability-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Capability, project, technology…"
            className="focus-visible:ring-accent-600 mt-1.5 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none focus-visible:ring-2"
          />
        </div>

        <div>
          <label htmlFor="capability-technology" className="text-xs text-neutral-600">
            Technology
          </label>
          <select
            id="capability-technology"
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
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-neutral-600">
          Showing {visibleIds.size} of {capabilities.length} capabilities
        </p>
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTechnology("");
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
