/**
 * Internal link validation — Phase 17 launch readiness.
 * Walks known App Router paths + Content Engine slugs and fails if any
 * expected public path is missing from the filesystem route map.
 *
 * Run: npx tsx scripts/check-internal-links.ts
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ctaNav, footerNav, primaryNav, site } from "../src/config/site";
import { getAllCaseStudies, getAllPersonalProjects } from "../src/content-engine";

const ROOT = process.cwd();

const staticPaths = [
  "/",
  "/showcase",
  "/journey",
  "/expertise",
  "/case-studies",
  "/leadership",
  "/architecture",
  "/ai-engineering",
  "/achievements",
  "/certifications",
  "/resume",
  "/contact",
];

function routeFileExists(path: string): boolean {
  if (path === "/") {
    return existsSync(join(ROOT, "src/app/page.tsx"));
  }
  const segments = path.replace(/^\//, "").split("/");
  // Dynamic: /case-studies/[slug] covered by parent + generateStaticParams
  if (segments[0] === "case-studies" && segments.length === 2) {
    return existsSync(join(ROOT, "src/app/case-studies/[slug]/page.tsx"));
  }
  if (segments[0] === "ai-engineering" && segments.length === 2) {
    return existsSync(join(ROOT, "src/app/ai-engineering/[slug]/page.tsx"));
  }
  const pagePath = join(ROOT, "src/app", ...segments, "page.tsx");
  return existsSync(pagePath);
}

const failures: string[] = [];
const checked = new Set<string>();

function check(path: string, source: string) {
  if (!path.startsWith("/")) return; // external
  if (path.startsWith("http")) return;
  const clean = path.split("#")[0].split("?")[0] || "/";
  if (checked.has(clean)) return;
  checked.add(clean);
  if (!routeFileExists(clean)) {
    failures.push(`${clean} (from ${source})`);
  }
}

for (const path of staticPaths) check(path, "static inventory");

for (const item of primaryNav) check(item.href, "primaryNav");
for (const item of ctaNav) check(item.href, "ctaNav");
for (const item of footerNav.explore) check(item.href, "footer.explore");
for (const item of footerNav.credentials) check(item.href, "footer.credentials");
for (const item of footerNav.contact) {
  if (item.href.startsWith("http")) continue;
  check(item.href, "footer.contact");
}

for (const cs of getAllCaseStudies()) {
  check(`/case-studies/${cs.slug}`, `case-study:${cs.slug}`);
}
for (const project of getAllPersonalProjects()) {
  check(`/ai-engineering/${project.slug}`, `ai:${project.slug}`);
}

if (!site.url.startsWith("https://")) {
  failures.push(`site.url must be https (got ${site.url})`);
}

if (failures.length) {
  console.error("Internal link check FAILED:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`Internal link check passed (${checked.size} paths).`);
console.log(`Canonical host: ${site.url}`);
