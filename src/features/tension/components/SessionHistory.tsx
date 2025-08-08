import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Zap, Cloud, Flame, Shield, Clock, Calendar } from 'lucide-react';
import { TensionSession, EmotionType } from '../../../types/tension';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface SessionHistoryProps {
  sessions: TensionSession[];
  onSelectSession: (session: TensionSession) => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onSelectSession }) => {
  // Funkcja do pobierania ikony dla emocji
  const getIcon = (emotion: EmotionType) => {
    switch (emotion) {
      case 'Joy':
        return <Smile className="w-5 h-5" />;
      case 'Love':
        return <Heart className="w-5 h-5" />;
      case 'Excitement':
        return <Zap className="w-5 h-5" />;
      case 'Calm':
        return <Cloud className="w-5 h-5" />;
      case 'Passion':
        return <Flame className="w-5 h-5" />;
      case 'Trust':
        return <Shield className="w-5 h-5" />;
      default:
        return <Smile className="w-5 h-5" />;
    }
  };

  // Formatowanie czasu trwania
  const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Sortowanie sesji od najnowszej
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Historia sesji</h3>
      {sortedSessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Brak historii sesji. Rozpocznij swoją pierwszą sesję!
        </div>
      ) : (
        <div className="space-y-3">
          {sortedSessions.map((session) => {
            // Znajdź kolor dla emocji
            const emotionColor = (() => {
              switch (session.emotion) {
                case 'Joy':
                  return '#FFD700';
                case 'Love':
                  return '#FF69B4';
                case 'Excitement':
                  return '#FF4500';
                case 'Calm':
                  return '#4682B4';
                case 'Passion':
                  return '#DC143C';
                case 'Trust':
                  return '#32CD32';
                default:
                  return '#6b7280';
              }
            })();

            return (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => onSelectSession(session)}
                className="bg-white rounded-lg shadow p-4 cursor-pointer border-l-4"
                style={{ borderLeftColor: emotionColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2 rounded-full"
                      style={{ backgroundColor: `${emotionColor}30` }}
                    >
                      {getIcon(session.emotion)}
                    </div>
                    <div>
                      <div className="font-medium">{session.emotion}</div>
                      <div className="text-sm text-gray-500">
                        Intensywność: {session.intensity}/10
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(session.startTime), 'dd MMM yyyy', { locale: pl })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(session.duration)}
                    </div>
                  </div>
                </div>
                {session.partnerId && (
                  <div className="mt-2 text-sm text-gray-500">
                    Sesja partnerska • Kompatybilność: {session.compatibility || 0}%
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
