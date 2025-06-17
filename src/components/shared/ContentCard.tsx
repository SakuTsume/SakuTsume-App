import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Star, Crown, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentCardProps {
  id: string;
  username: string;
  userAvatar: string;
  profession: string;
  media: {
    type: 'image' | 'video' | 'audio';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  isRisingTalent?: boolean;
  trustScore?: number;
  workMode?: boolean;
  timestamp?: string;
  isFollowing?: boolean;
  isCastingCall?: boolean;
  budget?: string;
  onLike?: (contentId: string, isLiked: boolean) => void;
  onSave?: (contentId: string, isSaved: boolean) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  username,
  userAvatar,
  profession,
  media,
  caption,
  likes,
  comments,
  isLiked,
  isSaved,
  isRisingTalent = false,
  trustScore,
  workMode = false,
  timestamp,
  isFollowing = false,
  isCastingCall = false,
  onLike,
  onSave,
}) => {
  const handleLike = () => {
    if (onLike) {
      onLike(id, !isLiked);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(id, !isSaved);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white overflow-hidden"
    >
      {/* User info */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={userAvatar}
              alt={username}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            {isRisingTalent && workMode && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                <Star size={10} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-neutral-800">{username}</h3>
              {isRisingTalent && workMode && (
                <Crown size={14} className="ml-2 text-amber-500" />
              )}
            </div>
            <p className="text-sm text-neutral-500">{profession}</p>
            {timestamp && (
              <p className="text-xs text-neutral-400">{timestamp}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {trustScore && workMode && (
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
              <Award size={12} className="text-blue-600 mr-1" />
              <span className="text-xs font-medium text-blue-800">{trustScore}</span>
            </div>
          )}
          {isFollowing && (
            <button className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
              Following
            </button>
          )}
          {!isFollowing && (
            <button className="px-3 py-1 bg-primary-800 text-white rounded-full text-xs font-medium">
              Follow
            </button>
          )}
        </div>
      </div>
      
      {/* Media content */}
      <div className="relative">
        {media.type === 'image' && (
          <img
            src={media.url}
            alt={caption}
            className="w-full object-cover max-h-[500px]"
          />
        )}
        
        {media.type === 'video' && (
          <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
            <video
              src={media.url}
              poster={media.thumbnail}
              controls
              className="absolute top-0 left-0 w-full h-full object-cover"
            ></video>
          </div>
        )}
        
        {media.type === 'audio' && (
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 flex items-center">
            <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center shadow-lg mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5V19H19V5H5Z" fill="#fff"/>
                <path d="M10 8L16 12L10 16V8Z" fill="#5E17EB"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-white rounded-full"></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-primary-900">
                <span>0:42</span>
                <span>2:18</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Rising Talent Overlay */}
        {isRisingTalent && workMode && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
            <Star size={12} className="mr-1" />
            RISING TALENT
          </div>
        )}
        
        {/* Casting Call Overlay */}
        {isCastingCall && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            CASTING CALL
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex space-x-4">
          <motion.button 
            onClick={handleLike}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center space-x-1 transition-colors ${
              isLiked ? 'text-accent-400' : 'text-neutral-600 hover:text-accent-400'
            }`}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={20} fill={isLiked ? '#FF3366' : 'none'} />
            </motion.div>
            <span className="font-medium">{likes.toLocaleString()}</span>
          </motion.button>
          
          <button className="flex items-center space-x-1 text-neutral-600 hover:text-primary-600 transition-colors">
            <MessageCircle size={20} />
            <span className="font-medium">{comments}</span>
          </button>
          
          <button className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
        
        <motion.button 
          onClick={handleSave}
          whileTap={{ scale: 0.9 }}
          className={`transition-colors ${
            isSaved ? 'text-primary-800' : 'text-neutral-600 hover:text-primary-800'
          }`}
        >
          <motion.div
            animate={isSaved ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Bookmark size={20} fill={isSaved ? '#5E17EB' : 'none'} />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-neutral-800">
          <span className="font-medium">{username}</span> {caption}
        </p>
        
        {/* Work Mode Additional Info */}
        {workMode && trustScore && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-sm text-neutral-600">
              <Award size={14} className="mr-1" />
              <span>Trust Score: {trustScore}/5.0</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Portfolio
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentCard;