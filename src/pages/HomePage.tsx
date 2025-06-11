import React, { useState, useEffect } from 'react';
import ContentCard from '../components/shared/ContentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, TrendingUp, Award, Users, Play, Eye, Clock, 
  Briefcase, Sparkles, Star, Zap, DollarSign, MapPin,
  Calendar, ChevronRight, Volume2, Mic, Video, Heart,
  MessageCircle, Share2, Bookmark, Crown, AlertCircle,
  UserPlus, Bell, Coffee, Headphones, Camera, Film
} from 'lucide-react';

// Types
type HomeTab = 'foryou' | 'following' | 'live';
type UserMode = 'work' | 'fan';

interface LiveStream {
  id: string;
  streamer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  title: string;
  category: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  duration?: string;
}

interface AuditionAlert {
  id: string;
  title: string;
  budget: string;
  location: string;
  deadline: string;
  company: string;
  type: string;
  urgent?: boolean;
}

// Mock data for different content types
const mockForYouContent = [
  {
    id: '1',
    username: 'maya_rising_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/horror-scream.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Spine-chilling villain voice for indie horror game 🎭 What do you think of this character? #VoiceActing #Horror #IndieGame',
    likes: 342,
    comments: 28,
    isLiked: false,
    isSaved: false,
    isRisingTalent: true,
    trustScore: 4.2,
    workMode: true,
  },
  {
    id: '2',
    username: 'alex_cinematics',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Golden hour magic on our latest short film. Sometimes the best shots happen when you least expect them ✨ #Cinematography #GoldenHour',
    likes: 156,
    comments: 42,
    isLiked: true,
    isSaved: false,
    isRisingTalent: false,
    trustScore: 4.8,
    workMode: true,
  },
];

