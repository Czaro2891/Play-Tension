===== FILE: package.json =====
`$Lang
{
  "name": "ten",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@hookform/resolvers": "^3.3.2",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.68",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "framer-motion": "^10.16.16",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4",
    "yup": "^1.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

``r

===== FILE: tsconfig.json =====
`$Lang
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "typeRoots": ["node_modules/@types", "src/types"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}

``r

===== FILE: tailwind.config.js =====
`$Lang
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#fdede1',
          200: '#fad9c2',
          300: '#f6c193',
          400: '#f1a364',
          500: '#e88c47',
          600: '#d4722a',
          700: '#b85c1f',
          800: '#954a1a',
          900: '#7a3d18',
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        tension: {
          light: '#ffeef0',
          DEFAULT: '#ff6b7d',
          dark: '#c9184a',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        dark: {
          50: '#4a4458',
          100: '#433d51',
          200: '#3c3649',
          300: '#342f42',
          400: '#2d283a',
          500: '#262133',
          600: '#1f1a2b',
          700: '#181324',
          800: '#110c1c',
          900: '#0a0515',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
``r

===== FILE: postcss.config.js =====
`$Lang
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
``r

===== FILE: src/index.tsx =====
`$Lang
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

``r

===== FILE: src/App.tsx =====
`$Lang
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { AssessmentProvider } from './contexts/AssessmentContext';

// Pages
import Landing from './pages/Landing';
import UserSetup from './pages/UserSetup';
import Onboarding from './pages/Onboarding';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/setup" replace />;
  }
  
  return <>{children}</>;
};

// Main App Component
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/setup" element={<UserSetup />} />
      
      {/* Protected Routes */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/assessment" 
        element={
          <ProtectedRoute>
            <Assessment />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Root App Component
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <OnboardingProvider>
          <AssessmentProvider>
            <AppContent />
          </AssessmentProvider>
        </OnboardingProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

``r

===== FILE: src/pages/Landing.tsx =====
`$Lang
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Users, 
  Shield, 
  Star, 
  ArrowRight, 
  Settings,
  Play
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="bg-dark-800/50 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                  Tension
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/onboarding"
                  className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-4 py-2 rounded-lg font-semibold hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Kontynuuj</span>
                </Link>
              ) : (
                <Link
                  to="/setup"
                  className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-4 py-2 rounded-lg font-semibold hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Rozpocznij</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Odkryj swoje
              <span className="block bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                psychologiczne głębie
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
            >
              Zaawansowana platforma AI dla par, które chcą eksplorować swoją psychologię, 
              zrozumieć kompatybilność i odkryć ukryte pragnienia.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/setup"
                className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Rozpocznij przygodę</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Dlaczego Tension?
            </h2>
            <p className="text-xl text-gray-400">
              Unikalne funkcje, które wyróżniają naszą platformę
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-dark-700 p-8 rounded-2xl border border-dark-600"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-dark-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-400">
                Zaawansowana analiza psychologiczna wykorzystująca sztuczną inteligencję 
                do odkrywania wzorców behawioralnych i emocjonalnych.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-700 p-8 rounded-2xl border border-dark-600"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-dark-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Couple Compatibility
              </h3>
              <p className="text-gray-400">
                Głęboka analiza kompatybilności par z uwzględnieniem psychologicznych 
                wzorców i preferencji intymnych.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-dark-700 p-8 rounded-2xl border border-dark-600"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-dark-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Privacy First
              </h3>
              <p className="text-gray-400">
                Twoje dane są przechowywane lokalnie i nie są wysyłane na serwer. 
                Pełna kontrola nad swoimi informacjami.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Co mówią użytkownicy
            </h2>
            <p className="text-xl text-gray-400">
              Doświadczenia par, które odkryły nowe wymiary swojej relacji
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-dark-800 p-8 rounded-2xl border border-dark-700"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Tension pomogło nam odkryć głębsze aspekty naszej relacji. 
                Analiza była niezwykle dokładna i otworzyła nam oczy na nowe możliwości."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-dark-900" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Anna & Marek</p>
                  <p className="text-gray-400 text-sm">Para z 5-letnim stażem</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-800 p-8 rounded-2xl border border-dark-700"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Platforma jest intuicyjna i bezpieczna. Czujemy się komfortowo 
                dzieląc się swoimi myślami i odkrywając nowe aspekty naszej intymności."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-dark-900" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Kasia & Piotr</p>
                  <p className="text-gray-400 text-sm">Nowa para</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Twoja prywatność jest priorytetem
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Wszystkie dane są przechowywane lokalnie na Twoim urządzeniu. 
              Nie wysyłamy żadnych informacji na serwer.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Dane lokalne
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Bez rejestracji
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Pełna kontrola
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Gotowy na odkrycie?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Rozpocznij swoją psychologiczną podróż już dziś
          </p>
          <Link
            to="/setup"
            className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-500 hover:to-rose-500 transition-all duration-200 inline-flex items-center space-x-2 group"
          >
            <span>Rozpocznij teraz</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent mb-4">
              Tension
            </h3>
            <p className="text-gray-400 mb-6">
              Odkrywanie psychologicznych głębi przez AI
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Tension. Wszystkie prawa zastrzeżone.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
``r

===== FILE: src/pages/Onboarding.tsx =====
`$Lang
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { OnboardingProvider, useOnboarding } from '../contexts/OnboardingContext';
import OnboardingStep from '../components/onboarding/OnboardingStep';
import ProgressIndicator from '../components/onboarding/ProgressIndicator';
import NavigationControls from '../components/onboarding/NavigationControls';
import { Zap } from 'lucide-react';

const OnboardingContent: React.FC = () => {
  const { state } = useOnboarding();
  const { currentStep, isComplete } = state;
  const totalSteps = 6; // 6 steps total (0-5)
  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (isComplete) {
    return <Navigate to="/assessment" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      {/* Header */}
      <header className="bg-dark-800/95 backdrop-blur-md border-b border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-gold-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gold-400">
                Tensions
              </span>
            </div>
            
            <div className="text-sm text-gold-300">
              Step {currentStep + 1} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressIndicator progress={progress} currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px] flex flex-col"
          >
            <OnboardingStep step={currentStep} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <NavigationControls />
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-gold-400/30 rounded-full"
          />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-rose-400/30 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const Onboarding: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/setup" replace />;
  }

  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default Onboarding;
``r

===== FILE: src/pages/Assessment.tsx =====
`$Lang
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AssessmentProvider, useAssessment } from '../contexts/AssessmentContext';
import { AISessionType, PersonalityMode } from '../types';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import QuestionDisplay from '../components/assessment/QuestionDisplay';
import AssessmentComplete from '../components/assessment/AssessmentComplete';
import { Brain, Heart, Users, Star } from 'lucide-react';

const AssessmentContent: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state,
    startAssessment,
    getNextQuestion
  } = useAssessment();

  useEffect(() => {
    // Start assessment if not already started
    if (!state.session && !state.isComplete) {
      startAssessment(AISessionType.PROFILING, PersonalityMode.THERAPIST);
    }
  }, [state.session, state.isComplete, startAssessment]);

  // If assessment is complete, show completion screen
  if (state.isComplete) {
    return <AssessmentComplete />;
  }

  // If no current question, show loading
  if (!state.currentQuestion) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Preparing your assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AssessmentHeader />
        
        {/* Question Display */}
        <div className="mb-8">
          <QuestionDisplay />
        </div>
        
        {/* Progress Info */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Take your time to answer thoughtfully. Your responses help us understand your unique psychological profile.
          </p>
        </div>
      </div>
    </div>
  );
};

const Assessment: React.FC = () => {
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
};

export default Assessment;
``r

===== FILE: src/pages/Dashboard.tsx =====
`$Lang
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Brain, 
  Heart, 
  BarChart3, 
  Users, 
  Zap,
  ArrowRight,
  Star,
  Target,
  Flame,
  Clock,
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, clearUserData } = useAuth();
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  const mockInsights = [
    {
      type: 'personality',
      title: 'Dominant Archetype',
      value: 'Explorer',
      description: 'You seek new experiences and emotional depth',
      color: 'from-purple-500 to-violet-600',
      icon: Star
    },
    {
      type: 'emotional',
      title: 'Emotional Intelligence',
      value: '87%',
      description: 'High awareness of emotional patterns',
      color: 'from-rose-500 to-pink-600',
      icon: Heart
    },
    {
      type: 'communication',
      title: 'Communication Style',
      value: 'Direct',
      description: 'Clear, honest, and straightforward',
      color: 'from-gold-500 to-yellow-600',
      icon: Target
    }
  ];

  const quickActions = [
    {
      title: 'Take Assessment',
      description: 'Deep psychological profiling',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600',
      action: handleStartAssessment,
      available: true
    },
    {
      title: 'Update Profile',
      description: 'Complete your onboarding',
      icon: User,
      color: 'from-green-500 to-emerald-600',
      action: handleStartOnboarding,
      available: !user?.profileCompleted
    },
    {
      title: 'Compatibility Analysis',
      description: 'Compare with partner',
      icon: Users,
      color: 'from-rose-500 to-pink-600',
      action: () => navigate('/compatibility'),
      available: false
    },
    {
      title: 'AI Insights',
      description: 'View detailed reports',
      icon: BarChart3,
      color: 'from-purple-500 to-violet-600',
      action: () => navigate('/insights'),
      available: false
    }
  ];

  const recentActivity = [
    {
      type: 'assessment',
      title: 'Psychological Assessment',
      description: 'Started emotional patterns phase',
      time: '2 hours ago',
      icon: Brain,
      color: 'text-blue-400'
    },
    {
      type: 'profile',
      title: 'Profile Updated',
      description: 'Added relationship preferences',
      time: '1 day ago',
      icon: User,
      color: 'text-green-400'
    },
    {
      type: 'insight',
      title: 'New Insight Generated',
      description: 'Communication pattern analysis',
      time: '2 days ago',
      icon: Zap,
      color: 'text-gold-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      {/* Header */}
      <header className="bg-dark-800/95 backdrop-blur-md border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Flame className="w-8 h-8 text-gold-400" />
                <span className="text-xl font-bold text-gold-100">Tension</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-gold-200 font-medium">{user?.username}</p>
                <p className="text-gold-400 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={clearUserData}
                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gold-300 rounded-lg transition-colors"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gold-100 mb-2">
            Welcome back, {user?.username}
          </h1>
          <p className="text-gold-300">
            Continue your psychological journey and discover deeper insights about yourself
          </p>
        </motion.div>

        {/* Profile Completion Status */}
        {!user?.profileCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-gradient-to-r from-gold-500/10 to-rose-500/10 border border-gold-500/30 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-gold-200 font-semibold">Complete Your Profile</h3>
                  <p className="text-gold-300 text-sm">
                    Finish onboarding to unlock full psychological analysis
                  </p>
                </div>
              </div>
              <button
                onClick={handleStartOnboarding}
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
              >
                Continue Setup
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gold-200 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.button
                      key={action.title}
                      onClick={action.available ? action.action : undefined}
                      disabled={!action.available}
                      whileHover={action.available ? { scale: 1.02 } : undefined}
                      whileTap={action.available ? { scale: 0.98 } : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={`
                        p-6 rounded-xl border text-left transition-all duration-300
                        ${action.available 
                          ? 'bg-dark-700/50 border-gold-500/20 hover:border-gold-400/40 hover:bg-dark-600/50 cursor-pointer' 
                          : 'bg-dark-800/30 border-dark-600/50 cursor-not-allowed opacity-60'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {action.available && <ArrowRight className="w-5 h-5 text-gold-400" />}
                      </div>
                      <h3 className="font-semibold text-gold-200 mb-2">{action.title}</h3>
                      <p className="text-gold-300 text-sm">{action.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Psychological Insights */}
            {user?.profileCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-gold-200 mb-6">Your Psychological Profile</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockInsights.map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <motion.div
                        key={insight.type}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="p-6 bg-dark-700/50 border border-gold-500/20 rounded-xl"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center mb-4`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gold-200 mb-1">{insight.title}</h3>
                        <p className="text-2xl font-bold text-gold-100 mb-2">{insight.value}</p>
                        <p className="text-gold-300 text-sm">{insight.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-dark-700/50 border border-gold-500/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-gold-200 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center`}>
                        <IconComponent className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gold-200 font-medium text-sm">{activity.title}</h4>
                        <p className="text-gold-300 text-xs mb-1">{activity.description}</p>
                        <p className="text-gold-400 text-xs flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Progress Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-dark-700/50 border border-gold-500/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-gold-200 mb-4">Progress Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gold-300 text-sm">Profile Completion</span>
                    <span className="text-gold-200 text-sm font-medium">
                      {user?.profileCompleted ? '100%' : '60%'}
                    </span>
                  </div>
                  <div className="w-full bg-dark-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: user?.profileCompleted ? '100%' : '60%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gold-300 text-sm">Assessment Progress</span>
                    <span className="text-gold-200 text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-dark-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-500/20">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gold-400" />
                  <span className="text-gold-200 font-medium">Explorer Level</span>
                </div>
                <p className="text-gold-300 text-xs mt-1">
                  Continue assessments to unlock deeper insights
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
``r

