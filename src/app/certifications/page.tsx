import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { getAllCertifications } from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Certifications",
  description:
    "Spring Certified Professional (VMware), Generative AI Foundations (upGrad × Microsoft), and Gen AI & Prompt Engineering credentials.",
  path: "/certifications",
});

export default function CertificationsPage() {
  const certifications = getAllCertifications();
  const grouped = certifications.reduce<Record<string, typeof certifications>>((acc, cert) => {
    const key = cert.group ?? "Standalone";
    acc[key] = acc[key] ? [...acc[key], cert] : [cert];
    return acc;
  }, {});

  return (
    <Section containerWidth="content" family="contact" className="pt-16 sm:pt-20">
      <SectionHeading
        level={1}
        kicker="Certifications"
        title="Formal validation, listed with issuer and date."
      />
      <div className="mt-14 space-y-10">
        {Object.entries(grouped).map(([group, certs]) => (
          <div key={group}>
            {group !== "Standalone" ? <p className="type-label-muted">{group}</p> : null}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certs.map((cert) => (
                <Card key={cert.id} className="flex h-full items-center justify-between gap-4">
                  <span className="text-sm font-medium text-neutral-800">{cert.name}</span>
                  <span className="font-mono text-xs whitespace-nowrap text-neutral-600">
                    {cert.issuer} · {cert.date}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
