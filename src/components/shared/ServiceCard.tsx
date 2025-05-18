import React from 'react';
import { Star, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  id: string;
  title: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  image: string;
  price: number;
  deliveryTime: string;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  provider,
  category,
  image,
  price,
  deliveryTime,
  featured = false,
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        featured ? 'border-2 border-primary-500' : 'border border-neutral-200'
      }`}
    >
      {featured && (
        <div className="bg-primary-800 text-white py-1 px-3 text-xs font-medium text-center">
          Featured
        </div>
      )}
      
      {/* Service image */}
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
          {category}
        </div>
      </div>
      
      {/* Service details */}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm font-medium text-neutral-700">{provider.name}</span>
          <div className="ml-auto flex items-center text-amber-500">
            <Star size={14} fill="#F59E0B" />
            <span className="text-xs ml-1">{provider.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-neutral-800 line-clamp-2 h-12">{title}</h3>
        
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center text-neutral-600 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{deliveryTime}</span>
          </div>
          
          <div className="font-medium text-primary-800 flex items-center">
            <DollarSign size={16} />
            <span>{price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;