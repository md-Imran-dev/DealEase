import { Client, Account, Databases, Storage, Query, ID } from 'appwrite';
import type { Business, CreateBusinessData, BusinessSearchFilters } from '../types/business';
import type { Conversation, Message, CreateMessageData } from '../types/chat';
import type { Deal, CreateDealData } from '../types/deal';
import type { Favorite, Review, Notification, CreateNotificationData, CreateReviewData } from '../types/misc';

// Appwrite configuration
export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL || 'https://cloud.appwrite.io/v1',
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'testing',
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '6898f399001feb7aa687',
    collections: {
        users: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || 'users',
        businesses: import.meta.env.VITE_APPWRITE_BUSINESSES_COLLECTION_ID || 'businesses',
        conversations: import.meta.env.VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID || 'conversations',
        messages: import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID || 'messages',
        deals: import.meta.env.VITE_APPWRITE_DEALS_COLLECTION_ID || 'deals',
        favorites: import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID || 'favorites',
        reviews: import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID || 'reviews',
        notifications: import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID || 'notifications',
        businessAnalytics: import.meta.env.VITE_APPWRITE_BUSINESS_ANALYTICS_COLLECTION_ID || 'business_analytics',
        // Legacy collections for backward compatibility
        buyers: 'buyers',
        sellers: 'sellers',
        matches: 'matches'
    },
    buckets: {
        // Use single "files" bucket for everything with prefixes
        businessImages: import.meta.env.VITE_APPWRITE_BUSINESS_IMAGES_BUCKET_ID || 'files',
        businessDocuments: import.meta.env.VITE_APPWRITE_BUSINESS_DOCUMENTS_BUCKET_ID || 'files',
        profilePictures: import.meta.env.VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID || 'files',
        chatAttachments: import.meta.env.VITE_APPWRITE_CHAT_ATTACHMENTS_BUCKET_ID || 'files',
        // Single bucket reference
        files: 'files'
    }
};

