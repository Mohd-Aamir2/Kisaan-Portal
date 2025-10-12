"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sun, Bug, CalendarClock, Megaphone } from "lucide-react";
import { AppContext } from "@/app/context/appcontext";

interface Notification {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: "weather" | "pest" | "schedule" | "gov"; // optional type for icon
}

const alertIcons: { [key: string]: React.ReactNode } = {
  weather: <Sun className="w-6 h-6 text-yellow-500" />,
  pest: <Bug className="w-6 h-6 text-red-500" />,
  schedule: <CalendarClock className="w-6 h-6 text-blue-500" />,
  gov: <Megaphone className="w-6 h-6 text-indigo-500" />,
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

  if (loading) return <p className="text-center mt-4">Loading notifications...</p>;

  if (!notifications.length)
    return <p className="text-center mt-4 text-gray-500">No notifications available</p>;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {notifications.map((alert) => (
        <Card key={alert._id} className={`hover:shadow-md transition-shadow ${alert.read ? "opacity-70" : "opacity-100"}`}>
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {alertIcons[alert.type || "gov"] || <Megaphone className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <CardTitle>{alert.title}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.createdAt).toLocaleDateString()}
                </span>
              </div>
              <CardDescription className="mt-1">{alert.message}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
