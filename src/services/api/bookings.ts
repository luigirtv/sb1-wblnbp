import { apiClient } from './client';
import { Booking } from '../../types';

export const bookingService = {
  async getAll(filters?: {
    propertyId?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Booking[]> {
    const { data } = await apiClient.get('/bookings', { params: filters });
    return data;
  },

  async getById(id: string): Promise<Booking> {
    const { data } = await apiClient.get(`/bookings/${id}`);
    return data;
  },

  async create(booking: Omit<Booking, 'id'>): Promise<Booking> {
    const { data } = await apiClient.post('/bookings', booking);
    return data;
  },

  async update(id: string, booking: Partial<Booking>): Promise<Booking> {
    const { data } = await apiClient.put(`/bookings/${id}`, booking);
    return data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/bookings/${id}`);
  },

  async confirmBooking(id: string): Promise<Booking> {
    const { data } = await apiClient.post(`/bookings/${id}/confirm`);
    return data;
  },

  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    const { data } = await apiClient.post(`/bookings/${id}/cancel`, { reason });
    return data;
  },

  async getStats(filters?: {
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<{
    totalBookings: number;
    totalRevenue: number;
    averageStayDuration: number;
    occupancyRate: number;
  }> {
    const { data } = await apiClient.get('/bookings/stats', { params: filters });
    return data;
  }
};