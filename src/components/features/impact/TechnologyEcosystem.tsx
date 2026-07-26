"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { TechCategory } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/forms/Input";
import { Icon } from "@/components/primitives/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Impact Dashboard Block 3 — Technology Ecosystem
 * (docs/phase-5-impact-dashboard/03-motion-and-accessibility.md).
 *
 * Client Component only for search filtering. Categories are passed in
 * from the server parent so this file never imports `@/content-engine`
 * (which would pull the content graph into the client bundle and slow
 * navigations that hydrate the home page).
 */
export function TechnologyEcosystem({ categories }: { categories: TechCategory[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.toLowerCase().includes(q)),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading level={3} title="Technology Ecosystem" />
        <div className="relative w-full sm:w-64">
          <label htmlFor={inputId} className="sr-only">
            Filter technologies
          </label>
          <Icon
            icon={Search}
            size="sm"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
          />
          <Input
            id={inputId}
            type="search"
            placeholder="Filter technologies…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <div key={category.id}>
            <p className="type-label-muted">{category.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-600" role="status">
          No technologies match &ldquo;{query}&rdquo;.
        </p>
      ) : null}
    </div>
  );
}
