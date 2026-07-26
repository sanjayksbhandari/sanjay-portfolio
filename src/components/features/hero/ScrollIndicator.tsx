import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

/**
 * Subtle Scroll Indicator (Phase 4 Hero deliverable —
 * docs/phase-4-hero-experience/03-motion-and-accessibility.md).
 *
 * A plain anchor link, not a button-with-onClick-scrollIntoView: jumping
 * to `#${targetId}` is a real, keyboard-and-JS-independent browser
 * behavior, and the smooth-scroll + header-offset are already handled
 * globally (`html { scroll-behavior: smooth }` and the `.scroll-anchor`
 * utility on the target section, both docs/phase-3-application-shell/05).
 * No client component, no scroll-triggered logic — "no unnecessary
 * JavaScript" (Phase 4 Performance section) taken literally: this needs
 * none.
 *
 * Deliberately static otherwise — docs/phase-1-design-system/06 is
 * explicit that "nothing on this site loops, pulses, or auto-advances
 * without user action, ever." A conventional bouncing chevron would
 * violate that outright, so the only motion here is a plain CSS
 * `:hover`/`:focus-visible` nudge (a direct response to user input, not a
 * loop) — the same "micro hover" category the Phase 4 brief itself lists
 * as acceptable Hero motion.
 */
export function ScrollIndicator({
  targetId,
  label = "Scroll",
  className,
}: {
  targetId: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      aria-label={`${label} to next section`}
      className={cn(
        // neutral-600, not neutral-500 — neutral-500 measures 4.25:1 at
        // this size and fails AA (docs/phase-1-design-system/09, fix #1;
        // same rule already applied to Kicker/Stat/SiteFooter).
        "group hover:text-accent-600 inline-flex flex-col items-center gap-2 text-neutral-600 transition-colors duration-[var(--motion-micro)]",
        className
      )}
    >
      <span className="font-mono text-xs tracking-[0.08em] uppercase">{label}</span>
      <Icon
        icon={ChevronDown}
        size="sm"
        className="transition-transform duration-[var(--motion-micro)] group-hover:translate-y-1 group-focus-visible:translate-y-1"
      />
    </a>
  );
}
