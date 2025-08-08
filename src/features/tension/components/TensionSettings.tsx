import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TensionSettings as TensionSettingsType } from '../../../types/tension';
import { Bell, BellOff, Users, User, RefreshCw, Clock } from 'lucide-react';

interface TensionSettingsProps {
  settings: TensionSettingsType;
  onUpdateSettings: (settings: Partial<TensionSettingsType>) => void;
}

const TensionSettings: React.FC<TensionSettingsProps> = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState<TensionSettingsType>(settings);

  const handleChange = (key: keyof TensionSettingsType, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Ustawienia</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domyślna intensywność
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="10"
              value={localSettings.defaultIntensity}
              onChange={(e) => handleChange('defaultIntensity', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-3 text-lg font-medium w-8 text-center">
              {localSettings.defaultIntensity}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Domyślny czas trwania
            </div>
          </label>
          <select
            value={localSettings.defaultDuration}
            onChange={(e) => handleChange('defaultDuration', parseInt(e.target.value))}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={60}>1 minuta</option>
            <option value={180}>3 minuty</option>
            <option value={300}>5 minut</option>
            <option value={600}>10 minut</option>
            <option value={900}>15 minut</option>
            <option value={1800}>30 minut</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferowany tryb
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleChange('preferredMode', 'solo')}
              className={`flex items-center justify-center px-4 py-2 rounded-md ${
                localSettings.preferredMode === 'solo'
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent'
              }`}
            >
              <User className="w-5 h-5 mr-2" />
              Solo
            </button>
            <button
              onClick={() => handleChange('preferredMode', 'partner')}
              className={`flex items-center justify-center px-4 py-2 rounded-md ${
                localSettings.preferredMode === 'partner'
                  ? 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Partner
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-3">Powiadomienia</span>
            <button
              onClick={() => handleChange('enableNotifications', !localSettings.enableNotifications)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                localSettings.enableNotifications ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  localSettings.enableNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-3">Auto-synchronizacja</span>
            <button
              onClick={() => handleChange('autoSync', !localSettings.autoSync)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                localSettings.autoSync ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  localSettings.autoSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Anuluj
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Zapisz
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TensionSettings;
