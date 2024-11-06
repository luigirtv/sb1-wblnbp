import { apiClient } from './client';
import { LoginCredentials, RegisterData, User } from '../../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const { data } = await apiClient.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(userData: RegisterData): Promise<{ token: string; user: User }> {
    const { data } = await apiClient.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async refreshToken(): Promise<{ token: string }> {
    const { data } = await apiClient.post('/auth/refresh-token');
    localStorage.setItem('token', data.token);
    return data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      newPassword
    });
  }
};