// Initialize Appwrite client
export const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Auth Service
export class AuthService {
    // Create account
    async createAccount(email: string, password: string, name: string) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // Create session after account creation
                const session = await this.login(email, password);
                return session;
            } else {
                throw new Error('Failed to create account');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    // Login
    async login(email: string, password: string) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    // Logout
    async logout() {
        try {
            return await account.deleteSession('current');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    // Update user profile
    async updateProfile(name?: string, email?: string) {
        try {
            const promises = [];
            if (name) promises.push(account.updateName(name));
            if (email) promises.push(account.updateEmail(email, ''));

            const results = await Promise.all(promises);
            return results[0]; // Return the updated user
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    // Update password
    async updatePassword(newPassword: string, oldPassword: string) {
        try {
            return await account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }
}

// Database Service
export class DatabaseService {
    // Generic create document
    async createDocument(collectionId: string, data: Record<string, any>, documentId?: string) {
        try {
            return await databases.createDocument(
                appwriteConfig.databaseId,
                collectionId,
                documentId || ID.unique(),
                data
            );
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    // Generic get document
    async getDocument(collectionId: string, documentId: string) {
        try {
            return await databases.getDocument(
                appwriteConfig.databaseId,
                collectionId,
                documentId
            );
        } catch (error) {
            console.error('Error getting document:', error);
            throw error;
        }
    }

    // Generic update document
    async updateDocument(collectionId: string, documentId: string, data: Record<string, any>) {
        try {
            return await databases.updateDocument(
                appwriteConfig.databaseId,
                collectionId,
                documentId,
                data
            );
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    }

    // Generic delete document
    async deleteDocument(collectionId: string, documentId: string) {
        try {
            return await databases.deleteDocument(
                appwriteConfig.databaseId,
                collectionId,
                documentId
            );
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }

    // Generic list documents
    async listDocuments(collectionId: string, queries?: string[]) {
        try {
            return await databases.listDocuments(
                appwriteConfig.databaseId,
                collectionId,
                queries
            );
        } catch (error) {
            console.error('Error listing documents:', error);
            throw error;
        }
    }

    // User-specific methods
    async createUserProfile(userId: string, data: Record<string, any>) {
        return this.createDocument(appwriteConfig.collections.users, { ...data, userId }, userId);
    }

    async getUserProfile(userId: string) {
        return this.getDocument(appwriteConfig.collections.users, userId);
    }

    async updateUserProfile(userId: string, data: Record<string, any>) {
        return this.updateDocument(appwriteConfig.collections.users, userId, data);
    }

    // Buyer-specific methods
    async createBuyerProfile(data: Record<string, any>) {
        return this.createDocument(appwriteConfig.collections.buyers, data);
    }

    async getBuyerProfile(buyerId: string) {
        return this.getDocument(appwriteConfig.collections.buyers, buyerId);
    }

    async updateBuyerProfile(buyerId: string, data: Record<string, any>) {
        return this.updateDocument(appwriteConfig.collections.buyers, buyerId, data);
    }

    async listBuyers(queries?: string[]) {
        return this.listDocuments(appwriteConfig.collections.buyers, queries);
    }

    // Seller-specific methods
    async createSellerProfile(data: Record<string, any>) {
        return this.createDocument(appwriteConfig.collections.sellers, data);
    }

    async getSellerProfile(sellerId: string) {
        return this.getDocument(appwriteConfig.collections.sellers, sellerId);
    }

    async updateSellerProfile(sellerId: string, data: Record<string, any>) {
        return this.updateDocument(appwriteConfig.collections.sellers, sellerId, data);
    }

    async listSellers(queries?: string[]) {
        return this.listDocuments(appwriteConfig.collections.sellers, queries);
    }

    // Deal-specific methods
    async createDeal(data: Record<string, any>) {
        return this.createDocument(appwriteConfig.collections.deals, data);
    }

    async getDeal(dealId: string) {
        return this.getDocument(appwriteConfig.collections.deals, dealId);
    }

    async updateDeal(dealId: string, data: Record<string, any>) {
        return this.updateDocument(appwriteConfig.collections.deals, dealId, data);
    }

    async listDeals(queries?: string[]) {
        return this.listDocuments(appwriteConfig.collections.deals, queries);
    }

    async getUserDeals(userId: string) {
        return this.listDocuments(appwriteConfig.collections.deals, [
            Query.equal('userId', userId)
        ]);
    }

    // Message-specific methods
    async createMessage(data: Record<string, any>) {
        return this.createDocument(appwriteConfig.collections.messages, data);
    }

    async getConversationMessages(conversationId: string) {
        return this.listDocuments(appwriteConfig.collections.messages, [
            Query.equal('conversationId', conversationId),
            Query.orderDesc('$createdAt')
        ]);
    }

    async getUserMessages(userId: string) {
        return this.listDocuments(appwriteConfig.collections.messages, [
            Query.equal('senderId', userId)
        ]);
    }

    // Match-specific methods
    async createMatch(data: Record<string, any>) {
        return this.createDocument(appwriteConfig.collections.matches, data);
    }

    async getUserMatches(userId: string) {
        return this.listDocuments(appwriteConfig.collections.matches, [
            Query.equal('userId', userId)
        ]);
    }

    async getBuyerMatches(buyerId: string) {
        return this.listDocuments(appwriteConfig.collections.matches, [
            Query.equal('buyerId', buyerId)
        ]);
    }

    async getSellerMatches(sellerId: string) {
        return this.listDocuments(appwriteConfig.collections.matches, [
            Query.equal('sellerId', sellerId)
        ]);
    }
}

// Storage Service
export class StorageService {
    // Upload file
    async uploadFile(bucketId: string, file: File, fileId?: string) {
        try {
            return await storage.createFile(
                bucketId,
                fileId || ID.unique(),
                file
            );
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    // Get file preview
    getFilePreview(bucketId: string, fileId: string, width?: number, height?: number) {
        try {
            const url = storage.getFilePreview(bucketId, fileId, width, height);
            console.log('🔗 Generated preview URL:', url.toString());
            console.log('📋 Project ID:', appwriteConfig.projectId);
            console.log('🗂️ Bucket ID:', bucketId);
            console.log('📁 File ID:', fileId);
            return url;
        } catch (error) {
            console.error('Error getting file preview:', error);
            throw error;
        }
    }

    // Get file download
    getFileDownload(bucketId: string, fileId: string) {
        try {
            return storage.getFileDownload(bucketId, fileId);
        } catch (error) {
            console.error('Error getting file download:', error);
            throw error;
        }
    }

    // Delete file
    async deleteFile(bucketId: string, fileId: string) {
        try {
            return await storage.deleteFile(bucketId, fileId);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    // Upload profile picture (with prefix for organization)
    async uploadProfilePicture(file: File) {
        const fileId = `profile_${ID.unique()}`;
        return this.uploadFile(appwriteConfig.buckets.files, file, fileId);
    }

    // Upload business image (with prefix for organization)
    async uploadBusinessImage(file: File) {
        const fileId = `business_image_${ID.unique()}`;
        return this.uploadFile(appwriteConfig.buckets.files, file, fileId);
    }

    // Upload business document (with prefix for organization)
    async uploadBusinessDocument(file: File) {
        const fileId = `business_doc_${ID.unique()}`;
        return this.uploadFile(appwriteConfig.buckets.files, file, fileId);
    }

    // Upload chat attachment (with prefix for organization)
    async uploadChatAttachment(file: File) {
        const fileId = `chat_${ID.unique()}`;
        return this.uploadFile(appwriteConfig.buckets.files, file, fileId);
    }

    // Upload document (with prefix for organization)
    async uploadDocument(file: File) {
        const fileId = `document_${ID.unique()}`;
        return this.uploadFile(appwriteConfig.buckets.files, file, fileId);
    }

    // Get profile picture URL (using direct download since preview transformations require paid plan)
    getProfilePictureUrl(fileId: string, width: number = 200, height: number = 200) {
        // Use direct file download instead of preview for free plan compatibility
        return this.getFileDownload(appwriteConfig.buckets.files, fileId);
    }

    // Get business image URL (using direct download since preview transformations require paid plan)
    getBusinessImageUrl(fileId: string, width: number = 400, height: number = 300) {
        // Use direct file download instead of preview for free plan compatibility
        return this.getFileDownload(appwriteConfig.buckets.files, fileId);
    }

    // Get document URL
    getDocumentUrl(fileId: string) {
        return this.getFileDownload(appwriteConfig.buckets.files, fileId);
    }
}

// Business Service
export class BusinessService {
    // Create a new business listing
    async createBusiness(sellerId: string, data: CreateBusinessData): Promise<Business> {
        try {
            console.log('🏗️ Creating business for seller:', sellerId);
            console.log('📝 Business data:', data);

            const businessData = {
                businessId: ID.unique(),
                sellerId,
                title: data.title || "",
                description: data.description || "",
                industry: data.industry || "",
                businessModel: data.businessModel || "",
                stage: data.stage || "",
                location: data.location || "",
                askingPrice: data.askingPrice || 0,
                revenue: data.revenue || 0,
                employees: data.employees || 1,
                assets: data.assets || [],
                tags: data.tags || [],
                images: data.images || [],
                documents: data.documents || [],
                isActive: data.isActive ?? true,
                isVerified: false,
                isFeatured: false,
                views: 0,
            };

            console.log('💾 Final business data to save:', businessData);

            const business = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                ID.unique(),
                businessData
            );

            console.log('✅ Business created with ID:', business.$id);
            return business as Business;
        } catch (error) {
            console.error('❌ Error creating business:', error);
            throw error;
        }
    }

    // Get all businesses with optional filters
    async getBusinesses(filters?: BusinessSearchFilters, limit: number = 20, offset: number = 0): Promise<Business[]> {
        try {
            const queries = [Query.equal('isActive', true), Query.limit(limit), Query.offset(offset)];

            if (filters) {
                if (filters.industry) queries.push(Query.equal('industry', filters.industry));
                if (filters.businessModel) queries.push(Query.equal('businessModel', filters.businessModel));
                if (filters.stage) queries.push(Query.equal('stage', filters.stage));
                if (filters.location) queries.push(Query.search('location', filters.location));
                if (filters.minPrice) queries.push(Query.greaterThanEqual('askingPrice', filters.minPrice));
                if (filters.maxPrice) queries.push(Query.lessThanEqual('askingPrice', filters.maxPrice));
                if (filters.isVerified) queries.push(Query.equal('isVerified', filters.isVerified));
                if (filters.isFeatured) queries.push(Query.equal('isFeatured', filters.isFeatured));
                if (filters.tags && filters.tags.length > 0) {
                    queries.push(Query.search('tags', filters.tags.join(' ')));
                }
            }

            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                queries
            );

            return response.documents as Business[];
        } catch (error) {
            console.error('Error fetching businesses:', error);
            throw error;
        }
    }

    // Get business by ID
    async getBusiness(businessId: string): Promise<Business> {
        try {
            const business = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                businessId
            );

            // Increment view count
            await this.incrementBusinessViews(businessId);

            return business as Business;
        } catch (error) {
            console.error('Error fetching business:', error);
            throw error;
        }
    }

    // Get businesses by seller
    async getBusinessesBySeller(sellerId: string): Promise<Business[]> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                [Query.equal('sellerId', sellerId), Query.orderDesc('$createdAt')]
            );

            return response.documents as Business[];
        } catch (error) {
            console.error('Error fetching seller businesses:', error);
            throw error;
        }
    }

    // Get all active businesses (for marketplace)
    async getAllBusinesses(): Promise<Business[]> {
        try {
            console.log('🌍 Getting all active businesses for marketplace...');
            const businesses = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                [
                    Query.equal('isActive', true),
                    Query.orderDesc('$createdAt'),
                    Query.limit(100) // Limit for performance
                ]
            );
            console.log('🏪 Found active businesses:', businesses.documents.length);
            return businesses.documents as Business[];
        } catch (error) {
            console.error('❌ Error getting all businesses:', error);
            throw error;
        }
    }

    // Update business
    async updateBusiness(businessId: string, updates: Partial<CreateBusinessData>): Promise<Business> {
        try {
            const business = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                businessId,
                updates
            );

            return business as Business;
        } catch (error) {
            console.error('Error updating business:', error);
            throw error;
        }
    }

    // Delete business
    async deleteBusiness(businessId: string): Promise<void> {
        try {
            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                businessId
            );
        } catch (error) {
            console.error('Error deleting business:', error);
            throw error;
        }
    }

    // Increment business view count
    private async incrementBusinessViews(businessId: string): Promise<void> {
        try {
            const business = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                businessId
            );

            await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                businessId,
                { views: (business.views || 0) + 1 }
            );
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    }

    // Search businesses
    async searchBusinesses(searchTerm: string, limit: number = 20): Promise<Business[]> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.businesses,
                [
                    Query.equal('isActive', true),
                    Query.search('title', searchTerm),
                    Query.limit(limit)
                ]
            );

            return response.documents as Business[];
        } catch (error) {
            console.error('Error searching businesses:', error);
            throw error;
        }
    }
}

