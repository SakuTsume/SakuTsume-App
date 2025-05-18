import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, MessageCircle, Star } from 'lucide-react';

interface ProfilePreviewProps {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  bio: string;
  skills: string[];
  following?: boolean;
  rating?: number;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  id,
  name,
  avatar,
  profession,
  bio,
  skills,
  following = false,
  rating,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
      {/* Cover/Banner */}
      <div className="h-24 bg-gradient-to-r from-primary-600 to-secondary-500"></div>
      
      {/* Profile info */}
      <div className="px-4 pt-0 pb-4 relative">
        <div className="flex justify-between -mt-12">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-xl border-4 border-white object-cover"
          />
          
          <div className="flex space-x-2 mt-14">
            <button 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                following 
                  ? 'bg-white text-primary-800 border border-primary-800' 
                  : 'bg-primary-800 text-white'
              }`}
            >
              <UserPlus size={16} className="mr-1" />
              {following ? 'Following' : 'Connect'}
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-neutral-300 text-neutral-700 flex items-center">
              <MessageCircle size={16} className="mr-1" />
              Message
            </button>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-neutral-800">{name}</h3>
            {rating && (
              <div className="ml-2 flex items-center text-amber-500">
                <Star size={14} fill="#F59E0B" />
                <span className="text-xs ml-0.5">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-secondary-700 font-medium">{profession}</p>
          <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{bio}</p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                +{skills.length - 3} more
              </span>
            )}
          </div>
          
          <Link 
            to={`/profile/${id}`} 
            className="mt-3 inline-block text-sm text-primary-800 font-medium hover:underline"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;