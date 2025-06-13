import React, { useState, useEffect, useRef } from 'react';
import ContentCard from '../components/shared/ContentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, TrendingUp, Award, Users, Play, Eye, Clock, 
  Briefcase, Sparkles, Star, Zap, DollarSign, MapPin,
  Calendar, ChevronRight, Volume2, Mic, Video, Heart,
  MessageCircle, Share2, Bookmark, Crown, AlertCircle,
  UserPlus, Bell, Coffee, Headphones, Camera, Film,
  ChevronUp, ChevronDown, VolumeX
} from 'lucide-react';

// Types
type HomeTab = 'foryou' | 'following' | 'live';
type UserMode = 'work' | 'fan';

interface LiveStream {
  id: string;
  streamer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  title: string;
  category: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  duration?: string;
}

interface AuditionAlert {
  id: string;
  title: string;
  budget: string;
  location: string;
  deadline: string;
  company: string;
  type: string;
  urgent?: boolean;
}

// Enhanced mock data for full-screen experience
const mockForYouContent = [
  {
    id: '1',
    username: 'maya_rising_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/horror-scream.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Spine-chilling villain voice for indie horror game 🎭 What do you think of this character? #VoiceActing #Horror #IndieGame',
    likes: 342,
    comments: 28,
    isLiked: false,
    isSaved: false,
    isRisingTalent: true,
    trustScore: 4.2,
    workMode: true,
  },
  {
    id: '2',
    username: 'alex_cinematics',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Golden hour magic on our latest short film. Sometimes the best shots happen when you least expect them ✨ #Cinematography #GoldenHour',
    likes: 156,
    comments: 42,
    isLiked: true,
    isSaved: false,
    isRisingTalent: false,
    trustScore: 4.8,
    workMode: true,
  },
  {
    id: '3',
    username: 'sarah_actress_pro',
    userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Actress',
    media: {
      type: 'video' as const,
      url: 'https://example.com/demo-reel.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New scene from my showreel! Working with @director_jane was an incredible experience. Can\'t wait to share the full project 🎬',
    likes: 498,
    comments: 56,
    isLiked: false,
    isSaved: true,
    timestamp: '2 hours ago',
    isFollowing: true,
  },
  {
    id: '4',
    username: 'studiox_casting',
    userAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Casting Director',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: '🚨 CASTING CALL: Cyberpunk Detective for upcoming web series. Looking for strong dramatic range and tech-savvy character work. Apply by Friday! #CastingCall #Cyberpunk',
    likes: 89,
    comments: 23,
    isLiked: false,
    isSaved: false,
    timestamp: '4 hours ago',
    isFollowing: true,
    isCastingCall: true,
    budget: '$3,000',
  },
  {
    id: '5',
    username: 'tom_sound_design',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    media: {
      type: 'audio' as const,
      url: 'https://example.com/ambient-track.mp3',
      thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Ambient soundscape for a psychological thriller. Layered field recordings with synthetic textures 🎧 #SoundDesign #FilmAudio',
    likes: 234,
    comments: 31,
    isLiked: false,
    isSaved: false,
    isRisingTalent: false,
    trustScore: 4.6,
    workMode: true,
  },
];

const mockFollowingContent = [
  {
    id: '6',
    username: 'indie_film_collective',
    userAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Collective',
    media: {
      type: 'video' as const,
      url: 'https://example.com/behind-scenes.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind the scenes of our latest indie horror film. The practical effects team outdid themselves! 🎬 #IndieFilm #Horror #BTS',
    likes: 678,
    comments: 89,
    isLiked: true,
    isSaved: false,
    timestamp: '1 hour ago',
    isFollowing: true,
  },
];

const mockLiveStreams: LiveStream[] = [
  {
    id: '1',
    streamer: {
      name: 'Maya VA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
    },
    title: 'Open Auditions - Horror Characters',
    category: 'Auditions',
    viewers: 1247,
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
  },
  {
    id: '2',
    streamer: {
      name: 'StudioX',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
    },
    title: 'Voice Acting Workshop - Emotion Delivery',
    category: 'Workshop',
    viewers: 842,
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
  },
];

const mockAuditionAlerts: AuditionAlert[] = [
  {
    id: '1',
    title: 'Sci-Fi Hero Voice - AAA Game',
    budget: '$2,000 - $5,000',
    location: 'Remote',
    deadline: '3 days left',
    company: 'Nebula Games',
    type: 'Voice Acting',
    urgent: true,
  },
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('foryou');
  const [userMode, setUserMode] = useState<UserMode>('work');
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [feedContent, setFeedContent] = useState(mockForYouContent);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({});
  const [isMuted, setIsMuted] = useState<{[key: string]: boolean}>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement}>({});

  // Update content based on tab
  useEffect(() => {
    if (activeTab === 'foryou') {
      setFeedContent(mockForYouContent);
    } else if (activeTab === 'following') {
      setFeedContent(mockFollowingContent);
    }
    setCurrentPostIndex(0);
  }, [activeTab]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === 'live') return;
      
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPostIndex, feedContent.length, activeTab]);

  // Handle wheel scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeTab === 'live' || isScrolling) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0) {
        scrollToNext();
      } else if (e.deltaY < 0) {
        scrollToPrevious();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentPostIndex, feedContent.length, activeTab, isScrolling]);

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeTab === 'live') return;
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (activeTab === 'live' || isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
    }
  };

  const scrollToNext = () => {
    if (currentPostIndex < feedContent.length - 1 && !isScrolling) {
      setIsScrolling(true);
      setCurrentPostIndex(prev => prev + 1);
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const scrollToPrevious = () => {
    if (currentPostIndex > 0 && !isScrolling) {
      setIsScrolling(true);
      setCurrentPostIndex(prev => prev - 1);
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const toggleVideoPlayback = (postId: string) => {
    const video = videoRefs.current[postId];
    if (video) {
      if (isPlaying[postId]) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(prev => ({ ...prev, [postId]: !prev[postId] }));
    }
  };

  const toggleVideoMute = (postId: string) => {
    const video = videoRefs.current[postId];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(prev => ({ ...prev, [postId]: !prev[postId] }));
    }
  };

  const toggleMode = () => {
    setUserMode(userMode === 'work' ? 'fan' : 'work');
  };

  const renderModeToggle = () => (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-black/20 backdrop-blur-md rounded-full p-1">
        <div className="flex items-center">
          <button
            onClick={toggleMode}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              userMode === 'work'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Briefcase size={16} className="mr-2" />
            Work
          </button>
          <button
            onClick={toggleMode}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              userMode === 'fan'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Sparkles size={16} className="mr-2" />
            Fan
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="fixed top-16 left-0 right-0 z-30 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-center">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'foryou', label: 'For You', icon: TrendingUp },
            { id: 'following', label: 'Following', icon: Users },
            { id: 'live', label: 'Live', icon: Play },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as HomeTab)}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? userMode === 'work'
                    ? 'bg-blue-600/80 text-white border border-blue-400/50'
                    : 'bg-purple-600/80 text-white border border-purple-400/50'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
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
  );

  const renderFullScreenPost = (content: any, index: number) => (
    <div 
      key={content.id}
      className="relative w-full h-screen flex-shrink-0 bg-black overflow-hidden"
    >
      {/* Background Media */}
      <div className="absolute inset-0">
        {content.media.type === 'video' ? (
          <video
            ref={(el) => {
              if (el) videoRefs.current[content.id] = el;
            }}
            src={content.media.url}
            poster={content.media.thumbnail}
            className="w-full h-full object-cover"
            loop
            muted={isMuted[content.id] !== false}
            playsInline
            autoPlay={index === currentPostIndex}
          />
        ) : content.media.type === 'audio' ? (
          <div className="w-full h-full bg-gradient-to-br from-primary-900 via-secondary-800 to-accent-900 flex items-center justify-center relative">
            <img
              src={content.media.thumbnail}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 text-center text-white p-8">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Headphones size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{content.caption.split('.')[0]}</h3>
              
              {/* Audio Visualizer */}
              <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white/60 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 40 + 20}px`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <img
            src={content.media.url}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white z-10">
        {/* Top Section - User Info */}
        <div className="flex items-center justify-between pt-20">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={content.userAvatar}
                alt={content.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
              />
              {content.isRisingTalent && userMode === 'work' && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <Crown size={12} className="text-white" />
                </div>
              )}
            </div>
            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="font-semibold text-lg">{content.username}</h3>
                {content.isRisingTalent && userMode === 'work' && (
                  <Star size={16} className="ml-2 text-amber-400" />
                )}
              </div>
              <p className="text-white/80 text-sm">{content.profession}</p>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            {content.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Bottom Section - Caption & Actions */}
        <div className="pb-20">
          <div className="flex items-end justify-between">
            {/* Left - Caption */}
            <div className="flex-1 mr-4">
              <p className="text-white text-lg leading-relaxed mb-4">
                {content.caption}
              </p>
              
              {userMode === 'work' && content.trustScore && (
                <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full w-fit">
                  <Award size={16} className="text-amber-400 mr-2" />
                  <span className="text-sm font-medium">Trust Score: {content.trustScore}/5.0</span>
                </div>
              )}
            </div>

            {/* Right - Action Buttons */}
            <div className="flex flex-col items-center space-y-6">
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart size={24} className={content.isLiked ? 'text-red-500 fill-current' : 'text-white'} />
              </button>
              <span className="text-sm font-medium">{content.likes}</span>
              
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MessageCircle size={24} className="text-white" />
              </button>
              <span className="text-sm font-medium">{content.comments}</span>
              
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bookmark size={24} className={content.isSaved ? 'text-yellow-400 fill-current' : 'text-white'} />
              </button>
              
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Share2 size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      {content.media.type === 'video' && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
          <button
            onClick={() => toggleVideoPlayback(content.id)}
            className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            {isPlaying[content.id] ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={() => toggleVideoMute(content.id)}
            className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            {isMuted[content.id] ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      )}

      {/* Navigation Hints */}
      {index < feedContent.length - 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center text-white/60 animate-bounce">
          <ChevronDown size={20} />
        </div>
      )}
      
      {index > 0 && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 flex items-center text-white/60">
          <ChevronUp size={20} />
        </div>
      )}
    </div>
  );

  const renderLiveFeed = () => (
    <div className="max-w-screen-md mx-auto px-4 py-6">
      {/* Live Stream Categories */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Auditions', 'Workshops', 'Behind the Scenes', 'Q&A'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              category === 'All'
                ? userMode === 'work'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Live Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockLiveStreams.map((stream) => (
          <motion.div
            key={stream.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer"
          >
            <div className="relative">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-40 object-cover"
              />
              
              {/* Live Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                LIVE
              </div>
              
              {/* Viewer Count */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <Eye size={12} className="mr-1" />
                {stream.viewers.toLocaleString()}
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <Play size={20} className="text-neutral-800 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img
                  src={stream.streamer.avatar}
                  alt={stream.streamer.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-800 text-sm">
                      {stream.streamer.name}
                    </span>
                    {stream.streamer.verified && (
                      <Crown size={12} className="ml-1 text-amber-500" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-500">{stream.category}</span>
                </div>
              </div>
              
              <h3 className="font-medium text-neutral-800 line-clamp-2 mb-2">
                {stream.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>{stream.viewers.toLocaleString()} watching</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Join Stream
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Mode Toggle */}
      {(activeTab === 'foryou' || activeTab === 'following') && renderModeToggle()}
      
      {/* Tab Navigation */}
      {renderTabNavigation()}
      
      {/* Content Area */}
      {activeTab === 'live' ? (
        <div className="pt-32 bg-neutral-50 min-h-screen">
          {renderLiveFeed()}
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="relative h-screen overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex flex-col h-full"
            animate={{ 
              y: `${-currentPostIndex * 100}vh` 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.5
            }}
          >
            {feedContent.map((content, index) => renderFullScreenPost(content, index))}
          </motion.div>
          
          {/* Post Counter */}
          <div className="fixed bottom-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {currentPostIndex + 1} / {feedContent.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;