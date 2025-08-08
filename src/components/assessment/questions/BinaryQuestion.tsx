import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { Check, X } from 'lucide-react';
import { cn } from '../../../utils';

interface BinaryQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const BinaryQuestion: React.FC<BinaryQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const yesLabel = question.metadata?.yesLabel || 'Yes';
  const noLabel = question.metadata?.noLabel || 'No';
  const yesValue = question.metadata?.yesValue || true;
  const noValue = question.metadata?.noValue || false;

  const options = [
    {
      value: yesValue,
      label: yesLabel,
      icon: Check,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-400 hover:to-emerald-500',
    },
    {
      value: noValue,
      label: noLabel,
      icon: X,
      color: 'from-red-500 to-rose-600',
      hoverColor: 'hover:from-red-400 hover:to-rose-500',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option.value;
        const IconComponent = option.icon;
        
        return (
          <motion.button
            key={option.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => !disabled && onAnswer(option.value)}
            disabled={disabled}
            className={cn(
              'relative p-8 rounded-xl border-2 transition-all duration-300 disabled:cursor-not-allowed overflow-hidden group',
              {
                [`border-transparent bg-gradient-to-r ${option.color} text-white shadow-lg`]: isSelected,
                [`border-gold-500/30 bg-dark-700/30 text-gold-200 hover:border-gold-400/60 ${option.hoverColor} hover:text-white`]: !isSelected && !disabled,
                'border-dark-600 bg-dark-800/30 text-dark-400': disabled && !isSelected,
              }
            )}
            whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              {/* Icon */}
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                  {
                    'bg-white/20': isSelected,
                    'bg-gold-500/20 group-hover:bg-white/20': !isSelected,
                  }
                )}
              >
                <IconComponent className="w-8 h-8" />
              </div>

              {/* Label */}
              <div className="text-xl font-semibold">
                {option.label}
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-green-600" />
                </motion.div>
              )}
            </div>

            {/* Animated Border */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BinaryQuestion;