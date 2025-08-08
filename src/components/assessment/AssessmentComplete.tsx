import React from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Brain, Heart, Users } from 'lucide-react';

const AssessmentComplete: React.FC = () => {
  const { state } = useAssessment();

  const insights = state.profile;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Assessment Complete!
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for completing the psychological assessment. We've analyzed your responses 
            and prepared personalized insights about your psychological profile.
          </p>

          {insights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Psychological Profile</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personality Type</h3>
                  <p className="text-gray-600">{insights.personalityType || 'Analyzing...'}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Emotional Patterns</h3>
                  <p className="text-gray-600">
                    {insights.emotionalPatterns?.length || 0} patterns identified
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Communication Style</h3>
                  <p className="text-gray-600">
                    {insights.communicationStyle?.primary || 'Analyzing...'}
                  </p>
                </div>
              </div>

              {insights.recommendations && insights.recommendations.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Recommendations</h3>
                  <ul className="space-y-2">
                    {insights.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            
            <Link
              to="/tension"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Explore Tension Module
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentComplete;