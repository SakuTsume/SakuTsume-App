import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, Bookmark, MoreVertical, User, Crown, Star, Award, Mic, Filter, TrendingUp, Users, Clock, Zap, ChevronDown, ChevronUp, Eye, ThumbsUp, Send, Gift, Sparkles, Siren as Fire, Camera, Video, Music, Headphones, Globe, MapPin, Calendar, Bell, Settings, Menu, X, Plus, ArrowRight, ChevronLeft, ChevronRight, Shuffle, Repeat, SkipBack, SkipForward, Download, Upload, Edit, Trash2, Flag, UserCheck, UserX, MessageSquare, Phone, VideoIcon, Mail, Link, Copy, ExternalLink, Maximize, Minimize, RotateCcw, RefreshCw, PauseCircle, PlayCircle, StopCircle, FastForward, Rewind } from 'lucide-react';
import Navbar from '../components/navigation/Navbar';
import ContentCard from '../components/shared/ContentCard';

// Mock data for live content
const mockLiveContent = [
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
    caption: 'Live voice acting session! Working on a new horror character for an upcoming indie game. What do you think of this villain voice? 🎭👻',
    likes: 2847,
    comments: 156,
    isLiked: false,
    isSaved: false,
    isRisingTalent: true,
    trustScore: 4.8,
    workMode: true,
    timestamp: '2 hours ago',
    isFollowing: false,
    isCastingCall: false,
  },
  {
    id: '2',
    username: 'alexcine',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'video' as const,
      url: 'https://example.com/alex-bts.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind the scenes of our latest music video shoot! The lighting setup took 3 hours but totally worth it for these cinematic shots 🎬✨',
    likes: 1923,
    comments: 89,
    isLiked: true,
    isSaved: true,
    trustScore: 4.9,
    workMode: true,
    timestamp: '4 hours ago',
    isFollowing: true,
    isCastingCall: false,
  },
  {
    id: '3',
    username: 'sarahcomposer',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Music Composer',
    media: {
      type: 'audio' as const,
      url: 'https://example.com/sarah-composition.mp3',
      thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Just finished composing this emotional piece for an upcoming short film. The director wanted something that captures both hope and melancholy 🎵💫',
    likes: 3421,
    comments: 203,
    isLiked: false,
    isSaved: false,
    trustScore: 4.7,
    workMode: true,
    timestamp: '6 hours ago',
    isFollowing: false,
    isCastingCall: false,
  },
  {
    id: '4',
    username: 'tomstuntcoord',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Stunt Coordinator',
    media: {
      type: 'video' as const,
      url: 'https://example.com/tom-stunt.mp4',
      thumbnail: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'CASTING CALL: Looking for experienced stunt performers for an action sequence. Must have martial arts background. DM for details! 🥋⚡',
    likes: 892,
    comments: 67,
    isLiked: false,
    isSaved: true,
    trustScore: 4.6,
    workMode: true,
    timestamp: '8 hours ago',
    isFollowing: false,
    isCastingCall: true,
    budget: '$2,000-5,000',
  },
];

// Mock trending searches
const trendingSearches = [
  { term: 'voice acting', count: '12.5K' },
  { term: 'cinematography', count: '8.9K' },
  { term: 'casting calls', count: '6.2K' },
  { term: 'sound design', count: '4.8K' },
  { term: 'film scoring', count: '3.1K' },
];

const HomePage: React.FC = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [content, setContent] = useState(mockLiveContent);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-advance content
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentContentIndex((prev) => (prev + 1) % content.length);
    }, 10000); // 10 seconds per content
    
    return () => clearInterval(timer);
  }, [content.length]);
  
  // Handle video play/pause
  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleLike = (contentId: string) => {
    setContent(content.map(item => 
      item.id === contentId 
        ? { 
            ...item, 
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1
          }
        : item
    ));
  };
  
  const handleSave = (contentId: string) => {
    setContent(content.map(item => 
      item.id === contentId 
        ? { ...item, isSaved: !item.isSaved }
        : item
    ));
  };
  
  const handleFollow = (contentId: string) => {
    setContent(content.map(item => 
      item.id === contentId 
        ? { ...item, isFollowing: !item.isFollowing }
        : item
    ));
  };
  
  const nextContent = () => {
    setCurrentContentIndex((prev) => (prev + 1) % content.length);
  };
  
  const prevContent = () => {
    setCurrentContentIndex((prev) => (prev - 1 + content.length) % content.length);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // In a real app, this would navigate to search results
    }
  };
  
  const currentContent = content[currentContentIndex];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content Container */}
      <div className="md:ml-64">
        {/* Hero Section with Live Content */}
        <div className="pt-12">
          <div className="w-full bg-neutral-900 text-white min-h-screen">
            {/* Live Header */}
            <div className="bg-neutral-800 border-b border-neutral-700 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                        LIVE
                      </span>
                      {' '}Entertainment Hub
                    </h1>
                  </div>
                  
                  {/* Live Indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-red-600 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium">LIVE</span>
                    </div>
                    <span className="text-neutral-400 text-sm">
                      {content.length.toLocaleString()} creators online
                    </span>
                  </div>
                </div>
                
                {/* Extended Search Bar */}
                <div className="relative max-w-4xl mx-auto">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search live content, creators, or trending topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSearchSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                        className="w-full py-4 pl-14 pr-20 rounded-2xl bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-neutral-400 text-lg"
                      />
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400">
                        <Search size={24} />
                      </div>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                        <button
                          type="button"
                          className="p-2 rounded-full bg-neutral-600 hover:bg-neutral-500 text-neutral-300 hover:text-white transition-colors"
                        >
                          <Mic size={18} />
                        </button>
                        <button
                          type="button"
                          className="p-2 rounded-full bg-neutral-600 hover:bg-neutral-500 text-neutral-300 hover:text-white transition-colors"
                        >
                          <Filter size={18} />
                        </button>
                      </div>
                    </div>
                  </form>
                  
                  {/* Search Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSearchSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-600 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {/* Trending Searches */}
                        <div className="p-4 border-b border-neutral-700">
                          <h3 className="text-sm font-medium text-neutral-300 mb-3 flex items-center">
                            <TrendingUp size={16} className="mr-2" />
                            Trending Now
                          </h3>
                          <div className="space-y-2">
                            {trendingSearches.map((trend, index) => (
                              <button
                                key={index}
                                onClick={() => setSearchQuery(trend.term)}
                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-neutral-700 transition-colors text-left"
                              >
                                <div className="flex items-center">
                                  <Fire size={16} className="text-orange-500 mr-3" />
                                  <span className="text-white">{trend.term}</span>
                                </div>
                                <span className="text-neutral-400 text-sm">{trend.count}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-neutral-300 mb-3">Quick Actions</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <button className="flex items-center p-2 rounded-lg hover:bg-neutral-700 transition-colors">
                              <Video size={16} className="text-blue-500 mr-2" />
                              <span className="text-white text-sm">Browse Videos</span>
                            </button>
                            <button className="flex items-center p-2 rounded-lg hover:bg-neutral-700 transition-colors">
                              <Music size={16} className="text-green-500 mr-2" />
                              <span className="text-white text-sm">Audio Content</span>
                            </button>
                            <button className="flex items-center p-2 rounded-lg hover:bg-neutral-700 transition-colors">
                              <Users size={16} className="text-purple-500 mr-2" />
                              <span className="text-white text-sm">Find Creators</span>
                            </button>
                            <button className="flex items-center p-2 rounded-lg hover:bg-neutral-700 transition-colors">
                              <Zap size={16} className="text-yellow-500 mr-2" />
                              <span className="text-white text-sm">Casting Calls</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Content Display Area */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="max-w-md mx-auto relative" ref={containerRef}>
                {/* Navigation Arrows */}
                <button
                  onClick={prevContent}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextContent}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
                
                {/* Content Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentContent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <ContentCard
                      {...currentContent}
                      onLike={() => handleLike(currentContent.id)}
                      onSave={() => handleSave(currentContent.id)}
                      onFollow={() => handleFollow(currentContent.id)}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Content Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {content.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentContentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentContentIndex ? 'bg-red-500' : 'bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Auto-advance Progress Bar */}
                <div className="mt-4 w-full bg-neutral-700 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            
            {/* Live Stats Footer */}
            <div className="bg-neutral-800 border-t border-neutral-700 p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-neutral-400">
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    <span>{(Math.random() * 10000 + 5000).toFixed(0)} watching</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="mr-1" />
                    <span>{(Math.random() * 1000 + 500).toFixed(0)} likes/min</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-1" />
                    <span>{(Math.random() * 100 + 50).toFixed(0)} comments/min</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
                    Go Live
                  </button>
                  <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                    Browse All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;