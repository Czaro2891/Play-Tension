// Typy dla modułu Tension

export type EmotionType = 
  | 'Joy'
  | 'Love' 
  | 'Excitement'
  | 'Calm'
  | 'Passion'
  | 'Trust';

export interface TensionSession {
  id: string;
  userId: string;
  partnerId?: string;
  emotion: EmotionType;
  intensity: number; // 1-10
  duration: number; // w sekundach
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  compatibility?: number; // 0-100%
  mode: 'solo' | 'partner';
}

export interface TensionSettings {
  defaultIntensity: number;
  defaultDuration: number;
  preferredMode: 'solo' | 'partner';
  enableNotifications: boolean;
  autoSync: boolean;
}

export interface EmotionData {
  type: EmotionType;
  color: string;
  icon: string;
  description: string;
}

export interface TensionStats {
  totalSessions: number;
  averageIntensity: number;
  favoriteEmotion: EmotionType;
  totalDuration: number; // w sekundach
  partnerSessions: number;
  soloSessions: number;
}
