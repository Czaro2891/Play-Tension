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