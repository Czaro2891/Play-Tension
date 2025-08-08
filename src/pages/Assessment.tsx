import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessment } from '../contexts/AssessmentContext';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import ProgressIndicator from '../components/assessment/ProgressIndicator';
import PhaseTransition from '../components/assessment/PhaseTransition';
import QuestionDisplay from '../components/assessment/QuestionDisplay';
import AssessmentComplete from '../components/assessment/AssessmentComplete';

const Assessment: React.FC = () => {
  const { state, startAssessment, submitAnswer } = useAssessment();
  const { user } = useAuth();
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);

  // Rozpocznij ocenę przy pierwszym załadowaniu
  useEffect(() => {
    if (!state.session && !state.loading) {
      startAssessment('profiling');
    }
  }, [state.session, state.loading, startAssessment]);

  // Obsługa przejścia między fazami
  useEffect(() => {
    if (state.session?.answers.length && state.session.answers.length % 3 === 0) {
      setShowPhaseTransition(true);
      const timer = setTimeout(() => setShowPhaseTransition(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.session?.answers.length]);

  const handleAnswerSubmit = async (value: any) => {
    await submitAnswer(value);
  };

  // Sprawdź czy użytkownik jest uwierzytelniony
  if (!user) {
    return <Navigate to="/user-setup" replace />;
  }

  if (state.completed && state.profile) {
    return <AssessmentComplete />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AssessmentHeader />
        
        <AnimatePresence mode="wait">
          {showPhaseTransition ? (
            <motion.div
              key="phase-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhaseTransition />
            </motion.div>
          ) : (
            <motion.div
              key="question-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {state.currentQuestion ? (
                <QuestionDisplay
                  question={state.currentQuestion}
                  onSubmit={handleAnswerSubmit}
                  loading={state.loading}
                />
              ) : state.loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading next question...</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-gray-600">Preparing assessment...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6"
          >
            <p className="text-red-700">{state.error}</p>
          </motion.div>
        )}

        <div className="mt-6">
          <ProgressIndicator />
        </div>
      </div>
    </div>
  );
};

export default Assessment;
