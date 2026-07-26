"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { ProfilePhoto, PROFILE_PHOTO_SRC } from "@/components/ui/ProfilePhoto";
import { Icon } from "@/components/primitives/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/config/site";

/**
 * Header profile mark — opens a full-resolution rectangular preview of
 * the uploaded photo (not the circular crop). Radix Dialog handles
 * focus trap, Escape, outside-click close, and body scroll lock.
 */
export function ProfilePhotoPreview({ priority = false }: { priority?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.01 : 0.22;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`View professional photo of ${site.name}`}
          className="group relative z-[1] shrink-0 translate-y-[calc((100%-var(--header-height))/2+1px)] rounded-full focus-visible:ring-2 focus-visible:ring-[var(--color-accent-royal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--header-surface)] focus-visible:outline-none"
        >
          <ProfilePhoto variant="header" decorative priority={priority} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                className="z-overlay fixed inset-0 bg-neutral-950/72 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Close
              aria-label="Close photo preview"
              className="z-overlay text-neutral-0 focus-visible:ring-neutral-0/80 fixed top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950/55 transition-colors duration-[var(--motion-micro)] hover:bg-neutral-950/75 focus-visible:ring-2 focus-visible:outline-none sm:top-6 sm:right-6"
            >
              <Icon icon={X} size="sm" />
            </Dialog.Close>

            <Dialog.Content forceMount asChild onOpenAutoFocus={(event) => event.preventDefault()}>
              <m.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                className="z-overlay fixed top-1/2 left-1/2 max-h-[min(90vh,52rem)] w-[min(100vw-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 outline-none sm:w-[min(100vw-4rem,32rem)]"
              >
                <VisuallyHidden.Root asChild>
                  <Dialog.Title>Professional photo — {site.name}</Dialog.Title>
                </VisuallyHidden.Root>
                <VisuallyHidden.Root asChild>
                  <Dialog.Description>
                    Full uploaded portrait. Press Escape or click outside to close.
                  </Dialog.Description>
                </VisuallyHidden.Root>

                {/* Natural rectangular photo — no circular crop */}
                <div className="border-neutral-0/20 overflow-hidden rounded-[var(--radius-xl)] border bg-neutral-950/40 shadow-[var(--shadow-modal)]">
                  <Image
                    src={PROFILE_PHOTO_SRC}
                    alt={`Professional portrait of ${site.name}`}
                    width={1200}
                    height={1500}
                    sizes="(max-width: 640px) 90vw, 512px"
                    className="mx-auto h-auto max-h-[min(82vh,48rem)] w-full object-contain"
                    quality={95}
                    priority
                  />
                </div>
                <p className="text-neutral-0 mt-4 text-center font-mono text-sm font-medium tracking-[-0.01em]">
                  {site.name}
                </p>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
