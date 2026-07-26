/**
 * Experience Framework — Comparison Table. A plain, semantic
 * `<table>` — real `<th>`/`scope` for screen readers, no client-side
 * table library. Used for genuinely tabular content (e.g. a future
 * "technology X vs. technology Y" comparison, or the `table` block in
 * `ContentRenderer`) — not a general-purpose data grid.
 */
export function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="surface overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            {headers.map((header) => (
              <th key={header} scope="col" className="type-label-muted px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? "border-b border-neutral-200" : undefined}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
