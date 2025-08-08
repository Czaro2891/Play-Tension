import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Settings, Bell, Globe, Clock, Shield } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { PrivacyLevel } from '../../../types';
import { cn } from '../../../utils';

interface FormData {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  partnerUpdates: boolean;
  aiInsights: boolean;
  privacyLevel: PrivacyLevel;
  sessionHistory: number;
  assessmentResults: number;
  conversationLogs: number;
  autoDelete: boolean;
}

const PreferencesStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;

  const {
    register,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      language: 'en',
      timezone: 'UTC',
      emailNotifications: false,
      pushNotifications: false,
      partnerUpdates: false,
      aiInsights: false,
      privacyLevel: data.privacy.privacyLevel,
      sessionHistory: 30,
      assessmentResults: 90,
      conversationLogs: 30,
      autoDelete: false,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const subscription = watch((values) => {
      updateData({
        privacy: {
          ...data.privacy,
          privacyLevel: values.privacyLevel || data.privacy.privacyLevel,
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData, data.privacy]);

  const privacyLevels = [
    {
      value: 'minimal' as PrivacyLevel,
      title: 'Minimal',
      description: 'Basic privacy with standard encryption',
      icon: '🔒',
    },
    {
      value: 'balanced' as PrivacyLevel,
      title: 'Balanced',
      description: 'Enhanced privacy with selective data sharing',
      icon: '⚖️',
    },
    {
      value: 'maximum' as PrivacyLevel,
      title: 'Maximum',
      description: 'Highest privacy with minimal data collection',
      icon: '🛡️',
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
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            Customize Your Experience
          </h1>
          <p className="text-gold-200">
            Set your preferences for notifications, privacy, and data management.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Globe className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">General Settings</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gold-200 mb-2">
                  Language
                </label>
                <select
                  {...register('language')}
                  id="language"
                  className="input-field"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="pl">Polski</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gold-200 mb-2">
                  Timezone
                </label>
                <select
                  {...register('timezone')}
                  id="timezone"
                  className="input-field"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Europe/Berlin">Berlin</option>
                  <option value="Europe/Warsaw">Warsaw</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Bell className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">Email Notifications</h3>
                  <p className="text-sm text-gold-200">Receive updates and insights via email</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.emailNotifications}
                  onChange={(checked) => setValue('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">Push Notifications</h3>
                  <p className="text-sm text-gold-200">Real-time notifications in your browser</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.pushNotifications}
                  onChange={(checked) => setValue('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">Partner Updates</h3>
                  <p className="text-sm text-gold-200">Notifications about your partner's activity</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.partnerUpdates}
                  onChange={(checked) => setValue('partnerUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">AI Insights</h3>
                  <p className="text-sm text-gold-200">Personalized insights and recommendations</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.aiInsights}
                  onChange={(checked) => setValue('aiInsights', checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Shield className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Privacy Level</h2>
            </div>

            <div className="grid gap-4">
              {privacyLevels.map((level) => (
                <label
                  key={level.value}
                  className={cn(
                    'relative cursor-pointer rounded-lg border p-4 flex items-center space-x-3 transition-all duration-200',
                    {
                      'border-gold-400 bg-gold-500/10': watchedValues.privacyLevel === level.value,
                      'border-gold-500/30 hover:border-gold-400/60': watchedValues.privacyLevel !== level.value,
                    }
                  )}
                >
                  <input
                    {...register('privacyLevel')}
                    type="radio"
                    value={level.value}
                    className="sr-only"
                  />
                  <div className="text-2xl">{level.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-gold-100 font-medium">{level.title}</h3>
                    <p className="text-sm text-gold-200">{level.description}</p>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border-2 transition-all duration-200',
                      {
                        'border-gold-400 bg-gold-400': watchedValues.privacyLevel === level.value,
                        'border-gold-500/50': watchedValues.privacyLevel !== level.value,
                      }
                    )}
                  />
                </label>
              ))}
            </div>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Clock className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Data Retention</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="sessionHistory" className="block text-sm font-medium text-gold-200 mb-2">
                  Session History (days)
                </label>
                <select
                  {...register('sessionHistory')}
                  id="sessionHistory"
                  className="input-field"
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>

              <div>
                <label htmlFor="assessmentResults" className="block text-sm font-medium text-gold-200 mb-2">
                  Assessment Results (days)
                </label>
                <select
                  {...register('assessmentResults')}
                  id="assessmentResults"
                  className="input-field"
                >
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                  <option value={730}>2 years</option>
                  <option value={-1}>Permanent</option>
                </select>
              </div>

              <div>
                <label htmlFor="conversationLogs" className="block text-sm font-medium text-gold-200 mb-2">
                  Conversation Logs (days)
                </label>
                <select
                  {...register('conversationLogs')}
                  id="conversationLogs"
                  className="input-field"
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold-500/20">
                <div>
                  <h3 className="text-gold-100 font-medium">Auto-delete expired data</h3>
                  <p className="text-sm text-gold-200">Automatically remove data after retention period</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.autoDelete}
                  onChange={(checked) => setValue('autoDelete', checked)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreferencesStep;