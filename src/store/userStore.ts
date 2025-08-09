import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User, LoginCredentials, SignupData } from '../types/auth';

/**
 * UserStore - Handles user authentication, session management, and user profile data
 * 
 * This store manages:
 * - User authentication state (login, signup, logout)
 * - Current user data and profile information
 * - User role and onboarding status
 * - Loading states and error handling
 * - Local storage persistence for session management
 */

interface UserState {
    // Authentication state
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => Promise<void>;
    updateUserRole: (role: "buyer" | "seller") => Promise<void>;
    completeOnboarding: (onboardingData?: any) => Promise<void>;
    clearError: () => void;
    checkAuthStatus: () => Promise<void>;

    // Getters
    getCurrentUser: () => User | null;
    isUserOnboarded: () => boolean;
    getUserRole: () => "buyer" | "seller" | null;
}

export const useUserStore = create<UserState>()(
    persist(
        immer((set, get) => ({
            // Initial state
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Authentication actions
            login: async (credentials: LoginCredentials) => {
                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                });

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    // Mock user data - in real app, this would come from your backend
                    const isSeller = credentials.email === "seller@demo.com";
                    const mockUser: User = {
                        id: "1",
                        email: credentials.email,
                        firstName: "John",
                        lastName: "Doe",
                        role: isSeller ? "seller" : "buyer",
                        company: isSeller ? "DoeFlow Solutions" : "Growth Capital Partners",
                        avatar: "JD",
                        phone: "+1 (555) 123-4567",
                        isOnboarded: true,
                        createdAt: new Date().toISOString(),
                        lastLoginAt: new Date().toISOString(),
                    };

                    // Store in localStorage (in real app, use secure token storage)
                    localStorage.setItem("dealease_user", JSON.stringify(mockUser));
                    localStorage.setItem("dealease_token", "mock_jwt_token");

                    set((state) => {
                        state.user = mockUser;
                        state.isAuthenticated = true;
                        state.isLoading = false;
                        state.error = null;
                    });
                } catch (error) {
                    set((state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                        state.isLoading = false;
                        state.error = "Invalid email or password";
                    });
                    throw error;
                }
            },

            signup: async (data: SignupData) => {
                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                });

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    // Mock user creation - in real app, this would be handled by your backend
                    const newUser: User = {
                        id: Date.now().toString(),
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        role: data.role,
                        company: data.company,
                        avatar: `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`,
                        isOnboarded: false, // New users need onboarding
                        createdAt: new Date().toISOString(),
                        lastLoginAt: new Date().toISOString(),
                    };

                    localStorage.setItem("dealease_user", JSON.stringify(newUser));
                    localStorage.setItem("dealease_token", "mock_jwt_token");

                    set((state) => {
                        state.user = newUser;
                        state.isAuthenticated = true;
                        state.isLoading = false;
                        state.error = null;
                    });
                } catch (error) {
                    set((state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                        state.isLoading = false;
                        state.error = "Signup failed. Please try again.";
                    });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem("dealease_user");
                localStorage.removeItem("dealease_token");

                set((state) => {
                    state.user = null;
                    state.isAuthenticated = false;
                    state.isLoading = false;
                    state.error = null;
                });
            },

            updateUser: async (userData: Partial<User>) => {
                const currentUser = get().user;
                if (!currentUser) return;

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    const updatedUser = { ...currentUser, ...userData };
                    localStorage.setItem("dealease_user", JSON.stringify(updatedUser));

                    set((state) => {
                        state.user = updatedUser;
                        state.error = null;
                    });
                } catch (error) {
                    set((state) => {
                        state.error = "Failed to update user";
                    });
                    throw error;
                }
            },

            updateUserRole: async (role: "buyer" | "seller") => {
                const currentUser = get().user;
                if (!currentUser) return;

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    const updatedUser = { ...currentUser, role };
                    localStorage.setItem("dealease_user", JSON.stringify(updatedUser));

                    set((state) => {
                        if (state.user) {
                            state.user.role = role;
                        }
                        state.error = null;
                    });
                } catch (error) {
                    set((state) => {
                        state.error = "Failed to update role";
                    });
                    throw error;
                }
            },

            completeOnboarding: async (onboardingData?: any) => {
                const currentUser = get().user;
                if (!currentUser) return;

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    const updatedUser = {
                        ...currentUser,
                        isOnboarded: true,
                        onboardingData: onboardingData || currentUser.onboardingData
                    };
                    localStorage.setItem("dealease_user", JSON.stringify(updatedUser));

                    set((state) => {
                        if (state.user) {
                            state.user.isOnboarded = true;
                            if (onboardingData) {
                                state.user.onboardingData = onboardingData;
                            }
                        }
                        state.error = null;
                    });
                } catch (error) {
                    set((state) => {
                        state.error = "Failed to complete onboarding";
                    });
                    throw error;
                }
            },

            clearError: () => {
                set((state) => {
                    state.error = null;
                });
            },

            checkAuthStatus: async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const userData = localStorage.getItem("dealease_user");
                    const token = localStorage.getItem("dealease_token");

                    if (userData && token) {
                        const user = JSON.parse(userData);
                        // In a real app, you'd validate the token with your backend
                        set((state) => {
                            state.user = user;
                            state.isAuthenticated = true;
                            state.isLoading = false;
                            state.error = null;
                        });
                    } else {
                        set((state) => {
                            state.user = null;
                            state.isAuthenticated = false;
                            state.isLoading = false;
                            state.error = null;
                        });
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    set((state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                        state.isLoading = false;
                        state.error = null;
                    });
                }
            },

            // Utility getters
            getCurrentUser: () => {
                return get().user;
            },

            isUserOnboarded: () => {
                const user = get().user;
                return user ? user.isOnboarded : false;
            },

            getUserRole: () => {
                const user = get().user;
                return user?.role || null;
            },
        })),
        {
            name: 'dealease-user-storage',
            // Only persist essential authentication data
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Export selectors for better performance and reusability
export const userSelectors = {
    getCurrentUser: () => useUserStore.getState().getCurrentUser(),
    isAuthenticated: () => useUserStore.getState().isAuthenticated,
    isLoading: () => useUserStore.getState().isLoading,
    isUserOnboarded: () => useUserStore.getState().isUserOnboarded(),
    getUserRole: () => useUserStore.getState().getUserRole(),
    getError: () => useUserStore.getState().error,
};

/**
 * Usage Examples:
 * 
 * // In a component:
 * import { useUserStore } from '../store/userStore';
 * 
 * function LoginComponent() {
 *   const { login, isLoading, error } = useUserStore();
 *   
 *   const handleLogin = async (credentials) => {
 *     try {
 *       await login(credentials);
 *       // Handle successful login
 *     } catch (error) {
 *       // Handle login error
 *     }
 *   };
 * }
 * 
 * // Using selectors for better performance:
 * import { useUserStore, userSelectors } from '../store/userStore';
 * 
 * function UserProfile() {
 *   const user = useUserStore(state => state.user);
 *   const updateUser = useUserStore(state => state.updateUser);
 *   
 *   // Or using selectors
 *   const isAuthenticated = useUserStore(state => state.isAuthenticated);
 * }
 */
