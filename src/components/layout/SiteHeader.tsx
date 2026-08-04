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
 * on the left; primary nav + actions on the right.
 *
 * Full primary nav shows from `xl` up so seven items stay on one line;
 * below that the drawer covers navigation.
 */
export function SiteHeader() {
  return (
    <header className="site-header z-sticky sticky top-0 h-[var(--header-height)] overflow-visible">
      <ScrollProgress />
      <Container
        width="wide"
        className="relative flex h-full flex-nowrap items-center justify-between gap-3 xl:gap-6"
      >
        <div className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
          <ProfilePhotoPreview priority />
          <Link
            href="/"
            className="dark:hover:text-accent-600 max-w-[9.5rem] truncate font-mono text-sm font-medium tracking-[-0.01em] text-neutral-800 transition-colors duration-[var(--motion-micro)] hover:text-[var(--color-accent-royal)] sm:max-w-[14rem] xl:max-w-none"
          >
            {site.name}
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-nowrap items-center gap-4 xl:flex xl:gap-5"
        >
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href} className="shrink-0 whitespace-nowrap">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex xl:gap-3">
          <ThemeToggle />
          <Button href="/resume" variant="secondary" size="md">
            Resume
          </Button>
          <Button href="/contact" variant="primary" size="md">
            Contact
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1 xl:hidden">
          <ThemeToggle />
          <MobileNavDrawer />
        </div>
      </Container>
    </header>
  );
}
