import {
  Brain,
  Sparkles,
  MessageSquare,
  Zap,
  ImageIcon,
  Wrench,
  Cloud,
  Code2,
  type LucideIcon,
} from "lucide-react";
import type { LearningCategory } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/primitives/Icon";

const categoryIcon: Record<string, LucideIcon> = {
  "artificial-intelligence": Brain,
  "generative-ai": Sparkles,
  chatgpt: MessageSquare,
  "ai-productivity": Zap,
  "ai-content-creation": ImageIcon,
  "emerging-ai-tools": Wrench,
  "cloud-aws": Cloud,
  python: Code2,
};

type LearningCard = LearningCategory & { programCount: number };

export function ContinuousLearningGrid({ categories }: { categories: LearningCard[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => {
        const Glyph = categoryIcon[category.id] ?? Sparkles;
        const countLabel =
          category.programCount === 1
            ? "1 learning program"
            : `${category.programCount} learning programs`;

        return (
          <Card key={category.id} elevated className="flex h-full flex-col">
            <span className="bg-accent-50 text-accent-600 dark:bg-accent-600/15 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]">
              <Icon icon={Glyph} size="md" />
            </span>
            <p className="type-h4 mt-5">{category.category}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
              {category.summary}
            </p>
            <p className="type-label-muted mt-5 font-mono">{countLabel}</p>
          </Card>
        );
      })}
    </div>
  );
}
