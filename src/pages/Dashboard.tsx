import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Brain, 
  Heart, 
  BarChart3, 
  Users, 
  Zap,
  ArrowRight,
  Star,
  Target,
  Flame,
  Clock,
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, clearUserData } = useAuth();
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  const mockInsights = [
    {
      type: 'personality',
      title: 'Dominant Archetype',
      value: 'Explorer',
      description: 'You seek new experiences and emotional depth',
      color: 'from-purple-500 to-violet-600',
      icon: Star
    },
    {
      type: 'emotional',
      title: 'Emotional Intelligence',
      value: '87%',
      description: 'High awareness of emotional patterns',
      color: 'from-rose-500 to-pink-600',
      icon: Heart
    },
    {
      type: 'communication',
      title: 'Communication Style',
      value: 'Direct',
      description: 'Clear, honest, and straightforward',
      color: 'from-gold-500 to-yellow-600',
      icon: Target
    }
  ];

  const quickActions = [
    {
      title: 'Take Assessment',
      description: 'Deep psychological profiling',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600',
      action: handleStartAssessment,
      available: true
    },
    {
      title: 'Update Profile',
      description: 'Complete your onboarding',
      icon: User,
      color: 'from-green-500 to-emerald-600',
      action: handleStartOnboarding,
      available: !user?.profileCompleted
    },
    {
      title: 'Tension Experience',
      description: 'Explore psychological tensions',
      icon: Flame,
      color: 'from-orange-500 to-red-600',
      action: () => navigate('/tension'),
      available: true
    },
    {
      title: 'Compatibility Analysis',
      description: 'Compare with partner',
      icon: Users,
      color: 'from-rose-500 to-pink-600',
      action: () => navigate('/compatibility'),
      available: false
    },
    {
      title: 'AI Insights',
      description: 'View detailed reports',
      icon: BarChart3,
      color: 'from-purple-500 to-violet-600',
      action: () => navigate('/insights'),
      available: false
    }
  ];

  const recentActivity = [
    {
      type: 'assessment',
      title: 'Psychological Assessment',
      description: 'Started emotional patterns phase',
      time: '2 hours ago',
      icon: Brain,
      color: 'text-blue-400'
    },
    {
      type: 'profile',
      title: 'Profile Updated',
      description: 'Added relationship preferences',
      time: '1 day ago',
      icon: User,
      color: 'text-green-400'
    },
    {
      type: 'insight',
      title: 'New Insight Generated',
      description: 'Communication pattern analysis',
      time: '2 days ago',
      icon: Zap,
      color: 'text-gold-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      {/* Header */}
      <header className="bg-dark-800/95 backdrop-blur-md border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Flame className="w-8 h-8 text-gold-400" />
                <span className="text-xl font-bold text-gold-100">Tension</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-gold-200 font-medium">{user?.username}</p>
                <p className="text-gold-400 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={clearUserData}
                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gold-300 rounded-lg transition-colors"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gold-100 mb-2">
            Welcome back, {user?.username}
          </h1>
          <p className="text-gold-300">
            Continue your psychological journey and discover deeper insights about yourself
          </p>
        </motion.div>

        {/* Tension Experience Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Link 
            to="/tension" 
            className="tension-button block w-full p-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-400 hover:via-red-400 hover:to-pink-500 text-white font-bold text-xl rounded-xl border-2 border-orange-400/30 hover:border-orange-300/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <Flame className="w-8 h-8" />
              <span>🔥 Start TENSION Experience</span>
            </div>
          </Link>
        </motion.div>

        {/* Profile Completion Status */}
        {!user?.profileCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-gradient-to-r from-gold-500/10 to-rose-500/10 border border-gold-500/30 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-gold-200 font-semibold">Complete Your Profile</h3>
                  <p className="text-gold-300 text-sm">
                    Finish onboarding to unlock full psychological analysis
                  </p>
                </div>
              </div>
              <button
                onClick={handleStartOnboarding}
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
              >
                Continue Setup
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gold-200 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.button
                      key={action.title}
                      onClick={action.available ? action.action : undefined}
                      disabled={!action.available}
                      whileHover={action.available ? { scale: 1.02 } : undefined}
                      whileTap={action.available ? { scale: 0.98 } : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={`
                        p-6 rounded-xl border text-left transition-all duration-300
                        ${action.available 
                          ? 'bg-dark-700/50 border-gold-500/20 hover:border-gold-400/40 hover:bg-dark-600/50 cursor-pointer' 
                          : 'bg-dark-800/30 border-dark-600/50 cursor-not-allowed opacity-60'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {action.available && <ArrowRight className="w-5 h-5 text-gold-400" />}
                      </div>
                      <h3 className="font-semibold text-gold-200 mb-2">{action.title}</h3>
                      <p className="text-gold-300 text-sm">{action.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* TENSION Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-xl font-semibold text-gold-200 mb-6">Premium Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                {/* NOWA KARTA TENSION */}
                <Link 
                  to="/tension"
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 rounded-3xl text-white transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25"
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl group-hover:animate-pulse"></div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Zap className="w-8 h-8 text-yellow-300 group-hover:animate-pulse" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-pink-200 font-medium">PREMIUM</div>
                        <div className="text-xs text-white/80">Experience</div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                      TENSION
                    </h3>
                    
                    {/* Description */}
                    <p className="text-pink-100 mb-6 text-sm leading-relaxed">
                      Experience emotional intimacy through synchronized sensations and real-time compatibility tracking.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-xs text-pink-200">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                        Emotion Mirror Technology
                      </div>
                      <div className="flex items-center text-xs text-pink-200">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                        Real-time Compatibility
                      </div>
                      <div className="flex items-center text-xs text-pink-200">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                        Synchronized Experience
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-yellow-300">Start Experience</span>
                      <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
            </motion.div>

            {/* Psychological Insights */}
            {user?.profileCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-gold-200 mb-6">Your Psychological Profile</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockInsights.map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <motion.div
                        key={insight.type}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="p-6 bg-dark-700/50 border border-gold-500/20 rounded-xl"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center mb-4`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gold-200 mb-1">{insight.title}</h3>
                        <p className="text-2xl font-bold text-gold-100 mb-2">{insight.value}</p>
                        <p className="text-gold-300 text-sm">{insight.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-dark-700/50 border border-gold-500/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-gold-200 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center`}>
                        <IconComponent className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gold-200 font-medium text-sm">{activity.title}</h4>
                        <p className="text-gold-300 text-xs mb-1">{activity.description}</p>
                        <p className="text-gold-400 text-xs flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Progress Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-dark-700/50 border border-gold-500/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-gold-200 mb-4">Progress Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gold-300 text-sm">Profile Completion</span>
                    <span className="text-gold-200 text-sm font-medium">
                      {user?.profileCompleted ? '100%' : '60%'}
                    </span>
                  </div>
                  <div className="w-full bg-dark-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: user?.profileCompleted ? '100%' : '60%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gold-300 text-sm">Assessment Progress</span>
                    <span className="text-gold-200 text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-dark-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-500/20">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gold-400" />
                  <span className="text-gold-200 font-medium">Explorer Level</span>
                </div>
                <p className="text-gold-300 text-xs mt-1">
                  Continue assessments to unlock deeper insights
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;