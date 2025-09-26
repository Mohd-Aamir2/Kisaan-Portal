import React, { useState, useEffect } from 'react';
import { Bell, Plus, Clock, Search, Filter, Sprout } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationModal from '../components/NotificationModel';
import CropHistory from '../components/CropHistory';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  status: 'sent' | 'pending' | 'failed';
  recipients: number;
}

interface Crop {
  _id: string;
  cropType: string;
  fertilizerUsed: string;
  yield: number;
  createdAt: string;
  userId?: {
    _id: string;
    name?: string;
    email?: string;
  };
}

const NotificationsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      { id: '1', message: 'System maintenance scheduled for tonight at 2 AM EST', timestamp: new Date(2024, 0, 15, 14, 30), status: 'sent', recipients: 12847 },
      { id: '2', message: 'New feature release: Dark mode is now available!', timestamp: new Date(2024, 0, 14, 10, 15), status: 'sent', recipients: 12847 },
      { id: '3', message: 'Welcome to our Q1 product updates webinar', timestamp: new Date(2024, 0, 13, 16, 45), status: 'sent', recipients: 8432 },
      { id: '4', message: 'Security update: Please update your password', timestamp: new Date(2024, 0, 12, 9, 20), status: 'failed', recipients: 0 },
      { id: '5', message: 'Monthly newsletter: January edition', timestamp: new Date(2024, 0, 11, 8, 0), status: 'pending', recipients: 12847 }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
  }, []);

  // Fetch crop history
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/crops/all"); 
        setCrops(res.data.crops || []);
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  const handleSendNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      status: 'sent',
      recipients: 12847
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }
   return (
  <div className="space-y-10">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Manage and send notifications to your users</p>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
      >
        <Plus className="w-4 h-4" />
        Send Notification
      </button>
    </div>

    {/* Two Column Layout for Large Screens */}
   <div className="flex flex-col lg:flex-row gap-8">
      {/* Notifications Section */}
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Notifications ({filteredNotifications.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">
                        {notification.message}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}
                      >
                        {notification.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(notification.timestamp)}
                      </div>
                      <div>
                        Recipients: {notification.recipients.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Crop History Section */}
      {/* Crop History Section */}
       <CropHistory />

    </div>

    {/* Notification Modal */}
    <NotificationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      //onSend={handleSendNotification}
    />
  </div>
);
};

export default NotificationsPage;
