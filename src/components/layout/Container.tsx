import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "prose" | "content" | "wide" | "full";

// Widths reference the CSS custom properties in globals.css, not raw
// pixel values, so this stays the single implementation of the token
// (docs/phase-1-design-system/03 §9) rather than a second copy of it.
const widthClass: Record<ContainerWidth, string> = {
  prose: "container-prose",
  content: "container-content",
  wide: "container-wide",
  full: "container-full",
};

export function Container({
  width = "content",
  className,
  children,
}: {
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widthClass[width], className)}>
      {children}
    </div>
  );
}
