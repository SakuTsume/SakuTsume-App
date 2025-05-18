import React, { useState } from 'react';
import { Search, Filter, X, Mic, Camera, Video, PenTool } from 'lucide-react';
import ProfilePreview from '../components/shared/ProfilePreview';
import ServiceCard from '../components/shared/ServiceCard';
import ContentCard from '../components/shared/ContentCard';
import { motion } from 'framer-motion';

// Mock data for search results
const mockProfiles = [
  {
    id: 'profile1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director & Cinematographer',
    bio: 'Award-winning film director with 8+ years of experience specializing in narrative shorts and documentaries. Passionate about visual storytelling and bringing unique perspectives to life.',
    skills: ['Film Direction', 'Cinematography', 'Storytelling', 'Adobe Premiere Pro'],
    following: false,
    rating: 4.9,
  },
  {
    id: 'profile2',
    name: 'Sophia Williams',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Actress & Voice Artist',
    bio: 'Professional actress with experience in theater, film, and voice acting. Looking to connect with directors and producers for upcoming projects.',
    skills: ['Acting', 'Voice Acting', 'Theater', 'Script Analysis'],
    following: true,
    rating: 4.7,
  },
  {
    id: 'profile3',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer & Music Producer',
    bio: 'Experienced sound designer specializing in film scoring and sound effects. Worked on over 30 short films and documentaries.',
    skills: ['Sound Design', 'Music Production', 'Foley Art', 'Film Scoring'],
    following: false,
    rating: 4.8,
  },
];

const mockServices = [
  {
    id: '1',
    title: 'Professional Cinematography for Short Films and Music Videos',
    provider: {
      name: 'Alex Cinematics',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
    },
    category: 'Cinematography',
    image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1200,
    deliveryTime: '7-10 days',
    featured: true,
  },
  {
    id: '2',
    title: 'Voice Acting for Animation and Video Games',
    provider: {
      name: 'Voice Masters',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
    },
    category: 'Voice Acting',
    image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 300,
    deliveryTime: '3-5 days',
    featured: false,
  },
];

const mockContent = [
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
];

type SearchCategory = 'all' | 'people' | 'services' | 'content';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'cinematography', 
    'voice acting', 
    'Alex Johnson',
    'sound design',
  ]);
  
  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter(item => item !== search));
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
    }
    // In a real app, this would trigger an API search
  };
  
  const searchCategories: Array<{id: SearchCategory; label: string}> = [
    { id: 'all', label: 'All' },
    { id: 'people', label: 'People' },
    { id: 'services', label: 'Services' },
    { id: 'content', label: 'Content' },
  ];
  
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      {/* Search bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for talent, services, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-12 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
              <Search size={20} />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-3">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <X size={20} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-neutral-500 hover:text-neutral-700 ${showFilters ? 'text-primary-800' : ''}`}
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar">
            {searchCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary-800 text-white'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Advanced filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-neutral-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Location
                  </label>
                  <select className="w-full p-2 rounded-lg bg-neutral-100 border border-neutral-200">
                    <option>Any Location</option>
                    <option>Los Angeles, CA</option>
                    <option>New York, NY</option>
                    <option>London, UK</option>
                    <option>Remote Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Industry
                  </label>
                  <select className="w-full p-2 rounded-lg bg-neutral-100 border border-neutral-200">
                    <option>All Industries</option>
                    <option>Film & Video</option>
                    <option>Music</option>
                    <option>Performance Arts</option>
                    <option>Visual Arts</option>
                    <option>Writing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Sort By
                  </label>
                  <select className="w-full p-2 rounded-lg bg-neutral-100 border border-neutral-200">
                    <option>Most Relevant</option>
                    <option>Highest Rated</option>
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-primary-800 text-white rounded-lg text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
      
      {/* Recent searches */}
      {!searchQuery && recentSearches.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-neutral-800">Recent Searches</h3>
            <button
              onClick={clearRecentSearches}
              className="text-sm text-primary-800 hover:text-primary-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1.5 bg-neutral-100 rounded-full"
              >
                <button
                  onClick={() => setSearchQuery(search)}
                  className="text-sm text-neutral-800 hover:text-primary-800"
                >
                  {search}
                </button>
                <button
                  onClick={() => removeRecentSearch(search)}
                  className="ml-2 text-neutral-500 hover:text-neutral-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Search results */}
      {searchQuery && (
        <div className="space-y-8">
          {/* People results */}
          {(activeCategory === 'all' || activeCategory === 'people') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">People</h2>
                {activeCategory === 'all' && (
                  <button
                    onClick={() => setActiveCategory('people')}
                    className="text-sm text-primary-800 hover:text-primary-700 font-medium"
                  >
                    View All
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProfiles.map((profile) => (
                  <ProfilePreview
                    key={profile.id}
                    {...profile}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Services results */}
          {(activeCategory === 'all' || activeCategory === 'services') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">Services</h2>
                {activeCategory === 'all' && (
                  <button
                    onClick={() => setActiveCategory('services')}
                    className="text-sm text-primary-800 hover:text-primary-700 font-medium"
                  >
                    View All
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    {...service}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Content results */}
          {(activeCategory === 'all' || activeCategory === 'content') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">Content</h2>
                {activeCategory === 'all' && (
                  <button
                    onClick={() => setActiveCategory('content')}
                    className="text-sm text-primary-800 hover:text-primary-700 font-medium"
                  >
                    View All
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {mockContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    {...content}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* No search query yet */}
      {!searchQuery && (
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-neutral-200">
          <div className="max-w-md mx-auto">
            <div className="bg-neutral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-neutral-500" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Discover Talent & Opportunities
            </h3>
            <p className="text-neutral-600 mb-6">
              Search for people, services, and content in the entertainment industry.
              Connect with professionals and find your next opportunity.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-2">
                  <Mic className="text-primary-800" size={20} />
                </div>
                <span className="text-sm font-medium text-primary-800">Voice Acting</span>
              </button>
              
              <button className="p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-2">
                  <Camera className="text-secondary-800" size={20} />
                </div>
                <span className="text-sm font-medium text-secondary-800">Cinematography</span>
              </button>
              
              <button className="p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-2">
                  <Video className="text-accent-500" size={20} />
                </div>
                <span className="text-sm font-medium text-accent-500">Film Direction</span>
              </button>
              
              <button className="p-3 bg-success-50 rounded-lg hover:bg-success-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-2">
                  <PenTool className="text-success-700" size={20} />
                </div>
                <span className="text-sm font-medium text-success-700">Scriptwriting</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;