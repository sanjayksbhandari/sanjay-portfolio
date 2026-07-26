import type { HubFAQItem, TodoItem } from "@/types/content";
import { TodoNote } from "@/components/ui/TodoNote";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";

/**
 * Professional Hub — FAQ
 * (docs/phase-15-professional-hub/01-architecture.md). Only verified
 * Q&A pairs; topics the brief names without a verified answer stay in
 * `todos`, not as invented answers.
 */
export function HubFAQ({ items, todos = [] }: { items: HubFAQItem[]; todos?: TodoItem[] }) {
  return (
    <div>
      <Accordion type="multiple" className="surface px-6">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-neutral-700">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {todos.length > 0 ? <TodoNote className="mt-6" items={todos} /> : null}
    </div>
  );
}
