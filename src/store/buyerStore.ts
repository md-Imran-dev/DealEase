import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { BuyerProfile, BuyerFilters } from '../types/buyer';
import { mockBuyers } from '../data/mockBuyers';

/**
 * BuyerStore - Manages buyer profiles, onboarding data, and buyer-related operations
 * 
 * This store handles:
 * - Loading and caching buyer profiles
 * - Adding, updating, and removing buyer profiles
 * - Buyer onboarding data and questionnaire responses
 * - Filtering and searching buyers
 * - Buyer verification and badges
 */

interface BuyerState {
    // Data state
    buyers: BuyerProfile[];
    currentBuyer: BuyerProfile | null;
    isLoading: boolean;
    error: string | null;

    // Filters and search
    filters: BuyerFilters;
    searchTerm: string;

    // Actions
    loadBuyers: () => Promise<void>;
    getBuyerById: (id: string) => BuyerProfile | null;
    addBuyer: (buyer: Omit<BuyerProfile, 'id'>) => Promise<void>;
    updateBuyer: (id: string, updates: Partial<BuyerProfile>) => Promise<void>;
    removeBuyer: (id: string) => Promise<void>;

    // Onboarding and questionnaire
    updateBuyerOnboarding: (id: string, onboardingData: any) => Promise<void>;
    completeBuyerProfile: (id: string) => Promise<void>;

    // Filtering and search
    setFilters: (filters: Partial<BuyerFilters>) => void;
    setSearchTerm: (term: string) => void;
    getFilteredBuyers: () => BuyerProfile[];
    resetFilters: () => void;

    // Verification and badges
    verifyBuyer: (id: string) => Promise<void>;
    addBuyerBadge: (id: string, badge: any) => Promise<void>;
    addBuyerEndorsement: (id: string, endorsement: any) => Promise<void>;

    // Utility functions
    clearError: () => void;
    setCurrentBuyer: (buyer: BuyerProfile | null) => void;
}

