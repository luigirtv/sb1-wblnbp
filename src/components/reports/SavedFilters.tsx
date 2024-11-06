import React, { useState } from 'react';
import { Save, Trash, Check } from 'lucide-react';
import { ReportPreference } from '../../types';
import { reportPreferencesService } from '../../services/reports/reportPreferences';

interface SavedFiltersProps {
  currentFilters: {
    dateRange: { start: Date; end: Date };
    properties: string[];
    metrics: string[];
  };
  onFilterLoad: (filters: ReportPreference) => void;
}

export default function SavedFilters({ currentFilters, onFilterLoad }: SavedFiltersProps) {
  const [preferences, setPreferences] = useState<ReportPreference[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPreferenceName, setNewPreferenceName] = useState('');

  React.useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const prefs = await reportPreferencesService.getPreferences();
    setPreferences(prefs);
  };

  const handleSave = async () => {
    if (!newPreferenceName.trim()) return;

    const newPreference: ReportPreference = {
      id: crypto.randomUUID(),
      name: newPreferenceName,
      filters: currentFilters,
      createdAt: new Date()
    };

    await reportPreferencesService.savePreference(newPreference);
    await loadPreferences();
    setShowSaveDialog(false);
    setNewPreferenceName('');
  };

  const handleDelete = async (id: string) => {
    await reportPreferencesService.deletePreference(id);
    await loadPreferences();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Filtres enregistrés</h3>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <Save className="w-4 h-4 mr-1" />
          Enregistrer les filtres actuels
        </button>
      </div>

      {showSaveDialog && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newPreferenceName}
            onChange={(e) => setNewPreferenceName(e.target.value)}
            placeholder="Nom du filtre"
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="p-2 text-blue-600 hover:text-blue-700"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-2">
        {preferences.map((pref) => (
          <div
            key={pref.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <button
              onClick={() => onFilterLoad(pref)}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              {pref.name}
            </button>
            <button
              onClick={() => handleDelete(pref.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}