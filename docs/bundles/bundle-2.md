===== FILE: src/pages/UserSetup.tsx =====
`$Lang
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, UserProfile, Gender, RelationshipStatus, SwingingExperience } from '../types';
import { motion } from 'framer-motion';
import { User as UserIcon, Settings, ArrowRight } from 'lucide-react';

const UserSetup: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    relationshipStatus: '',
    swingingExperience: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create user data
      const user: User = {
        id: `user_${Date.now()}`,
        email: `${formData.username}@tension.local`,
        username: formData.username,
        profileCompleted: false,
        createdAt: new Date(),
        lastActive: new Date()
      };

      // Create profile data
      const profile: UserProfile = {
        userId: user.id,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender as Gender || undefined,
        sexualOrientation: undefined,
        relationshipStatus: formData.relationshipStatus as RelationshipStatus || undefined,
        swingingExperience: formData.swingingExperience as SwingingExperience || undefined,
        boundaries: [],
        interests: [],
        personalityArchetype: undefined,
        communicationStyle: undefined,
        isAnonymous: false
      };

      // Set user data
      setUserData(user, profile);
      
      // Navigate to onboarding
      navigate('/onboarding');
    } catch (error) {
      console.error('Failed to set user data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already authenticated, redirect to appropriate page
  if (isAuthenticated) {
    navigate('/onboarding');
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-800 rounded-2xl p-8 shadow-2xl border border-dark-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-dark-900" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Ustawienia Gry</h1>
            <p className="text-gray-400">Wprowadź swoje dane, aby rozpocząć przygodę</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Nazwa użytkownika
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="input-field w-full"
                placeholder="Wprowadź swoją nazwę użytkownika"
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                Wiek
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                className="input-field w-full"
                placeholder="Twój wiek"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                Płeć
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Wybierz płeć</option>
                <option value="male">Męska</option>
                <option value="female">Żeńska</option>
                <option value="non-binary">Niebinarna</option>
                <option value="other">Inna</option>
              </select>
            </div>

            {/* Relationship Status */}
            <div>
              <label htmlFor="relationshipStatus" className="block text-sm font-medium text-gray-300 mb-2">
                Status związku
              </label>
              <select
                id="relationshipStatus"
                name="relationshipStatus"
                value={formData.relationshipStatus}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Wybierz status</option>
                <option value="single">Wolny/Wolna</option>
                <option value="in-relationship">W związku</option>
                <option value="married">Żonaty/Zamężna</option>
                <option value="complicated">Skomplikowane</option>
              </select>
            </div>

            {/* Swinging Experience */}
            <div>
              <label htmlFor="swingingExperience" className="block text-sm font-medium text-gray-300 mb-2">
                Doświadczenie w swingu
              </label>
              <select
                id="swingingExperience"
                name="swingingExperience"
                value={formData.swingingExperience}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Wybierz poziom doświadczenia</option>
                <option value="none">Brak doświadczenia</option>
                <option value="beginner">Początkujący</option>
                <option value="intermediate">Średnio zaawansowany</option>
                <option value="experienced">Doświadczony</option>
                <option value="expert">Ekspert</option>
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.username}
              className="w-full bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 font-semibold py-3 px-6 rounded-xl hover:from-gold-500 hover:to-rose-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Przetwarzanie...</span>
                </>
              ) : (
                <>
                  <span>Rozpocznij przygodę</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Twoje dane są przechowywane lokalnie i nie są wysyłane na serwer
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSetup;

``r

===== FILE: src/contexts/AuthContext.tsx =====
`$Lang
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  setUserData: (user: User, profile: UserProfile) => void;
  clearUserData: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('tension_user_data');
    const savedProfile = localStorage.getItem('tension_profile_data');
    
    if (savedUser && savedProfile) {
      try {
        const userData = JSON.parse(savedUser);
        const profileData = JSON.parse(savedProfile);
        setUser(userData);
        setProfile(profileData);
        setIsAuthenticated(true);
        console.log('✅ User data loaded from localStorage');
      } catch (error) {
        console.error('❌ Failed to load user data:', error);
        clearUserData();
      }
    }
  }, []);

  const setUserData = (userData: User, profileData: UserProfile) => {
    setUser(userData);
    setProfile(profileData);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('tension_user_data', JSON.stringify(userData));
    localStorage.setItem('tension_profile_data', JSON.stringify(profileData));
    
    console.log('✅ User data set and saved to localStorage');
  };

  const clearUserData = () => {
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('tension_user_data');
    localStorage.removeItem('tension_profile_data');
    localStorage.removeItem('tension_onboarding_data');
    localStorage.removeItem('tension_assessment_data');
    
    console.log('🧹 User data cleared from localStorage');
  };

  const updateProfile = (profileData: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...profileData };
      setProfile(updatedProfile);
      localStorage.setItem('tension_profile_data', JSON.stringify(updatedProfile));
      console.log('✅ Profile updated');
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    setUserData,
    clearUserData,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
