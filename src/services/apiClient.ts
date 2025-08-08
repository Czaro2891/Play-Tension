// src/services/apiClient.ts
import { 
  AssessmentSession, 
  AIResponse, 
  Answer,
  Question, 
  QuestionType, 
  QuestionCategory,
  PartialPsychologicalProfile
} from '../types/assessment';

// Konfiguracja API
const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || !API_URL;

// Typy dla mock API
type NextResponse =
  | { done: true; insights?: any }
  | { done: false; question?: any };

// Funkcja do wykonywania żądań HTTP
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
  const controller = new AbortController();
  const { signal } = controller;
  
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Funkcje API
export const apiClient = {
  // Rozpoczęcie nowej sesji oceny
  startAssessment: async (type: string, userId: string): Promise<AIResponse> => {
    if (USE_MOCK_DATA) {
      return mockStartAssessment(type, userId);
    }
    
    try {
      return await fetchWithTimeout(`${API_URL}/assessments/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, userId })
      });
    } catch (error) {
      console.error('Error starting assessment:', error);
      return mockStartAssessment(type, userId);
    }
  },
  
  // Przesłanie odpowiedzi i pobranie kolejnego pytania
  submitAnswer: async (sessionId: string, answer: Answer): Promise<AIResponse> => {
    if (USE_MOCK_DATA) {
      return mockSubmitAnswer(sessionId, answer);
    }
    
    try {
      return await fetchWithTimeout(`${API_URL}/assessments/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answer })
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      return mockSubmitAnswer(sessionId, answer);
    }
  },
  
  // Pobranie profilu psychologicznego
  getProfile: async (userId: string): Promise<PartialPsychologicalProfile> => {
    if (USE_MOCK_DATA) {
      return mockGetProfile(userId);
    }
    
    try {
      return await fetchWithTimeout(`${API_URL}/profiles/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error getting profile:', error);
      return mockGetProfile(userId);
    }
  },

  // Mock API dla kompatybilności
  users: {
    completeOnboarding: async (_userId: string, _data: any) => ({ ok: true }),
  },

  ai: {
    next: async (_sessionId: string): Promise<NextResponse> => ({
      done: false,
      question: {
        id: 'q_scale_mock',
        type: 'scale',
        category: 'emotional-intelligence',
        text: 'How comfortable are you with vulnerability?',
        min: 1,
        max: 10,
        required: true,
      },
    }),
  },

  onboarding: {
    submit: async (_data: any) => ({ ok: true }),
  },
};

// Mock data dla trybu offline
let mockSession: AssessmentSession | null = null;
let currentQuestionIndex = 0;

// Symulowane pytania
const mockQuestions: Question[] = [
  {
    id: 'q1',
    type: QuestionType.MULTIPLE_CHOICE,
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    text: 'Jak reagujesz na krytykę?',
    options: [
      { id: 'opt1', text: 'Przyjmuję ją i analizuję' },
      { id: 'opt2', text: 'Bronię się i wyjaśniam' },
      { id: 'opt3', text: 'Ignoruję ją' },
      { id: 'opt4', text: 'Złoszczę się' }
    ],
    required: true
  },
  {
    id: 'q2',
    type: QuestionType.SCALE,
    category: QuestionCategory.INTIMACY_PATTERNS,
    text: 'Jak ważna jest dla Ciebie bliskość fizyczna w związku?',
    min: 1,
    max: 10,
    minLabel: 'Nieważna',
    maxLabel: 'Bardzo ważna',
    required: true
  },
  {
    id: 'q3',
    type: QuestionType.TEXT,
    category: QuestionCategory.RELATIONSHIP_GOALS,
    text: 'Jakie są Twoje najważniejsze cele w związku?',
    placeholder: 'Wpisz swoje cele...',
    maxLength: 500,
    required: true
  },
  {
    id: 'q4',
    type: QuestionType.BOOLEAN,
    category: QuestionCategory.COMMUNICATION_STYLE,
    text: 'Czy wolisz rozmawiać o problemach od razu, gdy się pojawią?',
    yesLabel: 'Tak, od razu',
    noLabel: 'Nie, potrzebuję czasu',
    required: true
  },
  {
    id: 'q5',
    type: QuestionType.MULTIPLE_CHOICE,
    category: QuestionCategory.PERSONALITY,
    text: 'Która z poniższych cech najlepiej Cię opisuje?',
    options: [
      { id: 'opt1', text: 'Spontaniczny/a' },
      { id: 'opt2', text: 'Zorganizowany/a' },
      { id: 'opt3', text: 'Empatyczny/a' },
      { id: 'opt4', text: 'Analityczny/a' }
    ],
    required: true
  }
];

// Przykładowy profil psychologiczny
const mockProfile: PartialPsychologicalProfile = {
  personalityType: 'Harmonizer',
  compatibilityScore: 85,
  recommendations: [
    'Pracuj nad otwartą komunikacją',
    'Rozwijaj empatię',
    'Ustal jasne granice'
  ],
  personalityTraits: [
    { name: 'Otwartość', score: 7.5, description: 'Jesteś otwarty/a na nowe doświadczenia' },
    { name: 'Sumienność', score: 6.8, description: 'Jesteś dość zorganizowany/a i odpowiedzialny/a' },
    { name: 'Ekstrawersja', score: 5.2, description: 'Balansujsz między towarzyskością a samotnością' }
  ],
  emotionalPatterns: [
    { name: 'Stabilność', level: 8, description: 'Masz wysoką stabilność emocjonalną' },
    { name: 'Empatia', level: 7, description: 'Dobrze rozumiesz emocje innych' }
  ],
  sexualProfile: {
    libido: 6,
    preferences: ['Romantyzm', 'Bliskość'],
    description: 'Preferujesz intymność opartą na bliskości emocjonalnej'
  },
  intimacyPatterns: [
    { type: 'Bezpieczny', description: 'Tworzysz bezpieczne więzi', strength: 8 }
  ],
  communicationStyle: {
    primary: 'Asertywny',
    secondary: 'Empatyczny',
    description: 'Komunikujesz się jasno, jednocześnie uwzględniając uczucia innych'
  },
  relationshipGoals: [
    { name: 'Zaufanie', priority: 9, description: 'Budowanie głębokiego zaufania jest dla Ciebie priorytetem' },
    { name: 'Rozwój', priority: 7, description: 'Cenisz wspólny rozwój w związku' }
  ]
};

// Funkcje mock
const mockStartAssessment = (type: string, userId: string): AIResponse => {
  // Resetuj stan
  currentQuestionIndex = 0;
  
  // Utwórz nową sesję
  mockSession = {
    id: `session-${Date.now()}`,
    userId,
    type,
    startedAt: new Date(),
    answers: []
  };
  
  // Zwróć pierwsze pytanie
  return {
    done: false,
    question: mockQuestions[0]
  };
};

const mockSubmitAnswer = (sessionId: string, answer: Answer): AIResponse => {
  // Sprawdź, czy sesja istnieje
  if (!mockSession || mockSession.id !== sessionId) {
    throw new Error('Session not found');
  }
  
  // Dodaj odpowiedź do sesji
  mockSession.answers.push(answer);
  
  // Przejdź do następnego pytania
  currentQuestionIndex++;
  
  // Sprawdź, czy to ostatnie pytanie
  if (currentQuestionIndex >= mockQuestions.length) {
    // Zakończ sesję
    mockSession.completedAt = new Date();
    
    // Zwróć wyniki
    return {
      done: true,
      insights: mockProfile
    };
  }
  
  // Zwróć następne pytanie
  return {
    done: false,
    question: mockQuestions[currentQuestionIndex]
  };
};

const mockGetProfile = (userId: string): PartialPsychologicalProfile => {
  // W rzeczywistej aplikacji tutaj byłoby pobieranie profilu z bazy danych
  return {
    ...mockProfile,
    userId
  };
};

export default apiClient;

// alias zgodny z aktualnymi importami
export const api = apiClient;
