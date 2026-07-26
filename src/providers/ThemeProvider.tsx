"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Light / dark / system theming, via `next-themes`.
 *
 * docs/18-future-roadmap.md (Phase 0) deferred dark mode and required
 * that it "must never become the default or primary experience." That
 * constraint is honored here: `defaultTheme="system"` means a visitor's
 * OS preference decides, not a bias toward dark — and light mode remains
 * the version every other design decision in this project was tested
 * against. See docs/phase-2-design-system/00 for the full reconciliation.
 *
 * `attribute="class"` toggles a `.dark` class on `<html>`, which is what
 * `globals.css`'s `@custom-variant dark` and `.dark { ... }` token
 * overrides key off — no other theming mechanism exists in this project.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
