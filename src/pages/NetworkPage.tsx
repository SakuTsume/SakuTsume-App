import React from 'react';
import ProfilePreview from '../components/shared/ProfilePreview';
import { Search, Filter } from 'lucide-react';

// Mock network data
const mockConnections = [
  {
    id: 'user1',
    name: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Actress & Voice Artist',
    bio: 'Professional actress with experience in theater, film, and voice acting. Looking to connect with directors and producers for upcoming projects.',
    skills: ['Acting', 'Voice Acting', 'Theater', 'Script Analysis'],
    following: true,
    rating: 4.7,
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Sound Designer & Music Producer',
    bio: 'Experienced sound designer specializing in film scoring and sound effects. Worked on over 30 short films and documentaries.',
    skills: ['Sound Design', 'Music Production', 'Foley Art', 'Film Scoring'],
    following: true,
    rating: 4.8,
  },
  {
    id: 'user3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    profession: 'Cinematographer',
    bio: 'Award-winning cinematographer with a passion for visual storytelling. Specialized in documentary and narrative filmmaking.',
    skills: ['Cinematography', 'Lighting', 'Camera Operation', 'Color Grading'],
    following: true,
    rating: 4.9,
  },
];

const NetworkPage: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">My Network</h1>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search connections..."
              className="w-64 py-2 pl-9 pr-4 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
              <Search size={16} />
            </div>
          </div>
          
          <button className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockConnections.map((connection) => (
          <ProfilePreview
            key={connection.id}
            {...connection}
          />
        ))}
      </div>
    </div>
  );
};

export default NetworkPage;