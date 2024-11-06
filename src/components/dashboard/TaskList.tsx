import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  property: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Check-in Villa Sunset',
    property: 'Villa Sunset',
    dueDate: new Date(),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Inspection appartement',
    property: 'Ocean View',
    dueDate: new Date(),
    priority: 'medium',
    status: 'in_progress'
  },
  {
    id: '3',
    title: 'Maintenance AC',
    property: 'Mountain Lodge',
    dueDate: new Date(),
    priority: 'low',
    status: 'completed'
  }
];

export default function TaskList() {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tâches</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir toutes les tâches
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.property}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {task.dueDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}