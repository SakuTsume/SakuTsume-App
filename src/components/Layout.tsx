import React from 'react';
import Navbar from './navigation/Navbar';
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
      <Navbar />
      
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for navbar height */}
        <div className="hidden md:block w-64 fixed h-full pt-2">
          <Sidebar />
        </div>
        
        <main className={`flex-1 ${isHomePage ? '' : 'pb-16 md:pb-0'} ${!isHomePage ? 'md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;