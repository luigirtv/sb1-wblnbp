import { Booking, Notification } from '../types';

interface NotificationPreference {
  type: 'email' | 'push' | 'sms';
  timing: number; // hours before event
  enabled: boolean;
  events: string[];
}

class NotificationService {
  private preferences: NotificationPreference[] = [];
  private notifications: Notification[] = [];

  setPreferences(prefs: NotificationPreference[]) {
    this.preferences = prefs;
  }

  async sendNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false
    };

    this.notifications.push(newNotification);

    // Implement actual notification sending logic here
    // This could involve:
    // - Sending emails via an email service
    // - Using a push notification service
    // - Sending SMS via a messaging service
    console.log('Sending notification:', notification);

    return newNotification;
  }

  async scheduleBookingReminders(booking: Booking) {
    const enabledPreferences = this.preferences.filter(pref => 
      pref.enabled && pref.events.includes('booking_reminder')
    );

    for (const pref of enabledPreferences) {
      const reminderTime = new Date(booking.startDate);
      reminderTime.setHours(reminderTime.getHours() - pref.timing);

      const notification = {
        title: 'Rappel de réservation',
        message: `Check-in prévu dans ${pref.timing}h pour ${booking.tenantName}`,
        type: 'reminder' as const,
        metadata: {
          bookingId: booking.id,
          propertyId: booking.propertyId
        }
      };

      // In a real application, you would use a job scheduler here
      // For now, we'll use setTimeout for demonstration
      const timeUntilReminder = reminderTime.getTime() - Date.now();
      if (timeUntilReminder > 0) {
        setTimeout(() => {
          this.sendNotification(notification);
        }, timeUntilReminder);
      }
    }
  }

  async getNotificationHistory(): Promise<Notification[]> {
    // In a real application, this would fetch from a database
    return this.notifications.sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  async markAllAsRead(): Promise<void> {
    this.notifications.forEach(n => n.read = true);
  }

  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  async clearAllNotifications(): Promise<void> {
    this.notifications = [];
  }
}

export const notificationService = new NotificationService();