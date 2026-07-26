"use client";

import { cn } from "@/lib/utils";
import { trackOutboundLink } from "@/lib/analytics";

/**
 * External link with outbound analytics hook
 * (docs/phase-16-production-hardening/07-testing-and-analytics.md).
 * Client boundary is required only for the click handler; styling matches
 * the previous server component.
 */
export function ExternalLink({
  href,
  children,
  className,
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Optional analytics label; defaults to link text when a string child. */
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutboundLink(href, label)}
      className={cn(
        "text-accent-600 decoration-accent-600/30 hover:decoration-accent-600 inline-flex items-center gap-1 underline underline-offset-2 transition-colors duration-[var(--motion-micro)]",
        className
      )}
    >
      {children}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="shrink-0"
      >
        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
