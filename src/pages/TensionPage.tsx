import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTension } from '../contexts/TensionContext';
import { EmotionType } from '../types/tension';
import EmotionSelector from '../features/tension/components/EmotionSelector';
import IntensityControl from '../features/tension/components/IntensityControl';
import CompatibilityMeter from '../features/tension/components/CompatibilityMeter';
import SessionControls from '../features/tension/components/SessionControls';
import { Heart, Zap, Clock, TrendingUp, Users, Settings } from 'lucide-react';

const TensionPage: React.FC = () => {
  const { 
    currentSession, 
    isActive, 
    stats, 
    loading, 
    error,
    startSession, 
    pauseSession, 
    resumeSession, 
    stopSession
  } = useTension();

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleStartSession = async () => {
    if (selectedEmotion) {
      await startSession(selectedEmotion);
    }
  };

  const handlePauseSession = async () => {
    await pauseSession();
  };

  const handleResumeSession = async () => {
    await resumeSession();
  };

  const handleStopSession = async () => {
    await stopSession();
  };



  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Ładowanie Tension...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="text-xl font-bold text-white">Tension Experience</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200"
          >
            {error}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Session */}
            {currentSession && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Aktywna Sesja</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Session Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{currentSession.emotion}</h3>
                        <p className="text-pink-200">Tryb: {currentSession.mode}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-white">
                        <span>Intensywność:</span>
                        <span className="font-semibold">{currentSession.intensity}/10</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Czas trwania:</span>
                        <span className="font-semibold">{formatDuration(currentSession.duration)}</span>
                      </div>
                      {currentSession.compatibility && (
                        <div className="flex justify-between text-white">
                          <span>Kompatybilność:</span>
                          <span className="font-semibold">{currentSession.compatibility}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Compatibility Meter */}
                  <div className="flex justify-center">
                    <CompatibilityMeter 
                      value={currentSession.compatibility || 75} 
                      isActive={isActive}
                    />
                  </div>
                </div>
                
                {/* Session Controls */}
                <SessionControls
                  isActive={isActive}
                  onStart={handleStartSession}
                  onPause={handlePauseSession}
                  onResume={handleResumeSession}
                  onStop={handleStopSession}
                  disabled={loading}
                />
              </motion.div>
            )}

            {/* New Session Setup */}
            {!currentSession && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Rozpocznij Nową Sesję</h2>
                
                <div className="space-y-8">
                  {/* Emotion Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Wybierz Emocję</h3>
                    <EmotionSelector
                      selectedEmotion={selectedEmotion}
                      onSelect={setSelectedEmotion}
                      disabled={loading}
                    />
                  </div>
                  
                  {/* Intensity Control */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Ustaw Intensywność</h3>
                    <IntensityControl
                      value={5}
                      onChange={() => {}} // Will be handled by session
                      disabled={loading}
                    />
                  </div>
                  
                  {/* Start Button */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartSession}
                      disabled={!selectedEmotion || loading}
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Rozpocznij Sesję Tension
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Statystyki</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-pink-400" />
                      <span className="text-white">Całkowity czas</span>
                    </div>
                    <span className="text-white font-semibold">
                      {formatDuration(stats.totalDuration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <span className="text-white">Średnia intensywność</span>
                    </div>
                    <span className="text-white font-semibold">
                      {stats.averageIntensity.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Sesje z partnerem</span>
                    </div>
                    <span className="text-white font-semibold">
                      {stats.partnerSessions}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">Ulubiona emocja</span>
                    </div>
                    <span className="text-white font-semibold">
                      {stats.favoriteEmotion}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Szybkie Akcje</h3>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-white rounded-lg transition-all duration-300 border border-white/10">
                  Historia Sesji
                </button>
                
                <button className="w-full p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-white rounded-lg transition-all duration-300 border border-white/10">
                  Ustawienia
                </button>
                
                <button className="w-full p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-white rounded-lg transition-all duration-300 border border-white/10">
                  Zaprosić Partnera
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TensionPage;
