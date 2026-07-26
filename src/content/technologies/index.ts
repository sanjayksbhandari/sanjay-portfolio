import type { Technology } from "@/types/entities";
import { techCategories } from "@/content/impact/tech-ecosystem";

// The Technology catalog — derived from `techCategories`
// (`@/content/impact/tech-ecosystem.ts`, Phase 5), not a second
// hand-authored list. Every name that already appears in a Phase 5
// category gets a stable `slug` here so Projects ↔ Technologies can be a
// real relation (`content-engine/relations.ts`) instead of two
// independent arrays of bare strings that happen to overlap. Adding a
// new technology to the site going forward means adding it to
// `techCategories` once — it appears here automatically.
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const technologies: Technology[] = techCategories.flatMap((category) =>
  category.items.map((name) => ({
    id: `technology-${slugify(name)}`,
    slug: slugify(name),
    title: name,
    status: "published" as const,
    category: category.id,
    tags: [category.label],
  }))
);

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return technologies.find((technology) => technology.slug === slug);
}

export function getTechnologiesByCategory(categoryId: string): Technology[] {
  return technologies.filter((technology) => technology.category === categoryId);
}
