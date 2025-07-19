import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Users, MessageCircle, ChevronRight, ChevronLeft, 
  Check, Star, UserPlus, Crown, Award
} from 'lucide-react';

interface CasualOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const CasualOnboarding: React.FC<CasualOnboardingProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    followedUsers: [] as string[],
  });

  const steps = [
    { title: 'Follow Creators', description: 'Follow 5 creators to personalize your feed' },
    { title: 'Learn to Connect', description: 'Quick tutorial on messaging and community features' },
  ];

  const suggestedCreators = [
    {
      id: '1',
      name: 'Maya Chen',
      profession: 'Voice Actor',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '12.5K',
      specialty: 'Anime & Gaming',
      verified: true,
    },
    {
      id: '2',
      name: 'Alex Rivera',
      profession: 'Film Director',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '8.2K',
      specialty: 'Indie Films',
      verified: false,
    },
    {
      id: '3',
      name: 'Sarah Kim',
      profession: 'Sound Designer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '15.1K',
      specialty: 'Horror & Thriller',
      verified: true,
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      profession: 'Animator',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '9.8K',
      specialty: '2D Animation',
      verified: false,
    },
    {
      id: '5',
      name: 'Emma Wilson',
      profession: 'Screenwriter',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '6.4K',
      specialty: 'Comedy Scripts',
      verified: true,
    },
    {
      id: '6',
      name: 'David Park',
      profession: 'Music Composer',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '11.3K',
      specialty: 'Film Scores',
      verified: false,
    },
    {
      id: '7',
      name: 'Lisa Thompson',
      profession: 'Cinematographer',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '7.9K',
      specialty: 'Documentary',
      verified: true,
    },
    {
      id: '8',
      name: 'Ryan Martinez',
      profession: 'Game Developer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      followers: '13.7K',
      specialty: 'Indie Games',
      verified: false,
    },
  ];

  const toggleFollow = (userId: string) => {
    const newFollowed = formData.followedUsers.includes(userId)
      ? formData.followedUsers.filter(id => id !== userId)
      : [...formData.followedUsers, userId];
    setFormData({ ...formData, followedUsers: newFollowed });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.followedUsers.length >= 5;
      case 1: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus size={32} className="text-accent-500" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Follow Your Favorite Creators</h2>
              <p className="text-neutral-600">
                Follow at least 5 creators to personalize your feed and discover amazing content.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="relative mr-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-neutral-800">{creator.name}</h3>
                        {creator.verified && (
                          <Star size={14} className="ml-1 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">{creator.profession}</p>
                      <p className="text-xs text-neutral-500">{creator.specialty} • {creator.followers} followers</p>
                    </div>
                    
                    <button
                      onClick={() => toggleFollow(creator.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.followedUsers.includes(creator.id)
                          ? 'bg-accent-100 text-accent-800 border border-accent-200'
                          : 'bg-accent-500 text-white hover:bg-accent-600'
                      }`}
                    >
                      {formData.followedUsers.includes(creator.id) ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-neutral-600">
                Following: {formData.followedUsers.length}/5 creators
                {formData.followedUsers.length < 5 && (
                  <span className="text-accent-600 ml-2">
                    (Follow {5 - formData.followedUsers.length} more to continue)
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={32} className="text-blue-800" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Connect & Explore</h2>
            <p className="text-neutral-600 mb-8">
              As a casual user, you have access to all the social features. Here's what you can do:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} className="text-blue-800" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">Direct Messages</h3>
                <p className="text-sm text-blue-800">
                  Message any user directly. Build connections and collaborate with creators.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-purple-800" />
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">Join Communities</h3>
                <p className="text-sm text-purple-800">
                  Join open communities and participate in discussions with like-minded fans.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart size={24} className="text-green-800" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Support Creators</h3>
                <p className="text-sm text-green-800">
                  Like, comment, and share content from your favorite creators.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6">
                <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown size={24} className="text-amber-800" />
                </div>
                <h3 className="font-semibold text-amber-900 mb-2">Upgrade Anytime</h3>
                <p className="text-sm text-amber-800">
                  Ready to showcase your talent? Upgrade to Talent or Business for free!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent-500 to-pink-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <Award size={24} className="mr-2" />
                <span className="font-semibold">Early Adopter Bonus</span>
              </div>
              <p className="text-sm opacity-90">
                Upgrade to Talent or Business within 7 days and get an exclusive "Early Adopter" badge!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold text-neutral-800">Casual User Setup</h1>
          </div>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep
                      ? 'bg-accent-500 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="text-sm text-neutral-600 mt-2">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 0 ? onBack : () => setCurrentStep(currentStep - 1)}
            className="flex items-center px-6 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            {currentStep === 0 ? 'Back to Role Selection' : 'Previous'}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-accent-500 text-white hover:bg-accent-600'
                : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Start Exploring' : 'Next'}
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CasualOnboarding;