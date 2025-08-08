export interface BuyerOnboardingData {
  // Step 1: Investment Profile
  industries: string[];
  investmentRangeMin: number;
  investmentRangeMax: number;
  
  // Step 2: Experience & Preferences
  acquisitionExperience: 'first-time' | 'some-experience' | 'experienced' | 'serial-acquirer';
  preferredLocations: string[];
  remoteBusinessInterest: boolean;
  
  // Step 3: Personal Background
  bio: string;
  investmentGoals: string[];
  dealStructurePreferences: string[];
  
  // Step 4: Additional Preferences
  timelineToClose: string;
  supportNeeded: string[];
  communicationPreferences: string[];
}

export interface SellerOnboardingData {
  // Step 1: Business Information
  businessType: string;
  industry: string;
  yearsInBusiness: number;
  numberOfEmployees: string;
  
  // Step 2: Financial Information
  annualRevenue: string;
  expectedValuation: string;
  profitMargin: string;
  
  // Step 3: Sale Motivation & Timeline
  sellingReason: string[];
  dealReadinessTimeline: 'immediate' | '3-months' | '6-months' | '12-months' | 'exploring';
  minimumPrice: number;
  
  // Step 4: Business Highlights
  businessAttractions: string[];
  uniqueSellingPoints: string;
  growthPotential: string;
  includedAssets: string[];
}

export interface OnboardingStep {
  title: string;
  subtitle: string;
  fields: string[];
}

export type OnboardingData = BuyerOnboardingData | SellerOnboardingData;
