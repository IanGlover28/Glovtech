import api from './api';
import { User, LoginCredentials, RegisterData, ResetPasswordData } from '../types/User';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/api/v1/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post('/api/v1/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  requestPasswordReset: async (email: string) => {
    const response = await api.post('/auth/reset-password-request', { email });
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  // Fetches the current user from the API (useful to get fresh data)
  fetchCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export default authService;