import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Compass, Users, Radio, User, Settings, Heart, MessageCircle, 
  Bookmark, Share2, MoreHorizontal, Play, Pause, VolumeX, Volume2,
  Star, Crown, Award, Clock, DollarSign, Eye, Briefcase, Zap,
  ChevronRight, MapPin, Calendar, Filter, Search, TrendingUp,
  Mic, Video, Camera, Music, Hash, CheckCircle, Plus, Bell,
  ArrowUp, ArrowDown, Send, Gift, Target, Flame, ThumbsUp
} from 'lucide-react';

// Mock data for different modes and content types
const mockWorkModeReels = [
  {
    id: '1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    isVerified: true,
    isRisingTalent: true,
    trustScore: 4.8,
    video: {
      url: 'https://example.com/maya-horror-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:15'
    },
    caption: 'Spine-chilling villain voice for indie horror game 🎭 #HorrorVoice #GameDev #VoiceActing',
    music: {
      title: 'Original Sound',
      artist: 'maya_va'
    },
    likes: 29,
    comments: 3,
    shares: 1,
    bookmarks: 8,
    isLiked: false,
    isBookmarked: false,
    isFollowing: false,
    timestamp: '2h',
    workModeOnly: true
  },
  {
    id: '2',
    username: 'alex_cinematics',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    isVerified: true,
    isRisingTalent: true,
    trustScore: 4.9,
    video: {
      url: 'https://example.com/alex-cinematic-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:30'
    },
    caption: 'Cinematic lighting techniques for indie films ✨ #Cinematography #FilmMaking #IndieFilm',
    music: {
      title: 'Cinematic Vibes',
      artist: 'FilmScore_Official'
    },
    likes: 156,
    comments: 23,
    shares: 12,
    bookmarks: 45,
    isLiked: true,
    isBookmarked: false,
    isFollowing: false,
    timestamp: '4h',
    workModeOnly: true
  },
  {
    id: '3',
    username: 'sarah_composer',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Music Composer',
    isVerified: false,
    isRisingTalent: true,
    trustScore: 4.6,
    video: {
      url: 'https://example.com/sarah-composition.mp4',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:45'
    },
    caption: 'Epic orchestral piece for RPG boss battle 🎼 #GameMusic #Orchestral #Composer',
    music: {
      title: 'Boss Battle Theme',
      artist: 'sarah_composer'
    },
    likes: 89,
    comments: 15,
    shares: 7,
    bookmarks: 32,
    isLiked: false,
    isBookmarked: true,
    isFollowing: true,
    timestamp: '6h',
    workModeOnly: true
  }
];

const mockFanModeReels = [
  ...mockWorkModeReels,
  {
    id: '4',
    username: 'celebrity_actor',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Hollywood Actor',
    isVerified: true,
    isRisingTalent: false,
    trustScore: 5.0,
    video: {
      url: 'https://example.com/celebrity-bts.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '1:20'
    },
    caption: 'Behind the scenes from my latest blockbuster! 🎬✨ #BTS #Hollywood #Acting',
    music: {
      title: 'Trending Sound',
      artist: 'PopularTrack_2024'
    },
    likes: 2847,
    comments: 342,
    shares: 156,
    bookmarks: 892,
    isLiked: true,
    isBookmarked: false,
    isFollowing: true,
    timestamp: '1h',
    workModeOnly: false
  },
  {
    id: '5',
    username: 'indie_filmmaker',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director',
    isVerified: false,
    isRisingTalent: false,
    trustScore: 4.3,
    video: {
      url: 'https://example.com/indie-film-process.mp4',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '2:15'
    },
    caption: 'The struggle of indie filmmaking is real but so worth it! 💪 #IndieFilm #FilmMaker #Passion',
    music: {
      title: 'Inspirational Beat',
      artist: 'MotivationMusic'
    },
    likes: 1234,
    comments: 89,
    shares: 45,
    bookmarks: 234,
    isLiked: false,
    isBookmarked: true,
    isFollowing: false,
    timestamp: '8h',
    workModeOnly: false
  }
];

