import { Client, Account, Databases, Storage, Query, ID } from 'appwrite';

// Appwrite configuration
export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collections: {
        users: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        buyers: import.meta.env.VITE_APPWRITE_BUYERS_COLLECTION_ID,
        sellers: import.meta.env.VITE_APPWRITE_SELLERS_COLLECTION_ID,
        deals: import.meta.env.VITE_APPWRITE_DEALS_COLLECTION_ID,
        messages: import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID,
        matches: import.meta.env.VITE_APPWRITE_MATCHES_COLLECTION_ID,
    },
    buckets: {
        documents: import.meta.env.VITE_APPWRITE_DOCUMENTS_BUCKET_ID,
        profilePictures: import.meta.env.VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID,
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
            return storage.getFilePreview(bucketId, fileId, width, height);
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
        return this.uploadFile(appwriteConfig.buckets.profilePictures, file, fileId);
    }

    // Upload document (with prefix for organization)
    async uploadDocument(file: File) {
        const fileId = `document_${ID.unique()}`;
        return this.uploadFile(appwriteConfig.buckets.documents, file, fileId);
    }

    // Get profile picture URL
    getProfilePictureUrl(fileId: string, width: number = 200, height: number = 200) {
        return this.getFilePreview(appwriteConfig.buckets.profilePictures, fileId, width, height);
    }

    // Get document URL
    getDocumentUrl(fileId: string) {
        return this.getFileDownload(appwriteConfig.buckets.documents, fileId);
    }
}

// Export service instances
export const authService = new AuthService();
export const databaseService = new DatabaseService();
export const storageService = new StorageService();

// Export Query for convenience
export { Query, ID };
