import { apiClient } from './client';
import { Property } from '../../types';

// Mock data for development
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Sunset',
    description: 'Magnifique villa avec vue sur mer',
    address: '123 Rue de la Plage, 06400 Cannes',
    price: 350,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&w=1000&q=80'
    ],
    status: 'available',
    ownerId: '1',
    managingAgents: ['2', '3'],
    amenities: ['parking', 'pool', 'garden']
  },
  {
    id: '2',
    title: 'Ocean View Apartment',
    description: 'Appartement moderne face à l\'océan',
    address: '45 Boulevard des Vagues, 64200 Biarritz',
    price: 200,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&w=1000&q=80'
    ],
    status: 'rented',
    ownerId: '1',
    managingAgents: ['2'],
    amenities: ['parking', 'balcony']
  }
];

const isDevelopment = import.meta.env.DEV;

export const propertyService = {
  async getAll(): Promise<Property[]> {
    if (isDevelopment) {
      // Simulate network delay in development
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProperties;
    }
    const { data } = await apiClient.get('/properties');
    return data;
  },

  async getById(id: string): Promise<Property> {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const property = mockProperties.find(p => p.id === id);
      if (!property) throw new Error('Property not found');
      return property;
    }
    const { data } = await apiClient.get(`/properties/${id}`);
    return data;
  },

  async create(property: Omit<Property, 'id'>): Promise<Property> {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newProperty = {
        ...property,
        id: crypto.randomUUID()
      };
      mockProperties.push(newProperty);
      return newProperty;
    }
    const { data } = await apiClient.post('/properties', property);
    return data;
  },

  async update(id: string, property: Partial<Property>): Promise<Property> {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProperties.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Property not found');
      mockProperties[index] = { ...mockProperties[index], ...property };
      return mockProperties[index];
    }
    const { data } = await apiClient.put(`/properties/${id}`, property);
    return data;
  },

  async delete(id: string): Promise<void> {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProperties.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Property not found');
      mockProperties.splice(index, 1);
      return;
    }
    await apiClient.delete(`/properties/${id}`);
  },

  async getMetrics(id: string): Promise<{
    revenue: number;
    occupancyRate: number;
    averagePrice: number;
    bookings: number;
  }> {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        revenue: 12450,
        occupancyRate: 85,
        averagePrice: 245,
        bookings: 24
      };
    }
    const { data } = await apiClient.get(`/properties/${id}/metrics`);
    return data;
  }
};