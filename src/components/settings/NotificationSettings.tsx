import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Clock, AlertCircle, Calendar, MessageSquare, DollarSign } from 'lucide-react';

interface NotificationChannel {
  id: string;
  type: 'email' | 'push' | 'sms';
  label: string;
  icon: typeof Bell;
  enabled: boolean;
}

interface NotificationType {
  id: string;
  label: string;
  description: string;
  icon: typeof Bell;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  timing: number;
}

export default function NotificationSettings() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    { id: 'email', type: 'email', label: 'Email', icon: Mail, enabled: true },
    { id: 'push', type: 'push', label: 'Notifications Push', icon: Bell, enabled: true },
    { id: 'sms', type: 'sms', label: 'SMS', icon: Smartphone, enabled: false }
  ]);

  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([
    {
      id: 'bookings',
      label: 'Réservations',
      description: 'Notifications pour les nouvelles réservations et les check-ins',
      icon: Calendar,
      channels: { email: true, push: true, sms: true },
      timing: 24
    },
    {
      id: 'messages',
      label: 'Messages',
      description: 'Notifications pour les nouveaux messages des locataires',
      icon: MessageSquare,
      channels: { email: true, push: true, sms: false },
      timing: 0
    },
    {
      id: 'payments',
      label: 'Paiements',
      description: 'Notifications pour les paiements et les rappels',
      icon: DollarSign,
      channels: { email: true, push: false, sms: false },
      timing: 48
    },
    {
      id: 'alerts',
      label: 'Alertes',
      description: 'Notifications urgentes et alertes de sécurité',
      icon: AlertCircle,
      channels: { email: true, push: true, sms: true },
      timing: 0
    }
  ]);

  const handleChannelToggle = (channelId: string) => {
    setChannels(channels.map(channel =>
      channel.id === channelId
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  const handleNotificationChannelToggle = (notificationId: string, channelType: keyof NotificationType['channels']) => {
    setNotificationTypes(types =>
      types.map(type =>
        type.id === notificationId
          ? {
              ...type,
              channels: {
                ...type.channels,
                [channelType]: !type.channels[channelType]
              }
            }
          : type
      )
    );
  };

  const handleTimingChange = (notificationId: string, timing: number) => {
    setNotificationTypes(types =>
      types.map(type =>
        type.id === notificationId
          ? { ...type, timing }
          : type
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Canaux de notification</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choisissez comment vous souhaitez recevoir vos notifications.
          </p>
        </div>
        <div className="p-6 space-y-4">
          {channels.map(channel => {
            const Icon = channel.icon;
            return (
              <div key={channel.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{channel.label}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={channel.enabled}
                    onChange={() => handleChannelToggle(channel.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Préférences par type</h2>
          <p className="mt-1 text-sm text-gray-500">
            Personnalisez vos notifications pour chaque type d'événement.
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {notificationTypes.map(type => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="p-6">
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{type.label}</h3>
                        <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center space-x-4">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <select
                          value={type.timing}
                          onChange={(e) => handleTimingChange(type.id, Number(e.target.value))}
                          className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="0">Immédiatement</option>
                          <option value="1">1 heure avant</option>
                          <option value="24">24 heures avant</option>
                          <option value="48">48 heures avant</option>
                          <option value="72">72 heures avant</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-6">
                        {channels.map(channel => (
                          <label key={channel.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={type.channels[channel.type]}
                              onChange={() => handleNotificationChannelToggle(type.id, channel.type)}
                              disabled={!channel.enabled}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">{channel.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Enregistrer les préférences
        </button>
      </div>
    </div>
  );
}