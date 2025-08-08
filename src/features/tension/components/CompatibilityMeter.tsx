import React from 'react';
import { motion } from 'framer-motion';

interface CompatibilityMeterProps {
  value: number; // 0-100
  isActive?: boolean;
}

const CompatibilityMeter: React.FC<CompatibilityMeterProps> = ({
  value,
  isActive = true
}) => {
  // Określ kolor na podstawie wartości kompatybilności
  const getColor = () => {
    if (value < 40) return '#DC143C'; // Czerwony dla niskiej kompatybilności
    if (value < 70) return '#FFD700'; // Złoty dla średniej kompatybilności
    return '#32CD32'; // Zielony dla wysokiej kompatybilności
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto">
      <div className="text-xl font-medium mb-2">Kompatybilność</div>
      
      <div className="relative w-full h-40 mb-4">
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Tło miernika */}
          <path
            d="M20,90 A80,80 0 0,1 180,90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Wartość kompatybilności */}
          <motion.path
            d="M20,90 A80,80 0 0,1 180,90"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ 
              strokeDashoffset: 251.2 - (251.2 * value / 100),
              transition: { duration: 1, ease: "easeOut" }
            }}
          />
          
          {/* Wskaźnik */}
          <motion.g
            initial={{ rotate: -90, originX: 100, originY: 90 }}
            animate={{ 
              rotate: -90 + (180 * value / 100),
              transition: { duration: 1, ease: "easeOut" }
            }}
          >
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="30"
              stroke="#374151"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="30"
              r="5"
              fill="#374151"
            />
          </motion.g>
          
          {/* Wartość tekstowa */}
          <text
            x="100"
            y="70"
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill={isActive ? getColor() : "#6b7280"}
          >
            {value}%
          </text>
        </svg>
      </div>
      
      <div className="flex justify-between w-full text-xs text-gray-500">
        <span>Niska</span>
        <span>Średnia</span>
        <span>Wysoka</span>
      </div>
    </div>
  );
};

export default CompatibilityMeter;
