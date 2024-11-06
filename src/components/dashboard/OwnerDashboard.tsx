import React from 'react';
import { TrendingUp, Users, Calendar, AlertCircle } from 'lucide-react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import PropertyList from './PropertyList';
import NotificationWidget from './NotificationWidget';

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord propriétaire</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter une propriété
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Générer un rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Revenus mensuels"
          value="48 250 €"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Taux d'occupation"
          value="85%"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Réservations"
          value="24"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Maintenance"
          value="3"
          icon={AlertCircle}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <NotificationWidget />
        </div>
      </div>

      <PropertyList />
    </div>
  );
}