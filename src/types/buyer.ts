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
  
  // Additional info
  company?: string;
  title?: string;
  linkedIn?: string;
  website?: string;
  yearsOfExperience?: number;
  totalDeals?: number;
  
  // Matching status
  isMatched?: boolean;
  matchStatus?: 'pending' | 'accepted' | 'rejected';
  lastActive?: Date;
  verifiedStatus?: boolean;
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
