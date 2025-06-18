import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Play, Pause, 
  VolumeX, Volume2, Plus, CheckCircle, Music, Search, User, Home,
  Compass, Users, Radio, Bell, Settings, ArrowUp, ArrowDown, Send,
  Star, Crown, Award, Clock, DollarSign, Eye, Briefcase, Zap,
  ChevronRight, MapPin, Calendar, Filter, TrendingUp, Mic, Video, 
  Camera, Hash, Gift, Target, Flame, ThumbsUp, Smile, AtSign
} from 'lucide-react';

// Mock TikTok-style video data
const mockTikTokVideos = [
  {
    id: '1',
    username: 'maya_va',
    displayName: 'Maya Voice Actor',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    isVerified: true,
    video: {
      url: 'https://example.com/maya-horror-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:15'
    },
    caption: 'Spine-chilling villain voice for indie horror game 🎭 This took me weeks to perfect and I\'m so excited to share it with you all! The character development process was incredible and I learned so much about voice modulation techniques. #HorrorVoice #GameDev #VoiceActing #Villain #IndieGame',
    music: {
      title: 'Original Sound',
      artist: 'maya_va',
      isOriginal: true
    },
    likes: 29000,
    comments: 342,
    shares: 156,
    bookmarks: 892,
    isLiked: false,
    isBookmarked: false,
    isFollowing: false,
    timestamp: '2h ago',
    tags: ['#HorrorVoice', '#GameDev', '#VoiceActing', '#Villain', '#IndieGame']
  },
  {
    id: '2',
    username: 'alex_cinematics',
    displayName: 'Alex | Cinematographer',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    isVerified: true,
    video: {
      url: 'https://example.com/alex-cinematic-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:30'
    },
    caption: 'Cinematic lighting techniques that will blow your mind ✨ Follow for more film tips! #Cinematography #FilmMaking #IndieFilm #Lighting #BTS',
    music: {
      title: 'Cinematic Vibes',
      artist: 'FilmScore_Official',
      isOriginal: false
    },
    likes: 156000,
    comments: 2340,
    shares: 1200,
    bookmarks: 4500,
    isLiked: true,
    isBookmarked: false,
    isFollowing: false,
    timestamp: '4h ago',
    tags: ['#Cinematography', '#FilmMaking', '#IndieFilm', '#Lighting', '#BTS']
  },
  {
    id: '3',
    username: 'sarah_composer',
    displayName: 'Sarah | Music Composer',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    isVerified: false,
    video: {
      url: 'https://example.com/sarah-composition.mp4',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '0:45'
    },
    caption: 'Epic orchestral piece for RPG boss battle 🎼 What genre should I compose next? #GameMusic #Orchestral #Composer #RPG #BossMusic',
    music: {
      title: 'Boss Battle Theme',
      artist: 'sarah_composer',
      isOriginal: true
    },
    likes: 89000,
    comments: 1500,
    shares: 700,
    bookmarks: 3200,
    isLiked: false,
    isBookmarked: true,
    isFollowing: true,
    timestamp: '6h ago',
    tags: ['#GameMusic', '#Orchestral', '#Composer', '#RPG', '#BossMusic']
  },
  {
    id: '4',
    username: 'celebrity_actor',
    displayName: 'Hollywood Star',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    isVerified: true,
    video: {
      url: 'https://example.com/celebrity-bts.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '1:20'
    },
    caption: 'Behind the scenes from my latest blockbuster! The stunts were insane 🎬✨ #BTS #Hollywood #Acting #Stunts #Blockbuster',
    music: {
      title: 'Trending Sound',
      artist: 'PopularTrack_2024',
      isOriginal: false
    },
    likes: 2847000,
    comments: 34200,
    shares: 15600,
    bookmarks: 89200,
    isLiked: true,
    isBookmarked: false,
    isFollowing: true,
    timestamp: '1h ago',
    tags: ['#BTS', '#Hollywood', '#Acting', '#Stunts', '#Blockbuster']
  },
  {
    id: '5',
    username: 'indie_filmmaker',
    displayName: 'Indie Film Director',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    isVerified: false,
    video: {
      url: 'https://example.com/indie-film-process.mp4',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      duration: '2:15'
    },
    caption: 'The struggle of indie filmmaking is real but so worth it! 💪 Day 47 of production #IndieFilm #FilmMaker #Passion #BehindTheScenes #Struggle',
    music: {
      title: 'Inspirational Beat',
      artist: 'MotivationMusic',
      isOriginal: false
    },
    likes: 234000,
    comments: 8900,
    shares: 4500,
    bookmarks: 23400,
    isLiked: false,
    isBookmarked: true,
    isFollowing: false,
    timestamp: '8h ago',
    tags: ['#IndieFilm', '#FilmMaker', '#Passion', '#BehindTheScenes', '#Struggle']
  }
];

