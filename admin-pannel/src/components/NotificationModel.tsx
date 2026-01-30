"use client";
import React, { useState } from "react";
import { X, Send } from "lucide-react";
import axios from "axios";

export interface NotificationFormData {
  title: string;
  message: string;
  targetType: "all" | "state" | "district";
  state?: string;
  district?: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (data: NotificationFormData) => void; // parent callback
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, onSend }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState<NotificationFormData["targetType"]>("all");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
  if (!title.trim() || !message.trim()) return;

  const payload: NotificationFormData = { title, message, targetType };
  if (targetType === "state") payload.state = state;
  if (targetType === "district") payload.district = district;

  setIsSending(true);
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("No token found");

    // 👇 route change based on targetType
    const url =
      targetType === "all" || targetType === "state" || targetType === "district"
        ? "https://kisaan-portal-backend.onrender.com/api/notificationsall/notify"
        : "https://kisaan-portal-backend.onrender.com/api/notifications/notify";

    const res = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 201) {
      alert("✅ Notification sent successfully!");
      // reset form
      setTitle("");
      setMessage("");
      setState("");
      setDistrict("");
      setTargetType("all");
      onClose();
      if (onSend) onSend(payload); // parent ko notify
    }
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || "❌ Failed to send notification");
  } finally {
    setIsSending(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">Send Notification</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Enter Notification Title"
            className="w-full px-3 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Message */}
          <textarea
            rows={4}
            placeholder="Enter Notification Message..."
            className="w-full px-3 py-2 border rounded-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Target Type */}
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value as NotificationFormData["targetType"])}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">All Users</option>
            <option value="state">State-wise</option>
            <option value="district">District-wise</option>
          </select>

          {/* State input */}
          {targetType === "state" && (
            <input
              type="text"
              placeholder="Enter State"
              className="w-full px-3 py-2 border rounded-lg"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          )}

          {/* District input */}
          {targetType === "district" && (
            <input
              type="text"
              placeholder="Enter District"
              className="w-full px-3 py-2 border rounded-lg"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={
              !title.trim() ||
              !message.trim() ||
              (targetType === "state" && !state.trim()) ||
              (targetType === "district" && !district.trim()) ||
              isSending
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isSending ? "Sending..." : <><Send className="w-4 h-4" />Send</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
