import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Zap, Cloud, Flame, Shield } from 'lucide-react';
import { EmotionType } from '../../../types/tension';
import { emotions } from '../data/emotions';
import { cn } from '../../../utils';

interface EmotionSelectorProps {
  selectedEmotion: EmotionType | null;
  onSelect: (emotion: EmotionType) => void;
  disabled?: boolean;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotion,
  onSelect,
  disabled = false
}) => {
  // Mapowanie typów emocji na ikony
  const getIcon = (type: EmotionType) => {
    switch (type) {
      case 'Joy': return <Smile className="w-6 h-6" />;
      case 'Love': return <Heart className="w-6 h-6" />;
      case 'Excitement': return <Zap className="w-6 h-6" />;
      case 'Calm': return <Cloud className="w-6 h-6" />;
      case 'Passion': return <Flame className="w-6 h-6" />;
      case 'Trust': return <Shield className="w-6 h-6" />;
      default: return <Smile className="w-6 h-6" />;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
      {emotions.map((emotion) => {
        const isSelected = selectedEmotion === emotion.type;
        
        return (
          <motion.button
            key={emotion.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(emotion.type)}
            disabled={disabled}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg transition-colors",
              "border-2 shadow-sm",
              isSelected ? "border-current bg-opacity-10" : "border-gray-200 bg-white hover:bg-gray-50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{
              borderColor: isSelected ? emotion.color : undefined,
              backgroundColor: isSelected ? `${emotion.color}20` : undefined,
              color: isSelected ? emotion.color : undefined
            }}
          >
            <div 
              className="p-3 rounded-full mb-2" 
              style={{ backgroundColor: `${emotion.color}30` }}
            >
              {getIcon(emotion.type)}
            </div>
            <span className="text-sm font-medium">{emotion.type}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default EmotionSelector;
