import React from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';
import { CheckCircle, ArrowRight } from 'lucide-react';

const PhaseTransition: React.FC = () => {
  const { state } = useAssessment();

  const phases = [
    'Initial Assessment',
    'Emotional Patterns', 
    'Relationship Dynamics',
    'Final Insights'
  ];

  const currentPhaseIndex = Math.floor(((state.session?.answers.length || 0) / 10) * phases.length);
  const currentPhase = phases[Math.min(currentPhaseIndex, phases.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Phase Complete!</h3>
            <p className="text-gray-600">Moving to next phase of assessment</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Next Phase</div>
          <div className="text-lg font-semibold text-indigo-600">{currentPhase}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Question {state.session?.answers.length || 0 + 1} of 10</span>
          <span>Phase {Math.min(currentPhaseIndex + 1, phases.length)} of {phases.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((state.session?.answers.length || 0) / 10) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex items-center text-indigo-600"
        >
          <span className="mr-2">Preparing next question</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhaseTransition;