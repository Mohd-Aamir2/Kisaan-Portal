"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Sun,
  Bug,
  CalendarClock,
  Megaphone,
  Bell,
  Loader2,
} from "lucide-react";
import { AppContext } from "@/app/context/appcontext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Notification {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: "weather" | "pest" | "schedule" | "gov";
}

const alertStyles: Record<
  string,
  { icon: JSX.Element; bg: string; border: string }
> = {
  weather: {
    icon: <Sun className="w-6 h-6 text-yellow-500" />,
    bg: "from-yellow-50 to-yellow-100",
    border: "border-yellow-300",
  },
  pest: {
    icon: <Bug className="w-6 h-6 text-red-500" />,
    bg: "from-red-50 to-rose-100",
    border: "border-red-300",
  },
  schedule: {
    icon: <CalendarClock className="w-6 h-6 text-blue-500" />,
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-300",
  },
  gov: {
    icon: <Megaphone className="w-6 h-6 text-green-600" />,
    bg: "from-green-50 to-emerald-100",
    border: "border-green-300",
  },
};

export function AlertsList() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppContextProvider");

  const { token } = context;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-green-600 mb-3" />
        <p className="text-gray-600 font-medium">Fetching latest alerts...</p>
      </div>
    );

  if (!notifications.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Bell className="w-10 h-10 text-green-600 mb-3" />
        <p className="text-gray-500 text-lg font-medium">
          No notifications available at the moment.
        </p>
        <p className="text-sm text-gray-400">
          Stay tuned — new updates will appear here.
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-700 mb-6 text-center"
      >
        🌾 Live Alerts & Notifications
      </motion.h2>

      {notifications.map((alert, index) => {
        const style = alertStyles[alert.type || "gov"];

        return (
          <motion.div
            key={alert._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`relative overflow-hidden border-l-8 ${style.border} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${style.bg} ${
                alert.read ? "opacity-75" : "opacity-100"
              }`}
            >
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex-shrink-0 mt-1">{style.icon}</div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {alert.title}
                    </CardTitle>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardDescription className="mt-2 text-gray-700 leading-relaxed">
                    {alert.message}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-400 to-transparent opacity-30"></div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
