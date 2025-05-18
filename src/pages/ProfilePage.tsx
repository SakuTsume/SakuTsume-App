import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, Share2, Link, MapPin, Mail, Calendar, Briefcase as BriefcaseBusiness, Star, Mic, Video, PenTool, Camera, Users } from 'lucide-react';
import ContentCard from '../components/shared/ContentCard';
import ServiceCard from '../components/shared/ServiceCard';

// Mock profile data
const mockProfile = {
  id: 'me',
  name: 'Alex Johnson',
  profession: 'Film Director & Cinematographer',
  avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  coverImage: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  bio: 'Award-winning film director with 8+ years of experience specializing in narrative shorts and documentaries. Passionate about visual storytelling and bringing unique perspectives to life.',
  location: 'Los Angeles, CA',
  email: 'alex.johnson@example.com',
  website: 'alexjohnson.portfolio.com',
  joined: 'January 2023',
  skills: [
    'Film Direction',
    'Cinematography',
    'Storytelling',
    'Adobe Premiere Pro',
    'Documentary',
    'Visual Effects',
    'Screenwriting',
    'Color Grading',
  ],
  stats: {
    followers: 1248,
    following: 356,
    rating: 4.9,
    reviewCount: 47,
  },
  achievements: [
    'Best Short Film, LA Film Festival 2022',
    'Featured on Indie Film Channel',
    'Cinematography Award, Sunset Film Festival',
  ],
};

// Mock projects/portfolio
const mockProjects = [
  {
    id: '1',
    title: 'The Silent Path',
    type: 'Short Film',
    image: 'https://images.pexels.com/photos/6476783/pexels-photo-6476783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A 15-minute psychological thriller exploring isolation and perception.',
  },
  {
    id: '2',
    title: 'Urban Rhythms',
    type: 'Documentary',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Documentary on street musicians and their impact on city culture.',
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    type: 'Sci-Fi Short',
    image: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A futuristic narrative exploring human connection in a digital age.',
  },
];

// Mock services
const mockServices = [
  {
    id: '1',
    title: 'Film Direction for Short Films',
    provider: {
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
    },
    category: 'Film Direction',
    image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1500,
    deliveryTime: '21 days',
    featured: true,
  },
  {
    id: '2',
    title: 'Professional Cinematography Services',
    provider: {
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
    },
    category: 'Cinematography',
    image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1200,
    deliveryTime: '14 days',
    featured: false,
  },
];

