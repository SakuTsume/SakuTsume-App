import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Briefcase, Heart, Star, Building, Users } from 'lucide-react';
import { UserRole } from '../../types/user';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'talent' as UserRole,
      title: 'TALENT',
      icon: <Mic size={32} />,
      description: 'Showcase your skills, audition for gigs, and sell your services',
      features: [
        'Post professional demo reels',
        'Audition for paid gigs',
        'Sell services in marketplace',
        'Join all communities',
        'Get Rising Talent boosts'
      ],
      color: 'from-primary-600 to-purple-600',
      textColor: 'text-white',
    },
    {
      id: 'business' as UserRole,
      title: 'BUSINESS',
      icon: <Briefcase size={32} />,
      description: 'Hire talent, post gigs, and build your creative team',
      features: [
        'Post job opportunities',
        'Hire verified talent',
        'Create private communities',
        'Get verified business badge',
        'Access to business tools'
      ],
      color: 'from-secondary-600 to-blue-600',
      textColor: 'text-white',
    },
    {
      id: 'casual' as UserRole,
      title: 'CASUAL',
      icon: <Heart size={32} />,
      description: 'Explore, connect, and enjoy entertainment content',
      features: [
        'Follow your favorite creators',
        'Message any user',
        'View public content',
        'Join open communities',
        'Upgrade anytime for free'
      ],
      color: 'from-accent-400 to-pink-500',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">
            Welcome to SakuTsume
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Join the entertainment industry's most vibrant community. Choose how you want to participate:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative"
            >
              <div
                className={`bg-gradient-to-br ${role.color} rounded-2xl p-8 h-full cursor-pointer transform transition-all duration-300 hover:shadow-2xl`}
                onClick={() => onRoleSelect(role.id)}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className={role.textColor}>
                      {role.icon}
                    </div>
                  </div>
                  <h2 className={`text-2xl font-bold ${role.textColor} mb-2`}>
                    {role.title}
                  </h2>
                  <p className={`${role.textColor} opacity-90`}>
                    {role.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {role.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-white/80 rounded-full mr-3 flex-shrink-0" />
                      <span className={`text-sm ${role.textColor} opacity-90`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-white/30 transition-colors">
                    Choose {role.title}
                  </button>
                </div>

                {/* Special badges */}
                {role.id === 'talent' && (
                  <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Star size={12} className="mr-1" />
                    POPULAR
                  </div>
                )}
                
                {role.id === 'business' && (
                  <div className="absolute -top-3 -right-3 bg-blue-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Building size={12} className="mr-1" />
                    VERIFIED
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">
            Not sure which role fits you? You can always upgrade or add roles later.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
            <Users size={16} />
            <span>Join 50,000+ entertainment professionals</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;