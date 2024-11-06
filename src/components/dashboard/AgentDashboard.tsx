import React from 'react';
import { Calendar, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import StatCard from './StatCard';
import UpcomingBookings from './UpcomingBookings';
import TaskList from './TaskList';
import NotificationWidget from './NotificationWidget';

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord agent</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Nouvelle réservation
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Ajouter une tâche
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Check-ins aujourd'hui"
          value="5"
          icon={Calendar}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Messages non lus"
          value="12"
          icon={MessageSquare}
          trend={{ value: 4, isPositive: false }}
        />
        <StatCard
          title="Tâches en attente"
          value="8"
          icon={Clock}
          trend={{ value: 1, isPositive: false }}
        />
        <StatCard
          title="Tâches terminées"
          value="15"
          icon={CheckCircle}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingBookings />
        </div>
        <div>
          <NotificationWidget />
        </div>
      </div>

      <TaskList />
    </div>
  );
}