import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Star, Crown, Shield, Zap, ArrowRight,
  Mic, Briefcase, Heart, Gift, Trophy, Users
} from 'lucide-react';
import { UserRole } from '../../types/user';

interface OnboardingCompleteProps {
  role: UserRole;
  data: any;
  onComplete: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ role, data, onComplete }) => {
  const getRoleConfig = () => {
    switch (role) {
      case 'talent':
        return {
          icon: <Mic size={48} />,
          title: 'Welcome to SakuTsume, Talent!',
          subtitle: 'Your creative journey starts now',
          color: 'from-primary-600 to-purple-600',
          benefits: [
            { icon: <Star size={20} />, text: 'Rising Talent boost activated', highlight: true },
            { icon: <Zap size={20} />, text: 'Demo reel uploaded and verified' },
            { icon: <Trophy size={20} />, text: 'Skills tagged and showcased' },
            { icon: <Crown size={20} />, text: 'Top 3 spotlight configured' },
          ],
          nextSteps: [
            'Explore gig opportunities in Work Mode',
            'Connect with other professionals',
            'Start building your portfolio',
            'Join relevant communities',
          ],
        };
      case 'business':
        return {
          icon: <Briefcase size={48} />,
          title: 'Welcome to SakuTsume, Business!',
          subtitle: 'Start building your creative team',
          color: 'from-secondary-600 to-blue-600',
          benefits: [
            { icon: <Shield size={20} />, text: 'Verified business badge earned', highlight: true },
            { icon: <Gift size={20} />, text: '3 free gig promotions available' },
            { icon: <Users size={20} />, text: 'Access to verified talent pool' },
            { icon: <Zap size={20} />, text: 'Priority customer support' },
          ],
          nextSteps: [
            'Post your first job opportunity',
            'Browse and connect with talent',
            'Create private communities',
            'Set up your hiring pipeline',
          ],
        };
      case 'casual':
        return {
          icon: <Heart size={48} />,
          title: 'Welcome to SakuTsume!',
          subtitle: 'Discover amazing entertainment content',
          color: 'from-accent-400 to-pink-500',
          benefits: [
            { icon: <Gift size={20} />, text: 'Early Adopter badge available', highlight: true },
            { icon: <Users size={20} />, text: 'Following 5+ amazing creators' },
            { icon: <Star size={20} />, text: 'Personalized feed ready' },
            { icon: <Zap size={20} />, text: 'Free upgrade to Talent/Business' },
          ],
          nextSteps: [
            'Explore your personalized feed',
            'Join open communities',
            'Message your favorite creators',
            'Upgrade anytime for more features',
          ],
        };
      default:
        return {
          icon: <CheckCircle size={48} />,
          title: 'Welcome to SakuTsume!',
          subtitle: 'Your journey begins',
          color: 'from-neutral-600 to-neutral-800',
          benefits: [],
          nextSteps: [],
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-32 h-32 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}
          >
            <div className="text-white">
              {config.icon}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              {config.title}
            </h1>
            <p className="text-xl text-neutral-600 mb-12">
              {config.subtitle}
            </p>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">
                🎉 You've Unlocked
              </h3>
              <div className="space-y-4">
                {config.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    className={`flex items-center p-3 rounded-lg ${
                      benefit.highlight 
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200' 
                        : 'bg-neutral-50'
                    }`}
                  >
                    <div className={`mr-3 ${
                      benefit.highlight ? 'text-amber-600' : 'text-neutral-600'
                    }`}>
                      {benefit.icon}
                    </div>
                    <span className={`font-medium ${
                      benefit.highlight ? 'text-amber-800' : 'text-neutral-800'
                    }`}>
                      {benefit.text}
                    </span>
                    {benefit.highlight && (
                      <div className="ml-auto">
                        <Star size={16} className="text-amber-500" fill="#F59E0B" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">
                🚀 Next Steps
              </h3>
              <div className="space-y-4">
                {config.nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                    className="flex items-center p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 text-primary-800 text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-neutral-800">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <button
              onClick={onComplete}
              className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${config.color} text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
            >
              Start Exploring SakuTsume
              <ArrowRight size={24} className="ml-3" />
            </button>
          </motion.div>

          {/* Footer message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-600 mb-4">
              Need help getting started? Check out our{' '}
              <a href="/help" className="text-primary-600 hover:text-primary-700 font-medium">
                Help Center
              </a>{' '}
              or{' '}
              <a href="/support" className="text-primary-600 hover:text-primary-700 font-medium">
                contact support
              </a>
              .
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
              <Users size={16} />
              <span>Join 50,000+ entertainment professionals on SakuTsume</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingComplete;