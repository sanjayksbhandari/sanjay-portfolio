"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { trackContactFormSubmit } from "@/lib/analytics";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (state.status === "idle") return;
    const key = `${state.status}:${state.message ?? ""}`;
    if (lastTracked.current === key) return;
    lastTracked.current = key;
    trackContactFormSubmit(state.status === "success" ? "success" : "error");
  }, [state]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-neutral-800">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          className="mt-1.5 h-11 w-full rounded-md border border-neutral-300 px-3.5 text-sm text-neutral-800"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-neutral-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className="mt-1.5 h-11 w-full rounded-md border border-neutral-300 px-3.5 text-sm text-neutral-800"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-neutral-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-800"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-accent-600 hover:bg-accent-700 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium text-white transition-colors duration-[var(--motion-micro)] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <div aria-live="polite" className="text-sm">
        {state.status === "success" ? <p className="text-success">{state.message}</p> : null}
        {state.status === "error" ? <p className="text-danger">{state.message}</p> : null}
      </div>
    </form>
  );
}
