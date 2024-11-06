import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 8500, bookings: 12 },
  { month: 'Fév', revenue: 9200, bookings: 15 },
  { month: 'Mar', revenue: 11500, bookings: 18 },
  { month: 'Avr', revenue: 12450, bookings: 20 },
  { month: 'Mai', revenue: 11800, bookings: 19 },
  { month: 'Juin', revenue: 13200, bookings: 22 }
];

export default function BookingStats() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Statistiques de réservation</h3>
        <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
          <option>6 derniers mois</option>
          <option>Année en cours</option>
          <option>12 derniers mois</option>
        </select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenu (€)" />
            <Bar yAxisId="right" dataKey="bookings" fill="#10B981" name="Réservations" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}