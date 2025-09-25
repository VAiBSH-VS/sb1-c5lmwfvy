import React, { useState } from 'react';
import { User } from '../App';
import { 
  Bell, 
  Check, 
  X, 
  Calendar, 
  FileText, 
  Users, 
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  Info,
  Clock,
  Filter
} from 'lucide-react';

interface NotificationsProps {
  user: User;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'document' | 'marketplace' | 'group' | 'event' | 'system';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: any;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Assignment Posted',
      message: 'Data Structures Assignment 4 has been uploaded to your group. Due date: January 5, 2025',
      type: 'info',
      category: 'document',
      timestamp: '2024-12-22T10:30:00Z',
      isRead: false,
      metadata: { group: user.groups[0], dueDate: '2025-01-05' }
    },
    {
      id: '2',
      title: 'Item Sold Successfully',
      message: 'Your scientific calculator has been sold to John Doe. Payment pending.',
      type: 'success',
      category: 'marketplace',
      timestamp: '2024-12-22T09:15:00Z',
      isRead: false,
      metadata: { itemTitle: 'Scientific Calculator', buyer: 'John Doe', amount: 800 }
    },
    {
      id: '3',
      title: 'Study Group Meeting Reminder',
      message: 'Database study group meeting scheduled for tomorrow at 4:00 PM in Library Hall.',
      type: 'warning',
      category: 'group',
      timestamp: '2024-12-21T16:45:00Z',
      isRead: true,
      metadata: { groupName: 'Database Study Group', date: '2024-12-23', time: '4:00 PM' }
    },
    {
      id: '4',
      title: 'Exam Schedule Updated',
      message: 'Computer Networks mid-term exam has been rescheduled to January 10, 2025.',
      type: 'warning',
      category: 'event',
      timestamp: '2024-12-21T14:20:00Z',
      isRead: true,
      metadata: { examName: 'Computer Networks Mid-term', newDate: '2025-01-10' }
    },
    {
      id: '5',
      title: 'Document Access Granted',
      message: 'You now have access to Operating Systems Lab Manual shared by your instructor.',
      type: 'success',
      category: 'document',
      timestamp: '2024-12-21T11:30:00Z',
      isRead: false,
      metadata: { documentTitle: 'OS Lab Manual', sharedBy: 'Prof. Smith' }
    },
    {
      id: '6',
      title: 'System Maintenance Notice',
      message: 'CLIGS will undergo maintenance on December 25, 2024 from 2:00 AM to 4:00 AM.',
      type: 'info',
      category: 'system',
      timestamp: '2024-12-20T18:00:00Z',
      isRead: true,
      metadata: { maintenanceDate: '2024-12-25', duration: '2 hours' }
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (category: string, type: string) => {
    if (type === 'success') return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (type === 'warning') return <AlertCircle className="h-5 w-5 text-orange-600" />;
    if (type === 'error') return <X className="h-5 w-5 text-red-600" />;

    switch (category) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'marketplace':
        return <ShoppingBag className="h-5 w-5 text-green-600" />;
      case 'group':
        return <Users className="h-5 w-5 text-purple-600" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-orange-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return notifTime.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'read' && notif.isRead) ||
                         (filter === 'unread' && !notif.isRead);
    const matchesCategory = categoryFilter === 'all' || notif.category === categoryFilter;
    return matchesFilter && matchesCategory;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Bell className="h-8 w-8" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-2">Stay updated with your college activities</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Read Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread ({unreadCount})</option>
              <option value="read">Read ({notifications.length - unreadCount})</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="document">Documents</option>
              <option value="marketplace">Marketplace</option>
              <option value="group">Groups</option>
              <option value="event">Events</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex-1 text-right text-sm text-gray-600">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-xl border-2 p-5 transition-all hover:shadow-md ${
              notification.isRead ? 'bg-white border-gray-200' : getNotificationColor(notification.type)
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.category, notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold ${notification.isRead ? 'text-gray-900' : 'text-gray-900'}`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(notification.timestamp)}</span>
                  </div>
                </div>
                
                <p className={`text-sm mb-3 ${notification.isRead ? 'text-gray-600' : 'text-gray-700'}`}>
                  {notification.message}
                </p>

                {/* Metadata */}
                {notification.metadata && (
                  <div className="mb-3">
                    {notification.category === 'document' && notification.metadata.group && (
                      <div className="text-xs text-gray-500">
                        Group: <span className="font-medium">{notification.metadata.group}</span>
                        {notification.metadata.dueDate && (
                          <span> • Due: {new Date(notification.metadata.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    )}
                    {notification.category === 'marketplace' && (
                      <div className="text-xs text-gray-500">
                        Buyer: <span className="font-medium">{notification.metadata.buyer}</span>
                        {notification.metadata.amount && (
                          <span> • Amount: ₹{notification.metadata.amount}</span>
                        )}
                      </div>
                    )}
                    {notification.category === 'event' && notification.metadata.newDate && (
                      <div className="text-xs text-gray-500">
                        New Date: <span className="font-medium">{new Date(notification.metadata.newDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      notification.category === 'document' ? 'bg-blue-100 text-blue-700' :
                      notification.category === 'marketplace' ? 'bg-green-100 text-green-700' :
                      notification.category === 'group' ? 'bg-purple-100 text-purple-700' :
                      notification.category === 'event' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {notification.category}
                    </span>
                    {!notification.isRead && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600">
            {filter === 'unread' ? "You're all caught up! No unread notifications." : 
             filter === 'read' ? "No read notifications to show." :
             "No notifications yet. We'll notify you when something important happens."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;