const mockFollowingContent = [
  {
    id: '3',
    username: 'sarah_actress_pro',
    userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Actress',
    media: {
      type: 'video' as const,
      url: 'https://example.com/demo-reel.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New scene from my showreel! Working with @director_jane was an incredible experience. Can\'t wait to share the full project 🎬',
    likes: 498,
    comments: 56,
    isLiked: false,
    isSaved: true,
    timestamp: '2 hours ago',
    isFollowing: true,
  },
  {
    id: '4',
    username: 'studiox_casting',
    userAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Casting Director',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: '🚨 CASTING CALL: Cyberpunk Detective for upcoming web series. Looking for strong dramatic range and tech-savvy character work. Apply by Friday! #CastingCall #Cyberpunk',
    likes: 89,
    comments: 23,
    isLiked: false,
    isSaved: false,
    timestamp: '4 hours ago',
    isFollowing: true,
    isCastingCall: true,
    budget: '$3,000',
  },
];

const mockLiveStreams: LiveStream[] = [
  {
    id: '1',
    streamer: {
      name: 'Maya VA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
    },
    title: 'Open Auditions - Horror Characters',
    category: 'Auditions',
    viewers: 1247,
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
  },
  {
    id: '2',
    streamer: {
      name: 'StudioX',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
    },
    title: 'Voice Acting Workshop - Emotion Delivery',
    category: 'Workshop',
    viewers: 842,
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
  },
  {
    id: '3',
    streamer: {
      name: 'Tom Sound',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
    },
    title: 'Game Dubbing Session - Behind the Scenes',
    category: 'Behind the Scenes',
    viewers: 593,
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
  },
  {
    id: '4',
    streamer: {
      name: 'Anime Club',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
    },
    title: 'Fan Q&A - Voice Acting Journey',
    category: 'Q&A',
    viewers: 2431,
    thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
  },
];

const mockAuditionAlerts: AuditionAlert[] = [
  {
    id: '1',
    title: 'Sci-Fi Hero Voice - AAA Game',
    budget: '$2,000 - $5,000',
    location: 'Remote',
    deadline: '3 days left',
    company: 'Nebula Games',
    type: 'Voice Acting',
    urgent: true,
  },
  {
    id: '2',
    title: 'Documentary Narrator',
    budget: '$1,500',
    location: 'Los Angeles, CA',
    deadline: '1 week left',
    company: 'Discovery Channel',
    type: 'Narration',
  },
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('foryou');
  const [userMode, setUserMode] = useState<UserMode>('work');
  const [feedContent, setFeedContent] = useState(mockForYouContent);
  const [showAuditionAlert, setShowAuditionAlert] = useState(false);
  const [currentAuditionIndex, setCurrentAuditionIndex] = useState(0);

  // Simulate audition alerts every 8th post in work mode
  useEffect(() => {
    if (activeTab === 'foryou' && userMode === 'work') {
      const timer = setInterval(() => {
        setShowAuditionAlert(true);
        setTimeout(() => setShowAuditionAlert(false), 5000);
      }, 15000); // Show every 15 seconds for demo
      
      return () => clearInterval(timer);
    }
  }, [activeTab, userMode]);

  // Update content based on tab and mode
  useEffect(() => {
    if (activeTab === 'foryou') {
      setFeedContent(mockForYouContent);
    } else if (activeTab === 'following') {
      setFeedContent(mockFollowingContent);
    }
  }, [activeTab, userMode]);

  const toggleMode = () => {
    setUserMode(userMode === 'work' ? 'fan' : 'work');
  };

  const renderModeToggle = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-white rounded-full p-1 shadow-sm border border-neutral-200">
        <div className="flex items-center">
          <button
            onClick={toggleMode}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              userMode === 'work'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            <Briefcase size={16} className="mr-2" />
            Work Mode
          </button>
          <button
            onClick={toggleMode}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              userMode === 'fan'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            <Sparkles size={16} className="mr-2" />
            Fan Mode
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="bg-white sticky top-16 z-10 border-b border-neutral-200 mb-6">
      <div className="flex items-center justify-center">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'foryou', label: 'For You', icon: TrendingUp },
            { id: 'following', label: 'Following', icon: Users },
            { id: 'live', label: 'Live', icon: Play },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as HomeTab)}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? userMode === 'work'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <tab.icon size={16} className="mr-2" />
              {tab.label}
              {tab.id === 'live' && (
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAuditionAlert = () => (
    <AnimatePresence>
      {showAuditionAlert && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900">🎯 AUDITION ALERT</h3>
                  <p className="text-sm text-amber-700">Perfect match for your skills</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowAuditionAlert(false)}
                className="text-amber-600 hover:text-amber-800"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-neutral-800 mb-2">
                  {mockAuditionAlerts[currentAuditionIndex].title}
                </h4>
                <div className="space-y-1 text-sm text-neutral-600">
                  <div className="flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    {mockAuditionAlerts[currentAuditionIndex].budget}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {mockAuditionAlerts[currentAuditionIndex].location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {mockAuditionAlerts[currentAuditionIndex].deadline}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-2">
                  APPLY NOW
                </button>
                <button className="w-full border border-amber-300 text-amber-700 hover:bg-amber-50 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderForYouFeed = () => (
    <div className="space-y-6">
      {userMode === 'work' && renderAuditionAlert()}
      
      {feedContent.map((content, index) => (
        <div key={content.id} className="relative">
          {/* Rising Talent Badge */}
          {content.isRisingTalent && userMode === 'work' && (
            <div className="absolute -top-3 left-4 z-10">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                <Star size={12} className="mr-1" />
                RISING TALENT
              </div>
            </div>
          )}
          
          {/* Mode-specific border styling */}
          <div className={`rounded-xl overflow-hidden ${
            userMode === 'work' 
              ? 'border-2 border-blue-200 shadow-blue-100' 
              : 'border-2 border-purple-200 shadow-purple-100'
          } shadow-lg`}>
            <ContentCard {...content} />
          </div>
          
          {/* Trust Score for Work Mode */}
          {userMode === 'work' && (
            <div className="mt-2 flex items-center justify-between px-4">
              <div className="flex items-center text-sm text-neutral-600">
                <Award size={14} className="mr-1" />
                Trust Score: <span className="font-medium ml-1">{content.trustScore}/5.0</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Portfolio
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderFollowingFeed = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Heart size={16} className="text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-800">
            Loyalty Feed - Chronological order, no algorithms
          </span>
        </div>
      </div>
      
      {mockFollowingContent.map((content) => (
        <div key={content.id} className="relative">
          {/* Timestamp for Following Feed */}
          <div className="flex items-center justify-between mb-2 px-4">
            <span className="text-sm text-neutral-500">{content.timestamp}</span>
            {content.isCastingCall && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Casting Call
              </div>
            )}
          </div>
          
          <ContentCard {...content} />
          
          {/* Casting Call Details */}
          {content.isCastingCall && (
            <div className="mt-3 mx-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-green-700">
                  <DollarSign size={14} className="mr-1" />
                  Budget: {content.budget}
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderLiveFeed = () => (
    <div>
      {/* Live Stream Categories */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Auditions', 'Workshops', 'Behind the Scenes', 'Q&A'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              category === 'All'
                ? userMode === 'work'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Live Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockLiveStreams.map((stream) => (
          <motion.div
            key={stream.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer"
          >
            <div className="relative">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-40 object-cover"
              />
              
              {/* Live Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                LIVE
              </div>
              
              {/* Viewer Count */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <Eye size={12} className="mr-1" />
                {stream.viewers.toLocaleString()}
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <Play size={20} className="text-neutral-800 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img
                  src={stream.streamer.avatar}
                  alt={stream.streamer.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-800 text-sm">
                      {stream.streamer.name}
                    </span>
                    {stream.streamer.verified && (
                      <Crown size={12} className="ml-1 text-amber-500" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-500">{stream.category}</span>
                </div>
              </div>
              
              <h3 className="font-medium text-neutral-800 line-clamp-2 mb-2">
                {stream.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>{stream.viewers.toLocaleString()} watching</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Join Stream
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Live Stream Stats */}
      <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Live Right Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {mockLiveStreams.length}
            </div>
            <div className="text-sm text-neutral-600">Active Streams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {mockLiveStreams.reduce((sum, stream) => sum + stream.viewers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Viewers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">12</div>
            <div className="text-sm text-neutral-600">Auditions Live</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-sm text-neutral-600">Workshops</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mode Toggle */}
      {renderModeToggle()}
      
      {/* Tab Navigation */}
      {renderTabNavigation()}
      
      {/* Content Area */}
      <div className="max-w-screen-md mx-auto px-4 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'foryou' && renderForYouFeed()}
            {activeTab === 'following' && renderFollowingFeed()}
            {activeTab === 'live' && renderLiveFeed()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Loading indicator for infinite scroll */}
      {(activeTab === 'foryou' || activeTab === 'following') && (
        <div className="text-center py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block w-8 h-8 border-4 border-neutral-300 border-t-primary-600 rounded-full animate-spin"
          ></motion.div>
          <p className="mt-2 text-neutral-500 text-sm">Loading more content...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;