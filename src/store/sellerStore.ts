import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { SellerProfile } from '../types/seller';
import { mockSellers } from '../data/mockSellers';

/**
 * SellerStore - Manages seller profiles, onboarding data, and seller-related operations
 * 
 * This store handles:
 * - Loading and caching seller profiles
 * - Adding, updating, and removing seller profiles
 * - Seller onboarding data and business information
 * - Filtering and searching sellers
 * - Business verification and seller badges
 */

interface SellerFilters {
    industries?: string[];
    valueRange?: {
        min?: number;
        max?: number;
    };
    locations?: string[];
    businessTypes?: string[];
    verifiedOnly?: boolean;
    revenueRange?: {
        min?: number;
        max?: number;
    };
}

interface SellerState {
    // Data state
    sellers: SellerProfile[];
    currentSeller: SellerProfile | null;
    isLoading: boolean;
    error: string | null;

    // Filters and search
    filters: SellerFilters;
    searchTerm: string;

    // Actions
    loadSellers: () => Promise<void>;
    getSellerById: (id: string) => SellerProfile | null;
    addSeller: (seller: Omit<SellerProfile, 'id'>) => Promise<void>;
    updateSeller: (id: string, updates: Partial<SellerProfile>) => Promise<void>;
    removeSeller: (id: string) => Promise<void>;

    // Business and onboarding
    updateSellerBusiness: (id: string, businessData: any) => Promise<void>;
    updateSellerOnboarding: (id: string, onboardingData: any) => Promise<void>;
    completeSellerProfile: (id: string) => Promise<void>;

    // Filtering and search
    setFilters: (filters: Partial<SellerFilters>) => void;
    setSearchTerm: (term: string) => void;
    getFilteredSellers: () => SellerProfile[];
    resetFilters: () => void;

    // Verification and badges
    verifySeller: (id: string) => Promise<void>;
    addSellerBadge: (id: string, badge: any) => Promise<void>;
    addSellerReference: (id: string, reference: any) => Promise<void>;

    // Utility functions
    clearError: () => void;
    setCurrentSeller: (seller: SellerProfile | null) => void;
}