// Mock content posts (reusing the content card data structure)
const mockContent = [
  {
    id: '1',
    username: 'Alex Johnson',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director & Cinematographer',
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
    username: 'Alex Johnson',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Film Director & Cinematographer',
    media: {
      type: 'video' as const,
      url: 'https://example.com/demo-reel.mp4',
      thumbnail: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    caption: 'Just finished editing this sequence for "The Silent Path". The lighting was challenging but I\'m happy with the mood we created. #cinematography #filmmaking',
    likes: 198,
    comments: 42,
    isLiked: false,
    isSaved: true,
  },
];

const tabItems = [
  { id: 'portfolio', label: 'Portfolio', icon: <BriefcaseBusiness size={18} /> },
  { id: 'services', label: 'Services', icon: <Star size={18} /> },
  { id: 'posts', label: 'Posts', icon: <PenTool size={18} /> },
  { id: 'about', label: 'About', icon: <Users size={18} /> },
];

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [profile, setProfile] = useState(mockProfile);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Simulate fetching profile data
  useEffect(() => {
    // In a real app, this would be an API call
    console.log(`Fetching profile data for user ID: ${id}`);
    // For now, just use our mock data
    setProfile(mockProfile);
  }, [id]);
  
  return (
    <div className="max-w-screen-xl mx-auto pb-10">
      {/* Cover image */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary-600 to-secondary-500 relative overflow-hidden">
        {profile.coverImage && (
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-85"
          />
        )}
      </div>
      
      {/* Profile header */}
      <div className="px-4 relative">
        <div className="flex flex-col md:flex-row md:items-end -mt-20 md:-mt-16">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-xl border-4 border-white object-cover shadow-md"
          />
          
          <div className="md:ml-6 mt-4 md:mt-0 md:mb-2 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">{profile.name}</h1>
            <p className="text-secondary-700 font-medium">{profile.profession}</p>
            
            <div className="flex items-center mt-1 text-neutral-600">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-3">
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                isFollowing 
                  ? 'bg-white text-primary-800 border border-primary-800' 
                  : 'bg-primary-800 text-white'
              }`}
            >
              <UserPlus size={16} className="mr-1" />
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-neutral-300 text-neutral-700 flex items-center">
              <MessageCircle size={16} className="mr-1" />
              Message
            </button>
            
            <button className="p-2 rounded-lg bg-white border border-neutral-300 text-neutral-700">
              <Share2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex flex-col items-center">
            <span className="font-bold text-neutral-800">{profile.stats.followers.toLocaleString()}</span>
            <span className="text-sm text-neutral-500">Followers</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-bold text-neutral-800">{profile.stats.following.toLocaleString()}</span>
            <span className="text-sm text-neutral-500">Following</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="font-bold text-neutral-800 flex items-center">
              <span>{profile.stats.rating}</span>
              <Star size={16} fill="#F59E0B" className="ml-1 text-amber-500" />
            </div>
            <span className="text-sm text-neutral-500">{profile.stats.reviewCount} Reviews</span>
          </div>
        </div>
        
        {/* Quick info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-neutral-700">
            <Mail size={18} className="mr-2 text-neutral-500" />
            <span className="text-sm">{profile.email}</span>
          </div>
          
          <div className="flex items-center text-neutral-700">
            <Link size={18} className="mr-2 text-neutral-500" />
            <span className="text-sm">{profile.website}</span>
          </div>
          
          <div className="flex items-center text-neutral-700">
            <Calendar size={18} className="mr-2 text-neutral-500" />
            <span className="text-sm">Joined {profile.joined}</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-8 border-b border-neutral-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-800 text-primary-800'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="px-4 mt-6">
        {/* Portfolio tab */}
        {activeTab === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-medium text-secondary-700 mb-1">
                        {project.type}
                      </div>
                      <h3 className="font-semibold text-neutral-800">{project.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary-50 text-primary-800 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <ul className="space-y-2">
                {profile.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 text-amber-500">
                      <Star size={16} fill="#F59E0B" />
                    </div>
                    <span className="text-neutral-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
        
        {/* Services tab */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Posts tab */}
        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
            <div className="space-y-6">
              {mockContent.map((content) => (
                <ContentCard
                  key={content.id}
                  {...content}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* About tab */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl"
          >
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-neutral-700 whitespace-pre-line mb-8">
              {profile.bio}
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Specialties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-3 bg-white rounded-lg border border-neutral-200">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 mr-3">
                  <Camera size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Cinematography</h4>
                  <p className="text-sm text-neutral-600">Professional camera work & shot composition</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-neutral-200">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 mr-3">
                  <Video size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Film Direction</h4>
                  <p className="text-sm text-neutral-600">Creative vision & production management</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-neutral-200">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 mr-3">
                  <PenTool size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Screenwriting</h4>
                  <p className="text-sm text-neutral-600">Narrative development & script creation</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-neutral-200">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 mr-3">
                  <Mic size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Sound Design</h4>
                  <p className="text-sm text-neutral-600">Audio production & sound effects</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Equipment</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 mb-8">
              <li>Sony Alpha A7S III</li>
              <li>DJI Ronin Gimbal</li>
              <li>Sennheiser MKE 600 Shotgun Microphone</li>
              <li>ARRI Lighting Kit</li>
              <li>Adobe Creative Suite (Premiere Pro, After Effects)</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-3">Languages</h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-neutral-100 px-3 py-1.5 rounded-md">
                <div className="font-medium">English</div>
                <div className="text-xs text-neutral-500">Native</div>
              </div>
              
              <div className="bg-neutral-100 px-3 py-1.5 rounded-md">
                <div className="font-medium">Spanish</div>
                <div className="text-xs text-neutral-500">Fluent</div>
              </div>
              
              <div className="bg-neutral-100 px-3 py-1.5 rounded-md">
                <div className="font-medium">French</div>
                <div className="text-xs text-neutral-500">Intermediate</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;