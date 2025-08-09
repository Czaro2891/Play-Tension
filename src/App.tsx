import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { AssessmentProvider } from './contexts/AssessmentContext';
import { TensionProvider } from './contexts/TensionContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Assessment from './pages/Assessment';
import UserSetup from './pages/UserSetup';
import TensionPage from './pages/TensionPage';
import Telemetry from './pages/Telemetry';

// Używamy HashRouter, aby routing działał poprawnie na GitHub Pages bez dodatkowej konfiguracji serwera

function App() {
  return (
    <Router>
      <AuthProvider>
        <OnboardingProvider>
          <AssessmentProvider>
            <TensionProvider>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/user-setup" element={<UserSetup />} />
                <Route path="/setup" element={<Navigate to="/user-setup" replace />} />
                <Route path="/tension" element={<TensionPage />} />
                <Route path="/telemetry" element={<Telemetry />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </TensionProvider>
          </AssessmentProvider>
        </OnboardingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
