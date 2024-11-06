import React, { useState } from 'react';
import { FileDown, FileText, Table } from 'lucide-react';
import { format } from 'date-fns';
import { Booking, Property } from '../../types';

interface ExportBookingsProps {
  bookings: Booking[];
  properties: Property[];
}

export default function ExportBookings({ bookings, properties }: ExportBookingsProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV(bookings, properties);
    } else {
      exportToPDF(bookings, properties);
    }
  };

  const exportToCSV = (bookings: Booking[], properties: Property[]) => {
    const headers = ['Property', 'Tenant', 'Start Date', 'End Date', 'Status'];
    const rows = bookings.map(booking => {
      const property = properties.find(p => p.id === booking.propertyId);
      return [
        property?.title || '',
        booking.tenantName,
        format(booking.startDate, 'yyyy-MM-dd'),
        format(booking.endDate, 'yyyy-MM-dd'),
        booking.status
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bookings_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const exportToPDF = (bookings: Booking[], properties: Property[]) => {
    // PDF export implementation would go here
    // For now, we'll show an alert
    alert('PDF export functionality coming soon!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Export Bookings</h3>
        <FileDown className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setExportFormat('csv')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              exportFormat === 'csv'
                ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <Table className="h-5 w-5 mr-2" />
            CSV
          </button>
          <button
            onClick={() => setExportFormat('pdf')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              exportFormat === 'pdf'
                ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <FileText className="h-5 w-5 mr-2" />
            PDF
          </button>
        </div>

        <button
          onClick={handleExport}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export {exportFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
}