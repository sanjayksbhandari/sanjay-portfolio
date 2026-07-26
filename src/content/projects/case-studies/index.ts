import type { CaseStudy } from "@/types/content";
import { enterpriseArtworkManagementPlatform } from "./enterprise-artwork-management-platform";
import { oauth2AuthenticationPlatform } from "./oauth2-authentication-platform";
import { enterpriseExchangePlatform } from "./enterprise-exchange-platform";
import { becknProtocolVerificationAdapter } from "./beckn-protocol-verification-adapter";
import { financialTransactionPlatform } from "./financial-transaction-platform";

// Order here drives display order on /case-studies — richest verified
// detail first (docs/20 Phase 2 sequencing rationale).
export const caseStudies: CaseStudy[] = [
  enterpriseExchangePlatform,
  becknProtocolVerificationAdapter,
  oauth2AuthenticationPlatform,
  enterpriseArtworkManagementPlatform,
  financialTransactionPlatform,
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
