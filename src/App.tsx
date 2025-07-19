import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import SearchPage from './pages/SearchPage';
import NetworkPage from './pages/NetworkPage';
import CreatePage from './pages/CreatePage';

const AppContent: React.FC = () => {
  const { user, onboardingState } = useAuth();
  
  // Show onboarding if user exists but hasn't completed onboarding
  if (user && onboardingState) {
    return <OnboardingFlow />;
  }
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;