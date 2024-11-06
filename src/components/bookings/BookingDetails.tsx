import React from 'react';
import { Calendar, Clock, User, Mail, Phone, X } from 'lucide-react';
import { format } from 'date-fns';
import { Booking } from '../../types';

interface BookingDetailsProps {
  booking: Booking;
  onClose: () => void;
}

export default function BookingDetails({ booking, onClose }: BookingDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">
              {format(booking.startDate, 'MMM d, yyyy')} - {format(booking.endDate, 'MMM d, yyyy')}
            </p>
            <p className="text-gray-500">Duration: {Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))} days</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{booking.tenantName}</p>
            <p className="text-gray-500">Tenant</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">tenant@example.com</p>
            <p className="text-gray-500">Email</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <Phone className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
            <p className="text-gray-500">Phone</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              booking.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>
            <p className="text-gray-500">Status</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex space-x-3">
          <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Edit Booking
          </button>
          <button className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}