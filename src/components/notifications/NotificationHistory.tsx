import React from 'react';
import { format } from 'date-fns';
import { Calendar, MessageSquare, AlertCircle, Clock } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationHistoryProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

export default function NotificationHistory({ notifications, onNotificationClick }: NotificationHistoryProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return Calendar;
      case 'message':
        return MessageSquare;
      case 'alert':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const groups = notifications.reduce((acc, notification) => {
      const date = format(notification.timestamp, 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {} as Record<string, Notification[]>);

    return Object.entries(groups).sort(([dateA], [dateB]) => 
      new Date(dateB).getTime() - new Date(dateA).getTime()
    );
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="space-y-6">
      {groupedNotifications.map(([date, notifications]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            {format(new Date(date), 'EEEE, d MMMM yyyy')}
          </h3>
          <div className="space-y-2">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  onClick={() => onNotificationClick(notification.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  } hover:bg-gray-50`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-blue-500 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 break-words">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(notification.timestamp, 'HH:mm')}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}