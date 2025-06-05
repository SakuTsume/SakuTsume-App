import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import SearchPage from './pages/SearchPage';
import NetworkPage from './pages/NetworkPage';
import CreatePage from './pages/CreatePage';

function App() {
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
}

export default App;