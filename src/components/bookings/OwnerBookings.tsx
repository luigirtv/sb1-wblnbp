import React, { useState } from 'react';
import { Calendar, Filter, Download, TrendingUp } from 'lucide-react';
import BookingCalendar from './BookingCalendar';
import BookingStats from './BookingStats';
import BookingFilters from './BookingFilters';
import BookingExport from './BookingExport';

export default function OwnerBookings() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    propertyId: '',
    status: '',
    dateRange: { start: new Date(), end: new Date() }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Réservations</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Revenu mensuel</p>
              <p className="text-2xl font-bold">12 450 €</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Taux d'occupation</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Filter className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Prix moyen/nuit</p>
              <p className="text-2xl font-bold">245 €</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <BookingFilters
            filters={filters}
            onFilterChange={setFilters}
            showRevenue={true}
          />
          <BookingExport />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <BookingStats />
          <BookingCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}