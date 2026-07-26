"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** Canonical public path for the professional portrait. */
export const PROFILE_PHOTO_SRC = "/images/profile/profile-photo.jpg";

type ProfilePhotoVariant = "hero" | "header";

/**
 * Reusable professional profile portrait.
 * Loads `/public/images/profile/profile-photo.jpg`. On missing/broken
 * image, shows a clean silhouette so layout never collapses.
 *
 * - `hero` — supporting portrait for the home Hero (rounded rectangle)
 * - `header` — circular sticky-nav identity (~64–72px)
 */
export function ProfilePhoto({
  className,
  priority = false,
  variant = "hero",
  decorative = false,
}: {
  className?: string;
  /** Set true in the Hero / header mark (LCP-adjacent). */
  priority?: boolean;
  variant?: ProfilePhotoVariant;
  /**
   * When the photo sits beside a visible name (e.g. header brand),
   * mark it decorative so screen readers don't hear the name twice.
   */
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const isHeader = variant === "header";
  const alt = decorative ? "" : `Professional portrait of ${site.name}`;

  return (
    <div
      className={cn(
        "relative shrink-0",
        isHeader
          ? "h-[70px] w-[70px] sm:h-[76px] sm:w-[76px] md:h-[80px] md:w-[80px]"
          : // ~15% smaller than the prior hero scale (supporting visual)
            "w-36 sm:w-[9.5rem] md:w-40 lg:w-48",
        className
      )}
    >
      {/* Soft palette glow — behind the frame, not a decorative border. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-accent-600)_22%,transparent),transparent_68%)]",
          isHeader
            ? "-inset-1 rounded-full opacity-55 blur-md transition-opacity duration-[var(--motion-micro)] group-hover:opacity-80 dark:opacity-65"
            : "-inset-3 rounded-[1.75rem] opacity-70 blur-xl dark:opacity-80"
        )}
      />

      <div
        className={cn(
          "relative overflow-hidden bg-neutral-100 dark:bg-neutral-50",
          isHeader
            ? cn(
                "h-full w-full rounded-full border-2",
                "border-[color-mix(in_srgb,var(--color-neutral-200)_55%,var(--color-accent-royal)_45%)]",
                "shadow-[0_1px_2px_rgba(31,30,27,0.06),0_4px_14px_rgba(31,30,27,0.1)]",
                "transition-[box-shadow,border-color] duration-[var(--motion-micro)] ease-[var(--ease-entrance)]",
                "group-hover:border-[color-mix(in_srgb,var(--color-neutral-200)_35%,var(--color-accent-royal)_65%)]",
                "group-hover:shadow-[0_2px_4px_rgba(31,30,27,0.08),0_8px_20px_rgba(31,30,27,0.12)]",
                "dark:border-[color-mix(in_srgb,var(--color-neutral-300)_50%,var(--color-accent-royal)_50%)]",
                "dark:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_4px_16px_rgba(0,0,0,0.45)]",
                "dark:group-hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_10px_22px_rgba(0,0,0,0.5)]"
              )
            : cn(
                "aspect-[4/5] rounded-[var(--radius-xl)]",
                "border border-[color-mix(in_srgb,var(--color-neutral-300)_70%,var(--color-accent-royal)_30%)]",
                "shadow-[var(--shadow-hero)]"
              )
        )}
      >
        {failed ? (
          <ProfileSilhouette label={site.name} decorative={decorative} circular={isHeader} />
        ) : (
          <Image
            src={PROFILE_PHOTO_SRC}
            alt={alt}
            fill
            sizes={
              isHeader
                ? "(max-width: 640px) 70px, (max-width: 768px) 76px, 80px"
                : "(max-width: 640px) 144px, (max-width: 768px) 152px, (max-width: 1024px) 160px, 192px"
            }
            priority={priority}
            quality={isHeader ? 90 : 85}
            className={cn(
              "object-cover",
              isHeader ? "origin-top scale-[1.14] object-top" : "object-[center_12%]"
            )}
            onError={() => setFailed(true)}
            aria-hidden={decorative || undefined}
          />
        )}
      </div>
    </div>
  );
}

function ProfileSilhouette({
  label,
  decorative,
  circular,
}: {
  label: string;
  decorative: boolean;
  circular: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-end bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-neutral-100)_88%,var(--color-accent-600)_12%),var(--color-neutral-100))] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-neutral-50)_90%,var(--color-accent-600)_10%),var(--color-neutral-50))]",
        circular && "rounded-full"
      )}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `Profile photo placeholder for ${label}`}
      aria-hidden={decorative || undefined}
    >
      <svg
        viewBox="0 0 160 200"
        className="h-[88%] w-auto text-neutral-400 dark:text-neutral-500"
        aria-hidden
      >
        <circle cx="80" cy="62" r="34" fill="currentColor" opacity="0.55" />
        <path d="M28 188c4-44 28-68 52-68s48 24 52 68" fill="currentColor" opacity="0.45" />
      </svg>
    </div>
  );
}
