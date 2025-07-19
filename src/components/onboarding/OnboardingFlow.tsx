import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/user';
import RoleSelection from './RoleSelection';
import TalentOnboarding from './TalentOnboarding';
import BusinessOnboarding from './BusinessOnboarding';
import CasualOnboarding from './CasualOnboarding';
import OnboardingComplete from './OnboardingComplete';

const OnboardingFlow: React.FC = () => {
  const { onboardingState, updateOnboardingState, completeOnboarding } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);

  if (!onboardingState) {
    return null;
  }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    updateOnboardingState({ selectedRole: role, currentStep: 1 });
  };

  const handleOnboardingComplete = (data: any) => {
    setOnboardingData(data);
    updateOnboardingState({ currentStep: 2 });
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    updateOnboardingState({ selectedRole: null, currentStep: 0 });
  };

  const handleFinalComplete = () => {
    completeOnboarding();
  };

  // Role selection step
  if (!selectedRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  // Role-specific onboarding
  if (onboardingState.currentStep === 1) {
    switch (selectedRole) {
      case 'talent':
        return (
          <TalentOnboarding
            onComplete={handleOnboardingComplete}
            onBack={handleBackToRoleSelection}
          />
        );
      case 'business':
        return (
          <BusinessOnboarding
            onComplete={handleOnboardingComplete}
            onBack={handleBackToRoleSelection}
          />
        );
      case 'casual':
        return (
          <CasualOnboarding
            onComplete={handleOnboardingComplete}
            onBack={handleBackToRoleSelection}
          />
        );
      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
  }

  // Completion step
  if (onboardingState.currentStep === 2) {
    return (
      <OnboardingComplete
        role={selectedRole}
        data={onboardingData}
        onComplete={handleFinalComplete}
      />
    );
  }

  return <RoleSelection onRoleSelect={handleRoleSelect} />;
};

export default OnboardingFlow;