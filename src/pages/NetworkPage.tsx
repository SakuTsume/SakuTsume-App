import React, { useState } from 'react';
import { Search, Filter, MessageCircle, Users, MessageSquare, Mic, Star, ArrowUp, ArrowDown, Clock, Zap, Plus, Send, Phone, Video, MoreHorizontal, Hash, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for different sections
const mockDirectMessages = [
  {
    id: '1',
    name: 'Jane Rodriguez',
    profession: 'Game Developer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'The voice samples sound perfect!',
    time: '2m',
    unread: 0,
    online: true,
  },
  {
    id: '2',
    name: 'StudioX Productions',
    profession: 'Animation Studio',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'Contract ready for review',
    time: '15m',
    unread: 3,
    online: false,
    priority: true,
  },
  {
    id: '3',
    name: 'Marcus Chen',
    profession: 'Sound Designer',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'Thanks for the feedback!',
    time: '1h',
    unread: 0,
    online: true,
  },
];

const mockAudioRooms = [
  {
    id: '1',
    name: 'Indie Dev Lounge',
    participants: 12,
    maxParticipants: 20,
    topic: 'Discussing upcoming game projects',
    speakers: ['Alex', 'Maya', 'Tom'],
  },
  {
    id: '2',
    name: 'Animation Hub',
    participants: 8,
    maxParticipants: 15,
    topic: 'Character design techniques',
    speakers: ['Sarah', 'Mike'],
  },
  {
    id: '3',
    name: 'Voice Acting Workshop',
    participants: 15,
    maxParticipants: 25,
    topic: 'Emotion delivery masterclass',
    speakers: ['Emma', 'David', 'Lisa'],
  },
];

const mockRecommendedCommunities = [
  {
    id: '1',
    name: 'RPG Voice Acting',
    members: 1247,
    category: 'Voice Acting',
    description: 'Community for RPG voice actors and directors',
  },
  {
    id: '2',
    name: 'Indie Film Composers',
    members: 892,
    category: 'Music',
    description: 'Original scores for independent films',
  },
];

const mockForumPosts = [
  {
    id: '1',
    title: 'Best budget mic for voice over work?',
    author: 'AudioEngineer_Pro',
    badge: 'Audio Engineer',
    verified: true,
    content: 'Looking for recommendations under $200. Need something reliable for home studio setup.',
    upvotes: 42,
    downvotes: 2,
    comments: 18,
    time: '2h',
    urgent: false,
  },
  {
    id: '2',
    title: 'Need help with script formatting',
    author: 'NewWriter23',
    badge: 'Newbie',
    verified: false,
    content: 'First time writing a screenplay. What software do you recommend?',
    upvotes: 5,
    downvotes: 0,
    comments: 3,
    time: '4h',
    urgent: false,
    hasWhitelistedLink: true,
  },
  {
    id: '3',
    title: 'Contract dispute - need advice ASAP',
    author: 'FreelanceVA',
    badge: 'Voice Actor',
    verified: true,
    content: 'Client refusing to pay after completed work. Has anyone dealt with this?',
    upvotes: 28,
    downvotes: 1,
    comments: 15,
    time: '6h',
    urgent: true,
    timeLeft: '18h',
  },
];

const mockNetworkConnections = [
  {
    id: '1',
    name: 'Maya Thompson',
    profession: 'Lead Voice Actor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    skills: ['Voice Acting', 'Character Voices', 'Narration'],
    cluster: 'VA Cluster',
    x: 150,
    y: 100,
  },
  {
    id: '2',
    name: 'Tom Wilson',
    profession: 'Sound Designer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    skills: ['Sound Design', 'Audio Engineering', 'Foley'],
    cluster: 'VA Cluster',
    x: 200,
    y: 150,
  },
  {
    id: '3',
    name: 'StudioGhibli_Casting',
    profession: 'Casting Director',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    skills: ['Casting', 'Talent Management', 'Animation'],
    cluster: 'VA Cluster',
    featured: true,
    x: 100,
    y: 120,
  },
];

const mockRecommendedConnections = [
  {
    id: '1',
    name: 'Jane Composer',
    profession: 'Music Composer',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    reason: 'Based on your RPG project',
    mutualConnections: 3,
  },
  {
    id: '2',
    name: 'Alex Director',
    profession: 'Film Director',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    reason: 'Works in similar projects',
    mutualConnections: 5,
  },
];

// Mock messages for the chat
const mockMessages = [
  {
    id: '1',
    sender: 'them',
    content: 'Hey! I really loved your work on that short film you posted. The cinematography was outstanding!',
    time: '2:30 PM',
    read: true,
  },
  {
    id: '2',
    sender: 'me',
    content: 'Thanks so much! That means a lot coming from you. I spent a lot of time getting the lighting just right.',
    time: '2:32 PM',
    read: true,
  },
  {
    id: '3',
    sender: 'them',
    content: 'It really shows. I was wondering if you might be available for a project I\'m working on next month? It\'s a short documentary about local artists.',
    time: '2:34 PM',
    read: true,
  },
  {
    id: '4',
    sender: 'them',
    content: 'The budget is limited but I think it could be a great opportunity for both of us.',
    time: '2:35 PM',
    read: true,
  },
  {
    id: '5',
    sender: 'me',
    content: 'That sounds really interesting! I\'d love to hear more about it. What kind of timeline are you thinking?',
    time: '2:40 PM',
    read: true,
  },
  {
    id: '6',
    sender: 'them',
    content: 'We\'re looking at about a week of shooting, probably mid-July. Then maybe another week for initial edits?',
    time: '2:42 PM',
    read: true,
  },
  {
    id: '7',
    sender: 'them',
    content: 'The voice samples sound perfect!',
    time: '2:45 PM',
    read: false,
  },
  // Add more messages to demonstrate scrolling
  {
    id: '8',
    sender: 'me',
    content: 'Perfect! That timeline works well for me. I\'m excited to collaborate on this project.',
    time: '2:47 PM',
    read: true,
  },
  {
    id: '9',
    sender: 'them',
    content: 'Awesome! I\'ll send over the project details and we can set up a call to discuss everything in more detail.',
    time: '2:50 PM',
    read: true,
  },
  {
    id: '10',
    sender: 'me',
    content: 'Sounds great! Looking forward to it.',
    time: '2:52 PM',
    read: true,
  },
];

type NetworkTab = 'messages' | 'forums' | 'network';

const NetworkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NetworkTab>('messages');
  const [selectedDM, setSelectedDM] = useState(mockDirectMessages[0]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [networkFilter, setNetworkFilter] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const joinAudioRoom = (roomId: string) => {
    console.log('Joining audio room:', roomId);
    // In a real app, this would show a preview and then join
  };

  const renderMessagesTab = () => (
    <div className="flex h-[calc(100vh-112px)] overflow-hidden">
      {/* Sidebar - Fixed height with its own scroll */}
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col h-full">
        {/* Search - Fixed at top */}
        <div className="p-4 border-b border-neutral-200 flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full py-2 pl-9 pr-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Direct Messages */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-neutral-600 mb-3 flex items-center">
              <MessageCircle size={16} className="mr-2" />
              DIRECT MESSAGES
            </h3>
            <div className="space-y-1">
              {mockDirectMessages.map((dm) => (
                <div
                  key={dm.id}
                  onClick={() => setSelectedDM(dm)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedDM?.id === dm.id ? 'bg-primary-50' : 'hover:bg-neutral-50'
                  } ${dm.priority ? 'border-l-4 border-red-500' : ''}`}
                >
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <img
                        src={dm.avatar}
                        alt={dm.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {dm.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-neutral-800 truncate">{dm.name}</h4>
                        <span className="text-xs text-neutral-500">{dm.time}</span>
                      </div>
                      <p className="text-sm text-neutral-600 truncate">{dm.lastMessage}</p>
                    </div>
                    {dm.unread > 0 && (
                      <span className="bg-primary-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {dm.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Rooms */}
          <div className="p-4 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-600 mb-3 flex items-center">
              <Mic size={16} className="mr-2" />
              AUDIO ROOMS
            </h3>
            <div className="space-y-2">
              {mockAudioRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => joinAudioRoom(room.id)}
                  className="p-3 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-neutral-800">{room.name}</h4>
                    <div className="flex items-center text-xs text-neutral-600">
                      <Users size={12} className="mr-1" />
                      {room.participants}/{room.maxParticipants}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 mb-2">{room.topic}</p>
                  <div className="flex items-center">
                    <Volume2 size={12} className="text-primary-600 mr-1" />
                    <span className="text-xs text-primary-600">
                      {room.speakers.join(', ')} speaking
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Communities */}
          <div className="p-4 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-600 mb-3 flex items-center">
              <Star size={16} className="mr-2" />
              RECOMMENDED
            </h3>
            <div className="space-y-2">
              {mockRecommendedCommunities.map((community) => (
                <div
                  key={community.id}
                  className="p-3 rounded-lg border border-neutral-200 hover:border-primary-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-neutral-800">{community.name}</h4>
                      <p className="text-xs text-neutral-600">{community.members.toLocaleString()} members</p>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area - Fixed height with its own scroll */}
      <div className="flex-1 flex flex-col bg-neutral-50 h-full">
        {selectedDM && (
          <>
            {/* Chat Header - Made thinner */}
            <div className="px-4 py-2 bg-white border-b border-neutral-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center">
                <img
                  src={selectedDM.avatar}
                  alt={selectedDM.name}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium text-neutral-800 text-sm">{selectedDM.name}</h3>
                  <p className="text-xs text-neutral-500">{selectedDM.profession}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600">
                  <Phone size={16} />
                </button>
                <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600">
                  <Video size={16} />
                </button>
                <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages - Scrollable area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="text-center text-neutral-500 text-sm mb-4">
                Start of conversation with {selectedDM.name}
              </div>
              
              {/* Render actual messages */}
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-[75%] rounded-xl px-4 py-3 ${
                        message.sender === 'me'
                          ? 'bg-primary-800 text-white rounded-br-none'
                          : 'bg-white text-neutral-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`text-xs mt-1 flex items-center justify-end ${
                        message.sender === 'me' ? 'text-primary-100' : 'text-neutral-500'
                      }`}>
                        {message.time}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="p-4 bg-white border-t border-neutral-200 flex-shrink-0">
              <form onSubmit={sendMessage} className="flex items-center">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message ${selectedDM.name}...`}
                  className="flex-1 py-2 px-4 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 mr-3"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className={`p-2 rounded-full ${
                    messageInput.trim()
                      ? 'bg-primary-800 text-white'
                      : 'bg-neutral-200 text-neutral-400'
                  }`}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderForumsTab = () => (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search forums..."
            className="w-full py-3 pl-12 pr-4 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {['Urgent', 'New', 'Top', 'Voice Acting', 'Game Dev', 'Animation'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'Urgent'
                  ? 'bg-orange-100 text-orange-800 border border-orange-200'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {filter === 'Urgent' && <Zap size={14} className="inline mr-1" />}
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {mockForumPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl p-6 shadow-sm border transition-colors ${
              post.urgent 
                ? 'border-orange-200 bg-orange-50' 
                : 'border-neutral-200 hover:border-primary-200'
            }`}
          >
            <div className="flex items-start">
              {/* Voting */}
              <div className="flex flex-col items-center mr-4">
                <button className="p-1 rounded hover:bg-neutral-100 text-neutral-600">
                  <ArrowUp size={18} />
                </button>
                <span className="font-medium text-neutral-800 my-1">
                  {post.upvotes - post.downvotes}
                </span>
                <button className="p-1 rounded hover:bg-neutral-100 text-neutral-600">
                  <ArrowDown size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                    post.verified 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {post.verified && <Star size={12} className="inline mr-1" />}
                    {post.badge}
                  </div>
                  <span className="text-sm text-neutral-600">{post.author}</span>
                  <span className="text-sm text-neutral-400 mx-2">•</span>
                  <span className="text-sm text-neutral-500">{post.time}</span>
                  {post.urgent && (
                    <>
                      <span className="text-sm text-neutral-400 mx-2">•</span>
                      <div className="flex items-center text-orange-600">
                        <Clock size={12} className="mr-1" />
                        <span className="text-xs font-medium">{post.timeLeft} left</span>
                      </div>
                    </>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  {post.title}
                </h3>
                
                <p className="text-neutral-700 mb-3">{post.content}</p>
                
                {post.hasWhitelistedLink && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-blue-700">
                      <Hash size={14} className="mr-1" />
                      <span className="text-sm">Contains whitelisted YouTube link</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-sm text-neutral-600">
                  <button className="flex items-center hover:text-primary-600">
                    <MessageSquare size={16} className="mr-1" />
                    {post.comments} comments
                  </button>
                  <button className="hover:text-primary-600">Share</button>
                  <button className="hover:text-primary-600">Save</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderNetworkTab = () => (
    <div className="max-w-6xl mx-auto p-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter connections..."
              value={networkFilter}
              onChange={(e) => setNetworkFilter(e.target.value)}
              className="w-64 py-2 pl-9 pr-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          </div>
          
          <div className="flex gap-2">
            {['Game Devs', 'Voice Actors', 'Composers', 'Directors'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold mb-4">Network Clusters</h3>
          
          {/* Simplified network visualization */}
          <div className="relative h-64 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg overflow-hidden">
            <div className="absolute inset-4">
              {mockNetworkConnections.map((connection) => (
                <div
                  key={connection.id}
                  onClick={() => setSelectedCluster(connection.cluster)}
                  className={`absolute w-12 h-12 rounded-full border-2 cursor-pointer transition-all ${
                    connection.featured 
                      ? 'border-amber-400 bg-amber-100' 
                      : 'border-primary-300 bg-white'
                  } hover:scale-110`}
                  style={{
                    left: `${connection.x}px`,
                    top: `${connection.y}px`,
                  }}
                >
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                  {connection.featured && (
                    <Star size={12} className="absolute -top-1 -right-1 text-amber-500 fill-current" />
                  )}
                </div>
              ))}
              
              {/* Cluster label */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                VA Cluster (3 connections)
              </div>
            </div>
          </div>

          {selectedCluster && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-primary-50 rounded-lg"
            >
              <h4 className="font-medium mb-2">Indie Horror VAs</h4>
              <div className="space-y-2">
                {mockNetworkConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium">{connection.name}</p>
                        <p className="text-xs text-neutral-600">{connection.profession}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded text-primary-600 hover:bg-primary-100">
                        <MessageCircle size={14} />
                      </button>
                      <button className="p-1 rounded text-primary-600 hover:bg-primary-100">
                        <Users size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Recommended Connections */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center mb-4">
            <Star size={20} className="text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold">Recommended Connections</h3>
          </div>
          
          <div className="space-y-4">
            {mockRecommendedConnections.map((connection) => (
              <div key={connection.id} className="p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-800">{connection.name}</h4>
                    <p className="text-sm text-neutral-600">{connection.profession}</p>
                    <p className="text-xs text-primary-600 mt-1">{connection.reason}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {connection.mutualConnections} mutual connections
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-primary-800 text-white text-sm rounded-lg">
                      Connect
                    </button>
                    <button className="px-3 py-1 border border-neutral-300 text-neutral-700 text-sm rounded-lg">
                      Introduce Me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation - Made thinner */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center space-x-8">
            {[
              { id: 'messages', label: 'Messages/Communities', icon: MessageCircle },
              { id: 'forums', label: 'Forums', icon: MessageSquare },
              { id: 'network', label: 'My Network', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as NetworkTab)}
                className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
                {tab.id === 'messages' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                {tab.id === 'forums' && (
                  <span className="ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full">
                    3
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className={activeTab === 'messages' ? '' : 'overflow-y-auto h-[calc(100vh-112px)]'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'messages' && renderMessagesTab()}
            {activeTab === 'forums' && renderForumsTab()}
            {activeTab === 'network' && renderNetworkTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NetworkPage;