type HomeTab = 'for-you' | 'following' | 'live';
type ViewMode = 'fan' | 'work';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('for-you');
  const [viewMode, setViewMode] = useState<ViewMode>('fan');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [videos, setVideos] = useState(mockTikTokVideos);
  const [expandedCaptions, setExpandedCaptions] = useState<Set<string>>(new Set());
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll for video navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const videoHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentVideoIndex, videos.length]);
  
  // Auto-play current video
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }, [currentVideoIndex, isPlaying]);
  
  // Format numbers for display (TikTok style)
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
  
  // Handle like action
  const handleLike = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1
          }
        : video
    ));
  };
  
  // Handle bookmark action
  const handleBookmark = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isBookmarked: !video.isBookmarked,
            bookmarks: video.isBookmarked ? video.bookmarks - 1 : video.bookmarks + 1
          }
        : video
    ));
  };
  
  // Handle follow action
  const handleFollow = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, isFollowing: !video.isFollowing }
        : video
    ));
  };
  
  // Toggle caption expansion
  const toggleCaptionExpansion = (videoId: string) => {
    const newExpanded = new Set(expandedCaptions);
    if (newExpanded.has(videoId)) {
      newExpanded.delete(videoId);
    } else {
      newExpanded.add(videoId);
    }
    setExpandedCaptions(newExpanded);
  };
  
  // Truncate caption text
  const getTruncatedCaption = (caption: string, isExpanded: boolean) => {
    const maxLength = 100;
    if (caption.length <= maxLength || isExpanded) {
      return caption;
    }
    return caption.substring(0, maxLength) + '...';
  };
  
  // Mock comments data
  const mockComments = [
    {
      id: '1',
      username: 'voice_fan_2024',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      text: 'This is absolutely incredible! 🔥',
      likes: 23,
      timestamp: '2h ago',
      isLiked: false
    },
    {
      id: '2',
      username: 'game_dev_studio',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100',
      text: 'We need to hire you for our next project!',
      likes: 156,
      timestamp: '1h ago',
      isLiked: true,
      isVerified: true
    },
    {
      id: '3',
      username: 'horror_lover',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      text: 'Gave me chills! Perfect villain voice 😱',
      likes: 89,
      timestamp: '45m ago',
      isLiked: false
    }
  ];
  
  // Render Comments Modal
  const renderCommentsModal = () => (
    <AnimatePresence>
      {showComments && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="fixed inset-0 z-[100000] bg-white"
        >
          {/* Comments Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={() => setShowComments(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowDown size={24} />
            </button>
            <h3 className="font-semibold text-lg">{mockComments.length} comments</h3>
            <div className="w-6"></div>
          </div>
          
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{comment.username}</span>
                    {comment.isVerified && (
                      <CheckCircle size={14} className="text-blue-500" />
                    )}
                    <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-800 mt-1">{comment.text}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-1 text-gray-500">
                      <Heart size={14} fill={comment.isLiked ? '#ef4444' : 'none'} 
                             className={comment.isLiked ? 'text-red-500' : ''} />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="text-gray-500 text-xs">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comment Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Your avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Add comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
                <button className="ml-2 text-gray-500">
                  <Smile size={20} />
                </button>
                <button className="ml-2 text-gray-500">
                  <AtSign size={20} />
                </button>
              </div>
              <button
                disabled={!commentText.trim()}
                className={`px-4 py-2 rounded-full font-semibold ${
                  commentText.trim()
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation - Enhanced with Mode Switch */}
      <div className="fixed top-0 left-0 right-0 z-[99999]">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left side - Empty for balance */}
          <div className="w-24"></div>

          {/* Center - Main Navigation Tabs */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('for-you')}
              className={`font-bold text-lg transition-colors ${
                activeTab === 'for-you' ? 'text-white' : 'text-white/60'
              }`}
            >
              For You
            </button>
            
            <button
              onClick={() => setActiveTab('following')}
              className={`font-bold text-lg transition-colors ${
                activeTab === 'following' ? 'text-white' : 'text-white/60'
              }`}
            >
              Following
            </button>
            
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center space-x-2 font-bold text-lg transition-colors ${
                activeTab === 'live' ? 'text-white' : 'text-white/60'
              }`}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </button>
          </div>

          {/* Right side - Work/Fan Mode Switch */}
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black/60 backdrop-blur-md rounded-full p-0.5 border border-white/20"
            >
              <div className="flex items-center">
                <button
                  onClick={() => setViewMode('fan')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    viewMode === 'fan'
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Heart size={14} />
                    <span>Fan</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setViewMode('work')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    viewMode === 'work'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Briefcase size={14} />
                    <span>Work</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Video Feed */}
      <div className="pt-16">
        <div
          ref={containerRef}
          className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {videos.map((video, index) => (
            <div key={video.id} className="h-[calc(100vh-4rem)] snap-start relative bg-black flex items-center justify-center">
              {/* Video Container */}
              <div className="relative w-full max-w-sm h-full">
                <video
                  ref={index === currentVideoIndex ? videoRef : null}
                  src={video.video.url}
                  poster={video.video.thumbnail}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  autoPlay={index === currentVideoIndex}
                  onClick={togglePlayback}
                  playsInline
                />
                
                {/* Play/Pause Overlay */}
                {!isPlaying && index === currentVideoIndex && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                )}
                
                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                {/* Work Mode Indicator */}
                {viewMode === 'work' && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Briefcase size={12} className="mr-1" />
                    WORK MODE
                  </div>
                )}
                
                {/* Video Info Overlay - Compact Design */}
                <div className="absolute bottom-0 left-0 right-16 bg-gradient-to-t from-black/80 to-transparent p-3">
                  {/* User Info - Smaller and more compact */}
                  <div className="flex items-center mb-2">
                    <img
                      src={video.userAvatar}
                      alt={video.username}
                      className="w-8 h-8 rounded-full border border-white mr-2"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="text-white font-semibold text-sm truncate">@{video.username}</span>
                        {video.isVerified && (
                          <CheckCircle size={12} className="text-blue-400 ml-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Caption - Truncated with show more */}
                  <div className="mb-2">
                    <p className="text-white text-sm leading-relaxed">
                      {getTruncatedCaption(video.caption, expandedCaptions.has(video.id))}
                      {video.caption.length > 100 && (
                        <button
                          onClick={() => toggleCaptionExpansion(video.id)}
                          className="text-white/80 text-sm ml-1 font-medium"
                        >
                          {expandedCaptions.has(video.id) ? 'less' : 'more'}
                        </button>
                      )}
                    </p>
                  </div>
                  
                  {/* Music Info - Smaller */}
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center mr-2 animate-spin">
                      <Music size={8} className="text-black" />
                    </div>
                    <span className="text-white/90 text-xs truncate">
                      {video.music.isOriginal ? 'Original sound' : video.music.title} - {video.music.artist}
                    </span>
                  </div>
                </div>
                
                {/* Right Action Panel - Simplified to 4 Essential Elements */}
                <div className="absolute right-2 bottom-16 flex flex-col items-center space-y-4">
                  {/* Profile Picture with Plus Button */}
                  <div className="relative">
                    <img
                      src={video.userAvatar}
                      alt={video.username}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    {!video.isFollowing && (
                      <button
                        onClick={() => handleFollow(video.id)}
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <Plus size={12} className="text-white" />
                      </button>
                    )}
                  </div>
                  
                  {/* Like Button */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleLike(video.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-125 ${
                        video.isLiked ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      <Heart size={28} fill={video.isLiked ? '#ef4444' : 'none'} />
                    </button>
                    <span className="text-white text-xs font-semibold mt-1">
                      {formatNumber(video.likes)}
                    </span>
                  </div>
                  
                  {/* Bookmark Button (Favorite) */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleBookmark(video.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-125 ${
                        video.isBookmarked ? 'text-yellow-400' : 'text-white'
                      }`}
                    >
                      <Bookmark size={26} fill={video.isBookmarked ? '#facc15' : 'none'} />
                    </button>
                    <span className="text-white text-xs font-semibold mt-1">
                      {formatNumber(video.bookmarks)}
                    </span>
                  </div>
                  
                  {/* Share Button */}
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform active:scale-125">
                      <Share2 size={26} />
                    </button>
                    <span className="text-white text-xs font-semibold mt-1">
                      {formatNumber(video.shares)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll Progress Indicators */}
      <div className="fixed right-1 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-1">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-0.5 h-6 rounded-full transition-colors ${
              index === currentVideoIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
      
      {/* Comments Modal */}
      {renderCommentsModal()}
    </div>
  );
};

export default HomePage;