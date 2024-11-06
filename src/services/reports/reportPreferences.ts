import { ReportPreference } from '../../types';

class ReportPreferencesService {
  private storageKey = 'report_preferences';

  async savePreference(preference: ReportPreference): Promise<void> {
    const preferences = await this.getPreferences();
    const existingIndex = preferences.findIndex(p => p.id === preference.id);
    
    if (existingIndex >= 0) {
      preferences[existingIndex] = preference;
    } else {
      preferences.push(preference);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(preferences));
  }

  async getPreferences(): Promise<ReportPreference[]> {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  async deletePreference(id: string): Promise<void> {
    const preferences = await this.getPreferences();
    const filtered = preferences.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }
}

export const reportPreferencesService = new ReportPreferencesService();