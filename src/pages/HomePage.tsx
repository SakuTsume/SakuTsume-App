import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Users, Eye, Heart, MessageCircle, Share2, 
  Bookmark, Play, Volume2, VolumeX, MoreHorizontal, Star,
  Crown, Award, Zap, Clock, TrendingUp, Calendar, MapPin,
  ChevronRight, ChevronLeft, Grid3X3, List, Gamepad2,
  Music, Palette, Camera, Mic, Film, Radio, Coffee, Sparkles,
  ChevronUp, ChevronDown, UserPlus
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

// Mock content for TikTok-style reels
const mockReels = [
  {
    id: '1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/maya-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New character voice demo for an upcoming RPG! What do you think of this mysterious villain voice? 🎭 #VoiceActing #RPG #CharacterVoice',
    likes: 1247,
    comments: 89,
    shares: 23,
    isLiked: true,
    isSaved: false,
    isFollowing: true,
    trustScore: 4.8,
    timestamp: '2 hours ago',
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
    shares: 67,
    isLiked: false,
    isSaved: true,
    isFollowing: false,
    trustScore: 4.9,
    timestamp: '4 hours ago',
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
    shares: 34,
    isLiked: true,
    isSaved: false,
    isFollowing: true,
    trustScore: 4.7,
    timestamp: '6 hours ago',
  },
  {
    id: '4',
    username: 'artista_digital',
    userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Digital Artist',
    media: {
      type: 'video' as const,
      url: 'https://example.com/art-process.mp4',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Character design process for a new indie game! From sketch to final render ✨ #DigitalArt #CharacterDesign #GameArt',
    likes: 1534,
    comments: 98,
    shares: 45,
    isLiked: false,
    isSaved: true,
    isFollowing: false,
    trustScore: 4.6,
    timestamp: '8 hours ago',
  },
  {
    id: '5',
    username: 'composer_jane',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Music Composer',
    media: {
      type: 'video' as const,
      url: 'https://example.com/music-composition.mp4',
      thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Composing the main theme for an upcoming fantasy film! What emotions does this melody evoke? 🎼 #FilmScore #Composition #Fantasy',
    likes: 967,
    comments: 76,
    shares: 28,
    isLiked: true,
    isSaved: false,
    isFollowing: true,
    trustScore: 4.8,
    timestamp: '12 hours ago',
  },
];

type HomeTab = 'for-you' | 'following' | 'live';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('for-you');
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  // TikTok-style scroll handling
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (activeTab !== 'for-you' && activeTab !== 'following') return;
      
      e.preventDefault();
      
      if (e.deltaY > 0 && currentReelIndex < mockReels.length - 1) {
        // Scroll down
        setCurrentReelIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentReelIndex > 0) {
        // Scroll up
        setCurrentReelIndex(prev => prev - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'for-you' && activeTab !== 'following') return;
      
      if (e.key === 'ArrowDown' && currentReelIndex < mockReels.length - 1) {
        setCurrentReelIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentReelIndex > 0) {
        setCurrentReelIndex(prev => prev - 1);
      }
    };

    if (activeTab === 'for-you' || activeTab === 'following') {
      window.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, currentReelIndex]);

  // Auto-play current video
  useEffect(() => {
    if (activeTab === 'for-you' || activeTab === 'following') {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentReelIndex && isPlaying) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    }
  }, [currentReelIndex, isPlaying, activeTab]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
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

  const getFilteredReels = () => {
    if (activeTab === 'following') {
      return mockReels.filter(reel => reel.isFollowing);
    }
    return mockReels;
  };

  const filteredReels = getFilteredReels();

  // TikTok-style Reel Component
  const ReelComponent = ({ reel, index, isActive }: { reel: any, index: number, isActive: boolean }) => (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {/* Video/Media */}
      <div className="relative w-full h-full max-w-md mx-auto">
        <video
          ref={(el) => (videoRefs.current[index] = el)}
          src={reel.media.url}
          poster={reel.media.thumbnail}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlayPause}
        />
        
        {/* Play/Pause overlay */}
        {!isPlaying && isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center">
              <Play size={32} className="text-white ml-2" />
            </div>
          </div>
        )}
      </div>

      {/* Right side actions */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        {/* Profile */}
        <div className="relative">
          <img
            src={reel.userAvatar}
            alt={reel.username}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          {!reel.isFollowing && (
            <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <UserPlus size={14} className="text-white" />
            </button>
          )}
        </div>

        {/* Like */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <Heart 
              size={28} 
              className={reel.isLiked ? 'text-red-500 fill-current' : 'text-white'} 
            />
          </div>
          <span className="text-white text-xs font-medium mt-1">
            {formatNumber(reel.likes)}
          </span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <MessageCircle size={28} className="text-white" />
          </div>
          <span className="text-white text-xs font-medium mt-1">
            {formatNumber(reel.comments)}
          </span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <Share2 size={28} className="text-white" />
          </div>
          <span className="text-white text-xs font-medium mt-1">
            {formatNumber(reel.shares)}
          </span>
        </button>

        {/* Save */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <Bookmark 
              size={28} 
              className={reel.isSaved ? 'text-yellow-500 fill-current' : 'text-white'} 
            />
          </div>
        </button>

        {/* More */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <MoreHorizontal size={28} className="text-white" />
          </div>
        </button>

        {/* Sound toggle */}
        <button 
          onClick={toggleMute}
          className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
        >
          {isMuted ? (
            <VolumeX size={16} className="text-white" />
          ) : (
            <Volume2 size={16} className="text-white" />
          )}
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-4 left-4 right-20 text-white">
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">@{reel.username}</span>
          <span className="text-sm opacity-75">{reel.profession}</span>
          {reel.trustScore && (
            <div className="ml-2 flex items-center bg-black/30 px-2 py-1 rounded-full">
              <Star size={12} className="text-yellow-400 mr-1" />
              <span className="text-xs">{reel.trustScore}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm mb-2 line-clamp-3">
          {reel.caption}
        </p>
        
        <div className="flex items-center text-xs opacity-75">
          <span>{reel.timestamp}</span>
        </div>
      </div>

      {/* Navigation hints */}
      {isActive && (
        <>
          {currentReelIndex > 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20 text-white/50">
              <ChevronUp size={24} />
            </div>
          )}
          {currentReelIndex < filteredReels.length - 1 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 text-white/50">
              <ChevronDown size={24} />
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-16">
        {/* Tab Navigation */}
        <div className="bg-black border-b border-neutral-800 sticky top-16 z-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {[
                { id: 'for-you', label: 'For You', icon: Sparkles },
                { id: 'following', label: 'Following', icon: Users },
                { id: 'live', label: 'Live', icon: Radio },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as HomeTab);
                    if (tab.id !== 'live') {
                      setCurrentReelIndex(0);
                    }
                  }}
                  className={`flex items-center px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-white text-white'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
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
        <div ref={containerRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* TikTok-style Reels for For You and Following */}
              {(activeTab === 'for-you' || activeTab === 'following') && (
                <div className="h-[calc(100vh-128px)] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReelIndex}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="h-full"
                    >
                      {filteredReels[currentReelIndex] && (
                        <ReelComponent
                          reel={filteredReels[currentReelIndex]}
                          index={currentReelIndex}
                          isActive={true}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Reel indicators */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                    {filteredReels.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReelIndex(index)}
                        className={`w-1 h-8 rounded-full transition-colors ${
                          index === currentReelIndex ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Empty state for following */}
                  {activeTab === 'following' && filteredReels.length === 0 && (
                    <div className="h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users size={24} className="text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                        <p className="text-neutral-400">Follow some creators to see their content here!</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Live Tab - Keep original Twitch-style layout */}
              {activeTab === 'live' && (
                <div className="min-h-[calc(100vh-128px)] bg-neutral-50 p-6">
                  <div className="max-w-screen-xl mx-auto">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Radio size={24} className="text-neutral-500" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-800 mb-2">Live Streams Coming Soon</h3>
                      <p className="text-neutral-600">We're working on bringing you live streaming features!</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HomePage;