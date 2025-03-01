export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'staff';
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'staff';
  }
  
  export interface ResetPasswordData {
    token: string;
    newPassword: string;
  }