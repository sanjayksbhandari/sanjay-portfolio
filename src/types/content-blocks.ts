/**
 * Experience Framework — Content Block model
 * (docs/phase-8-experience-framework/02-content-renderer.md). The
 * structured shape a Content Engine entity's long-form body can be
 * authored in, for pages that need more than "title + prose + bullet
 * list" (`NarrativeBlock` already covers that common case directly).
 *
 * Deliberately a closed, explicit union — one variant per thing this
 * portfolio's verified content actually needs to express (Phase 7's
 * "never invent" rule applies here too: this is a rendering contract,
 * not a markdown/MDX parser). Markdown and MDX are intentionally NOT
 * block types: Phase 7 (`docs/phase-7-content-engine/09-storage-and-
 * folder-structure.md`) already decided against markdown/MDX as the
 * storage format in favor of typed TypeScript data, so there is no
 * markdown source to parse. If a future page genuinely needs authored
 * markdown/MDX (e.g. a long-form blog post), add a `"markdown"` variant
 * that renders through a real MDX pipeline at that time — see
 * `docs/phase-8-experience-framework/06-future-extension-points.md`.
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; code: string; language?: string; filename?: string }
  | { type: "callout"; tone: "info" | "note" | "success" | "warning"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "architectureNote"; title: string; text: string }
  | { type: "todo"; label: string };
