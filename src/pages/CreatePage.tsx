import React, { useState } from 'react';
import { Camera, Video, Mic, FileText, Upload, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

type ContentType = 'photo' | 'video' | 'audio' | 'article';

interface ContentTypeOption {
  type: ContentType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const contentTypes: ContentTypeOption[] = [
  {
    type: 'photo',
    label: 'Photo',
    icon: <Camera size={24} />,
    description: 'Share photos from your projects or behind-the-scenes moments',
  },
  {
    type: 'video',
    label: 'Video',
    icon: <Video size={24} />,
    description: 'Upload videos, showreels, or project highlights',
  },
  {
    type: 'audio',
    label: 'Audio',
    icon: <Mic size={24} />,
    description: 'Share voice work, music, or sound design samples',
  },
  {
    type: 'article',
    label: 'Article',
    icon: <FileText size={24} />,
    description: 'Write articles about your work or industry insights',
  },
];

const CreatePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    // Handle the files here
    console.log('Dropped files:', files);
  };
  
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-neutral-800 mb-6">Create Content</h1>
      
      {!selectedType ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentTypes.map((type) => (
            <motion.button
              key={type.type}
              onClick={() => setSelectedType(type.type)}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-200 hover:bg-primary-50 transition-colors text-left"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 mr-4">
                  {type.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">{type.label}</h3>
              </div>
              <p className="text-neutral-600">{type.description}</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <button
            onClick={() => setSelectedType(null)}
            className="text-neutral-600 hover:text-neutral-800 mb-4"
          >
            ← Back to content types
          </button>
          
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`mt-4 border-2 border-dashed rounded-xl p-8 text-center ${
              dragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-300 hover:border-primary-300'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-neutral-500" />
            </div>
            
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Upload your {selectedType}
            </h3>
            
            <p className="text-neutral-600 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            
            <button className="px-4 py-2 bg-primary-800 text-white rounded-lg flex items-center justify-center mx-auto">
              <Plus size={18} className="mr-2" />
              Select Files
            </button>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Caption
            </label>
            <textarea
              placeholder="Write a caption for your content..."
              className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              placeholder="Add tags separated by commas..."
              className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePage;