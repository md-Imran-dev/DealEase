import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * UIStore - Manages global UI state and interactions
 * 
 * This store handles:
 * - Modal states (open/close, data passing)
 * - Toast notifications and alerts
 * - Loading states for global operations
 * - Sidebar and navigation state
 * - Theme and display preferences
 * - Form state and validation
 * - Responsive design states
 */

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number; // in milliseconds, 0 for persistent
  action?: {
    label: string;
    handler: () => void;
  };
}

interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: any;
  props?: Record<string, any>;
}

interface UIState {
  // Modal management
  modal: ModalState;
  
  // Toast notifications
  toasts: ToastNotification[];
  
  // Global loading states
  isGlobalLoading: boolean;
  loadingMessage: string | null;
  
  // Sidebar and navigation
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Theme and preferences
  theme: 'light' | 'dark' | 'auto';
  compactMode: boolean;
  
  // Responsive states
  isMobile: boolean;
  isTablet: boolean;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Form states
  activeForm: string | null;
  formData: Record<string, any>;
  formErrors: Record<string, Record<string, string>>;
  
  // Page-specific UI states
  pageStates: Record<string, any>;

  // Modal actions
  openModal: (type: string, data?: any, props?: Record<string, any>) => void;
  closeModal: () => void;
  updateModalData: (data: any) => void;
  
  // Toast actions
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
  
  // Loading actions
  setGlobalLoading: (loading: boolean, message?: string) => void;
  
  // Sidebar actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Theme actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleCompactMode: () => void;
  
  // Responsive actions
  setScreenSize: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => void;
  updateResponsiveStates: (width: number) => void;
  
  // Form actions
  setActiveForm: (formId: string | null) => void;
  updateFormData: (formId: string, data: any) => void;
  setFormErrors: (formId: string, errors: Record<string, string>) => void;
  clearFormData: (formId: string) => void;
  clearFormErrors: (formId: string) => void;
  
  // Page state actions
  setPageState: (pageId: string, state: any) => void;
  updatePageState: (pageId: string, updates: any) => void;
  clearPageState: (pageId: string) => void;
  
  // Utility actions
  resetUIState: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    // Initial state
    modal: {
      isOpen: false,
      type: null,
      data: undefined,
      props: undefined,
    },
    toasts: [],
    isGlobalLoading: false,
    loadingMessage: null,
    sidebarOpen: true,
    sidebarCollapsed: false,
    theme: 'light',
    compactMode: false,
    isMobile: false,
    isTablet: false,
    screenSize: 'lg',
    activeForm: null,
    formData: {},
    formErrors: {},
    pageStates: {},

    // Modal actions
    openModal: (type: string, data?: any, props?: Record<string, any>) => {
      set((state) => {
        state.modal = {
          isOpen: true,
          type,
          data,
          props,
        };
      });
    },

    closeModal: () => {
      set((state) => {
        state.modal = {
          isOpen: false,
          type: null,
          data: undefined,
          props: undefined,
        };
      });
    },

    updateModalData: (data: any) => {
      set((state) => {
        if (state.modal.isOpen) {
          state.modal.data = data;
        }
      });
    },

    // Toast actions
    showToast: (toastData: Omit<ToastNotification, 'id'>) => {
      const toast: ToastNotification = {
        ...toastData,
        id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        duration: toastData.duration ?? 5000, // Default 5 seconds
      };

      set((state) => {
        state.toasts.push(toast);
      });

      // Auto-dismiss toast if duration is set
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          get().dismissToast(toast.id);
        }, toast.duration);
      }
    },

    dismissToast: (id: string) => {
      set((state) => {
        state.toasts = state.toasts.filter(toast => toast.id !== id);
      });
    },

    clearAllToasts: () => {
      set((state) => {
        state.toasts = [];
      });
    },

    // Loading actions
    setGlobalLoading: (loading: boolean, message?: string) => {
      set((state) => {
        state.isGlobalLoading = loading;
        state.loadingMessage = message || null;
      });
    },

    // Sidebar actions
    toggleSidebar: () => {
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      });
    },

    setSidebarOpen: (open: boolean) => {
      set((state) => {
        state.sidebarOpen = open;
      });
    },

    toggleSidebarCollapsed: () => {
      set((state) => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
      });
    },

    setSidebarCollapsed: (collapsed: boolean) => {
      set((state) => {
        state.sidebarCollapsed = collapsed;
      });
    },

    // Theme actions
    setTheme: (theme: 'light' | 'dark' | 'auto') => {
      set((state) => {
        state.theme = theme;
      });
      
      // In a real app, you might want to persist this to localStorage
      localStorage.setItem('dealease-theme', theme);
    },

    toggleCompactMode: () => {
      set((state) => {
        state.compactMode = !state.compactMode;
      });
      
      // Persist compact mode preference
      localStorage.setItem('dealease-compact-mode', get().compactMode.toString());
    },

    // Responsive actions
    setScreenSize: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
      set((state) => {
        state.screenSize = size;
      });
    },

    updateResponsiveStates: (width: number) => {
      set((state) => {
        state.isMobile = width < 768;
        state.isTablet = width >= 768 && width < 1024;
        
        if (width < 640) {
          state.screenSize = 'xs';
        } else if (width < 768) {
          state.screenSize = 'sm';
        } else if (width < 1024) {
          state.screenSize = 'md';
        } else if (width < 1280) {
          state.screenSize = 'lg';
        } else {
          state.screenSize = 'xl';
        }
        
        // Auto-collapse sidebar on mobile
        if (state.isMobile && state.sidebarOpen) {
          state.sidebarOpen = false;
        }
      });
    },

    // Form actions
    setActiveForm: (formId: string | null) => {
      set((state) => {
        state.activeForm = formId;
      });
    },

    updateFormData: (formId: string, data: any) => {
      set((state) => {
        if (!state.formData[formId]) {
          state.formData[formId] = {};
        }
        state.formData[formId] = { ...state.formData[formId], ...data };
      });
    },

    setFormErrors: (formId: string, errors: Record<string, string>) => {
      set((state) => {
        state.formErrors[formId] = errors;
      });
    },

    clearFormData: (formId: string) => {
      set((state) => {
        delete state.formData[formId];
      });
    },

    clearFormErrors: (formId: string) => {
      set((state) => {
        delete state.formErrors[formId];
      });
    },

    // Page state actions
    setPageState: (pageId: string, pageState: any) => {
      set((state) => {
        state.pageStates[pageId] = pageState;
      });
    },

    updatePageState: (pageId: string, updates: any) => {
      set((state) => {
        if (!state.pageStates[pageId]) {
          state.pageStates[pageId] = {};
        }
        state.pageStates[pageId] = { ...state.pageStates[pageId], ...updates };
      });
    },

    clearPageState: (pageId: string) => {
      set((state) => {
        delete state.pageStates[pageId];
      });
    },

    // Utility actions
    resetUIState: () => {
      set((state) => {
        state.modal = { isOpen: false, type: null };
        state.toasts = [];
        state.isGlobalLoading = false;
        state.loadingMessage = null;
        state.activeForm = null;
        state.formData = {};
        state.formErrors = {};
        state.pageStates = {};
      });
    },
  }))
);

// Export selectors for better performance and reusability
export const uiSelectors = {
  // Modal selectors
  isModalOpen: () => useUIStore.getState().modal.isOpen,
  getModalType: () => useUIStore.getState().modal.type,
  getModalData: () => useUIStore.getState().modal.data,
  getModalProps: () => useUIStore.getState().modal.props,
  
  // Toast selectors
  getToasts: () => useUIStore.getState().toasts,
  
  // Loading selectors
  isGlobalLoading: () => useUIStore.getState().isGlobalLoading,
  getLoadingMessage: () => useUIStore.getState().loadingMessage,
  
  // Sidebar selectors
  isSidebarOpen: () => useUIStore.getState().sidebarOpen,
  isSidebarCollapsed: () => useUIStore.getState().sidebarCollapsed,
  
  // Theme selectors
  getTheme: () => useUIStore.getState().theme,
  isCompactMode: () => useUIStore.getState().compactMode,
  
  // Responsive selectors
  isMobile: () => useUIStore.getState().isMobile,
  isTablet: () => useUIStore.getState().isTablet,
  getScreenSize: () => useUIStore.getState().screenSize,
  
  // Form selectors
  getActiveForm: () => useUIStore.getState().activeForm,
  getFormData: (formId: string) => useUIStore.getState().formData[formId] || {},
  getFormErrors: (formId: string) => useUIStore.getState().formErrors[formId] || {},
  
  // Page state selectors
  getPageState: (pageId: string) => useUIStore.getState().pageStates[pageId] || {},
};

// Initialize responsive states from window size
if (typeof window !== 'undefined') {
  const updateResponsiveStates = useUIStore.getState().updateResponsiveStates;
  updateResponsiveStates(window.innerWidth);
  
  // Listen for window resize events
  window.addEventListener('resize', () => {
    updateResponsiveStates(window.innerWidth);
  });
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('dealease-theme') as 'light' | 'dark' | 'auto';
  if (savedTheme) {
    useUIStore.getState().setTheme(savedTheme);
  }
  
  // Load saved compact mode preference
  const savedCompactMode = localStorage.getItem('dealease-compact-mode');
  if (savedCompactMode === 'true') {
    useUIStore.getState().toggleCompactMode();
  }
}

/**
 * Usage Examples:
 * 
 * // Show a toast notification:
 * import { useUIStore } from '../store/uiStore';
 * 
 * function MyComponent() {
 *   const { showToast } = useUIStore();
 *   
 *   const handleSuccess = () => {
 *     showToast({
 *       type: 'success',
 *       title: 'Success!',
 *       message: 'Operation completed successfully',
 *       duration: 3000
 *     });
 *   };
 * }
 * 
 * // Open a modal:
 * function OpenModalButton() {
 *   const { openModal } = useUIStore();
 *   
 *   const handleOpenModal = () => {
 *     openModal('editProfile', { userId: '123' }, { allowClose: true });
 *   };
 * }
 * 
 * // Use responsive state:
 * function ResponsiveComponent() {
 *   const isMobile = useUIStore(state => state.isMobile);
 *   const screenSize = useUIStore(state => state.screenSize);
 *   
 *   return (
 *     <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
 *       Current screen size: {screenSize}
 *     </div>
 *   );
 * }
 * 
 * // Manage form state:
 * function MyForm() {
 *   const { updateFormData, getFormData, setFormErrors } = useUIStore();
 *   const formData = useUIStore(state => state.formData['myForm'] || {});
 *   
 *   const handleInputChange = (field, value) => {
 *     updateFormData('myForm', { [field]: value });
 *   };
 * }
 */
