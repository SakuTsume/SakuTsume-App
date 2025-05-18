import React, { useState } from 'react';
import ServiceCard from '../components/shared/ServiceCard';
import { Search, Filter, ChevronDown } from 'lucide-react';

// Mock data for services
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
  {
    id: '3',
    title: 'Script Writing and Story Development',
    provider: {
      name: 'Narrative Studios',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
    },
    category: 'Scriptwriting',
    image: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 500,
    deliveryTime: '14 days',
    featured: false,
  },
  {
    id: '4',
    title: 'Professional Audio Mixing and Mastering',
    provider: {
      name: 'Sound Wizards',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
    },
    category: 'Audio Production',
    image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 250,
    deliveryTime: '5 days',
    featured: true,
  },
  {
    id: '5',
    title: 'Character Design for Animation and Games',
    provider: {
      name: 'Creative Designs',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
    },
    category: 'Art & Design',
    image: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 350,
    deliveryTime: '7 days',
    featured: false,
  },
  {
    id: '6',
    title: 'Professional Video Editing and Color Grading',
    provider: {
      name: 'Edit Pros',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
    },
    category: 'Video Editing',
    image: 'https://images.pexels.com/photos/2562398/pexels-photo-2562398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 400,
    deliveryTime: '4-6 days',
    featured: false,
  },
];

// Service categories
const categories = [
  'All Categories',
  'Cinematography',
  'Voice Acting',
  'Scriptwriting',
  'Audio Production',
  'Art & Design',
  'Video Editing',
  'Acting',
  'Directing',
  'Animation',
];

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Recommended');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Sidebar filters - desktop */}
        <div className="hidden md:block w-64 bg-white rounded-xl p-4 shadow-sm border border-neutral-200 sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="w-4 h-4 text-primary-800 focus:ring-primary-500"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-neutral-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Price Range</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-primary-800"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-neutral-600">${priceRange[0]}</span>
              <span className="text-sm text-neutral-600">${priceRange[1]}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Delivery Time</h3>
            <div className="space-y-2">
              {["Any", "Up to 3 days", "Up to 7 days", "Up to 14 days"].map((time) => (
                <div key={time} className="flex items-center">
                  <input
                    type="radio"
                    id={`time-${time}`}
                    name="delivery-time"
                    className="w-4 h-4 text-primary-800 focus:ring-primary-500"
                  />
                  <label htmlFor={`time-${time}`} className="ml-2 text-sm text-neutral-700">
                    {time}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full py-2 bg-primary-800 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Apply Filters
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Search and filters header */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                <Search size={18} />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between mt-4">
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="md:hidden flex items-center text-neutral-700 text-sm font-medium"
              >
                <Filter size={18} className="mr-1" />
                Filters
                <ChevronDown size={16} className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="flex items-center mt-2 md:mt-0">
                <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-0 py-1 px-2 rounded-lg bg-neutral-100 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>
            
            {/* Mobile filters */}
            {showFilters && (
              <div className="md:hidden mt-4 pt-4 border-t border-neutral-200">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-sm p-2 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Price Range: Up to ${priceRange[1]}</h3>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary-800"
                  />
                </div>
                
                <button className="w-full py-2 bg-primary-800 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
              />
            ))}
          </div>
          
          {/* Load more */}
          <div className="text-center mt-10">
            <button className="px-6 py-2 bg-white border border-primary-800 text-primary-800 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;