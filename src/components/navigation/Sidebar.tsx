import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, User, Users, ShoppingBag, Settings, HelpCircle } from 'lucide-react';
import RoleToggle from '../shared/RoleToggle';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home', end: true },
    { path: '/search', icon: <Search size={20} />, label: 'Search' },
    { path: '/create', icon: <PlusSquare size={20} />, label: 'Create' },
    { path: '/profile/me', icon: <User size={20} />, label: 'Profile' },
    { path: '/network', icon: <Users size={20} />, label: 'Network' },
    { path: '/marketplace', icon: <ShoppingBag size={20} />, label: 'Market' },
  ];

  // Different styling for HomePage vs other pages
  const linkBaseClass = isHomePage 
    ? 'flex items-center px-4 py-3 rounded-lg transition-colors'
    : 'flex items-center px-4 py-3 rounded-lg transition-colors';
    
  const activeLinkClass = isHomePage
    ? 'bg-white/20 text-white backdrop-blur-sm'
    : 'bg-primary-100 text-primary-800';
    
  const inactiveLinkClass = isHomePage
    ? 'text-white/80 hover:bg-white/10 hover:text-white'
    : 'text-neutral-600 hover:bg-neutral-100';

  return (
    <div className="h-full py-4 px-2 flex flex-col justify-between overflow-y-auto">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <span className="mr-4">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-4 space-y-1">
        {/* Role Toggle */}
        <div className="px-4 py-2">
          <RoleToggle />
        </div>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkBaseClass} ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <span className="mr-4"><Settings size={20} /></span>
          <span className="font-medium">Settings</span>
        </NavLink>
        
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `${linkBaseClass} ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <span className="mr-4"><HelpCircle size={20} /></span>
          <span className="font-medium">Help Center</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;