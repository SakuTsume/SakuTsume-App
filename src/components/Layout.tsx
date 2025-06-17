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
        {/* Hide sidebar completely on HomePage */}
        {!isHomePage && (
          <div className="hidden md:block w-64 fixed h-full">
            <Sidebar />
          </div>
        )}
        
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