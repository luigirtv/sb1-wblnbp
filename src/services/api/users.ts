import { apiClient } from './client';
import { User } from '../../types/auth';

export const userService = {
  async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get('/users/me');
    return data;
  },

  async getAllUsers(): Promise<User[]> {
    const { data } = await apiClient.get('/users');
    return data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data } = await apiClient.put('/users/me', updates);
    return data;
  },

  async updateUserRole(userId: string, role: string): Promise<User> {
    const { data } = await apiClient.put(`/users/${userId}/role`, { role });
    return data;
  },

  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/users/${userId}`);
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.put('/users/me/password', {
      currentPassword,
      newPassword
    });
  },

  async getNotificationPreferences(): Promise<{
    email: boolean;
    push: boolean;
    sms: boolean;
    types: string[];
  }> {
    const { data } = await apiClient.get('/users/me/notification-preferences');
    return data;
  },

  async updateNotificationPreferences(preferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
    types: string[];
  }): Promise<void> {
    await apiClient.put('/users/me/notification-preferences', preferences);
  }
};