``r

===== FILE: src/contexts/OnboardingContext.tsx =====
`$Lang
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { OnboardingData, PrivacyLevel, ProfileVisibility } from '../types';

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

  const submitOnboarding = () => {
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
``r

===== FILE: src/contexts/AssessmentContext.tsx =====
`$Lang
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Question, Answer, PsychologicalProfile, AISessionType, PersonalityMode, QuestionType, QuestionCategory } from '../types';

interface AssessmentState {
  currentQuestion: Question | null;
  answers: Answer[];
  session: AISessionType | null;
  personalityMode: PersonalityMode | null;
  isComplete: boolean;
  progress: number;
  insights: PsychologicalProfile | null;
}

interface AssessmentContextType {
  state: AssessmentState;
  startAssessment: (sessionType: AISessionType, personalityMode: PersonalityMode) => void;
  answerQuestion: (questionId: string, answer: any, timeSpent: number) => void;
  getNextQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

type AssessmentAction =
  | { type: 'START_ASSESSMENT'; payload: { sessionType: AISessionType; personalityMode: PersonalityMode } }
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'COMPLETE_ASSESSMENT'; payload: PsychologicalProfile }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentQuestion: null,
  answers: [],
  session: null,
  personalityMode: null,
  isComplete: false,
  progress: 0,
  insights: null,
};

const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        session: action.payload.sessionType,
        personalityMode: action.payload.personalityMode,
        isComplete: false,
        progress: 0,
        answers: [],
        insights: null,
      };
    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        progress: ((state.answers.length + 1) / 10) * 100, // Assuming 10 questions total
      };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isComplete: true,
        insights: action.payload,
        progress: 100,
      };
    case 'RESET_ASSESSMENT':
      return initialState;
    default:
      return state;
  }
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

