"use client";
import React, { useState } from "react";
import { X, Send } from "lucide-react";
import axios from "axios";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: () => void; // optional callback to refresh notifications list
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, onSend }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);

    try {
      const token = localStorage.getItem("token"); // get admin token
      if (!token) throw new Error("No token found");

      // Call backend notification route
      const res = await axios.post(
        "http://localhost:4000/api/notifications/notify",
        {
          title: "Admin Notification",
          message,
          type: "gov", // you can change the type dynamically if needed
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        alert("Notification sent successfully!");
        setMessage("");
        onClose();
        if (onSend) onSend(); // optional callback
      }
    } catch (err: any) {
      console.error("Error sending notification:", err);
      alert(err.response?.data?.message || "Failed to send notification");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Send Notification</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <label htmlFor="notification-message" className="block text-sm font-medium text-gray-700 mb-3">
            Notification Message
          </label>
          <textarea
            id="notification-message"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            placeholder="Enter your notification message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Notification
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
