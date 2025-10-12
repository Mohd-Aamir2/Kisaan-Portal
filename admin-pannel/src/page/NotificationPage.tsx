import React, { useState, useEffect } from 'react';
import { Bell, Plus, Clock, Search, Filter } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationModal from '../components/NotificationModel';
import CropHistory from '../components/CropHistory';

interface Notification {
  _id: string;              // from backend
  title: string;
  message: string;
  createdAt: string;
  status?: 'sent' | 'pending' | 'failed';
  recipients?: number;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch notifications from backend
        const res = await axios.get('http://localhost:4000/api/notificationsall/all');
        const notifData: Notification[] = res.data.notifications.map((n: any) => ({
          _id: n._id,
          title: n.title,
          message: n.message,
          createdAt: n.createdAt,
          status: n.status || 'sent',
          recipients: n.recipients || 0,
        }));
        setNotifications(notifData);

        // Fetch crops
        const cropsRes = await axios.get('http://localhost:4000/api/crops/all');
        setCrops(cropsRes.data.crops || []);

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleSendNotification = (data: NotificationFormData) => {
  //   const newNotification: Notification = {
  //     _id: Date.now().toString(),
  //     title: data.title,
  //     message: data.message + (data.targetType === 'state' ? ` (State: ${data.state})` : data.targetType === 'district' ? ` (District: ${data.district})` : ''),
  //     createdAt: new Date().toISOString(),
  //     status: 'sent',
  //     recipients: 12847,
  //   };
  //   setNotifications(prev => [newNotification, ...prev]);
  // };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  const filteredNotifications = notifications.filter(n => 
    n.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || n.status === statusFilter)
  );

  if (isLoading) return <div className="flex items-center justify-center h-96"><LoadingSpinner /></div>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Notifications Section */}
        <div className="space-y-6 flex-1">
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
              {filteredNotifications.map(n => (
                <div key={n._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 leading-relaxed">{n.title}</p>
                        {n.status && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(n.status)}`}>
                            {n.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{n.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(n.createdAt)}
                        </div>
                        <div>Recipients: {n.recipients?.toLocaleString() || 0}</div>
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
        <CropHistory />
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
       // onSend={handleSendNotification}
      />
    </div>
  );
};

export default NotificationsPage;
