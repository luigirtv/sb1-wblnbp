import React from 'react';
import { Activity, User, Settings, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'user',
    message: 'Nouvel utilisateur inscrit',
    user: 'Alice Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    icon: User
  },
  {
    id: 2,
    type: 'system',
    message: 'Mise à jour système effectuée',
    user: 'System',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    icon: Settings
  },
  {
    id: 3,
    type: 'alert',
    message: 'Tentative de connexion suspecte',
    user: 'Security System',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    icon: AlertTriangle
  }
];

export default function ActivityLog() {
  const getIconColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'text-blue-500';
      case 'system':
        return 'text-green-500';
      case 'alert':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Journal d'activité</h2>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${getIconColor(activity.type)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    par {activity.user}
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {activity.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Voir toutes les activités
        </button>
      </div>
    </div>
  );
}