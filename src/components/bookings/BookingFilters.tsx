import React from 'react';
import { Filter, Calendar, DollarSign } from 'lucide-react';

interface BookingFiltersProps {
  filters: {
    propertyId: string;
    status: string;
    dateRange: {
      start: Date;
      end: Date;
    };
  };
  onFilterChange: (filters: any) => void;
  showRevenue?: boolean;
  showOperational?: boolean;
}

export default function BookingFilters({
  filters,
  onFilterChange,
  showRevenue = false,
  showOperational = false
}: BookingFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Période</h3>
          <div className="mt-2 space-y-2">
            <div>
              <label className="block text-sm text-gray-600">Du</label>
              <input
                type="date"
                value={filters.dateRange.start.toISOString().split('T')[0]}
                onChange={(e) => onFilterChange({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: new Date(e.target.value) }
                })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Au</label>
              <input
                type="date"
                value={filters.dateRange.end.toISOString().split('T')[0]}
                onChange={(e) => onFilterChange({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: new Date(e.target.value) }
                })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Statut</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value=""
                checked={!filters.status}
                onChange={() => onFilterChange({ ...filters, status: '' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Tous</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="confirmed"
                checked={filters.status === 'confirmed'}
                onChange={() => onFilterChange({ ...filters, status: 'confirmed' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Confirmés</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="pending"
                checked={filters.status === 'pending'}
                onChange={() => onFilterChange({ ...filters, status: 'pending' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">En attente</span>
            </label>
          </div>
        </div>

        {showRevenue && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Revenus</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Haute saison</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Prix élevés</span>
              </label>
            </div>
          </div>
        )}

        {showOperational && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Opérations</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Check-in aujourd'hui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Check-out aujourd'hui</span>
              </label>
            </div>
          </div>
        )}

        <button
          onClick={() => onFilterChange({
            propertyId: '',
            status: '',
            dateRange: { start: new Date(), end: new Date() }
          })}
          className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}