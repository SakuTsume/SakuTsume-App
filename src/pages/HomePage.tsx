import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, 
  Bookmark, Star, Crown, Award, ChevronDown, ChevronUp, 
  Search, Bell, Settings, User, Plus, Zap, TrendingUp,
  Camera, Video, Mic, PenTool, Users, Globe, Clock,
  ArrowRight, Filter, Eye, ThumbsUp
} from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';

// Mock data for the homepage feed
const mockFeedContent = [
  {
    id: '1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/maya-horror-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Just finished recording for a new horror game! The villain voice was so much fun to create. What do you think? 🎭 #VoiceActing #Horror #GameDev',
    likes: 2847,
    comments: 156,
    isLiked: true,
    isSaved: false,
    isRisingTalent: true,
    trustScore: 4.8,
    workMode: true,
    timestamp: '2 hours ago',
    isFollowing: true,
  },
  {
    id: '2',
    username: 'alexcinema',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Golden hour magic on set today. Sometimes the best shots happen when you least expect them. 📸✨ #Cinematography #GoldenHour #FilmMaking',
    likes: 1923,
    comments: 89,
    isLiked: false,
    isSaved: true,
    trustScore: 4.9,
    workMode: true,
    timestamp: '4 hours ago',
    isFollowing: false,
  },
  {
    id: '3',
    username: 'soundscape_sam',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    media: {
      type: 'audio' as const,
      url: 'https://example.com/ambient-forest.mp3',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New ambient soundscape for an indie film. Recorded in the Pacific Northwest forests. Nature is the best sound library! 🌲🎵 #SoundDesign #Ambient #IndieFilm',
    likes: 1456,
    comments: 67,
    isLiked: true,
    isSaved: false,
    trustScore: 4.7,
    workMode: true,
    timestamp: '6 hours ago',
    isFollowing: true,
  },
  {
    id: '4',
    username: 'storycraft_emma',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Screenwriter',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Late night writing session. Sometimes the best ideas come when the world is quiet. Working on a sci-fi thriller that I can\'t wait to share! 📝🌙 #Screenwriting #SciFi #LateNightWriting',
    likes: 892,
    comments: 34,
    isLiked: false,
    isSaved: true,
    timestamp: '8 hours ago',
    isFollowing: false,
  },
];

// Mock trending topics
const trendingTopics = [
  { tag: '#VoiceActing', posts: '2.3K' },
  { tag: '#IndieFilm', posts: '1.8K' },
  { tag: '#GameDev', posts: '1.5K' },
  { tag: '#Cinematography', posts: '1.2K' },
  { tag: '#SoundDesign', posts: '987' },
];

// Mock featured opportunities
const featuredOpportunities = [
  {
    id: '1',
    title: 'Voice Actor Needed for RPG',
    company: 'Mystic Games Studio',
    type: 'Casting Call',
    budget: '$500-1000',
    deadline: '3 days left',
    tags: ['Voice Acting', 'RPG', 'Fantasy'],
  },
  {
    id: '2',
    title: 'Cinematographer for Short Film',
    company: 'Independent Productions',
    type: 'Freelance',
    budget: '$2000-3000',
    deadline: '1 week left',
    tags: ['Cinematography', 'Short Film', 'Drama'],
  },
];

const HomePage: React.FC = () => {
  const [workMode, setWorkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showTrending, setShowTrending] = useState(true);

  // Auto-advance video content
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % mockFeedContent.length);
    }, 10000); // 10 seconds per video

    return () => clearInterval(timer);
  }, []);

  const toggleWorkMode = () => {
    setWorkMode(!workMode);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[99999]">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-8 w-8" />
              <span className="text-xl font-display font-bold text-white">SakuTsume</span>
            </div>
            
            {/* Navigation removed LIVE button */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-2 font-medium text-lg transition-colors text-white/70 hover:text-white">
                <Users size={20} />
                <span>Following</span>
              </button>
              
              <button className="flex items-center space-x-2 font-medium text-lg transition-colors text-white/70 hover:text-white">
                <TrendingUp size={20} />
                <span>Trending</span>
              </button>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Work Mode Toggle */}
            <button
              onClick={toggleWorkMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                workMode 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Zap size={16} />
              <span className="hidden sm:inline">Work Mode</span>
            </button>

            {/* Search */}
            <button
              onClick={toggleSearch}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-black/95 backdrop-blur-md p-4"
            >
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for talent, content, or opportunities..."
                    className="w-full py-3 pl-12 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    autoFocus
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Voice Acting', 'Cinematography', 'Sound Design', 'Game Dev', 'Animation'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-sm hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex h-screen pt-16">
        {/* Left Sidebar - Trending & Opportunities */}
        <div className="hidden lg:block w-80 p-4 overflow-y-auto">
          {/* Trending Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Trending Now</h3>
              <button
                onClick={() => setShowTrending(!showTrending)}
                className="text-white/60 hover:text-white"
              >
                {showTrending ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {showTrending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.tag} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{topic.tag}</p>
                        <p className="text-white/60 text-sm">{topic.posts} posts</p>
                      </div>
                      <span className="text-xs text-white/40">#{index + 1}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Featured Opportunities */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Featured Opportunities</h3>
            <div className="space-y-4">
              {featuredOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium">{opportunity.title}</h4>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      {opportunity.type}
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-2">{opportunity.company}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400">{opportunity.budget}</span>
                    <span className="text-orange-400">{opportunity.deadline}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {opportunity.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full mt-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Main Feed */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="h-full overflow-y-auto snap-y snap-mandatory">
            {mockFeedContent.map((content, index) => (
              <div key={content.id} className="h-full snap-start">
                <ContentCard
                  {...content}
                  workMode={workMode}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Quick Actions & Stats */}
        <div className="hidden xl:block w-80 p-4">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Camera size={24} className="text-white mb-2" />
                <span className="text-white text-sm">Photo</span>
              </button>
              
              <button className="flex flex-col items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Video size={24} className="text-white mb-2" />
                <span className="text-white text-sm">Video</span>
              </button>
              
              <button className="flex flex-col items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Mic size={24} className="text-white mb-2" />
                <span className="text-white text-sm">Audio</span>
              </button>
              
              <button className="flex flex-col items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <PenTool size={24} className="text-white mb-2" />
                <span className="text-white text-sm">Article</span>
              </button>
            </div>
          </div>

          {/* Your Stats */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye size={16} className="text-white/60 mr-2" />
                  <span className="text-white/80">Profile Views</span>
                </div>
                <span className="text-white font-semibold">1,247</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart size={16} className="text-white/60 mr-2" />
                  <span className="text-white/80">Total Likes</span>
                </div>
                <span className="text-white font-semibold">8,932</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users size={16} className="text-white/60 mr-2" />
                  <span className="text-white/80">Followers</span>
                </div>
                <span className="text-white font-semibold">2,847</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star size={16} className="text-white/60 mr-2" />
                  <span className="text-white/80">Trust Score</span>
                </div>
                <span className="text-white font-semibold">4.8</span>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;