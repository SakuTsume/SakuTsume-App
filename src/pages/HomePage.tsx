import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, MessageCircle, Plus, Zap, TrendingUp, 
  Users, Star, Crown, Award, Play, Pause, Volume2, VolumeX,
  Heart, Bookmark, Share2, Filter, ChevronDown, ChevronUp,
  Camera, Video, Mic, PenTool, Briefcase, MapPin, Clock,
  Eye, ThumbsUp, MessageSquare, MoreHorizontal, X
} from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';
import ProfilePreview from '../components/shared/ProfilePreview';
import ServiceCard from '../components/shared/ServiceCard';

// Mock data for the feed
const mockFeedContent = [
  {
    id: 'feed-1',
    username: 'maya_va',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Voice Actor',
    media: {
      type: 'video' as const,
      url: 'https://example.com/maya-horror-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Just finished recording for a new horror game! The villain voice was so much fun to create. What do you think? 🎭 #voiceacting #horror #gamedev',
    likes: 2847,
    comments: 156,
    isLiked: false,
    isSaved: false,
    isRisingTalent: true,
    trustScore: 4.8,
    workMode: true,
    timestamp: '2 hours ago',
    isFollowing: false,
  },
  {
    id: 'feed-2',
    username: 'alexcinema',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Golden hour magic on set today. Sometimes the best shots happen when you least expect them. 📸✨ #cinematography #goldenhour #filmmaking',
    likes: 1923,
    comments: 89,
    isLiked: true,
    isSaved: true,
    timestamp: '4 hours ago',
    isFollowing: true,
  },
  {
    id: 'feed-3',
    username: 'soundscape_pro',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    media: {
      type: 'audio' as const,
      url: 'https://example.com/ambient-forest.mp3',
    },
    caption: 'Created this ambient forest soundscape for an upcoming indie film. Recorded everything on location in the Pacific Northwest. 🌲🎵 #sounddesign #ambient #film',
    likes: 892,
    comments: 34,
    isLiked: false,
    isSaved: false,
    timestamp: '6 hours ago',
    isFollowing: false,
  },
];

// Mock user's liked content storage (in a real app, this would be in a global state or database)
let userLikedContent: string[] = ['feed-2']; // alexcinema's post is already liked

const HomePage: React.FC = () => {
  const [feedContent, setFeedContent] = useState(mockFeedContent);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [selectedStoryType, setSelectedStoryType] = useState<'photo' | 'video' | 'audio' | null>(null);

  // Handle like functionality
  const handleLike = (contentId: string, isLiked: boolean) => {
    // Update the feed content
    setFeedContent(prevContent => 
      prevContent.map(item => {
        if (item.id === contentId) {
          return {
            ...item,
            isLiked,
            likes: isLiked ? item.likes + 1 : item.likes - 1
          };
        }
        return item;
      })
    );

    // Update user's liked content list
    if (isLiked) {
      if (!userLikedContent.includes(contentId)) {
        userLikedContent.push(contentId);
      }
    } else {
      userLikedContent = userLikedContent.filter(id => id !== contentId);
    }

    // In a real app, you would also:
    // 1. Send API request to update like status
    // 2. Update global state/context
    // 3. Sync with user's profile liked content
    console.log('Updated liked content:', userLikedContent);
  };

  // Handle save functionality
  const handleSave = (contentId: string, isSaved: boolean) => {
    setFeedContent(prevContent => 
      prevContent.map(item => {
        if (item.id === contentId) {
          return {
            ...item,
            isSaved
          };
        }
        return item;
      })
    );

    // In a real app, you would also update the user's saved content
    console.log(`Content ${contentId} ${isSaved ? 'saved' : 'unsaved'}`);
  };

  const storyTypes = [
    { type: 'photo' as const, icon: Camera, label: 'Photo', color: 'bg-blue-500' },
    { type: 'video' as const, icon: Video, label: 'Video', color: 'bg-red-500' },
    { type: 'audio' as const, icon: Mic, label: 'Audio', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Story Creator */}
      <div className="md:ml-64">
        <div className="pt-12 min-h-screen">
          {/* Story Creator Section */}
          <div className="flex justify-center px-4 py-6">
            <div className="w-full max-w-sm overflow-hidden">
              <div className="h-full">
                <AnimatePresence mode="wait">
                  {!showStoryCreator ? (
                    <motion.div
                      key="story-prompt"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex-shrink-0"
                    >
                      <div className="w-full bg-black rounded-lg overflow-hidden">
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-500/20"></div>
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 p-8">
                            <div className="text-center">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                                className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
                              >
                                <Plus size={32} />
                              </motion.div>
                              
                              <h2 className="text-2xl font-bold mb-3">Share Your Story</h2>
                              <p className="text-white/80 mb-8 leading-relaxed">
                                What are you working on today? Share your creative process with the community.
                              </p>
                              
                              <button
                                onClick={() => setShowStoryCreator(true)}
                                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
                              >
                                Create Story
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : !selectedStoryType ? (
                    <motion.div
                      key="story-types"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex-shrink-0"
                    >
                      <div className="w-full bg-neutral-900 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold">Choose Story Type</h3>
                            <button
                              onClick={() => setShowStoryCreator(false)}
                              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            {storyTypes.map((type) => (
                              <motion.button
                                key={type.type}
                                onClick={() => setSelectedStoryType(type.type)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors flex items-center"
                              >
                                <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mr-4`}>
                                  <type.icon size={24} className="text-white" />
                                </div>
                                <div className="text-left">
                                  <h4 className="font-semibold">{type.label} Story</h4>
                                  <p className="text-sm text-white/60">
                                    Share your {type.label.toLowerCase()} content
                                  </p>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="story-creator"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex-shrink-0"
                    >
                      <div className="w-full bg-neutral-900 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold">Create {selectedStoryType} Story</h3>
                            <button
                              onClick={() => setSelectedStoryType(null)}
                              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus size={24} />
                              </div>
                              <p className="text-white/60 mb-4">
                                Upload your {selectedStoryType} or drag and drop here
                              </p>
                              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                Choose File
                              </button>
                            </div>
                            
                            <textarea
                              placeholder="Write a caption..."
                              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary-500"
                              rows={3}
                            />
                            
                            <div className="flex space-x-3">
                              <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                                Share Story
                              </button>
                              <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                                Save Draft
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Feed Content */}
          <div className="max-w-screen-md mx-auto px-4 pb-20">
            <div className="space-y-6">
              {feedContent.map((content) => (
                <ContentCard
                  key={content.id}
                  {...content}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;