// src/contexts/AssessmentContext.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import apiClient from '../services/apiClient';
import { 
  Question, 
  Answer, 
  PartialPsychologicalProfile, 
  AssessmentSession 
} from '../types/assessment';

// Stan kontekstu
interface AssessmentState {
  loading: boolean;
  error: string | null;
  session: AssessmentSession | null;
  currentQuestion: Question | null;
  completed: boolean;
  profile: PartialPsychologicalProfile | null;
}

// Akcje
type AssessmentAction =
  | { type: 'START_ASSESSMENT' }
  | { type: 'START_ASSESSMENT_SUCCESS'; payload: { session: AssessmentSession; question: Question } }
  | { type: 'START_ASSESSMENT_FAILURE'; payload: string }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'SUBMIT_ANSWER_SUCCESS'; payload: { question?: Question; profile?: PartialPsychologicalProfile; completed: boolean } }
  | { type: 'SUBMIT_ANSWER_FAILURE'; payload: string };

// Stan początkowy
const initialState: AssessmentState = {
  loading: false,
  error: null,
  session: null,
  currentQuestion: null,
  completed: false,
  profile: null
};

// Reducer
const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'START_ASSESSMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        session: action.payload.session,
        currentQuestion: action.payload.question,
        completed: false,
        profile: null
      };
    case 'START_ASSESSMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'SUBMIT_ANSWER_SUCCESS':
      return {
        ...state,
        loading: false,
        currentQuestion: action.payload.question || null,
        completed: action.payload.completed,
        profile: action.payload.profile || null
      };
    case 'SUBMIT_ANSWER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// Interfejs kontekstu
interface AssessmentContextType {
  state: AssessmentState;
  startAssessment: (type: string) => Promise<void>;
  submitAnswer: (value: any) => Promise<void>;
}

// Utworzenie kontekstu
const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

// Provider
export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Funkcja do rozpoczęcia oceny
  const startAssessment = useCallback(async (type: string) => {
    dispatch({ type: 'START_ASSESSMENT' });
    
    try {
      // Użyj losowego ID użytkownika (w rzeczywistej aplikacji byłoby to ID zalogowanego użytkownika)
      const userId = `user-${Date.now()}`;
      
      const response = await apiClient.startAssessment(type, userId);
      
      if (response.question) {
        // Utwórz sesję (w rzeczywistej aplikacji byłaby zwracana przez API)
        const session: AssessmentSession = {
          id: `session-${Date.now()}`,
          userId,
          type,
          startedAt: new Date(),
          answers: []
        };
        
        dispatch({
          type: 'START_ASSESSMENT_SUCCESS',
          payload: {
            session,
            question: response.question
          }
        });
      } else {
        dispatch({
          type: 'START_ASSESSMENT_FAILURE',
          payload: 'Nie udało się rozpocząć oceny'
        });
      }
    } catch (error) {
      dispatch({
        type: 'START_ASSESSMENT_FAILURE',
        payload: error instanceof Error ? error.message : 'Wystąpił błąd podczas rozpoczynania oceny'
      });
    }
  }, []);

  // Funkcja do przesyłania odpowiedzi
  const submitAnswer = useCallback(async (value: any) => {
    if (!state.session || !state.currentQuestion) {
      dispatch({
        type: 'SUBMIT_ANSWER_FAILURE',
        payload: 'Brak aktywnej sesji lub pytania'
      });
      return;
    }
    
    dispatch({ type: 'SUBMIT_ANSWER' });
    
    try {
      const answer: Answer = {
        questionId: state.currentQuestion.id,
        value
      };
      
      const response = await apiClient.submitAnswer(state.session.id, answer);
      
      if (response.done) {
        // Ocena zakończona
        dispatch({
          type: 'SUBMIT_ANSWER_SUCCESS',
          payload: {
            completed: true,
            profile: response.insights || undefined
          }
        });
      } else if (response.question) {
        // Przejdź do następnego pytania
        dispatch({
          type: 'SUBMIT_ANSWER_SUCCESS',
          payload: {
            question: response.question,
            completed: false
          }
        });
      } else {
        dispatch({
          type: 'SUBMIT_ANSWER_FAILURE',
          payload: 'Nieprawidłowa odpowiedź z serwera'
        });
      }
      
    } catch (error) {
      dispatch({
        type: 'SUBMIT_ANSWER_FAILURE',
        payload: error instanceof Error ? error.message : 'Wystąpił błąd podczas przesyłania odpowiedzi'
      });
    }
  }, [state.session, state.currentQuestion]);

  return (
    <AssessmentContext.Provider value={{ state, startAssessment, submitAnswer }}>
      {children}
    </AssessmentContext.Provider>
  );
};

// Hook do korzystania z kontekstu
export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};