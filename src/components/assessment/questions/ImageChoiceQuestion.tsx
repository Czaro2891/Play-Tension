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