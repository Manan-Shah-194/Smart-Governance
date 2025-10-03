import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X, Filter, CheckCheck } from 'lucide-react';

const Notifications = ({ user, notifications, setNotifications }) => {
  const [filterType, setFilterType] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notificationTypes = [
    { value: 'all', label: 'All Notifications', icon: Bell },
    { value: 'success', label: 'Success', icon: CheckCircle, color: 'text-green-600' },
    { value: 'error', label: 'Error', icon: AlertCircle, color: 'text-red-600' },
    { value: 'info', label: 'Information', icon: Info, color: 'text-blue-600' },
    { value: 'emergency', label: 'Emergency', icon: AlertCircle, color: 'text-red-600' }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Complaint Submitted Successfully',
      message: 'Your complaint COMP-123456789 has been submitted and is under review.',
      time: '2 hours ago',
      read: false,
      category: 'Complaint',
      action: 'View Status'
    },
    {
      id: 2,
      type: 'info',
      title: 'Appointment Confirmed',
      message: 'Your appointment for birth certificate is confirmed for 18th January at 10:00 AM.',
      time: '1 day ago',
      read: true,
      category: 'Appointment',
      action: 'View Details'
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your electricity bill payment of ₹1,250 has been processed successfully.',
      time: '2 days ago',
      read: true,
      category: 'Payment',
      action: 'Download Receipt'
    },
    {
      id: 4,
      type: 'info',
      title: 'Document Ready',
      message: 'Your income certificate is ready for download.',
      time: '3 days ago',
      read: false,
      category: 'Document',
      action: 'Download'
    },
    {
      id: 5,
      type: 'error',
      title: 'Payment Failed',
      message: 'Your water bill payment failed. Please try again or contact support.',
      time: '4 days ago',
      read: true,
      category: 'Payment',
      action: 'Retry Payment'
    },
    {
      id: 6,
      type: 'emergency',
      title: 'Emergency Alert Sent',
      message: 'Your emergency alert has been sent to all emergency services. Help is on the way.',
      time: '1 week ago',
      read: true,
      category: 'Emergency',
      action: 'View Details'
    }
  ];

  const allNotifications = [...notifications, ...mockNotifications].sort((a, b) => 
    new Date(b.time) - new Date(a.time)
  );

  const filteredNotifications = allNotifications.filter(notification => {
    if (filterType === 'all') return true;
    return notification.type === filterType;
  });

  const unreadCount = allNotifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    const notificationType = notificationTypes.find(nt => nt.value === type);
    return notificationType ? notificationType.icon : Bell;
  };

  const getTypeColor = (type) => {
    const notificationType = notificationTypes.find(nt => nt.value === type);
    return notificationType ? notificationType.color : 'text-gray-600';
  };

  const getTypeBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100';
      case 'error': return 'bg-red-100';
      case 'info': return 'bg-blue-100';
      case 'emergency': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleAction = (notification) => {
    markAsRead(notification.id);
    // In a real app, this would navigate to the relevant page or perform the action
    console.log(`Performing action: ${notification.action} for notification: ${notification.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                <p className="text-gray-600">
                  Stay updated with your government service requests and important announcements.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="btn btn-secondary text-sm"
                  >
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Mark All Read
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="card mb-6">
            <div className="flex flex-wrap gap-2">
              {notificationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFilterType(type.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterType === type.value
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                    {type.value !== 'all' && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {allNotifications.filter(n => n.type === type.value).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="card text-center py-12">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
                <p className="text-gray-600">
                  {filterType === 'all' 
                    ? 'You have no notifications yet.'
                    : `No ${filterType} notifications found.`
                  }
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = getTypeIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`card cursor-pointer transition-all hover:shadow-md ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedNotification(notification)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 ${getTypeBgColor(notification.type)} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${getTypeColor(notification.type)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <span className="text-sm text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {notification.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(notification);
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {notification.action}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-xs text-gray-400 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Notification Detail Modal */}
          {selectedNotification && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${getTypeBgColor(selectedNotification.type)} rounded-full flex items-center justify-center`}>
                        {React.createElement(getTypeIcon(selectedNotification.type), {
                          className: `w-6 h-6 ${getTypeColor(selectedNotification.type)}`
                        })}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedNotification.title}</h2>
                        <p className="text-gray-600">{selectedNotification.category} • {selectedNotification.time}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
                      <p className="text-gray-600">{selectedNotification.message}</p>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <button
                        onClick={() => {
                          handleAction(selectedNotification);
                          setSelectedNotification(null);
                        }}
                        className="btn btn-primary"
                      >
                        {selectedNotification.action}
                      </button>
                      <button
                        onClick={() => {
                          markAsRead(selectedNotification.id);
                          setSelectedNotification(null);
                        }}
                        className="btn btn-secondary"
                      >
                        Mark as Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
