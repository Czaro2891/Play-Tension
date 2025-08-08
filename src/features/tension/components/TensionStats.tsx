import React from 'react';
import { TensionStats as TensionStatsType } from '../../../types/tension';
import { Clock, Users, User, Activity, Heart } from 'lucide-react';

interface TensionStatsProps {
  stats: TensionStatsType;
}

const TensionStats: React.FC<TensionStatsProps> = ({ stats }) => {
  // Formatowanie czasu trwania
  const formatDuration = (durationInSeconds: number) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} godz. ${minutes} min.`;
    }
    return `${minutes} min.`;
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-gray-500 mb-2">
          <Activity className="w-5 h-5 mr-2" />
          <span className="text-sm">Sesje</span>
        </div>
        <div className="text-2xl font-bold">{stats.totalSessions}</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-gray-500 mb-2">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-sm">Czas łącznie</span>
        </div>
        <div className="text-2xl font-bold">{formatDuration(stats.totalDuration)}</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-gray-500 mb-2">
          <Activity className="w-5 h-5 mr-2" />
          <span className="text-sm">Śr. intensywność</span>
        </div>
        <div className="text-2xl font-bold">{stats.averageIntensity.toFixed(1)}/10</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-gray-500 mb-2">
          <Heart className="w-5 h-5 mr-2" />
          <span className="text-sm">Ulubiona emocja</span>
        </div>
        <div className="text-2xl font-bold">{stats.favoriteEmotion}</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 col-span-2 md:col-span-1">
        <div className="flex items-center text-gray-500 mb-2">
          <span className="text-sm">Tryb sesji</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            <span>Solo: {stats.soloSessions}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-pink-500" />
            <span>Partner: {stats.partnerSessions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TensionStats;
