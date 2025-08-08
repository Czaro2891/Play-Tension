import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { EmotionType, TensionSession, TensionSettings, TensionStats } from '../types/tension';
import { tensionService } from '../services/tensionService';

interface TensionContextType {
  // Stan
  currentSession: TensionSession | null;
  isActive: boolean;
  settings: TensionSettings;
  sessionHistory: TensionSession[];
  stats: TensionStats | null;
  loading: boolean;
  error: string | null;
  
  // Akcje
  startSession: (emotion: EmotionType, partnerId?: string) => Promise<void>;
  pauseSession: () => Promise<void>;
  resumeSession: () => Promise<void>;
  stopSession: () => Promise<void>;
  updateIntensity: (intensity: number) => Promise<void>;
  changeEmotion: (emotion: EmotionType) => Promise<void>;
  updateSettings: (settings: Partial<TensionSettings>) => Promise<void>;
  refreshData: () => Promise<void>;
  
  // Pomocnicze
  getSessionById: (id: string) => TensionSession | undefined;
}

const defaultSettings: TensionSettings = {
  defaultIntensity: 5,
  defaultDuration: 300, // 5 minut
  preferredMode: 'solo',
  enableNotifications: true,
  autoSync: true
};

const defaultStats: TensionStats = {
  totalSessions: 0,
  averageIntensity: 0,
  favoriteEmotion: 'Joy',
  totalDuration: 0,
  partnerSessions: 0,
  soloSessions: 0
};

const TensionContext = createContext<TensionContextType | undefined>(undefined);

export const TensionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentSession, setCurrentSession] = useState<TensionSession | null>(null);
  const [sessionHistory, setSessionHistory] = useState<TensionSession[]>([]);
  const [settings, setSettings] = useState<TensionSettings>(defaultSettings);
  const [stats, setStats] = useState<TensionStats | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Odśwież dane
  const refreshData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Pobierz sesje
      const sessions = await tensionService.getSessions();
      setSessionHistory(sessions);
      
      // Sprawdź, czy jest aktywna sesja
      const activeSession = sessions.find(s => s.isActive);
      if (activeSession) {
        setCurrentSession(activeSession);
        setIsActive(true);
      }
      
      // Pobierz ustawienia
      const userSettings = await tensionService.getSettings();
      if (userSettings) {
        setSettings(userSettings);
      }
      
      // Pobierz statystyki
      const userStats = await tensionService.getStats();
      if (userStats) {
        setStats(userStats);
      } else {
        setStats(defaultStats);
      }
    } catch (err) {
      setError('Nie udało się załadować danych Tension');
      console.error('Error refreshing tension data:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  // Załaduj dane przy inicjalizacji
  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user, refreshData]);
  
  // Rozpocznij nową sesję
  const startSession = async (emotion: EmotionType, partnerId?: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newSession = {
        userId: user.id,
        partnerId,
        emotion,
        intensity: settings.defaultIntensity,
        duration: 0,
        startTime: new Date(),
        isActive: true,
        mode: (partnerId ? 'partner' : 'solo') as 'solo' | 'partner'
      };
      
      const createdSession = await tensionService.createSession(newSession);
      
      if (createdSession) {
        setCurrentSession(createdSession);
        setIsActive(true);
        setSessionHistory(prev => [createdSession, ...prev]);
      } else {
        throw new Error('Nie udało się utworzyć sesji');
      }
    } catch (err) {
      setError('Nie udało się rozpocząć sesji Tension');
      console.error('Error starting tension session:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Wstrzymaj sesję
  const pauseSession = async () => {
    if (!currentSession) return;
    
    setIsActive(false);
    
    try {
      await tensionService.updateSession(currentSession.id, { isActive: false });
    } catch (err) {
      console.error('Error pausing tension session:', err);
    }
  };
  
  // Wznów sesję
  const resumeSession = async () => {
    if (!currentSession) return;
    
    setIsActive(true);
    
    try {
      await tensionService.updateSession(currentSession.id, { isActive: true });
    } catch (err) {
      console.error('Error resuming tension session:', err);
    }
  };
  
  // Zakończ sesję
  const stopSession = async () => {
    if (!currentSession) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const endedSession = await tensionService.endSession(currentSession.id);
      
      if (endedSession) {
        setCurrentSession(null);
        setIsActive(false);
        setSessionHistory(prev => prev.map(s => 
          s.id === endedSession.id ? endedSession : s
        ));
        
        // Odśwież statystyki
        const userStats = await tensionService.getStats();
        if (userStats) {
          setStats(userStats);
        }
      } else {
        throw new Error('Nie udało się zakończyć sesji');
      }
    } catch (err) {
      setError('Nie udało się zakończyć sesji Tension');
      console.error('Error stopping tension session:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Aktualizuj intensywność
  const updateIntensity = async (intensity: number) => {
    if (!currentSession) return;
    
    try {
      setCurrentSession(prev => {
        if (!prev) return null;
        return { ...prev, intensity };
      });
      
      await tensionService.updateSession(currentSession.id, { intensity });
    } catch (err) {
      console.error('Error updating tension intensity:', err);
    }
  };
  
  // Zmień emocję
  const changeEmotion = async (emotion: EmotionType) => {
    if (!currentSession) return;
    
    try {
      setCurrentSession(prev => {
        if (!prev) return null;
        return { ...prev, emotion };
      });
      
      await tensionService.updateSession(currentSession.id, { emotion });
    } catch (err) {
      console.error('Error changing tension emotion:', err);
    }
  };
  
  // Aktualizuj ustawienia
  const updateSettings = async (newSettings: Partial<TensionSettings>) => {
    try {
      setSettings(prev => ({ ...prev, ...newSettings }));
      
      await tensionService.updateSettings(newSettings);
    } catch (err) {
      console.error('Error updating tension settings:', err);
    }
  };
  
  // Pobierz sesję po ID
  const getSessionById = (id: string) => {
    return sessionHistory.find(session => session.id === id);
  };
  
  const value = {
    currentSession,
    isActive,
    settings,
    sessionHistory,
    stats,
    loading,
    error,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    updateIntensity,
    changeEmotion,
    updateSettings,
    refreshData,
    getSessionById
  };
  
  return (
    <TensionContext.Provider value={value}>
      {children}
    </TensionContext.Provider>
  );
};

export const useTension = () => {
  const context = useContext(TensionContext);
  if (context === undefined) {
    throw new Error('useTension must be used within a TensionProvider');
  }
  return context;
};