interface AssessmentProviderProps {
  children: ReactNode;
}

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Load assessment data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('tension_assessment_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Restore assessment state if not complete
        if (!parsedData.isComplete) {
          // Restore basic state
          if (parsedData.session && parsedData.personalityMode) {
            dispatch({ 
              type: 'START_ASSESSMENT', 
              payload: { 
                sessionType: parsedData.session, 
                personalityMode: parsedData.personalityMode 
              } 
            });
          }
          if (parsedData.answers) {
            parsedData.answers.forEach((answer: Answer) => {
              dispatch({ type: 'ANSWER_QUESTION', payload: answer });
            });
          }
        }
      } catch (error) {
        console.error('Failed to load assessment data:', error);
      }
    }
  }, []);

  // Save assessment data to localStorage whenever it changes
  useEffect(() => {
    if (state.session) {
      localStorage.setItem('tension_assessment_data', JSON.stringify(state));
    }
  }, [state]);

  const startAssessment = (sessionType: AISessionType, personalityMode: PersonalityMode) => {
    dispatch({ type: 'START_ASSESSMENT', payload: { sessionType, personalityMode } });
    
    // Generate first question
    const firstQuestion: Question = {
      id: 'q_1',
      type: QuestionType.MULTIPLE_CHOICE,
      category: QuestionCategory.PERSONALITY,
      text: 'When faced with a difficult decision in relationships, you tend to:',
      options: [
        { id: 'opt1', text: 'Analyze all possibilities thoroughly', value: 'analytical' },
        { id: 'opt2', text: 'Trust your gut instinct', value: 'intuitive' },
        { id: 'opt3', text: 'Seek advice from trusted friends', value: 'collaborative' },
        { id: 'opt4', text: 'Take time to feel into the situation', value: 'emotional' }
      ],
      phase: 'initial',
      weight: 3,
      required: true
    };
    
    dispatch({ type: 'SET_QUESTION', payload: firstQuestion });
  };

  const answerQuestion = (questionId: string, answer: any, timeSpent: number) => {
    const answerData: Answer = {
      questionId,
      userId: 'mock_user',
      value: answer,
      timestamp: new Date(),
      timeSpent,
      confidence: 0.8, // Mock confidence
    };
    
    dispatch({ type: 'ANSWER_QUESTION', payload: answerData });
  };

  const getNextQuestion = () => {
    // Mock question generation based on current answers
    const questionCount = state.answers.length + 1;
    
    if (questionCount >= 10) {
      // Assessment complete
      const mockInsights: PsychologicalProfile = {
        userId: 'mock_user',
        personalityTraits: [
          {
            name: 'Explorer',
            score: 75,
            description: 'You show a strong tendency to explore new experiences and push boundaries',
            category: 'personality',
            evidence: ['Consistent choice of adventurous options', 'High comfort with vulnerability']
          }
        ],
        emotionalPatterns: [
          {
            type: 'vulnerability',
            intensity: 8.2,
            triggers: ['intimate conversations', 'new experiences'],
            responses: ['open communication', 'emotional expression'],
            description: 'You tend to express vulnerability openly in intimate settings'
          }
        ],
        sexualProfile: {
          dominanceScale: 25,
          adventurousness: 70,
          intimacyStyle: 'emotional-physical',
          preferredDynamics: ['mutual exploration', 'emotional connection'],
          boundaries: ['clear communication', 'consent'],
          fantasies: ['role play', 'public scenarios'],
          triggers: ['emotional connection', 'trust']
        },
        communicationProfile: {
          directness: 65,
          emotionalExpression: 80,
          conflictStyle: 'collaborative',
          preferredChannels: ['face-to-face', 'text'],
          communicationNeeds: ['validation', 'understanding']
        },
        compatibilityFactors: [
          {
            type: 'emotional_openness',
            score: 85,
            description: 'High level of emotional openness and vulnerability',
            recommendations: ['Continue exploring deeper emotional connections', 'Share more personal experiences']
          }
        ],
        tensionPoints: [
          {
            area: 'intimacy_vulnerability',
            intensity: 60,
            description: 'Some tension around expressing vulnerability in new situations',
            potentialTriggers: ['fear of rejection', 'past experiences'],
            resolutionStrategies: ['gradual exposure', 'trust building']
          }
        ],
        shadowDesires: [
          {
            type: 'exhibitionism',
            confidence: 70,
            description: 'Hidden desire for being seen and admired',
            manifestations: ['attention-seeking behavior', 'performance anxiety'],
            explorationSuggestions: ['role play scenarios', 'gradual exposure']
          }
        ],
        generatedAt: new Date(),
        confidence: 0.85
      };
      
      dispatch({ type: 'COMPLETE_ASSESSMENT', payload: mockInsights });
      return;
    }
    
    // Generate next question
    const questions = [
      {
        id: `q_${questionCount}`,
        type: QuestionType.SCALE,
        category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
        text: 'How comfortable are you with expressing vulnerability in intimate relationships?',
        metadata: {
          scaleMin: 1,
          scaleMax: 10,
          scaleLabels: ['Very uncomfortable', 'Neutral', 'Very comfortable']
        },
        phase: 'adaptive',
        weight: 4,
        required: true
      },
      {
        id: `q_${questionCount}`,
        type: QuestionType.MULTIPLE_CHOICE,
        category: QuestionCategory.PSYCHOLOGICAL_TRIGGERS,
        text: 'When you feel emotionally overwhelmed, what is your typical response?',
        options: [
          { id: 'opt1', text: 'Withdraw and process alone', value: 'withdrawal' },
          { id: 'opt2', text: 'Seek immediate support from partner', value: 'support-seeking' },
          { id: 'opt3', text: 'Become more analytical and logical', value: 'rationalization' },
          { id: 'opt4', text: 'Express emotions through physical activity', value: 'physical-expression' }
        ],
        phase: 'adaptive',
        weight: 5,
        required: true
      }
    ];
    
    const nextQuestion = questions[questionCount % questions.length];
    dispatch({ type: 'SET_QUESTION', payload: nextQuestion });
  };

  const completeAssessment = () => {
    console.log('✅ Assessment completed:', state.answers);
    // Clear assessment data from localStorage after completion
    localStorage.removeItem('tension_assessment_data');
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
    localStorage.removeItem('tension_assessment_data');
  };

  const value: AssessmentContextType = {
    state,
    startAssessment,
    answerQuestion,
    getNextQuestion,
    completeAssessment,
    resetAssessment,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};
