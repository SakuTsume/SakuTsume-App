export type UserRole = 'talent' | 'business' | 'casual';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: UserRole[];
  activeRole: UserRole;
  isVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface TalentProfile {
  demoReel?: {
    url: string;
    duration: number;
    verified: boolean;
  };
  skills: string[];
  topThreePicks: string[];
  risingTalentBoostUsed: boolean;
}

export interface BusinessProfile {
  companyName: string;
  companyEmail: string;
  isEmailVerified: boolean;
  companySize?: string;
  industry?: string;
  freeGigPromotionsLeft: number;
}

export interface CasualProfile {
  followingCount: number;
  earlyAdopterBadge: boolean;
  upgradePromptShown: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  selectedRole: UserRole | null;
  completedSteps: string[];
  data: Record<string, any>;
}