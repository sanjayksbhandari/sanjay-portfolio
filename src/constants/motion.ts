/**
 * JS mirror of the motion tokens in `globals.css`
 * (docs/phase-1-design-system/03 §8, docs/phase-1-design-system/06).
 *
 * Framer Motion needs numeric second values, not CSS custom-property
 * strings, so these constants exist specifically for
 * `src/components/motion/*` — they are not a second set of tokens, they
 * are the same durations expressed in the unit JS needs. If a duration
 * changes, change it in both places in the same commit
 * (docs/phase-2-design-system §14, coding standards).
 */
export const MOTION_DURATION = {
  micro: 0.12,
  standard: 0.2,
  entrance: 0.32,
  page: 0.2,
} as const;

/** Matches `--ease-entrance` in globals.css. */
export const EASE_ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard ease-out, used for micro/standard-duration transitions. */
export const EASE_STANDARD: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Stagger increment per sibling, seconds (docs/phase-1-design-system/06). */
export const STAGGER_STEP = 0.05;

/** Ceiling on total stagger duration for one list, regardless of item count. */
export const STAGGER_MAX_TOTAL = 0.55;
