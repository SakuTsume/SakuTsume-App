import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, MoreHorizontal, UserPlus, Star, Crown, Award, Zap, Users, Search, Filter, Eye, Clock, Mic, Video, Camera, PenTool, Music, Palette, Code, Gamepad2, TrendingUp, Calendar, MapPin, Globe, ChevronDown, ChevronUp, Settings, Bell, Mail, Phone, MessageSquare, ThumbsUp, Send, Plus, X, ArrowRight, Briefcase, Target, Coffee, Headphones, Monitor, Smartphone, Tablet, Wifi, Signal, Battery, Volume1, SkipBack, SkipForward, Repeat, Shuffle, Download, Upload, Share, Link, Copy, Edit, Trash, Archive, Flag, CheckCircle, AlertCircle, Info, HelpCircle, Lock, Unlock, Shield, Home, Compass, TrendingUp as Trending, Library, History, Watch as WatchLater, ThumbsDown, Subscript as Subscribe, Captions as Notifications, MoveIcon as Live, IceCreamIcon as Stream } from 'lucide-react';

// Mock data for different content types
const mockForYouContent = [
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
    caption: 'Just finished recording for a new horror game! 🎮👻 The character development process was incredible. Can\'t wait for you all to hear the final result! #VoiceActing #HorrorGames #GameDev',
    likes: 2847,
    comments: 156,
    isLiked: true,
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
    caption: 'Golden hour magic on set today ✨ Sometimes the best shots happen when you least expect them. This indie film is going to be something special! #Cinematography #GoldenHour #IndieFilm',
    likes: 1923,
    comments: 89,
    isLiked: false,
    isSaved: true,
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
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Created this ambient forest soundscape for an upcoming fantasy film 🌲🎵 Layered over 20 different natural sounds to create the perfect mystical atmosphere. What do you think?',
    likes: 1456,
    comments: 67,
    isLiked: true,
    isSaved: false,
    trustScore: 4.7,
    workMode: true,
    timestamp: '6 hours ago',
    isFollowing: false,
  },
];

