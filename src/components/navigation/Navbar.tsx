import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../shared/SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  
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
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-8 w-8" />
            <span className="text-xl font-display font-semibold text-primary-800">SakuTsume</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleSearch}
              className="text-neutral-600 hover:text-primary-800 transition-colors"
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            
            <Link to="/notifications" className="text-neutral-600 hover:text-primary-800 transition-colors relative">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-accent-400 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </Link>
            
            <Link to="/messages" className="text-neutral-600 hover:text-primary-800 transition-colors relative">
              <MessageCircle size={22} />
              <span className="absolute -top-1 -right-1 bg-accent-400 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">5</span>
            </Link>
            
            <Link to="/profile/me" className="ml-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center text-white font-medium">
                ST
              </div>
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-600 hover:text-primary-800 transition-colors"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
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
                to="/search" 
                className="block p-2 rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
              
              <Link 
                to="/notifications" 
                className="block p-2 rounded-lg hover:bg-neutral-100 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Notifications</span>
                <span className="bg-accent-400 text-white text-xs px-2 py-0.5 rounded-full">3</span>
              </Link>
              
              <Link 
                to="/messages" 
                className="block p-2 rounded-lg hover:bg-neutral-100 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Messages</span>
                <span className="bg-accent-400 text-white text-xs px-2 py-0.5 rounded-full">5</span>
              </Link>
              
              <Link 
                to="/marketplace" 
                className="block p-2 rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              
              <div className="h-px bg-neutral-200 my-2"></div>
              
              <button className="w-full p-2 text-left rounded-lg hover:bg-neutral-100 text-neutral-700">
                Settings
              </button>
              
              <button className="w-full p-2 text-left rounded-lg hover:bg-neutral-100 text-neutral-700">
                Help Center
              </button>
              
              <button className="w-full p-2 text-left rounded-lg hover:bg-red-50 text-red-600">
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-30"
          >
            <SearchBar onClose={toggleSearch} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;