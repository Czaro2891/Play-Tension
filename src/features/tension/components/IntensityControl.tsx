import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface IntensityControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const IntensityControl: React.FC<IntensityControlProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false
}) => {
  const handleDecrease = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  // Określ kolor na podstawie intensywności
  const getColor = () => {
    if (value <= 3) return '#4682B4'; // Niebieski dla niskiej intensywności
    if (value <= 7) return '#FFD700'; // Złoty dla średniej intensywności
    return '#DC143C'; // Czerwony dla wysokiej intensywności
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto">
      <div className="text-xl font-medium mb-2">Intensywność</div>
      
      <div className="flex items-center justify-between w-full mb-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrease}
          disabled={value <= min || disabled}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-5 h-5" />
        </motion.button>
        
        <div className="text-3xl font-bold">{value}</div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrease}
          disabled={value >= max || disabled}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div 
          className="h-4 rounded-full transition-all duration-300"
          style={{ 
            width: `${(value / max) * 100}%`,
            backgroundColor: getColor()
          }}
        />
      </div>
      
      <div className="flex justify-between w-full text-xs text-gray-500">
        <span>Delikatne</span>
        <span>Umiarkowane</span>
        <span>Intensywne</span>
      </div>
    </div>
  );
};

export default IntensityControl;
