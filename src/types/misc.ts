export interface Favorite {
    $id: string;
    favoriteId: string;
    userId: string;
    businessId: string;
    $createdAt: string;
}

export interface Review {
    $id: string;
    reviewId: string;
    businessId: string;
    buyerId: string;
    rating: number;
    comment?: string;
    isVerified: boolean;
    $createdAt: string;
}

export interface Notification {
    $id: string;
    notificationId: string;
    userId: string;
    type: 'message' | 'deal_update' | 'favorite' | 'review' | 'business_update' | 'system';
    title: string;
    content: string;
    data?: string; // JSON metadata
    isRead: boolean;
    actionUrl?: string;
    $createdAt: string;
}

export interface BusinessAnalytics {
    $id: string;
    analyticsId: string;
    businessId: string;
    date: string;
    views: number;
    inquiries: number;
    favorites: number;
}

export interface CreateNotificationData {
    userId: string;
    type: Notification['type'];
    title: string;
    content: string;
    data?: string;
    actionUrl?: string;
}

export interface CreateReviewData {
    businessId: string;
    rating: number;
    comment?: string;
}