const mockAuditionAlerts = [
  {
    id: 'audition1',
    title: 'Sci-Fi Hero Voice Actor',
    studio: 'Quantum Games',
    budget: '$2,000',
    deadline: '3 days left',
    description: 'Looking for a strong, heroic voice for our upcoming sci-fi RPG protagonist.',
    requirements: ['Male voice', '25-40 age range', 'Action/Adventure experience'],
    applicants: 23,
    isUrgent: true
  },
  {
    id: 'audition2',
    title: 'Animated Series Narrator',
    studio: 'DreamWorks Animation',
    budget: '$5,000',
    deadline: '1 week left',
    description: 'Warm, friendly narrator for children\'s animated series.',
    requirements: ['Neutral accent', 'Child-friendly tone', 'Animation experience'],
    applicants: 67,
    isUrgent: false
  }
];

// Mock following content that looks like reels
const mockFollowingReels = [
  {
    id: 'follow1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    isVerified: true,
    isRisingTalent: true,
    trustScore: 4.8,
    video: {
      url: 'https://example.com/maya-rpg-villain.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '1:30'
    },
    caption: 'New RPG Villain Reel - bringing darkness to life 🖤 #RPG #VillainVoice #VoiceActing',
    music: {
      title: 'Dark Fantasy',
      artist: 'maya_va'
    },
    likes: 142,
    comments: 12,
    shares: 8,
    bookmarks: 23,
    isLiked: false,
    isBookmarked: false,
    isFollowing: true,
    timestamp: '2h ago',
    contentType: 'reel'
  },
  {
    id: 'follow2',
    username: 'StudioX',
    userAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Animation Studio',
    isVerified: true,
    isRisingTalent: false,
    trustScore: 4.9,
    video: {
      url: 'https://example.com/casting-call-preview.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:45'
    },
    caption: 'Cyberpunk Detective Casting Call - Apply now! 🕵️‍♂️ #CastingCall #CyberpunkDetective #VoiceActing',
    music: {
      title: 'Cyberpunk Vibes',
      artist: 'StudioX'
    },
    likes: 89,
    comments: 34,
    shares: 15,
    bookmarks: 67,
    isLiked: true,
    isBookmarked: true,
    isFollowing: true,
    timestamp: '4h ago',
    contentType: 'casting',
    castingInfo: {
      budget: '$3,000',
      deadline: '5 days left',
      applicants: 34
    }
  },
  {
    id: 'follow3',
    username: 'tom_sound',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    isVerified: false,
    isRisingTalent: false,
    trustScore: 4.5,
    video: {
      url: 'https://example.com/live-studio-session.mp4',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: 'LIVE'
    },
    caption: 'Live Studio Session - Creating sound effects for horror game 🎧 #LiveSession #SoundDesign #Horror',
    music: {
      title: 'Live Audio',
      artist: 'tom_sound'
    },
    likes: 67,
    comments: 23,
    shares: 5,
    bookmarks: 12,
    isLiked: false,
    isBookmarked: false,
    isFollowing: true,
    timestamp: 'Live now',
    contentType: 'live',
    liveInfo: {
      viewers: 42,
      isLive: true
    }
  }
];

const mockCommercialAds = [
  {
    id: 'ad1',
    type: 'product',
    brand: 'SakuTsume Pro Mic',
    image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Professional Studio Quality',
    description: 'Get the mic used by top voice actors',
    price: '$199',
    cta: 'Shop Now'
  },
  {
    id: 'ad2',
    type: 'course',
    brand: 'MasterClass',
    image: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Voice Acting Masterclass',
    description: 'Learn from industry professionals',
    price: '$29/month',
    cta: 'Start Learning'
  }
];

// Mock live streams data
const mockLiveStreams = [
  {
    id: 'stream1',
    streamer: 'Maya Voice Studio',
    title: 'Live Voice Acting Session - Horror Characters',
    viewers: 1234,
    category: 'Voice Acting',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    language: 'English',
    isLive: true
  },
  {
    id: 'stream2',
    streamer: 'StudioX Productions',
    title: 'Voice Directing 101 - Workshop',
    viewers: 842,
    category: 'Workshops',
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    language: 'Japanese',
    isLive: true
  },
  {
    id: 'stream3',
    streamer: 'FilmCraft Studio',
    title: 'Behind the Scenes: Indie Film Production',
    viewers: 593,
    category: 'Film Making',
    thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    language: 'English',
    isLive: true
  },
  {
    id: 'stream4',
    streamer: 'AnimeClub',
    title: 'Anime Voice Acting Q&A Session',
    viewers: 2400,
    category: 'Just Chatting',
    thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    language: 'English',
    isLive: true
  }
];

const mockOfflineChannels = [
  { name: 'Jessica', lastSeen: '2h ago', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { name: 'RPG_Casting', lastSeen: '1d ago', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100' }
];

type HomeTab = 'for-you' | 'following' | 'live';
type UserMode = 'work' | 'fan';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('for-you');
  const [userMode, setUserMode] = useState<UserMode>('work');
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showAuditionAlert, setShowAuditionAlert] = useState(false);
  const [auditionAlertIndex, setAuditionAlertIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Browse');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get reels based on current mode and tab
  const getCurrentReels = () => {
    if (activeTab === 'following') {
      return userMode === 'work' 
        ? mockFollowingReels.filter(reel => reel.contentType === 'reel') // Only top 3 reels in work mode
        : mockFollowingReels; // All content in fan mode
    }
    return userMode === 'work' ? mockWorkModeReels : mockFanModeReels;
  };
  
  const currentReels = getCurrentReels();
  
  // Handle scroll for reel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const reelHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / reelHeight);
      
      if (newIndex !== currentReelIndex && newIndex < currentReels.length) {
        setCurrentReelIndex(newIndex);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentReelIndex, currentReels.length]);
  
  // Show audition alerts every 8th post in work mode
  useEffect(() => {
    if (userMode === 'work' && activeTab === 'for-you') {
      const timer = setInterval(() => {
        if ((currentReelIndex + 1) % 8 === 0) {
          setShowAuditionAlert(true);
          setAuditionAlertIndex(Math.floor(Math.random() * mockAuditionAlerts.length));
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentReelIndex, userMode, activeTab]);
  
  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  // Toggle video play/pause
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
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Render TikTok-style reel interface
  const renderReelInterface = (reels: any[]) => (
    <div className="relative h-screen overflow-hidden">
      {/* Mode Toggle - Only show on For You tab */}
      {activeTab === 'for-you' && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex bg-black/40 backdrop-blur-md rounded-full p-1">
            <button
              onClick={() => setUserMode('work')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                userMode === 'work'
                  ? 'bg-blue-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              💼 WORK MODE
            </button>
            <button
              onClick={() => setUserMode('fan')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                userMode === 'fan'
                  ? 'bg-purple-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              🎭 FAN MODE
            </button>
          </div>
        </div>
      )}
      
      {/* Following Tab Header */}
      {activeTab === 'following' && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-2">
            <span className="text-white font-medium">Following • Reverse chronological • Zero ads</span>
          </div>
        </div>
      )}
      
      {/* Reels Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {reels.map((reel, index) => (
          <div key={reel.id} className="h-screen snap-start relative bg-black flex items-center justify-center">
            {/* Video */}
            <div className="relative w-full max-w-sm h-full">
              <video
                ref={index === currentReelIndex ? videoRef : null}
                src={reel.video.url}
                poster={reel.video.thumbnail}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                autoPlay={index === currentReelIndex}
                onClick={togglePlayback}
              />
              
              {/* Work Mode Border */}
              {userMode === 'work' && (
                <div className="absolute inset-0 border-4 border-blue-500/50 pointer-events-none" />
              )}
              
              {/* Fan Mode Border */}
              {userMode === 'fan' && (
                <div className="absolute inset-0 border-4 border-purple-500/50 pointer-events-none" />
              )}
              
              {/* Rising Talent Badge */}
              {reel.isRisingTalent && userMode === 'work' && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star size={12} className="mr-1" />
                  RISING TALENT
                </div>
              )}
              
              {/* Live Indicator */}
              {reel.contentType === 'live' && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  LIVE NOW
                </div>
              )}
              
              {/* Casting Call Indicator */}
              {reel.contentType === 'casting' && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  CASTING CALL
                </div>
              )}
              
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={reel.userAvatar}
                    alt={reel.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="text-white font-semibold">{reel.username}</span>
                      {reel.isVerified && (
                        <CheckCircle size={16} className="text-blue-400 ml-1" />
                      )}
                    </div>
                    <span className="text-white/70 text-sm">{reel.profession}</span>
                  </div>
                  
                  {userMode === 'work' && reel.trustScore && (
                    <div className="ml-auto flex items-center bg-amber-500/20 px-2 py-1 rounded-full">
                      <Award size={12} className="text-amber-400 mr-1" />
                      <span className="text-amber-400 text-xs font-medium">{reel.trustScore}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-white mb-3">{reel.caption}</p>
                
                {/* Casting Info */}
                {reel.contentType === 'casting' && reel.castingInfo && (
                  <div className="bg-green-500/20 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1" />
                        <span className="font-semibold">{reel.castingInfo.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{reel.castingInfo.deadline}</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mt-1">{reel.castingInfo.applicants} applicants</p>
                  </div>
                )}
                
                {/* Live Info */}
                {reel.contentType === 'live' && reel.liveInfo && (
                  <div className="bg-red-500/20 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-white">
                      <Eye size={16} className="mr-1" />
                      <span className="font-semibold">{reel.liveInfo.viewers} viewers</span>
                    </div>
                  </div>
                )}
                
                {/* Music Info */}
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 animate-spin">
                    <Music size={12} className="text-black" />
                  </div>
                  <span className="text-white/80 text-sm">
                    {reel.music.title} • {reel.music.artist}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Action Panel */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
              {/* Profile Picture with Follow */}
              <div className="relative">
                <img
                  src={reel.userAvatar}
                  alt={reel.username}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                {!reel.isFollowing && (
                  <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <Plus size={14} className="text-white" />
                  </button>
                )}
              </div>
              
              {/* Like */}
              <div className="flex flex-col items-center">
                <button className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reel.isLiked ? 'text-red-500' : 'text-white'
                }`}>
                  <Heart size={24} fill={reel.isLiked ? '#ef4444' : 'none'} />
                </button>
                <span className="text-white text-xs font-medium">{formatNumber(reel.likes)}</span>
              </div>
              
              {/* Comment */}
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <MessageCircle size={24} />
                </button>
                <span className="text-white text-xs font-medium">{reel.comments}</span>
              </div>
              
              {/* Bookmark */}
              <div className="flex flex-col items-center">
                <button className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reel.isBookmarked ? 'text-yellow-400' : 'text-white'
                }`}>
                  <Bookmark size={24} fill={reel.isBookmarked ? '#facc15' : 'none'} />
                </button>
                <span className="text-white text-xs font-medium">{reel.bookmarks}</span>
              </div>
              
              {/* Share */}
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <Share2 size={24} />
                </button>
                <span className="text-white text-xs font-medium">{reel.shares}</span>
              </div>
              
              {/* More */}
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                <MoreHorizontal size={24} />
              </button>
            </div>
          </div>
        ))}
        
        {/* Insert Audition Alert every 8th post in Work Mode */}
        {userMode === 'work' && activeTab === 'for-you' && showAuditionAlert && (
          <div className="h-screen snap-start bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">AUDITION ALERT</h2>
                <div className="flex items-center justify-center text-orange-600">
                  <Zap size={16} className="mr-1" />
                  <span className="font-medium">Urgent Casting Call</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {mockAuditionAlerts[auditionAlertIndex].title}
                  </h3>
                  <p className="text-gray-600">{mockAuditionAlerts[auditionAlertIndex].studio}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <DollarSign size={18} className="mr-1" />
                    <span className="font-semibold">{mockAuditionAlerts[auditionAlertIndex].budget}</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm font-medium">{mockAuditionAlerts[auditionAlertIndex].deadline}</span>
                  </div>
                </div>
                
                <p className="text-gray-700">{mockAuditionAlerts[auditionAlertIndex].description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Requirements:</h4>
                  <ul className="space-y-1">
                    {mockAuditionAlerts[auditionAlertIndex].requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-gray-500">
                    {mockAuditionAlerts[auditionAlertIndex].applicants} applicants
                  </span>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAuditionAlert(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Skip
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700">
                      APPLY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Scroll Indicators */}
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-2">
        {currentReels.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-colors ${
              index === currentReelIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
  
  // Render Twitch-style Live Feed
  const renderLiveFeed = () => (
    <div className="min-h-screen bg-gray-50 pt-16"> {/* Added pt-16 to account for top navigation */}
      <div className="max-w-screen-xl mx-auto flex">
        {/* Left Sidebar - Following Channels */}
        <div className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto"> {/* Adjusted height */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-4">LIVE CHANNELS ({mockLiveStreams.length})</h3>
            <div className="space-y-3">
              {mockLiveStreams.map((stream) => (
                <div key={stream.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="relative mr-3">
                    <img
                      src={stream.avatar}
                      alt={stream.streamer}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{stream.streamer}</p>
                    <p className="text-sm text-gray-600 truncate">{stream.title}</p>
                    <p className="text-xs text-gray-500">{stream.viewers.toLocaleString()} viewers</p>
                  </div>
                  <Play size={16} className="text-red-500" />
                </div>
              ))}
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-4 mt-6">OFFLINE CHANNELS ({mockOfflineChannels.length})</h3>
            <div className="space-y-3">
              {mockOfflineChannels.map((channel, index) => (
                <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="relative mr-3">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-8 h-8 rounded-full grayscale"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-600 truncate">{channel.name}</p>
                    <p className="text-xs text-gray-500">Last live {channel.lastSeen}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Top Navigation Bar */}
          <div className="mb-6">
            <div className="flex items-center space-x-6 mb-4">
              {[
                'Browse',
                userMode === 'work' ? 'Auditions' : 'Just Chatting',
                'Voice Acting',
                userMode === 'work' ? 'Workshops' : 'Gaming',
                'Music',
                userMode === 'work' ? 'Dubbing Sessions' : 'Fan Q&A'
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              
              {/* Search */}
              <div className="relative ml-auto">
                <input
                  type="text"
                  placeholder="Search streams..."
                  className="w-64 py-2 pl-10 pr-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* Stream Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLiveStreams.map((stream) => (
              <div key={stream.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Live Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                    LIVE
                  </div>
                  
                  {/* Viewer Count */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {stream.viewers.toLocaleString()} viewers
                  </div>
                  
                  {/* Language Tag */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Zap size={12} className="mr-1" />
                    Live in: {stream.language}
                  </div>
                  
                  {/* Category Tag */}
                  <div className="absolute bottom-2 right-2 bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    {stream.category}
                  </div>
                  
                  {/* Work Mode Enhancements */}
                  {userMode === 'work' && stream.category === 'Auditions' && (
                    <div className="absolute inset-0 border-4 border-amber-400 pointer-events-none"></div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={stream.avatar}
                      alt={stream.streamer}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 line-clamp-2 mb-1">
                        {stream.title}
                      </h3>
                      <p className="text-sm text-gray-600">{stream.streamer}</p>
                      <p className="text-xs text-gray-500">{stream.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Categories Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Voice Acting', viewers: '2.1K', image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=300' },
                { name: 'Music Production', viewers: '1.8K', image: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=300' },
                { name: 'Film Making', viewers: '3.2K', image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=300' },
                { name: 'Art & Design', viewers: '1.5K', image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=300' },
                { name: userMode === 'work' ? 'Workshops' : 'Gaming', viewers: '5.7K', image: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=300' },
                { name: 'Tutorials', viewers: '892', image: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=300' }
              ].map((category) => (
                <div key={category.name} className="relative group cursor-pointer">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex flex-col justify-end p-3">
                    <h3 className="text-white font-semibold">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.viewers} viewers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation - MAXIMUM Z-INDEX FOR FULLSCREEN VISIBILITY */}
      <div className="bg-black border-b border-gray-800 fixed top-0 left-0 right-0 z-[99999]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { id: 'for-you', label: 'For You' },
              { id: 'following', label: 'Following' },
              { id: 'live', label: 'LIVE' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as HomeTab)}
                className={`py-4 px-2 font-medium text-lg border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
                {tab.id === 'live' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full ml-2 inline-block animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tab Content - Adjusted for fixed navigation */}
      <div className="pt-16"> {/* Added padding-top to account for fixed navigation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'for-you' && renderReelInterface(currentReels)}
            {activeTab === 'following' && renderReelInterface(currentReels)}
            {activeTab === 'live' && renderLiveFeed()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Commercial Ads for Fan Mode */}
      {userMode === 'fan' && activeTab === 'for-you' && (
        <div className="fixed bottom-20 left-4 right-4 z-50 pointer-events-none">
          <AnimatePresence>
            {Math.random() > 0.7 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-lg p-4 shadow-lg pointer-events-auto max-w-sm mx-auto"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={mockCommercialAds[0].image}
                    alt={mockCommercialAds[0].brand}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{mockCommercialAds[0].title}</h4>
                    <p className="text-sm text-gray-600">{mockCommercialAds[0].description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-green-600">{mockCommercialAds[0].price}</span>
                      <button className="px-3 py-1 bg-purple-500 text-white rounded text-sm font-medium">
                        {mockCommercialAds[0].cta}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default HomePage;