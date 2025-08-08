import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, RefreshCw } from 'lucide-react';

interface SessionControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  disabled?: boolean;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  isActive,
  onStart,
  onPause,
  onResume,
  onStop,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto my-6">
      {!isActive ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          disabled={disabled}
          className="flex items-center justify-center p-4 rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-8 h-8" />
        </motion.button>
      ) : (
        <>
          {isActive ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPause}
              disabled={disabled}
              className="flex items-center justify-center p-4 rounded-full bg-amber-500 text-white shadow-md hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Pause className="w-8 h-8" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onResume}
              disabled={disabled}
              className="flex items-center justify-center p-4 rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-8 h-8" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onStop}
            disabled={disabled}
            className="flex items-center justify-center p-4 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square className="w-8 h-8" />
          </motion.button>
        </>
      )}
    </div>
  );
};

export default SessionControls;
