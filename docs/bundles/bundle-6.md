===== FILE: src/components/assessment/AssessmentComplete.tsx =====
`$Lang
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Brain, Heart, Users, Star, ArrowRight } from 'lucide-react';

const AssessmentComplete: React.FC = () => {
  const { state } = useAssessment();
  const navigate = useNavigate();

  const stats = [
    {
      icon: Brain,
      label: 'Psychological Insights',
      value: '85%',
      description: 'Deep understanding of your patterns'
    },
    {
      icon: Heart,
      label: 'Emotional Intelligence',
      value: '78%',
      description: 'Strong emotional awareness'
    },
    {
      icon: Users,
      label: 'Compatibility Score',
      value: '92%',
      description: 'Excellent partner potential'
    },
    {
      icon: Star,
      label: 'Growth Areas',
      value: '3',
      description: 'Opportunities for development'
    }
  ];

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-dark-800 rounded-2xl p-8 shadow-2xl border border-dark-700">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Brain className="w-10 h-10 text-dark-900" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">Assessment Complete!</h1>
            <p className="text-xl text-gray-400">
              Your psychological profile has been generated. Here's what we discovered about you.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-dark-700 p-6 rounded-xl border border-dark-600"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-rose-400 rounded-lg flex items-center justify-center mr-3">
                    <stat.icon className="w-5 h-5 text-dark-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
                    <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="bg-dark-700 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Key Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  <strong>Explorer Archetype:</strong> You show a strong tendency to explore new experiences and push boundaries in relationships.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  <strong>Emotional Openness:</strong> You express vulnerability openly in intimate settings, which is a strength for deep connections.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  <strong>Communication Style:</strong> You prefer collaborative conflict resolution and value emotional expression in relationships.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-dark-700 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-600 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Continue Exploring</h3>
                <p className="text-gray-300 text-sm">
                  Your adventurous nature is a strength. Consider exploring new relationship dynamics with trusted partners.
                </p>
              </div>
              <div className="bg-dark-600 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Build Trust</h3>
                <p className="text-gray-300 text-sm">
                  Focus on building deeper trust with partners to enhance your natural vulnerability and openness.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <motion.button
              onClick={handleContinue}
              className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center justify-center space-x-2 mx-auto group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentComplete;
``r

===== FILE: src/components/onboarding/steps/InterestsStep.tsx =====
`$Lang
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
``r

