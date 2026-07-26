import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[-0.01em] transition-[color,background-color,border-color,box-shadow,transform,filter,background-image] duration-[var(--motion-standard)] ease-[var(--ease-spring)] focus-visible:outline-2 disabled:opacity-[var(--opacity-disabled)] disabled:pointer-events-none active:scale-[0.985] motion-reduce:active:scale-100";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost:
    "text-neutral-700 hover:bg-neutral-100/90 hover:text-[var(--color-accent-royal)] dark:hover:text-accent-600",
};

const sizeClass: Record<Size, string> = {
  md: "h-11 px-4 text-caption",
  lg: "h-12 px-6 text-body",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
