import { apiClient } from './client';

export const adminService = {
  async getSystemMetrics() {
    const { data } = await apiClient.get('/admin/metrics');
    return data;
  },

  async getActivityLog(params?: {
    startDate?: Date;
    endDate?: Date;
    type?: string;
    limit?: number;
  }) {
    const { data } = await apiClient.get('/admin/activity-log', { params });
    return data;
  },

  async updateSystemSettings(settings: any) {
    const { data } = await apiClient.put('/admin/settings', settings);
    return data;
  },

  async getSystemHealth() {
    const { data } = await apiClient.get('/admin/health');
    return data;
  }
};