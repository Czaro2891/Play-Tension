import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  MessageCircle, 
  Zap, 
  ArrowRight, 
  BookOpen, 
  Activity,
  Heart,
  Users,
  Flame,
  Shield,
  Smile,
  Cloud
} from 'lucide-react';
import { useTension } from '../../contexts/TensionContext';
import { EmotionType } from '../../types/tension';

const TensionDashboard: React.FC = () => {
  const { stats, sessionHistory, startSession } = useTension();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const insights = [
    {
      id: 'emotion-pattern',
      title: 'Wzorzec Emocjonalny',
      description: 'Twoje preferencje emocjonalne wskazują na głęboką potrzebę intymności i zaufania.',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      priority: 'high'
    },
    {
      id: 'compatibility',
      title: 'Kompatybilność Partnera',
      description: 'Wysoka kompatybilność w obszarze emocjonalnym - idealny partner do eksploracji.',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      priority: 'medium'
    },
    {
      id: 'growth-area',
      title: 'Obszar Rozwoju',
      description: 'Rozważ eksperymentowanie z nowymi emocjami dla lepszego zrozumienia siebie.',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      priority: 'low'
    }
  ];

  const recommendedActions = [
    {
      id: 'deep-connection',
      title: 'Głęboka Intymność',
      description: 'Sesja skupiona na budowaniu głębokiego połączenia emocjonalnego',
      emotion: 'Love' as EmotionType,
      duration: '15 min',
      icon: Heart,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'passion-exploration',
      title: 'Eksploracja Namiętności',
      description: 'Odkryj nowe wymiary namiętności i pożądania',
      emotion: 'Passion' as EmotionType,
      duration: '20 min',
      icon: Flame,
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'trust-building',
      title: 'Budowanie Zaufania',
      description: 'Wzmocnij fundamenty zaufania w relacji',
      emotion: 'Trust' as EmotionType,
      duration: '25 min',
      icon: Shield,
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const recentSessions = sessionHistory.slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Target;
      case 'low': return CheckCircle;
      default: return Clock;
    }
  };

  const handleStartSession = async (emotion: EmotionType) => {
    await startSession(emotion);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="space-y-8">
      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">AI Insights</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {insights.map((insight) => {
            const IconComponent = insight.icon;
            const PriorityIcon = getPriorityIcon(insight.priority);
            
            return (
              <motion.div
                key={insight.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 cursor-pointer"
                onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <PriorityIcon className={`w-4 h-4 ${getPriorityColor(insight.priority)}`} />
                </div>
                
                <h3 className="font-semibold text-white mb-2">{insight.title}</h3>
                
                {selectedInsight === insight.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-gray-300"
                  >
                    {insight.description}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommended Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Rekomendowane Akcje</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {recommendedActions.map((action) => {
            const IconComponent = action.icon;
            
            return (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{action.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400">{action.duration}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">Nowa</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStartSession(action.emotion)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Rozpocznij</span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Ostatnie Sesje</h2>
          </div>
          
          <button className="text-sm text-green-400 hover:text-green-300 transition-colors">
            Zobacz wszystkie
          </button>
        </div>

        <div className="space-y-3">
          {recentSessions.length > 0 ? (
            recentSessions.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{session.emotion}</h4>
                    <p className="text-sm text-gray-400">{session.mode}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-white">{session.intensity}/10</p>
                    <p className="text-xs text-gray-400">{formatDuration(session.duration)}</p>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">Brak ostatnich sesji</p>
              <p className="text-sm text-gray-500">Rozpocznij swoją pierwszą sesję Tension</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Progress Overview */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Przegląd Postępów</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{stats.totalSessions}</div>
              <div className="text-sm text-gray-400">Całkowite sesje</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{stats.averageIntensity.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Średnia intensywność</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{formatDuration(stats.totalDuration)}</div>
              <div className="text-sm text-gray-400">Całkowity czas</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{stats.favoriteEmotion}</div>
              <div className="text-sm text-gray-400">Ulubiona emocja</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TensionDashboard;
