/**
 * Content Engine — validation CLI (docs/phase-7-content-engine/08-
 * validation-strategy.md). Runs `content-engine/validation.ts`'s
 * `validateContent()` over every loaded entity and exits non-zero on
 * any `error`-severity issue, so a broken content reference fails CI
 * the same way a TypeScript or lint error would — `npm run validate`
 * (package.json) already runs lint + typecheck + format:check; this
 * adds the one category of bug none of those three can catch: a
 * *content* mistake (a typo'd slug, a duplicate) that is still
 * perfectly valid TypeScript.
 *
 * Run directly with `npm run validate:content`.
 */
import { validateContent } from "@/content-engine/validation";

function main() {
  const issues = validateContent();

  if (issues.length === 0) {
    console.log("✓ Content Engine validation passed — no issues found.");
    return;
  }

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  if (warnings.length > 0) {
    console.log(`⚠ ${warnings.length} warning(s):`);
    for (const issue of warnings) {
      console.log(`  [${issue.entity}] ${issue.message}`);
    }
  }

  if (errors.length > 0) {
    console.log(`✗ ${errors.length} error(s):`);
    for (const issue of errors) {
      console.log(`  [${issue.entity}] ${issue.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("✓ Content Engine validation passed with warnings only.");
}

main();
