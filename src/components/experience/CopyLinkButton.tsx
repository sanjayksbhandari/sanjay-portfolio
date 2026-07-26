"use client";

import { Link2 } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { toast } from "@/components/feedback/useToast";
import { cn } from "@/lib/utils";

/**
 * Experience Framework — Copy Link Button
 * (docs/phase-8-experience-framework/00-README.md). Moved here verbatim
 * from `case-studies/CopySectionLinkButton.tsx` (Phase 6) — the case
 * study framework now imports this one instead of keeping its own copy,
 * so every content-rich page (Journey, Leadership, Architecture, future
 * Blog) gets the same deep-link affordance for free.
 *
 * Deliberately not hidden behind opacity-on-hover: a hover-only
 * affordance is invisible on touch devices, and this button's only job
 * *is* discoverability of deep links, so it's dim-but-always-visible
 * instead. Reads the section's URL from the DOM (`window.location`) at
 * click time rather than requiring every call site to thread `site.url`
 * through — correct in any environment without configuration.
 */
export function CopyLinkButton({
  sectionId,
  className,
}: {
  sectionId: string;
  className?: string;
}) {
  async function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Section link copied", tone: "success" });
    } catch {
      toast({
        title: "Couldn't copy the link",
        description: "Copy the URL from the address bar instead.",
        tone: "danger",
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy link to this section"
      className={cn(
        "hover:text-accent-600 rounded text-neutral-400 transition-colors duration-[var(--motion-micro)]",
        className
      )}
    >
      <Icon icon={Link2} size="sm" />
    </button>
  );
}
