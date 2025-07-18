import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, 
  Bookmark, Star, Crown, Award, ChevronDown, ChevronUp, 
  Search, Bell, Settings, User, Plus, Zap, TrendingUp,
  Camera, Video, Mic, PenTool, Users, Globe, Clock,
  ArrowRight, Filter, Eye, ThumbsUp, Briefcase, 
  Theater, Send, UserPlus, X
} from 'lucide-react';

// Mock comments data
const generateMockComments = (contentId: string) => {
  const comments = [
    {
      id: '1',
      user: {
        name: 'Alex Director',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        verified: true
      },
      text: 'This is incredible work! The emotion in your voice really brings the character to life. 🎭',
      likes: 24,
      time: '2h',
      replies: 3
    },
    {
      id: '2',
      user: {
        name: 'SoundMaster_Pro',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
        verified: false
      },
      text: 'Amazing range! How long have you been voice acting?',
      likes: 12,
      time: '4h',
      replies: 1
    },
    {
      id: '3',
      user: {
        name: 'GameDevStudio',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
        verified: true
      },
      text: 'We\'d love to work with you on our upcoming RPG project! DMing you now.',
      likes: 45,
      time: '6h',
      replies: 0
    },
    {
      id: '4',
      user: {
        name: 'VoiceActingFan',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
        verified: false
      },
      text: 'Your horror voice gives me chills every time! 😱',
      likes: 8,
      time: '8h',
      replies: 0
    },
    {
      id: '5',
      user: {
        name: 'AudioEngineer_Mike',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
        verified: false
      },
      text: 'The audio quality is pristine! What mic setup are you using?',
      likes: 15,
      time: '12h',
      replies: 2
    }
  ];
  
  return comments;
};

