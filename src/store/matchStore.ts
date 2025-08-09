import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Match, MatchFilters, ScheduledMeeting } from '../types/match';
import { mockMatches } from '../data/mockMatches';

/**
 * MatchStore - Manages matches between buyers and sellers
 * 
 * This store handles:
 * - Loading and caching matches
 * - Creating new matches between buyers and sellers
 * - Updating match status and deal stages
 * - Managing match notifications and unread counts
 * - Filtering and searching matches
 * - Scheduling meetings and tracking next steps
 */

interface MatchState {
    // Data state
    matches: Match[];
    isLoading: boolean;
    error: string | null;

    // Filters and search
    filters: MatchFilters;
    searchTerm: string;

    // Actions
    loadMatches: () => Promise<void>;
    createMatch: (buyerId: string, sellerId: string, businessId?: string) => Promise<void>;
    updateMatchStatus: (matchId: string, status: Match['status']) => Promise<void>;
    updateDealStage: (matchId: string, stage: Match['dealStage']) => Promise<void>;
    updateNextSteps: (matchId: string, nextSteps: string[]) => Promise<void>;

    // Match management
    getMatchById: (matchId: string) => Match | null;
    getMatchesByUser: (userId: string) => Match[];
    archiveMatch: (matchId: string) => Promise<void>;
    blockMatch: (matchId: string) => Promise<void>;
    reactivateMatch: (matchId: string) => Promise<void>;

    // Meeting scheduling
    scheduleMeeting: (matchId: string, meeting: Omit<ScheduledMeeting, 'id'>) => Promise<void>;
    updateMeeting: (matchId: string, meetingId: string, updates: Partial<ScheduledMeeting>) => Promise<void>;
    cancelMeeting: (matchId: string, meetingId: string) => Promise<void>;

    // Filtering and search
    setFilters: (filters: Partial<MatchFilters>) => void;
    setSearchTerm: (term: string) => void;
    getFilteredMatches: () => Match[];
    resetFilters: () => void;

    // Utility functions
    clearError: () => void;
    getUnreadCount: (userId: string) => number;
    updateLastActivity: (matchId: string) => void;
}