// Chat Service
export class ChatService {
    // Create or get conversation
    async createConversation(buyerId: string, sellerId: string, businessId: string): Promise<Conversation> {
        try {
            // Check if conversation already exists
            const existing = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.conversations,
                [
                    Query.equal('buyerId', buyerId),
                    Query.equal('sellerId', sellerId),
                    Query.equal('businessId', businessId)
                ]
            );

            if (existing.documents.length > 0) {
                return existing.documents[0] as Conversation;
            }

            // Create new conversation (remove conversationId since it's not in collection)
            const conversationData = {
                buyerId,
                sellerId,
                businessId,
                status: 'active',
                unreadCount: 0,
                sellerUnreadCount: 0,
            };

            const conversation = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.conversations,
                ID.unique(),
                conversationData
            );

            return conversation as Conversation;
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw error;
        }
    }

    // Get user conversations
    async getUserConversations(userId: string): Promise<Conversation[]> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.conversations,
                [
                    Query.or([
                        Query.equal('buyerId', userId),
                        Query.equal('sellerId', userId)
                    ]),
                    Query.orderDesc('lastMessageAt'),
                    Query.equal('status', 'active')
                ]
            );

            return response.documents as Conversation[];
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }

    // Send message
    async sendMessage(data: CreateMessageData): Promise<Message> {
        try {
            const messageData = {
                messageId: ID.unique(),
                senderId: '', // Will be set by the calling function
                ...data,
                isRead: false,
            };

            const message = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.messages,
                ID.unique(),
                messageData
            );

            // Update conversation with last message
            await this.updateConversationLastMessage(data.conversationId, data.content);

            return message as Message;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    // Get conversation messages
    async getMessages(conversationId: string, limit: number = 50): Promise<Message[]> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.messages,
                [
                    Query.equal('conversationId', conversationId),
                    Query.orderDesc('$createdAt'),
                    Query.limit(limit)
                ]
            );

            return response.documents.reverse() as Message[]; // Reverse to show oldest first
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    // Mark messages as read
    async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
        try {
            const unreadMessages = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.messages,
                [
                    Query.equal('conversationId', conversationId),
                    Query.notEqual('senderId', userId),
                    Query.equal('isRead', false)
                ]
            );

            // Update each unread message
            for (const message of unreadMessages.documents) {
                await databases.updateDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.collections.messages,
                    message.$id,
                    { isRead: true }
                );
            }

            // Reset unread count in conversation
            await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.conversations,
                conversationId,
                { unreadCount: 0, sellerUnreadCount: 0 }
            );
        } catch (error) {
            console.error('Error marking messages as read:', error);
            throw error;
        }
    }

    // Update conversation last message
    private async updateConversationLastMessage(conversationId: string, lastMessage: string): Promise<void> {
        try {
            await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.conversations,
                conversationId,
                {
                    lastMessage: lastMessage.substring(0, 100), // Truncate for preview
                    lastMessageAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error('Error updating conversation:', error);
        }
    }
}

// Deal Service
export class DealService {
    // Create deal
    async createDeal(buyerId: string, data: CreateDealData): Promise<Deal> {
        try {
            console.log('📝 Creating deal with data:', { buyerId, ...data });

            // Only include fields that exist in the Appwrite collection
            const dealData = {
                dealId: ID.unique(),
                buyerId,
                sellerId: data.sellerId,
                businessId: data.businessId,
                status: 'inquiry', // Use the original status
                currentStage: 'Initial Contact',
                // Use offeredPrice instead of offerAmount (based on original schema)
                ...(data.offerAmount && { offeredPrice: data.offerAmount }),
                ...(data.offeredPrice && { offeredPrice: data.offeredPrice }),
                ...(data.notes && { notes: data.notes }),
                ...(data.terms && { terms: data.terms }),
            };

            console.log('💾 Final deal data to save:', dealData);

            const deal = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.deals,
                ID.unique(),
                dealData
            );

            console.log('✅ Deal created successfully:', deal);
            return deal as Deal;
        } catch (error) {
            console.error('❌ Error creating deal:', error);
            console.error('Deal data that failed:', { buyerId, ...data });
            throw error;
        }
    }

    // Get user deals
    async getUserDeals(userId: string): Promise<Deal[]> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.deals,
                [
                    Query.or([
                        Query.equal('buyerId', userId),
                        Query.equal('sellerId', userId)
                    ]),
                    Query.orderDesc('$createdAt')
                ]
            );

            return response.documents as Deal[];
        } catch (error) {
            console.error('Error fetching deals:', error);
            throw error;
        }
    }

    // Get deals for seller (only deals on their businesses)
    async getSellerDeals(sellerId: string): Promise<Deal[]> {
        try {
            console.log('🔍 Getting deals for seller:', sellerId);
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.deals,
                [
                    Query.equal('sellerId', sellerId),
                    Query.orderDesc('$createdAt')
                ]
            );

            console.log('📋 Found seller deals:', response.documents.length);
            console.log('📋 Seller deals data:', response.documents);
            return response.documents as Deal[];
        } catch (error) {
            console.error('Error fetching seller deals:', error);
            throw error;
        }
    }

    // Get deals for buyer (only deals they made)
    async getBuyerDeals(buyerId: string): Promise<Deal[]> {
        try {
            console.log('🔍 Getting deals for buyer:', buyerId);
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.deals,
                [
                    Query.equal('buyerId', buyerId),
                    Query.orderDesc('$createdAt')
                ]
            );

            console.log('📋 Found buyer deals:', response.documents.length);
            console.log('📋 Buyer deals data:', response.documents);
            return response.documents as Deal[];
        } catch (error) {
            console.error('Error fetching buyer deals:', error);
            throw error;
        }
    }

    // Update deal
    async updateDeal(dealId: string, updates: Partial<Deal>): Promise<Deal> {
        try {
            const deal = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.deals,
                dealId,
                updates
            );

            return deal as Deal;
        } catch (error) {
            console.error('Error updating deal:', error);
            throw error;
        }
    }
}

