import { ArrowUp } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";

/**
 * Experience Framework — Back to Top. A plain in-page anchor link to a
 * `#top` target (every layout in this framework renders one at its
 * start) rather than a `window.scrollTo` call — works with zero
 * JavaScript, and respects reduced-motion for free (the browser's own
 * `scroll-behavior: smooth` from `globals.css` already degrades to
 * instant when `prefers-reduced-motion` is set — see
 * `docs/phase-3-application-shell/05-motion-strategy.md`). A plain
 * Server Component — no state, no client JS needed.
 */
export function BackToTop() {
  return (
    <a
      href="#top"
      className="print-hidden hover:text-accent-600 mt-12 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors duration-[var(--motion-micro)]"
    >
      <Icon icon={ArrowUp} size="sm" />
      Back to top
    </a>
  );
}
