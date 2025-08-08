import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { cn } from '../../utils';

const NavigationControls: React.FC = () => {
  const {
    state,
    nextStep,
    prevStep,
    submitOnboarding,
  } = useOnboarding();

  const { currentStep } = state;
  const totalSteps = 6; // 6 steps total (0-5)
  const isLoading = false; // Simplified for local-only setup

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep) {
      submitOnboarding();
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gold-500/20">
      {/* Previous Button */}
      <motion.button
        onClick={prevStep}
        disabled={isFirstStep || isLoading}
        className={cn(
          'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300',
          {
            'bg-dark-700/50 border border-gold-500/30 text-gold-200 hover:bg-dark-600/50 hover:border-gold-400/50':
              !isFirstStep && !isLoading,
            'bg-dark-800/50 border border-dark-600 text-dark-400 cursor-not-allowed':
              isFirstStep || isLoading,
          }
        )}
        whileHover={!isFirstStep && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!isFirstStep && !isLoading ? { scale: 0.98 } : {}}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </motion.button>

      {/* Step Counter */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gold-300">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Next/Submit Button */}
      <motion.button
        onClick={handleNext}
        disabled={isLoading}
        className={cn(
          'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300',
          {
            'bg-gradient-to-r from-rose-500 to-gold-500 text-white hover:shadow-lg hover:shadow-rose-500/25':
              !isLoading,
            'bg-dark-600 text-dark-300 cursor-not-allowed': isLoading,
          }
        )}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <span>{isLastStep ? 'Complete Setup' : 'Continue'}</span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default NavigationControls;