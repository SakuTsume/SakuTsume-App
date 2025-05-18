import React, { useState, useEffect } from 'react';
import ContentCard from '../components/shared/ContentCard';
import { motion } from 'framer-motion';
import { Filter, TrendingUp, Award, Users } from 'lucide-react';

// Mock data for content feed
const mockData = [
  {
    id: '1',
    username: 'erikafilmmaker',
    userAvatar: 'https://images.pexels.com/photos/3054533/pexels-photo-3054533.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director',
    media: {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Behind the scenes from our latest short film project! Can\'t wait to share more details soon. #filmmaking #director',
    likes: 342,
    comments: 28,
    isLiked: true,
    isSaved: false,
  },
  {
    id: '2',
    username: 'michaelsound',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer',
    media: {
      type: 'audio' as const,
      url: 'https://example.com/audio-file.mp3',
    },
    caption: 'Just finished this custom sound design for an upcoming thriller. Headphones recommended! 🎧 #sounddesign #filmscoring',
    likes: 156,
    comments: 42,
    isLiked: false,
    isSaved: true,
  },
  {
    id: '3',
    username: 'sarahactor',
    userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Actress',
    media: {
      type: 'video' as const,
      url: 'https://example.com/demo-reel.mp4',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'New scene from my showreel! Working with @director_jane was an incredible experience. #acting #showreel',
    likes: 498,
    comments: 56,
    isLiked: false,
    isSaved: false,
  },
];

const categoryFilters = [
  { id: 'all', label: 'All', icon: <TrendingUp size={16} /> },
  { id: 'following', label: 'Following', icon: <Users size={16} /> },
  { id: 'featured', label: 'Featured', icon: <Award size={16} /> },
];

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [feedContent, setFeedContent] = useState(mockData);
  
  // Simulate fetching content based on filter
  useEffect(() => {
    // In a real app, this would be an API call
    console.log(`Fetching content for filter: ${activeFilter}`);
    // For now, just use our mock data
    setFeedContent(mockData);
  }, [activeFilter]);
  
  return (
    <div className="max-w-screen-md mx-auto px-4 py-6">
      {/* Category filters */}
      <div className="mb-6 flex items-center">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2 flex-1">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-primary-800 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span className="mr-1.5">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
        
        <button className="ml-2 p-2 rounded-full bg-white border border-neutral-200 text-neutral-700">
          <Filter size={20} />
        </button>
      </div>
      
      {/* Content feed */}
      <div className="space-y-6">
        {feedContent.map((content) => (
          <ContentCard
            key={content.id}
            {...content}
          />
        ))}
      </div>
      
      {/* Loading indicator */}
      <div className="text-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block w-8 h-8 border-4 border-neutral-300 border-t-primary-600 rounded-full animate-spin"
        ></motion.div>
        <p className="mt-2 text-neutral-500 text-sm">Loading more content...</p>
      </div>
    </div>
  );
};

export default HomePage;