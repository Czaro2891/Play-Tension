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