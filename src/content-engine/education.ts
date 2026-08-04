import { certifications } from "@/content/certifications";
import { academicCredentials, learningCategories } from "@/content/education";
import { getCertificateAssets } from "@/lib/certificates";
import type {
  AcademicCredential,
  CertificateAsset,
  Certification,
  LearningCategory,
} from "@/types/content";

export function getAcademicCredentials(): AcademicCredential[] {
  return academicCredentials;
}

export function getLearningCategories(): Array<
  LearningCategory & { programCount: number; certifications: Certification[] }
> {
  const byId = new Map(certifications.map((c) => [c.id, c]));
  return learningCategories.map((category) => {
    const matched = category.certificationIds
      .map((id) => byId.get(id))
      .filter((c): c is Certification => Boolean(c));
    return {
      ...category,
      certifications: matched,
      programCount: matched.length,
    };
  });
}

export function getCertificateGallery(): CertificateAsset[] {
  return getCertificateAssets();
}