const mockFollowingContent = [
  {
    id: '4',
    username: 'director_jane',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director',
    media: {
      type: 'video' as const,
      url: 'https://example.com/behind-scenes.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind the scenes from our latest short film! The cast and crew brought so much energy to this project. Grateful to work with such talented people 🎬❤️',
    likes: 892,
    comments: 34,
    isLiked: false,
    isSaved: false,
    timestamp: '1 day ago',
    isFollowing: true,
  },
];

// Mock live streams data
const mockLiveStreams = [
  {
    id: '1',
    title: 'Live Voice Acting Workshop - Character Development',
    streamer: {
      name: 'Maya',
      username: 'maya_va',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      isPartner: true,
    },
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 2847,
    category: 'Voice Acting',
    tags: ['Voice Acting', 'Workshop', '+2 more'],
    duration: '2:34:12',
    isLive: true,
  },
  {
    id: '2',
    title: 'Behind the Scenes: Directing My First Feature Film',
    streamer: {
      name: 'Alex',
      username: 'alex_director',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      isPartner: false,
    },
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 1534,
    category: 'Film & TV',
    tags: ['Film Direction', 'Behind the Scenes', '+2 more'],
    duration: '1:45:30',
    isLive: true,
  },
  {
    id: '3',
    title: 'Composing Epic Boss Battle Music - Live Session',
    streamer: {
      name: 'Sarah',
      username: 'sarah_composer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      isPartner: true,
    },
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 892,
    category: 'Music & Audio',
    tags: ['Music Composition', 'Game Audio', '+2 more'],
    duration: '3:12:45',
    isLive: true,
  },
  {
    id: '4',
    title: 'Method Acting Masterclass: Emotional Range Techniques',
    streamer: {
      name: 'Emma',
      username: 'emma_method',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      isPartner: true,
    },
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 3421,
    category: 'Acting',
    tags: ['Method Acting', 'Masterclass', '+2 more'],
    duration: '1:23:18',
    isLive: true,
  },
  {
    id: '5',
    title: 'Creating Sci-Fi Character Concepts for Indie Games',
    streamer: {
      name: 'Jordan',
      username: 'jordan_concept',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      isPartner: false,
    },
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 567,
    category: 'Art & Design',
    tags: ['Concept Art', 'Character Design', '+2 more'],
    duration: '0:45:22',
    isLive: true,
  },
  {
    id: '6',
    title: 'Writing Comedy Material - Open Mic Night Prep',
    streamer: {
      name: 'Mike',
      username: 'mike_comedy',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      isPartner: false,
    },
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 1234,
    category: 'Comedy',
    tags: ['Stand-Up Comedy', 'Writing', '+2 more'],
    duration: '2:15:33',
    isLive: true,
  },
];

type FeedTab = 'for-you' | 'following' | 'live';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeedTab>('for-you');
  const [workMode, setWorkMode] = useState(false);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Auto-play videos when they come into view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.play();
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.5 }
        );
        
        observer.observe(video);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [activeTab]);

  const handleCommentSubmit = (postId: string) => {
    if (newComment.trim()) {
      console.log(`Adding comment to post ${postId}:`, newComment);
      setNewComment('');
    }
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'for-you':
        return mockForYouContent;
      case 'following':
        return mockFollowingContent;
      case 'live':
        return [];
      default:
        return mockForYouContent;
    }
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Fan/Work Mode Toggle */}
      <div className="pt-16">
        <div className="bg-gradient-to-r from-primary-800 to-secondary-700 text-white p-4">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold">SakuTsume</h1>
              
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-black/20 rounded-lg p-1">
                {[
                  { id: 'for-you', label: 'For You' },
                  { id: 'following', label: 'Following' },
                  { id: 'live', label: 'Live' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as FeedTab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-primary-800'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Fan/Work Mode Toggle */}
            <div className="flex items-center space-x-3">
              <span className={`text-sm ${!workMode ? 'text-white' : 'text-white/60'}`}>
                Fan Mode
              </span>
              <button
                onClick={() => setWorkMode(!workMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  workMode ? 'bg-amber-500' : 'bg-white/30'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    workMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className={`text-sm ${workMode ? 'text-white' : 'text-white/60'}`}>
                Work Mode
              </span>
              {workMode && (
                <div className="flex items-center bg-amber-500/20 px-3 py-1 rounded-full">
                  <Crown size={16} className="text-amber-400 mr-1" />
                  <span className="text-xs font-medium text-amber-200">PRO</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-screen bg-gray-900 text-white">
          <AnimatePresence mode="wait">
            {activeTab === 'live' ? (
              // Live Streams Section (Twitch-like)
              <motion.div
                key="live"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:ml-48 p-4"
              >
                {/* Live Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Live Channels</h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search live streams..."
                        className="w-64 py-2 pl-9 pr-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>

                {/* Live Streams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mockLiveStreams.map((stream) => (
                    <motion.div
                      key={stream.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                    >
                      {/* Stream Thumbnail */}
                      <div className="relative aspect-video">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Live Badge */}
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                          LIVE
                        </div>
                        
                        {/* Viewer Count */}
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                          <Eye size={12} className="mr-1" />
                          {formatViewerCount(stream.viewers)}
                        </div>
                        
                        {/* Duration */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {stream.duration}
                        </div>

                        {/* 18+ Badge if needed */}
                        {stream.id === '6' && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            18+
                          </div>
                        )}
                      </div>
                      
                      {/* Stream Info */}
                      <div className="p-3">
                        <div className="flex items-start space-x-3">
                          {/* Streamer Avatar */}
                          <div className="relative flex-shrink-0">
                            <img
                              src={stream.streamer.avatar}
                              alt={stream.streamer.name}
                              className="w-8 h-8 rounded-full"
                            />
                            {stream.streamer.verified && (
                              <CheckCircle size={12} className="absolute -bottom-1 -right-1 text-purple-500 bg-gray-800 rounded-full" />
                            )}
                          </div>
                          
                          {/* Stream Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm line-clamp-2 mb-1">
                              {stream.title}
                            </h3>
                            <p className="text-gray-400 text-xs mb-1">{stream.streamer.name}</p>
                            <p className="text-gray-500 text-xs">{stream.category}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {stream.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // Regular Feed Content
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto space-y-0"
              >
                {getCurrentContent().map((content) => (
                  <div key={content.id} className="bg-black border-b border-gray-800">
                    {/* User info */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={content.userAvatar}
                            alt={content.username}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          {content.isRisingTalent && workMode && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                              <Star size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-white">{content.username}</h3>
                            {content.isRisingTalent && workMode && (
                              <Crown size={14} className="ml-2 text-amber-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{content.profession}</p>
                          {content.timestamp && (
                            <p className="text-xs text-gray-500">{content.timestamp}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {content.trustScore && workMode && (
                          <div className="flex items-center bg-blue-900/50 px-2 py-1 rounded-full">
                            <Award size={12} className="text-blue-400 mr-1" />
                            <span className="text-xs font-medium text-blue-300">{content.trustScore}</span>
                          </div>
                        )}
                        {content.isFollowing && (
                          <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                            Following
                          </button>
                        )}
                        {!content.isFollowing && (
                          <button className="px-3 py-1 bg-white text-black rounded-full text-xs font-medium">
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Media content */}
                    <div className="relative">
                      {content.media.type === 'image' && (
                        <img
                          src={content.media.url}
                          alt={content.caption}
                          className="w-full object-cover max-h-[600px]"
                        />
                      )}
                      
                      {content.media.type === 'video' && (
                        <div className="relative">
                          <video
                            ref={(el) => {
                              if (el) videoRefs.current[content.id] = el;
                            }}
                            src={content.media.url}
                            poster={content.media.thumbnail}
                            className="w-full object-cover max-h-[600px]"
                            muted
                            loop
                            playsInline
                          />
                        </div>
                      )}
                      
                      {content.media.type === 'audio' && (
                        <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-8 flex items-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mr-4">
                            <Mic size={24} className="text-purple-800" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                              <div className="h-full w-1/3 bg-white rounded-full"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-white/80">
                              <span>0:42</span>
                              <span>2:18</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Rising Talent Overlay */}
                      {content.isRisingTalent && workMode && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                          <Star size={12} className="mr-1" />
                          RISING TALENT
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex space-x-6">
                        <button className={`flex items-center space-x-2 transition-colors ${
                          content.isLiked ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                        }`}>
                          <Heart size={24} fill={content.isLiked ? '#ef4444' : 'none'} />
                          <span className="font-medium">{content.likes.toLocaleString()}</span>
                        </button>
                        
                        <button 
                          onClick={() => setShowComments(showComments === content.id ? null : content.id)}
                          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <MessageCircle size={24} />
                          <span className="font-medium">{content.comments}</span>
                        </button>
                        
                        <button className="flex items-center text-gray-300 hover:text-white transition-colors">
                          <Share2 size={24} />
                        </button>
                      </div>
                      
                      <button className={`transition-colors ${
                        content.isSaved ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}>
                        <Bookmark size={24} fill={content.isSaved ? '#ffffff' : 'none'} />
                      </button>
                    </div>
                    
                    {/* Caption */}
                    <div className="px-4 pb-4">
                      <p className="text-white">
                        <span className="font-medium">{content.username}</span> {content.caption}
                      </p>
                      
                      {/* Work Mode Additional Info */}
                      {workMode && content.trustScore && (
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-400">
                            <Award size={14} className="mr-1" />
                            <span>Trust Score: {content.trustScore}/5.0</span>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            View Portfolio
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {showComments === content.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-800 bg-gray-900/50"
                        >
                          <div className="p-4 space-y-3">
                            {/* Comment Input */}
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Your avatar"
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1 flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  placeholder="Add a comment..."
                                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleCommentSubmit(content.id);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => handleCommentSubmit(content.id)}
                                  disabled={!newComment.trim()}
                                  className={`p-2 rounded-full ${
                                    newComment.trim()
                                      ? 'bg-purple-600 text-white'
                                      : 'bg-gray-700 text-gray-400'
                                  }`}
                                >
                                  <Send size={16} />
                                </button>
                              </div>
                            </div>
                            
                            {/* Sample Comments */}
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <img
                                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                                  alt="Commenter"
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-white text-sm">alexcine</span>
                                    <span className="text-gray-500 text-xs">2h</span>
                                  </div>
                                  <p className="text-gray-300 text-sm">This is incredible work! The emotion really comes through.</p>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <button className="text-gray-500 hover:text-red-400 text-xs flex items-center">
                                      <Heart size={12} className="mr-1" />
                                      12
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-300 text-xs">Reply</button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-3">
                                <img
                                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                                  alt="Commenter"
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-white text-sm">sarah_composer</span>
                                    <span className="text-gray-500 text-xs">1h</span>
                                  </div>
                                  <p className="text-gray-300 text-sm">Would love to collaborate on a project sometime!</p>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <button className="text-gray-500 hover:text-red-400 text-xs flex items-center">
                                      <Heart size={12} className="mr-1" />
                                      5
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-300 text-xs">Reply</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HomePage;