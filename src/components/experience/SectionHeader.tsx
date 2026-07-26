import { CopyLinkButton } from "./CopyLinkButton";
import { cn } from "@/lib/utils";

const typeByLevel: Record<2 | 3, string> = {
  2: "type-h3",
  3: "type-h4",
};

/**
 * Experience Framework — Section Header for anchored, deep-linkable sections.
 */
export function SectionHeader({
  sectionId,
  title,
  level = 2,
  showCopyLink = true,
  className,
}: {
  sectionId: string;
  title: string;
  level?: 2 | 3;
  showCopyLink?: boolean;
  className?: string;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Tag className={typeByLevel[level]}>{title}</Tag>
      {showCopyLink ? <CopyLinkButton sectionId={sectionId} /> : null}
    </div>
  );
}
