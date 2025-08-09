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

  // Initialize with onboarding state for new users
  useEffect(() => {
    // Check if there's a stored user or if we need to start onboarding
    const storedUser = localStorage.getItem('sakutsume_user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      // New user - start onboarding
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
    if (onboardingState && onboardingState.selectedRole && onboardingState.data) {
      // Create user from onboarding data
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: onboardingState.data.email || 'user@example.com',
        name: onboardingState.data.username || 'User',
        avatar: onboardingState.data.avatar || undefined,
        roles: [onboardingState.selectedRole],
        activeRole: onboardingState.selectedRole,
        isVerified: onboardingState.selectedRole === 'business' && onboardingState.data.companyEmail ? true : false,
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      setOnboardingState(null);
      
      // Store user data
      localStorage.setItem('sakutsume_user', JSON.stringify(newUser));
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