import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero supporting statement — SEO `<h1>` with supporting visual weight
 * (`.type-support`). Primary Display scale lives on the name in HeroIntro.
 */
export function Display({
  children,
  as: Tag = "h1",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return <Tag className={cn("type-support", className)}>{children}</Tag>;
}
