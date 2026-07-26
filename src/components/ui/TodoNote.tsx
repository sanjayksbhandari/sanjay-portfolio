import type { TodoItem } from "@/types/content";

/** Suppressed for public visitors — gaps stay in content files only. */
export function TodoNote(props: { items: TodoItem[]; className?: string }) {
  void props;
  return null;
}
