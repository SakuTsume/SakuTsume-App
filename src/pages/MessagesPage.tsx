import React, { useState } from 'react';
import { Search, MoreHorizontal, Send, Paperclip, Mic, Image, Film, Plus, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock conversations
const mockConversations = [
  {
    id: '1',
    name: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'Hey! Are you available for a project next month?',
    time: '2:45 PM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Mark Davis',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'The script looks great! Just a few minor changes.',
    time: '10:22 AM',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'Thanks for the feedback on my portfolio!',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'James Rodriguez',
    avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'I\'ll send over the contract tomorrow.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'Olivia Parker',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastMessage: 'Looking forward to working with you again!',
    time: 'Monday',
    unread: 0,
    online: true,
  },
];

// Mock messages for the active conversation
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
    content: 'Hey! Are you available for a project next month?',
    time: '2:45 PM',
    read: false,
  },
];

const MessagesPage: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Conversations sidebar */}
      <div className={`bg-white border-r border-neutral-200 ${showSidebar ? 'w-full md:w-80' : 'hidden'} md:block`}>
        <div className="p-4 border-b border-neutral-200">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full py-2 pl-9 pr-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
              <Search size={16} />
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {mockConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setActiveConversation(conversation);
                setShowSidebar(false);
              }}
              className={`p-4 border-b border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-colors ${
                activeConversation?.id === conversation.id ? 'bg-primary-50' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="relative mr-3">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-neutral-800 truncate">{conversation.name}</h3>
                    <span className="text-xs text-neutral-500">{conversation.time}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-neutral-600 truncate pr-2">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-primary-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active conversation */}
      <div className={`flex-1 flex flex-col bg-neutral-50 ${!showSidebar ? 'block' : 'hidden md:flex'}`}>
        {activeConversation && (
          <>
            {/* Conversation header */}
            <div className="p-4 bg-white border-b border-neutral-200 flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-3 md:hidden text-neutral-600"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="relative mr-3">
                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-neutral-800">{activeConversation.name}</h3>
                <p className="text-xs text-neutral-500">
                  {activeConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
              
              <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        : 'bg-white text-neutral-800 rounded-bl-none'
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
            
            {/* Message input */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <form onSubmit={sendMessage} className="flex items-center">
                <button
                  type="button"
                  className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100"
                >
                  <Plus size={20} />
                </button>
                
                <div className="flex-1 mx-2 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full py-2 px-4 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <button
                      type="button"
                      className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200"
                    >
                      <Image size={16} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200"
                    >
                      <Paperclip size={16} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200"
                    >
                      <Mic size={16} />
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className={`p-2 rounded-full ${
                    messageInput.trim()
                      ?'bg-primary-800 text-white'
                      : 'bg-neutral-200 text-neutral-400'
                  }`}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;