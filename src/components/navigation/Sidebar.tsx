import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingBag, MessageCircle, Bell, Users, Bookmark, TrendingUp as Trending, Settings, HelpCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home', end: true },
    { path: '/search', icon: <Search size={20} />, label: 'Discover' },
    { path: '/marketplace', icon: <ShoppingBag size={20} />, label: 'Marketplace' },
    { path: '/messages', icon: <MessageCircle size={20} />, label: 'Messages', badge: 5 },
    { path: '/notifications', icon: <Bell size={20} />, label: 'Notifications', badge: 3 },
    { path: '/network', icon: <Users size={20} />, label: 'My Network' },
    { path: '/saved', icon: <Bookmark size={20} />, label: 'Saved Items' },
    { path: '/trending', icon: <Trending size={20} />, label: 'Trending' },
  ];

  return (
    <div className="h-full py-4 px-2 flex flex-col justify-between overflow-y-auto">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`
            }
          >
            <span className="mr-4">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-accent-400 text-white text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-4 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-800'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`
          }
        >
          <span className="mr-4"><Settings size={20} /></span>
          <span className="font-medium">Settings</span>
        </NavLink>
        
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-800'
                : 'text-neutral-600 hover:bg-neutral-100'
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