import type { ContactMethod } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { CopyEmailButton } from "./CopyEmailButton";
import { site } from "@/config/site";

function ContactMethodRow({ method }: { method: ContactMethod }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-neutral-800">{method.label}</p>
          <Badge tone={method.primary ? "accent" : "neutral"}>
            {method.primary ? "Primary" : "Secondary"}
          </Badge>
        </div>
        {method.description ? (
          <p className="mt-1 text-sm text-neutral-600">{method.description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {method.href && method.kind === "email" && site.email ? (
          <>
            <a href={method.href} className="text-accent-600 text-sm font-medium">
              {site.email}
            </a>
            <CopyEmailButton email={site.email} />
          </>
        ) : null}
        {method.href && method.kind !== "email" ? (
          method.kind === "portfolio" ? (
            <a href={method.href} className="text-accent-600 text-sm font-medium">
              {method.href.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <ExternalLink href={method.href} className="text-sm font-medium">
              Open {method.label}
            </ExternalLink>
          )
        ) : null}
      </div>
    </li>
  );
}

/**
 * Professional Hub — Contact Options list
 * (docs/phase-15-professional-hub/01-architecture.md). Primary channels
 * first; unverified channels show TODO instead of dead links.
 */
export function ContactOptionsList({
  primary,
  secondary,
}: {
  primary: ContactMethod[];
  secondary: ContactMethod[];
}) {
  return (
    <ul className="surface px-6">
      {[...primary, ...secondary]
        .filter((method) => Boolean(method.href))
        .map((method) => (
          <ContactMethodRow key={method.id} method={method} />
        ))}
    </ul>
  );
}
