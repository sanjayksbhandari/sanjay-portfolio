"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

// TODO (docs/11 Technical Architecture — Forms): wire this up to a real
// transactional email provider (e.g. Resend) using site.email as the
// delivery target once that value is confirmed. Currently validates input
// and returns a success state without sending anything, so the UI can be
// built and tested end-to-end ahead of the Content Phase.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field before sending." };
  }

  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return { status: "error", message: "One or more fields exceed the allowed length." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // TODO: replace with a real send (Resend/SMTP) — see note above.
  console.log("[contact-form] New message pending email integration:", { name, email, message });

  return { status: "success", message: "Thanks — your message has been received." };
}
