export interface Deal {
    $id: string;
    dealId: string;
    buyerId: string;
    sellerId: string;
    businessId: string;
    status: 'inquiry' | 'negotiation' | 'due_diligence' | 'closing' | 'completed' | 'cancelled';
    currentStage: string;
    offeredPrice?: number;
    counterPrice?: number;
    terms?: string;
    documents?: string[];
    notes?: string;
    targetCloseDate?: string;
    actualCloseDate?: string;
    $createdAt: string;
    $updatedAt: string;
}

export interface CreateDealData {
    businessId: string;
    sellerId: string;
    offeredPrice?: number;
    terms?: string;
    notes?: string;
    targetCloseDate?: string;
}

export interface DealWithDetails extends Deal {
    business?: {
        title: string;
        industry: string;
        askingPrice: number;
    };
    buyer?: {
        firstName: string;
        lastName: string;
        company?: string;
    };
    seller?: {
        firstName: string;
        lastName: string;
        company?: string;
    };
}

export const DEAL_STATUSES = [
    'inquiry',
    'negotiation',
    'due_diligence',
    'closing',
    'completed',
    'cancelled'
] as const;

export const DEAL_STAGES = [
    'Initial Contact',
    'Preliminary Discussion',
    'NDA Signed',
    'Information Sharing',
    'Due Diligence',
    'Negotiation',
    'Legal Review',
    'Final Agreement',
    'Closing'
] as const;

export type DealStatus = typeof DEAL_STATUSES[number];
export type DealStage = typeof DEAL_STAGES[number];
