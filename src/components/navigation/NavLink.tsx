import Link from "next/link";

export function NavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-caption dark:hover:text-accent-600 font-medium tracking-[-0.01em] text-[var(--color-text-support)] transition-colors duration-[var(--motion-micro)] hover:text-[var(--color-accent-royal)] ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
