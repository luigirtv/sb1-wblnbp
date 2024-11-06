import React, { useState } from 'react';
import { 
  Download,
  Calendar,
  TrendingUp,
  PieChart,
  BarChart as BarChartIcon,
  Filter,
  FileText
} from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import ReportFilters from '../components/reports/ReportFilters';
import MetricCard from '../components/reports/MetricCard';
import PropertyPerformance from '../components/reports/PropertyPerformance';
import { generatePDF } from '../services/export/pdfGenerator';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const revenueData = [
  { month: 'Jan', revenue: 35000, bookings: 24 },
  { month: 'Fév', revenue: 38000, bookings: 28 },
  { month: 'Mar', revenue: 42000, bookings: 32 },
  { month: 'Avr', revenue: 45000, bookings: 35 },
  { month: 'Mai', revenue: 48250, bookings: 38 },
  { month: 'Juin', revenue: 51000, bookings: 42 }
];

const occupancyData = [
  { name: 'Occupé', value: 65 },
  { name: 'Disponible', value: 25 },
  { name: 'Maintenance', value: 10 }
];

const propertyPerformanceData = [
  {
    id: '1',
    name: 'Villa Sunset',
    revenue: 25000,
    occupancyRate: 85,
    bookings: 15,
    trend: 12
  },
  {
    id: '2',
    name: 'Ocean View Apt',
    revenue: 18500,
    occupancyRate: 75,
    bookings: 12,
    trend: -5
  },
  {
    id: '3',
    name: 'Mountain Lodge',
    revenue: 15000,
    occupancyRate: 60,
    bookings: 8,
    trend: 8
  }
];

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(subMonths(new Date(), 5)),
    end: endOfMonth(new Date())
  });
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    try {
      if (format === 'pdf') {
        await generatePDF(revenueData, propertyPerformanceData);
      } else {
        // Handle CSV export
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF
          </button>
        </div>
      </div>

      <ReportFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedProperties={selectedProperties}
        onPropertyChange={setSelectedProperties}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenu Total"
          value="209,250€"
          trend={15}
          icon={TrendingUp}
          description="vs. période précédente"
        />
        <MetricCard
          title="Réservations"
          value="199"
          trend={8}
          icon={Calendar}
          description="vs. période précédente"
        />
        <MetricCard
          title="Taux d'Occupation"
          value="75%"
          trend={5}
          icon={PieChart}
          description="vs. période précédente"
        />
        <MetricCard
          title="Prix Moyen"
          value="350€"
          trend={-2}
          icon={BarChartIcon}
          description="vs. période précédente"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Revenus et Réservations</h3>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>6 derniers mois</option>
                <option>12 derniers mois</option>
                <option>Cette année</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bookings"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6">Taux d'Occupation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {occupancyData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PropertyPerformance properties={propertyPerformanceData} />
    </div>
  );
}