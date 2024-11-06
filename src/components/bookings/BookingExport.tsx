import React, { useState } from 'react';
import { FileDown, FileText, Table } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Booking, Property } from '../../types';
import { generatePDF } from '../../services/export/pdfGenerator';

interface BookingExportProps {
  bookings: Booking[];
  properties: Property[];
}

export default function BookingExport({ bookings, properties }: BookingExportProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      if (exportFormat === 'csv') {
        await exportToCSV(bookings, properties);
      } else {
        await exportToPDF(bookings, properties);
      }
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = async (bookings: Booking[], properties: Property[]) => {
    const headers = ['Propriété', 'Locataire', 'Date de début', 'Date de fin', 'Statut', 'Prix'];
    const rows = bookings.map(booking => {
      const property = properties.find(p => p.id === booking.propertyId);
      return [
        property?.title || '',
        booking.tenantName,
        format(booking.startDate, 'dd/MM/yyyy', { locale: fr }),
        format(booking.endDate, 'dd/MM/yyyy', { locale: fr }),
        booking.status === 'confirmed' ? 'Confirmé' : 'En attente',
        property ? `${property.price}€` : ''
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reservations_${format(new Date(), 'dd-MM-yyyy')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async (bookings: Booking[], properties: Property[]) => {
    await generatePDF(bookings, properties);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Exporter les Réservations</h3>
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
          disabled={isExporting}
          className={`w-full px-4 py-2 rounded-lg transition-colors ${
            isExporting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isExporting ? (
            'Export en cours...'
          ) : (
            `Exporter en ${exportFormat.toUpperCase()}`
          )}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-2">Le fichier exporté contiendra :</p>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>Détails des propriétés</li>
            <li>Informations des locataires</li>
            <li>Dates et durées de séjour</li>
            <li>Statuts des réservations</li>
            <li>Montants et paiements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}