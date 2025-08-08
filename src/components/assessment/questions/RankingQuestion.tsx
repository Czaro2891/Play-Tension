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