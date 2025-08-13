import { useState, useEffect, useCallback } from 'react';
import { authService, databaseService, storageService } from '../lib/Appwrite';
import type { Models } from 'appwrite';

// Auth Hook
export const useAuth = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            setLoading(true);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
            // User not authenticated - this is normal
        } finally {
            setLoading(false);
        }
    };

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            await authService.login(email, password);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return { success: true };
        } catch (error: any) {
            setError(error.message || 'Login failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const signup = useCallback(async (email: string, password: string, name: string) => {
        try {
            setLoading(true);
            setError(null);
            await authService.createAccount(email, password, name);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return { success: true };
        } catch (error: any) {
            setError(error.message || 'Signup failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            return { success: true };
        } catch (error: any) {
            setError(error.message || 'Logout failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = useCallback(async (name?: string, email?: string) => {
        try {
            setLoading(true);
            setError(null);
            const updatedUser = await authService.updateProfile(name, email);
            setUser(updatedUser);
            return { success: true };
        } catch (error: any) {
            setError(error.message || 'Profile update failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
    };
};

// Database Hook
export const useDatabase = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createDocument = useCallback(async (collectionId: string, data: Record<string, any>, documentId?: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await databaseService.createDocument(collectionId, data, documentId);
            return { success: true, data: result };
        } catch (error: any) {
            setError(error.message || 'Failed to create document');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const getDocument = useCallback(async (collectionId: string, documentId: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await databaseService.getDocument(collectionId, documentId);
            return { success: true, data: result };
        } catch (error: any) {
            setError(error.message || 'Failed to get document');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateDocument = useCallback(async (collectionId: string, documentId: string, data: Record<string, any>) => {
        try {
            setLoading(true);
            setError(null);
            const result = await databaseService.updateDocument(collectionId, documentId, data);
            return { success: true, data: result };
        } catch (error: any) {
            setError(error.message || 'Failed to update document');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteDocument = useCallback(async (collectionId: string, documentId: string) => {
        try {
            setLoading(true);
            setError(null);
            await databaseService.deleteDocument(collectionId, documentId);
            return { success: true };
        } catch (error: any) {
            setError(error.message || 'Failed to delete document');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const listDocuments = useCallback(async (collectionId: string, queries?: string[]) => {
        try {
            setLoading(true);
            setError(null);
            const result = await databaseService.listDocuments(collectionId, queries);
            return { success: true, data: result };
        } catch (error: any) {
            setError(error.message || 'Failed to list documents');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        createDocument,
        getDocument,
        updateDocument,
        deleteDocument,
        listDocuments,
    };
};

// Storage Hook
export const useStorage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadFile = useCallback(async (bucketId: string, file: File, fileId?: string) => {
        try {
            setLoading(true);
            setError(null);
            setUploadProgress(0);

            const result = await storageService.uploadFile(bucketId, file, fileId);
            setUploadProgress(100);
            return { success: true, data: result };
        } catch (error: any) {
            setError(error.message || 'Failed to upload file');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteFile = useCallback(async (bucketId: string, fileId: string) => {
        try {
            setLoading(true);
            setError(null);
            await storageService.deleteFile(bucketId, fileId);
            return { success: true };
        } catch (error: any) {
            setError(error.message || 'Failed to delete file');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadProfilePicture = useCallback(async (file: File) => {
        return await uploadFile('profile-pictures', file);
    }, [uploadFile]);

    const uploadDocument = useCallback(async (file: File) => {
        return await uploadFile('documents', file);
    }, [uploadFile]);

    const getFileUrl = useCallback((bucketId: string, fileId: string, width?: number, height?: number) => {
        if (width && height) {
            return storageService.getFilePreview(bucketId, fileId, width, height);
        }
        return storageService.getFileDownload(bucketId, fileId);
    }, []);

    return {
        loading,
        error,
        uploadProgress,
        uploadFile,
        deleteFile,
        uploadProfilePicture,
        uploadDocument,
        getFileUrl,
    };
};

// Specific hooks for your app entities
export const useBuyers = () => {
    const { listDocuments, createDocument, updateDocument, deleteDocument } = useDatabase();

    const getBuyers = useCallback(async (queries?: string[]) => {
        return await listDocuments('buyers', queries);
    }, [listDocuments]);

    const createBuyer = useCallback(async (buyerData: Record<string, any>) => {
        return await createDocument('buyers', buyerData);
    }, [createDocument]);

    const updateBuyer = useCallback(async (buyerId: string, buyerData: Record<string, any>) => {
        return await updateDocument('buyers', buyerId, buyerData);
    }, [updateDocument]);

    const deleteBuyer = useCallback(async (buyerId: string) => {
        return await deleteDocument('buyers', buyerId);
    }, [deleteDocument]);

    return {
        getBuyers,
        createBuyer,
        updateBuyer,
        deleteBuyer,
    };
};

export const useSellers = () => {
    const { listDocuments, createDocument, updateDocument, deleteDocument } = useDatabase();

    const getSellers = useCallback(async (queries?: string[]) => {
        return await listDocuments('sellers', queries);
    }, [listDocuments]);

    const createSeller = useCallback(async (sellerData: Record<string, any>) => {
        return await createDocument('sellers', sellerData);
    }, [createDocument]);

    const updateSeller = useCallback(async (sellerId: string, sellerData: Record<string, any>) => {
        return await updateDocument('sellers', sellerId, sellerData);
    }, [updateDocument]);

    const deleteSeller = useCallback(async (sellerId: string) => {
        return await deleteDocument('sellers', sellerId);
    }, [deleteDocument]);

    return {
        getSellers,
        createSeller,
        updateSeller,
        deleteSeller,
    };
};

export const useDeals = () => {
    const { listDocuments, createDocument, updateDocument, deleteDocument, getDocument } = useDatabase();

    const getDeals = useCallback(async (queries?: string[]) => {
        return await listDocuments('deals', queries);
    }, [listDocuments]);

    const getDeal = useCallback(async (dealId: string) => {
        return await getDocument('deals', dealId);
    }, [getDocument]);

    const createDeal = useCallback(async (dealData: Record<string, any>) => {
        return await createDocument('deals', dealData);
    }, [createDocument]);

    const updateDeal = useCallback(async (dealId: string, dealData: Record<string, any>) => {
        return await updateDocument('deals', dealId, dealData);
    }, [updateDocument]);

    const deleteDeal = useCallback(async (dealId: string) => {
        return await deleteDocument('deals', dealId);
    }, [deleteDocument]);

    return {
        getDeals,
        getDeal,
        createDeal,
        updateDeal,
        deleteDeal,
    };
};
