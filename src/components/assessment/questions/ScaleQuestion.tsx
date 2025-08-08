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