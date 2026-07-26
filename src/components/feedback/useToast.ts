"use client";

import { useEffect, useState } from "react";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone?: "neutral" | "success" | "danger";
}

type Listener = (toasts: ToastItem[]) => void;

// Module-level store (not React Context) so `toast(...)` can be called
// from anywhere — an event handler, a server action's client-side
// caller, a hook — without needing to be inside a specific provider
// subtree. `Toaster` (mounted once in the root layout) is the only
// subscriber that renders anything; this file only holds state.
let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener(toasts));
}

export function toast(input: Omit<ToastItem, "id">) {
  const id = crypto.randomUUID();
  toasts = [...toasts, { id, ...input }];
  emit();
  return id;
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/** Subscribes a component (only `Toaster` should need this) to the live toast list. */
export function useToastList(): ToastItem[] {
  const [state, setState] = useState<ToastItem[]>(toasts);
  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);
  return state;
}
