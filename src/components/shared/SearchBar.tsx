import React, { useState } from 'react';
import { Search, X, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([
    'Cinematography', 
    'Voice Acting', 
    'Script Writing', 
    'Film Directors', 
    'Sound Design'
  ]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', query);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for talent, services, or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-12 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            autoFocus
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
            <Search size={20} />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={20} />
              </button>
            )}
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-700"
            >
              <Mic size={20} />
            </button>
          </div>
        </div>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-neutral-500 hover:text-neutral-700"
          >
            <X size={24} />
          </button>
        )}
      </form>
      
      {/* Trending searches */}
      {!query && suggestions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-neutral-500 mb-3">Trending in Entertainment</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm hover:bg-primary-50 hover:border-primary-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;