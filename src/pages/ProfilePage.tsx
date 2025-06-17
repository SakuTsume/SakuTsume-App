import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, MessageCircle, Share2, Link, MapPin, Mail, Calendar, 
  Star, Play, Pause, Volume2, VolumeX, Heart, Bookmark, 
  ChevronDown, ChevronUp, Edit3, Crown, Zap, Clock, 
  Award, CheckCircle, Globe, Camera, Video, Mic, PenTool,
  ShoppingBag, Package, DollarSign, ArrowRight, Filter,
  MoreHorizontal, Eye, ThumbsUp, MessageSquare, Users,
  Settings, Share
} from 'lucide-react';

// Mock profile data with enhanced structure
const mockProfile = {
  id: 'maya_va',
  name: 'MAYA',
  profession: 'Voice Actor',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
  coverImage: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  
  // Profile stats
  stats: {
    followers: 2847,
    following: 156,
    posts: 42
  },
  
  // Status and tags
  status: {
    emoji: '🔥',
    text: 'Open for Horror Gigs',
    active: true
  },
  dynamicTags: ['#Anime', '#Audiobooks', '#RPG', '#Horror'],
  trustScore: 4.8,
  
  // Bio story
  bioStory: {
    journey: 'From bedtime stories → RPG heroes!',
    dreamRole: 'Cyberpunk detective 🕵️♀️',
    studying: 'Japanese dialects 🇯🇵',
    fullStory: `Started voice acting at age 12 reading bedtime stories to my little sister. Now I specialize in bringing complex characters to life in RPGs and anime. My dream is to voice a cyberpunk detective in a major AAA game.

Currently studying Japanese dialects to expand into anime dubbing. I believe every character has a unique voice waiting to be discovered, and I love the challenge of finding that perfect tone and personality.

When I'm not in the booth, you'll find me playing indie horror games for inspiration or practicing new accents. Always looking for the next character that will challenge me to grow as an artist.`
  },
  
  // Skills with progress
  skills: [
    { name: 'Game VO', level: 80, badge: 'Game VO Certified', icon: '🎮', nextBadge: 'Lead Character' },
    { name: 'Audiobook', level: 60, badge: 'Audiobook Pro', icon: '🎙️', nextBadge: 'Narrator Master' },
    { name: 'Japanese', level: 40, badge: null, icon: '🌐', nextBadge: 'Bilingual Certified' },
  ],
  
  // Quick stats
  quickStats: {
    responseTime: '2h',
    gigsCompleted: 42,
    languages: ['EN', 'JP'],
    rating: 4.8,
    reviewCount: 127
  },
  
  // Top 3 spotlight content
  topThree: [
    {
      id: '1',
      type: 'video',
      url: 'https://example.com/maya-horror-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Horror Character Demo',
      description: 'Spine-chilling villain voice for indie horror game',
      views: 2847,
      likes: 156,
      isPinned: true
    },
    {
      id: '2',
      type: 'audio',
      url: 'https://example.com/maya-anime-sample.mp3',
      thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Anime Character Range',
      description: 'From shy schoolgirl to fierce warrior',
      views: 1923,
      likes: 89,
      isPinned: true
    },
    {
      id: '3',
      type: 'video',
      url: 'https://example.com/maya-behind-scenes.mp4',
      thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Behind the Scenes',
      description: 'My home studio setup and recording process',
      views: 3421,
      likes: 203,
      isPinned: true
    }
  ],
  
  // Additional content
  allContent: [
    {
      id: '4',
      type: 'video',
      url: 'https://example.com/maya-commercial.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Commercial Voice Demo',
      description: 'Warm and friendly narrator voice',
      views: 1456,
      likes: 67,
      category: 'Commercial',
      isPinned: false
    },
    {
      id: '5',
      type: 'audio',
      url: 'https://example.com/maya-audiobook.mp3',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Audiobook Excerpt',
      description: 'Fantasy novel narration sample',
      views: 892,
      likes: 34,
      category: 'Audiobook',
      isPinned: false
    }
  ]
};

// Mock services for shop
const mockServices = [
  {
    id: '1',
    title: 'CHARACTER VOICEOVER',
    description: '24h delivery • 3 revisions included',
    price: 200,
    bestseller: true,
    category: 'Game VO'
  },
  {
    id: '2',
    title: 'AUDIOBOOK NARRATION',
    description: '48h delivery • Professional editing',
    price: 350,
    bestseller: false,
    category: 'Audiobook'
  },
  {
    id: '3',
    title: 'ANIME DUBBING',
    description: '72h delivery • Multiple takes',
    price: 180,
    bestseller: false,
    category: 'Animation'
  }
];

// Mock portfolio projects
const mockPortfolio = [
  {
    id: '1',
    title: 'Skyreach RPG',
    role: 'Lead Villain Voice',
    client: 'Indie Studios',
    image: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Voiced the main antagonist in this award-winning indie RPG. Created a menacing yet charismatic character that players love to hate.',
    results: ['50K+ downloads', 'Featured on Steam', '4.8/5 user rating'],
    testimonial: '"Maya brought our villain to life in ways we never imagined. Her performance elevated the entire game." - Game Director'
  },
  {
    id: '2',
    title: 'Mystic Tales Audiobook',
    role: 'Narrator',
    client: 'AudioVerse Publishing',
    image: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Complete narration of 12-hour fantasy audiobook with multiple character voices.',
    results: ['#1 Fantasy Audiobook', '10K+ sales', 'Audible Editor\'s Pick'],
    testimonial: '"Professional, timely, and incredibly talented. Maya made our book come alive." - Publisher'
  }
];

type ProfileTab = 'reels' | 'portfolio' | 'shop' | 'about';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ProfileTab>('reels');
  const [profile, setProfile] = useState(mockProfile);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [currentSpotlight, setCurrentSpotlight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [contentFilter, setContentFilter] = useState('All');
  const [canEditTopThree, setCanEditTopThree] = useState(true); // Simulate weekly limit
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check if this is the user's own profile
  const isOwnProfile = id === 'me';
  
  // Auto-advance spotlight carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpotlight((prev) => (prev + 1) % profile.topThree.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [profile.topThree.length]);
  
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
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  const allContent = [...profile.topThree, ...profile.allContent];
  const filteredContent = contentFilter === 'All' 
    ? allContent 
    : allContent.filter(item => item.category === contentFilter || item.isPinned);
  
  const contentCategories = ['All', 'Animation', 'Gaming', 'Commercial', 'Audiobook'];
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header - Identity Card */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="max-w-screen-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Profile + Status */}
            <div className="flex items-center">
              <div className="relative mr-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {profile.status.active && (
                  <div className="absolute -bottom-1 -right-1 bg-success-500 border-2 border-white rounded-full w-4 h-4"></div>
                )}
              </div>
              
              <div>
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-neutral-800 mr-2">
                    {profile.name} | {profile.profession}
                  </h1>
                  {profile.status.active && (
                    <div className="flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 rounded-full">
                      <span className="mr-1">{profile.status.emoji}</span>
                      <span className="text-sm font-medium text-orange-800">{profile.status.text}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mt-1">
                  {profile.dynamicTags.map((tag, index) => (
                    <span key={index} className="text-sm text-primary-600 mr-2 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right: Trust Score + Actions/Stats */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
                <Star size={16} fill="#F59E0B" className="text-amber-500 mr-1" />
                <span className="font-semibold text-amber-800">{profile.trustScore}</span>
              </div>
              
              {isOwnProfile ? (
                // Own Profile: Show Stats + Settings
                <div className="flex items-center space-x-4">
                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-neutral-800">{formatNumber(profile.stats.posts)}</div>
                      <div className="text-neutral-600">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-neutral-800">{formatNumber(profile.stats.followers)}</div>
                      <div className="text-neutral-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-neutral-800">{formatNumber(profile.stats.following)}</div>
                      <div className="text-neutral-600">Following</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-800 text-white flex items-center">
                      <Edit3 size={16} className="mr-1" />
                      Edit Profile
                    </button>
                    
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-neutral-300 text-neutral-700 flex items-center">
                      <Share size={16} className="mr-1" />
                      Share
                    </button>
                    
                    <button className="p-2 rounded-lg bg-white border border-neutral-300 text-neutral-700">
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                // Other's Profile: Show Follow/Message buttons
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                      isFollowing 
                        ? 'bg-white text-primary-800 border border-primary-800' 
                        : 'bg-primary-800 text-white'
                    }`}
                  >
                    <UserPlus size={16} className="mr-1" />
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-neutral-300 text-neutral-700 flex items-center">
                    <MessageCircle size={16} className="mr-1" />
                    Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        {/* Top 3 Spotlight */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Top 3 Spotlight</h2>
            {canEditTopThree && isOwnProfile && (
              <button className="flex items-center px-3 py-1.5 bg-primary-100 text-primary-800 rounded-lg text-sm font-medium">
                <Edit3 size={14} className="mr-1" />
                Edit Top 3
              </button>
            )}
          </div>
          
          <div className="relative bg-black rounded-xl overflow-hidden aspect-[9/16] max-w-sm mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpotlight}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {profile.topThree[currentSpotlight].type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={profile.topThree[currentSpotlight].url}
                      poster={profile.topThree[currentSpotlight].thumbnail}
                      className="w-full h-full object-cover"
                      muted={isMuted}
                      loop
                      playsInline
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlayback}
                        className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                    </div>
                    
                    <button
                      onClick={toggleMute}
                      className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mic size={32} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {profile.topThree[currentSpotlight].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {profile.topThree[currentSpotlight].description}
                      </p>
                      
                      {/* Audio waveform visualization */}
                      <div className="flex items-center justify-center mt-4 space-x-1">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-white/60 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Content Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold mb-1">
                    {profile.topThree[currentSpotlight].title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {profile.topThree[currentSpotlight].description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-white/80 text-sm">
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {profile.topThree[currentSpotlight].views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart size={14} className="mr-1" />
                        {profile.topThree[currentSpotlight].likes}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                        <Heart size={16} />
                      </button>
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                        <Bookmark size={16} />
                      </button>
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {profile.topThree.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSpotlight(index)}
                  className={`w-8 h-1 rounded-full transition-colors ${
                    index === currentSpotlight ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bio Story Card */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-neutral-200">
          <h3 className="text-lg font-semibold mb-4 text-neutral-800" style={{ fontFamily: 'cursive' }}>
            MY JOURNEY
          </h3>
          
          <div className="space-y-3">
            <p className="text-neutral-700" style={{ fontFamily: 'cursive' }}>
              "{profile.bioStory.journey}"
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <span className="font-semibold text-amber-600 mr-2">Dream role:</span>
                <span className="text-neutral-700">{profile.bioStory.dreamRole}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold text-blue-600 mr-2">Studying:</span>
                <span className="text-neutral-700">{profile.bioStory.studying}</span>
              </div>
            </div>
            
            <AnimatePresence>
              {bioExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4 border-t border-neutral-200"
                >
                  <p className="text-neutral-700 whitespace-pre-line">
                    {profile.bioStory.fullStory}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              {bioExpanded ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Read Less
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Read More
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Skills Dashboard */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-neutral-200">
          <h3 className="text-lg font-semibold mb-4 text-neutral-800">Skills Dashboard</h3>
          
          {/* Public View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center">
                <Clock size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm font-medium">Response Time</span>
              </div>
              <span className="font-semibold text-primary-600">{profile.quickStats.responseTime}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-success-500 mr-2" />
                <span className="text-sm font-medium">Gigs Completed</span>
              </div>
              <span className="font-semibold text-success-600">{profile.quickStats.gigsCompleted}</span>
            </div>
          </div>
          
          {/* Skills Progress */}
          <div className="space-y-4">
            {profile.skills.map((skill, index) => (
              <div key={index} className="p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                    {skill.badge && (
                      <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                        {skill.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-neutral-600">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                
                {skill.nextBadge && (
                  <div className="text-xs text-neutral-600">
                    Next: <span className="font-medium text-primary-600">{skill.nextBadge}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Tab Navigator */}
        <div className="bg-white rounded-xl border border-neutral-200 mb-8">
          <div className="flex border-b border-neutral-200">
            {[
              { id: 'reels', label: 'REELS', icon: Video },
              { id: 'portfolio', label: 'PORTFOLIO', icon: Award },
              { id: 'shop', label: 'SHOP', icon: ShoppingBag },
              { id: 'about', label: 'ABOUT', icon: PenTool },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`flex-1 flex items-center justify-center px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-800 border-b-2 border-primary-800'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Reels Tab */}
                {activeTab === 'reels' && (
                  <div>
                    {/* Content Filters */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex space-x-2 overflow-x-auto">
                        {contentCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setContentFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                              contentFilter === category
                                ? 'bg-primary-800 text-white'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                      
                      <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600">
                        <Filter size={18} />
                      </button>
                    </div>
                    
                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredContent.map((content) => (
                        <div key={content.id} className="relative group">
                          <div className="aspect-[9/16] bg-neutral-900 rounded-lg overflow-hidden">
                            <img
                              src={content.thumbnail}
                              alt={content.title}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Pinned indicator */}
                            {content.isPinned && (
                              <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                <Crown size={12} className="mr-1" />
                                Pinned
                              </div>
                            )}
                            
                            {/* Play button overlay */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play size={20} className="text-neutral-800" />
                              </button>
                            </div>
                            
                            {/* Stats overlay */}
                            <div className="absolute bottom-2 left-2 right-2">
                              <h4 className="text-white font-medium text-sm mb-1">{content.title}</h4>
                              <div className="flex items-center justify-between text-white/80 text-xs">
                                <div className="flex items-center space-x-3">
                                  <span>{content.views.toLocaleString()} views</span>
                                  <span>{content.likes} likes</span>
                                </div>
                                {content.type === 'audio' && (
                                  <Mic size={12} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-8">
                    {mockPortfolio.map((project) => (
                      <div key={project.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          
                          <div className="md:w-2/3 p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-neutral-800">{project.title}</h3>
                                <p className="text-primary-600 font-medium">{project.role}</p>
                                <p className="text-sm text-neutral-600">{project.client}</p>
                              </div>
                              
                              <button className="flex items-center px-4 py-2 bg-primary-800 text-white rounded-lg text-sm font-medium">
                                View Case Study
                                <ArrowRight size={16} className="ml-2" />
                              </button>
                            </div>
                            
                            <p className="text-neutral-700 mb-4">{project.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              {project.results.map((result, index) => (
                                <div key={index} className="text-center p-3 bg-success-50 rounded-lg">
                                  <div className="text-sm font-semibold text-success-800">{result}</div>
                                </div>
                              ))}
                            </div>
                            
                            <blockquote className="border-l-4 border-primary-500 pl-4 italic text-neutral-700">
                              {project.testimonial}
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Shop Tab - Dark Theme */}
                {activeTab === 'shop' && (
                  <div className="bg-neutral-900 -m-6 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">Services</h3>
                      <div className="flex items-center text-success-400">
                        <Zap size={16} className="mr-1" />
                        <span className="text-sm">Fast Response</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockServices.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ 
                            rotateY: 5,
                            rotateX: 5,
                            scale: 1.02
                          }}
                          transition={{ duration: 0.2 }}
                          className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 relative overflow-hidden"
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          {service.bestseller && (
                            <div className="absolute top-4 right-4">
                              <Crown size={20} className="text-amber-400" />
                            </div>
                          )}
                          
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {service.title}
                          </h4>
                          
                          <div className="border-t border-neutral-600 my-4"></div>
                          
                          <p className="text-neutral-300 text-sm mb-4">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-success-400 font-semibold text-xl">
                              <DollarSign size={20} />
                              <span>{service.price}</span>
                            </div>
                            
                            <button className="px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg font-medium transition-colors">
                              BOOK NOW
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-8">
                    {/* Contact Info */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                          <Mail size={18} className="text-neutral-500 mr-3" />
                          <span>maya.voiceactor@email.com</span>
                        </div>
                        
                        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                          <Globe size={18} className="text-neutral-500 mr-3" />
                          <span>maya-voice-portfolio.com</span>
                        </div>
                        
                        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                          <MapPin size={18} className="text-neutral-500 mr-3" />
                          <span>Los Angeles, CA</span>
                        </div>
                        
                        <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                          <Calendar size={18} className="text-neutral-500 mr-3" />
                          <span>Joined March 2023</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Equipment */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Studio Equipment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          'Neumann TLM 103 Microphone',
                          'Focusrite Scarlett 2i2 Interface',
                          'Acoustic Treatment Panels',
                          'Pro Tools & Adobe Audition'
                        ].map((equipment, index) => (
                          <div key={index} className="flex items-center p-3 border border-neutral-200 rounded-lg">
                            <CheckCircle size={16} className="text-success-500 mr-3" />
                            <span>{equipment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Reviews */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
                      <div className="space-y-4">
                        {[
                          {
                            author: 'GameDev Studio',
                            rating: 5,
                            text: 'Maya delivered exactly what we needed for our horror game. Professional and creative!',
                            date: '2 weeks ago'
                          },
                          {
                            author: 'Audiobook Publisher',
                            rating: 5,
                            text: 'Incredible range and emotion. Made our fantasy novel come to life.',
                            date: '1 month ago'
                          }
                        ].map((review, index) => (
                          <div key={index} className="p-4 border border-neutral-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="font-medium">{review.author}</span>
                                <div className="flex ml-2">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="#F59E0B" className="text-amber-500" />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-neutral-500">{review.date}</span>
                            </div>
                            <p className="text-neutral-700">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;