# src/assets

Deliberately empty.

`docs/phase-1-design-system/01-design-language-specification.md` (§9–10)
forbids illustration and, with narrow exceptions, photography for this
project — there is no icon set, illustration, or image asset that
belongs in a shared `assets/` folder today. Icons come from `lucide-
react` via `src/components/primitives/Icon.tsx`, not from static files.

This folder exists (per the Phase 2 architecture list) so a future,
_approved_ asset (e.g. a real headshot for `Avatar`, an OG image) has an
obvious home — it is not populated speculatively.
