import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, X, AlertTriangle } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { cn } from '../../../utils';

const commonBoundaries = [
  'No unprotected sex',
  'Must use condoms',
  'No kissing',
  'No anal play',
  'No oral contact',
  'No overnight stays',
  'Same room only',
  'Separate room only',
  'No emotional attachment',
  'Must meet partner first',
  'No photos/videos',
  'No sharing personal info',
  'No repeat encounters',
  'Partners must be tested',
  'No substance use',
  'Safe word required',
  'Discuss limits beforehand',
  'Can say no anytime',
  'No pressure allowed',
  'Respect privacy always',
];

const BoundariesStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;
  const [selectedBoundaries, setSelectedBoundaries] = useState<string[]>(
    data.preferences.boundaries || []
  );
  const [customBoundary, setCustomBoundary] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    updateData({
      preferences: {
        ...data.preferences,
        boundaries: selectedBoundaries,
      },
    });
  }, [selectedBoundaries, updateData, data.preferences]);

  const filteredBoundaries = commonBoundaries.filter(boundary =>
    boundary.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedBoundaries.includes(boundary)
  );

  const addBoundary = (boundary: string) => {
    if (!selectedBoundaries.includes(boundary)) {
      setSelectedBoundaries([...selectedBoundaries, boundary]);
    }
  };

  const removeBoundary = (boundary: string) => {
    setSelectedBoundaries(selectedBoundaries.filter(b => b !== boundary));
  };

  const addCustomBoundary = () => {
    if (customBoundary.trim() && !selectedBoundaries.includes(customBoundary.trim())) {
      setSelectedBoundaries([...selectedBoundaries, customBoundary.trim()]);
      setCustomBoundary('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomBoundary();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            Define Your Boundaries
          </h1>
          <p className="text-gold-200 max-w-2xl mx-auto">
            Setting clear boundaries is essential for safe and enjoyable experiences. 
            Choose what feels comfortable for you, and remember you can always modify these later.
          </p>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-rose-300 font-medium mb-1">Important Reminder</h3>
              <p className="text-rose-200 text-sm leading-relaxed">
                Boundaries can always be adjusted. You have the right to say no at any time, 
                and others should respect your limits. Communication is key to safe and consensual experiences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Selected Boundaries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">
            Your Boundaries ({selectedBoundaries.length})
          </h2>
          
          {selectedBoundaries.length > 0 ? (
            <div className="grid gap-2">
              {selectedBoundaries.map((boundary, index) => (
                <motion.div
                  key={boundary}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-500/10 to-gold-500/10 border border-gold-500/30 rounded-lg"
                >
                  <span className="text-gold-100 flex-1">{boundary}</span>
                  <button
                    onClick={() => removeBoundary(boundary)}
                    className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <Shield className="w-12 h-12 text-gold-400/50 mx-auto mb-3" />
              <p className="text-gold-200">No boundaries selected yet. Choose from the options below.</p>
            </div>
          )}
        </motion.div>

        {/* Add Custom Boundary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 card p-6"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">Add Custom Boundary</h2>
          <div className="flex space-x-3">
            <input
              type="text"
              value={customBoundary}
              onChange={(e) => setCustomBoundary(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe a specific boundary or limit..."
              className="input-field flex-1"
            />
            <button
              onClick={addCustomBoundary}
              disabled={!customBoundary.trim()}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                customBoundary.trim()
                  ? 'bg-gradient-to-r from-rose-500 to-gold-500 text-white hover:shadow-lg'
                  : 'bg-dark-600 text-dark-300 cursor-not-allowed'
              )}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Search Common Boundaries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">Common Boundaries</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search boundaries..."
            className="input-field mb-4"
          />
        </motion.div>

        {/* Common Boundaries Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid gap-3 md:grid-cols-2"
        >
          {filteredBoundaries.map((boundary, index) => (
            <motion.button
              key={boundary}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => addBoundary(boundary)}
              className="text-left p-4 bg-dark-700/30 border border-gold-500/20 rounded-lg hover:border-gold-400/40 hover:bg-dark-600/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gold-100 group-hover:text-gold-50 transition-colors">
                  {boundary}
                </span>
                <Plus className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {filteredBoundaries.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <p className="text-gold-200">
              No boundaries found matching "{searchTerm}". Try adding it as a custom boundary above.
            </p>
          </motion.div>
        )}

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 bg-dark-700/30 border border-gold-500/20 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-gold-100 mb-3">Safety Tips</h3>
          <ul className="space-y-2 text-gold-200 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>Always communicate your boundaries clearly before any encounter</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>You can modify or add boundaries at any time</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>Respect others' boundaries as you want yours respected</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>If someone pressures you to ignore your boundaries, that's a red flag</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BoundariesStep;