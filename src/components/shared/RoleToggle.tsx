import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mic, Heart, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/user';

const RoleToggle: React.FC = () => {
  const { user, switchRole } = useAuth();
  
  if (!user || user.roles.length <= 1) {
    return null;
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'talent': return <Mic size={16} />;
      case 'business': return <Briefcase size={16} />;
      case 'casual': return <Heart size={16} />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'talent': return 'Talent Mode';
      case 'business': return 'Business Mode';
      case 'casual': return 'Casual Mode';
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'talent': return 'from-primary-600 to-purple-600';
      case 'business': return 'from-secondary-600 to-blue-600';
      case 'casual': return 'from-accent-400 to-pink-500';
    }
  };

  return (
    <div className="relative group">
      <button className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all bg-gradient-to-r ${getRoleColor(user.activeRole)} text-white`}>
        {getRoleIcon(user.activeRole)}
        <span className="hidden sm:inline">{getRoleLabel(user.activeRole)}</span>
        <ChevronDown size={16} />
      </button>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 min-w-[160px] opacity-0 group-hover:opacity-100 transition-opacity z-50"
      >
        {user.roles.map((role) => (
          <button
            key={role}
            onClick={() => switchRole(role)}
            className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-neutral-50 transition-colors ${
              role === user.activeRole ? 'bg-neutral-100' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRoleColor(role)} flex items-center justify-center text-white`}>
              {getRoleIcon(role)}
            </div>
            <span className="font-medium text-neutral-800">{getRoleLabel(role)}</span>
          </button>
        ))}
        
        <div className="border-t border-neutral-200 mt-2 pt-2">
          <button className="w-full px-4 py-2 text-left text-sm text-primary-600 hover:bg-primary-50 transition-colors">
            Add Role
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleToggle;