"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/feedback/useToast";
import { trackCopyEmail } from "@/lib/analytics";

/**
 * Professional Hub — Copy Email button
 * (docs/phase-15-professional-hub/01-architecture.md). Only rendered
 * when a verified public email exists; never invents an address.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackCopyEmail();
      toast({ title: "Email copied", tone: "success" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Couldn't copy the email",
        description: "Select and copy it from the page instead.",
        tone: "danger",
      });
    }
  }

  return (
    <Button type="button" variant="secondary" size="md" onClick={handleCopy}>
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
}
