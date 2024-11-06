import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Booking } from '../../types';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  filters?: {
    propertyId?: string;
    status?: string;
    dateRange?: { start: Date; end: Date };
  };
}

export default function BookingCalendar({
  selectedDate,
  onDateSelect,
  filters
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Sample bookings data - replace with actual data
  const bookings: Booking[] = [
    {
      id: '1',
      propertyId: '1',
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
      tenantName: 'Alice Johnson',
      status: 'confirmed'
    },
    {
      id: '2',
      propertyId: '2',
      startDate: new Date(2024, 2, 18),
      endDate: new Date(2024, 2, 25),
      tenantName: 'Bob Smith',
      status: 'pending'
    }
  ];

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(date, booking.startDate) || 
      isSameDay(date, booking.endDate) ||
      (date > booking.startDate && date < booking.endDate)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {daysInMonth.map((date) => {
          const dayBookings = getBookingsForDate(date);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          
          return (
            <div
              key={date.toString()}
              className={`min-h-[120px] bg-white p-2 ${
                !isSameMonth(date, currentDate) ? 'bg-gray-50' : ''
              } hover:bg-gray-50 cursor-pointer`}
              onClick={() => onDateSelect(date)}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    isToday(date)
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                      : isSelected
                      ? 'text-blue-600'
                      : 'text-gray-900'
                  }`}
                >
                  {format(date, 'd')}
                </span>
                {dayBookings.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {dayBookings.length} réservation{dayBookings.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-1">
                {dayBookings.map((booking) => (
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
        })}
      </div>
    </div>
  );
}