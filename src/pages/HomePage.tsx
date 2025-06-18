import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Play, Pause, 
  VolumeX, Volume2, Plus, CheckCircle, Music, Search, User, Home,
  Compass, Users, Radio, Bell, Settings, ArrowUp, ArrowDown, Send,
  Star, Crown, Award, Clock, DollarSign, Eye, Briefcase, Zap,
  ChevronRight, MapPin, Calendar, Filter, TrendingUp, Mic, Video, 
  Camera, Hash, Gift, Target, Flame, ThumbsUp, Smile, AtSign,
  Maximize, Minimize, Settings as SettingsIcon, UserPlus, 
  MessageSquare, Gamepad2, Palette, Music2, Monitor, Headphones,
  ChevronDown, ChevronUp, ExternalLink, Copy, Share, Sparkles,
  AlertCircle, ShoppingCart, Coffee, Coins, Banknote
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

// Mock Live Streams Data (Twitch-style)
const mockLiveStreams = [
  {
    id: 'live1',
    streamer: {
      username: 'VoiceActorPro',
      displayName: 'Maya | Voice Acting Coach',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: true,
      isPartner: true
    },
    title: 'Live Voice Acting Workshop - Character Development & Emotion',
    category: 'Voice Acting',
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 2847,
    duration: '2:34:12',
    tags: ['Voice Acting', 'Workshop', 'Character Development', 'Tutorial'],
    isLive: true,
    language: 'English',
    isMature: false
  },
  {
    id: 'live2',
    streamer: {
      username: 'FilmDirectorLive',
      displayName: 'Alex | Indie Film Director',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: true,
      isPartner: false
    },
    title: 'Behind the Scenes: Directing My First Feature Film',
    category: 'Film & TV',
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 1523,
    duration: '1:45:30',
    tags: ['Film Direction', 'Behind the Scenes', 'Indie Film', 'Cinematography'],
    isLive: true,
    language: 'English',
    isMature: false
  },
  {
    id: 'live3',
    streamer: {
      username: 'MusicComposer',
      displayName: 'Sarah | Game Music Composer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: false,
      isPartner: true
    },
    title: 'Composing Epic Boss Battle Music - Live Creation Process',
    category: 'Music & Audio',
    thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 892,
    duration: '3:12:45',
    tags: ['Music Composition', 'Game Audio', 'Live Creation', 'Boss Music'],
    isLive: true,
    language: 'English',
    isMature: false
  },
  {
    id: 'live4',
    streamer: {
      username: 'ActingCoach',
      displayName: 'Emma | Method Acting Coach',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: true,
      isPartner: true
    },
    title: 'Method Acting Masterclass: Emotional Range & Character Building',
    category: 'Acting',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 3421,
    duration: '1:23:18',
    tags: ['Method Acting', 'Masterclass', 'Character Building', 'Emotional Range'],
    isLive: true,
    language: 'English',
    isMature: false
  },
  {
    id: 'live5',
    streamer: {
      username: 'DigitalArtist',
      displayName: 'Jordan | Concept Artist',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: false,
      isPartner: false
    },
    title: 'Creating Sci-Fi Character Concepts for Indie Game',
    category: 'Art & Design',
    thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 567,
    duration: '0:45:22',
    tags: ['Concept Art', 'Character Design', 'Sci-Fi', 'Game Art'],
    isLive: true,
    language: 'English',
    isMature: false
  },
  {
    id: 'live6',
    streamer: {
      username: 'StandUpComedian',
      displayName: 'Mike | Stand-Up Comedian',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: true,
      isPartner: true
    },
    title: 'Writing Comedy Material - Open Mic Night Prep',
    category: 'Comedy',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    viewers: 1234,
    duration: '2:15:33',
    tags: ['Stand-Up Comedy', 'Writing', 'Open Mic', 'Comedy Material'],
    isLive: true,
    language: 'English',
    isMature: true
  }
];

