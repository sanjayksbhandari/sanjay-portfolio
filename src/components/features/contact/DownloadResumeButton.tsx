"use client";

import { trackResumeDownload } from "@/lib/analytics";

/**
 * Resume PDF download — uses native download attribute for proper save.
 */
export function DownloadResumeButton({
  href,
  children = "Download Resume (PDF)",
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      download
      onClick={() => trackResumeDownload(href)}
      className="btn-primary text-body inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 font-medium tracking-[-0.01em] transition-[color,background-color,box-shadow,transform,background-image] duration-[var(--motion-standard)] ease-[var(--ease-spring)] active:scale-[0.985] motion-reduce:active:scale-100"
    >
      {children}
    </a>
  );
}
