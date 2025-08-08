===== FILE: src/components/assessment/questions/BinaryQuestion.tsx =====
`$Lang
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
``r

===== FILE: src/components/assessment/questions/ScenarioQuestion.tsx =====
`$Lang
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
``r

===== FILE: src/components/assessment/questions/RankingQuestion.tsx =====
`$Lang
import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Question } from '../../../types';
import { GripVertical, Check } from 'lucide-react';
import { cn } from '../../../utils';

interface RankingQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

interface RankingItem {
  id: string;
  text: string;
  description?: string;
}

const RankingQuestion: React.FC<RankingQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const items: RankingItem[] = question.options?.map(option => ({
    id: option.id,
    text: option.text,
    description: option.metadata?.description,
  })) || [];

  const [rankedItems, setRankedItems] = useState<RankingItem[]>(
    selectedAnswer || [...items]
  );
  const [isSubmitted, setIsSubmitted] = useState(!!selectedAnswer);

  const handleReorder = (newItems: RankingItem[]) => {
    if (!disabled && !isSubmitted) {
      setRankedItems(newItems);
    }
  };

  const handleSubmit = () => {
    if (!disabled && !isSubmitted) {
      const ranking = rankedItems.map(item => item.id);
      onAnswer(ranking);
      setIsSubmitted(true);
    }
  };

  const hasChanged = JSON.stringify(rankedItems.map(item => item.id)) !== 
                     JSON.stringify(items.map(item => item.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="space-y-6">
        {/* Instructions */}
        <div className="text-center p-4 bg-dark-700/30 rounded-lg border border-gold-500/20">
          <p className="text-gold-200">
            Drag and drop the items below to rank them in order of importance to you.
          </p>
          <p className="text-gold-300 text-sm mt-1">
            1st = Most important • Last = Least important
          </p>
        </div>

        {/* Ranking List */}
        <Reorder.Group
          axis="y"
          values={rankedItems}
          onReorder={handleReorder}
          className="space-y-3"
        >
          {rankedItems.map((item, index) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className={cn(
                'group cursor-grab active:cursor-grabbing',
                {
                  'cursor-not-allowed': disabled || isSubmitted,
                }
              )}
              whileDrag={{ scale: 1.02, zIndex: 10 }}
            >
              <div
                className={cn(
                  'flex items-center space-x-4 p-4 bg-dark-700/30 border-2 border-gold-500/30 rounded-lg transition-all duration-300',
                  {
                    'hover:border-gold-400/60 hover:bg-dark-600/40': !disabled && !isSubmitted,
                    'border-green-400 bg-green-500/10': isSubmitted,
                    'opacity-50': disabled,
                  }
                )}
              >
                {/* Rank Number */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                    {
                      'bg-gradient-to-r from-rose-500 to-gold-500 text-white': index < 3,
                      'bg-gold-500/20 text-gold-300': index >= 3,
                    }
                  )}
                >
                  {index + 1}
                </div>

                {/* Drag Handle */}
                <div
                  className={cn(
                    'text-gold-400 transition-colors duration-300',
                    {
                      'group-hover:text-gold-300': !disabled && !isSubmitted,
                      'text-dark-400': disabled || isSubmitted,
                    }
                  )}
                >
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Item Content */}
                <div className="flex-1">
                  <div className="text-gold-100 font-medium">{item.text}</div>
                  {item.description && (
                    <div className="text-gold-200 text-sm mt-1">
                      {item.description}
                    </div>
                  )}
                </div>

                {/* Position Indicator */}
                <div className="text-right">
                  <div className="text-gold-300 text-sm">
                    #{index + 1}
                  </div>
                  {index === 0 && (
                    <div className="text-rose-400 text-xs font-medium">
                      Most Important
                    </div>
                  )}
                  {index === rankedItems.length - 1 && (
                    <div className="text-blue-400 text-xs font-medium">
                      Least Important
                    </div>
                  )}
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!hasChanged || disabled}
              className={cn(
                'flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-300',
                {
                  'bg-gradient-to-r from-rose-500 to-gold-500 text-white hover:shadow-lg': hasChanged && !disabled,
                  'bg-dark-600 text-dark-300 cursor-not-allowed': !hasChanged || disabled,
                }
              )}
            >
              <span>Confirm Ranking</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Confirmation */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <Check className="w-5 h-5" />
              <span className="font-medium">Ranking submitted successfully!</span>
            </div>
          </motion.div>
        )}

        {/* Help Text */}
        <div className="text-xs text-gold-300 text-center">
          <p>Drag items up or down to change their ranking • Your ranking will help us understand your priorities</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RankingQuestion;
``r

===== FILE: src/components/assessment/questions/WordAssociationQuestion.tsx =====
`$Lang
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../../../types';
import { Zap, Clock, Brain, Target } from 'lucide-react';

