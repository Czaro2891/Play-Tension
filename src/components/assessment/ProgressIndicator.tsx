import React from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';

interface ProgressIndicatorProps {
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ className = '' }) => {
  const { state } = useAssessment();

  const getProgressPercentage = () => {
    const questionCount = state.session?.answers.length || 0;
    return Math.min((questionCount / 10) * 100, 100);
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
        <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <motion.div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Question {state.session?.answers.length || 0 + 1} of 10</span>
        <span>{state.session?.answers.length || 0} answered</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;