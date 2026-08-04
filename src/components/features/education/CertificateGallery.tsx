"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import type { CertificateAsset } from "@/types/content";
import { Icon } from "@/components/primitives/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function CertificateThumb({ asset, priority }: { asset: CertificateAsset; priority?: boolean }) {
  if (asset.kind === "pdf") {
    return (
      <div className="bg-accent-50 dark:bg-accent-600/10 flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 px-4 py-5">
        <span className="text-accent-600 dark:bg-accent-600/20 flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--color-accent-50)_70%,white)]">
          <Icon icon={FileText} size="md" />
        </span>
        <span className="text-[0.6875rem] font-medium tracking-[-0.01em] text-neutral-600">
          PDF
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full bg-neutral-100">
      <Image
        src={asset.src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-contain p-2.5"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
      />
    </div>
  );
}

/**
 * Browser PDF UI params — hide the left thumbnail/nav pane and toolbar,
 * and fit the full page so the certificate shows without internal scroll.
 * Supported by Chromium’s PDF viewer (Chrome/Edge); other browsers ignore
 * unknown fragments safely.
 */
function pdfViewerSrc(src: string): string {
  const params = "toolbar=0&navpanes=0&scrollbar=0&pagemode=none&view=Fit&zoom=page-fit";
  const [path] = src.split("#");
  return `${path}#${params}`;
}

function PreviewBody({ asset }: { asset: CertificateAsset }) {
  if (asset.kind === "pdf") {
    return (
      <div
        className={cn(
          "bg-neutral-0 mx-auto overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200/80 shadow-[var(--shadow-modal)]",
          // Landscape certificate stage: sized to viewport so one page fits.
          "h-[min(78vh,46rem)] w-[min(92vw,calc(78vh*1.414),64rem)]"
        )}
      >
        <iframe
          title={asset.title}
          src={pdfViewerSrc(asset.src)}
          className="bg-neutral-0 block h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="border-neutral-0/20 mx-auto overflow-hidden rounded-[var(--radius-xl)] border bg-neutral-950/40 shadow-[var(--shadow-modal)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- preserve natural aspect in lightbox */}
      <img
        src={asset.src}
        alt={asset.title}
        className="mx-auto max-h-[min(78vh,46rem)] w-auto max-w-[min(92vw,64rem)] object-contain"
      />
    </div>
  );
}

/**
 * Dynamic certificate gallery — assets come from `public/certificates/`
 * via the server; this client island only handles preview + navigation.
 *
 * Nav chrome lives *inside* `Dialog.Content` so prev/next clicks are not
 * treated as outside-dismiss. The content shell stays mounted while the
 * active certificate changes (no remount via `key` on Content).
 */
export function CertificateGallery({ assets }: { assets: CertificateAsset[] }) {
  const labelId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.01 : 0.22;

  const active = assets[index] ?? null;

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (assets.length === 0) return;
      setIndex((current) => (current + delta + assets.length) % assets.length);
    },
    [assets.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        go(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        go(1);
      }
    };
    // Capture phase so keys aren't lost to the PDF iframe / dialog focus trap.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, go]);

  if (assets.length === 0) return null;

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {assets.map((asset, i) => (
          <li key={asset.id}>
            <button
              type="button"
              onClick={() => openAt(i)}
              className={cn(
                "surface surface-interactive group flex h-full w-full flex-col overflow-hidden text-left",
                "focus-visible:ring-accent-royal focus-visible:ring-2 focus-visible:outline-none"
              )}
              aria-label={`View certificate: ${asset.title}`}
            >
              <CertificateThumb asset={asset} priority={i < 5} />
              <div className="border-t border-[var(--card-border)] px-3 py-3">
                <p className="line-clamp-2 text-xs leading-snug font-medium text-neutral-800 sm:text-sm">
                  {asset.title}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && active ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                  className="z-overlay fixed inset-0 bg-neutral-950/78 backdrop-blur-md"
                />
              </Dialog.Overlay>

              <Dialog.Content
                forceMount
                asChild
                onOpenAutoFocus={(event) => event.preventDefault()}
                onCloseAutoFocus={(event) => event.preventDefault()}
                aria-labelledby={labelId}
              >
                <m.div
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                  className="z-overlay fixed inset-0 flex items-center justify-center outline-none"
                  onPointerDown={(event) => {
                    // Full-screen content shell: dismiss only when the
                    // dimmed chrome is clicked, not the preview / controls.
                    if (event.target === event.currentTarget) setOpen(false);
                  }}
                >
                  <VisuallyHidden.Root asChild>
                    <Dialog.Title id={labelId}>{active.title}</Dialog.Title>
                  </VisuallyHidden.Root>
                  <VisuallyHidden.Root asChild>
                    <Dialog.Description>
                      Certificate preview. Use arrow keys to navigate. Press Escape to close.
                    </Dialog.Description>
                  </VisuallyHidden.Root>

                  <Dialog.Close
                    aria-label="Close certificate preview"
                    className="text-neutral-0 focus-visible:ring-neutral-0/80 absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950/55 transition-colors duration-[var(--motion-micro)] hover:bg-neutral-950/75 focus-visible:ring-2 focus-visible:outline-none sm:top-5 sm:right-5"
                  >
                    <Icon icon={X} size="sm" />
                  </Dialog.Close>

                  {assets.length > 1 ? (
                    <>
                      <button
                        type="button"
                        aria-label="Previous certificate"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          go(-1);
                        }}
                        className="text-neutral-0 focus-visible:ring-neutral-0/80 absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/55 transition-colors duration-[var(--motion-micro)] hover:bg-neutral-950/75 focus-visible:ring-2 focus-visible:outline-none sm:left-4"
                      >
                        <Icon icon={ChevronLeft} size="md" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next certificate"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          go(1);
                        }}
                        className="text-neutral-0 focus-visible:ring-neutral-0/80 absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/55 transition-colors duration-[var(--motion-micro)] hover:bg-neutral-950/75 focus-visible:ring-2 focus-visible:outline-none sm:right-4"
                      >
                        <Icon icon={ChevronRight} size="md" />
                      </button>
                    </>
                  ) : null}

                  <div className="flex max-h-[100dvh] w-full flex-col items-center justify-center px-12 py-12 sm:px-14">
                    <AnimatePresence mode="wait" initial={false}>
                      <m.div
                        key={active.id}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: duration * 0.85, ease: [0.16, 1, 0.3, 1] }}
                        className="flex w-full flex-col items-center"
                      >
                        <PreviewBody asset={active} />
                      </m.div>
                    </AnimatePresence>
                    <div className="mt-4 flex flex-col items-center gap-2 sm:mt-5">
                      <p className="text-neutral-0 text-center font-mono text-sm font-medium tracking-[-0.01em]">
                        {active.title}
                        {assets.length > 1 ? (
                          <span className="text-neutral-0/70">
                            {" "}
                            · {index + 1} / {assets.length}
                          </span>
                        ) : null}
                      </p>
                      {active.kind === "pdf" ? (
                        <a
                          href={active.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-0/75 hover:text-neutral-0 text-xs underline-offset-2 hover:underline"
                        >
                          Open PDF in a new tab
                        </a>
                      ) : null}
                    </div>
                  </div>
                </m.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
