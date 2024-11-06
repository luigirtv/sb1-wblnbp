import React from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

interface CheckIn {
  id: string;
  property: string;
  guest: string;
  checkInTime: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const checkIns: CheckIn[] = [
  {
    id: '1',
    property: 'Villa Sunset',
    guest: 'Alice Johnson',
    checkInTime: '14:00',
    status: 'pending'
  },
  {
    id: '2',
    property: 'Ocean View',
    guest: 'Bob Smith',
    checkInTime: '15:00',
    status: 'in_progress'
  },
  {
    id: '3',
    property: 'Mountain Lodge',
    guest: 'Carol White',
    checkInTime: '16:00',
    status: 'completed'
  }
];

export default function CheckInList() {
  const getStatusColor = (status: CheckIn['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Check-ins d'aujourd'hui</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {checkIns.map((checkIn) => (
          <div key={checkIn.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{checkIn.property}</h4>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {checkIn.guest}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {checkIn.checkInTime}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {checkIn.property}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(checkIn.status)}`}>
                  {checkIn.status === 'pending' ? 'À venir' :
                   checkIn.status === 'in_progress' ? 'En cours' : 'Terminé'}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}