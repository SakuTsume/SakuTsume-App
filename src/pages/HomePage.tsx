import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, 
  Users, Eye, Settings, Maximize, Send, Gift, Crown, Star, Zap, 
  ChevronDown, ChevronUp, MoreHorizontal, Radio, Mic, MicOff, Camera, CameraOff,
  ThumbsUp, Smile, DollarSign, Award, TrendingUp, Clock, MapPin, Calendar
} from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';

// Mock data for live streams
const mockLiveStreams = [
  {
    id: '1',
    streamer: {
      name: 'VoiceActorPro',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: true,
      followers: 15420
    },
    title: 'Live Voice Acting Session - Horror Game Characters',
    category: 'Voice Acting',
    viewers: 1247,
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/stream1.mp4',
    isLive: true,
    duration: '2:34:15',
    tags: ['Horror', 'Character Voices', 'Interactive']
  },
  {
    id: '2',
    streamer: {
      name: 'FilmDirectorLive',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      isVerified: false,
      followers: 8930
    },
    title: 'Behind the Scenes: Indie Film Production',
    category: 'Film Making',
    viewers: 892,
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/stream2.mp4',
    isLive: true,
    duration: '1:15:42',
    tags: ['Indie Film', 'BTS', 'Q&A']
  }
];

// Mock chat messages
const mockChatMessages = [
  {
    id: '1',
    username: 'HorrorFan92',
    message: 'This villain voice is absolutely terrifying! 😱',
    timestamp: '2:34:12',
    isSubscriber: true,
    isModerator: false,
    badges: ['subscriber']
  },
  {
    id: '2',
    username: 'VoiceCoach_Sarah',
    message: 'Great breath control technique! 👏',
    timestamp: '2:34:15',
    isSubscriber: false,
    isModerator: true,
    badges: ['moderator']
  },
  {
    id: '3',
    username: 'GameDev_Studios',
    message: 'We need to hire you for our next project!',
    timestamp: '2:34:18',
    isSubscriber: true,
    isModerator: false,
    badges: ['subscriber', 'verified']
  },
  {
    id: '4',
    username: 'NewVA_Learning',
    message: 'How do you get that raspy effect?',
    timestamp: '2:34:20',
    isSubscriber: false,
    isModerator: false,
    badges: []
  },
  {
    id: '5',
    username: 'AudioEngineer_Pro',
    message: 'Your mic setup sounds amazing! What are you using?',
    timestamp: '2:34:25',
    isSubscriber: true,
    isModerator: false,
    badges: ['subscriber']
  }
];

// Mock recommended streams
const mockRecommendedStreams = [
  {
    id: '3',
    streamer: 'MusicComposer_Live',
    title: 'Composing Epic Game Soundtrack',
    viewers: 456,
    thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Music Production'
  },
  {
    id: '4',
    streamer: 'AnimationStudio',
    title: '2D Character Animation Workshop',
    viewers: 723,
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Animation'
  },
  {
    id: '5',
    streamer: 'ScriptWriter_Pro',
    title: 'Writing Dialogue for Video Games',
    viewers: 234,
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Writing'
  }
];

// Mock content for For You and Following tabs
const mockContent = [
  {
    id: '1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/maya-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New character voice demo for an upcoming horror game! What do you think of this villain voice? 🎭👹',
    likes: 1247,
    comments: 89,
    isLiked: false,
    isSaved: true,
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
    caption: 'Golden hour magic on set today. Sometimes the best shots happen when you least expect them. 🌅📸',
    likes: 892,
    comments: 45,
    isLiked: true,
    isSaved: false,
    trustScore: 4.9,
    workMode: true,
    timestamp: '4 hours ago',
    isFollowing: false,
  }
];

