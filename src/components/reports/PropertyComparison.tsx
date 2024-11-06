import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Property } from '../../types';

interface PropertyComparisonProps {
  selectedProperty: Property;
  similarProperties: Property[];
  metrics: {
    revenue: number;
    occupancyRate: number;
    averagePrice: number;
  }[];
}

export default function PropertyComparison({
  selectedProperty,
  similarProperties,
  metrics
}: PropertyComparisonProps) {
  const comparisonData = [
    {
      metric: 'Revenu',
      [selectedProperty.title]: metrics[0].revenue,
      'Moyenne similaire': metrics.reduce((acc, m) => acc + m.revenue, 0) / metrics.length
    },
    {
      metric: 'Taux d\'occupation',
      [selectedProperty.title]: metrics[0].occupancyRate,
      'Moyenne similaire': metrics.reduce((acc, m) => acc + m.occupancyRate, 0) / metrics.length
    },
    {
      metric: 'Prix moyen',
      [selectedProperty.title]: metrics[0].averagePrice,
      'Moyenne similaire': metrics.reduce((acc, m) => acc + m.averagePrice, 0) / metrics.length
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Comparaison avec propriétés similaires</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={selectedProperty.title}
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Moyenne similaire"
              fill="#9CA3AF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Propriétés similaires analysées :
        </h4>
        <div className="space-y-2">
          {similarProperties.map((property) => (
            <div
              key={property.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-600">{property.title}</span>
              <span className="text-gray-900 font-medium">
                {property.price}€ / nuit
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}