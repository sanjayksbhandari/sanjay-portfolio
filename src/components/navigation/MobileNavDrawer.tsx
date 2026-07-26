"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { primaryNav, ctaNav } from "@/config/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NavLink } from "./NavLink";

/**
 * Full-screen mobile nav drawer (docs/phase-1-design-system §07 Navbar /
 * MobileNavDrawer). Rebuilt this phase on Radix `Dialog` specifically to
 * close the defect flagged in Phase 1 (docs/phase-1-design-system/09,
 * fix #2): Radix's `Dialog.Content` provides a real focus trap and
 * restores focus to the trigger on close for free — no hand-rolled
 * focus-trap logic exists here, which is the correct amount of code for
 * this problem (Principle 7, docs/phase-1-design-system/02).
 *
 * Body scroll lock and Escape-to-close are also handled by Radix, so the
 * manual `document.body.style.overflow` / `keydown` listeners from the
 * previous implementation were removed rather than kept alongside.
 */
export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-11 w-11 items-center justify-center rounded-md text-neutral-700 md:hidden"
        >
          {open ? (
            <X size={22} strokeWidth={1.75} aria-hidden />
          ) : (
            <Menu size={22} strokeWidth={1.75} aria-hidden />
          )}
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Content
              forceMount
              asChild
              onOpenAutoFocus={(e) => {
                // The first nav link, not the close button, is the more
                // useful initial focus target for a nav menu.
                e.preventDefault();
              }}
            >
              <m.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="z-overlay bg-neutral-0 safe-bottom fixed inset-0 top-[var(--header-height)] flex flex-col overflow-y-auto px-6 py-8 md:hidden"
              >
                <VisuallyHidden.Root asChild>
                  <Dialog.Title>Mobile navigation</Dialog.Title>
                </VisuallyHidden.Root>
                <VisuallyHidden.Root asChild>
                  <Dialog.Description>
                    Primary site navigation and calls to action.
                  </Dialog.Description>
                </VisuallyHidden.Root>

                <nav aria-label="Mobile" className="flex flex-col gap-1">
                  {primaryNav.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-neutral-100 py-4 text-lg"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-8 flex flex-col gap-3">
                  {ctaNav.map((item) => (
                    // `Link`, not a raw `<a>` — both `ctaNav` entries are
                    // internal routes; a raw `<a>` here would force a full
                    // page reload instead of a client-side transition
                    // (docs/phase-3-application-shell/07-routing-strategy.md).
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center justify-center rounded-md border border-neutral-300 text-base font-medium text-neutral-800"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
