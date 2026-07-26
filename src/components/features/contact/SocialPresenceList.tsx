import type { SocialPresenceLink } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";

/** Social presence — verified links only. */
export function SocialPresenceList({
  verified,
  planned = [],
}: {
  verified: SocialPresenceLink[];
  planned?: SocialPresenceLink[];
}) {
  void planned; // planned surfaces are not shown publicly

  if (verified.length === 0) return null;

  return (
    <ul className="space-y-4">
      {verified.map((link) => (
        <li
          key={link.id}
          className="surface flex flex-wrap items-center justify-between gap-3 px-5 py-4"
        >
          <div className="flex items-center gap-2">
            <p className="font-medium text-neutral-800">{link.label}</p>
            <Badge tone="accent">Verified</Badge>
          </div>
          {link.href ? (
            <ExternalLink href={link.href} className="text-sm font-medium">
              Open {link.label}
            </ExternalLink>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