// Favorites Service
export class FavoritesService {
    // Add to favorites
    async addFavorite(userId: string, businessId: string): Promise<Favorite> {
        try {
            const favoriteData = {
                favoriteId: ID.unique(),
                userId,
                businessId,
            };

            const favorite = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.favorites,
                ID.unique(),
                favoriteData
            );

            return favorite as Favorite;
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    }

    // Remove from favorites
    async removeFavorite(userId: string, businessId: string): Promise<void> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.favorites,
                [
                    Query.equal('userId', userId),
                    Query.equal('businessId', businessId)
                ]
            );

            if (response.documents.length > 0) {
                await databases.deleteDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.collections.favorites,
                    response.documents[0].$id
                );
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw error;
        }
    }

    // Get user favorites
    async getUserFavorites(userId: string): Promise<Favorite[]> {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.favorites,
                [
                    Query.equal('userId', userId),
                    Query.orderDesc('$createdAt')
                ]
            );

            return response.documents as Favorite[];
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }
}

// Export service instances
export const authService = new AuthService();
export const databaseService = new DatabaseService();
export const storageService = new StorageService();
export const businessService = new BusinessService();
export const chatService = new ChatService();
export const dealService = new DealService();
export const favoritesService = new FavoritesService();

// Export Query for convenience
export { Query, ID };
