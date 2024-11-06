import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', users: 120, cpu: 45, memory: 62 },
  { time: '04:00', users: 85, cpu: 38, memory: 58 },
  { time: '08:00', users: 147, cpu: 52, memory: 73 },
  { time: '12:00', users: 168, cpu: 61, memory: 82 },
  { time: '16:00', users: 184, cpu: 67, memory: 85 },
  { time: '20:00', users: 156, cpu: 55, memory: 76 }
];

export default function SystemMetrics() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Métriques système</h2>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" name="Utilisateurs" />
              <Line type="monotone" dataKey="cpu" stroke="#10B981" name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#F59E0B" name="Mémoire %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Charge CPU</span>
            <span className="text-sm font-medium text-gray-900">55%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Utilisation mémoire</span>
            <span className="text-sm font-medium text-gray-900">76%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Espace disque</span>
            <span className="text-sm font-medium text-gray-900">42%</span>
          </div>
        </div>
      </div>
    </div>
  );
}