import type { ReactNode } from "react";
import { Section, type CardFamily } from "@/components/layout/Section";

/**
 * Experience Framework — Resume layout (also satisfies the brief's
 * "Print Friendly" layout — print-friendliness is treated as a mode any
 * layout can opt into via the `print:` variant and the print rules in
 * `globals.css`, not a separate component, since it's a rendering
 * concern, not a distinct arrangement of content).
 *
 * The `@media print` rules in `globals.css` reset every `.container-*`
 * max-width to `none` and hide the site header/footer/`StickySectionNav`/
 * `BackToTop` globally, so the resume fills the printed page instead of
 * being cropped to `container-content` — see
 * `docs/phase-8-experience-framework/00-README.md` "Print Friendly".
 */
export function ResumeLayout({
  children,
  family = "experience",
}: {
  children: ReactNode;
  family?: CardFamily;
}) {
  return (
    <Section containerWidth="content" family={family} className="pt-16 sm:pt-20 print:pt-0">
      {children}
    </Section>
  );
}