===== FILE: src/components/onboarding/steps/PrivacyStep.tsx =====
`$Lang
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { ProfileVisibility } from '../../../types';
import { cn } from '../../../utils';

interface FormData {
  profileVisibility: ProfileVisibility;
  anonymizedResearch: boolean;
  marketingInsights: boolean;
  platformImprovement: boolean;
  endToEndMessages: boolean;
  encryptedStorage: boolean;
  biometricAccess: boolean;
}

const PrivacyStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;

  const {
    register,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      profileVisibility: data.privacy.profileVisibility,
      anonymizedResearch: false,
      marketingInsights: false,
      platformImprovement: false,
      endToEndMessages: true,
      encryptedStorage: true,
      biometricAccess: false,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const subscription = watch((values) => {
      updateData({
        privacy: {
          ...data.privacy,
          profileVisibility: values.profileVisibility || data.privacy.profileVisibility,
          dataSharing: Boolean(values.anonymizedResearch || values.marketingInsights || values.platformImprovement),
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData, data.privacy]);

  const visibilityOptions = [
    {
      value: 'private' as ProfileVisibility,
      title: 'Private',
      description: 'Only you can see your profile information',
      icon: Lock,
      recommended: true,
    },
    {
      value: 'partner-only' as ProfileVisibility,
      title: 'Partner Only',
      description: 'Only your verified partner can see your profile',
      icon: Eye,
      recommended: false,
    },
    {
      value: 'community' as ProfileVisibility,
      title: 'Community',
      description: 'Other verified members can see your profile',
      icon: Database,
      recommended: false,
    },
  ];

  const ToggleSwitch: React.FC<{ 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }> = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2',
        {
          'bg-gradient-to-r from-rose-500 to-gold-500': checked,
          'bg-dark-600': !checked,
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          {
            'translate-x-6': checked,
            'translate-x-1': !checked,
          }
        )}
      />
    </button>
  );

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
            Privacy & Security Settings
          </h1>
          <p className="text-gold-200 max-w-2xl mx-auto">
            Configure how your data is handled and shared. We're committed to protecting your privacy 
            and giving you complete control over your information.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Eye className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Profile Visibility</h2>
            </div>

            <div className="space-y-4">
              {visibilityOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'relative cursor-pointer rounded-lg border p-4 flex items-center space-x-4 transition-all duration-200',
                    {
                      'border-gold-400 bg-gold-500/10': watchedValues.profileVisibility === option.value,
                      'border-gold-500/30 hover:border-gold-400/60': watchedValues.profileVisibility !== option.value,
                    }
                  )}
                >
                  <input
                    {...register('profileVisibility')}
                    type="radio"
                    value={option.value}
                    className="sr-only"
                  />
                  <div className="flex-shrink-0">
                    <option.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-gold-100 font-medium">{option.title}</h3>
                      {option.recommended && (
                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-rose-500 to-gold-500 text-white rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gold-200">{option.description}</p>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border-2 transition-all duration-200',
                      {
                        'border-gold-400 bg-gold-400': watchedValues.profileVisibility === option.value,
                        'border-gold-500/50': watchedValues.profileVisibility !== option.value,
                      }
                    )}
                  />
                </label>
              ))}
            </div>
          </motion.div>

          {/* Data Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Database className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Data Sharing Preferences</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">Anonymized Research</h3>
                  <p className="text-sm text-gold-200">
                    Help improve the platform by sharing anonymized, aggregated data for research purposes
                  </p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.anonymizedResearch}
                  onChange={(checked) => setValue('anonymizedResearch', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">Marketing Insights</h3>
                  <p className="text-sm text-gold-200">
                    Receive personalized recommendations and insights based on your preferences
                  </p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.marketingInsights}
                  onChange={(checked) => setValue('marketingInsights', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">Platform Improvement</h3>
                  <p className="text-sm text-gold-200">
                    Help us improve features and user experience through usage analytics
                  </p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.platformImprovement}
                  onChange={(checked) => setValue('platformImprovement', checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Security & Encryption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Lock className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Security & Encryption</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">End-to-End Message Encryption</h3>
                  <p className="text-sm text-gold-200">
                    Encrypt all messages so only you and your recipient can read them
                  </p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.endToEndMessages}
                  onChange={(checked) => setValue('endToEndMessages', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">Encrypted Local Storage</h3>
                  <p className="text-sm text-gold-200">
                    Encrypt sensitive data stored on your device for additional security
                  </p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.encryptedStorage}
                  onChange={(checked) => setValue('encryptedStorage', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">Biometric Access</h3>
                  <p className="text-sm text-gold-200">
                    Use fingerprint or face recognition to access the app (when available)
                  </p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.biometricAccess}
                  onChange={(checked) => setValue('biometricAccess', checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 bg-gradient-to-r from-rose-500/10 to-gold-500/10 border border-gold-500/30 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-gold-100 font-medium mb-2">Our Privacy Commitment</h3>
                <ul className="space-y-1 text-gold-200 text-sm">
                  <li>• We never sell your personal data to third parties</li>
                  <li>• All sensitive information is encrypted both in transit and at rest</li>
                  <li>• You can request deletion of your data at any time</li>
                  <li>• We only collect data necessary to provide our services</li>
                  <li>• Regular security audits ensure your data remains protected</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyStep;
``r

===== FILE: src/react-app-env.d.ts =====
`$Lang
/// <reference types="react-scripts" />

``r

