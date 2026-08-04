import { existsSync, readdirSync } from "node:fs";
import { join, extname, basename } from "node:path";
import type { CertificateAsset } from "@/types/content";

const CERTIFICATES_DIR = join(process.cwd(), "public", "certificates");
const PUBLIC_PREFIX = "/certificates";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const PDF_EXTS = new Set([".pdf"]);

/**
 * Derive a human-readable title from a filename without inventing
 * credential claims — dashes/underscores become spaces; extension stripped.
 */
function titleFromFilename(filename: string): string {
  const stem = basename(filename, extname(filename));
  const titled = stem
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Preserve common acronyms after title-casing (filename-derived only).
  return titled
    .replace(/\bAi\b/g, "AI")
    .replace(/\bAws\b/g, "AWS")
    .replace(/\bChatgpt\b/g, "ChatGPT")
    .replace(/\bGenxai\b/gi, "GenAIx")
    .replace(/\bGpt\b/g, "GPT");
}

function idFromFilename(filename: string): string {
  return basename(filename, extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Dynamically inventory certificate files in `public/certificates/`.
 * Call from Server Components / route handlers only — uses `fs`.
 * Empty directory → empty array (gallery simply omits itself).
 */
export function getCertificateAssets(): CertificateAsset[] {
  if (!existsSync(CERTIFICATES_DIR)) return [];

  const files = readdirSync(CERTIFICATES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith(".") && name !== "README.md");

  const assets: CertificateAsset[] = [];

  for (const filename of files) {
    const ext = extname(filename).toLowerCase();
    let kind: CertificateAsset["kind"] | null = null;
    if (IMAGE_EXTS.has(ext)) kind = "image";
    else if (PDF_EXTS.has(ext)) kind = "pdf";
    if (!kind) continue;

    assets.push({
      id: idFromFilename(filename) || filename,
      filename,
      title: titleFromFilename(filename),
      // Encode spaces / special characters so gallery URLs resolve.
      src: `${PUBLIC_PREFIX}/${encodeURIComponent(filename)}`,
      kind,
    });
  }

  return assets.sort((a, b) => a.title.localeCompare(b.title));
}
