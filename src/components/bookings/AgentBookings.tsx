import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, Plus } from 'lucide-react';
import BookingCalendar from './BookingCalendar';
import BookingFilters from './BookingFilters';
import CheckInList from './CheckInList';
import BookingModal from './BookingModal';

export default function AgentBookings() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filters, setFilters] = useState({
    propertyId: '',
    status: '',
    dateRange: { start: new Date(), end: new Date() }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Réservations</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle réservation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Check-ins aujourd'hui</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Check-outs aujourd'hui</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <BookingFilters
            filters={filters}
            onFilterChange={setFilters}
            showOperational={true}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <CheckInList />
          <BookingCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            filters={filters}
          />
        </div>
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
}