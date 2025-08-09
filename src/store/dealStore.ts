import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
    AcquisitionDeal,
    DealStageData,
    DealDocument,
    DealActivity,
    ChecklistItem,
    StageComment,
    KeyDate,
    DealFilters,
    DealTeamMember,
    DealPermission
} from '../types/acquisition';
import { mockDeals } from '../data/mockDeals';

/**
 * DealStore - Manages acquisition deals and deal workflow tracking
 * 
 * This store handles:
 * - Loading and caching deal data
 * - Creating and updating deals
 * - Managing deal stages and progress
 * - Document uploads and management
 * - Checklist and milestone tracking
 * - Comments and activity logging
 * - Deal team management
 * - Notifications and deadlines
 */

interface DealState {
    // Data state
    deals: AcquisitionDeal[];
    currentDeal: AcquisitionDeal | null;
    isLoading: boolean;
    error: string | null;

    // Filters and search
    filters: DealFilters;
    searchTerm: string;

    // Actions
    loadDeals: () => Promise<void>;
    createDeal: (dealData: Omit<AcquisitionDeal, 'id' | 'createdAt' | 'lastUpdated' | 'activity'>) => Promise<void>;
    updateDeal: (dealId: string, updates: Partial<AcquisitionDeal>) => Promise<void>;
    deleteDeal: (dealId: string) => Promise<void>;

    // Deal stage management
    updateStageStatus: (dealId: string, stageId: string, status: DealStageData['status']) => Promise<void>;
    updateStageProgress: (dealId: string, stageId: string, progress: number) => Promise<void>;
    completeStage: (dealId: string, stageId: string) => Promise<void>;

    // Document management
    uploadDocument: (dealId: string, stageId: string, document: Omit<DealDocument, 'id' | 'uploadedAt'>) => Promise<void>;
    updateDocument: (dealId: string, documentId: string, updates: Partial<DealDocument>) => Promise<void>;
    deleteDocument: (dealId: string, documentId: string) => Promise<void>;

    // Checklist management
    updateChecklistItem: (dealId: string, stageId: string, itemId: string, completed: boolean) => Promise<void>;
    addChecklistItem: (dealId: string, stageId: string, item: Omit<ChecklistItem, 'id'>) => Promise<void>;

    // Comments and activity
    addComment: (dealId: string, stageId: string, comment: Omit<StageComment, 'id' | 'createdAt'>) => Promise<void>;
    addActivity: (dealId: string, activity: Omit<DealActivity, 'id' | 'timestamp'>) => Promise<void>;

    // Key dates and milestones
    addKeyDate: (dealId: string, keyDate: Omit<KeyDate, 'id'>) => Promise<void>;
    updateKeyDate: (dealId: string, keyDateId: string, updates: Partial<KeyDate>) => Promise<void>;

    // Deal team management
    addTeamMember: (dealId: string, member: any) => Promise<void>;
    removeTeamMember: (dealId: string, memberId: string) => Promise<void>;
    updateTeamMemberPermissions: (dealId: string, memberId: string, permissions: DealPermission[]) => Promise<void>;

    // Filtering and search
    setFilters: (filters: Partial<DealFilters>) => void;
    setSearchTerm: (term: string) => void;
    getFilteredDeals: () => AcquisitionDeal[];
    resetFilters: () => void;

    // Getters
    getDealById: (dealId: string) => AcquisitionDeal | null;
    getDealsByUser: (userId: string) => AcquisitionDeal[];
    getActiveDeals: () => AcquisitionDeal[];
    getOverdueDeals: () => AcquisitionDeal[];

    // Utility functions
    calculateOverallProgress: (dealId: string) => number;
    setCurrentDeal: (deal: AcquisitionDeal | null) => void;
    clearError: () => void;
}

