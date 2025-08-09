export interface BuyerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  profilePicture?: string;
  
  // Investment Profile
  industries: string[];
  investmentRangeMin: number;
  investmentRangeMax: number;
  
  // Experience & Location
  acquisitionExperience: 'first-time' | 'some-experience' | 'experienced' | 'serial-acquirer';
  preferredLocations: string[];
  remoteBusinessInterest: boolean;
  
  // Personal Background
  bio: string;
  investmentGoals: string[];
  dealStructurePreferences: string[];
  
  // Preferences & Goals
  timelineToClose: string;
  supportNeeded: string[];
  communicationPreferences: string[];
  
  // Additional questionnaire data
  investmentPhilosophy?: string;
  dealSizeSweet?: string;
  operationalInvolvement?: 'hands-off' | 'advisory' | 'operational' | 'full-time';
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
  financingPreference?: string[];
  marketFocus?: string[];
  teamSize?: number;
  
  // Key stats and metrics
  totalCapitalDeployed?: number;
  averageDealSize?: number;
  successfulExits?: number;
  averageHoldPeriod?: number;
  preferredMultiples?: {
    revenue: number;
    ebitda: number;
  };
  
  // Endorsements and badges
  badges?: BuyerBadge[];
  endorsements?: BuyerEndorsement[];
  certifications?: string[];
  awards?: string[];
  
  // Additional info
  company?: string;
  title?: string;
  linkedIn?: string;
  website?: string;
  phone?: string;
  yearsOfExperience?: number;
  totalDeals?: number;
  education?: Education[];
  
  // Privacy and matching
  isMatched?: boolean;
  matchStatus?: 'pending' | 'accepted' | 'rejected';
  lastActive?: Date;
  verifiedStatus?: boolean;
  profileCompleteness?: number;
  responseRate?: number;
  
  // Onboarding and profile completion
  isOnboarded?: boolean;
  onboardingData?: any;
}

export interface BuyerBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedDate: Date;
  category: 'verification' | 'achievement' | 'expertise' | 'reputation';
}

export interface BuyerEndorsement {
  id: string;
  endorserName: string;
  endorserTitle: string;
  endorserCompany: string;
  relationship: string;
  message: string;
  rating: number;
  date: Date;
  verified: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: number;
}

export interface MatchAction {
  buyerId: string;
  action: 'accept' | 'reject';
  timestamp: Date;
}

export interface BuyerFilters {
  industries?: string[];
  investmentRange?: {
    min: number;
    max: number;
  };
  locations?: string[];
  experience?: string[];
  remoteOnly?: boolean;
  verifiedOnly?: boolean;
}
