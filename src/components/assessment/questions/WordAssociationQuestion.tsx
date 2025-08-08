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