type HomeTab = 'for-you' | 'following' | 'live';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('for-you');
  const [selectedStream, setSelectedStream] = useState(mockLiveStreams[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [isFollowingStreamer, setIsFollowingStreamer] = useState(false);
  const [showStreamInfo, setShowStreamInfo] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Simulate new chat messages
  useEffect(() => {
    if (activeTab === 'live') {
      const interval = setInterval(() => {
        const newMessage = {
          id: Date.now().toString(),
          username: `User${Math.floor(Math.random() * 1000)}`,
          message: [
            'Amazing work!',
            'Love this stream!',
            'How do you do that?',
            'This is so cool!',
            'Great technique!',
            'Can you do a tutorial?'
          ][Math.floor(Math.random() * 6)],
          timestamp: new Date().toLocaleTimeString(),
          isSubscriber: Math.random() > 0.7,
          isModerator: false,
          badges: Math.random() > 0.7 ? ['subscriber'] : []
        };
        
        setChatMessages(prev => [...prev.slice(-50), newMessage]);
      }, 3000 + Math.random() * 5000);

      return () => clearInterval(interval);
    }
  }, [activeTab]);

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

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        username: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString(),
        isSubscriber: true,
        isModerator: false,
        badges: ['subscriber']
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'subscriber':
        return <Star size={12} className="text-amber-500" />;
      case 'moderator':
        return <Award size={12} className="text-green-500" />;
      case 'verified':
        return <Crown size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Tab Navigation */}
      <div className="bg-black/90 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center space-x-8">
            {[
              { id: 'for-you', label: 'For You' },
              { id: 'following', label: 'Following' },
              { id: 'live', label: 'Live' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as HomeTab)}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
                {tab.id === 'live' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
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
          {/* For You and Following Tabs */}
          {(activeTab === 'for-you' || activeTab === 'following') && (
            <div className="max-w-md mx-auto bg-black min-h-screen">
              <div className="space-y-0">
                {mockContent.map((content) => (
                  <div key={content.id} className="border-b border-neutral-800">
                    <ContentCard
                      {...content}
                      workMode={activeTab === 'following'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Tab - Twitch-like Layout */}
          {activeTab === 'live' && (
            <div className="flex h-[calc(100vh-64px)]">
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col">
                {/* Video Player */}
                <div className="relative bg-black aspect-video">
                  <video
                    ref={videoRef}
                    src={selectedStream.videoUrl}
                    poster={selectedStream.thumbnail}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                  />
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {/* Top Controls */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium flex items-center">
                          <Radio size={12} className="mr-1" />
                          LIVE
                        </div>
                        <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                          {formatViewerCount(selectedStream.viewers)} viewers
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                          <Settings size={18} />
                        </button>
                        <button 
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                        >
                          <Maximize size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlayback}
                        className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                    </div>
                    
                    {/* Bottom Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={toggleMute}
                          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                        >
                          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stream Info */}
                <div className="bg-neutral-900 p-4 border-b border-neutral-800">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-xl font-semibold text-white mb-2">
                        {selectedStream.title}
                      </h1>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={selectedStream.streamer.avatar}
                            alt={selectedStream.streamer.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-white">
                            {selectedStream.streamer.name}
                          </span>
                          {selectedStream.streamer.isVerified && (
                            <Crown size={16} className="text-purple-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center text-neutral-400 text-sm space-x-4">
                          <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            {formatViewerCount(selectedStream.viewers)}
                          </div>
                          <div className="flex items-center">
                            <Users size={14} className="mr-1" />
                            {formatViewerCount(selectedStream.streamer.followers)} followers
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {selectedStream.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                          {selectedStream.category}
                        </span>
                        {selectedStream.tags.map((tag, index) => (
                          <span key={index} className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsFollowingStreamer(!isFollowingStreamer)}
                        className={`px-4 py-2 rounded font-medium transition-colors ${
                          isFollowingStreamer
                            ? 'bg-neutral-700 text-white hover:bg-neutral-600'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {isFollowingStreamer ? 'Following' : 'Follow'}
                      </button>
                      
                      <button className="p-2 bg-neutral-700 rounded text-white hover:bg-neutral-600">
                        <Heart size={18} />
                      </button>
                      
                      <button className="p-2 bg-neutral-700 rounded text-white hover:bg-neutral-600">
                        <Share2 size={18} />
                      </button>
                      
                      <button className="p-2 bg-neutral-700 rounded text-white hover:bg-neutral-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recommended Streams */}
                <div className="flex-1 bg-neutral-900 p-4 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">Recommended for you</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockRecommendedStreams.map((stream) => (
                      <div
                        key={stream.id}
                        onClick={() => setSelectedStream(mockLiveStreams.find(s => s.id === stream.id) || selectedStream)}
                        className="bg-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:bg-neutral-750 transition-colors"
                      >
                        <div className="relative">
                          <img
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                            <Radio size={10} className="mr-1" />
                            LIVE
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                            {formatViewerCount(stream.viewers)}
                          </div>
                        </div>
                        
                        <div className="p-3">
                          <h4 className="font-medium text-white text-sm mb-1 line-clamp-2">
                            {stream.title}
                          </h4>
                          <p className="text-neutral-400 text-xs mb-1">{stream.streamer}</p>
                          <p className="text-purple-400 text-xs">{stream.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Chat Sidebar */}
              <div className="w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-neutral-800">
                  <h3 className="font-semibold text-white flex items-center">
                    <MessageCircle size={18} className="mr-2" />
                    Stream Chat
                  </h3>
                </div>
                
                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  {chatMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                          {message.badges.map((badge, index) => (
                            <span key={index} className="inline-flex">
                              {getBadgeIcon(badge)}
                            </span>
                          ))}
                          <span className={`text-sm font-medium ${
                            message.isModerator ? 'text-green-400' :
                            message.isSubscriber ? 'text-purple-400' : 'text-neutral-300'
                          }`}>
                            {message.username}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-white">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chat Input */}
                <div className="p-4 border-t border-neutral-800">
                  <form onSubmit={sendChatMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Say something..."
                      className="flex-1 bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={!chatMessage.trim()}
                      className={`px-3 py-2 rounded transition-colors ${
                        chatMessage.trim()
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-neutral-700 text-neutral-400'
                      }`}
                    >
                      <Send size={16} />
                    </button>
                  </form>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-2">
                      <button className="p-1 text-neutral-400 hover:text-white">
                        <Smile size={16} />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-white">
                        <Gift size={16} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-neutral-500">
                      {formatViewerCount(selectedStream.viewers)} chatting
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomePage;