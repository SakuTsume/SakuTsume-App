import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Play, Pause, Volume2, VolumeX, Heart, MessageCircle, 
  Share2, Bookmark, Star, Crown, Award, Users, Zap, Clock,
  ChevronLeft, ChevronRight, Filter, TrendingUp, Calendar,
  MapPin, Eye, ThumbsUp, MoreHorizontal, Mic, Video, Camera,
  PlusCircle, Bell, Settings, User, Home, ShoppingBag, PenTool,
  Globe, Headphones, Radio, Tv, Monitor, Smartphone, Gamepad2,
  Music, Film, Palette, Code, Briefcase, GraduationCap, Coffee
} from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';
import ProfilePreview from '../components/shared/ProfilePreview';
import ServiceCard from '../components/shared/ServiceCard';

// Mock data for different content types
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
    isLiked: false,
    isSaved: false,
    isRisingTalent: true,
    trustScore: 4.8,
    workMode: true,
    timestamp: '2 hours ago',
    isFollowing: false,
  },
  {
    id: '2',
    username: 'alexcine',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Golden hour magic on set today ✨ Sometimes the best shots happen when you least expect them. #Cinematography #GoldenHour #FilmMaking',
    likes: 1923,
    comments: 89,
    isLiked: true,
    isSaved: false,
    trustScore: 4.9,
    workMode: true,
    timestamp: '4 hours ago',
    isFollowing: true,
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
    caption: 'Created this ambient forest soundscape for an indie film. Layered 12 different natural sounds to get the perfect atmosphere 🌲🎵 #SoundDesign #FilmAudio #Nature',
    likes: 1456,
    comments: 67,
    isLiked: false,
    isSaved: true,
    trustScore: 4.7,
    workMode: true,
    timestamp: '6 hours ago',
    isFollowing: false,
  },
];

const mockLiveStreams = [
  {
    id: '1',
    title: 'Voice Acting Workshop: Character Development',
    streamer: 'Maya Thompson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    viewers: 234,
    category: 'Education',
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    duration: '1:23:45'
  },
  {
    id: '2',
    title: 'Behind the Scenes: Indie Film Production',
    streamer: 'Alex Rodriguez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    viewers: 567,
    category: 'Film',
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    duration: '2:15:30'
  },
  {
    id: '3',
    title: 'Music Composition Live Session',
    streamer: 'Sarah Kim',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    viewers: 189,
    category: 'Music',
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    duration: '0:45:12'
  },
];

const mockTrendingProfiles = [
  {
    id: 'trending1',
    name: 'Emma Watson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director',
    bio: 'Award-winning director specializing in narrative storytelling and character-driven films.',
    skills: ['Direction', 'Screenwriting', 'Cinematography'],
    following: false,
    rating: 4.9,
  },
  {
    id: 'trending2',
    name: 'Marcus Johnson',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Music Producer',
    bio: 'Electronic music producer and sound engineer with 10+ years in the industry.',
    skills: ['Music Production', 'Sound Engineering', 'Mixing'],
    following: true,
    rating: 4.8,
  },
];

const mockFeaturedServices = [
  {
    id: 'service1',
    title: 'Professional Voice Over for Commercials',
    provider: {
      name: 'Voice Pro Studio',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
    },
    category: 'Voice Acting',
    image: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 250,
    deliveryTime: '24 hours',
    featured: true,
  },
  {
    id: 'service2',
    title: 'Custom Film Score Composition',
    provider: {
      name: 'Melody Makers',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
    },
    category: 'Music',
    image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 800,
    deliveryTime: '5-7 days',
    featured: false,
  },
];

// Categories for content filtering
const contentCategories = [
  { id: 'all', label: 'For You', icon: Home },
  { id: 'voice', label: 'Voice Acting', icon: Mic },
  { id: 'film', label: 'Film & Video', icon: Video },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'art', label: 'Visual Arts', icon: Palette },
  { id: 'writing', label: 'Writing', icon: PenTool },
  { id: 'tech', label: 'Tech & Gaming', icon: Code },
];

