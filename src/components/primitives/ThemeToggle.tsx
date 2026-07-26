"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";
import { Icon } from "./Icon";
import { Tooltip } from "./Tooltip";
import { cn } from "@/lib/utils";

const modes = ["light", "system", "dark"] as const;
type Mode = (typeof modes)[number];

const iconFor: Record<Mode, typeof Sun> = {
  light: Sun,
  system: Monitor,
  dark: Moon,
};

const labelFor: Record<Mode, string> = {
  light: "Light",
  system: "System",
  dark: "Dark",
};

/**
 * Light / System / Dark theme switch (docs/phase-2-design-system §05
 * "Support Light Theme, Dark Theme, System Theme. Smooth switching.").
 *
 * Rendered in `SiteHeader` — the one place this phase touches an already-
 * built layout component, and only additively, since the theme system
 * has no other affordance to be reached from otherwise. Defaults to
 * `system` (see `ThemeProvider`), consistent with docs/18-future-
 * roadmap.md's constraint that dark mode must never become the default.
 *
 * `useMounted` guards against rendering the wrong icon during SSR/first
 * paint, when the real theme isn't knowable yet — this prevents a
 * hydration mismatch rather than suppressing the warning.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const current: Mode = mounted ? ((theme as Mode) ?? "system") : "system";

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-neutral-200 bg-neutral-50/80 p-0.5 shadow-[var(--shadow-sm)]"
    >
      {modes.map((mode) => {
        const active = current === mode;
        return (
          <Tooltip key={mode} content={labelFor[mode]}>
            <button
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${labelFor[mode]} theme`}
              onClick={() => setTheme(mode)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-[var(--motion-micro)]",
                active
                  ? "bg-neutral-0 text-neutral-800 shadow-[var(--shadow-sm)]"
                  : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              <Icon icon={iconFor[mode]} size="sm" />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
