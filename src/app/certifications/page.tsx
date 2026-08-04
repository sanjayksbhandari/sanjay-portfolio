import { redirect } from "next/navigation";

/** Legacy route — Education & Continuous Learning now lives at `/education`. */
export default function CertificationsRedirectPage() {
  redirect("/education");
}
