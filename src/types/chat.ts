export interface Conversation {
    $id: string;
    conversationId: string;
    buyerId: string;
    sellerId: string;
    businessId: string;
    status: 'active' | 'archived' | 'blocked';
    lastMessage?: string;
    lastMessageAt?: string;
    unreadCount: number;
    sellerUnreadCount: number;
    $createdAt: string;
    $updatedAt: string;
}

export interface Message {
    $id: string;
    messageId: string;
    conversationId: string;
    senderId: string;
    content: string;
    messageType: 'text' | 'image' | 'document' | 'offer';
    attachments?: string[];
    isRead: boolean;
    editedAt?: string;
    $createdAt: string;
}

export interface CreateMessageData {
    conversationId: string;
    content: string;
    messageType?: 'text' | 'image' | 'document' | 'offer';
    attachments?: string[];
}

export interface ConversationWithDetails extends Conversation {
    business?: {
        title: string;
        industry: string;
        askingPrice: number;
    };
    buyer?: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
    seller?: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
}
