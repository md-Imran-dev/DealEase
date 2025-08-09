/**
 * Zustand Store Index
 * 
 * Central export point for all Zustand stores and their selectors.
 * This file provides easy imports and re-exports all store functionality.
 */

// Import stores for internal use
import { useUserStore, userSelectors } from './userStore';
import { useBuyerStore, buyerSelectors } from './buyerStore';
import { useSellerStore, sellerSelectors } from './sellerStore';
import { useMatchStore, matchSelectors } from './matchStore';
import { useChatStore, chatSelectors } from './chatStore';
import { useDealStore, dealSelectors } from './dealStore';
import { useUIStore, uiSelectors } from './uiStore';

// Store exports
export { useUserStore, userSelectors } from './userStore';
export { useBuyerStore, buyerSelectors } from './buyerStore';
export { useSellerStore, sellerSelectors } from './sellerStore';
export { useMatchStore, matchSelectors } from './matchStore';
export { useChatStore, chatSelectors } from './chatStore';
export { useDealStore, dealSelectors } from './dealStore';
export { useUIStore, uiSelectors } from './uiStore';

// Re-export types for convenience
export type { User, LoginCredentials, SignupData } from '../types/auth';
export type { BuyerProfile, BuyerFilters } from '../types/buyer';
export type { SellerProfile } from '../types/seller';
export type { Match, Message, Notification, MatchFilters } from '../types/match';
export type {
  AcquisitionDeal,
  DealStageData,
  DealDocument,
  DealActivity,
  DealFilters
} from '../types/acquisition';

/**
 * Store initialization hook
 * 
 * This hook should be called once at the app level to initialize all stores
 * with their respective data. It handles the initial loading of data from
 * APIs or mock data sources.
 */
export const useInitializeStores = () => {
  const { checkAuthStatus } = useUserStore();
  const { loadBuyers } = useBuyerStore();
  const { loadSellers } = useSellerStore();
  const { loadMatches } = useMatchStore();
  const { loadMessages, loadNotifications } = useChatStore();
  const { loadDeals } = useDealStore();

  const initializeStores = async () => {
    try {
      // Initialize auth first
      await checkAuthStatus();

      // Then load all other data in parallel
      await Promise.all([
        loadBuyers(),
        loadSellers(),
        loadMatches(),
        loadMessages(),
        loadNotifications(),
        loadDeals(),
      ]);
    } catch (error) {
      console.error('Failed to initialize stores:', error);
    }
  };

  return { initializeStores };
};

/**
 * Store reset utility
 * 
 * Resets all stores to their initial state. Useful for logout scenarios
 * or when switching between different user contexts.
 */
export const resetAllStores = () => {
  // Reset user store
  useUserStore.getState().logout();

  // Reset UI store
  useUIStore.getState().resetUIState();

  // Reset other stores by clearing their data
  useBuyerStore.setState({
    buyers: [],
    currentBuyer: null,
    filters: {},
    searchTerm: '',
    error: null,
  });

  useSellerStore.setState({
    sellers: [],
    currentSeller: null,
    filters: {},
    searchTerm: '',
    error: null,
  });

  useMatchStore.setState({
    matches: [],
    filters: {},
    searchTerm: '',
    error: null,
  });

  useChatStore.setState({
    messages: [],
    notifications: [],
    currentMatchId: null,
    typingUsers: {},
    error: null,
  });

  useDealStore.setState({
    deals: [],
    currentDeal: null,
    filters: {},
    searchTerm: '',
    error: null,
  });
};

/**
 * Global error handler
 * 
 * Utility function to handle errors across all stores consistently.
 * Shows toast notifications for errors and logs them appropriately.
 */
export const handleGlobalError = (error: Error | string, context?: string) => {
  const { showToast } = useUIStore.getState();

  const errorMessage = typeof error === 'string' ? error : error.message;
  const title = context ? `${context} Error` : 'Error';

  showToast({
    type: 'error',
    title,
    message: errorMessage,
    duration: 5000,
  });

  // Log error for debugging
  console.error(`${title}:`, error);
};

/**
 * Global success handler
 * 
 * Utility function to show success messages consistently across the app.
 */
export const handleGlobalSuccess = (message: string, title = 'Success') => {
  const { showToast } = useUIStore.getState();

  showToast({
    type: 'success',
    title,
    message,
    duration: 3000,
  });
};

/**
 * Store debugging utilities
 * 
 * Development utilities for debugging store state and actions.
 */
export const storeDebugUtils = {
  // Log current state of all stores
  logAllStoreStates: () => {
    console.group('Store States');
    console.log('User Store:', useUserStore.getState());
    console.log('Buyer Store:', useBuyerStore.getState());
    console.log('Seller Store:', useSellerStore.getState());
    console.log('Match Store:', useMatchStore.getState());
    console.log('Chat Store:', useChatStore.getState());
    console.log('Deal Store:', useDealStore.getState());
    console.log('UI Store:', useUIStore.getState());
    console.groupEnd();
  },

  // Get store sizes for performance monitoring
  getStoreSizes: () => {
    return {
      buyers: useBuyerStore.getState().buyers.length,
      sellers: useSellerStore.getState().sellers.length,
      matches: useMatchStore.getState().matches.length,
      messages: useChatStore.getState().messages.length,
      notifications: useChatStore.getState().notifications.length,
      deals: useDealStore.getState().deals.length,
    };
  },

  // Clear all errors across stores
  clearAllErrors: () => {
    useUserStore.getState().clearError();
    useBuyerStore.getState().clearError();
    useSellerStore.getState().clearError();
    useMatchStore.getState().clearError();
    useChatStore.getState().clearError();
    useDealStore.getState().clearError();
  },
};

/**
 * Usage Examples:
 * 
 * // Initialize stores at app level:
 * import { useInitializeStores } from './store';
 * 
 * function App() {
 *   const { initializeStores } = useInitializeStores();
 *   
 *   useEffect(() => {
 *     initializeStores();
 *   }, []);
 * }
 * 
 * // Use multiple stores in a component:
 * import { useUserStore, useBuyerStore, useUIStore } from './store';
 * 
 * function Dashboard() {
 *   const user = useUserStore(state => state.user);
 *   const buyers = useBuyerStore(state => state.getFilteredBuyers());
 *   const { showToast } = useUIStore();
 * }
 * 
 * // Handle errors consistently:
 * import { handleGlobalError, handleGlobalSuccess } from './store';
 * 
 * async function someAction() {
 *   try {
 *     await performAction();
 *     handleGlobalSuccess('Action completed successfully');
 *   } catch (error) {
 *     handleGlobalError(error, 'Action');
 *   }
 * }
 */
