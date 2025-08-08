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