export const useBuyerStore = create<BuyerState>()(
    immer((set, get) => ({
        // Initial state
        buyers: [],
        currentBuyer: null,
        isLoading: false,
        error: null,
        filters: {},
        searchTerm: '',

        // Load buyers from mock data or API
        loadBuyers: async () => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // In a real app, this would be an API call
                const buyersData = mockBuyers;

                set((state) => {
                    state.buyers = buyersData;
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to load buyers';
                });
            }
        },

        getBuyerById: (id: string) => {
            const buyers = get().buyers;
            return buyers.find(buyer => buyer.id === id) || null;
        },

        addBuyer: async (buyerData: Omit<BuyerProfile, 'id'>) => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                const newBuyer: BuyerProfile = {
                    ...buyerData,
                    id: `buyer-${Date.now()}`,
                    lastActive: new Date(),
                    profileCompleteness: 75,
                    responseRate: 100,
                    verifiedStatus: false,
                    badges: [],
                    endorsements: [],
                };

                set((state) => {
                    state.buyers.push(newBuyer);
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to add buyer';
                });
                throw error;
            }
        },

        updateBuyer: async (id: string, updates: Partial<BuyerProfile>) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    const buyerIndex = state.buyers.findIndex(buyer => buyer.id === id);
                    if (buyerIndex !== -1) {
                        state.buyers[buyerIndex] = { ...state.buyers[buyerIndex], ...updates };

                        // Update current buyer if it's the same one
                        if (state.currentBuyer?.id === id) {
                            state.currentBuyer = state.buyers[buyerIndex];
                        }
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update buyer';
                });
                throw error;
            }
        },

        removeBuyer: async (id: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    state.buyers = state.buyers.filter(buyer => buyer.id !== id);

                    // Clear current buyer if it's the one being removed
                    if (state.currentBuyer?.id === id) {
                        state.currentBuyer = null;
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to remove buyer';
                });
                throw error;
            }
        },

        updateBuyerOnboarding: async (id: string, onboardingData: any) => {
            try {
                await get().updateBuyer(id, {
                    onboardingData,
                    profileCompleteness: 90 // Update completeness based on onboarding
                } as Partial<BuyerProfile>);
            } catch (error) {
                throw error;
            }
        },

        completeBuyerProfile: async (id: string) => {
            try {
                await get().updateBuyer(id, {
                    isOnboarded: true,
                    profileCompleteness: 100
                } as Partial<BuyerProfile>);
            } catch (error) {
                throw error;
            }
        },

        // Filtering and search
        setFilters: (newFilters: Partial<BuyerFilters>) => {
            set((state) => {
                state.filters = { ...state.filters, ...newFilters };
            });
        },

        setSearchTerm: (term: string) => {
            set((state) => {
                state.searchTerm = term;
            });
        },

        getFilteredBuyers: () => {
            const { buyers, filters, searchTerm } = get();

            let filtered = [...buyers];

            // Apply search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(buyer =>
                    buyer.firstName.toLowerCase().includes(term) ||
                    buyer.lastName.toLowerCase().includes(term) ||
                    buyer.company?.toLowerCase().includes(term) ||
                    buyer.bio.toLowerCase().includes(term) ||
                    buyer.industries.some(industry => industry.toLowerCase().includes(term))
                );
            }

            // Apply industry filter
            if (filters.industries && filters.industries.length > 0) {
                filtered = filtered.filter(buyer =>
                    buyer.industries.some(industry => filters.industries!.includes(industry))
                );
            }

            // Apply investment range filter
            if (filters.investmentRange) {
                filtered = filtered.filter(buyer => {
                    const { min, max } = filters.investmentRange!;
                    return (
                        (!min || buyer.investmentRangeMax >= min) &&
                        (!max || buyer.investmentRangeMin <= max)
                    );
                });
            }

            // Apply location filter
            if (filters.locations && filters.locations.length > 0) {
                filtered = filtered.filter(buyer =>
                    buyer.preferredLocations.some(location =>
                        filters.locations!.includes(location)
                    ) || buyer.remoteBusinessInterest
                );
            }

            // Apply experience filter
            if (filters.experience && filters.experience.length > 0) {
                filtered = filtered.filter(buyer =>
                    filters.experience!.includes(buyer.acquisitionExperience)
                );
            }

            // Apply remote only filter
            if (filters.remoteOnly) {
                filtered = filtered.filter(buyer => buyer.remoteBusinessInterest);
            }

            // Apply verified only filter
            if (filters.verifiedOnly) {
                filtered = filtered.filter(buyer => buyer.verifiedStatus);
            }

            return filtered;
        },

        resetFilters: () => {
            set((state) => {
                state.filters = {};
                state.searchTerm = '';
            });
        },

        // Verification and badges
        verifyBuyer: async (id: string) => {
            try {
                await get().updateBuyer(id, { verifiedStatus: true });
            } catch (error) {
                throw error;
            }
        },

        addBuyerBadge: async (id: string, badge: any) => {
            const buyer = get().getBuyerById(id);
            if (!buyer) return;

            try {
                const updatedBadges = [...(buyer.badges || []), badge];
                await get().updateBuyer(id, { badges: updatedBadges });
            } catch (error) {
                throw error;
            }
        },

        addBuyerEndorsement: async (id: string, endorsement: any) => {
            const buyer = get().getBuyerById(id);
            if (!buyer) return;

            try {
                const updatedEndorsements = [...(buyer.endorsements || []), endorsement];
                await get().updateBuyer(id, { endorsements: updatedEndorsements });
            } catch (error) {
                throw error;
            }
        },

        // Utility functions
        clearError: () => {
            set((state) => {
                state.error = null;
            });
        },

        setCurrentBuyer: (buyer: BuyerProfile | null) => {
            set((state) => {
                state.currentBuyer = buyer;
            });
        },
    }))
);

// Export selectors for better performance and reusability
export const buyerSelectors = {
    getAllBuyers: () => useBuyerStore.getState().buyers,
    getFilteredBuyers: () => useBuyerStore.getState().getFilteredBuyers(),
    getBuyerById: (id: string) => useBuyerStore.getState().getBuyerById(id),
    getCurrentBuyer: () => useBuyerStore.getState().currentBuyer,
    isLoading: () => useBuyerStore.getState().isLoading,
    getError: () => useBuyerStore.getState().error,
    getFilters: () => useBuyerStore.getState().filters,
    getSearchTerm: () => useBuyerStore.getState().searchTerm,
};

/**
 * Usage Examples:
 * 
 * // Load buyers in a marketplace component:
 * import { useBuyerStore } from '../store/buyerStore';
 * 
 * function BuyerMarketplace() {
 *   const { loadBuyers, getFilteredBuyers, setFilters } = useBuyerStore();
 *   const buyers = useBuyerStore(state => state.getFilteredBuyers());
 *   
 *   useEffect(() => {
 *     loadBuyers();
 *   }, []);
 * }
 * 
 * // Update buyer profile:
 * function BuyerProfile({ buyerId }) {
 *   const { updateBuyer, getBuyerById } = useBuyerStore();
 *   const buyer = useBuyerStore(state => state.getBuyerById(buyerId));
 *   
 *   const handleUpdateProfile = async (updates) => {
 *     await updateBuyer(buyerId, updates);
 *   };
 * }
 */
