export interface Business {
    $id: string;
    businessId: string;
    sellerId: string;
    title: string;
    description: string;
    industry: string;
    businessModel: string;
    stage: string;
    location: string;
    askingPrice: number;
    revenue?: number;
    employees?: number;
    founded?: number;
    assets?: string[];
    features?: string[];
    images?: string[];
    documents?: string[];
    isActive: boolean;
    isVerified: boolean;
    isFeatured: boolean;
    views: number;
    favorites?: string[];
    tags?: string[];
    $createdAt: string;
    $updatedAt: string;
}

export interface CreateBusinessData {
    title: string;
    description: string;
    industry: string;
    businessModel: string;
    stage: string;
    location: string;
    askingPrice: number;
    revenue?: number;
    employees?: number;
    founded?: number;
    assets?: string[];
    features?: string[];
    tags?: string[];
}

export interface BusinessSearchFilters {
    industry?: string;
    businessModel?: string;
    stage?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minRevenue?: number;
    maxRevenue?: number;
    tags?: string[];
    isVerified?: boolean;
    isFeatured?: boolean;
}

export const INDUSTRIES = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Manufacturing',
    'Real Estate',
    'Food & Beverage',
    'Education',
    'Transportation',
    'Energy',
    'Entertainment',
    'Agriculture',
    'Construction',
    'Consulting',
    'Other'
] as const;

export const BUSINESS_MODELS = [
    'SaaS',
    'E-commerce',
    'Marketplace',
    'Service',
    'Product',
    'Subscription',
    'Franchise',
    'Manufacturing',
    'Consulting',
    'Other'
] as const;

export const BUSINESS_STAGES = [
    'Startup',
    'Growth',
    'Mature',
    'Declining'
] as const;

export type Industry = typeof INDUSTRIES[number];
export type BusinessModel = typeof BUSINESS_MODELS[number];
export type BusinessStage = typeof BUSINESS_STAGES[number];