// Mock Categories
const mockCategories = [
  { id: 'voice-acting', name: 'Voice Acting', icon: Mic, viewers: 12500, color: 'from-purple-500 to-pink-500' },
  { id: 'film-tv', name: 'Film & TV', icon: Video, viewers: 8900, color: 'from-blue-500 to-cyan-500' },
  { id: 'music-audio', name: 'Music & Audio', icon: Music2, viewers: 6700, color: 'from-green-500 to-emerald-500' },
  { id: 'acting', name: 'Acting', icon: Users, viewers: 5400, color: 'from-red-500 to-orange-500' },
  { id: 'art-design', name: 'Art & Design', icon: Palette, viewers: 4200, color: 'from-indigo-500 to-purple-500' },
  { id: 'comedy', name: 'Comedy', icon: Smile, viewers: 3100, color: 'from-yellow-500 to-orange-500' },
  { id: 'writing', name: 'Writing', icon: MessageSquare, viewers: 2800, color: 'from-teal-500 to-blue-500' },
  { id: 'tech', name: 'Tech & Software', icon: Monitor, viewers: 1900, color: 'from-gray-500 to-slate-500' }
];

// Mock Chat Messages
const mockChatMessages = [
  {
    id: '1',
    username: 'VoiceFan2024',
    message: 'This is so helpful! Thank you for the tips 🎭',
    timestamp: '2:34:12',
    badges: ['subscriber'],
    color: '#FF6B6B'
  },
  {
    id: '2',
    username: 'Aspiring_VA',
    message: 'How do you practice emotional range?',
    timestamp: '2:34:15',
    badges: [],
    color: '#4ECDC4'
  },
  {
    id: '3',
    username: 'GameDevStudio',
    message: 'We should collaborate on our next project!',
    timestamp: '2:34:18',
    badges: ['verified', 'subscriber'],
    color: '#45B7D1'
  },
  {
    id: '4',
    username: 'VoiceCoach_Pro',
    message: 'Great technique demonstration! 👏',
    timestamp: '2:34:22',
    badges: ['moderator'],
    color: '#96CEB4'
  },
  {
    id: '5',
    username: 'NewStreamer',
    message: 'First time watching, this is amazing!',
    timestamp: '2:34:25',
    badges: [],
    color: '#FFEAA7'
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
  
  // Live section state
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [isFollowingStreamer, setIsFollowingStreamer] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
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
  
  // Simulate live chat updates
  useEffect(() => {
    if (activeTab === 'live' && selectedStream) {
      const interval = setInterval(() => {
        const newMessage = {
          id: Date.now().toString(),
          username: `User${Math.floor(Math.random() * 1000)}`,
          message: ['Great stream!', 'Love this content!', 'So helpful!', 'Amazing work!'][Math.floor(Math.random() * 4)],
          timestamp: new Date().toLocaleTimeString(),
          badges: Math.random() > 0.7 ? ['subscriber'] : [],
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        setChatMessages(prev => [...prev.slice(-50), newMessage]);
      }, 3000 + Math.random() * 5000);
      
      return () => clearInterval(interval);
    }
  }, [activeTab, selectedStream]);
  
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
  
  // Send chat message
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        username: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString(),
        badges: ['subscriber'],
        color: '#9146FF'
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
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
  
  // Render Live Stream Interface (Twitch-style)
  const renderLiveInterface = () => {
    if (!selectedStream) {
      // Live streams grid/browse view
      return (
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Categories Bar */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center space-x-4 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === null
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All Categories
              </button>
              {mockCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <category.icon size={16} />
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({formatNumber(category.viewers)})</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Live Streams Grid */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Live Channels</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search live streams..."
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-purple-500"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockLiveStreams.map((stream) => (
                <motion.div
                  key={stream.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedStream(stream.id)}
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
                      {formatNumber(stream.viewers)}
                    </div>
                    
                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {stream.duration}
                    </div>
                    
                    {/* Mature Content Warning */}
                    {stream.isMature && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        18+
                      </div>
                    )}
                  </div>
                  
                  {/* Stream Info */}
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={stream.streamer.avatar}
                        alt={stream.streamer.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate mb-1">
                          {stream.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-gray-400 text-sm">{stream.streamer.displayName}</span>
                          {stream.streamer.isVerified && (
                            <CheckCircle size={14} className="text-purple-500" />
                          )}
                          {stream.streamer.isPartner && (
                            <Crown size={14} className="text-yellow-500" />
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">{stream.category}</div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {stream.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {stream.tags.length > 2 && (
                            <span className="text-gray-400 text-xs">
                              +{stream.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Individual stream view
    const currentStream = mockLiveStreams.find(s => s.id === selectedStream);
    if (!currentStream) return null;
    
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Stream Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedStream(null)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white"
            >
              <ChevronDown size={20} />
              <span>Back to Browse</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                <SettingsIcon size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Stream Layout */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Player */}
          <div className={`${isFullscreen ? 'w-full' : 'flex-1'} bg-black relative`}>
            <div className="aspect-video w-full h-full">
              <img
                src={currentStream.thumbnail}
                alt={currentStream.title}
                className="w-full h-full object-cover"
              />
              
              {/* Live Overlay */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                LIVE
              </div>
              
              {/* Viewer Count */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Eye size={14} className="mr-1" />
                {formatNumber(currentStream.viewers)} viewers
              </div>
              
              {/* Stream Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                    <Volume2 size={20} />
                  </button>
                  <div className="text-white text-sm">
                    {currentStream.duration}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                    <Share size={18} />
                  </button>
                  <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Stream Info Below Video */}
            {!isFullscreen && (
              <div className="p-6 bg-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-white mb-2">
                      {currentStream.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{currentStream.category}</span>
                      <span>•</span>
                      <span>{currentStream.language}</span>
                      {currentStream.isMature && (
                        <>
                          <span>•</span>
                          <span className="text-red-400">Mature Content</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsFollowingStreamer(!isFollowingStreamer)}
                      className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                        isFollowingStreamer
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <Heart size={16} fill={isFollowingStreamer ? '#fff' : 'none'} />
                      <span>{isFollowingStreamer ? 'Following' : 'Follow'}</span>
                    </button>
                    
                    <button
                      onClick={() => setIsSubscribed(!isSubscribed)}
                      className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                        isSubscribed
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      <Star size={16} fill={isSubscribed ? '#fff' : 'none'} />
                      <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                    </button>
                    
                    <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                      <Gift size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Streamer Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={currentStream.streamer.avatar}
                    alt={currentStream.streamer.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">
                        {currentStream.streamer.displayName}
                      </span>
                      {currentStream.streamer.isVerified && (
                        <CheckCircle size={16} className="text-purple-500" />
                      )}
                      {currentStream.streamer.isPartner && (
                        <Crown size={16} className="text-yellow-500" />
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">
                      @{currentStream.streamer.username}
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentStream.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-600 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Panel */}
          {!isFullscreen && (
            <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Stream Chat</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-white">
                      <SettingsIcon size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-2">
                    <div className="flex items-center space-x-1">
                      {message.badges.includes('moderator') && (
                        <div className="w-4 h-4 bg-green-600 rounded text-xs flex items-center justify-center">
                          <CheckCircle size={10} />
                        </div>
                      )}
                      {message.badges.includes('subscriber') && (
                        <div className="w-4 h-4 bg-purple-600 rounded text-xs flex items-center justify-center">
                          <Star size={10} />
                        </div>
                      )}
                      {message.badges.includes('verified') && (
                        <div className="w-4 h-4 bg-blue-600 rounded text-xs flex items-center justify-center">
                          <CheckCircle size={10} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: message.color }}
                        >
                          {message.username}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-white text-sm break-words">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700">
                <form onSubmit={sendChatMessage} className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Say something..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <button type="button" className="text-gray-400 hover:text-white">
                        <Smile size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!chatMessage.trim()}
                    className={`p-2 rounded-lg ${
                      chatMessage.trim()
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
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
      
      {/* Content based on active tab */}
      <div className="pt-16">
        {activeTab === 'live' ? (
          renderLiveInterface()
        ) : (
          // TikTok-style Video Feed for For You and Following
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
                  
                  {/* Right Action Panel - Moved Lower */}
                  <div className="absolute right-2 bottom-6 flex flex-col items-center space-y-4">
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
                    
                    {/* Comments Button */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setShowComments(true)}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform active:scale-125"
                      >
                        <MessageCircle size={26} />
                      </button>
                      <span className="text-white text-xs font-semibold mt-1">
                        {formatNumber(video.comments)}
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
        )}
      </div>
      
      {/* Scroll Progress Indicators - Only show for video feeds */}
      {activeTab !== 'live' && (
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
      )}
      
      {/* Comments Modal */}
      {renderCommentsModal()}
    </div>
  );
};

export default HomePage;