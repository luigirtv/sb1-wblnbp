import React from 'react';
import { format } from 'date-fns';
import { Booking } from '../../types';

interface CalendarDayProps {
  date: Date;
  bookings: Booking[];
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
}

export default function CalendarDay({
  date,
  bookings,
  isCurrentMonth,
  isSelected,
  isToday,
  onClick,
}: CalendarDayProps) {
  return (
    <div
      className={`min-h-[120px] bg-white p-2 ${
        !isCurrentMonth ? 'bg-gray-50' : ''
      } hover:bg-gray-50 cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            isToday
              ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
              : isSelected
              ? 'text-blue-600'
              : 'text-gray-900'
          }`}
        >
          {format(date, 'd')}
        </span>
        {bookings.length > 0 && (
          <span className="text-xs text-gray-500">
            {bookings.length} booking{bookings.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className="mt-2 space-y-1">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`text-xs p-1 rounded truncate ${
              booking.status === 'confirmed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {booking.tenantName}
          </div>
        ))}
      </div>
    </div>
  );
}