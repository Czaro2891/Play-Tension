import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { OnboardingData, PrivacyLevel, ProfileVisibility } from '../types';
import { api } from '../services/apiClient';
import { useAuth } from './AuthContext';

interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  isComplete: boolean;
}

interface OnboardingContextType {
  state: OnboardingState;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  submitOnboarding: () => void;
  goToStep: (step: number) => void;
}

type OnboardingAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; payload: Partial<OnboardingData> }
  | { type: 'SUBMIT_ONBOARDING' }
  | { type: 'GO_TO_STEP'; payload: number };

const initialOnboardingData: OnboardingData = {
  basicInfo: {
    age: undefined,
    gender: undefined,
    sexualOrientation: undefined,
    relationshipStatus: undefined,
    swingingExperience: undefined,
  },
  preferences: {
    interests: [],
    boundaries: [],
    communicationStyle: undefined,
    personalityArchetype: undefined,
  },
  privacy: {
    privacyLevel: PrivacyLevel.BALANCED,
    profileVisibility: ProfileVisibility.PRIVATE,
    dataSharing: false,
    anonymousMode: false,
  },
  isComplete: false,
};

const initialState: OnboardingState = {
  currentStep: 0,
  data: initialOnboardingData,
  isComplete: false,
};

const onboardingReducer = (state: OnboardingState, action: OnboardingAction): OnboardingState => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 5), // 6 steps total (0-5)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    case 'SUBMIT_ONBOARDING':
      return {
        ...state,
        isComplete: true,
        data: { ...state.data, isComplete: true },
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.payload, 5)),
      };
    default:
      return state;
  }
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const { user } = useAuth();

  // Load onboarding data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('tension_onboarding_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'UPDATE_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load onboarding data:', error);
      }
    }
  }, []);

  // Save onboarding data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tension_onboarding_data', JSON.stringify(state.data));
  }, [state.data]);

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const updateData = (data: Partial<OnboardingData>) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
  };

  const submitOnboarding = async () => {
    if (!user) throw new Error("No user");
    await api.users.completeOnboarding(user.id, state.data);
    console.log('✅ Onboarding completed:', state.data);
    dispatch({ type: 'SUBMIT_ONBOARDING' });
    
    // Clear onboarding data from localStorage after completion
    localStorage.removeItem('tension_onboarding_data');
  };

  const goToStep = (step: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  };

  const value: OnboardingContextType = {
    state,
    nextStep,
    prevStep,
    updateData,
    submitOnboarding,
    goToStep,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};