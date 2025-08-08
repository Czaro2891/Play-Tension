import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Plus, X } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { cn } from '../../../utils';

const interestCategories = {
  'Relationship Dynamics': [
    'Soft swap',
    'Full swap',
    'Same room',
    'Separate rooms',
    'Group activities',
    'Threesomes',
    'Moresomes',
    'Voyeurism',
    'Exhibitionism',
    'Role playing',
  ],
  'Communication & Connection': [
    'Deep conversations',
    'Emotional intimacy',
    'Intellectual stimulation',
    'Shared hobbies',
    'Travel together',
    'Dinner dates',
    'Social events',
    'Online chatting',
    'Video calls',
    'Regular meetups',
  ],
  'Activities & Lifestyle': [
    'Parties and events',
    'Club visits',
    'Beach/vacation trips',
    'Dinner parties',
    'House parties',
    'Hotel meetups',
    'Outdoor activities',
    'Fitness together',
    'Dancing',
    'Music events',
  ],
  'Exploration & Adventure': [
    'Trying new things',
    'Fantasy exploration',
    'Role experimentation',
    'Different locations',
    'Weekend getaways',
    'Themed experiences',
    'Costume play',
    'Games and activities',
    'Photography (consensual)',
    'Creative expression',
  ],
};

const InterestsStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    data.preferences.interests || []
  );
  const [customInterest, setCustomInterest] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    updateData({
      preferences: {
        ...data.preferences,
        interests: selectedInterests,
      },
    });
  }, [selectedInterests, updateData, data.preferences]);

  const allInterests = Object.values(interestCategories).flat();
  const filteredInterests = searchTerm
    ? allInterests.filter(interest =>
        interest.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedInterests.includes(interest)
      )
    : [];

  const addInterest = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter(i => i !== interest));
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests([...selectedInterests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomInterest();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            What Interests You?
          </h1>
          <p className="text-gold-200 max-w-2xl mx-auto">
            Select activities and experiences that appeal to you. This helps us understand your preferences 
            and find compatible connections.
          </p>
        </div>

        {/* Selected Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">
            Your Interests ({selectedInterests.length})
          </h2>
          
          {selectedInterests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-rose-500/20 to-gold-500/20 border border-gold-500/30 rounded-full"
                >
                  <span className="text-gold-100 text-sm">{interest}</span>
                  <button
                    onClick={() => removeInterest(interest)}
                    className="text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <Heart className="w-12 h-12 text-gold-400/50 mx-auto mb-3" />
              <p className="text-gold-200">No interests selected yet. Explore the categories below.</p>
            </div>
          )}
        </motion.div>

        {/* Add Custom Interest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 card p-6"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">Add Custom Interest</h2>
          <div className="flex space-x-3">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe something specific you're interested in..."
              className="input-field flex-1"
            />
            <button
              onClick={addCustomInterest}
              disabled={!customInterest.trim()}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                customInterest.trim()
                  ? 'bg-gradient-to-r from-rose-500 to-gold-500 text-white hover:shadow-lg'
                  : 'bg-dark-600 text-dark-300 cursor-not-allowed'
              )}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Search Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for specific interests..."
              className="input-field pl-10"
            />
          </div>
        </motion.div>

        {/* Search Results */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gold-100 mb-4">
              Search Results ({filteredInterests.length})
            </h3>
            {filteredInterests.length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredInterests.map((interest, index) => (
                  <motion.button
                    key={interest}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => addInterest(interest)}
                    className="text-left p-3 bg-dark-700/30 border border-gold-500/20 rounded-lg hover:border-gold-400/40 hover:bg-dark-600/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gold-100 group-hover:text-gold-50 transition-colors text-sm">
                        {interest}
                      </span>
                      <Plus className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <p className="text-gold-200 text-center py-4">
                No interests found matching "{searchTerm}". Try adding it as a custom interest above.
              </p>
            )}
          </motion.div>
        )}

        {/* Interest Categories */}
        {!searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gold-100">Browse by Category</h3>
            
            {Object.entries(interestCategories).map(([category, interests], categoryIndex) => (
              <div key={category} className="card p-6">
                <button
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                  className="w-full flex items-center justify-between text-left mb-4"
                >
                  <h4 className="text-lg font-semibold text-gold-100">{category}</h4>
                  <motion.div
                    animate={{ rotate: activeCategory === category ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="w-5 h-5 text-gold-400" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: activeCategory === category ? 'auto' : 0,
                    opacity: activeCategory === category ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {interests
                      .filter(interest => !selectedInterests.includes(interest))
                      .map((interest, index) => (
                        <motion.button
                          key={interest}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => addInterest(interest)}
                          className="text-left p-3 bg-dark-600/30 border border-gold-500/20 rounded-lg hover:border-gold-400/40 hover:bg-dark-600/50 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gold-100 group-hover:text-gold-50 transition-colors text-sm">
                              {interest}
                            </span>
                            <Plus className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors" />
                          </div>
                        </motion.button>
                      ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-4 bg-dark-700/30 border border-gold-500/20 rounded-lg"
        >
          <p className="text-gold-200 text-sm leading-relaxed">
            <strong>Remember:</strong> Your interests help us understand your preferences and suggest compatible connections. 
            You can always modify your interests later, and having interests doesn't commit you to anything.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InterestsStep;