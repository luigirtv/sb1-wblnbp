import React from 'react';
import { Filter, TrendingUp, Calendar } from 'lucide-react';

interface PropertyFiltersProps {
  filters: {
    status: string;
    minPrice: string;
    maxPrice: string;
    amenities: string[];
  };
  onFilterChange: (filters: any) => void;
  showProfitability?: boolean;
  showAvailability?: boolean;
}

export default function PropertyFilters({
  filters,
  onFilterChange,
  showProfitability = false,
  showAvailability = false
}: PropertyFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Statut</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="all"
                checked={!filters.status}
                onChange={() => onFilterChange({ ...filters, status: '' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Toutes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="available"
                checked={filters.status === 'available'}
                onChange={() => onFilterChange({ ...filters, status: 'available' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Disponibles</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="occupied"
                checked={filters.status === 'occupied'}
                onChange={() => onFilterChange({ ...filters, status: 'occupied' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Occupées</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Prix par nuit</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {showProfitability && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Rentabilité</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Haute performance</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">En progression</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">À optimiser</span>
              </label>
            </div>
          </div>
        )}

        {showAvailability && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Disponibilité</h3>
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
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Maintenance prévue</span>
              </label>
            </div>
          </div>
        )}

        <button
          onClick={() => onFilterChange({
            status: '',
            minPrice: '',
            maxPrice: '',
            amenities: []
          })}
          className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}