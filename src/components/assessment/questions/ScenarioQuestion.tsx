import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { Play, MessageCircle, Brain } from 'lucide-react';
import { cn } from '../../../utils';

interface ScenarioQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const ScenarioQuestion: React.FC<ScenarioQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);
  const [isReflecting, setIsReflecting] = useState(false);

  const scenario = question.metadata?.scenario || question.text;
  const reflection = question.metadata?.reflection;
  const options = question.options || [];

  const handleOptionSelect = (optionValue: any) => {
    if (disabled) return;
    
    setSelectedOption(optionValue);
    
    // If there's a reflection prompt, show it first
    if (reflection && !selectedAnswer) {
      setIsReflecting(true);
      setTimeout(() => {
        setIsReflecting(false);
        onAnswer(optionValue);
      }, 2000);
    } else {
      onAnswer(optionValue);
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gold-100 mb-2">Scenario</h3>
            <p className="text-gold-200 leading-relaxed">{scenario}</p>
          </div>
        </div>

        {/* Reflection Prompt */}
        {reflection && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 font-medium mb-1">Reflect on this:</h4>
                <p className="text-blue-200 text-sm">{reflection}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Reflection State */}
      {isReflecting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="card p-8 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gold-100 mb-2">
            Processing your response...
          </h3>
          <p className="text-gold-200">
            Take a moment to reflect on your choice and what it reveals about you.
          </p>
          <div className="mt-4">
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Response Options */}
      {!isReflecting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-5 h-5 text-gold-400" />
            <h3 className="text-lg font-semibold text-gold-100">
              How would you respond?
            </h3>
          </div>

          {options.map((option, index) => {
            const isSelected = selectedOption === option.value;
            
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleOptionSelect(option.value)}
                disabled={disabled}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 disabled:cursor-not-allowed group',
                  {
                    'border-gold-400 bg-gradient-to-r from-rose-500/20 to-gold-500/20 text-gold-100': isSelected,
                    'border-gold-500/30 bg-dark-700/30 text-gold-200 hover:border-gold-400/60 hover:bg-dark-600/40': !isSelected && !disabled,
                    'border-dark-600 bg-dark-800/30 text-dark-400': disabled && !isSelected,
                  }
                )}
                whileHover={!disabled ? { scale: 1.01 } : {}}
                whileTap={!disabled ? { scale: 0.99 } : {}}
              >
                <div className="flex items-start space-x-3">
                  {/* Option Letter */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300',
                      {
                        'bg-gold-400 text-dark-900': isSelected,
                        'bg-dark-600 text-gold-400 group-hover:bg-gold-500/20': !isSelected,
                      }
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>

                  {/* Option Content */}
                  <div className="flex-1">
                    <div className="font-medium leading-relaxed">{option.text}</div>
                    {option.metadata?.consequence && (
                      <div className="text-sm opacity-80 mt-2 italic">
                        Likely outcome: {option.metadata.consequence}
                      </div>
                    )}
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center text-sm text-gold-300">
        Choose the response that feels most authentic to you in this situation
      </div>
    </div>
  );
};

export default ScenarioQuestion;