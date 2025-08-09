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

  // Initialize with a new user that needs onboarding
  useEffect(() => {
    // Check if we have a completed user in localStorage
    const savedUser = localStorage.getItem('sakutsume_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } else {
      // New user needs onboarding
      setOnboardingState({
        currentStep: 0,
        totalSteps: 3,
        selectedRole: null,
        completedSteps: [],
        data: {},
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login implementation
    console.log('Login attempt:', email);
  };

  const logout = () => {
    setUser(null);
    setOnboardingState(null);
    localStorage.removeItem('sakutsume_user');
  };

  const switchRole = (role: UserRole) => {
    if (user && user.roles.includes(role)) {
      const updatedUser = { ...user, activeRole: role };
      setUser(updatedUser);
      localStorage.setItem('sakutsume_user', JSON.stringify(updatedUser));
    }
  };

  const updateOnboardingState = (state: Partial<OnboardingState>) => {
    if (onboardingState) {
      setOnboardingState({ ...onboardingState, ...state });
    }
  };

  const completeOnboarding = () => {
    if (onboardingState && onboardingState.selectedRole) {
      // Create user from onboarding data
      const onboardingData = onboardingState.data;
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: onboardingData.email || 'user@example.com',
        name: onboardingData.username || 'User',
        avatar: getDefaultAvatar(onboardingState.selectedRole),
        roles: [onboardingState.selectedRole],
        activeRole: onboardingState.selectedRole,
        isVerified: onboardingState.selectedRole === 'business' && onboardingData.emailVerificationStatus === 'verified',
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      setOnboardingState(null);
      
      // Save to localStorage
      localStorage.setItem('sakutsume_user', JSON.stringify(newUser));
    }
  };

  const getDefaultAvatar = (role: UserRole): string => {
    // Return different default avatars based on role
    switch (role) {
      case 'talent':
        return 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600';
      case 'business':
        return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600';
      case 'casual':
        return 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600';
      default:
        return 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600';
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