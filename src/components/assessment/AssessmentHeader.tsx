import React from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import { motion } from 'framer-motion';

const AssessmentHeader: React.FC = () => {
  const { state } = useAssessment();

  const getCurrentPhase = () => {
    const questionCount = state.session?.answers.length || 0;
    if (questionCount < 3) return 'Initial Assessment';
    if (questionCount < 6) return 'Emotional Patterns';
    if (questionCount < 8) return 'Relationship Dynamics';
    return 'Final Insights';
  };

  const getProgressPercentage = () => {
    const questionCount = state.session?.answers.length || 0;
    return Math.min((questionCount / 10) * 100, 100);
  };

  const currentPhase = getCurrentPhase();
  const progressPercentage = getProgressPercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Psychological Assessment</h1>
          <p className="text-gray-600 mt-1">Discover your psychological depths</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Current Phase</div>
          <div className="text-lg font-semibold text-indigo-600">{currentPhase}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {state.session?.answers.length || 0 + 1} of 10</span>
          <span>{state.session?.answers.length || 0} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Phase: {currentPhase}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
    </motion.div>
  );
};

export default AssessmentHeader;