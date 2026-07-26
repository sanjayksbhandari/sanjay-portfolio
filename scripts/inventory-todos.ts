/**
 * Content TODO inventory — Phase 16 production hardening.
 * Counts honest content gaps (TodoNote / todos arrays / TODO markers in
 * content) without inventing replacements. Run:
 *   npx tsx scripts/inventory-todos.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), "src", "content");

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
  }
  return files;
}

const files = walk(ROOT);
let todosArrayItems = 0;
let todoLiteralLines = 0;
const byFile: { file: string; arrayItems: number; literalTodos: number }[] = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  // Count `label:` entries inside todos arrays (rough but stable for this codebase)
  const arrayMatches = source.match(/todos:\s*\[[\s\S]*?\]/g) ?? [];
  let arrayItems = 0;
  for (const block of arrayMatches) {
    arrayItems += (block.match(/label:/g) ?? []).length;
  }
  const literalTodos = (source.match(/\bTODO\b/g) ?? []).length;
  if (arrayItems > 0 || literalTodos > 0) {
    byFile.push({
      file: relative(process.cwd(), file),
      arrayItems,
      literalTodos,
    });
  }
  todosArrayItems += arrayItems;
  todoLiteralLines += literalTodos;
}

console.log("Content TODO inventory (src/content)");
console.log(`  todos[].label items: ${todosArrayItems}`);
console.log(`  literal TODO tokens: ${todoLiteralLines}`);
console.log(`  files with gaps:     ${byFile.length}`);
console.log("");
for (const row of byFile.sort((a, b) => b.arrayItems - a.arrayItems)) {
  console.log(`  ${row.file}  labels=${row.arrayItems}  TODO=${row.literalTodos}`);
}
