import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils';

interface ProgressIndicatorProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  'Welcome',
  'Basic Info',
  'Preferences',
  'Boundaries',
  'Interests',
  'Privacy',
  'Complete'
];

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border-b border-gold-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gold-200">Progress</span>
            <span className="text-sm text-gold-300">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-rose-500 to-gold-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="hidden md:flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className="flex items-center">
                  {/* Step Circle */}
                  <motion.div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300',
                      {
                        'bg-gradient-to-r from-rose-500 to-gold-500 text-white border-transparent': isCompleted,
                        'bg-dark-700 border-gold-400 text-gold-100': isCurrent,
                        'bg-dark-800 border-dark-600 text-dark-400': isUpcoming,
                      }
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </motion.div>

                  {/* Connector Line */}
                  {stepNumber < totalSteps && (
                    <div
                      className={cn(
                        'w-16 h-1 ml-2 transition-all duration-300',
                        {
                          'bg-gradient-to-r from-rose-500 to-gold-500': isCompleted,
                          'bg-dark-600': !isCompleted,
                        }
                      )}
                    />
                  )}
                </div>

                {/* Step Title */}
                <span
                  className={cn(
                    'mt-2 text-xs font-medium text-center transition-all duration-300',
                    {
                      'text-gold-200': isCompleted || isCurrent,
                      'text-dark-400': isUpcoming,
                    }
                  )}
                >
                  {stepTitles[index]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Step Indicator */}
        <div className="md:hidden flex items-center justify-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={stepNumber}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  {
                    'bg-gradient-to-r from-rose-500 to-gold-500': isCompleted || isCurrent,
                    'bg-dark-600': !isCompleted && !isCurrent,
                  }
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;