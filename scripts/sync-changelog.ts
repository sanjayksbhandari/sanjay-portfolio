/**
 * Keep public/CHANGELOG.md in sync with the root CHANGELOG.md.
 * Run after editing the root file: npm run sync:changelog
 */
import { copyFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "CHANGELOG.md");
const pub = join(process.cwd(), "public", "CHANGELOG.md");
copyFileSync(root, pub);
console.log("Synced CHANGELOG.md → public/CHANGELOG.md");
