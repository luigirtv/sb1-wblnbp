import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReportFiltersProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  selectedProperties: string[];
  onPropertyChange: (properties: string[]) => void;
}

export default function ReportFilters({
  dateRange,
  onDateRangeChange,
  selectedProperties,
  onPropertyChange
}: ReportFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={`${format(dateRange.start, 'yyyy-MM-dd')}/${format(dateRange.end, 'yyyy-MM-dd')}`}
            onChange={(e) => {
              const [start, end] = e.target.value.split('/').map(d => new Date(d));
              onDateRangeChange({ start, end });
            }}
          >
            <option value="custom">Période personnalisée</option>
            <option value="last30">30 derniers jours</option>
            <option value="last90">90 derniers jours</option>
            <option value="thisYear">Cette année</option>
            <option value="lastYear">Année dernière</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
            value={selectedProperties}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(option => option.value);
              onPropertyChange(selected);
            }}
          >
            <option value="all">Toutes les propriétés</option>
            <option value="1">Villa Sunset</option>
            <option value="2">Ocean View Apartment</option>
            <option value="3">Mountain Lodge</option>
          </select>
        </div>

        <button
          className="ml-auto px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={() => {
            onDateRangeChange({
              start: new Date(),
              end: new Date()
            });
            onPropertyChange([]);
          }}
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}