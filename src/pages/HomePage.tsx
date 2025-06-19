import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, 
  Bookmark, Star, Crown, Award, ChevronDown, ChevronUp, 
  Search, Bell, Settings, User, Plus, Zap, TrendingUp,
  Camera, Video, Mic, PenTool, Users, Globe, Clock,
  ArrowRight, Filter, Eye, ThumbsUp, Briefcase, 
  Theater, MoreHorizontal, Send, UserPlus
} from 'lucide-react';

// Enhanced mock data for For You feed with work/fan mode content
const mockForYouFeed = [
  {
    id: '1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    isRisingTalent: true,
    trustScore: 4.8,
    isTopThree: true,
    media: {
      type: 'video' as const,
      url: 'https://example.com/maya-horror-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Horror villain voice for upcoming indie game 🎭 What do you think of this spine-chilling performance?',
    likes: 2847,
    comments: 156,
    shares: 89,
    duration: '0:15',
    isLiked: true,
    isSaved: false,
    timestamp: '2 hours ago',
    isFollowing: false,
    skills: ['Horror VO', 'Character Voices', 'Game VO'],
    workModeOnly: true,
  },
  {
    id: 'ad_1',
    type: 'audition_alert',
    title: 'Sci-Fi Hero Voice Actor Needed',
    company: 'Stellar Games Studio',
    budget: '$2,000',
    deadline: '5 days left',
    description: 'Looking for a heroic male voice for our upcoming space adventure game.',
    tags: ['Voice Acting', 'Sci-Fi', 'Hero Character'],
    applicants: 23,
  },
  {
    id: '2',
    username: 'alexcinema',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    isRisingTalent: false,
    trustScore: 4.9,
    isTopThree: true,
    media: {
      type: 'video' as const,
      url: 'https://example.com/alex-cinematography.mp4',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Golden hour magic ✨ This is why I love being a cinematographer',
    likes: 1923,
    comments: 89,
    shares: 45,
    duration: '0:30',
    isLiked: false,
    isSaved: true,
    timestamp: '4 hours ago',
    isFollowing: false,
    skills: ['Cinematography', 'Lighting', 'Color Grading'],
    workModeOnly: true,
  },
  {
    id: '3',
    username: 'soundscape_sam',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    isRisingTalent: true,
    trustScore: 4.7,
    isTopThree: false,
    media: {
      type: 'audio' as const,
      url: 'https://example.com/ambient-forest.mp3',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Ambient forest soundscape for indie horror film 🌲 Recorded at 3 AM for maximum creepiness',
    likes: 1456,
    comments: 67,
    shares: 23,
    duration: '1:45',
    isLiked: true,
    isSaved: false,
    timestamp: '6 hours ago',
    isFollowing: true,
    skills: ['Sound Design', 'Field Recording', 'Audio Post'],
    workModeOnly: false,
  },
  {
    id: '4',
    username: 'storycraft_emma',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Screenwriter',
    isRisingTalent: false,
    trustScore: 4.6,
    isTopThree: false,
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Late night writing session vibes 📝 Working on a cyberpunk thriller that\'s going to blow your mind!',
    likes: 892,
    comments: 34,
    shares: 12,
    isLiked: false,
    isSaved: true,
    timestamp: '8 hours ago',
    isFollowing: false,
    skills: ['Screenwriting', 'Story Development', 'Character Creation'],
    workModeOnly: false,
  },
];

// Mock following feed data
const mockFollowingFeed = [
  {
    id: 'f1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/maya-rpg-villain.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New RPG Villain Reel 🎭 Just finished this epic character for an upcoming fantasy game!',
    likes: 142,
    comments: 12,
    shares: 8,
    duration: '1:30',
    isLiked: true,
    isSaved: false,
    timestamp: '1 hour ago',
    isFollowing: true,
    isTopThree: true,
  },
  {
    id: 'f2',
    username: 'studiox_casting',
    userAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Casting Director',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'CASTING CALL: Cyberpunk Detective needed for major production! Budget: $3,000. Apply now! 🕵️‍♀️',
    likes: 89,
    comments: 23,
    shares: 45,
    isLiked: false,
    isSaved: true,
    timestamp: '3 hours ago',
    isFollowing: true,
    isCastingCall: true,
    budget: '$3,000',
  },
  {
    id: 'f3',
    username: 'tom_soundguy',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Engineer',
    media: {
      type: 'video' as const,
      url: 'https://example.com/tom-behind-scenes.mp4',
      thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind-the-scenes of our latest recording session 🎙️ The magic happens in post!',
    likes: 89,
    comments: 7,
    shares: 3,
    duration: '4:00',
    isLiked: true,
    isSaved: false,
    timestamp: '5 hours ago',
    isFollowing: true,
    isTopThree: false,
  },
];

type FeedType = 'for-you' | 'following';
type ViewMode = 'work' | 'fan';

const HomePage: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<FeedType>('for-you');
  const [viewMode, setViewMode] = useState<ViewMode>('work');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get filtered content based on feed type and view mode
  const getFilteredContent = () => {
    const baseContent = activeFeed === 'for-you' ? mockForYouFeed : mockFollowingFeed;
    
    if (viewMode === 'work') {
      // Work Mode: Only Top 3 reels for talents
      return baseContent.filter(item => {
        if (item.type === 'audition_alert') return true; // Always show audition alerts
        return item.isTopThree !== false; // Show top 3 content
      });
    } else {
      // Fan Mode: All public content
      return baseContent;
    }
  };

  const filteredContent = getFilteredContent();

  // Auto-advance content
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredContent.length);
    }, 15000); // 15 seconds per item

    return () => clearInterval(timer);
  }, [filteredContent.length]);

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

  const renderContent = (content: any) => {
    // Audition Alert Card
    if (content.type === 'audition_alert') {
      return (
        <div className="h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-sm">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={32} />
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
              AUDITION ALERT
            </div>
            
            <h3 className="text-xl font-bold mb-2">{content.title}</h3>
            <p className="text-white/90 mb-4">{content.description}</p>
            
            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="flex items-center">
                <Briefcase size={16} className="mr-1" />
                <span>{content.budget}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{content.deadline}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-6 justify-center">
              {content.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="w-full py-3 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-white/90 transition-colors">
              APPLY NOW
            </button>
            
            <p className="text-xs text-white/70 mt-2">{content.applicants} applicants so far</p>
          </div>
        </div>
      );
    }

    // Regular Content Card
    return (
      <div className="h-full bg-black relative">
        {/* Media Content */}
        <div className="absolute inset-0">
          {content.media.type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={content.media.url}
                poster={content.media.thumbnail}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
              />
              
              {/* Video Controls */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlayback}
                  className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
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
          ) : content.media.type === 'audio' ? (
            <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic size={32} />
                </div>
                
                {/* Audio waveform visualization */}
                <div className="flex items-center justify-center mb-4 space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/60 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 30 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="bg-white/20 rounded-full px-4 py-2 text-sm">
                  {content.duration}
                </div>
              </div>
            </div>
          ) : (
            <img
              src={content.media.url}
              alt={content.caption}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Overlays */}
        {/* Rising Talent Badge */}
        {content.isRisingTalent && viewMode === 'work' && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
            <Star size={14} className="mr-1" />
            RISING TALENT
          </div>
        )}

        {/* Casting Call Badge */}
        {content.isCastingCall && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            CASTING CALL
          </div>
        )}

        {/* Duration Badge */}
        {content.duration && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {content.duration}
          </div>
        )}

        {/* User Info & Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-end justify-between">
            {/* Left: User Info & Caption */}
            <div className="flex-1 mr-4">
              <div className="flex items-center mb-2">
                <img
                  src={content.userAvatar}
                  alt={content.username}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="text-white font-semibold">{content.username}</h3>
                    {content.isRisingTalent && viewMode === 'work' && (
                      <Crown size={14} className="ml-2 text-amber-400" />
                    )}
                  </div>
                  <p className="text-white/80 text-sm">{content.profession}</p>
                </div>
              </div>
              
              <p className="text-white text-sm mb-2">{content.caption}</p>
              
              {/* Work Mode Additional Info */}
              {viewMode === 'work' && content.trustScore && (
                <div className="flex items-center space-x-4 text-xs text-white/70">
                  <div className="flex items-center">
                    <Award size={12} className="mr-1" />
                    <span>Trust Score: {content.trustScore}/5.0</span>
                  </div>
                  {content.skills && (
                    <div className="flex space-x-1">
                      {content.skills.slice(0, 2).map((skill: string) => (
                        <span key={skill} className="bg-white/20 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col items-center space-y-4">
              {/* Follow/Following Button */}
              <button className={`w-12 h-12 rounded-full flex items-center justify-center ${
                content.isFollowing 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white text-black'
              }`}>
                <UserPlus size={20} />
              </button>

              {/* Like */}
              <div className="text-center">
                <button className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  content.isLiked ? 'text-red-500' : 'text-white'
                }`}>
                  <Heart size={24} fill={content.isLiked ? '#ef4444' : 'none'} />
                </button>
                <span className="text-white text-xs">{content.likes}</span>
              </div>

              {/* Comment */}
              <div className="text-center">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <MessageCircle size={24} />
                </button>
                <span className="text-white text-xs">{content.comments}</span>
              </div>

              {/* Share */}
              <div className="text-center">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <Share2 size={24} />
                </button>
                <span className="text-white text-xs">{content.shares}</span>
              </div>

              {/* Save */}
              <button className={`w-12 h-12 rounded-full flex items-center justify-center ${
                content.isSaved ? 'text-yellow-500' : 'text-white'
              }`}>
                <Bookmark size={24} fill={content.isSaved ? '#eab308' : 'none'} />
              </button>

              {/* More */}
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                <MoreHorizontal size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-8 w-8" />
            <span className="text-xl font-display font-bold text-white">SakuTsume</span>
          </div>

          {/* Feed Toggle */}
          <div className="flex items-center space-x-1 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setActiveFeed('for-you')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFeed === 'for-you'
                  ? 'bg-white text-black'
                  : 'text-white hover:text-white/80'
              }`}
            >
              FOR YOU
            </button>
            <span className="text-white/40">•</span>
            <button
              onClick={() => setActiveFeed('following')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFeed === 'following'
                  ? 'bg-white text-black'
                  : 'text-white hover:text-white/80'
              }`}
            >
              FOLLOWING
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'work' ? 'fan' : 'work')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                viewMode === 'work'
                  ? 'bg-amber-500 text-black'
                  : 'bg-purple-500 text-white'
              }`}
            >
              {viewMode === 'work' ? (
                <>
                  <Briefcase size={16} />
                  <span className="hidden sm:inline">💼 WORK MODE</span>
                </>
              ) : (
                <>
                  <Theater size={16} />
                  <span className="hidden sm:inline">🎭 FAN MODE</span>
                </>
              )}
            </button>

            {/* Profile */}
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full pt-16">
        <div className="h-full overflow-y-auto snap-y snap-mandatory">
          {filteredContent.map((content, index) => (
            <div key={content.id} className="h-full snap-start">
              {renderContent(content)}
            </div>
          ))}
        </div>
      </div>

      {/* Feed Info Indicator */}
      <div className="fixed bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        {activeFeed === 'for-you' ? 'For You' : 'Following'} • {viewMode === 'work' ? 'Work Mode' : 'Fan Mode'}
      </div>

      {/* Content Counter */}
      <div className="fixed bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        {currentIndex + 1} / {filteredContent.length}
      </div>
    </div>
  );
};

export default HomePage;