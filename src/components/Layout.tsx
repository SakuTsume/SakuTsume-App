import React from 'react';
import BottomNav from './navigation/BottomNav';
import Sidebar from './navigation/Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar - Always show on desktop, but with different styling for HomePage */}
        <div className={`hidden md:block w-64 fixed h-full z-[100000] ${
          isHomePage ? 'bg-black/80 backdrop-blur-md' : 'bg-white'
        }`}>
          <Sidebar />
        </div>
        
        <main className={`flex-1 ${isHomePage ? '' : 'pb-16 md:pb-0'} ${!isHomePage ? 'md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
      
      {/* Bottom Navigation - Always visible with highest z-index on HomePage */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${isHomePage ? 'z-[60]' : 'z-10'}`}>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;