export const useDealStore = create<DealState>()(
    immer((set, get) => ({
        // Initial state
        deals: [],
        currentDeal: null,
        isLoading: false,
        error: null,
        filters: {},
        searchTerm: '',

        // Load deals from mock data or API
        loadDeals: async () => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // In a real app, this would be an API call
                const dealsData = mockDeals;

                set((state) => {
                    state.deals = dealsData;
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to load deals';
                });
            }
        },

        createDeal: async (dealData: Omit<AcquisitionDeal, 'id' | 'createdAt' | 'lastUpdated' | 'activity'>) => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                const newDeal: AcquisitionDeal = {
                    ...dealData,
                    id: `deal-${Date.now()}`,
                    createdAt: new Date(),
                    lastUpdated: new Date(),
                    activity: [],
                };

                set((state) => {
                    state.deals.unshift(newDeal);
                    state.isLoading = false;
                });

                // Add initial activity
                await get().addActivity(newDeal.id, {
                    type: 'stage-started',
                    description: 'Deal created and initial stage started',
                    performedBy: dealData.buyerId,
                    performedByName: dealData.buyer.firstName + ' ' + dealData.buyer.lastName,
                    performedByRole: 'buyer',
                });

            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to create deal';
                });
                throw error;
            }
        },

        updateDeal: async (dealId: string, updates: Partial<AcquisitionDeal>) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    const dealIndex = state.deals.findIndex(deal => deal.id === dealId);
                    if (dealIndex !== -1) {
                        state.deals[dealIndex] = {
                            ...state.deals[dealIndex],
                            ...updates,
                            lastUpdated: new Date()
                        };

                        // Update current deal if it's the same one
                        if (state.currentDeal?.id === dealId) {
                            state.currentDeal = state.deals[dealIndex];
                        }
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update deal';
                });
                throw error;
            }
        },

        deleteDeal: async (dealId: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    state.deals = state.deals.filter(deal => deal.id !== dealId);

                    // Clear current deal if it's the one being deleted
                    if (state.currentDeal?.id === dealId) {
                        state.currentDeal = null;
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to delete deal';
                });
                throw error;
            }
        },

        // Deal stage management
        updateStageStatus: async (dealId: string, stageId: string, status: DealStageData['status']) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId ? { ...stage, status } : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

                // Add activity
                await get().addActivity(dealId, {
                    type: 'status-changed',
                    description: `Stage ${stageId} status changed to ${status}`,
                    performedBy: 'current-user', // Would come from auth context
                    performedByName: 'Current User',
                    performedByRole: 'buyer',
                    stage: stageId as any,
                });

            } catch (error) {
                throw error;
            }
        },

        updateStageProgress: async (dealId: string, stageId: string, progress: number) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId ? { ...stage, progress } : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

                // Update overall progress
                const overallProgress = get().calculateOverallProgress(dealId);
                await get().updateDeal(dealId, { overallProgress });

            } catch (error) {
                throw error;
            }
        },

        completeStage: async (dealId: string, stageId: string) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId
                        ? { ...stage, status: 'completed' as const, progress: 100, completedAt: new Date() }
                        : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

                // Add activity
                await get().addActivity(dealId, {
                    type: 'stage-completed',
                    description: `Stage ${stageId} completed`,
                    performedBy: 'current-user', // Would come from auth context
                    performedByName: 'Current User',
                    performedByRole: 'buyer',
                    stage: stageId as any,
                });

            } catch (error) {
                throw error;
            }
        },

        // Document management
        uploadDocument: async (dealId: string, stageId: string, documentData: Omit<DealDocument, 'id' | 'uploadedAt'>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const newDocument: DealDocument = {
                    ...documentData,
                    id: `doc-${Date.now()}`,
                    uploadedAt: new Date(),
                };

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId
                        ? { ...stage, documents: [...stage.documents, newDocument] }
                        : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

                // Add activity
                await get().addActivity(dealId, {
                    type: 'document-uploaded',
                    description: `Uploaded document: ${newDocument.name}`,
                    performedBy: newDocument.uploadedBy,
                    performedByName: 'Current User',
                    performedByRole: 'buyer',
                    stage: stageId as any,
                });

            } catch (error) {
                throw error;
            }
        },

        updateDocument: async (dealId: string, documentId: string, updates: Partial<DealDocument>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedStages = deal.stages.map(stage => ({
                    ...stage,
                    documents: stage.documents.map(doc =>
                        doc.id === documentId ? { ...doc, ...updates } : doc
                    )
                }));

                await get().updateDeal(dealId, { stages: updatedStages });

            } catch (error) {
                throw error;
            }
        },

        deleteDocument: async (dealId: string, documentId: string) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedStages = deal.stages.map(stage => ({
                    ...stage,
                    documents: stage.documents.filter(doc => doc.id !== documentId)
                }));

                await get().updateDeal(dealId, { stages: updatedStages });

            } catch (error) {
                throw error;
            }
        },

        // Checklist management
        updateChecklistItem: async (dealId: string, stageId: string, itemId: string, completed: boolean) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId
                        ? {
                            ...stage,
                            checklist: stage.checklist.map(item =>
                                item.id === itemId
                                    ? {
                                        ...item,
                                        completed,
                                        completedBy: completed ? 'current-user' : undefined,
                                        completedAt: completed ? new Date() : undefined
                                    }
                                    : item
                            )
                        }
                        : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

                // Update stage progress based on completed checklist items
                const stage = updatedStages.find(s => s.stage === stageId);
                if (stage) {
                    const completedItems = stage.checklist.filter(item => item.completed).length;
                    const totalItems = stage.checklist.length;
                    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

                    await get().updateStageProgress(dealId, stageId, progress);
                }

            } catch (error) {
                throw error;
            }
        },

        addChecklistItem: async (dealId: string, stageId: string, itemData: Omit<ChecklistItem, 'id'>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const newItem: ChecklistItem = {
                    ...itemData,
                    id: `checklist-${Date.now()}`,
                };

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId
                        ? { ...stage, checklist: [...stage.checklist, newItem] }
                        : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

            } catch (error) {
                throw error;
            }
        },

        // Comments and activity
        addComment: async (dealId: string, stageId: string, commentData: Omit<StageComment, 'id' | 'createdAt'>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const newComment: StageComment = {
                    ...commentData,
                    id: `comment-${Date.now()}`,
                    createdAt: new Date(),
                };

                const updatedStages = deal.stages.map(stage =>
                    stage.stage === stageId
                        ? { ...stage, comments: [...stage.comments, newComment] }
                        : stage
                );

                await get().updateDeal(dealId, { stages: updatedStages });

                // Add activity
                await get().addActivity(dealId, {
                    type: 'comment-added',
                    description: `Added comment to ${stageId} stage`,
                    performedBy: commentData.authorId,
                    performedByName: commentData.authorName,
                    performedByRole: commentData.authorRole,
                    stage: stageId as any,
                });

            } catch (error) {
                throw error;
            }
        },

        addActivity: async (dealId: string, activityData: Omit<DealActivity, 'id' | 'timestamp'>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const newActivity: DealActivity = {
                    ...activityData,
                    id: `activity-${Date.now()}`,
                    timestamp: new Date(),
                };

                const updatedActivity = [newActivity, ...deal.activity];
                await get().updateDeal(dealId, { activity: updatedActivity });

            } catch (error) {
                throw error;
            }
        },

        // Key dates and milestones
        addKeyDate: async (dealId: string, keyDateData: Omit<KeyDate, 'id'>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const newKeyDate: KeyDate = {
                    ...keyDateData,
                    id: `keydate-${Date.now()}`,
                };

                const updatedKeyDates = [...(deal.keyDates || []), newKeyDate];
                await get().updateDeal(dealId, { keyDates: updatedKeyDates });

            } catch (error) {
                throw error;
            }
        },

        updateKeyDate: async (dealId: string, keyDateId: string, updates: Partial<KeyDate>) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal || !deal.keyDates) return;

                const updatedKeyDates = deal.keyDates.map(keyDate =>
                    keyDate.id === keyDateId ? { ...keyDate, ...updates } : keyDate
                );

                await get().updateDeal(dealId, { keyDates: updatedKeyDates });

            } catch (error) {
                throw error;
            }
        },

        // Deal team management
        addTeamMember: async (dealId: string, member: any) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal) return;

                const updatedTeam = [...(deal.dealTeam || []), member];
                await get().updateDeal(dealId, { dealTeam: updatedTeam });

                // Add activity
                await get().addActivity(dealId, {
                    type: 'team-member-added',
                    description: `Added ${member.name} to deal team`,
                    performedBy: 'current-user',
                    performedByName: 'Current User',
                    performedByRole: 'buyer',
                });

            } catch (error) {
                throw error;
            }
        },

        removeTeamMember: async (dealId: string, memberId: string) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal || !deal.dealTeam) return;

                const updatedTeam = deal.dealTeam.filter(member => member.id !== memberId);
                await get().updateDeal(dealId, { dealTeam: updatedTeam });

            } catch (error) {
                throw error;
            }
        },

        updateTeamMemberPermissions: async (dealId: string, memberId: string, permissions: DealPermission[]) => {
            try {
                const deal = get().getDealById(dealId);
                if (!deal || !deal.dealTeam) return;

                const updatedTeam = deal.dealTeam.map(member =>
                    member.id === memberId ? { ...member, permissions } : member
                );

                await get().updateDeal(dealId, { dealTeam: updatedTeam });

            } catch (error) {
                throw error;
            }
        },

        // Filtering and search
        setFilters: (newFilters: Partial<DealFilters>) => {
            set((state) => {
                state.filters = { ...state.filters, ...newFilters };
            });
        },

        setSearchTerm: (term: string) => {
            set((state) => {
                state.searchTerm = term;
            });
        },

        getFilteredDeals: () => {
            const { deals, filters, searchTerm } = get();

            let filtered = [...deals];

            // Apply search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(deal =>
                    deal.business.name.toLowerCase().includes(term) ||
                    deal.buyer.firstName.toLowerCase().includes(term) ||
                    deal.buyer.lastName.toLowerCase().includes(term) ||
                    deal.seller.firstName.toLowerCase().includes(term) ||
                    deal.seller.lastName.toLowerCase().includes(term) ||
                    deal.business.industry.toLowerCase().includes(term)
                );
            }

            // Apply stage filter
            if (filters.stage && filters.stage.length > 0) {
                filtered = filtered.filter(deal => filters.stage!.includes(deal.currentStage));
            }

            // Apply status filter
            if (filters.status && filters.status.length > 0) {
                filtered = filtered.filter(deal => filters.status!.includes(deal.status));
            }

            // Apply deal value filter
            if (filters.dealValue) {
                filtered = filtered.filter(deal => {
                    const { min, max } = filters.dealValue!;
                    return (
                        (!min || (deal.dealValue && deal.dealValue >= min)) &&
                        (!max || (deal.dealValue && deal.dealValue <= max))
                    );
                });
            }

            // Apply last updated filter
            if (filters.lastUpdated) {
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - filters.lastUpdated.days);
                filtered = filtered.filter(deal => deal.lastUpdated >= cutoffDate);
            }

            // Apply role filter
            if (filters.myRole) {
                const currentUserId = 'current-user'; // Would come from auth context
                filtered = filtered.filter(deal =>
                    filters.myRole === 'buyer' ? deal.buyerId === currentUserId : deal.sellerId === currentUserId
                );
            }

            return filtered;
        },

        resetFilters: () => {
            set((state) => {
                state.filters = {};
                state.searchTerm = '';
            });
        },

        // Getters
        getDealById: (dealId: string) => {
            const deals = get().deals;
            return deals.find(deal => deal.id === dealId) || null;
        },

        getDealsByUser: (userId: string) => {
            const deals = get().deals;
            return deals.filter(deal => deal.buyerId === userId || deal.sellerId === userId);
        },

        getActiveDeals: () => {
            const deals = get().deals;
            return deals.filter(deal => deal.status === 'active');
        },

        getOverdueDeals: () => {
            const deals = get().deals;
            const today = new Date();
            return deals.filter(deal =>
                deal.targetClosingDate && deal.targetClosingDate < today && deal.status === 'active'
            );
        },

        // Utility functions
        calculateOverallProgress: (dealId: string) => {
            const deal = get().getDealById(dealId);
            if (!deal) return 0;

            const totalStages = deal.stages.length;
            if (totalStages === 0) return 0;

            const totalProgress = deal.stages.reduce((sum, stage) => sum + stage.progress, 0);
            return Math.round(totalProgress / totalStages);
        },

        setCurrentDeal: (deal: AcquisitionDeal | null) => {
            set((state) => {
                state.currentDeal = deal;
            });
        },

        clearError: () => {
            set((state) => {
                state.error = null;
            });
        },
    }))
);

