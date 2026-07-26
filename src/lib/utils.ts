import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard `cn` helper (clsx + tailwind-merge). Upgraded this phase from a
 * plain `.filter(Boolean).join(" ")` — the naive version couldn't resolve
 * conflicting Tailwind classes (e.g. a consumer passing `className="p-8"`
 * to override a component's own `p-6` produced invalid CSS with both
 * classes present). Every existing call site (`cn(...)`) is source-
 * compatible with this signature, so no consumer needed to change.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
