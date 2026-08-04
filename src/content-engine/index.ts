// Content Engine — public entry point
// (docs/phase-7-content-engine/00-README.md).
//
// This is the Single Source of Truth import path for portfolio content.
// Pages and components should import from `@/content-engine`, not from
// `@/content/**` directly — the split between "what a page reads" and
// "where a fact is physically stored" is the entire point of this
// module: if the storage layer ever changes (MDX, a CMS, an API — see
// docs/phase-7-content-engine/05-migration-strategy.md), every function
// signature below stays the same and every caller is unaffected.
export * from "./loaders";
export * from "./relations";
export * from "./adapters";
export * from "./filters";
export * from "./validation";
export * from "./search-index";
export * from "./seo";
export * from "./journey";
export * from "./architecture";
export * from "./showcase";
export * from "./leadership";
export * from "./ai-engineering";
export * from "./capabilities";
export * from "./professional-hub";
export * from "./education";
