import { TensionSession, TensionSettings, TensionStats } from '../types/tension';

// Mock data storage (symuluje bazę danych)
let mockSessions: TensionSession[] = [];
let mockSettings: TensionSettings = {
  defaultIntensity: 5,
  defaultDuration: 300,
  preferredMode: 'solo',
  enableNotifications: true,
  autoSync: true
};
let mockStats: TensionStats = {
  totalSessions: 0,
  averageIntensity: 0,
  favoriteEmotion: 'Joy',
  totalDuration: 0,
  partnerSessions: 0,
  soloSessions: 0
};

// Helper function to generate mock session ID
const generateId = () => 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

// Mock API dla Tension Service
export const tensionService = {
  async getSessions(): Promise<TensionSession[]> {
    // Symuluj opóźnienie sieciowe
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockSessions];
  },

  async getSessionById(id: string): Promise<TensionSession | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSessions.find(session => session.id === id) || null;
  },

  async createSession(session: Omit<TensionSession, 'id'>): Promise<TensionSession | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newSession: TensionSession = {
      ...session,
      id: generateId(),
      startTime: new Date(),
      isActive: true
    };
    
    mockSessions.unshift(newSession);
    
    // Aktualizuj statystyki
    mockStats.totalSessions++;
    if (session.mode === 'partner') {
      mockStats.partnerSessions++;
    } else {
      mockStats.soloSessions++;
    }
    
    return newSession;
  },

  async updateSession(id: string, session: Partial<TensionSession>): Promise<TensionSession | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockSessions.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    mockSessions[index] = { ...mockSessions[index], ...session };
    return mockSessions[index];
  },

  async endSession(id: string): Promise<TensionSession | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const session = mockSessions.find(s => s.id === id);
    if (!session) return null;
    
    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - new Date(session.startTime).getTime()) / 1000);
    
    const updatedSession: TensionSession = {
      ...session,
      isActive: false,
      duration,
      endTime
    };
    
    const index = mockSessions.findIndex(s => s.id === id);
    mockSessions[index] = updatedSession;
    
    // Aktualizuj statystyki
    mockStats.totalDuration += duration;
    mockStats.averageIntensity = mockSessions.reduce((sum, s) => sum + s.intensity, 0) / mockSessions.length;
    
    // Znajdź ulubioną emocję
    const emotionCounts = mockSessions.reduce((acc, s) => {
      acc[s.emotion] = (acc[s.emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const favoriteEmotion = Object.entries(emotionCounts).reduce((a, b) => 
      emotionCounts[a[0]] > emotionCounts[b[0]] ? a : b
    )[0] as any;
    
    mockStats.favoriteEmotion = favoriteEmotion;
    
    return updatedSession;
  },

  async getSettings(): Promise<TensionSettings | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { ...mockSettings };
  },

  async updateSettings(settings: Partial<TensionSettings>): Promise<TensionSettings | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockSettings = { ...mockSettings, ...settings };
    return { ...mockSettings };
  },

  async getStats(): Promise<TensionStats | null> {
    await new Promise(resolve => setTimeout(resolve, 250));
    return { ...mockStats };
  }
};
