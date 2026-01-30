import React, { useState, useEffect, useContext } from 'react';
import { MessageSquare, User, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/appcontext';

interface Feedback {
  _id: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  improvements: { text: string; done: boolean; _id: string }[];
  createdAt: string;
  updatedAt: string;
  replies: { _id: string; username: string; content: string; createdAt: string }[];
}

const FeedbackPage: React.FC = () => {
  const context = useContext(AppContext);
  const { username: currentUserName } = context || { username: '' };
 // const {token}=context;
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [loadingReply, setLoadingReply] = useState<{ [key: string]: boolean }>({});

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("https://kisaan-portal-backend.onrender.com/api/feedback");
        setFeedback(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Invalid Date";
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(parsedDate);
  };

  const filteredFeedback = feedback.filter(item => {
    return (
      (item.content?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.username?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  });

  const handleReply = async (fbId: string) => {
    const text = replyText[fbId];
    if (!text?.trim()) return;
    console.log(fbId)
    try {
      setLoadingReply(prev => ({ ...prev, [fbId]: true }));
      const token = localStorage.getItem('adminToken');
      console.log("token",token)
      await axios.post(
        `http://localhost:4000/api/${fbId}/replyadmin`,
        { userId:fbId,content: text, username: currentUserName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyText(prev => ({ ...prev, [fbId]: '' }));
      // Refresh feedbacks after reply
      const res = await axios.get("https://kisaan-portal-backend.onrender.com/api/feedback");
      setFeedback(res.data);
    } catch (err) {
      console.error("Error posting reply:", err);
    } finally {
      setLoadingReply(prev => ({ ...prev, [fbId]: false }));
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
        <p className="text-gray-600">Review and manage user feedback</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Feedback ({filteredFeedback.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredFeedback.map(item => (
            <div key={item._id} className="p-6 hover:bg-gray-50 transition-colors">
              {/* Feedback header */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-gray-900">{item.username}</p>
                      {item.username === currentUserName && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                  </div>
                  {item.title && <h4 className="text-lg font-semibold">{item.title}</h4>}
                  <p className="text-gray-700 mt-1">{item.content}</p>

                  {/* Improvements */}
                  {item.improvements?.length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-600 mt-2">
                      {item.improvements.map(imp => (
                        <li key={imp._id}>{imp.text}</li>
                      ))}
                    </ul>
                  )}

                  {/* Replies */}
                  {item.replies?.length > 0 && (
                    <div className="mt-4 border-t pt-3">
                      <p className="text-sm font-medium text-gray-600 mb-2">Replies:</p>
                      <ul className="space-y-2">
                        {item.replies.map(r => (
                          <li
                            key={r._id}
                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {r.username?.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-blue-800 flex items-center gap-1">
                                  {r.username}
                                  {r.username === currentUserName && (
                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                  )}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatDate(r.createdAt)}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700 ml-11">{r.content}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Reply input */}
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText[item._id] || ''}
                      onChange={(e) =>
                        setReplyText(prev => ({ ...prev, [item._id]: e.target.value }))
                      }
                      className="flex-1 border rounded px-3 py-2 text-sm"
                    />
                    <button
                      onClick={() => handleReply(item._id)}
                      disabled={loadingReply[item._id]}
                      className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                    >
                      {loadingReply[item._id] ? "Sending..." : "Reply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFeedback.length === 0 && (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No feedback found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