// Enhanced mock data generator for infinite scroll
const generateMockContent = (startId: number, count: number) => {
  const professions = ['Voice Actor', 'Cinematographer', 'Sound Designer', 'Screenwriter', 'Director', 'Animator', 'Composer'];
  const usernames = ['maya_va', 'alexcinema', 'soundscape_sam', 'storycraft_emma', 'director_mike', 'anim_sarah', 'composer_jay'];
  const avatars = [
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];
  const thumbnails = [
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  const content = [];
  
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const isAd = (id % 8 === 0); // Audition alert every 8th post
    
    if (isAd) {
      content.push({
        id: `ad_${id}`,
        type: 'audition_alert',
        title: `${['Sci-Fi Hero', 'Fantasy Villain', 'Cyberpunk Detective', 'Horror Narrator'][Math.floor(Math.random() * 4)]} Voice Actor Needed`,
        company: `${['Stellar Games', 'Epic Studios', 'Indie Collective', 'Dream Productions'][Math.floor(Math.random() * 4)]} Studio`,
        budget: `$${[1500, 2000, 2500, 3000, 3500][Math.floor(Math.random() * 5)]}`,
        deadline: `${Math.floor(Math.random() * 7) + 1} days left`,
        description: 'Looking for a talented voice actor for our upcoming project.',
        tags: ['Voice Acting', 'Character Work', 'Professional'],
        applicants: Math.floor(Math.random() * 50) + 10,
      });
    } else {
      const professionIndex = Math.floor(Math.random() * professions.length);
      const mediaTypes = ['video', 'audio', 'image'];
      const mediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
      
      content.push({
        id: `content_${id}`,
        username: usernames[professionIndex] + (Math.random() > 0.5 ? '_pro' : '_artist'),
        userAvatar: avatars[professionIndex],
        profession: professions[professionIndex],
        isRisingTalent: Math.random() > 0.7,
        trustScore: (Math.random() * 1.5 + 3.5).toFixed(1),
        isTopThree: Math.random() > 0.4,
        media: {
          type: mediaType,
          url: `https://example.com/content-${id}.${mediaType === 'audio' ? 'mp3' : 'mp4'}`,
          thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
        },
        caption: [
          'Just finished an amazing project! 🎭',
          'Behind the scenes magic ✨',
          'Working on something special 🎬',
          'New character voice reveal! 🎙️',
          'Creative process in action 🎨',
          'Latest work showcase 🌟'
        ][Math.floor(Math.random() * 6)],
        likes: Math.floor(Math.random() * 5000) + 100,
        comments: Math.floor(Math.random() * 200) + 10,
        shares: Math.floor(Math.random() * 100) + 5,
        duration: mediaType === 'image' ? undefined : `${Math.floor(Math.random() * 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        isLiked: Math.random() > 0.7,
        isSaved: Math.random() > 0.8,
        timestamp: `${Math.floor(Math.random() * 24)} hours ago`,
        isFollowing: Math.random() > 0.6,
        skills: ['Skill A', 'Skill B', 'Skill C'],
        workModeOnly: Math.random() > 0.5,
      });
    }
  }
  
  return content;
};

type FeedType = 'for-you' | 'following';
type ViewMode = 'work' | 'fan';

const HomePage: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<FeedType>('for-you');
  const [viewMode, setViewMode] = useState<ViewMode>('work');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState(() => generateMockContent(1, 20));
  const [likedContent, setLikedContent] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('sakutsume_liked_content');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [savedContent, setSavedContent] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('sakutsume_saved_content');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('sakutsume_following');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [allComments, setAllComments] = useState<{[key: string]: any[]}>(() => {
    const saved = localStorage.getItem('sakutsume_all_comments');
    return saved ? JSON.parse(saved) : {};
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('sakutsume_liked_content', JSON.stringify([...likedContent]));
  }, [likedContent]);

  useEffect(() => {
    localStorage.setItem('sakutsume_saved_content', JSON.stringify([...savedContent]));
  }, [savedContent]);

  useEffect(() => {
    localStorage.setItem('sakutsume_following', JSON.stringify([...followingUsers]));
  }, [followingUsers]);

  useEffect(() => {
    localStorage.setItem('sakutsume_all_comments', JSON.stringify(allComments));
  }, [allComments]);

  // Load content with persisted like/save states
  useEffect(() => {
    setContent(prevContent => 
      prevContent.map(item => ({
        ...item,
        isLiked: likedContent.has(item.id),
        isSaved: savedContent.has(item.id),
        isFollowing: followingUsers.has(item.username),
      }))
    );
  }, [likedContent, savedContent, followingUsers]);

  // Auto-hide instructions after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Load comments when comment section is opened
  useEffect(() => {
    if (showComments && currentContent) {
      const existingComments = allComments[currentContent.id];
      if (existingComments) {
        setComments(existingComments);
      } else {
        const mockComments = generateMockComments(currentContent.id);
        setComments(mockComments);
        setAllComments(prev => ({
          ...prev,
          [currentContent.id]: mockComments
        }));
      }
    }
  }, [showComments, currentIndex, allComments]);

  // Load more content when approaching the end
  const loadMoreContent = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newContent = generateMockContent(content.length + 1, 10);
      const contentWithStates = newContent.map(item => ({
        ...item,
        isLiked: likedContent.has(item.id),
        isSaved: savedContent.has(item.id),
        isFollowing: followingUsers.has(item.username),
      }));
      setContent(prev => [...prev, ...contentWithStates]);
      setIsLoading(false);
    }, 500);
  }, [content.length, isLoading, likedContent, savedContent, followingUsers]);

  // Check if we need to load more content
  useEffect(() => {
    if (currentIndex >= content.length - 5) {
      loadMoreContent();
    }
  }, [currentIndex, content.length, loadMoreContent]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < content.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      } else if (e.key === 'Escape' && showComments) {
        setShowComments(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, content.length, showComments]);

  // Handle touch/swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && currentIndex < content.length - 1) {
        // Swipe up - next content
        setCurrentIndex(prev => prev + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down - previous content
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  // Handle wheel/scroll navigation
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const threshold = 50;

    if (Math.abs(e.deltaY) > threshold) {
      if (e.deltaY > 0 && currentIndex < content.length - 1) {
        // Scroll down - next content
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous content
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, content.length]);

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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
          verified: false
        },
        text: newComment,
        likes: 0,
        time: 'now',
        replies: 0
      };
      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      setAllComments(prev => ({
        ...prev,
        [currentContent.id]: updatedComments
      }));
      setNewComment('');
    }
  };

  const handleLike = (contentId: string) => {
    const wasLiked = likedContent.has(contentId);
    
    // Update liked content set
    setLikedContent(prev => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.delete(contentId);
      } else {
        newSet.add(contentId);
      }
      return newSet;
    });
    
    // Update content state
    setContent(prevContent => 
      prevContent.map(item => {
        if (item.id === contentId) {
          const newLikeCount = wasLiked ? item.likes - 1 : item.likes + 1;
          return {
            ...item,
            likes: newLikeCount,
            isLiked: !wasLiked
          };
        }
        return item;
      })
    );
  };

  const handleSave = (contentId: string) => {
    const wasSaved = savedContent.has(contentId);
    
    // Update saved content set
    setSavedContent(prev => {
      const newSet = new Set(prev);
      if (wasSaved) {
        newSet.delete(contentId);
      } else {
        newSet.add(contentId);
      }
      return newSet;
    });
    
    // Update content state
    setContent(prevContent => 
      prevContent.map(item => {
        if (item.id === contentId) {
          return {
            ...item,
            isSaved: !wasSaved
          };
        }
        return item;
      })
    );
  };

  const handleFollow = (username: string) => {
    const wasFollowing = followingUsers.has(username);
    
    // Update following users set
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (wasFollowing) {
        newSet.delete(username);
      } else {
        newSet.add(username);
      }
      return newSet;
    });
    
    // Update content state
    setContent(prevContent => 
      prevContent.map(item => {
        if (item.username === username) {
          return {
            ...item,
            isFollowing: !wasFollowing
          };
        }
        return item;
      })
    );
  };

  const currentContent = content[currentIndex];

  const renderContent = (contentItem: any) => {
    // Audition Alert Card
    if (contentItem.type === 'audition_alert') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center rounded-2xl">
          <div className="text-center text-white max-w-sm px-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap size={40} />
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              AUDITION ALERT
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{contentItem.title}</h3>
            <p className="text-white/90 mb-6 text-lg">{contentItem.description}</p>
            
            <div className="flex items-center justify-between mb-6 text-lg">
              <div className="flex items-center">
                <Briefcase size={20} className="mr-2" />
                <span className="font-semibold">{contentItem.budget}</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="mr-2" />
                <span>{contentItem.deadline}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {contentItem.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="w-full py-4 bg-white text-orange-600 rounded-xl font-bold text-xl hover:bg-white/90 transition-colors mb-4">
              APPLY NOW
            </button>
            
            <p className="text-sm text-white/70">{contentItem.applicants} applicants so far</p>
          </div>
        </div>
      );
    }

    // Regular Content
    return (
      <div className="w-full h-full relative rounded-2xl overflow-hidden">
        {/* Media Content */}
        {contentItem.media.type === 'video' ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={contentItem.media.url}
              poster={contentItem.media.thumbnail}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              autoPlay={isPlaying}
            />
            
            {/* Video Controls */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlayback}
                className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
            </div>
          </div>
        ) : contentItem.media.type === 'audio' ? (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mic size={48} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{contentItem.caption}</h3>
              
              {/* Audio waveform visualization */}
              <div className="flex items-center justify-center mb-8 space-x-2">
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-white/60 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 40 + 20}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              
              <div className="bg-white/20 rounded-full px-6 py-3 text-lg font-medium">
                {contentItem.duration}
              </div>
            </div>
          </div>
        ) : (
          <img
            src={contentItem.media.url}
            alt={contentItem.caption}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlays */}
        {/* Rising Talent Badge */}
        {contentItem.isRisingTalent && viewMode === 'work' && (
          <div className="absolute top-6 left-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
            <Star size={16} className="mr-2" />
            RISING TALENT
          </div>
        )}

        {/* Duration Badge */}
        {contentItem.duration && (
          <div className="absolute top-6 right-6 bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {contentItem.duration}
          </div>
        )}

        {/* Mute Button */}
        {contentItem.media.type === 'video' && (
          <button
            onClick={toggleMute}
            className="absolute top-20 right-6 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        )}

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex items-end justify-between p-4">
            {/* Left: User Info & Caption */}
            <div className="flex-1 mr-4">
              <div className="flex items-center mb-3">
                <img
                  src={contentItem.userAvatar}
                  alt={contentItem.username}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="text-white font-bold text-base">{contentItem.username}</h3>
                    {contentItem.isRisingTalent && viewMode === 'work' && (
                      <Crown size={14} className="ml-2 text-amber-400" />
                    )}
                  </div>
                  <p className="text-white/80 text-sm">{contentItem.profession}</p>
                </div>
              </div>
              
              <p className="text-white text-base mb-3 leading-relaxed">{contentItem.caption}</p>
              
              {/* Work Mode Additional Info */}
              {viewMode === 'work' && contentItem.trustScore && (
                <div className="flex items-center space-x-3 text-sm text-white/80">
                  <div className="flex items-center">
                    <Award size={12} className="mr-1" />
                    <span>Trust Score: {contentItem.trustScore}/5.0</span>
                  </div>
                  {contentItem.skills && (
                    <div className="flex space-x-1">
                      {contentItem.skills.slice(0, 2).map((skill: string) => (
                        <span key={skill} className="bg-white/20 px-2 py-1 rounded-full text-xs">
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
              <button 
                onClick={() => handleFollow(contentItem.username)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                contentItem.isFollowing 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white text-black'
              }`}
              >
                <UserPlus size={20} />
              </button>

              {/* Like */}
              <div className="text-center">
                <button 
                  onClick={() => handleLike(contentItem.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                    contentItem.isLiked ? 'text-red-500' : 'text-white'
                }`}>
                  <Heart size={24} fill={contentItem.isLiked ? '#ef4444' : 'none'} />
                </button>
                <span className="text-white text-xs font-medium mt-1 block">
                  {contentItem.likes > 999 ? `${(contentItem.likes/1000).toFixed(1)}K` : contentItem.likes}
                </span>
              </div>

              {/* Comment */}
              <div className="text-center">
                <button 
                  onClick={() => setShowComments(true)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                >
                  <MessageCircle size={24} />
                </button>
                <span className="text-white text-xs font-medium mt-1 block">{contentItem.comments}</span>
              </div>

              {/* Share */}
              <div className="text-center">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <Share2 size={24} />
                </button>
                <span className="text-white text-xs font-medium mt-1 block">{contentItem.shares}</span>
              </div>

              {/* Save */}
              <button 
                onClick={() => handleSave(contentItem.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                contentItem.isSaved ? 'text-yellow-500' : 'text-white'
              }`}>
                <Bookmark size={24} fill={contentItem.isSaved ? '#eab308' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-16 px-6 bg-transparent">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-8 w-8" />
            <span className="text-xl font-display font-bold text-white">SakuTsume</span>
          </div>

          {/* Feed Toggle */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveFeed('for-you')}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                activeFeed === 'for-you'
                  ? 'text-white font-bold'
                  : 'text-white/70 hover:text-white/90'
              }`}
            >
              FOR YOU
            </button>
            <span className="text-white/40">•</span>
            <button
              onClick={() => setActiveFeed('following')}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                activeFeed === 'following'
                  ? 'text-white font-bold'
                  : 'text-white/70 hover:text-white/90'
              }`}
            >
              FOLLOWING
            </button>
          </div>

          {/* View Mode Toggle */}
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
                <Briefcase size={18} />
                <span className="hidden sm:inline">💼 WORK MODE</span>
              </>
            ) : (
              <>
                <Theater size={18} />
                <span className="hidden sm:inline">🎭 FAN MODE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content - YouTube Shorts Style */}
      <div className="h-full flex items-center justify-center bg-black relative">
        {/* Centered Reel Container */}
        <div className="w-full max-w-md h-full flex items-center justify-center px-4">
          <div className="w-full aspect-[9/16] max-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {currentContent && renderContent(currentContent)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Comments Section - Slides in from right */}
        <AnimatePresence>
          {showComments && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowComments(false)}
              />
              
              {/* Comments Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-96 bg-white z-50 flex flex-col"
              >
                {/* Comments Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-800">
                    Comments ({comments.length})
                  </h3>
                  <button
                    onClick={() => setShowComments(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-neutral-800 text-sm">
                            {comment.user.name}
                          </span>
                          {comment.user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            </div>
                          )}
                          <span className="text-xs text-neutral-500">{comment.time}</span>
                        </div>
                        <p className="text-neutral-700 text-sm mb-2">{comment.text}</p>
                        <div className="flex items-center space-x-4 text-xs text-neutral-500">
                          <button className="flex items-center space-x-1 hover:text-neutral-700">
                            <Heart size={12} />
                            <span>{comment.likes}</span>
                          </button>
                          {comment.replies > 0 && (
                            <button className="hover:text-neutral-700">
                              {comment.replies} replies
                            </button>
                          )}
                          <button className="hover:text-neutral-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="p-4 border-t border-neutral-200">
                  <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 border border-neutral-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className={`p-2 rounded-full ${
                          newComment.trim()
                            ? 'bg-primary-800 text-white hover:bg-primary-700'
                            : 'bg-neutral-200 text-neutral-400'
                        }`}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Navigation Indicators - Positioned outside the reel */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronUp size={24} />
            </button>
          )}
          {currentIndex < content.length - 1 && (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronDown size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
        {currentIndex + 1} / {content.length}
        {isLoading && <span className="ml-2">Loading...</span>}
      </div>

      {/* Instructions - Auto-hide after 2 seconds */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs"
          >
            Scroll, swipe, or use arrow keys to navigate
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;