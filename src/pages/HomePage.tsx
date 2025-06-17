import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Users, Eye, Heart, MessageCircle, Share2, 
  Bookmark, Play, Volume2, VolumeX, MoreHorizontal, Star,
  Crown, Award, Zap, Clock, TrendingUp, Calendar, MapPin,
  ChevronRight, ChevronLeft, Grid3X3, List, Gamepad2,
  Music, Palette, Camera, Mic, Film, Radio, Coffee, Sparkles
} from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';
import Navbar from '../components/navigation/Navbar';

// Mock data for live streams
const mockCategories = [
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, viewers: '2.1M', color: 'from-purple-500 to-blue-500' },
  { id: 'music', name: 'Music', icon: Music, viewers: '890K', color: 'from-pink-500 to-red-500' },
  { id: 'art', name: 'Art', icon: Palette, viewers: '456K', color: 'from-green-500 to-teal-500' },
  { id: 'voice', name: 'Voice Acting', icon: Mic, viewers: '234K', color: 'from-orange-500 to-yellow-500' },
  { id: 'film', name: 'Film Making', icon: Film, viewers: '189K', color: 'from-indigo-500 to-purple-500' },
  { id: 'podcast', name: 'Podcasts', icon: Radio, viewers: '167K', color: 'from-blue-500 to-cyan-500' },
  { id: 'talk', name: 'Just Chatting', icon: Coffee, viewers: '1.8M', color: 'from-gray-500 to-slate-500' },
];

const mockLiveStreams = [
  {
    id: '1',
    title: 'Voice Acting Workshop - Character Development Techniques',
    streamer: {
      name: 'VoiceMaster_Pro',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      partner: true,
    },
    category: 'Voice Acting',
    viewers: 2847,
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Educational', 'Workshop', 'Interactive'],
    duration: '2h 34m',
    featured: true,
  },
  {
    id: '2',
    title: 'Indie Horror Game Development - Live Coding Session',
    streamer: {
      name: 'GameDevStudio',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      partner: false,
    },
    category: 'Gaming',
    viewers: 1923,
    thumbnail: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Game Dev', 'Horror', 'Coding'],
    duration: '4h 12m',
    featured: false,
  },
  {
    id: '3',
    title: 'Digital Art Commission Stream - Fantasy Character Design',
    streamer: {
      name: 'ArtisticSoul',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      partner: true,
    },
    category: 'Art',
    viewers: 1456,
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Digital Art', 'Commission', 'Fantasy'],
    duration: '1h 45m',
    featured: false,
  },
  {
    id: '4',
    title: 'Film Score Composition - Creating Emotional Soundscapes',
    streamer: {
      name: 'ComposerLife',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      partner: true,
    },
    category: 'Music',
    viewers: 892,
    thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Film Score', 'Composition', 'Live Music'],
    duration: '3h 21m',
    featured: false,
  },
  {
    id: '5',
    title: 'Cinematography Masterclass - Lighting Techniques for Indie Films',
    streamer: {
      name: 'CinematicVision',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      partner: false,
    },
    category: 'Film Making',
    viewers: 734,
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Cinematography', 'Lighting', 'Tutorial'],
    duration: '2h 8m',
    featured: false,
  },
  {
    id: '6',
    title: 'Entertainment Industry Podcast - Guest: Award-Winning Director',
    streamer: {
      name: 'IndustryTalk',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      partner: true,
    },
    category: 'Podcasts',
    viewers: 567,
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Interview', 'Industry', 'Director'],
    duration: '1h 32m',
    featured: false,
  },
];

// Mock content for TikTok-style feeds
const mockForYouContent = [
  {
    id: '1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'audio' as const,
      url: 'https://example.com/maya-demo.mp3',
      thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New character voice demo for an upcoming RPG! What do you think of this mysterious villain voice? 🎭 #VoiceActing #RPG #CharacterVoice',
    likes: 1247,
    comments: 89,
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
    username: 'alexcine',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'video' as const,
      url: 'https://example.com/alex-reel.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind the scenes from our latest short film. The golden hour lighting was absolutely perfect! 🌅 #Cinematography #FilmMaking #GoldenHour',
    likes: 2156,
    comments: 134,
    isLiked: false,
    isSaved: true,
    trustScore: 4.9,
    workMode: true,
    timestamp: '4 hours ago',
    isFollowing: false,
  },
  {
    id: '3',
    username: 'soundscape_pro',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    media: {
      type: 'video' as const,
      url: 'https://example.com/sound-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Creating atmospheric sounds for a horror game. Each layer adds to the tension... 🎵👻 #SoundDesign #GameAudio #Horror',
    likes: 892,
    comments: 67,
    isLiked: true,
    isSaved: false,
    trustScore: 4.7,
    workMode: true,
    timestamp: '6 hours ago',
    isFollowing: true,
    isCastingCall: true,
    budget: '$500-1000',
  },
  {
    id: '4',
    username: 'indie_director',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Scouting locations for our next project. This abandoned warehouse has the perfect atmosphere for our thriller! 🎬 #FilmMaking #LocationScouting #Thriller',
    likes: 543,
    comments: 42,
    isLiked: false,
    isSaved: false,
    trustScore: 4.6,
    workMode: true,
    timestamp: '8 hours ago',
    isFollowing: false,
  },
  {
    id: '5',
    username: 'digital_artist_pro',
    userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Digital Artist',
    media: {
      type: 'video' as const,
      url: 'https://example.com/art-timelapse.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Time-lapse of creating a fantasy character concept. From sketch to final render in 8 hours! ✨ #DigitalArt #ConceptArt #Fantasy',
    likes: 1834,
    comments: 156,
    isLiked: true,
    isSaved: true,
    isRisingTalent: true,
    trustScore: 4.9,
    workMode: true,
    timestamp: '12 hours ago',
    isFollowing: false,
  },
];

const mockFollowingContent = mockForYouContent.filter(content => content.isFollowing);

type HomeTab = 'for-you' | 'following' | 'live';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('for-you');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const formatViewers = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const filteredStreams = mockLiveStreams.filter(stream => {
    const matchesSearch = !searchQuery || 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.streamer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || stream.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredStreams = filteredStreams.filter(stream => stream.featured);
  const topStreams = filteredStreams.filter(stream => !stream.featured).sort((a, b) => b.viewers - a.viewers);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-neutral-200 sticky top-16 z-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center space-x-8">
              {[
                { id: 'for-you', label: 'For You', icon: Sparkles },
                { id: 'following', label: 'Following', icon: Users },
                { id: 'live', label: 'Live', icon: Radio },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as HomeTab)}
                  className={`flex items-center px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-800 text-primary-800'
                      : 'border-transparent text-neutral-600 hover:text-neutral-800'
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* For You Tab - TikTok Style */}
            {activeTab === 'for-you' && (
              <div className="max-w-md mx-auto space-y-6 py-6">
                {mockForYouContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    {...content}
                  />
                ))}
              </div>
            )}

            {/* Following Tab - TikTok Style */}
            {activeTab === 'following' && (
              <div className="max-w-md mx-auto py-6">
                {mockFollowingContent.length > 0 ? (
                  <div className="space-y-6">
                    {mockFollowingContent.map((content) => (
                      <ContentCard
                        key={content.id}
                        {...content}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={24} className="text-neutral-500" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-2">No posts yet</h3>
                    <p className="text-neutral-600">Follow some creators to see their content here!</p>
                  </div>
                )}
              </div>
            )}

            {/* Live Tab - Twitch Style */}
            {activeTab === 'live' && (
              <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Search live streams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      >
                        {viewMode === 'grid' ? <List size={18} /> : <Grid3X3 size={18} />}
                      </button>
                      
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg ${showFilters ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                      >
                        <Filter size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-neutral-200 pt-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200">
                          English
                        </button>
                        <button className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200">
                          Recommended
                        </button>
                        <button className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200">
                          New Streamers
                        </button>
                        <button className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200">
                          Interactive
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-neutral-800">Browse Categories</h2>
                    <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                      View All
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {mockCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative overflow-hidden rounded-lg aspect-[4/5] ${
                          selectedCategory === category.name ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                        <div className="relative h-full flex flex-col items-center justify-center text-white p-3">
                          <category.icon size={24} className="mb-2" />
                          <h3 className="font-medium text-sm text-center">{category.name}</h3>
                          <p className="text-xs opacity-90 mt-1">{category.viewers} viewers</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Featured Streams */}
                {featuredStreams.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                    <div className="flex items-center mb-4">
                      <Crown size={20} className="text-amber-500 mr-2" />
                      <h2 className="text-xl font-semibold text-neutral-800">Featured Streams</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {featuredStreams.map((stream) => (
                        <motion.div
                          key={stream.id}
                          whileHover={{ scale: 1.02 }}
                          className="relative group cursor-pointer"
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img
                              src={stream.thumbnail}
                              alt={stream.title}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Live indicator */}
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                              LIVE
                            </div>
                            
                            {/* Viewer count */}
                            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                              <Eye size={12} className="mr-1" />
                              {formatViewers(stream.viewers)}
                            </div>
                            
                            {/* Duration */}
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {stream.duration}
                            </div>
                            
                            {/* Play overlay */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                <Play size={24} className="text-neutral-800 ml-1" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <h3 className="font-medium text-neutral-800 line-clamp-2 mb-1">
                              {stream.title}
                            </h3>
                            
                            <div className="flex items-center mb-2">
                              <img
                                src={stream.streamer.avatar}
                                alt={stream.streamer.name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-sm text-neutral-600 mr-2">{stream.streamer.name}</span>
                              {stream.streamer.verified && (
                                <Star size={14} className="text-purple-500 mr-1" fill="currentColor" />
                              )}
                              {stream.streamer.partner && (
                                <Crown size={14} className="text-amber-500" />
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-primary-600 font-medium">{stream.category}</span>
                              <div className="flex flex-wrap gap-1">
                                {stream.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Live Streams */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <TrendingUp size={20} className="text-red-500 mr-2" />
                      <h2 className="text-xl font-semibold text-neutral-800">
                        {selectedCategory ? `${selectedCategory} Streams` : 'Top Live Streams Today'}
                      </h2>
                    </div>
                    
                    {selectedCategory && (
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-neutral-600 hover:text-neutral-800 flex items-center"
                      >
                        <X size={16} className="mr-1" />
                        Clear Filter
                      </button>
                    )}
                  </div>
                  
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {topStreams.map((stream) => (
                        <motion.div
                          key={stream.id}
                          whileHover={{ scale: 1.02 }}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                            <img
                              src={stream.thumbnail}
                              alt={stream.title}
                              className="w-full h-full object-cover"
                            />
                            
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                              LIVE
                            </div>
                            
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs flex items-center">
                              <Eye size={10} className="mr-1" />
                              {formatViewers(stream.viewers)}
                            </div>
                            
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
                              {stream.duration}
                            </div>
                            
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play size={16} className="text-neutral-800 ml-0.5" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-sm text-neutral-800 line-clamp-2 mb-1">
                              {stream.title}
                            </h3>
                            
                            <div className="flex items-center mb-1">
                              <img
                                src={stream.streamer.avatar}
                                alt={stream.streamer.name}
                                className="w-4 h-4 rounded-full mr-1"
                              />
                              <span className="text-xs text-neutral-600 mr-1">{stream.streamer.name}</span>
                              {stream.streamer.verified && (
                                <Star size={10} className="text-purple-500" fill="currentColor" />
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-primary-600">{stream.category}</span>
                              <div className="flex gap-1">
                                {stream.tags.slice(0, 1).map((tag, index) => (
                                  <span key={index} className="px-1.5 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {topStreams.map((stream, index) => (
                        <motion.div
                          key={stream.id}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="flex items-center p-3 rounded-lg cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-neutral-100 rounded text-sm font-medium text-neutral-600 mr-3">
                            {index + 1}
                          </div>
                          
                          <div className="relative w-20 h-12 rounded overflow-hidden mr-3">
                            <img
                              src={stream.thumbnail}
                              alt={stream.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-medium">
                              LIVE
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-neutral-800 truncate">{stream.title}</h3>
                            <div className="flex items-center text-sm text-neutral-600">
                              <img
                                src={stream.streamer.avatar}
                                alt={stream.streamer.name}
                                className="w-4 h-4 rounded-full mr-1"
                              />
                              <span className="mr-2">{stream.streamer.name}</span>
                              <span className="mr-2">•</span>
                              <span className="text-primary-600">{stream.category}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-neutral-600">
                            <Eye size={14} className="mr-1" />
                            {formatViewers(stream.viewers)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* No results */}
                {filteredStreams.length === 0 && (
                  <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-200">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Radio size={24} className="text-neutral-500" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-2">No live streams found</h3>
                    <p className="text-neutral-600">
                      {searchQuery 
                        ? `No streams match "${searchQuery}". Try a different search term.`
                        : selectedCategory
                        ? `No live streams in ${selectedCategory} right now.`
                        : 'No live streams available at the moment.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;