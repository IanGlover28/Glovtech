import { create } from 'zustand';
import { User } from '../types/User';
import authService from '../services/authService';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "staff";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  clearError: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login({ email, password });
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Login failed'
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    
    const validRoles = ["admin", "staff"] as const;
    const role = validRoles.includes(userData.role as any) ? userData.role : undefined;

    try {
      await authService.register({ ...userData, role });
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Registration failed'
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  fetchCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.fetchCurrentUser();
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  }
}));
