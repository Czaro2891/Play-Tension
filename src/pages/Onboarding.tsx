import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { OnboardingProvider, useOnboarding } from '../contexts/OnboardingContext';
import OnboardingStep from '../components/onboarding/OnboardingStep';
import ProgressIndicator from '../components/onboarding/ProgressIndicator';
import NavigationControls from '../components/onboarding/NavigationControls';
import { Zap } from 'lucide-react';

const OnboardingContent: React.FC = () => {
  const { state } = useOnboarding();
  const { currentStep, isComplete } = state;
  const totalSteps = 6; // 6 steps total (0-5)
  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (isComplete) {
    return <Navigate to="/assessment" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      {/* Header */}
      <header className="bg-dark-800/95 backdrop-blur-md border-b border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-gold-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gold-400">
                Tensions
              </span>
            </div>
            
            <div className="text-sm text-gold-300">
              Step {currentStep + 1} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressIndicator progress={progress} currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px] flex flex-col"
          >
            <OnboardingStep step={currentStep} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <NavigationControls />
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-gold-400/30 rounded-full"
          />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-rose-400/30 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const Onboarding: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/user-setup" replace />;
  }

  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default Onboarding;