interface WordAssociationQuestionProps {
  question: Question;
  onAnswer: (value: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const WordAssociationQuestion: React.FC<WordAssociationQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const [currentWord, setCurrentWord] = useState('');
  const [associations, setAssociations] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [responseTime, setResponseTime] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

  const triggerWords = React.useMemo(() => 
    question.metadata?.triggerWords || [
      'intimacy', 'power', 'control', 'vulnerability', 'desire', 'trust', 
      'passion', 'fear', 'love', 'dominance', 'submission', 'freedom'
    ], [question.metadata?.triggerWords]
  );

  const timeLimit = question.metadata?.timeLimit || 30;
  const maxAssociations = question.metadata?.maxAssociations || 10;

  const analyzePsychologicalPatterns = React.useCallback(() => {
    const patterns = {
      emotionalWords: 0,
      powerWords: 0,
      fearWords: 0,
      intimacyWords: 0,
      controlWords: 0,
    };

    const categories = {
      emotional: ['love', 'joy', 'happiness', 'sadness', 'anger', 'passion', 'desire'],
      power: ['control', 'dominance', 'strength', 'authority', 'command', 'rule'],
      fear: ['afraid', 'scared', 'terror', 'anxiety', 'worry', 'panic'],
      intimacy: ['close', 'connection', 'bond', 'together', 'unity', 'merge'],
      control: ['manage', 'direct', 'guide', 'influence', 'manipulate', 'handle'],
    };

    associations.forEach(word => {
      Object.entries(categories).forEach(([category, words]) => {
        if (words.some(catWord => word.includes(catWord) || catWord.includes(word))) {
          patterns[category as keyof typeof patterns]++;
        }
      });
    });

    return patterns;
  }, [associations]);

  const handleComplete = React.useCallback(() => {
    if (associations.length > 0) {
      const result = {
        triggerWords: triggerWords.slice(0, associations.length),
        associations,
        responseTimes: responseTime,
        averageResponseTime: responseTime.reduce((a, b) => a + b, 0) / responseTime.length,
        completionRate: (associations.length / maxAssociations) * 100,
        psychologicalPatterns: analyzePsychologicalPatterns(),
        timestamp: new Date(),
      };
      onAnswer(result);
    }
    setIsActive(false);
  }, [associations, responseTime, maxAssociations, triggerWords, onAnswer, analyzePsychologicalPatterns]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && associations.length < maxAssociations) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 || associations.length >= maxAssociations) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, associations.length, maxAssociations, handleComplete]);

  const startAssociation = () => {
    const randomWord = triggerWords[Math.floor(Math.random() * triggerWords.length)];
    setCurrentWord(randomWord);
    setIsActive(true);
    setTimeLeft(timeLimit);
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const responseTimeMs = Date.now() - startTimeRef.current;
      const newAssociation = inputValue.trim().toLowerCase();
      
      setAssociations(prev => [...prev, newAssociation]);
      setResponseTime(prev => [...prev, responseTimeMs]);
      setInputValue('');
      startTimeRef.current = Date.now();
      
      // Generate new trigger word based on association
      if (associations.length < maxAssociations - 1) {
        setTimeout(() => {
          const nextWord = getNextTriggerWord(newAssociation);
          setCurrentWord(nextWord);
        }, 500);
      }
    }
  };

  const getNextTriggerWord = (lastAssociation: string) => {
    // Simple logic to create psychological chains
    const chains: Record<string, string[]> = {
      'love': ['fear', 'loss', 'intimacy'],
      'power': ['control', 'dominance', 'freedom'],
      'fear': ['safety', 'trust', 'vulnerability'],
      'control': ['submission', 'freedom', 'power'],
      'intimacy': ['vulnerability', 'trust', 'connection'],
      'trust': ['betrayal', 'safety', 'openness'],
    };

    const possibleNext = chains[lastAssociation] || triggerWords;
    return possibleNext[Math.floor(Math.random() * possibleNext.length)];
  };





  const getProgressColor = () => {
    const progress = (associations.length / maxAssociations) * 100;
    if (progress < 30) return 'from-red-500 to-orange-500';
    if (progress < 70) return 'from-yellow-500 to-gold-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center p-6 bg-dark-700/30 rounded-lg border border-gold-500/20">
        <Brain className="w-8 h-8 text-gold-400 mx-auto mb-3" />
        <h3 className="text-gold-200 text-lg font-semibold mb-2">
          Rapid Word Association
        </h3>
        <p className="text-gold-300 text-sm">
          Type the first word that comes to mind. Don't think - just respond instinctively.
          Your subconscious patterns reveal deep psychological insights.
        </p>
      </div>

      {!isActive && associations.length === 0 && (
        <div className="text-center">
          <motion.button
            onClick={startAssociation}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-lg hover:shadow-gold-500/25 disabled:opacity-50"
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Begin Association Test
          </motion.button>
        </div>
      )}

      {isActive && (
        <div className="space-y-6">
          {/* Timer and Progress */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gold-300">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{timeLeft}s</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gold-300 text-sm">
                {associations.length}/{maxAssociations}
              </span>
              <div className="w-32 h-2 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(associations.length / maxAssociations) * 100}%` }}
                  className={`h-full bg-gradient-to-r ${getProgressColor()}`}
                />
              </div>
            </div>
          </div>

          {/* Current Trigger Word */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                <div className="px-8 py-4 bg-gradient-to-r from-gold-500 to-rose-500 text-white text-2xl font-bold rounded-2xl shadow-2xl">
                  {currentWord.toUpperCase()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleInputSubmit}
              placeholder="Type your association..."
              className="w-full px-6 py-4 bg-dark-700 border-2 border-gold-500/30 rounded-xl text-gold-100 text-lg text-center focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-500/20 transition-all duration-300"
              disabled={disabled}
            />
            <Target className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gold-400 w-5 h-5" />
          </div>

          {/* Recent Associations */}
          {associations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-gold-300 text-sm font-semibold">Your Associations:</h4>
              <div className="flex flex-wrap gap-2">
                {associations.slice(-5).map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-3 py-1 bg-dark-600 text-gold-200 text-sm rounded-full border border-gold-500/20"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {!isActive && associations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 p-6 bg-dark-700/30 rounded-lg border border-gold-500/20"
        >
          <h4 className="text-gold-200 text-lg font-semibold">Analysis Complete</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gold-400">Total Associations:</span>
              <span className="text-gold-200 ml-2">{associations.length}</span>
            </div>
            <div>
              <span className="text-gold-400">Average Response Time:</span>
              <span className="text-gold-200 ml-2">
                {responseTime.length > 0 ? Math.round(responseTime.reduce((a, b) => a + b, 0) / responseTime.length / 1000 * 10) / 10 : 0}s
              </span>
            </div>
          </div>
          <p className="text-gold-300 text-sm">
            Your word associations reveal subconscious patterns and emotional triggers that will be analyzed in your psychological profile.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default WordAssociationQuestion;
``r

===== FILE: src/components/assessment/questions/EmotionWheelQuestion.tsx =====
`$Lang
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../../types';
import { Heart, Zap, Shield, Flame, Snowflake, Sun, Moon, Star } from 'lucide-react';

interface EmotionWheelQuestionProps {
  question: Question;
  onAnswer: (value: any) => void;
  disabled?: boolean;
  selectedAnswer?: any;
}

const EmotionWheelQuestion: React.FC<EmotionWheelQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState(selectedAnswer);
  const [intensity, setIntensity] = useState(50);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Core emotions with psychological significance
  const emotions = [
    { 
      name: 'Passion', 
      icon: Flame, 
      color: '#ef4444', 
      angle: 0,
      description: 'Intense desire and attraction',
      category: 'arousal'
    },
    { 
      name: 'Joy', 
      icon: Sun, 
      color: '#f59e0b', 
      angle: 45,
      description: 'Pure happiness and elation',
      category: 'positive'
    },
    { 
      name: 'Trust', 
      icon: Shield, 
      color: '#10b981', 
      angle: 90,
      description: 'Safety and reliability',
      category: 'security'
    },
    { 
      name: 'Serenity', 
      icon: Snowflake, 
      color: '#06b6d4', 
      angle: 135,
      description: 'Calm and peaceful state',
      category: 'calm'
    },
    { 
      name: 'Mystery', 
      icon: Moon, 
      color: '#8b5cf6', 
      angle: 180,
      description: 'Intrigue and the unknown',
      category: 'curiosity'
    },
    { 
      name: 'Power', 
      icon: Zap, 
      color: '#d97706', 
      angle: 225,
      description: 'Control and dominance',
      category: 'dominance'
    },
    { 
      name: 'Vulnerability', 
      icon: Heart, 
      color: '#ec4899', 
      angle: 270,
      description: 'Openness and emotional exposure',
      category: 'intimacy'
    },
    { 
      name: 'Anticipation', 
      icon: Star, 
      color: '#eab308', 
      angle: 315,
      description: 'Excitement for what\'s to come',
      category: 'excitement'
    },
  ];

  const handleEmotionSelect = (emotion: any) => {
    if (disabled) return;
    
    setSelectedEmotion(emotion);
    const response = {
      emotion: emotion.name,
      intensity,
      category: emotion.category,
      description: emotion.description,
      timestamp: new Date(),
    };
    onAnswer(response);
  };

  const getEmotionPosition = (angle: number, radius: number = 120) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };



  return (
    <div className="space-y-8">
      {/* Instructions */}
      <div className="text-center">
        <p className="text-gold-200 text-lg mb-2">
          Select the emotion that resonates most with you right now
        </p>
        <p className="text-gold-300 text-sm">
          Then adjust the intensity to match how strongly you feel it
        </p>
      </div>

      {/* Emotion Wheel */}
      <div className="flex justify-center">
        <div 
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-gold-500/20"
        >
          {/* Center Circle */}
          <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <span className="text-dark-900 font-bold text-sm">YOU</span>
          </div>

          {/* Emotion Points */}
          {emotions.map((emotion, index) => {
            const position = getEmotionPosition(emotion.angle);
            const isSelected = selectedEmotion?.name === emotion.name;
            const IconComponent = emotion.icon;
            
            return (
              <motion.button
                key={emotion.name}
                onClick={() => handleEmotionSelect(emotion)}
                disabled={disabled}
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                }}
                className="absolute"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  backgroundColor: isSelected ? emotion.color : 'transparent'
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  backgroundColor: { duration: 0.3 }
                }}
              >
                <div 
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    transition-all duration-300 border-2
                    ${isSelected 
                      ? 'border-white shadow-2xl' 
                      : 'border-gold-500/30 hover:border-gold-400 bg-dark-700/50 hover:bg-dark-600/70'
                    }
                  `}
                  style={{
                    backgroundColor: isSelected ? emotion.color : undefined,
                    boxShadow: isSelected ? `0 0 30px ${emotion.color}40` : undefined,
                  }}
                >
                  <IconComponent 
                    className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gold-300'}`}
                  />
                </div>
                
                {/* Emotion Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <span className={`text-xs font-medium ${isSelected ? 'text-gold-200' : 'text-gold-400'}`}>
                    {emotion.name}
                  </span>
                </div>
              </motion.button>
            );
          })}

          {/* Connection Lines */}
          {selectedEmotion && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <radialGradient id="connectionGradient">
                  <stop offset="0%" stopColor={selectedEmotion.color} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={selectedEmotion.color} stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <circle
                cx="50%"
                cy="50%"
                r={`${intensity}px`}
                fill="url(#connectionGradient)"
                className="animate-pulse"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Intensity Slider */}
      {selectedEmotion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center">
            <h3 className="text-gold-200 text-lg font-semibold mb-2">
              {selectedEmotion.name} Intensity
            </h3>
            <p className="text-gold-300 text-sm mb-4">
              {selectedEmotion.description}
            </p>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => {
                const newIntensity = parseInt(e.target.value);
                setIntensity(newIntensity);
                handleEmotionSelect({ ...selectedEmotion, intensity: newIntensity });
              }}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, ${selectedEmotion.color}20 0%, ${selectedEmotion.color} ${intensity}%, #374151 ${intensity}%, #374151 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gold-400 mt-2">
              <span>Subtle</span>
              <span className="font-semibold text-gold-200">{intensity}%</span>
              <span>Overwhelming</span>
            </div>
          </div>

          {/* Intensity Feedback */}
          <div className="text-center p-3 bg-dark-700/30 rounded-lg border border-gold-500/20">
            <p className="text-gold-200 text-sm">
              {intensity < 30 && "A gentle whisper of emotion"}
              {intensity >= 30 && intensity < 70 && "A noticeable presence in your awareness"}
              {intensity >= 70 && "A powerful force driving your experience"}
            </p>
          </div>
        </motion.div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${selectedEmotion?.color || '#f59e0b'};
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 0 10px ${selectedEmotion?.color || '#f59e0b'}40;
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${selectedEmotion?.color || '#f59e0b'};
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 0 10px ${selectedEmotion?.color || '#f59e0b'}40;
          }
        `
      }} />
    </div>
  );
};

export default EmotionWheelQuestion;
``r

===== FILE: src/data/advancedQuestions.ts =====
`$Lang
import { Question, QuestionType, QuestionCategory } from '../types';

export const advancedQuestions: Question[] = [
  // Image Choice Questions
  {
    id: 'img_desire_1',
    type: QuestionType.IMAGE_CHOICE,
    category: QuestionCategory.SUBCONSCIOUS_DESIRES,
    text: 'Which image most strongly evokes desire in you?',
    metadata: {
      instruction: 'Choose instinctively - your first reaction reveals your deepest desires',
      images: [
        {
          id: 'desire_power',
          value: 'power_dynamic',
          emotion: 'power',
          intensity: 4,
          title: 'Control & Command',
          description: 'The thrill of being in control',
          tags: ['dominance', 'control', 'power'],
          url: null // Will use color gradient
        },
        {
          id: 'desire_vulnerability',
          value: 'vulnerability_embrace',
          emotion: 'vulnerability',
          intensity: 5,
          title: 'Open Vulnerability',
          description: 'The beauty of complete openness',
          tags: ['vulnerability', 'trust', 'intimacy'],
          url: null
        },
        {
          id: 'desire_mystery',
          value: 'mystery_intrigue',
          emotion: 'mystery',
          intensity: 3,
          title: 'Hidden Depths',
          description: 'The allure of the unknown',
          tags: ['mystery', 'intrigue', 'discovery'],
          url: null
        },
        {
          id: 'desire_passion',
          value: 'raw_passion',
          emotion: 'passion',
          intensity: 5,
          title: 'Raw Intensity',
          description: 'Pure, unfiltered passion',
          tags: ['passion', 'intensity', 'fire'],
          url: null
        }
      ]
    },
    phase: 'shadow_exploration',
    weight: 3,
    required: true
  },

  // Emotion Wheel Questions
  {
    id: 'emotion_intimacy_1',
    type: QuestionType.EMOTION_WHEEL,
    category: QuestionCategory.INTIMACY_PATTERNS,
    text: 'When you think about true intimacy, what emotion arises most powerfully?',
    metadata: {
      instruction: 'Select the emotion and adjust the intensity to match your inner experience',
      timeLimit: 60,
      requiresIntensity: true
    },
    phase: 'emotional_patterns',
    weight: 4,
    required: true
  },

  {
    id: 'emotion_power_1',
    type: QuestionType.EMOTION_WHEEL,
    category: QuestionCategory.POWER_DYNAMICS,
    text: 'In moments of conflict or negotiation, what emotion drives you?',
    metadata: {
      instruction: 'Be honest about your emotional drivers in power situations',
      timeLimit: 45,
      requiresIntensity: true
    },
    phase: 'relationship_dynamics',
    weight: 3,
    required: true
  },

  // Word Association Questions
  {
    id: 'word_assoc_1',
    type: QuestionType.WORD_ASSOCIATION,
    category: QuestionCategory.PSYCHOLOGICAL_TRIGGERS,
    text: 'Rapid Word Association - Subconscious Mapping',
    metadata: {
      triggerWords: [
        'intimacy', 'power', 'control', 'vulnerability', 'desire', 'trust',
        'passion', 'fear', 'love', 'dominance', 'submission', 'freedom',
        'betrayal', 'safety', 'risk', 'pleasure', 'pain', 'connection'
      ],
      timeLimit: 45,
      maxAssociations: 12,
      instruction: 'Respond with the very first word that comes to mind - no filtering'
    },
    phase: 'shadow_exploration',
    weight: 5,
    required: true
  },

  {
    id: 'word_assoc_sexual',
    type: QuestionType.WORD_ASSOCIATION,
    category: QuestionCategory.SEXUAL_PSYCHOLOGY,
    text: 'Sexual Psychology - Deep Association Mapping',
    metadata: {
      triggerWords: [
        'attraction', 'fantasy', 'forbidden', 'taboo', 'ecstasy', 'surrender',
        'tease', 'hunger', 'worship', 'devour', 'melt', 'consume'
      ],
      timeLimit: 30,
      maxAssociations: 8,
      instruction: 'Let your sexual psyche speak without censorship'
    },
    phase: 'sexual_preferences',
    weight: 4,
    required: true
  },

  // Advanced Scenario Questions
  {
    id: 'scenario_jealousy_1',
    type: QuestionType.SCENARIO,
    category: QuestionCategory.RELATIONSHIP_TRAUMA,
    text: 'Your partner is deeply engaged in conversation with someone attractive at a party. They\'re laughing, touching occasionally, completely absorbed in each other.',
    metadata: {
      scenario: 'You notice your partner across the room, completely engrossed in conversation with someone you find attractive. Their body language is open, they\'re laughing frequently, and there\'s an undeniable chemistry in the air.',
      reflection: 'What does your immediate emotional reaction reveal about your deepest fears?',
      psychologicalFocus: 'attachment_style'
    },
    options: [
      {
        id: 'jealousy_secure',
        text: 'Feel curious and maybe slightly excited by their connection',
        value: 'secure_attachment',
        metadata: { archetype: 'secure', defensiveness: 0 }
      },
      {
        id: 'jealousy_anxious',
        text: 'Experience intense anxiety and need immediate reassurance',
        value: 'anxious_attachment',
        metadata: { archetype: 'anxious', defensiveness: 3 }
      },
      {
        id: 'jealousy_avoidant',
        text: 'Feel emotionally distant and start planning your exit',
        value: 'avoidant_attachment',
        metadata: { archetype: 'avoidant', defensiveness: 4 }
      },
      {
        id: 'jealousy_control',
        text: 'Need to interrupt and reclaim their attention immediately',
        value: 'controlling_response',
        metadata: { archetype: 'anxious', defensiveness: 5 }
      }
    ],
    phase: 'relationship_dynamics',
    weight: 4,
    required: true
  },

  {
    id: 'scenario_power_1',
    type: QuestionType.SCENARIO,
    category: QuestionCategory.POWER_DYNAMICS,
    text: 'In an intimate moment, your partner asks you to take complete control and "do whatever you want" to them.',
    metadata: {
      scenario: 'You\'re in an intimate setting. Your partner looks into your eyes and whispers: "I trust you completely. Take control. Do whatever you want with me."',
      reflection: 'How does this offer of complete surrender affect you psychologically?',
      psychologicalFocus: 'power_dynamics'
    },
    options: [
      {
        id: 'power_embrace',
        text: 'Feel energized and naturally take charge with confidence',
        value: 'natural_dominant',
        metadata: { powerStyle: 'dominant', comfort: 5 }
      },
      {
        id: 'power_gentle',
        text: 'Take control but focus on their pleasure and responses',
        value: 'service_dominant',
        metadata: { powerStyle: 'service_dom', comfort: 4 }
      },
      {
        id: 'power_uncomfortable',
        text: 'Feel uncomfortable with the responsibility and prefer to share control',
        value: 'collaborative',
        metadata: { powerStyle: 'switch', comfort: 2 }
      },
      {
        id: 'power_reverse',
        text: 'Find yourself wanting them to take control instead',
        value: 'natural_submissive',
        metadata: { powerStyle: 'submissive', comfort: 3 }
      }
    ],
    phase: 'sexual_preferences',
    weight: 5,
    required: true
  },

  // Complex Multiple Choice with Psychological Depth
  {
    id: 'trauma_response_1',
    type: QuestionType.MULTIPLE_CHOICE,
    category: QuestionCategory.RELATIONSHIP_TRAUMA,
    text: 'When someone you care about suddenly becomes emotionally distant, your first instinct is to:',
    options: [
      {
        id: 'trauma_pursue',
        text: 'Pursue them harder and try to reconnect immediately',
        value: 'anxious_pursuit',
        metadata: { 
          attachmentStyle: 'anxious',
          traumaResponse: 'hypervigilance',
          defensiveness: 4
        }
      },
      {
        id: 'trauma_mirror',
        text: 'Mirror their distance and protect yourself emotionally',
        value: 'avoidant_withdrawal',
        metadata: { 
          attachmentStyle: 'avoidant',
          traumaResponse: 'emotional_shutdown',
          defensiveness: 5
        }
      },
      {
        id: 'trauma_communicate',
        text: 'Gently ask what\'s happening and offer support',
        value: 'secure_communication',
        metadata: { 
          attachmentStyle: 'secure',
          traumaResponse: 'healthy_inquiry',
          defensiveness: 1
        }
      },
      {
        id: 'trauma_analyze',
        text: 'Analyze what you might have done wrong',
        value: 'self_blame_pattern',
        metadata: { 
          attachmentStyle: 'anxious',
          traumaResponse: 'self_criticism',
          defensiveness: 3
        }
      }
    ],
    phase: 'relationship_dynamics',
    weight: 4,
    required: true,
    metadata: {
      psychologicalFocus: 'attachment_trauma',
      followUpTriggers: ['anxious_pursuit', 'avoidant_withdrawal']
    }
  }
];

// Advanced Question Generator Functions
export const generateFollowUpQuestion = (
  previousAnswer: any,
  category: QuestionCategory,
  detectedPattern: string
): Question | null => {
  // Dynamic question generation based on detected patterns
  const followUpMap: Record<string, Partial<Question>> = {
    'anxious_attachment': {
      type: QuestionType.SCALE,
      text: 'How often do you find yourself needing reassurance in relationships?',
      category: QuestionCategory.ATTACHMENT_STYLE,
      metadata: {
        scaleLabels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Constantly'],
        psychologicalFocus: 'attachment_anxiety'
      }
    },
    'power_dominant': {
      type: QuestionType.EMOTION_WHEEL,
      text: 'When you take control in intimate situations, what emotion do you feel most strongly?',
      category: QuestionCategory.POWER_DYNAMICS,
      metadata: {
        instruction: 'Focus on your internal emotional experience of power'
      }
    },
    'high_defensiveness': {
      type: QuestionType.WORD_ASSOCIATION,
      text: 'Vulnerability Mapping - Quick Association',
      category: QuestionCategory.PSYCHOLOGICAL_TRIGGERS,
      metadata: {
        triggerWords: ['vulnerable', 'exposed', 'weak', 'open', 'raw', 'naked'],
        timeLimit: 20,
        maxAssociations: 6
      }
    }
  };

  const template = followUpMap[detectedPattern];
  if (!template) return null;

  return {
    id: `followup_${detectedPattern}_${Date.now()}`,
    phase: 'validation',
    weight: 2,
    required: false,
    ...template
  } as Question;
};

export const detectPsychologicalPatterns = (answers: any[]): string[] => {
  const patterns: string[] = [];
  
  // Analyze response patterns
  const responseAnalysis = {
    defensiveness: 0,
    powerOrientation: '',
    attachmentStyle: '',
    emotionalRange: 0,
  };

  answers.forEach(answer => {
    // Defensiveness detection
    if (answer.timeSpent && answer.timeSpent > 10000) { // > 10 seconds
      responseAnalysis.defensiveness += 1;
    }
    
    if (answer.confidence && answer.confidence < 50) {
      responseAnalysis.defensiveness += 1;
    }

    // Pattern detection from answer values
    if (typeof answer.value === 'string') {
      if (answer.value.includes('control') || answer.value.includes('dominant')) {
        responseAnalysis.powerOrientation = 'dominant';
      }
      if (answer.value.includes('anxious') || answer.value.includes('pursuit')) {
        responseAnalysis.attachmentStyle = 'anxious';
      }
    }
  });

  // Generate pattern flags
  if (responseAnalysis.defensiveness > 3) {
    patterns.push('high_defensiveness');
  }
  
  if (responseAnalysis.powerOrientation === 'dominant') {
    patterns.push('power_dominant');
  }
  
  if (responseAnalysis.attachmentStyle === 'anxious') {
    patterns.push('anxious_attachment');
  }

  return patterns;
};
``r

===== FILE: src/utils/index.ts =====
`$Lang
import { clsx, type ClassValue } from 'clsx';

// CSS Class utility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Date utilities
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const timeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Privacy and security utilities
export const anonymizeData = (data: any): any => {
  const sensitiveFields = ['email', 'phone', 'address', 'fullName', 'socialSecurityNumber'];
  
  const anonymized = { ...data };
  
  sensitiveFields.forEach(field => {
    if (anonymized[field]) {
      delete anonymized[field];
    }
  });
  
  return anonymized;
};

export const generateSecureToken = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

export const hashSensitiveData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Scoring and analytics utilities
export const calculateCompatibilityScore = (factors: { score: number; weight: number }[]): number => {
  const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
  const weightedSum = factors.reduce((sum, factor) => sum + (factor.score * factor.weight), 0);
  
  return Math.round(weightedSum / totalWeight);
};

export const normalizeScore = (score: number, min: number = 0, max: number = 100): number => {
  return Math.max(min, Math.min(max, score));
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

export const getCompatibilityLevel = (score: number): string => {
  if (score >= 90) return 'Exceptional';
  if (score >= 80) return 'High';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Moderate';
  if (score >= 50) return 'Fair';
  return 'Low';
};

// Text processing utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatEnumValue = (value: string): string => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// URL and routing utilities
export const createShareableLink = (profileId: string, token?: string): string => {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/shared-profile/${profileId}`;
  return token ? `${url}?token=${token}` : url;
};

export const parseURLParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
};

// Local storage utilities with encryption
export const setSecureStorage = async (key: string, value: any): Promise<void> => {
  const jsonString = JSON.stringify(value);
  const encryptedValue = await hashSensitiveData(jsonString);
  localStorage.setItem(`tension_${key}`, encryptedValue);
};

export const getSecureStorage = (key: string): any => {
  try {
    const storedValue = localStorage.getItem(`tension_${key}`);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Failed to retrieve secure storage:', error);
    return null;
  }
};

export const removeSecureStorage = (key: string): void => {
  localStorage.removeItem(`tension_${key}`);
};

// Theme utilities
export const toggleDarkMode = (): void => {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('tension_theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('tension_theme', 'dark');
  }
};

export const initializeTheme = (): void => {
  const savedTheme = localStorage.getItem('tension_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
};

// Performance utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// AI and token optimization utilities
export const estimateTokenCount = (text: string): number => {
  // Rough estimation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
};

export const optimizePromptLength = (prompt: string, maxTokens: number): string => {
  const estimatedTokens = estimateTokenCount(prompt);
  
  if (estimatedTokens <= maxTokens) {
    return prompt;
  }
  
  const targetLength = maxTokens * 4; // Convert back to characters
  return truncateText(prompt, targetLength);
};

export const compressConversationHistory = (messages: any[], maxTokens: number): any[] => {
  let totalTokens = 0;
  const compressed: any[] = [];
  
  // Start from the most recent messages
  for (let i = messages.length - 1; i >= 0; i--) {
    const messageTokens = estimateTokenCount(messages[i].content);
    
    if (totalTokens + messageTokens <= maxTokens) {
      compressed.unshift(messages[i]);
      totalTokens += messageTokens;
    } else {
      break;
    }
  }
  
  return compressed;
};

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

export const logError = (error: any, context?: string): void => {
  console.error(context ? `[${context}]` : '[Error]', error);
  
  // In production, you might want to send this to an error reporting service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error);
  }
};

// Form validation utilities
export const validateForm = (data: Record<string, any>, rules: Record<string, any>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${field} must be no more than ${rule.maxLength} characters`;
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
``r

===== FILE: src/index.css =====
`$Lang
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

@layer base {
  body {
    @apply font-sans antialiased;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  * {
    @apply border-slate-200;
  }
  
  html {
    @apply scroll-smooth;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-secondary-200 hover:bg-secondary-300 text-secondary-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gold-500/30 bg-dark-800/50 text-gold-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent placeholder-gold-300/50 backdrop-blur-sm;
  }
  
  .card {
    @apply bg-dark-700/30 backdrop-blur-sm rounded-xl shadow-lg border border-gold-500/20 hover:border-gold-400/40 transition-all duration-300;
  }
}

``r

===== FILE: src/types/index.ts =====
`$Lang
// Core User Types
export interface User {
  id: string;
  email: string;
  username: string;
  profileCompleted: boolean;
  partnerId?: string;
  createdAt: Date;
  lastActive: Date;
}

export interface UserProfile {
  userId: string;
  age?: number;
  gender?: Gender;
  sexualOrientation?: SexualOrientation;
  relationshipStatus?: RelationshipStatus;
  swingingExperience?: SwingingExperience;
  boundaries: string[];
  interests: string[];
  personalityArchetype?: PersonalityArchetype;
  communicationStyle?: CommunicationStyle;
  isAnonymous: boolean;
}

// Enums
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer-not-to-say'
}

export enum SexualOrientation {
  HETEROSEXUAL = 'heterosexual',
  HOMOSEXUAL = 'homosexual',
  BISEXUAL = 'bisexual',
  PANSEXUAL = 'pansexual',
  QUEER = 'queer',
  OTHER = 'other'
}

export enum RelationshipStatus {
  SINGLE = 'single',
  COMMITTED = 'committed',
  MARRIED = 'married',
  OPEN_RELATIONSHIP = 'open-relationship',
  POLYAMOROUS = 'polyamorous',
  COMPLICATED = 'complicated'
}

export enum SwingingExperience {
  CURIOUS = 'curious',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERIENCED = 'experienced',
  EXPERT = 'expert'
}

export enum PersonalityArchetype {
  EXPLORER = 'explorer',
  GUARDIAN = 'guardian',
  HEDONIST = 'hedonist',
  ROMANTIC = 'romantic',
  DOMINANT = 'dominant',
  SUBMISSIVE = 'submissive',
  SWITCH = 'switch',
  VOYEUR = 'voyeur',
  EXHIBITIONIST = 'exhibitionist'
}

export enum CommunicationStyle {
  DIRECT = 'direct',
  GENTLE = 'gentle',
  PLAYFUL = 'playful',
  INTELLECTUAL = 'intellectual',
  EMOTIONAL = 'emotional',
  MYSTERIOUS = 'mysterious'
}

// Psychological Assessment Types
export interface Question {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  text: string;
  options?: QuestionOption[];
  metadata?: Record<string, any>;
  followUpQuestions?: string[];
  scoringWeights?: Record<string, number>;
  phase?: string;
  weight?: number;
  required?: boolean;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  SCALE = 'scale',
  TEXT = 'text',
  BINARY = 'binary',
  RANKING = 'ranking',
  SCENARIO = 'scenario',
  IMAGE_CHOICE = 'image-choice',
  SLIDER_RANGE = 'slider-range',
  MATRIX = 'matrix',
  CARD_SORT = 'card-sort',
  EMOTION_WHEEL = 'emotion-wheel',
  TIMELINE = 'timeline',
  WORD_ASSOCIATION = 'word-association',
  ROLE_PLAY = 'role-play'
}

export enum QuestionCategory {
  PERSONALITY = 'personality',
  SEXUAL_PREFERENCES = 'sexual-preferences',
  EMOTIONAL_INTELLIGENCE = 'emotional-intelligence',
  COMMUNICATION = 'communication',
  BOUNDARIES = 'boundaries',
  FANTASY = 'fantasy',
  RELATIONSHIP_STYLE = 'relationship-style',
  CONFLICT_RESOLUTION = 'conflict-resolution',
  PSYCHOLOGICAL_TRIGGERS = 'psychological-triggers',
  INTIMACY_PATTERNS = 'intimacy-patterns',
  POWER_DYNAMICS = 'power-dynamics',
  ATTACHMENT_STYLE = 'attachment-style',
  SEXUAL_PSYCHOLOGY = 'sexual-psychology',
  BEHAVIORAL_PATTERNS = 'behavioral-patterns',
  SUBCONSCIOUS_DESIRES = 'subconscious-desires',
  RELATIONSHIP_TRAUMA = 'relationship-trauma'
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number | string;
  metadata?: Record<string, any>;
}

export interface Answer {
  questionId: string;
  userId: string;
  value: any;
  timestamp: Date;
  confidence?: number;
  timeSpent?: number;
  emotionalState?: EmotionalState;
  behavioralMarkers?: BehavioralMarkers;
  inconsistencyFlags?: string[];
  followUpTriggered?: boolean;
}

export interface EmotionalState {
  arousal: number; // 0-100
  valence: number; // -100 to 100 (negative to positive)
  dominance: number; // 0-100
  confidence: number; // 0-100
  detected_emotions: string[];
}

export interface BehavioralMarkers {
  responseTime: number;
  hesitation: boolean;
  changeCount: number; // how many times user changed answer
  skipAttempts: number;
  confidencePattern: number[];
  textAnalysis?: {
    wordCount: number;
    emotionalTone: string;
    defensiveness: number;
    authenticity: number;
  };
}

// AI Analysis Types
export interface PsychologicalProfile {
  userId: string;
  personalityTraits: PersonalityTrait[];
  emotionalPatterns: EmotionalPattern[];
  sexualProfile: SexualProfile;
  communicationProfile: CommunicationProfile;
  compatibilityFactors: CompatibilityFactor[];
  tensionPoints: TensionPoint[];
  shadowDesires: ShadowDesire[];
  generatedAt: Date;
  confidence: number;
}

export interface PersonalityTrait {
  name: string;
  score: number; // 0-100
  description: string;
  category: string;
  evidence: string[];
}

export interface EmotionalPattern {
  type: string;
  intensity: number;
  triggers: string[];
  responses: string[];
  description: string;
}

export interface SexualProfile {
  dominanceScale: number; // -100 to 100 (submissive to dominant)
  adventurousness: number; // 0-100
  intimacyStyle: string;
  preferredDynamics: string[];
  boundaries: string[];
  fantasies: string[];
  triggers: string[];
}

export interface CommunicationProfile {
  directness: number; // 0-100
  emotionalExpression: number; // 0-100
  conflictStyle: string;
  preferredChannels: string[];
  communicationNeeds: string[];
}

export interface CompatibilityFactor {
  type: string;
  score: number; // 0-100
  description: string;
  recommendations: string[];
}

export interface TensionPoint {
  area: string;
  intensity: number; // 0-100
  description: string;
  potentialTriggers: string[];
  resolutionStrategies: string[];
}

export interface ShadowDesire {
  type: string;
  confidence: number; // 0-100
  description: string;
  manifestations: string[];
  explorationSuggestions: string[];
}

// Compatibility Analysis
export interface CompatibilityReport {
  partnerIds: string[];
  overallCompatibility: number; // 0-100
  sexualCompatibility: number;
  emotionalCompatibility: number;
  socialCompatibility: number;
  communicationCompatibility: number;
  detailedAnalysis: CompatibilityAnalysis[];
  recommendations: Recommendation[];
  warningAreas: WarningArea[];
  growthOpportunities: GrowthOpportunity[];
  generatedAt: Date;
}

export interface CompatibilityAnalysis {
  area: string;
  score: number;
  description: string;
  supportingEvidence: string[];
  potentialChallenges: string[];
}

export interface Recommendation {
  type: RecommendationType;
  priority: Priority;
  title: string;
  description: string;
  actionItems: string[];
  expectedOutcome: string;
}

export enum RecommendationType {
  COMMUNICATION = 'communication',
  EXPLORATION = 'exploration',
  BOUNDARY_SETTING = 'boundary-setting',
  CONFLICT_RESOLUTION = 'conflict-resolution',
  INTIMACY_BUILDING = 'intimacy-building',
  ADVENTURE = 'adventure'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface WarningArea {
  area: string;
  severity: Priority;
  description: string;
  potentialIssues: string[];
  mitigationStrategies: string[];
}

export interface GrowthOpportunity {
  area: string;
  potential: number; // 0-100
  description: string;
  steps: string[];
  timeline: string;
}

// AI Integration Types
export interface AISession {
  id: string;
  userId: string;
  type: AISessionType;
  status: SessionStatus;
  messages: AIMessage[];
  context: SessionContext;
  tokenUsage: TokenUsage;
  startedAt: Date;
  endedAt?: Date;
}

export enum AISessionType {
  PROFILING = 'profiling',
  THERAPY = 'therapy',
  COMPATIBILITY = 'compatibility',
  EXPLORATION = 'exploration',
  CONFLICT_RESOLUTION = 'conflict-resolution'
}

export enum SessionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  TERMINATED = 'terminated'
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface SessionContext {
  phase: string;
  objectives: string[];
  constraints: string[];
  personalityMode: PersonalityMode;
  sensitivityLevel: number; // 0-100
}

export enum PersonalityMode {
  THERAPIST = 'therapist',
  MENTOR = 'mentor',
  CHALLENGER = 'challenger',
  EXPLORER = 'explorer'
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

// Subscription and Monetization
export interface Subscription {
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  features: string[];
  limits: SubscriptionLimits;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export enum SubscriptionPlan {
  FREE = 'free',
  PREMIUM = 'premium',
  COUPLES = 'couples',
  UNLIMITED = 'unlimited'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  SUSPENDED = 'suspended'
}

export interface SubscriptionLimits {
  monthlyAssessments: number;
  aiSessionMinutes: number;
  compatibilityReports: number;
  partnerInvites: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Form Types
export interface OnboardingData {
  basicInfo: {
    age?: number;
    gender?: Gender;
    sexualOrientation?: SexualOrientation;
    relationshipStatus?: RelationshipStatus;
    swingingExperience?: SwingingExperience;
    isAnonymous?: boolean;
  };
  preferences: {
    interests: string[];
    boundaries: string[];
    communicationStyle?: CommunicationStyle;
    personalityArchetype?: PersonalityArchetype;
  };
  privacy: {
    privacyLevel: PrivacyLevel;
    profileVisibility: ProfileVisibility;
    dataSharing: boolean;
    anonymousMode: boolean;
  };
  isComplete: boolean;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notificationSettings: NotificationSettings;
  privacyLevel: PrivacyLevel;
  dataRetention: DataRetentionSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  partnerUpdates: boolean;
  aiInsights: boolean;
}

export enum PrivacyLevel {
  MINIMAL = 'minimal',
  BALANCED = 'balanced',
  MAXIMUM = 'maximum'
}

export interface DataRetentionSettings {
  sessionHistory: number; // days
  assessmentResults: number; // days
  conversationLogs: number; // days
  autoDelete: boolean;
}

export interface PrivacySettings {
  profileVisibility: ProfileVisibility;
  dataSharing: DataSharingSettings;
  encryption: EncryptionSettings;
}

export enum ProfileVisibility {
  PRIVATE = 'private',
  PARTNER_ONLY = 'partner-only',
  COMMUNITY = 'community'
}

export interface DataSharingSettings {
  anonymizedResearch: boolean;
  marketingInsights: boolean;
  platformImprovement: boolean;
}

export interface EncryptionSettings {
  endToEndMessages: boolean;
  encryptedStorage: boolean;
  biometricAccess: boolean;
}
``r

===== FILE: src/types/framer-motion.d.ts =====
`$Lang
declare module 'framer-motion';
``r