export const useMatchStore = create<MatchState>()(
    immer((set, get) => ({
        // Initial state
        matches: [],
        isLoading: false,
        error: null,
        filters: {},
        searchTerm: '',

        // Load matches from mock data or API
        loadMatches: async () => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // In a real app, this would be an API call
                const matchesData = mockMatches;

                set((state) => {
                    state.matches = matchesData;
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to load matches';
                });
            }
        },

        createMatch: async (buyerId: string, sellerId: string, businessId?: string) => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // In a real app, this would be an API call
                const newMatch: Match = {
                    id: `match-${Date.now()}`,
                    buyerId,
                    sellerId,
                    businessId,
                    status: 'active',
                    createdAt: new Date(),
                    lastActivity: new Date(),
                    buyer: {
                        id: buyerId,
                        firstName: 'John', // Would come from API
                        lastName: 'Doe',
                        avatar: 'JD',
                    },
                    seller: {
                        id: sellerId,
                        firstName: 'Jane',
                        lastName: 'Smith',
                        avatar: 'JS',
                    },
                    unreadCount: {
                        buyer: 0,
                        seller: 1,
                    },
                    dealStage: 'initial-contact',
                    matchScore: 85,
                    matchReasons: ['Great fit based on preferences'],
                    mutualInterests: ['Technology', 'SaaS'],
                };

                set((state) => {
                    state.matches.unshift(newMatch);
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to create match';
                });
                throw error;
            }
        },

        updateMatchStatus: async (matchId: string, status: Match['status']) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    const matchIndex = state.matches.findIndex(match => match.id === matchId);
                    if (matchIndex !== -1) {
                        state.matches[matchIndex].status = status;
                        state.matches[matchIndex].lastActivity = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update match status';
                });
                throw error;
            }
        },

        updateDealStage: async (matchId: string, stage: Match['dealStage']) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    const matchIndex = state.matches.findIndex(match => match.id === matchId);
                    if (matchIndex !== -1) {
                        state.matches[matchIndex].dealStage = stage;
                        state.matches[matchIndex].lastActivity = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update deal stage';
                });
                throw error;
            }
        },

        updateNextSteps: async (matchId: string, nextSteps: string[]) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    const matchIndex = state.matches.findIndex(match => match.id === matchId);
                    if (matchIndex !== -1) {
                        state.matches[matchIndex].nextSteps = nextSteps;
                        state.matches[matchIndex].lastActivity = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update next steps';
                });
                throw error;
            }
        },

        // Match management
        getMatchById: (matchId: string) => {
            const matches = get().matches;
            return matches.find(match => match.id === matchId) || null;
        },

        getMatchesByUser: (userId: string) => {
            const matches = get().matches;
            return matches.filter(match =>
                match.buyerId === userId || match.sellerId === userId
            );
        },

        archiveMatch: async (matchId: string) => {
            try {
                await get().updateMatchStatus(matchId, 'archived');
            } catch (error) {
                throw error;
            }
        },

        blockMatch: async (matchId: string) => {
            try {
                await get().updateMatchStatus(matchId, 'blocked');
            } catch (error) {
                throw error;
            }
        },

        reactivateMatch: async (matchId: string) => {
            try {
                await get().updateMatchStatus(matchId, 'active');
            } catch (error) {
                throw error;
            }
        },

        // Meeting scheduling
        scheduleMeeting: async (matchId: string, meetingData: Omit<ScheduledMeeting, 'id'>) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                const newMeeting: ScheduledMeeting = {
                    ...meetingData,
                    id: `meeting-${Date.now()}`,
                };

                set((state) => {
                    const matchIndex = state.matches.findIndex(match => match.id === matchId);
                    if (matchIndex !== -1) {
                        if (!state.matches[matchIndex].scheduledMeetings) {
                            state.matches[matchIndex].scheduledMeetings = [];
                        }
                        state.matches[matchIndex].scheduledMeetings!.push(newMeeting);
                        state.matches[matchIndex].lastActivity = new Date();
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to schedule meeting';
                });
                throw error;
            }
        },

        updateMeeting: async (matchId: string, meetingId: string, updates: Partial<ScheduledMeeting>) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                set((state) => {
                    const matchIndex = state.matches.findIndex(match => match.id === matchId);
                    if (matchIndex !== -1 && state.matches[matchIndex].scheduledMeetings) {
                        const meetingIndex = state.matches[matchIndex].scheduledMeetings!.findIndex(
                            meeting => meeting.id === meetingId
                        );
                        if (meetingIndex !== -1) {
                            state.matches[matchIndex].scheduledMeetings![meetingIndex] = {
                                ...state.matches[matchIndex].scheduledMeetings![meetingIndex],
                                ...updates
                            };
                            state.matches[matchIndex].lastActivity = new Date();
                        }
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update meeting';
                });
                throw error;
            }
        },

        cancelMeeting: async (matchId: string, meetingId: string) => {
            try {
                await get().updateMeeting(matchId, meetingId, { status: 'cancelled' });
            } catch (error) {
                throw error;
            }
        },

        // Filtering and search
        setFilters: (newFilters: Partial<MatchFilters>) => {
            set((state) => {
                state.filters = { ...state.filters, ...newFilters };
            });
        },

        setSearchTerm: (term: string) => {
            set((state) => {
                state.searchTerm = term;
            });
        },

        getFilteredMatches: () => {
            const { matches, filters, searchTerm } = get();

            let filtered = [...matches];

            // Apply search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(match =>
                    match.buyer.firstName.toLowerCase().includes(term) ||
                    match.buyer.lastName.toLowerCase().includes(term) ||
                    match.buyer.company?.toLowerCase().includes(term) ||
                    match.seller.firstName.toLowerCase().includes(term) ||
                    match.seller.lastName.toLowerCase().includes(term) ||
                    match.seller.company?.toLowerCase().includes(term) ||
                    match.business?.name.toLowerCase().includes(term) ||
                    match.business?.industry.toLowerCase().includes(term)
                );
            }

            // Apply status filter
            if (filters.status && filters.status.length > 0) {
                filtered = filtered.filter(match => filters.status!.includes(match.status));
            }

            // Apply deal stage filter
            if (filters.dealStage && filters.dealStage.length > 0) {
                filtered = filtered.filter(match =>
                    match.dealStage && filters.dealStage!.includes(match.dealStage)
                );
            }

            // Apply unread messages filter
            if (filters.hasUnreadMessages) {
                // This would need current user context to determine which side to check
                filtered = filtered.filter(match =>
                    match.unreadCount.buyer > 0 || match.unreadCount.seller > 0
                );
            }

            // Apply last activity filter
            if (filters.lastActivityDays) {
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - filters.lastActivityDays);
                filtered = filtered.filter(match => match.lastActivity >= cutoffDate);
            }

            return filtered;
        },

        resetFilters: () => {
            set((state) => {
                state.filters = {};
                state.searchTerm = '';
            });
        },

        // Utility functions
        clearError: () => {
            set((state) => {
                state.error = null;
            });
        },

        getUnreadCount: (userId: string) => {
            const matches = get().getMatchesByUser(userId);
            return matches.reduce((total, match) => {
                // Determine which side the user is on and return their unread count
                if (match.buyerId === userId) {
                    return total + match.unreadCount.buyer;
                } else if (match.sellerId === userId) {
                    return total + match.unreadCount.seller;
                }
                return total;
            }, 0);
        },

        updateLastActivity: (matchId: string) => {
            set((state) => {
                const matchIndex = state.matches.findIndex(match => match.id === matchId);
                if (matchIndex !== -1) {
                    state.matches[matchIndex].lastActivity = new Date();
                }
            });
        },
    }))
);