export const useSellerStore = create<SellerState>()(
    immer((set, get) => ({
        // Initial state
        sellers: [],
        currentSeller: null,
        isLoading: false,
        error: null,
        filters: {},
        searchTerm: '',

        // Load sellers from mock data or API
        loadSellers: async () => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // In a real app, this would be an API call
                const sellersData = mockSellers;

                set((state) => {
                    state.sellers = sellersData;
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to load sellers';
                });
            }
        },

        getSellerById: (id: string) => {
            const sellers = get().sellers;
            return sellers.find(seller => seller.id === id) || null;
        },

        addSeller: async (sellerData: Omit<SellerProfile, 'id'>) => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                const newSeller: SellerProfile = {
                    ...sellerData,
                    id: `seller-${Date.now()}`,
                    lastActive: new Date(),
                    profileCompleteness: 75,
                    responseRate: 100,
                    verifiedStatus: false,
                    badges: [],
                    references: [],
                };

                set((state) => {
                    state.sellers.push(newSeller);
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.isLoading = false;
                    state.error = 'Failed to add seller';
                });
                throw error;
            }
        },

        updateSeller: async (id: string, updates: Partial<SellerProfile>) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    const sellerIndex = state.sellers.findIndex(seller => seller.id === id);
                    if (sellerIndex !== -1) {
                        state.sellers[sellerIndex] = { ...state.sellers[sellerIndex], ...updates };

                        // Update current seller if it's the same one
                        if (state.currentSeller?.id === id) {
                            state.currentSeller = state.sellers[sellerIndex];
                        }
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to update seller';
                });
                throw error;
            }
        },

        removeSeller: async (id: string) => {
            set((state) => {
                state.error = null;
            });

            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300));

                set((state) => {
                    state.sellers = state.sellers.filter(seller => seller.id !== id);

                    // Clear current seller if it's the one being removed
                    if (state.currentSeller?.id === id) {
                        state.currentSeller = null;
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = 'Failed to remove seller';
                });
                throw error;
            }
        },

        updateSellerBusiness: async (id: string, businessData: any) => {
            try {
                await get().updateSeller(id, {
                    ...businessData,
                    profileCompleteness: 95 // Update completeness based on business data
                });
            } catch (error) {
                throw error;
            }
        },

        updateSellerOnboarding: async (id: string, onboardingData: any) => {
            try {
                await get().updateSeller(id, {
                    onboardingData,
                    profileCompleteness: 85 // Update completeness based on onboarding
                } as Partial<SellerProfile>);
            } catch (error) {
                throw error;
            }
        },

        completeSellerProfile: async (id: string) => {
            try {
                await get().updateSeller(id, {
                    isOnboarded: true,
                    profileCompleteness: 100
                } as Partial<SellerProfile>);
            } catch (error) {
                throw error;
            }
        },

        // Filtering and search
        setFilters: (newFilters: Partial<SellerFilters>) => {
            set((state) => {
                state.filters = { ...state.filters, ...newFilters };
            });
        },

        setSearchTerm: (term: string) => {
            set((state) => {
                state.searchTerm = term;
            });
        },

        getFilteredSellers: () => {
            const { sellers, filters, searchTerm } = get();

            let filtered = [...sellers];

            // Apply search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(seller =>
                    seller.firstName.toLowerCase().includes(term) ||
                    seller.lastName.toLowerCase().includes(term) ||
                    seller.company?.toLowerCase().includes(term) ||
                    seller.businessName.toLowerCase().includes(term) ||
                    seller.description.toLowerCase().includes(term) ||
                    seller.industry.toLowerCase().includes(term)
                );
            }

            // Apply industry filter
            if (filters.industries && filters.industries.length > 0) {
                filtered = filtered.filter(seller =>
                    filters.industries!.includes(seller.industry)
                );
            }

            // Apply business value range filter
            if (filters.valueRange) {
                filtered = filtered.filter(seller => {
                    const { min, max } = filters.valueRange!;
                    return (
                        (!min || seller.valuation >= min) &&
                        (!max || seller.valuation <= max)
                    );
                });
            }

            // Apply revenue range filter
            if (filters.revenueRange) {
                filtered = filtered.filter(seller => {
                    const { min, max } = filters.revenueRange!;
                    return (
                        (!min || seller.grossRevenue >= min) &&
                        (!max || seller.grossRevenue <= max)
                    );
                });
            }

            // Apply location filter
            if (filters.locations && filters.locations.length > 0) {
                filtered = filtered.filter(seller =>
                    filters.locations!.some(location =>
                        seller.location.toLowerCase().includes(location.toLowerCase())
                    )
                );
            }

            // Apply business type filter
            if (filters.businessTypes && filters.businessTypes.length > 0) {
                filtered = filtered.filter(seller =>
                    filters.businessTypes!.includes(seller.businessType)
                );
            }

            // Apply verified only filter
            if (filters.verifiedOnly) {
                filtered = filtered.filter(seller => seller.verifiedStatus);
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
        verifySeller: async (id: string) => {
            try {
                await get().updateSeller(id, { verifiedStatus: true });
            } catch (error) {
                throw error;
            }
        },

        addSellerBadge: async (id: string, badge: any) => {
            const seller = get().getSellerById(id);
            if (!seller) return;

            try {
                const updatedBadges = [...(seller.badges || []), badge];
                await get().updateSeller(id, { badges: updatedBadges });
            } catch (error) {
                throw error;
            }
        },

        addSellerReference: async (id: string, reference: any) => {
            const seller = get().getSellerById(id);
            if (!seller) return;

            try {
                const updatedReferences = [...(seller.references || []), reference];
                await get().updateSeller(id, { references: updatedReferences });
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

        setCurrentSeller: (seller: SellerProfile | null) => {
            set((state) => {
                state.currentSeller = seller;
            });
        },
    }))
);

// Export selectors for better performance and reusability
export const sellerSelectors = {
    getAllSellers: () => useSellerStore.getState().sellers,
    getFilteredSellers: () => useSellerStore.getState().getFilteredSellers(),
    getSellerById: (id: string) => useSellerStore.getState().getSellerById(id),
    getCurrentSeller: () => useSellerStore.getState().currentSeller,
    isLoading: () => useSellerStore.getState().isLoading,
    getError: () => useSellerStore.getState().error,
    getFilters: () => useSellerStore.getState().filters,
    getSearchTerm: () => useSellerStore.getState().searchTerm,
};

/**
 * Usage Examples:
 * 
 * // Load sellers in a marketplace component:
 * import { useSellerStore } from '../store/sellerStore';
 * 
 * function SellerMarketplace() {
 *   const { loadSellers, getFilteredSellers, setFilters } = useSellerStore();
 *   const sellers = useSellerStore(state => state.getFilteredSellers());
 *   
 *   useEffect(() => {
 *     loadSellers();
 *   }, []);
 * }
 * 
 * // Update seller business information:
 * function SellerBusinessProfile({ sellerId }) {
 *   const { updateSellerBusiness, getSellerById } = useSellerStore();
 *   const seller = useSellerStore(state => state.getSellerById(sellerId));
 *   
 *   const handleUpdateBusiness = async (businessData) => {
 *     await updateSellerBusiness(sellerId, businessData);
 *   };
 * }
 */
