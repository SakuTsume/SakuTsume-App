import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingBag, MessageCircle, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="bg-white border-t border-neutral-200 py-2 px-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center px-3 py-1 rounded-lg ${
              isActive ? 'text-primary-800' : 'text-neutral-500'
            }`
          }
          end
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink 
          to="/search" 
          className={({ isActive }) => 
            `flex flex-col items-center px-3 py-1 rounded-lg ${
              isActive ? 'text-primary-800' : 'text-neutral-500'
            }`
          }
        >
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </NavLink>
        
        <NavLink 
          to="/marketplace" 
          className={({ isActive }) => 
            `flex flex-col items-center px-3 py-1 rounded-lg ${
              isActive ? 'text-primary-800' : 'text-neutral-500'
            }`
          }
        >
          <ShoppingBag size={20} />
          <span className="text-xs mt-1">Market</span>
        </NavLink>
        
        <NavLink 
          to="/messages" 
          className={({ isActive }) => 
            `flex flex-col items-center px-3 py-1 rounded-lg ${
              isActive ? 'text-primary-800' : 'text-neutral-500'
            }`
          }
        >
          <MessageCircle size={20} />
          <span className="text-xs mt-1">Messages</span>
        </NavLink>
        
        <NavLink 
          to="/profile/me" 
          className={({ isActive }) => 
            `flex flex-col items-center px-3 py-1 rounded-lg ${
              isActive ? 'text-primary-800' : 'text-neutral-500'
            }`
          }
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;