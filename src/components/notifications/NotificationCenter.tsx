import React, { useState } from 'react';
import { Bell, Calendar, Settings, X, Clock, ChevronLeft } from 'lucide-react';
import NotificationPreferences from './NotificationPreferences';
import NotificationHistory from './NotificationHistory';
import { format } from 'date-fns';
import { Notification } from '../../types';

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Réservation à venir',
    message: 'Rappel: Check-in pour Villa Sunset demain à 14h',
    type: 'booking',
    timestamp: new Date(),
    read: false
  },
  {
    id: '2',
    title: 'Synchronisation Booking.com',
    message: 'Nouvelle réservation synchronisée depuis Booking.com',
    type: 'system',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: '3',
    title: 'Rappel de maintenance',
    message: 'Maintenance planifiée pour Ocean View Apartment',
    type: 'reminder',
    timestamp: new Date(Date.now() - 86400000),
    read: true
  }
];

const defaultPreferences = [
  {
    id: '1',
    type: 'email' as const,
    timing: 24,
    enabled: true,
    events: ['booking_reminder', 'maintenance', 'payment']
  },
  {
    id: '2',
    type: 'push' as const,
    timing: 2,
    enabled: true,
    events: ['booking_reminder', 'maintenance']
  },
  {
    id: '3',
    type: 'sms' as const,
    timing: 12,
    enabled: false,
    events: ['booking_reminder']
  }
];

type View = 'notifications' | 'preferences' | 'history';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [showPanel, setShowPanel] = useState(false);
  const [currentView, setCurrentView] = useState<View>('notifications');
  const [preferences, setPreferences] = useState(defaultPreferences);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handlePreferenceChange = (updatedPreference: typeof preferences[0]) => {
    setPreferences(preferences.map(p => 
      p.id === updatedPreference.id ? updatedPreference : p
    ));
  };

  const renderHeader = () => {
    return (
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {currentView !== 'notifications' && (
            <button
              onClick={() => setCurrentView('notifications')}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            {currentView === 'notifications' && <Bell className="h-5 w-5 text-gray-500" />}
            {currentView === 'history' && <Clock className="h-5 w-5 text-gray-500" />}
            {currentView === 'preferences' && <Settings className="h-5 w-5 text-gray-500" />}
            <h3 className="text-lg font-semibold">
              {currentView === 'notifications' && 'Notifications'}
              {currentView === 'history' && 'Historique'}
              {currentView === 'preferences' && 'Préférences'}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {currentView === 'notifications' && (
            <>
              <button 
                onClick={() => setCurrentView('history')}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Clock className="h-5 w-5 text-gray-500" />
              </button>
              <button 
                onClick={() => setCurrentView('preferences')}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Settings className="h-5 w-5 text-gray-500" />
              </button>
            </>
          )}
          <button 
            onClick={() => setShowPanel(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'history':
        return (
          <div className="p-4">
            <NotificationHistory
              notifications={notifications}
              onNotificationClick={markAsRead}
            />
          </div>
        );
      case 'preferences':
        return (
          <div className="p-4">
            <NotificationPreferences 
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            />
          </div>
        );
      default:
        return (
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(notification.timestamp, 'dd/MM/yyyy HH:mm')}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucune notification
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="relative">
      <button 
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          {renderHeader()}
          {renderContent()}
        </div>
      )}
    </div>
  );
}