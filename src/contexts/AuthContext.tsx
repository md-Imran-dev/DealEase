import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  AuthState,
  LoginCredentials,
  SignupData,
  User,
} from "../types/auth";

// AuthContext interface
export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => Promise<void>;
  updateUserRole: (role: "buyer" | "seller") => Promise<void>;
  completeOnboarding: () => Promise<void>;
  clearError: () => void;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_USER"; payload: Partial<User> };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = localStorage.getItem("dealease_user");
      const token = localStorage.getItem("dealease_token");

      if (userData && token) {
        const user = JSON.parse(userData);
        // In a real app, you'd validate the token with your backend
        dispatch({ type: "AUTH_SUCCESS", payload: user });
      } else {
        dispatch({ type: "AUTH_LOGOUT" });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      dispatch({ type: "AUTH_LOGOUT" });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      // Simulate API call
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

      dispatch({ type: "AUTH_SUCCESS", payload: mockUser });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: "Invalid email or password" });
      throw error;
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      // Simulate API call
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

      dispatch({ type: "AUTH_SUCCESS", payload: newUser });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: "Signup failed. Please try again.",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("dealease_user");
    localStorage.removeItem("dealease_token");
    dispatch({ type: "AUTH_LOGOUT" });
  };

  const updateUser = async (userData: User): Promise<void> => {
    if (!state.user) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem("dealease_user", JSON.stringify(updatedUser));

      dispatch({ type: "UPDATE_USER", payload: userData });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: "Failed to update user" });
      throw error;
    }
  };

  const updateUserRole = async (role: "buyer" | "seller"): Promise<void> => {
    if (!state.user) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, role };
      localStorage.setItem("dealease_user", JSON.stringify(updatedUser));

      dispatch({ type: "UPDATE_USER", payload: { role } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: "Failed to update role" });
      throw error;
    }
  };

  const completeOnboarding = async (): Promise<void> => {
    if (!state.user) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, isOnboarded: true };
      localStorage.setItem("dealease_user", JSON.stringify(updatedUser));

      dispatch({ type: "UPDATE_USER", payload: { isOnboarded: true } });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: "Failed to complete onboarding",
      });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    updateUser,
    updateUserRole,
    completeOnboarding,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
