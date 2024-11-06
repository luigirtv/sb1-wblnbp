import React from 'react';
import { Bell, Mail, Clock, Smartphone } from 'lucide-react';

interface NotificationPreference {
  id: string;
  type: 'email' | 'push' | 'sms';
  timing: number;
  enabled: boolean;
  events: string[];
}

interface NotificationPreferencesProps {
  preferences: NotificationPreference[];
  onPreferenceChange: (preference: NotificationPreference) => void;
}

const eventTypes = [
  { id: 'booking_reminder', label: 'Rappels de réservation' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'payment', label: 'Paiements' },
  { id: 'messages', label: 'Messages' }
];

export default function NotificationPreferences({ preferences, onPreferenceChange }: NotificationPreferencesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'push':
        return Bell;
      case 'sms':
        return Smartphone;
      default:
        return Bell;
    }
  };

  const handleEventToggle = (preference: NotificationPreference, eventId: string) => {
    const updatedEvents = preference.events.includes(eventId)
      ? preference.events.filter(e => e !== eventId)
      : [...preference.events, eventId];
    
    onPreferenceChange({
      ...preference,
      events: updatedEvents
    });
  };

  return (
    <div className="space-y-6">
      {preferences.map((pref) => {
        const Icon = getIcon(pref.type);
        return (
          <div key={pref.id} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {pref.type === 'email' ? 'Email' : 
                       pref.type === 'push' ? 'Notifications push' : 'SMS'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {pref.timing}h avant l'événement
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={pref.enabled}
                    onChange={() => onPreferenceChange({ ...pref, enabled: !pref.enabled })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            {pref.enabled && (
              <div className="p-4 space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Types d'événements
                </p>
                {eventTypes.map(event => (
                  <label key={event.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={pref.events.includes(event.id)}
                      onChange={() => handleEventToggle(pref, event.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{event.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6">
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => {/* Save preferences to backend */}}
        >
          Enregistrer les préférences
        </button>
      </div>
    </div>
  );
}