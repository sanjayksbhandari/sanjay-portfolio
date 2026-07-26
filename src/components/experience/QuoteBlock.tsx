/**
 * Experience Framework — Quote Block. A pull-quote treatment for a
 * short, attributed statement — e.g. a testimonial-shaped fact once
 * verified content exists for one, or a case study's own words on a
 * decision. Semantic `<blockquote>`/`<cite>` throughout.
 */
export function QuoteBlock({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <blockquote className="border-accent-600 border-l-2 py-1 pl-6">
      <p className="text-lg leading-relaxed text-neutral-800 italic">“{quote}”</p>
      {attribution ? (
        <cite className="type-label-muted mt-3 block not-italic">{attribution}</cite>
      ) : null}
    </blockquote>
  );
}
