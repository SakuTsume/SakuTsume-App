import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
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
}

const ContentCard: React.FC<ContentCardProps> = ({
  username,
  userAvatar,
  profession,
  media,
  caption,
  likes,
  comments,
  isLiked,
  isSaved
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
    >
      {/* User info */}
      <div className="flex items-center p-4">
        <img
          src={userAvatar}
          alt={username}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="font-medium text-neutral-800">{username}</h3>
          <p className="text-sm text-neutral-500">{profession}</p>
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
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex space-x-4">
          <button className={`flex items-center space-x-1 ${isLiked ? 'text-accent-400' : 'text-neutral-600'}`}>
            <Heart size={20} fill={isLiked ? '#FF3366' : 'none'} />
            <span>{likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-neutral-600">
            <MessageCircle size={20} />
            <span>{comments}</span>
          </button>
          
          <button className="flex items-center text-neutral-600">
            <Share2 size={20} />
          </button>
        </div>
        
        <button className={isSaved ? 'text-primary-800' : 'text-neutral-600'}>
          <Bookmark size={20} fill={isSaved ? '#5E17EB' : 'none'} />
        </button>
      </div>
      
      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-neutral-800">
          <span className="font-medium">{username}</span> {caption}
        </p>
      </div>
    </motion.div>
  );
};

export default ContentCard;