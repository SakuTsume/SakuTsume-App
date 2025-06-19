import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, MessageCircle, Heart, Bookmark, Share2, 
  Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight,
  Star, Crown, Award, Users, TrendingUp, Zap, Clock,
  Filter, MoreHorizontal, Eye, ThumbsUp, MessageSquare,
  Camera, Video, Mic, PenTool, Briefcase, Globe
} from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';

// Mock data for the feed
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
    caption: 'Just finished recording for a new horror game! The villain voice was so much fun to create. Can\'t wait for you all to hear it in the final game! 🎮👹 #voiceacting #horror #gamedev',
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
    caption: 'Golden hour magic on set today. Sometimes the best shots happen when you least expect them. This indie film is going to be something special! ✨🎬',
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
    },
    caption: 'Creating an immersive forest ambience for an upcoming RPG. Layered 12 different natural sounds to get this perfect atmosphere. Headphones recommended! 🌲🎧',
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
    username: 'indie_director',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director',
    media: {
      type: 'video' as const,
      url: 'https://example.com/behind-scenes.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind the scenes of our latest short film. The cast and crew brought so much passion to this project. Can\'t wait to share the final cut! 🎭🎬',
    likes: 892,
    comments: 34,
    isLiked: false,
    isSaved: false,
    timestamp: '8 hours ago',
    isFollowing: false,
    isCastingCall: true,
    budget: '$5K-10K',
  },
];

// Mock trending topics
const trendingTopics = [
  { tag: '#IndieFilm', posts: '2.3K' },
  { tag: '#VoiceActing', posts: '1.8K' },
  { tag: '#GameDev', posts: '3.1K' },
  { tag: '#Cinematography', posts: '1.2K' },
  { tag: '#SoundDesign', posts: '890' },
];

// Mock featured opportunities
const featuredOpportunities = [
  {
    id: '1',
    title: 'Voice Actor Needed - Fantasy RPG',
    company: 'Mystic Games Studio',
    type: 'Remote',
    budget: '$2,000 - $5,000',
    deadline: '5 days left',
    skills: ['Voice Acting', 'Character Voices', 'RPG'],
    urgent: true,
  },
  {
    id: '2',
    title: 'Cinematographer - Short Film',
    company: 'Independent Productions',
    type: 'Los Angeles, CA',
    budget: '$1,500 - $3,000',
    deadline: '2 weeks left',
    skills: ['Cinematography', 'Short Films', 'Drama'],
    urgent: false,
  },
  {
    id: '3',
    title: 'Sound Designer - Horror Game',
    company: 'Nightmare Studios',
    type: 'Remote',
    budget: '$3,000 - $7,000',
    deadline: '1 week left',
    skills: ['Sound Design', 'Horror', 'Game Audio'],
    urgent: false,
  },
];

// Mock rising talents
const risingTalents = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    profession: 'Animator',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    growth: '+245%',
    specialty: '2D Animation',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    profession: 'Composer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    growth: '+189%',
    specialty: 'Film Scoring',
  },
  {
    id: '3',
    name: 'Sofia Williams',
    profession: 'Actress',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    growth: '+156%',
    specialty: 'Theater',
  },
];

const HomePage: React.FC = () => {
  const [workMode, setWorkMode] = useState(false);
  const [feedFilter, setFeedFilter] = useState('For You');
  const [showSearch, setShowSearch] = useState(false);

  const feedFilters = ['For You', 'Following', 'Trending', 'Work'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-white">SakuTsume</h1>
                <p className="text-xs text-white/60">Entertainment Network</p>
              </div>
            </div>

            {/* Work Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/80">Work Mode</span>
                <button
                  onClick={() => setWorkMode(!workMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    workMode ? 'bg-success-500' : 'bg-white/20'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    workMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full"></span>
              </button>

              {/* Messages */}
              <button className="relative p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <MessageCircle size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search for talent, projects, or opportunities..."
                    className="w-full py-3 pl-12 pr-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Trending & Opportunities */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <TrendingUp size={20} className="text-accent-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Trending</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-primary-300 font-medium">{topic.tag}</span>
                    <span className="text-white/60 text-sm">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Opportunities */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <Briefcase size={20} className="text-success-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Opportunities</h3>
              </div>
              <div className="space-y-4">
                {featuredOpportunities.slice(0, 2).map((opportunity) => (
                  <div key={opportunity.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm">{opportunity.title}</h4>
                      {opportunity.urgent && (
                        <span className="bg-accent-400 text-white text-xs px-2 py-1 rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 text-xs mb-2">{opportunity.company}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-success-400">{opportunity.budget}</span>
                      <span className="text-white/60">{opportunity.deadline}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-center text-primary-300 hover:text-primary-200 text-sm font-medium">
                  View All Opportunities
                </button>
              </div>
            </div>

            {/* Rising Talents */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <Star size={20} className="text-amber-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Rising Talents</h3>
              </div>
              <div className="space-y-3">
                {risingTalents.map((talent) => (
                  <div key={talent.id} className="flex items-center">
                    <img
                      src={talent.avatar}
                      alt={talent.name}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{talent.name}</p>
                      <p className="text-white/60 text-xs">{talent.profession}</p>
                    </div>
                    <span className="text-success-400 text-xs font-medium">{talent.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Feed Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {feedFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFeedFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        feedFilter === filter
                          ? 'bg-primary-500 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                
                <button className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {/* Content Feed */}
            <div className="space-y-6">
              {mockFeedContent.map((content) => (
                <div key={content.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                  <ContentCard
                    {...content}
                    workMode={workMode}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Quick Actions & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Create */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Create</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Camera size={20} className="text-primary-300 mx-auto mb-1" />
                  <span className="text-white text-xs">Photo</span>
                </button>
                <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Video size={20} className="text-secondary-300 mx-auto mb-1" />
                  <span className="text-white text-xs">Video</span>
                </button>
                <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Mic size={20} className="text-accent-300 mx-auto mb-1" />
                  <span className="text-white text-xs">Audio</span>
                </button>
                <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <PenTool size={20} className="text-success-300 mx-auto mb-1" />
                  <span className="text-white text-xs">Article</span>
                </button>
              </div>
            </div>

            {/* Your Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye size={16} className="text-primary-300 mr-2" />
                    <span className="text-white/80 text-sm">Profile Views</span>
                  </div>
                  <span className="text-white font-semibold">1,247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsUp size={16} className="text-success-300 mr-2" />
                    <span className="text-white/80 text-sm">Content Likes</span>
                  </div>
                  <span className="text-white font-semibold">3,892</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare size={16} className="text-accent-300 mr-2" />
                    <span className="text-white/80 text-sm">Connections</span>
                  </div>
                  <span className="text-white font-semibold">156</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe size={16} className="text-secondary-300 mr-2" />
                    <span className="text-white/80 text-sm">Reach</span>
                  </div>
                  <span className="text-white font-semibold">12.4K</span>
                </div>
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-6 border border-amber-400/30">
              <div className="flex items-center mb-3">
                <Zap size={20} className="text-amber-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Weekly Challenge</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Share a behind-the-scenes moment from your creative process
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>3 days left</span>
                </div>
                <button className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-medium">
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;