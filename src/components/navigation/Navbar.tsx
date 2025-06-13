import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on a profile page
  const isProfilePage = location.pathname.startsWith('/profile');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-8 w-8" />
            <span className={`text-xl font-display font-semibold transition-colors ${
              isScrolled ? 'text-primary-800' : 'text-white'
            }`}>SakuTsume</span>
          </Link>
          
          {/* Mobile Menu Toggle - Only show on profile pages */}
          {isProfilePage && (
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`transition-colors ${
                  isScrolled ? 'text-neutral-600 hover:text-primary-800' : 'text-white hover:text-neutral-200'
                }`}
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - Only show on profile pages */}
      <AnimatePresence>
        {mobileMenuOpen && isProfilePage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link to="/profile/me" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center text-white font-medium">
                  ST
                </div>
                <div>
                  <p className="font-medium">Your Profile</p>
                  <p className="text-sm text-neutral-500">View and edit your profile</p>
                </div>
              </Link>
              
              <div className="h-px bg-neutral-200 my-2"></div>
              
              <Link 
                to="/settings" 
                className="block p-2 rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              
              <Link 
                to="/help" 
                className="block p-2 rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Help Center
              </Link>
              
              <button className="w-full p-2 text-left rounded-lg hover:bg-red-50 text-red-600">
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;