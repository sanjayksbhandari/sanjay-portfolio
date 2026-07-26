import Image from "next/image";
import type { ContentBlock } from "@/types/content-blocks";
import { QuoteBlock } from "./QuoteBlock";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { ArchitectureCallout } from "./ArchitectureCallout";
import { ComparisonTable } from "./ComparisonTable";
import { TodoNote } from "@/components/ui/TodoNote";

/**
 * Experience Framework — Generic Content Renderer
 * (docs/phase-8-experience-framework/02-content-renderer.md). Accepts
 * an ordered `ContentBlock[]` from the Content Engine and renders each
 * block through the matching framework primitive — one switch, one
 * place that knows how a `ContentBlock` becomes UI, so no page ever
 * hand-rolls "if it has a `code` field render a `<pre>`" itself.
 *
 * Every block type maps to a component that already exists elsewhere in
 * this framework (`QuoteBlock`, `CodeBlock`, `Callout`,
 * `ArchitectureCallout`, `ComparisonTable`, `TodoNote`) — this file adds
 * no new visual treatment of its own, only the dispatch.
 *
 * Lists and tables render natively rather than deferring to a
 * virtualization/lazy-render library: verified portfolio content is
 * measured in dozens of blocks per page, not thousands, so
 * virtualization would add a dependency and a loading-state to solve a
 * problem this project doesn't have. If a future page's block count
 * grows large enough to matter, see
 * `docs/phase-8-experience-framework/06-future-extension-points.md`.
 */
export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <ContentBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-base leading-relaxed text-neutral-600">{block.text}</p>;

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={block.ordered ? "list-decimal space-y-2 pl-5" : "space-y-2"}>
          {block.items.map((item, i) => (
            <li
              key={i}
              className={
                block.ordered
                  ? "text-base leading-relaxed text-neutral-600"
                  : "flex gap-2 text-base leading-relaxed text-neutral-600"
              }
            >
              {block.ordered ? null : (
                <span
                  className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full"
                  aria-hidden="true"
                />
              )}
              {item}
            </li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return <QuoteBlock quote={block.text} attribution={block.attribution} />;

    case "code":
      return <CodeBlock code={block.code} language={block.language} filename={block.filename} />;

    case "callout":
      return (
        <Callout tone={block.tone} title={block.title}>
          {block.text}
        </Callout>
      );

    case "table":
      return <ComparisonTable headers={block.headers} rows={block.rows} />;

    case "image":
      return (
        <figure>
          <Image
            src={block.src}
            alt={block.alt}
            width={1200}
            height={675}
            className="surface w-full"
          />
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-neutral-600">{block.caption}</figcaption>
          ) : null}
        </figure>
      );

    case "architectureNote":
      return <ArchitectureCallout title={block.title}>{block.text}</ArchitectureCallout>;

    case "todo":
      return <TodoNote items={[{ label: block.label }]} />;

    default:
      return null;
  }
}