// Export selectors for better performance and reusability
export const matchSelectors = {
    getAllMatches: () => useMatchStore.getState().matches,
    getFilteredMatches: () => useMatchStore.getState().getFilteredMatches(),
    getMatchById: (id: string) => useMatchStore.getState().getMatchById(id),
    getMatchesByUser: (userId: string) => useMatchStore.getState().getMatchesByUser(userId),
    isLoading: () => useMatchStore.getState().isLoading,
    getError: () => useMatchStore.getState().error,
    getFilters: () => useMatchStore.getState().filters,
    getSearchTerm: () => useMatchStore.getState().searchTerm,
    getUnreadCount: (userId: string) => useMatchStore.getState().getUnreadCount(userId),
};

/**
 * Usage Examples:
 * 
 * // Load matches and display them:
 * import { useMatchStore } from '../store/matchStore';
 * 
 * function MatchesList() {
 *   const { loadMatches, getFilteredMatches } = useMatchStore();
 *   const matches = useMatchStore(state => state.getFilteredMatches());
 *   
 *   useEffect(() => {
 *     loadMatches();
 *   }, []);
 * }
 * 
 * // Create a new match:
 * function CreateMatch({ buyerId, sellerId }) {
 *   const { createMatch } = useMatchStore();
 *   
 *   const handleCreateMatch = async () => {
 *     await createMatch(buyerId, sellerId);
 *   };
 * }
 * 
 * // Update deal stage:
 * function MatchDetail({ matchId }) {
 *   const { updateDealStage, getMatchById } = useMatchStore();
 *   const match = useMatchStore(state => state.getMatchById(matchId));
 *   
 *   const handleStageUpdate = async (newStage) => {
 *     await updateDealStage(matchId, newStage);
 *   };
 * }
 */
