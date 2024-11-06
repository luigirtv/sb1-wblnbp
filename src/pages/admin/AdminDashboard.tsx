import React from 'react';
import { Users, Building, Settings, Activity } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import UserManagement from '../../components/admin/UserManagement';
import SystemMetrics from '../../components/admin/SystemMetrics';
import ActivityLog from '../../components/admin/ActivityLog';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Paramètres système
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs actifs"
          value="156"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Propriétés"
          value="324"
          icon={Building}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Taux d'utilisation"
          value="85%"
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Configurations"
          value="12"
          icon={Settings}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserManagement />
        </div>
        <div>
          <SystemMetrics />
        </div>
      </div>

      <ActivityLog />
    </div>
  );
}