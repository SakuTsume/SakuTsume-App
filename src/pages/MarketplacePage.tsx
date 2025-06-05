import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/shared/ServiceCard';
import { Search, Filter, ChevronDown, ChevronRight, Star, Trophy, Gift, GraduationCap, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock announcements for the banner
const announcements = [
  {
    id: '1',
    title: 'New collaboration tools!',
    description: 'Connect with other creators seamlessly',
    cta: 'Learn More',
    link: '/features/collab',
    type: 'update',
  },
  {
    id: '2',
    title: 'VR auditions coming Q3!',
    description: 'The future of remote casting',
    cta: 'Join Waitlist',
    link: '/features/vr-auditions',
    type: 'roadmap',
  },
  {
    id: '3',
    title: 'Premium: 20% OFF',
    description: 'Limited time offer',
    cta: 'Get Deal',
    link: '/premium',
    type: 'promo',
  },
];

// Mock achievements for the carousel
const achievements = [
  {
    id: '1',
    user: {
      name: 'Maya Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    title: '50 Gigs Completed! 🎉',
    badge: 'Rising Star',
    date: '2 days ago',
  },
  {
    id: '2',
    user: {
      name: 'Alex Rivera',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    title: 'Launched: Skyreach RPG 🎮',
    badge: 'Project Launch',
    date: '3 days ago',
  },
  {
    id: '3',
    user: {
      name: 'Sarah Kim',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    title: 'Most Helpful Mentor 🏆',
    badge: 'Community Leader',
    date: '1 week ago',
  },
];

// Mock promotional items
const promotions = [
  {
    id: '1',
    title: 'Vocal Masterclass',
    instructor: 'Sarah Williams',
    price: 29,
    image: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'course',
  },
  {
    id: '2',
    title: 'SakuTsume Pro Mic',
    price: 199,
    image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'merch',
    preorder: true,
  },
];

// Mock services data (reusing from before)
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

const MarketplacePage: React.FC = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Auto-rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 10000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-secondary-700 text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncement}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">{announcements[currentAnnouncement].title}</span>
                <span className="text-sm text-white/70">{announcements[currentAnnouncement].description}</span>
              </div>
              <button className="text-sm font-medium flex items-center hover:text-white/90">
                {announcements[currentAnnouncement].cta}
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Achievements Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Recent Achievements</h2>
            <button className="px-4 py-2 bg-primary-800 text-white rounded-lg text-sm font-medium flex items-center">
              <Trophy size={16} className="mr-2" />
              Celebrate Your Win
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-4 border border-neutral-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={achievement.user.avatar}
                    alt={achievement.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-neutral-800">{achievement.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full">
                        {achievement.badge}
                      </span>
                      <span className="text-xs text-neutral-500 ml-2">{achievement.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Promotional Banner */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-xl"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-xl mb-1">{promo.title}</h3>
                  {promo.instructor && (
                    <p className="text-white/80 text-sm">with {promo.instructor}</p>
                  )}
                  <div className="flex items-center mt-2">
                    <span className="text-white font-medium">${promo.price}</span>
                    {promo.preorder && (
                      <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                        Pre-order
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Marketplace Core */}
        <div>
          {/* Filters Bar */}
          <div className="bg-white sticky top-16 z-10 border-b border-neutral-200 mb-6">
            <div className="flex items-center space-x-4 py-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  selectedCategory === 'all'
                    ? 'bg-primary-800 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <ShoppingBag size={16} className="mr-2" />
                Services
              </button>
              
              <button
                onClick={() => setSelectedCategory('lessons')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  selectedCategory === 'lessons'
                    ? 'bg-primary-800 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <GraduationCap size={16} className="mr-2" />
                Lessons
              </button>
              
              <button
                onClick={() => setSelectedCategory('merch')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  selectedCategory === 'merch'
                    ? 'bg-primary-800 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Gift size={16} className="mr-2" />
                Merch
              </button>
              
              <div className="flex-1"></div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search marketplace..."
                    className="w-64 py-2 pl-9 pr-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                    <Search size={16} />
                  </div>
                </div>
                
                <button className="p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
                  <Filter size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;