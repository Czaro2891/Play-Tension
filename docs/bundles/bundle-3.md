===== FILE: src/components/onboarding/NavigationControls.tsx =====
`$Lang
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
``r

===== FILE: src/components/onboarding/ProgressIndicator.tsx =====
`$Lang
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
``r

===== FILE: src/components/assessment/AssessmentHeader.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Brain, Heart, Users, Star } from 'lucide-react';

const AssessmentHeader: React.FC = () => {
  const { state } = useAssessment();

  const getCurrentPhase = () => {
    const questionCount = state.answers.length;
    if (questionCount < 3) return 'Initial Assessment';
    if (questionCount < 6) return 'Emotional Patterns';
    if (questionCount < 8) return 'Relationship Dynamics';
    return 'Deep Insights';
  };

  const getPhaseIcon = () => {
    const questionCount = state.answers.length;
    if (questionCount < 3) return Brain;
    if (questionCount < 6) return Heart;
    if (questionCount < 8) return Users;
    return Star;
  };

  const IconComponent = getPhaseIcon();

  return (
    <div className="bg-dark-800 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-dark-900" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Psychological Assessment</h2>
            <p className="text-gray-400">{getCurrentPhase()}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gold-400">{Math.round(state.progress)}%</div>
          <div className="text-sm text-gray-400">Complete</div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-dark-700 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${state.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Question {state.answers.length + 1} of 10</span>
          <span>{state.answers.length} answered</span>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
``r

===== FILE: src/components/assessment/ProgressIndicator.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';

const ProgressIndicator: React.FC = () => {
  const { state } = useAssessment();

  return (
    <div className="bg-dark-800 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">Progress</span>
        <span className="text-sm text-gray-400">{Math.round(state.progress)}%</span>
      </div>
      
      <div className="w-full bg-dark-700 rounded-full h-2">
        <motion.div
          className="h-2 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${state.progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Question {state.answers.length + 1} of 10</span>
        <span>{state.answers.length} answered</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
``r

===== FILE: src/components/assessment/QuestionDisplay.tsx =====
`$Lang
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';
import { QuestionType } from '../../types';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import ScaleQuestion from './questions/ScaleQuestion';

const QuestionDisplay: React.FC = () => {
  const { state, answerQuestion, getNextQuestion } = useAssessment();
  const [isAnswering, setIsAnswering] = useState(false);

  const handleAnswer = async (answer: any) => {
    if (!state.currentQuestion || isAnswering) return;
    
    setIsAnswering(true);
    
    try {
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      answerQuestion(state.currentQuestion.id, answer, 2000); // Mock time spent
      getNextQuestion();
    } finally {
      setIsAnswering(false);
    }
  };

  if (!state.currentQuestion) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading question...</p>
      </div>
    );
  }

  const renderQuestion = () => {
    if (!state.currentQuestion) return null;
    
    switch (state.currentQuestion.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceQuestion
            question={state.currentQuestion}
            onAnswer={handleAnswer}
            disabled={isAnswering}
          />
        );
      case QuestionType.SCALE:
        return (
          <ScaleQuestion
            question={state.currentQuestion}
            onAnswer={handleAnswer}
            disabled={isAnswering}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Unsupported question type</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      key={state.currentQuestion.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-800 rounded-xl p-8 shadow-xl border border-dark-700"
    >
      {renderQuestion()}
    </motion.div>
  );
};

export default QuestionDisplay;
``r

===== FILE: src/components/assessment/PhaseTransition.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Brain, Heart, Users, Star } from 'lucide-react';

const PhaseTransition: React.FC = () => {
  const { state } = useAssessment();

  const phases = [
    { name: 'Initial Assessment', icon: Brain, color: 'from-blue-500 to-purple-600' },
    { name: 'Emotional Patterns', icon: Heart, color: 'from-pink-500 to-rose-600' },
    { name: 'Relationship Dynamics', icon: Users, color: 'from-green-500 to-emerald-600' },
    { name: 'Deep Insights', icon: Star, color: 'from-yellow-500 to-orange-600' }
  ];

  const currentPhaseIndex = Math.floor((state.answers.length / 10) * phases.length);

  return (
    <div className="bg-dark-800 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Assessment Progress</h3>
      
      <div className="flex items-center justify-between">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-2 ${
              index <= currentPhaseIndex ? 'text-white' : 'text-gray-500'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentPhaseIndex 
                ? `bg-gradient-to-r ${phase.color}` 
                : 'bg-dark-700'
            }`}>
              <phase.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium hidden sm:block">{phase.name}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-dark-700 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${state.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Question {state.answers.length + 1} of 10</span>
          <span>{Math.round(state.progress)}% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default PhaseTransition;
``r

===== FILE: src/components/assessment/questions/MultipleChoiceQuestion.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { cn } from '../../../utils';

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  if (!question.options) {
    return <div className="text-red-400">No options provided for multiple choice question</div>;
  }

  return (
    <div className="space-y-3">
      {question.options.map((option, index) => {
        const isSelected = selectedAnswer === option.value;
        
        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => !disabled && onAnswer(option.value)}
            disabled={disabled}
            className={cn(
              'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 disabled:cursor-not-allowed',
              {
                'border-gold-400 bg-gradient-to-r from-rose-500/20 to-gold-500/20 text-gold-100': isSelected,
                'border-gold-500/30 bg-dark-700/30 text-gold-200 hover:border-gold-400/60 hover:bg-dark-600/40': !isSelected && !disabled,
                'border-dark-600 bg-dark-800/30 text-dark-400': disabled && !isSelected,
              }
            )}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center space-x-3">
              {/* Option Indicator */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                  {
                    'border-gold-400 bg-gold-400': isSelected,
                    'border-gold-500/50': !isSelected,
                  }
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                )}
              </div>

              {/* Option Content */}
              <div className="flex-1">
                <div className="font-medium">{option.text}</div>
                {option.metadata?.description && (
                  <div className="text-sm opacity-80 mt-1">
                    {option.metadata.description}
                  </div>
                )}
              </div>

              {/* Option Letter */}
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300',
                  {
                    'bg-gold-400 text-dark-900': isSelected,
                    'bg-dark-600 text-gold-400': !isSelected,
                  }
                )}
              >
                {String.fromCharCode(65 + index)}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MultipleChoiceQuestion;
``r

===== FILE: src/components/assessment/questions/ScaleQuestion.tsx =====
`$Lang
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { cn } from '../../../utils';

interface ScaleQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const ScaleQuestion: React.FC<ScaleQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  
  // Get scale parameters from question metadata
  const minValue = question.metadata?.minValue || 1;
  const maxValue = question.metadata?.maxValue || 10;
  const step = question.metadata?.step || 1;
  const labels = question.metadata?.labels || {};
  
  const scaleValues = [];
  for (let i = minValue; i <= maxValue; i += step) {
    scaleValues.push(i);
  }

  const getScaleColor = (value: number) => {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    if (percentage <= 20) return 'from-red-500 to-red-600';
    if (percentage <= 40) return 'from-orange-500 to-orange-600';
    if (percentage <= 60) return 'from-yellow-500 to-yellow-600';
    if (percentage <= 80) return 'from-green-500 to-green-600';
    return 'from-emerald-500 to-emerald-600';
  };

  const getScaleDescription = (value: number) => {
    if (labels[value]) return labels[value];
    
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    if (percentage <= 20) return 'Strongly Disagree';
    if (percentage <= 40) return 'Disagree';
    if (percentage <= 60) return 'Neutral';
    if (percentage <= 80) return 'Agree';
    return 'Strongly Agree';
  };

  return (
    <div className="card p-6">
      <div className="space-y-6">
        {/* Scale Labels */}
        {(labels[minValue] || labels[maxValue]) && (
          <div className="flex justify-between text-sm text-gold-300">
            <span>{labels[minValue] || `${minValue}`}</span>
            <span>{labels[maxValue] || `${maxValue}`}</span>
          </div>
        )}

        {/* Scale */}
        <div className="relative">
          {/* Background Track */}
          <div className="w-full h-2 bg-dark-700 rounded-full mb-6" />
          
          {/* Scale Points */}
          <div className="flex justify-between items-center -mt-8">
            {scaleValues.map((value, index) => {
              const isSelected = selectedAnswer === value;
              const isHovered = hoveredValue === value;
              const isActive = isSelected || isHovered;
              
              return (
                <motion.button
                  key={value}
                  onClick={() => !disabled && onAnswer(value)}
                  onMouseEnter={() => setHoveredValue(value)}
                  onMouseLeave={() => setHoveredValue(null)}
                  disabled={disabled}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all duration-300 relative disabled:cursor-not-allowed',
                    {
                      [`bg-gradient-to-r ${getScaleColor(value)} border-transparent text-white`]: isActive,
                      'border-gold-500/50 bg-dark-600 text-gold-300 hover:border-gold-400': !isActive && !disabled,
                      'border-dark-600 bg-dark-800 text-dark-400': disabled,
                    }
                  )}
                  whileHover={!disabled ? { scale: 1.2 } : {}}
                  whileTap={!disabled ? { scale: 0.9 } : {}}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="text-sm font-bold">{value}</span>
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-dark-800 text-gold-100 text-xs rounded-lg border border-gold-500/30 whitespace-nowrap z-10"
                    >
                      {getScaleDescription(value)}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-dark-800" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Current Selection Display */}
        {(selectedAnswer !== null && selectedAnswer !== undefined) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-gradient-to-r from-rose-500/10 to-gold-500/10 border border-gold-500/30 rounded-lg"
          >
            <div className="text-lg font-semibold text-gold-100 mb-1">
              Selected: {selectedAnswer}
            </div>
            <div className="text-sm text-gold-200">
              {getScaleDescription(selectedAnswer)}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="text-center text-sm text-gold-300">
          Click on a number to select your response
        </div>
      </div>
    </div>
  );
};

export default ScaleQuestion;
``r

===== FILE: src/components/assessment/questions/TextQuestion.tsx =====
`$Lang
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { MessageCircle, Send } from 'lucide-react';
import { cn } from '../../../utils';

interface TextQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const [textValue, setTextValue] = useState(selectedAnswer || '');
  const [wordCount, setWordCount] = useState(0);
  
  const minLength = question.metadata?.minLength || 10;
  const maxLength = question.metadata?.maxLength || 500;
  const placeholder = question.metadata?.placeholder || 'Share your thoughts...';
  const isMultiline = question.metadata?.multiline !== false;

  const handleTextChange = (value: string) => {
    if (value.length <= maxLength) {
      setTextValue(value);
      setWordCount(value.trim().split(/\s+/).filter(word => word.length > 0).length);
    }
  };

  const handleSubmit = () => {
    if (textValue.trim().length >= minLength && !disabled) {
      onAnswer(textValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (!isMultiline || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isValid = textValue.trim().length >= minLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="space-y-4">
        {/* Input Area */}
        <div className="relative">
          <div className="absolute top-3 left-3 text-gold-400">
            <MessageCircle className="w-5 h-5" />
          </div>
          
          {isMultiline ? (
            <textarea
              value={textValue}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'w-full pl-12 pr-4 py-3 bg-dark-700/50 border border-gold-500/30 rounded-lg text-gold-100 placeholder-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none transition-all duration-300',
                {
                  'border-green-400 focus:ring-green-400': isValid,
                  'border-red-400 focus:ring-red-400': textValue.length > 0 && !isValid,
                  'opacity-50 cursor-not-allowed': disabled,
                }
              )}
              rows={6}
            />
          ) : (
            <input
              type="text"
              value={textValue}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'w-full pl-12 pr-4 py-3 bg-dark-700/50 border border-gold-500/30 rounded-lg text-gold-100 placeholder-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300',
                {
                  'border-green-400 focus:ring-green-400': isValid,
                  'border-red-400 focus:ring-red-400': textValue.length > 0 && !isValid,
                  'opacity-50 cursor-not-allowed': disabled,
                }
              )}
            />
          )}
        </div>

        {/* Stats and Validation */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className={cn(
              'transition-colors',
              {
                'text-green-400': isValid,
                'text-red-400': textValue.length > 0 && !isValid,
                'text-gold-300': textValue.length === 0,
              }
            )}>
              {textValue.length}/{maxLength} characters
            </span>
            
            {wordCount > 0 && (
              <span className="text-gold-300">
                {wordCount} words
              </span>
            )}
          </div>

          <div className={cn(
            'text-sm transition-colors',
            {
              'text-green-400': isValid,
              'text-red-400': textValue.length > 0 && !isValid,
              'text-gold-300': textValue.length === 0,
            }
          )}>
            {textValue.length < minLength 
              ? `${minLength - textValue.length} more characters needed`
              : 'Ready to submit'
            }
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isValid || disabled}
            className={cn(
              'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300',
              {
                'bg-gradient-to-r from-rose-500 to-gold-500 text-white hover:shadow-lg': isValid && !disabled,
                'bg-dark-600 text-dark-300 cursor-not-allowed': !isValid || disabled,
              }
            )}
          >
            <span>Submit Response</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Helpful Tips */}
        <div className="text-xs text-gold-300 space-y-1">
          <p>• Be honest and authentic in your response</p>
          <p>• Take your time to reflect before answering</p>
          {isMultiline && <p>• Press Ctrl+Enter to submit quickly</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default TextQuestion;
``r

===== FILE: src/components/assessment/questions/ImageChoiceQuestion.tsx =====
`$Lang
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { Eye, Heart, Zap, Shield } from 'lucide-react';

interface ImageChoiceQuestionProps {
  question: Question;
  onAnswer: (value: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  
  const images = question.metadata?.images || [];
  const gridCols = images.length <= 2 ? 'md:grid-cols-2' : 
                  images.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 
                  'md:grid-cols-3 lg:grid-cols-4';

  const getEmotionalIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'desire': return <Heart className="w-6 h-6" />;
      case 'power': return <Zap className="w-6 h-6" />;
      case 'safety': return <Shield className="w-6 h-6" />;
      default: return <Eye className="w-6 h-6" />;
    }
  };

  const getEmotionalColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'desire': return 'from-rose-500 to-pink-600';
      case 'power': return 'from-gold-500 to-yellow-600';
      case 'safety': return 'from-green-500 to-emerald-600';
      case 'mystery': return 'from-purple-500 to-violet-600';
      case 'intimacy': return 'from-red-500 to-rose-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {question.metadata?.instruction && (
        <div className="text-gold-200 text-center p-4 bg-dark-700/30 rounded-lg border border-gold-500/20">
          {question.metadata.instruction}
        </div>
      )}
      
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {images.map((image: any, index: number) => {
          const isSelected = selectedAnswer === image.value;
          const isHovered = hoveredOption === image.id;
          
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.button
                onClick={() => !disabled && onAnswer(image.value)}
                disabled={disabled}
                onMouseEnter={() => setHoveredOption(image.id)}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative w-full aspect-square rounded-2xl overflow-hidden
                  transition-all duration-300 disabled:cursor-not-allowed
                  ${isSelected 
                    ? 'ring-4 ring-gold-400 shadow-2xl shadow-gold-400/20' 
                    : 'hover:ring-2 hover:ring-gold-500/50 hover:shadow-xl'
                  }
                `}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.alt || image.description}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getEmotionalColor(image.emotion)} flex items-center justify-center`}>
                      <div className="text-white">
                        {getEmotionalIcon(image.emotion)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent
                  transition-opacity duration-300
                  ${isHovered || isSelected ? 'opacity-90' : 'opacity-60'}
                `} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${getEmotionalColor(image.emotion)}`}>
                      {getEmotionalIcon(image.emotion)}
                    </div>
                    {image.intensity && (
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < image.intensity ? 'bg-gold-400' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  
                  {image.description && (
                    <p className="text-sm text-gold-200 opacity-90">
                      {image.description}
                    </p>
                  )}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center"
                  >
                    <Eye className="w-5 h-5 text-dark-900" />
                  </motion.div>
                )}

                {/* Hover Effect */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-gold-500/20 via-transparent to-transparent pointer-events-none"
                />
              </motion.button>
              
              {/* Emotional Tags */}
              {image.tags && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {image.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-dark-700/50 text-gold-300 text-xs rounded-full border border-gold-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selection Feedback */}
      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg"
        >
          <p className="text-gold-200">
            Your choice reveals interesting patterns about your psychological preferences...
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageChoiceQuestion;
``r

