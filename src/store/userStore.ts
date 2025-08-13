import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User, LoginCredentials, SignupData } from '../types/auth';
import { authService, databaseService } from '../lib/Appwrite';

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
                    // Authenticate with Appwrite
                    await authService.login(credentials.email, credentials.password);

                    // Get the current user from Appwrite
                    const appwriteUser = await authService.getCurrentUser();

                    // Try to get user profile from database
                    let userProfile = null;
                    try {
                        userProfile = await databaseService.getUserProfile(appwriteUser.$id);
                    } catch (profileError) {
                        // Profile doesn't exist yet - this is normal for new users
                        console.log("User profile not found, will be created during onboarding");
                    }

                    // Create user object
                    const user: User = {
                        id: appwriteUser.$id,
                        email: appwriteUser.email,
                        firstName: userProfile?.firstName || appwriteUser.name?.split(' ')[0] || '',
                        lastName: userProfile?.lastName || appwriteUser.name?.split(' ')[1] || '',
                        role: userProfile?.role || null,
                        company: userProfile?.company || '',
                        avatar: userProfile?.firstName?.[0] || appwriteUser.name?.[0] || 'U',
                        phone: userProfile?.phone || '',
                        isOnboarded: !!userProfile?.role, // User is onboarded if they have a role
                        createdAt: appwriteUser.$createdAt,
                        lastLoginAt: new Date().toISOString(),
                    };

                    set((state) => {
                        state.user = user;
                        state.isAuthenticated = true;
                        state.isLoading = false;
                        state.error = null;
                    });
                } catch (error) {
                    console.error('Login error:', error);
                    set((state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                        state.isLoading = false;
                        state.error = error instanceof Error ? error.message : "Login failed";
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

            logout: async () => {
                try {
                    // Logout from Appwrite
                    await authService.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                }

                // Clear local state regardless of Appwrite logout result
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
                    // Create or update user profile in Appwrite database
                    const profileData = {
                        userId: currentUser.id,
                        role,
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        company: currentUser.company || '',
                        phone: currentUser.phone || '',
                        location: currentUser.location || '',
                    };

                    // Try to create user profile (this will work for new users)
                    try {
                        await databaseService.createUserProfile(currentUser.id, profileData);
                    } catch (error) {
                        // If profile already exists, update it
                        await databaseService.updateUserProfile(currentUser.id, profileData);
                    }

                    // Update local state
                    set((state) => {
                        if (state.user) {
                            state.user.role = role;
                            state.user.isOnboarded = true; // User is now onboarded with a role
                        }
                        state.error = null;
                    });
                } catch (error) {
                    console.error('Update role error:', error);
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
                    // Check if there's an active Appwrite session
                    const appwriteUser = await authService.getCurrentUser();

                    if (appwriteUser) {
                        // User is authenticated, get their profile
                        let userProfile = null;
                        try {
                            userProfile = await databaseService.getUserProfile(appwriteUser.$id);
                        } catch (profileError) {
                            console.log("User profile not found");
                        }

                        const user: User = {
                            id: appwriteUser.$id,
                            email: appwriteUser.email,
                            firstName: userProfile?.firstName || appwriteUser.name?.split(' ')[0] || '',
                            lastName: userProfile?.lastName || appwriteUser.name?.split(' ')[1] || '',
                            role: userProfile?.role || null,
                            company: userProfile?.company || '',
                            avatar: userProfile?.firstName?.[0] || appwriteUser.name?.[0] || 'U',
                            phone: userProfile?.phone || '',
                            isOnboarded: !!userProfile?.role,
                            createdAt: appwriteUser.$createdAt,
                            lastLoginAt: new Date().toISOString(),
                        };

                        set((state) => {
                            state.user = user;
                            state.isAuthenticated = true;
                            state.isLoading = false;
                            state.error = null;
                        });
                    } else {
                        // No active session
                        set((state) => {
                            state.user = null;
                            state.isAuthenticated = false;
                            state.isLoading = false;
                            state.error = null;
                        });
                    }
                } catch (error) {
                    // No active session or error
                    console.log("No active session");
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
