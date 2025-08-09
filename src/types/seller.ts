export interface SellerProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    profilePicture?: string;
    company: string;
    title: string;
    phone?: string;
    linkedIn?: string;
    website?: string;
    location: string;

    // Business Information
    businessName: string;
    industry: string;
    businessType: string;
    businessAge: number;
    employees: number;

    // Financial Information
    grossRevenue: number;
    netProfit: number;
    ebitda?: number;
    valuation: number;
    debtAmount?: number;

    // Business Details
    description: string;
    reasonsForSelling: string[];
    timeline: string;
    assetsIncluded: string[];
    sellingPoints: string;

    // Operational Info
    managementStays?: boolean;
    keyEmployees?: Array<{
        name: string;
        role: string;
        tenure: number;
        staysWithBusiness: boolean;
    }>;

    customerBase?: {
        totalCustomers: number;
        topCustomerConcentration: number;
        averageContractLength?: number;
        churnRate?: number;
        monthlyRecurringRevenue?: number;
    };

    facilities?: Array<{
        type: string;
        location: string;
        owned: boolean;
        size: string;
    }>;

    // Deal Structure Preferences
    preferredDealStructure: string[];
    minimumDownPayment?: number;
    sellerFinancingAvailable: boolean;
    sellerFinancingTerms?: string;

    // Profile metrics
    profileCompleteness: number;
    responseRate: number;
    lastActive: Date;
    verifiedStatus: boolean;

    // Professional details
    yearsInBusiness: number;
    previousExits?: number;

    // Badges and verification
    badges?: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        color: string;
        earnedDate: Date;
        category: 'verification' | 'achievement' | 'expertise';
    }>;

    references?: Array<{
        id: string;
        name: string;
        title: string;
        company: string;
        relationship: string;
        message: string;
        rating: number;
        date: Date;
        verified: boolean;
    }>;

    certifications?: string[];
    awards?: string[];
}
