import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, MessageSquare, Bell, Plus, Clock, User } from 'lucide-react';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationModal from '../components/NotificationModel';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  status: 'sent' | 'pending';
}

interface Feedback {
  _id: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  improvements: { text: string; done: boolean; _id: string }[];
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [notificationsSent, setNotificationsSent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersRes = await axios.get('http://localhost:4000/api/user/all');
        setTotalUsers(usersRes.data.users.length);

        // Fetch feedback
        const feedbackRes = await axios.get('http://localhost:4000/api/feedback');
        setFeedback(feedbackRes.data); // array of feedback
        setFeedbackCount(feedbackRes.data.length);

        // Fetch notifications (if you have a notifications endpoint)
        const notificationsRes = await axios.get('http://localhost:4000/api/notifications/all');
        setNotifications(notificationsRes.data.notifications);
        setNotificationsSent(notificationsRes.data.notifications.length);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      status: 'sent',
    };
    setNotifications(prev => [newNotification, ...prev]);
    setNotificationsSent(prev => prev + 1);
  };

  const formatDate = (date: string | Date) => {
    const parsed = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsed);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Feedback Count"
            value={feedbackCount}
            icon={MessageSquare}
            color="green"
          />
          <StatCard
            title="Notifications Sent"
            value={notificationsSent.toLocaleString()}
            icon={Bell}
            color="purple"
          />
        </div>
      </section>

      {/* Recent Notifications & Feedback */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Notifications */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Send Notification
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {notifications.slice(0, 3).map(notification => (
                <div key={notification.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">{notification.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {formatDate(notification.timestamp)}
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {notification.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Feedback */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Feedback</h2>
          </div>
          <div className="p-6 space-y-4">
            {feedback.slice(0, 3).map(item => (
              <div key={item._id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.username}</p>
                      <p className="text-sm text-gray-500">{item.title}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
       // onSend={handleSendNotification}
      />
    </div>
  );
};

export default Dashboard;
