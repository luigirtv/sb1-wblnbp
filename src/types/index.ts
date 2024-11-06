// Property types
export type PropertyStatus = 'available' | 'rented' | 'maintenance';

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  images: string[];
  status: PropertyStatus;
  ownerId: string;
  managingAgents: string[];
  amenities?: string[];
}

// Booking types
export interface Booking {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  tenantName: string;
  status: 'confirmed' | 'pending';
}

// Document types
export interface Document {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: Date;
  lastModified: Date;
  propertyId?: string;
  permissions: {
    view: string[];
    edit: string[];
  };
  tags: string[];
  status: 'active' | 'archived';
  version: number;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'message' | 'alert' | 'system' | 'reminder';
  timestamp: Date;
  read: boolean;
  metadata?: Record<string, any>;
}

// Report types
export interface ReportPreference {
  id: string;
  name: string;
  filters: {
    dateRange: {
      start: Date;
      end: Date;
    };
    properties: string[];
    metrics: string[];
  };
  createdAt: Date;
}

export interface PropertyMetrics {
  revenue: number;
  occupancyRate: number;
  averagePrice: number;
  bookings: number;
  trend: number;
}

export interface ReportData {
  id: string;
  type: 'revenue' | 'occupancy' | 'bookings' | 'maintenance';
  period: {
    start: Date;
    end: Date;
  };
  metrics: PropertyMetrics;
  propertyId?: string;
  createdAt: Date;
  format: 'pdf' | 'csv';
}

export interface ReportFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  properties: string[];
  metrics: string[];
  groupBy?: 'day' | 'week' | 'month' | 'year';
  comparison?: 'previous_period' | 'previous_year';
}