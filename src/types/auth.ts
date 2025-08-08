export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: "buyer" | "seller";
  avatar?: string;
  company?: string;
  phone?: string;
  isOnboarded: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: "buyer" | "seller";
  company?: string;
  agreeToTerms: boolean;
}



export interface RoleInfo {
  id: "buyer" | "seller";
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}
