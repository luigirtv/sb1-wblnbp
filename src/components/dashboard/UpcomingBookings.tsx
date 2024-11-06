import React from 'react';
import { Calendar, User, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  property: string;
  guest: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending';
}

const bookings: Booking[] = [
  {
    id: '1',
    property: 'Villa Sunset',
    guest: 'Alice Johnson',
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'confirmed'
  },
  {
    id: '2',
    property: 'Ocean View',
    guest: 'Bob Smith',
    checkIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'pending'
  }
];

export default function UpcomingBookings() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Réservations à venir</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir toutes les réservations
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {booking.property}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {booking.guest}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booking.property}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {booking.checkIn.toLocaleDateString()} - {booking.checkOut.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                Détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}