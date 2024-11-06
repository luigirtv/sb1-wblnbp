import { render, screen, fireEvent } from '@testing-library/react';
import BookingCalendar from '../../components/bookings/BookingCalendar';
import { Booking } from '../../types';

const mockBookings: Booking[] = [
  {
    id: '1',
    propertyId: '1',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-20'),
    tenantName: 'John Doe',
    status: 'confirmed'
  }
];

describe('BookingCalendar Component', () => {
  const mockOnDateSelect = jest.fn();

  it('renders calendar with correct month and year', () => {
    render(
      <BookingCalendar
        selectedDate={new Date('2024-03-15')}
        onDateSelect={mockOnDateSelect}
        bookings={mockBookings}
      />
    );
    
    expect(screen.getByText('Mars 2024')).toBeInTheDocument();
  });

  it('displays bookings on correct dates', () => {
    render(
      <BookingCalendar
        selectedDate={new Date('2024-03-15')}
        onDateSelect={mockOnDateSelect}
        bookings={mockBookings}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles date selection', () => {
    render(
      <BookingCalendar
        selectedDate={null}
        onDateSelect={mockOnDateSelect}
        bookings={mockBookings}
      />
    );
    
    const dateCell = screen.getByText('15');
    fireEvent.click(dateCell);
    
    expect(mockOnDateSelect).toHaveBeenCalled();
  });
});