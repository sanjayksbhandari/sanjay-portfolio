import { cn } from "@/lib/utils";
import { Kicker } from "./Kicker";

type Level = 1 | 2 | 3;

const typeByLevel: Record<Level, string> = {
  1: "type-h1",
  2: "type-h2",
  3: "type-h3",
};

export function SectionHeading({
  level = 2,
  kicker,
  title,
  intro,
  className,
}: {
  level?: Level;
  kicker?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  const Tag = `h${level}` as unknown as "h1" | "h2" | "h3";
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker ? <Kicker className="mb-3">{kicker}</Kicker> : null}
      <Tag className={typeByLevel[level]}>{title}</Tag>
      {intro ? <p className="type-lead mt-4">{intro}</p> : null}
    </div>
  );
}