``r

===== FILE: src/components/onboarding/OnboardingStep.tsx =====
`$Lang
import React from 'react';
import WelcomeStep from './steps/WelcomeStep';
import BasicInfoStep from './steps/BasicInfoStep';
import PreferencesStep from './steps/PreferencesStep';
import BoundariesStep from './steps/BoundariesStep';
import InterestsStep from './steps/InterestsStep';
import PrivacyStep from './steps/PrivacyStep';
import CompleteStep from './steps/CompleteStep';

interface OnboardingStepProps {
  step: number;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ step }) => {
  switch (step) {
    case 1:
      return <WelcomeStep />;
    case 2:
      return <BasicInfoStep />;
    case 3:
      return <PreferencesStep />;
    case 4:
      return <BoundariesStep />;
    case 5:
      return <InterestsStep />;
    case 6:
      return <PrivacyStep />;
    case 7:
      return <CompleteStep />;
    default:
      return <WelcomeStep />;
  }
};

export default OnboardingStep;
``r

===== FILE: src/components/onboarding/steps/WelcomeStep.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Brain, Users, Sparkles, Lock } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Deep Psychological Insights',
      description: 'AI-powered analysis of your relationship patterns and desires',
    },
    {
      icon: Heart,
      title: 'Compatibility Mapping',
      description: 'Discover how you connect on emotional and intimate levels',
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Your journey remains confidential with end-to-end encryption',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 w-24 h-24 border-2 border-gold-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gold-100 mb-6">
          Welcome to Your Journey
        </h1>
        
        <p className="text-xl text-gold-200 mb-8 leading-relaxed">
          You're about to embark on a profound exploration of your authentic self. 
          This process will help us understand your psychological patterns, desires, 
          and relationship dynamics to create a personalized experience just for you.
        </p>

        {/* What to Expect */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gold-100 mb-6">
            What to Expect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-gold-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gold-200 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Privacy Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-dark-700/30 border border-gold-500/20 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-gold-400 mr-2" />
            <h3 className="text-lg font-semibold text-gold-100">
              Your Privacy is Sacred
            </h3>
          </div>
          <p className="text-gold-200 text-sm leading-relaxed">
            Everything you share with us is encrypted and remains completely confidential. 
            You control what information you provide, and you can modify or delete your data at any time. 
            We never share personal details with third parties.
          </p>
        </motion.div>

        {/* Time Estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gold-300 text-sm">
            <Users className="w-4 h-4 inline mr-1" />
            This process takes about 10-15 minutes to complete
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
``r

===== FILE: src/components/onboarding/steps/BasicInfoStep.tsx =====
`$Lang
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Calendar, Users, Heart } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { Gender, SexualOrientation, RelationshipStatus, SwingingExperience } from '../../../types';
import { cn } from '../../../utils';

interface FormData {
  age?: number;
  gender?: Gender;
  sexualOrientation?: SexualOrientation;
  relationshipStatus?: RelationshipStatus;
  swingingExperience?: SwingingExperience;
  isAnonymous?: boolean;
}

const BasicInfoStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;
  const [isAnonymous, setIsAnonymous] = useState(data.basicInfo.isAnonymous || false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    defaultValues: {
      age: data.basicInfo.age || undefined,
      gender: data.basicInfo.gender || undefined,
      sexualOrientation: data.basicInfo.sexualOrientation || undefined,
      relationshipStatus: data.basicInfo.relationshipStatus || undefined,
      swingingExperience: data.basicInfo.swingingExperience || undefined,
      isAnonymous: data.basicInfo.isAnonymous || false,
    },
  });

  useEffect(() => {
    // Auto-save form data as user types
    const subscription = watch((value) => {
      updateData({
        basicInfo: {
          ...data.basicInfo,
          ...value,
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData, data.basicInfo]);

  const onSubmit = (formData: FormData) => {
    updateData({
      basicInfo: {
        ...data.basicInfo,
        ...formData,
      },
    });
  };

  const formatEnumValue = (value: string): string => {
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            Tell Us About Yourself
          </h1>
          <p className="text-gold-200">
            This basic information helps us personalize your experience and ensure appropriate matching.
          </p>
        </div>

        {/* Anonymous Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold-100">Anonymous Mode</h3>
                  <p className="text-sm text-gold-200">Keep your identity completely private</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAnonymous(!isAnonymous);
                  updateData({
                    basicInfo: {
                      ...data.basicInfo,
                      isAnonymous: !isAnonymous,
                    },
                  });
                }}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900',
                  isAnonymous ? 'bg-gold-500' : 'bg-dark-600'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    isAnonymous ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Age */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Age</label>
            </div>
            <input
              type="number"
              {...register('age', { 
                min: { value: 18, message: 'Must be at least 18 years old' },
                max: { value: 100, message: 'Please enter a valid age' }
              })}
              className="input-field"
              placeholder="Enter your age"
            />
            {formErrors.age && (
              <p className="text-rose-400 text-sm mt-1">{formErrors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Gender</label>
            </div>
            <select {...register('gender')} className="input-field">
              <option value="">Select gender</option>
              {Object.values(Gender).map((gender) => (
                <option key={gender} value={gender}>
                  {formatEnumValue(gender)}
                </option>
              ))}
            </select>
          </div>

          {/* Sexual Orientation */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Sexual Orientation</label>
            </div>
            <select {...register('sexualOrientation')} className="input-field">
              <option value="">Select orientation</option>
              {Object.values(SexualOrientation).map((orientation) => (
                <option key={orientation} value={orientation}>
                  {formatEnumValue(orientation)}
                </option>
              ))}
            </select>
          </div>

          {/* Relationship Status */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Relationship Status</label>
            </div>
            <select {...register('relationshipStatus')} className="input-field">
              <option value="">Select status</option>
              {Object.values(RelationshipStatus).map((status) => (
                <option key={status} value={status}>
                  {formatEnumValue(status)}
                </option>
              ))}
            </select>
          </div>

          {/* Swinging Experience */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Swinging Experience</label>
            </div>
            <select {...register('swingingExperience')} className="input-field">
              <option value="">Select experience level</option>
              {Object.values(SwingingExperience).map((experience) => (
                <option key={experience} value={experience}>
                  {formatEnumValue(experience)}
                </option>
              ))}
            </select>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default BasicInfoStep;
``r

===== FILE: src/components/onboarding/steps/PreferencesStep.tsx =====
`$Lang
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Settings, Bell, Globe, Clock, Shield } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { PrivacyLevel } from '../../../types';
import { cn } from '../../../utils';

interface FormData {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  partnerUpdates: boolean;
  aiInsights: boolean;
  privacyLevel: PrivacyLevel;
  sessionHistory: number;
  assessmentResults: number;
  conversationLogs: number;
  autoDelete: boolean;
}

const PreferencesStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;

  const {
    register,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      language: 'en',
      timezone: 'UTC',
      emailNotifications: false,
      pushNotifications: false,
      partnerUpdates: false,
      aiInsights: false,
      privacyLevel: data.privacy.privacyLevel,
      sessionHistory: 30,
      assessmentResults: 90,
      conversationLogs: 30,
      autoDelete: false,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const subscription = watch((values) => {
      updateData({
        privacy: {
          ...data.privacy,
          privacyLevel: values.privacyLevel || data.privacy.privacyLevel,
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData, data.privacy]);

  const privacyLevels = [
    {
      value: 'minimal' as PrivacyLevel,
      title: 'Minimal',
      description: 'Basic privacy with standard encryption',
      icon: '🔒',
    },
    {
      value: 'balanced' as PrivacyLevel,
      title: 'Balanced',
      description: 'Enhanced privacy with selective data sharing',
      icon: '⚖️',
    },
    {
      value: 'maximum' as PrivacyLevel,
      title: 'Maximum',
      description: 'Highest privacy with minimal data collection',
      icon: '🛡️',
    },
  ];

  const ToggleSwitch: React.FC<{ 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }> = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2',
        {
          'bg-gradient-to-r from-rose-500 to-gold-500': checked,
          'bg-dark-600': !checked,
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          {
            'translate-x-6': checked,
            'translate-x-1': !checked,
          }
        )}
      />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            Customize Your Experience
          </h1>
          <p className="text-gold-200">
            Set your preferences for notifications, privacy, and data management.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Globe className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">General Settings</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gold-200 mb-2">
                  Language
                </label>
                <select
                  {...register('language')}
                  id="language"
                  className="input-field"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="pl">Polski</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gold-200 mb-2">
                  Timezone
                </label>
                <select
                  {...register('timezone')}
                  id="timezone"
                  className="input-field"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Europe/Berlin">Berlin</option>
                  <option value="Europe/Warsaw">Warsaw</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Bell className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">Email Notifications</h3>
                  <p className="text-sm text-gold-200">Receive updates and insights via email</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.emailNotifications}
                  onChange={(checked) => setValue('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">Push Notifications</h3>
                  <p className="text-sm text-gold-200">Real-time notifications in your browser</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.pushNotifications}
                  onChange={(checked) => setValue('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">Partner Updates</h3>
                  <p className="text-sm text-gold-200">Notifications about your partner's activity</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.partnerUpdates}
                  onChange={(checked) => setValue('partnerUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gold-100 font-medium">AI Insights</h3>
                  <p className="text-sm text-gold-200">Personalized insights and recommendations</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.aiInsights}
                  onChange={(checked) => setValue('aiInsights', checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Shield className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Privacy Level</h2>
            </div>

            <div className="grid gap-4">
              {privacyLevels.map((level) => (
                <label
                  key={level.value}
                  className={cn(
                    'relative cursor-pointer rounded-lg border p-4 flex items-center space-x-3 transition-all duration-200',
                    {
                      'border-gold-400 bg-gold-500/10': watchedValues.privacyLevel === level.value,
                      'border-gold-500/30 hover:border-gold-400/60': watchedValues.privacyLevel !== level.value,
                    }
                  )}
                >
                  <input
                    {...register('privacyLevel')}
                    type="radio"
                    value={level.value}
                    className="sr-only"
                  />
                  <div className="text-2xl">{level.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-gold-100 font-medium">{level.title}</h3>
                    <p className="text-sm text-gold-200">{level.description}</p>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border-2 transition-all duration-200',
                      {
                        'border-gold-400 bg-gold-400': watchedValues.privacyLevel === level.value,
                        'border-gold-500/50': watchedValues.privacyLevel !== level.value,
                      }
                    )}
                  />
                </label>
              ))}
            </div>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Clock className="w-5 h-5 text-gold-400 mr-2" />
              <h2 className="text-xl font-semibold text-gold-100">Data Retention</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="sessionHistory" className="block text-sm font-medium text-gold-200 mb-2">
                  Session History (days)
                </label>
                <select
                  {...register('sessionHistory')}
                  id="sessionHistory"
                  className="input-field"
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>

              <div>
                <label htmlFor="assessmentResults" className="block text-sm font-medium text-gold-200 mb-2">
                  Assessment Results (days)
                </label>
                <select
                  {...register('assessmentResults')}
                  id="assessmentResults"
                  className="input-field"
                >
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                  <option value={730}>2 years</option>
                  <option value={-1}>Permanent</option>
                </select>
              </div>

              <div>
                <label htmlFor="conversationLogs" className="block text-sm font-medium text-gold-200 mb-2">
                  Conversation Logs (days)
                </label>
                <select
                  {...register('conversationLogs')}
                  id="conversationLogs"
                  className="input-field"
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold-500/20">
                <div>
                  <h3 className="text-gold-100 font-medium">Auto-delete expired data</h3>
                  <p className="text-sm text-gold-200">Automatically remove data after retention period</p>
                </div>
                <ToggleSwitch
                  checked={watchedValues.autoDelete}
                  onChange={(checked) => setValue('autoDelete', checked)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreferencesStep;
``r

===== FILE: src/components/onboarding/steps/BoundariesStep.tsx =====
`$Lang
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, X, AlertTriangle } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { cn } from '../../../utils';

const commonBoundaries = [
  'No unprotected sex',
  'Must use condoms',
  'No kissing',
  'No anal play',
  'No oral contact',
  'No overnight stays',
  'Same room only',
  'Separate room only',
  'No emotional attachment',
  'Must meet partner first',
  'No photos/videos',
  'No sharing personal info',
  'No repeat encounters',
  'Partners must be tested',
  'No substance use',
  'Safe word required',
  'Discuss limits beforehand',
  'Can say no anytime',
  'No pressure allowed',
  'Respect privacy always',
];

const BoundariesStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;
  const [selectedBoundaries, setSelectedBoundaries] = useState<string[]>(
    data.preferences.boundaries || []
  );
  const [customBoundary, setCustomBoundary] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    updateData({
      preferences: {
        ...data.preferences,
        boundaries: selectedBoundaries,
      },
    });
  }, [selectedBoundaries, updateData, data.preferences]);

  const filteredBoundaries = commonBoundaries.filter(boundary =>
    boundary.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedBoundaries.includes(boundary)
  );

  const addBoundary = (boundary: string) => {
    if (!selectedBoundaries.includes(boundary)) {
      setSelectedBoundaries([...selectedBoundaries, boundary]);
    }
  };

  const removeBoundary = (boundary: string) => {
    setSelectedBoundaries(selectedBoundaries.filter(b => b !== boundary));
  };

  const addCustomBoundary = () => {
    if (customBoundary.trim() && !selectedBoundaries.includes(customBoundary.trim())) {
      setSelectedBoundaries([...selectedBoundaries, customBoundary.trim()]);
      setCustomBoundary('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomBoundary();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            Define Your Boundaries
          </h1>
          <p className="text-gold-200 max-w-2xl mx-auto">
            Setting clear boundaries is essential for safe and enjoyable experiences. 
            Choose what feels comfortable for you, and remember you can always modify these later.
          </p>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-rose-300 font-medium mb-1">Important Reminder</h3>
              <p className="text-rose-200 text-sm leading-relaxed">
                Boundaries can always be adjusted. You have the right to say no at any time, 
                and others should respect your limits. Communication is key to safe and consensual experiences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Selected Boundaries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">
            Your Boundaries ({selectedBoundaries.length})
          </h2>
          
          {selectedBoundaries.length > 0 ? (
            <div className="grid gap-2">
              {selectedBoundaries.map((boundary, index) => (
                <motion.div
                  key={boundary}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-500/10 to-gold-500/10 border border-gold-500/30 rounded-lg"
                >
                  <span className="text-gold-100 flex-1">{boundary}</span>
                  <button
                    onClick={() => removeBoundary(boundary)}
                    className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <Shield className="w-12 h-12 text-gold-400/50 mx-auto mb-3" />
              <p className="text-gold-200">No boundaries selected yet. Choose from the options below.</p>
            </div>
          )}
        </motion.div>

        {/* Add Custom Boundary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 card p-6"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">Add Custom Boundary</h2>
          <div className="flex space-x-3">
            <input
              type="text"
              value={customBoundary}
              onChange={(e) => setCustomBoundary(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe a specific boundary or limit..."
              className="input-field flex-1"
            />
            <button
              onClick={addCustomBoundary}
              disabled={!customBoundary.trim()}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                customBoundary.trim()
                  ? 'bg-gradient-to-r from-rose-500 to-gold-500 text-white hover:shadow-lg'
                  : 'bg-dark-600 text-dark-300 cursor-not-allowed'
              )}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Search Common Boundaries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gold-100 mb-4">Common Boundaries</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search boundaries..."
            className="input-field mb-4"
          />
        </motion.div>

        {/* Common Boundaries Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid gap-3 md:grid-cols-2"
        >
          {filteredBoundaries.map((boundary, index) => (
            <motion.button
              key={boundary}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => addBoundary(boundary)}
              className="text-left p-4 bg-dark-700/30 border border-gold-500/20 rounded-lg hover:border-gold-400/40 hover:bg-dark-600/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gold-100 group-hover:text-gold-50 transition-colors">
                  {boundary}
                </span>
                <Plus className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {filteredBoundaries.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <p className="text-gold-200">
              No boundaries found matching "{searchTerm}". Try adding it as a custom boundary above.
            </p>
          </motion.div>
        )}

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 bg-dark-700/30 border border-gold-500/20 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-gold-100 mb-3">Safety Tips</h3>
          <ul className="space-y-2 text-gold-200 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>Always communicate your boundaries clearly before any encounter</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>You can modify or add boundaries at any time</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>Respect others' boundaries as you want yours respected</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold-400 mt-1">•</span>
              <span>If someone pressures you to ignore your boundaries, that's a red flag</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BoundariesStep;
``r

===== FILE: src/components/onboarding/steps/CompleteStep.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Brain, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';

const CompleteStep: React.FC = () => {
  const { state } = useOnboarding();
  const { data } = state;

  const summary = [
    {
      icon: Users,
      title: 'Profile Information',
      value: data.basicInfo.age ? `${data.basicInfo.age} years old` : 'Set up',
      detail: data.basicInfo.gender ? `${data.basicInfo.gender}, ${data.basicInfo.sexualOrientation}` : 'Profile configured',
    },
    {
      icon: Shield,
      title: 'Boundaries',
      value: `${data.preferences.boundaries?.length || 0} boundaries`,
      detail: 'Safety guidelines established',
    },
    {
      icon: Heart,
      title: 'Interests',
      value: `${data.preferences.interests?.length || 0} interests`,
      detail: 'Preferences recorded',
    },
    {
      icon: Brain,
      title: 'Privacy Level',
      value: data.privacy.privacyLevel,
      detail: 'Security configured',
    },
  ];

  const nextSteps = [
    {
      icon: Brain,
      title: 'AI Psychological Profiling',
      description: 'Complete your psychological assessment to unlock deep insights about your personality and relationship patterns.',
      action: 'Start Assessment',
    },
    {
      icon: Users,
      title: 'Partner Connection',
      description: 'Invite your partner to join and discover your compatibility through our advanced matching algorithms.',
      action: 'Invite Partner',
    },
    {
      icon: Sparkles,
      title: 'Explore Features',
      description: 'Discover tension mapping, shadow desires analysis, and personalized growth recommendations.',
      action: 'Explore Now',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Animation */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative mx-auto mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 w-24 h-24 border-4 border-gold-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold text-gold-100 mb-4"
          >
            Welcome to Tensions!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-gold-200 leading-relaxed"
          >
            Your profile is complete and your journey of self-discovery begins now. 
            You're ready to explore the depths of your psychological landscape.
          </motion.p>
        </div>

        {/* Setup Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gold-100 mb-6 text-center">
            Setup Summary
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {summary.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-lg border border-gold-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">{item.title}</h3>
                  <p className="text-gold-400 font-semibold">{item.value}</p>
                  <p className="text-gold-200 text-sm">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gold-100 mb-6 text-center">
            What's Next?
          </h2>
          
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="card p-6 hover:border-gold-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gold-100 mb-1">{step.title}</h3>
                      <p className="text-gold-200 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gold-400 group-hover:text-gold-300 transition-colors">
                    <span className="text-sm font-medium">{step.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center p-8 bg-gradient-to-r from-rose-500/10 to-gold-500/10 border border-gold-500/30 rounded-xl"
        >
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gold-100 mb-3">
            Your Journey Begins
          </h3>
          <p className="text-gold-200 leading-relaxed max-w-2xl mx-auto">
            You've taken the first step toward deeper self-understanding and more fulfilling relationships. 
            Our AI will guide you through psychological territories you may have never explored, 
            revealing insights that can transform how you connect with yourself and others.
          </p>
        </motion.div>

        {/* Privacy Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 p-4 bg-dark-700/30 border border-gold-500/20 rounded-lg text-center"
        >
          <Shield className="w-5 h-5 text-gold-400 mx-auto mb-2" />
          <p className="text-gold-200 text-sm">
            <strong>Your privacy is protected.</strong> All information is encrypted and only you control who sees what.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompleteStep;
``r

