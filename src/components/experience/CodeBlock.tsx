/**
 * Experience Framework — Code Example Block. Plain, static code
 * display — no syntax highlighting (no client-side highlighter library;
 * matches Phase 1's "no unnecessary JavaScript" and "code snippet
 * style: minimal, monospace" rules). `language`/`filename` are labels
 * only, rendered in the header row, not used to select a highlighter.
 */
export function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  return (
    <div className="surface overflow-hidden">
      {filename || language ? (
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2">
          {filename ? (
            <span className="font-mono text-xs text-neutral-600">{filename}</span>
          ) : (
            <span />
          )}
          {language ? <span className="type-label-muted">{language}</span> : null}
        </div>
      ) : null}
      <pre className="overflow-x-auto bg-neutral-50 p-4">
        <code className="font-mono text-sm leading-relaxed text-neutral-800">{code}</code>
      </pre>
    </div>
  );
}
