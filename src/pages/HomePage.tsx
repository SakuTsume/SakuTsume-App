import React, { useState, useEffect, useRef } from 'react';
import ContentCard from '../components/shared/ContentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, TrendingUp, Award, Users, Play, Eye, Clock, 
  Briefcase, Sparkles, Star, Zap, DollarSign, MapPin,
  Calendar, ChevronRight, Volume2, Mic, Video, Heart,
  MessageCircle, Share2, Bookmark, Crown, AlertCircle,
  UserPlus, Bell, Coffee, Headphones, Camera, Film,
  ChevronUp, ChevronDown, VolumeX, Pause, Search,
  Settings, Maximize, MoreHorizontal, UserCheck,
  Gift, ThumbsUp, Send, Smile
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
    followers: number;
  };
  title: string;
  category: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  duration?: string;
  tags: string[];
  language: string;
  mature?: boolean;
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

// Generate infinite content function
const generateContent = (startId: number, count: number) => {
  const baseContent = [
    {
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
    {
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
    {
      username: 'music_composer_pro',
      userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      profession: 'Music Composer',
      media: {
        type: 'audio' as const,
        url: 'https://example.com/epic-score.mp3',
        thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      caption: 'Epic orchestral score for upcoming fantasy film. 60-piece orchestra recorded at Abbey Road Studios 🎼 #FilmScore #Orchestra',
      likes: 445,
      comments: 67,
      isLiked: false,
      isSaved: true,
      isRisingTalent: true,
      trustScore: 4.9,
      workMode: true,
    },
    {
      username: 'animation_studio_x',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      profession: 'Animation Studio',
      media: {
        type: 'video' as const,
        url: 'https://example.com/animation-reel.mp4',
        thumbnail: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      caption: 'Character animation showcase from our latest 2D animated series. Hand-drawn frame by frame! ✨ #Animation #2D #CharacterDesign',
      likes: 892,
      comments: 134,
      isLiked: true,
      isSaved: false,
      isRisingTalent: false,
      trustScore: 4.7,
      workMode: true,
    },
  ];

  const generated = [];
  for (let i = 0; i < count; i++) {
    const baseIndex = i % baseContent.length;
    const content = { ...baseContent[baseIndex] };
    content.id = `${startId + i}`;
    // Randomize some values to make content feel fresh
    content.likes = Math.floor(Math.random() * 1000) + 50;
    content.comments = Math.floor(Math.random() * 100) + 5;
    generated.push(content);
  }
  return generated;
};

// Enhanced live streams data with Twitch-like features
const mockLiveStreams: LiveStream[] = [
  {
    id: '1',
    streamer: {
      name: 'Maya VA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      followers: 12400,
    },
    title: 'Open Auditions - Horror Characters | Live Feedback & Tips',
    category: 'Voice Acting',
    viewers: 1247,
    thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Horror', 'Auditions', 'Voice Acting', 'Interactive'],
    language: 'English',
  },
  {
    id: '2',
    streamer: {
      name: 'StudioX',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      followers: 8900,
    },
    title: 'Voice Acting Workshop - Emotion Delivery Masterclass',
    category: 'Education',
    viewers: 842,
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Workshop', 'Education', 'Voice Acting'],
    language: 'English',
  },
  {
    id: '3',
    streamer: {
      name: 'Tom Sound',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      followers: 3200,
    },
    title: 'Game Dubbing Session - Behind the Scenes Magic',
    category: 'Behind the Scenes',
    viewers: 593,
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Game Audio', 'Dubbing', 'BTS'],
    language: 'English',
  },
  {
    id: '4',
    streamer: {
      name: 'Anime Club',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      followers: 15600,
    },
    title: 'Fan Q&A - Voice Acting Journey & Industry Secrets',
    category: 'Just Chatting',
    viewers: 2431,
    thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Q&A', 'Community', 'Anime'],
    language: 'English',
  },
  {
    id: '5',
    streamer: {
      name: 'FilmCraft Pro',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      followers: 7800,
    },
    title: 'Cinematography Breakdown - Analyzing Famous Scenes',
    category: 'Film Analysis',
    viewers: 1156,
    thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Cinematography', 'Analysis', 'Education'],
    language: 'English',
  },
  {
    id: '6',
    streamer: {
      name: 'IndieGameDev',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      followers: 4500,
    },
    title: 'Live Game Development - Creating Character Voices',
    category: 'Game Development',
    viewers: 678,
    thumbnail: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Game Dev', 'Character Design', 'Voice'],
    language: 'English',
  },
  {
    id: '7',
    streamer: {
      name: 'TheaterPro',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      followers: 2100,
    },
    title: 'Stage Acting Techniques for Voice Work',
    category: 'Theater',
    viewers: 234,
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Theater', 'Acting', 'Techniques'],
    language: 'English',
  },
  {
    id: '8',
    streamer: {
      name: 'MusicComposer',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      followers: 9300,
    },
    title: 'Composing Film Scores Live - Horror Theme Creation',
    category: 'Music Production',
    viewers: 1890,
    thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isLive: true,
    tags: ['Music', 'Film Score', 'Horror', 'Composition'],
    language: 'English',
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
  const [feedContent, setFeedContent] = useState(() => generateContent(1, 20)); // Start with 20 posts
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({});
  const [isMuted, setIsMuted] = useState<{[key: string]: boolean}>({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [showStreamModal, setShowStreamModal] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement}>({});

  // Load more content when approaching the end
  useEffect(() => {
    if (currentPostIndex >= feedContent.length - 3) {
      const newContent = generateContent(feedContent.length + 1, 10);
      setFeedContent(prev => [...prev, ...newContent]);
    }
  }, [currentPostIndex, feedContent.length]);

  // Update content based on tab
  useEffect(() => {
    if (activeTab === 'foryou') {
      setFeedContent(generateContent(1, 20));
    } else if (activeTab === 'following') {
      setFeedContent(generateContent(1, 15));
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
  }, [currentPostIndex, activeTab]);

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
  }, [currentPostIndex, activeTab, isScrolling]);

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
    if (!isScrolling) {
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

  const openStreamModal = (stream: LiveStream) => {
    setSelectedStream(stream);
    setShowStreamModal(true);
  };

  const closeStreamModal = () => {
    setShowStreamModal(false);
    setSelectedStream(null);
  };

  const categories = ['All', 'Voice Acting', 'Education', 'Behind the Scenes', 'Just Chatting', 'Film Analysis', 'Game Development', 'Theater', 'Music Production'];

  const filteredStreams = mockLiveStreams.filter(stream => {
    const matchesCategory = selectedCategory === 'All' || stream.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.streamer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const renderTabNavigation = () => (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-2 h-12">
        {/* Left: Mode Toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleMode}
            className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              userMode === 'work'
                ? 'bg-blue-600 text-white'
                : 'text-white/60'
            }`}
          >
            <Briefcase size={12} className="mr-1" />
            Work
          </button>
          <button
            onClick={toggleMode}
            className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-1 ${
              userMode === 'fan'
                ? 'bg-purple-600 text-white'
                : 'text-white/60'
            }`}
          >
            <Sparkles size={12} className="mr-1" />
            Fan
          </button>
        </div>

        {/* Center: Tab Navigation */}
        <div className="flex items-center">
          {[
            { id: 'foryou', label: 'For You' },
            { id: 'following', label: 'Following' },
            { id: 'live', label: 'Live' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as HomeTab)}
              className={`px-4 py-1 text-white transition-all ${
                activeTab === tab.id
                  ? 'font-bold text-lg'
                  : 'font-normal text-base text-white/70'
              }`}
            >
              {tab.label}
              {tab.id === 'live' && (
                <span className="ml-1 w-1.5 h-1.5 bg-red-500 rounded-full inline-block animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Spacer to balance layout */}
        <div className="w-20"></div>
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
        <div className="flex items-center justify-between pt-12">
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

      {/* Navigation Hints - Only show for first few posts */}
      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center text-white/60 animate-bounce">
          <ChevronDown size={20} />
        </div>
      )}
      
      {index > 0 && index < 3 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex items-center text-white/60">
          <ChevronUp size={20} />
        </div>
      )}
    </div>
  );

  const renderStreamModal = () => (
    <AnimatePresence>
      {showStreamModal && selectedStream && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeStreamModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-neutral-900 rounded-xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Stream Area */}
            <div className="flex-1 flex flex-col">
              {/* Video Player */}
              <div className="relative bg-black aspect-video">
                <img
                  src={selectedStream.thumbnail}
                  alt={selectedStream.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Stream Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Play size={32} className="ml-1" />
                  </button>
                </div>
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  LIVE
                </div>
                
                {/* Viewer Count */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Eye size={14} className="mr-1" />
                  {selectedStream.viewers.toLocaleString()}
                </div>
                
                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                    <Volume2 size={18} />
                  </button>
                  <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                    <Settings size={18} />
                  </button>
                  <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                    <Maximize size={18} />
                  </button>
                </div>
              </div>
              
              {/* Stream Info */}
              <div className="p-6 bg-neutral-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">{selectedStream.title}</h2>
                    <div className="flex items-center space-x-4 text-neutral-400 text-sm">
                      <span>{selectedStream.category}</span>
                      <span>•</span>
                      <span>{selectedStream.language}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={closeStreamModal}
                    className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                
                {/* Streamer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={selectedStream.streamer.avatar}
                      alt={selectedStream.streamer.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-white">{selectedStream.streamer.name}</h3>
                        {selectedStream.streamer.verified && (
                          <Crown size={16} className="ml-2 text-purple-400" />
                        )}
                      </div>
                      <p className="text-neutral-400 text-sm">{selectedStream.streamer.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                      <UserCheck size={16} className="mr-2 inline" />
                      Follow
                    </button>
                    <button className="px-4 py-2 bg-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-600">
                      <Gift size={16} className="mr-2 inline" />
                      Subscribe
                    </button>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedStream.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Chat Sidebar */}
            <div className="w-80 bg-neutral-800 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-neutral-700">
                <h3 className="font-semibold text-white">Stream Chat</h3>
                <p className="text-neutral-400 text-sm">{selectedStream.viewers.toLocaleString()} viewers</p>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {/* Mock chat messages */}
                {[
                  { user: 'VoiceActorFan', message: 'Amazing tips! Thank you!', color: 'text-blue-400' },
                  { user: 'NewbieDubber', message: 'How do you get such clear audio?', color: 'text-green-400' },
                  { user: 'ProVA_Mike', message: 'Great technique demonstration 👏', color: 'text-purple-400' },
                  { user: 'AudioEnthusiast', message: 'This is so helpful for beginners', color: 'text-yellow-400' },
                  { user: 'GameDevStudio', message: 'We should collaborate!', color: 'text-red-400' },
                ].map((msg, index) => (
                  <div key={index} className="text-sm">
                    <span className={`font-medium ${msg.color}`}>{msg.user}: </span>
                    <span className="text-neutral-300">{msg.message}</span>
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-neutral-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Say something..."
                    className="flex-1 px-3 py-2 bg-neutral-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-700">
                    <Send size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white">
                      <Smile size={14} />
                    </button>
                    <button className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white">
                      <Gift size={14} />
                    </button>
                  </div>
                  
                  <button className="text-xs text-neutral-500 hover:text-neutral-300">
                    Chat Rules
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderLiveFeed = () => (
    <div className="w-full bg-neutral-900 text-white min-h-screen">
      {/* Header Section */}
      <div className="bg-neutral-800 border-b border-neutral-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Live Streams</h1>
              <p className="text-neutral-400">Discover live entertainment content from creators worldwide</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search streams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
              
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center">
                <Video size={16} className="mr-2" />
                Go Live
              </button>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Live Streams Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStreams.map((stream) => (
            <motion.div
              key={stream.id}
              whileHover={{ scale: 1.02 }}
              className="bg-neutral-800 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openStreamModal(stream)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Live Badge */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                  LIVE
                </div>
                
                {/* Viewer Count */}
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Eye size={12} className="mr-1" />
                  {stream.viewers.toLocaleString()}
                </div>
                
                {/* Duration for non-live content */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {Math.floor(Math.random() * 3) + 1}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play size={20} className="text-white ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Stream Info */}
              <div className="p-4">
                {/* Streamer Info */}
                <div className="flex items-center mb-3">
                  <img
                    src={stream.streamer.avatar}
                    alt={stream.streamer.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="font-medium text-white text-sm truncate">
                        {stream.streamer.name}
                      </span>
                      {stream.streamer.verified && (
                        <Crown size={12} className="ml-1 text-purple-400 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-neutral-400">{stream.category}</span>
                  </div>
                  
                  <button className="p-1 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                
                {/* Title */}
                <h3 className="font-medium text-white text-sm line-clamp-2 mb-2 leading-tight">
                  {stream.title}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {stream.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-neutral-700 text-neutral-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {stream.tags.length > 2 && (
                    <span className="px-2 py-1 bg-neutral-700 text-neutral-300 rounded text-xs">
                      +{stream.tags.length - 2}
                    </span>
                  )}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>{stream.viewers.toLocaleString()} viewers</span>
                  <span>{stream.language}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video size={24} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No streams found</h3>
            <p className="text-neutral-400">Try adjusting your search or category filters</p>
          </div>
        )}
      </div>
      
      {/* Stream Modal */}
      {renderStreamModal()}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Tab Navigation with Mode Toggle */}
      {renderTabNavigation()}
      
      {/* Content Area */}
      {activeTab === 'live' ? (
        <div className="pt-12">
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
        </div>
      )}
    </div>
  );
};

export default HomePage;