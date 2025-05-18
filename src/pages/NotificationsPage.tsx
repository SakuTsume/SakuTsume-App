import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, Heart, Star, Bookmark, Briefcase as BriefcaseBusiness, CheckCircle2, Bell } from 'lucide-react';

// Notification types
type NotificationType = 'connection' | 'message' | 'like' | 'review' | 'bookmark' | 'opportunity' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

// Helper function to get the icon for a notification type
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'connection':
      return <UserPlus size={18} />;
    case 'message':
      return <MessageCircle size={18} />;
    case 'like':
      return <Heart size={18} />;
    case 'review':
      return <Star size={18} />;
    case 'bookmark':
      return <Bookmark size={18} />;
    case 'opportunity':
      return <BriefcaseBusiness size={18} />;
    case 'system':
      return <Bell size={18} />;
    default:
      return <Bell size={18} />;
  }
};

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'connection',
    user: {
      id: 'user1',
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    content: 'sent you a connection request',
    time: '2 minutes ago',
    read: false,
    actionUrl: '/profile/user1',
  },
  {
    id: '2',
    type: 'message',
    user: {
      id: 'user2',
      name: 'Sarah Miller',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    content: 'sent you a new message',
    time: '35 minutes ago',
    read: false,
    actionUrl: '/messages',
  },
  {
    id: '3',
    type: 'like',
    user: {
      id: 'user3',
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    content: 'liked your recent post about cinematography techniques',
    time: '2 hours ago',
    read: false,
    actionUrl: '/posts/123',
  },
  {
    id: '4',
    type: 'review',
    user: {
      id: 'user4',
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    content: 'left a 5-star review on your sound design service',
    time: '5 hours ago',
    read: true,
    actionUrl: '/services/reviews',
  },
  {
    id: '5',
    type: 'bookmark',
    user: {
      id: 'user5',
      name: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    content: 'saved your profile',
    time: 'Yesterday',
    read: true,
    actionUrl: '/profile/me',
  },
  {
    id: '6',
    type: 'opportunity',
    user: {
      id: 'user6',
      name: 'Lisa Thompson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    content: 'invited you to collaborate on a new film project',
    time: 'Yesterday',
    read: true,
    actionUrl: '/opportunities/abc123',
  },
  {
    id: '7',
    type: 'system',
    content: 'Your profile has been verified. You now have access to all SakuTsume features!',
    time: '2 days ago',
    read: true,
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(notif => !notif.read);
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  return (
    <div className="max-w-screen-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Notifications</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-white rounded-lg p-0.5 border border-neutral-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary-800 text-white'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors flex items-center ${
                activeFilter === 'unread'
                  ? 'bg-primary-800 text-white'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  activeFilter === 'unread'
                    ? 'bg-white text-primary-800'
                    : 'bg-primary-800 text-white'
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary-800 hover:text-primary-700 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>
      
      {/* Notifications list */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={28} className="text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-800 mb-1">No notifications</h3>
            <p className="text-neutral-600">
              {activeFilter === 'unread' 
                ? "You've read all your notifications"
                : "You don't have any notifications yet"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl p-4 shadow-sm border ${
                notification.read ? 'border-neutral-200' : 'border-primary-200 bg-primary-50'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start">
                {notification.user ? (
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 text-primary-800">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
                
                <div className="flex-1">
                  <p className="text-neutral-800">
                    {notification.user && (
                      <span className="font-medium">{notification.user.name} </span>
                    )}
                    {notification.content}
                  </p>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-500">{notification.time}</span>
                    
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary-800"></span>
                    )}
                  </div>
                </div>
              </div>
              
              {!notification.read && notification.actionUrl && (
                <div className="mt-3 ml-13 flex space-x-3">
                  <a
                    href={notification.actionUrl}
                    className="px-3 py-1.5 bg-primary-800 text-white text-sm font-medium rounded-lg"
                  >
                    View
                  </a>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification.id);
                    }}
                    className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg flex items-center"
                  >
                    <CheckCircle2 size={14} className="mr-1" />
                    Mark as read
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;