import Link from "next/link";
import { primaryNav, site } from "@/config/site";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";
import { Button } from "@/components/ui/Button";
import { ProfilePhotoPreview } from "@/components/ui/ProfilePhotoPreview";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Container } from "./Container";

/**
 * Sticky premium header — circular profile mark (opens preview) + name
 * on the left; existing primary nav + actions follow with natural
 * spacing. Height is `--header-height` (lighter than the prior 4rem bar).
 * Nav items, routes, and behaviour are unchanged.
 */
export function SiteHeader() {
  return (
    <header className="site-header z-sticky sticky top-0 h-[var(--header-height)] overflow-visible">
      <ScrollProgress />
      <Container
        width="wide"
        className="relative flex h-full items-center justify-between gap-3 sm:gap-5 lg:gap-6"
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-3.5">
          <ProfilePhotoPreview priority />
          <Link
            href="/"
            className="dark:hover:text-accent-600 min-w-0 truncate font-mono text-sm font-medium tracking-[-0.01em] text-neutral-800 transition-colors duration-[var(--motion-micro)] hover:text-[var(--color-accent-royal)]"
          >
            {site.name}
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-7">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href="/resume" variant="secondary" size="md">
            Resume
          </Button>
          <Button href="/contact" variant="primary" size="md">
            Contact
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileNavDrawer />
        </div>
      </Container>
    </header>
  );
}