type HomeTab = 'feed' | 'live' | 'discover' | 'trending';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('feed');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [workMode, setWorkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveSearchQuery, setLiveSearchQuery] = useState('');
  
  // Auto-scroll for trending content
  const [currentTrending, setCurrentTrending] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTrending((prev) => (prev + 1) % mockTrendingProfiles.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLiveSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching live streams for:', liveSearchQuery);
  };
  
  const filteredContent = selectedCategory === 'all' 
    ? mockFeedContent 
    : mockFeedContent.filter(content => {
        // Simple category filtering logic
        if (selectedCategory === 'voice') return content.profession.includes('Voice');
        if (selectedCategory === 'film') return content.profession.includes('Cinematographer') || content.profession.includes('Director');
        if (selectedCategory === 'music') return content.profession.includes('Sound') || content.profession.includes('Music');
        return true;
      });

  const renderFeedTab = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-neutral-800">Explore Categories</h3>
          <div className="flex items-center">
            <span className="text-sm text-neutral-600 mr-3">Work Mode</span>
            <button
              onClick={() => setWorkMode(!workMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                workMode ? 'bg-primary-800' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  workMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
          {contentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-800 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <category.icon size={16} className="mr-2" />
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Feed */}
      <div className="space-y-6">
        {filteredContent.map((content) => (
          <ContentCard
            key={content.id}
            {...content}
            workMode={workMode}
          />
        ))}
      </div>
    </div>
  );

  const renderLiveTab = () => (
    <div className="w-full bg-neutral-900 text-white min-h-screen">
      {/* Live Header with Search */}
      <div className="bg-neutral-800 border-b border-neutral-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-2xl mx-auto">
              <form onSubmit={handleLiveSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search live streams, creators, or topics..."
                    value={liveSearchQuery}
                    onChange={(e) => setLiveSearchQuery(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 rounded-full bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
                    <Search size={24} />
                  </div>
                </div>
              </form>
            </div>
            
            <button className="ml-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium flex items-center transition-colors">
              <Radio size={20} className="mr-2" />
              Go Live
            </button>
          </div>
          
          {/* Quick Categories */}
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
            {['All', 'Voice Acting', 'Film Making', 'Music Production', 'Art & Design', 'Gaming', 'Education'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-neutral-700 hover:bg-neutral-600 text-neutral-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Live Streams Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLiveStreams.map((stream) => (
            <motion.div
              key={stream.id}
              whileHover={{ scale: 1.02 }}
              className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Live indicator */}
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  LIVE
                </div>
                
                {/* Duration */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                  {stream.duration}
                </div>
                
                {/* Viewer count */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
                  <Eye size={12} className="mr-1" />
                  {stream.viewers}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={stream.avatar}
                    alt={stream.streamer}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-white">{stream.streamer}</h3>
                    <span className="text-xs text-neutral-400">{stream.category}</span>
                  </div>
                </div>
                
                <h4 className="text-white font-medium mb-2 line-clamp-2">{stream.title}</h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{stream.viewers} viewers</span>
                  <button className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-xs font-medium transition-colors">
                    Watch
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiscoverTab = () => (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold mb-4">Discover New Talent</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for creators, skills, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
            <Search size={20} />
          </div>
        </form>
      </div>
      
      {/* Featured Profiles */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Featured Creators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTrendingProfiles.map((profile) => (
            <ProfilePreview
              key={profile.id}
              {...profile}
            />
          ))}
        </div>
      </div>
      
      {/* Featured Services */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Featured Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockFeaturedServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrendingTab = () => (
    <div className="space-y-8">
      {/* Trending Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl p-6 text-white">
        <div className="flex items-center mb-4">
          <TrendingUp size={24} className="mr-3" />
          <h2 className="text-2xl font-bold">What's Trending</h2>
        </div>
        <p className="text-primary-100">
          Discover the hottest content and creators in the entertainment industry right now.
        </p>
      </div>
      
      {/* Trending Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Trending Creators</h3>
          <div className="space-y-4">
            {mockTrendingProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProfilePreview {...profile} />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Hot Services</h3>
          <div className="space-y-4">
            {mockFeaturedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Tabs */}
      <div className="md:ml-64">
        <div className="pt-12">
          {activeTab === 'live' ? (
            renderLiveTab()
          ) : (
            <div className="max-w-screen-lg mx-auto px-4 py-6">
              {/* Tab Navigation */}
              <div className="bg-white rounded-xl mb-6 shadow-sm border border-neutral-200">
                <div className="flex">
                  {[
                    { id: 'feed', label: 'Feed', icon: Home },
                    { id: 'live', label: 'Live', icon: Radio },
                    { id: 'discover', label: 'Discover', icon: Search },
                    { id: 'trending', label: 'Trending', icon: TrendingUp },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as HomeTab)}
                      className={`flex-1 flex items-center justify-center px-4 py-3 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary-800 border-b-2 border-primary-800 bg-primary-50'
                          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
                      }`}
                    >
                      <tab.icon size={16} className="mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'feed' && renderFeedTab()}
                  {activeTab === 'discover' && renderDiscoverTab()}
                  {activeTab === 'trending' && renderTrendingTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;