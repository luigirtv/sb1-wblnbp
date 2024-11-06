import { Booking, Property } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function generatePDF(bookings: Booking[], properties: Property[]) {
  // Note: In a real application, we would use a PDF library like pdfmake
  // For this example, we'll create a simple HTML-to-PDF conversion
  const content = generatePDFContent(bookings, properties);
  
  // Create a Blob from the HTML content
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Open in a new window for printing
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  }
}

function generatePDFContent(bookings: Booking[], properties: Property[]): string {
  const title = 'Rapport des Réservations';
  const date = format(new Date(), 'dd MMMM yyyy', { locale: fr });
  
  const styles = `
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; }
      h1 { color: #1e40af; margin-bottom: 10px; }
      .date { color: #666; margin-bottom: 30px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
      th { background-color: #f3f4f6; font-weight: bold; }
      .status { padding: 4px 8px; border-radius: 4px; display: inline-block; }
      .status-confirmed { background-color: #dcfce7; color: #166534; }
      .status-pending { background-color: #fef3c7; color: #92400e; }
      .footer { margin-top: 40px; text-align: center; color: #666; }
      @media print {
        body { margin: 20px; }
        .no-print { display: none; }
      }
    </style>
  `;

  const bookingsHTML = bookings.map(booking => {
    const property = properties.find(p => p.id === booking.propertyId);
    return `
      <tr>
        <td>${property?.title || ''}</td>
        <td>${booking.tenantName}</td>
        <td>${format(booking.startDate, 'dd/MM/yyyy', { locale: fr })}</td>
        <td>${format(booking.endDate, 'dd/MM/yyyy', { locale: fr })}</td>
        <td>
          <span class="status ${booking.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">
            ${booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
          </span>
        </td>
        <td>${property ? `${property.price}€` : ''}</td>
      </tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      ${styles}
    </head>
    <body>
      <h1>${title}</h1>
      <div class="date">Généré le ${date}</div>
      
      <table>
        <thead>
          <tr>
            <th>Propriété</th>
            <th>Locataire</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Statut</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          ${bookingsHTML}
        </tbody>
      </table>
      
      <div class="footer">
        <p>PropManage - Rapport de réservations</p>
        <p>Page 1/1</p>
      </div>
    </body>
    </html>
  `;
}