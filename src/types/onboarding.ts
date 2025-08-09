export interface BuyerOnboardingData {
  desiredIndustries: string[];
  investmentRange: { min: number; max: number };
  acquisitionExperience: 'first-time' | 'some' | 'experienced' | 'professional';
  desiredLocation: string;
  timeline: string;
  dealSize: string;
  fundingSource: string[];
  bio: string;
}

export interface SellerOnboardingData {
  businessType: string;
  industry: string;
  valuation: number;
  reasonForSelling: string[];
  timeline: string;
  businessAge: number;
  employees: number;
  grossRevenue: number;
  netProfit: number;
  assetsIncluded: string[];
  sellingPoints: string;
}

export interface OnboardingStep {
  title: string;
  subtitle: string;
  fields: string[];
}

export type OnboardingData = BuyerOnboardingData | SellerOnboardingData;
