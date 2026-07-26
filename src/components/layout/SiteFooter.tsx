import Link from "next/link";
import { footerNav, site } from "@/config/site";
import { Container } from "./Container";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="type-label-muted">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-accent-600 text-sm text-neutral-600 transition-colors duration-[var(--motion-micro)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Social Links Placeholder (docs/phase-3-application-shell/01-application-
// shell.md "Footer"). LinkedIn is confirmed; GitHub renders only once
// `site.social.github` is filled in (see docs/17 data checklist TODO) —
// never a dead/empty link.
function SocialLinks() {
  const links = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "GitHub", href: site.social.github },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <ul className="flex items-center gap-4">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-600 text-sm text-neutral-600 transition-colors duration-[var(--motion-micro)]"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="card-family-contact border-t border-neutral-200/80">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <FooterColumn title="Explore" links={footerNav.explore} />
          <FooterColumn title="Credentials" links={footerNav.credentials} />
          <FooterColumn title="Contact" links={footerNav.contact} />
        </div>

        {/*
          Social Links Placeholder + Future Blog Placeholder — a single
          utility row, not a fourth nav column, since these aren't page
          navigation (docs/phase-3-application-shell/01 "Footer": "no
          unnecessary paragraphs").
        */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-200 pt-6">
          <SocialLinks />
        </div>

        {/*
          neutral-600 throughout below, not neutral-500/neutral-400 — both
          fail AA at this text size (docs/phase-1-design-system/09 fix #1).
        */}
        <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          {/* Version — sourced from package.json via config/site.ts.
              Links to the public changelog (Phase 18 versioning). */}
          <p className="font-mono text-xs text-neutral-600">
            Built with Next.js, TypeScript, and Tailwind CSS ·{" "}
            <a
              href="/CHANGELOG.md"
              className="hover:text-accent-600 underline-offset-2 hover:underline"
            >
              v{site.version}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
