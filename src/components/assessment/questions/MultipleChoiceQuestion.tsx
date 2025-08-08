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