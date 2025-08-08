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