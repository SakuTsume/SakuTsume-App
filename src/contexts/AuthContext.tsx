import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, OnboardingState } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  onboardingState: OnboardingState | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateOnboardingState: (state: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingState, setOnboardingState] = useState<OnboardingState | null>(null);

  // Mock user for development
  useEffect(() => {
    const mockUser: User = {
      id: 'user_1',
      email: 'maya@example.com',
      name: 'Maya',
      roles: ['casual'],
      activeRole: 'casual',
      isVerified: false,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    };
    
    // Check if user needs onboarding
    if (!mockUser.onboardingCompleted) {
      setOnboardingState({
        currentStep: 0,
        totalSteps: 3,
        selectedRole: null,
        completedSteps: [],
        data: {},
      });
    }
    
    setUser(mockUser);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login implementation
    console.log('Login attempt:', email);
  };

  const logout = () => {
    setUser(null);
    setOnboardingState(null);
  };

  const switchRole = (role: UserRole) => {
    if (user && user.roles.includes(role)) {
      setUser({ ...user, activeRole: role });
    }
  };

  const updateOnboardingState = (state: Partial<OnboardingState>) => {
    if (onboardingState) {
      setOnboardingState({ ...onboardingState, ...state });
    }
  };

  const completeOnboarding = () => {
    if (user && onboardingState) {
      setUser({ ...user, onboardingCompleted: true });
      setOnboardingState(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    onboardingState,
    login,
    logout,
    switchRole,
    updateOnboardingState,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};