// Export selectors for better performance and reusability
export const dealSelectors = {
    getAllDeals: () => useDealStore.getState().deals,
    getFilteredDeals: () => useDealStore.getState().getFilteredDeals(),
    getDealById: (id: string) => useDealStore.getState().getDealById(id),
    getCurrentDeal: () => useDealStore.getState().currentDeal,
    getActiveDeals: () => useDealStore.getState().getActiveDeals(),
    getOverdueDeals: () => useDealStore.getState().getOverdueDeals(),
    isLoading: () => useDealStore.getState().isLoading,
    getError: () => useDealStore.getState().error,
    getFilters: () => useDealStore.getState().filters,
    getSearchTerm: () => useDealStore.getState().searchTerm,
};

/**
 * Usage Examples:
 * 
 * // Load and display deals:
 * import { useDealStore } from '../store/dealStore';
 * 
 * function DealsList() {
 *   const { loadDeals, getFilteredDeals } = useDealStore();
 *   const deals = useDealStore(state => state.getFilteredDeals());
 *   
 *   useEffect(() => {
 *     loadDeals();
 *   }, []);
 * }
 * 
 * // Update deal stage:
 * function DealStageCard({ dealId, stageId }) {
 *   const { updateStageStatus, completeStage } = useDealStore();
 *   
 *   const handleCompleteStage = async () => {
 *     await completeStage(dealId, stageId);
 *   };
 * }
 * 
 * // Upload document to deal:
 * function DocumentUpload({ dealId, stageId }) {
 *   const { uploadDocument } = useDealStore();
 *   
 *   const handleUpload = async (file) => {
 *     await uploadDocument(dealId, stageId, {
 *       name: file.name,
 *       type: 'pdf',
 *       size: file.size,
 *       uploadedBy: 'current-user',
 *       url: 'uploaded-url',
 *       category: 'legal',
 *       confidentialityLevel: 'confidential',
 *       version: 1,
 *       status: 'draft'
 *     });
 *   };
 * }
 */
