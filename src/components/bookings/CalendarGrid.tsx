import React from 'react';
import { format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { Booking } from '../../types';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  currentDate: Date;
  daysInMonth: Date[];
  selectedDate: Date | null;
  bookings: Booking[];
  onDateClick: (date: Date) => void;
}

export default function CalendarGrid({
  currentDate,
  daysInMonth,
  selectedDate,
  bookings,
  onDateClick,
}: CalendarGridProps) {
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(date, booking.startDate) || isSameDay(date, booking.endDate) ||
      (date > booking.startDate && date < booking.endDate)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {daysInMonth.map((date) => (
          <CalendarDay
            key={date.toString()}
            date={date}
            bookings={getBookingsForDate(date)}
            isCurrentMonth={isSameMonth(date, currentDate)}
            isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
            isToday={isToday(date)}
            onClick={() => onDateClick(date)}
          />
        ))}
      </div>
    </div>
  );
}