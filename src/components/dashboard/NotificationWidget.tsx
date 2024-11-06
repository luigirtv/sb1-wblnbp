import React from 'react';
import { Bell, Calendar, MessageSquare, AlertCircle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'booking',
    message: 'New booking request for Sunset Villa',
    time: '5 minutes ago',
    icon: Calendar,
  },
  {
    id: 2,
    type: 'message',
    message: 'New message from John Smith',
    time: '1 hour ago',
    icon: MessageSquare,
  },
  {
    id: 3,
    type: 'alert',
    message: 'Maintenance required at Ocean View Apartment',
    time: '2 hours ago',
    icon: AlertCircle,
  },
];

export default function NotificationWidget() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Notifications</h3>
          <Bell className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
}