import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appcontext";
import axios from "axios";
import { CheckCircle } from "lucide-react";

export default function AdminProfilePage() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within AppContextProvider");
  }

  const { username, email, role, setToken, setEmail, setRole, setUsername } = context;

  // Optional: create initials if no profilePic
  const initials = username ? username.charAt(0).toUpperCase() : "A";

  const handleLogout = () => {
    setToken(null);
    setUsername('');
    setEmail('');
    setRole('');

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    // Redirect to login page
    window.location.href = "/login";
  };

  // State for real counts
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState<number>(0);

  // Fetch real counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await axios.get("https://kisaan-portal-backend.onrender.com/api/user/all");
        setTotalUsers(usersRes.data.users.length);

        const feedbackRes = await axios.get("https://kisaan-portal-backend.onrender.com/api/feedback");
        setTotalFeedbacks(feedbackRes.data.length);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8 justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-green-400 flex items-center justify-center text-white text-3xl font-bold">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {username || "Admin Name"} 
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </h1>
            <p className="text-gray-600">{email || "admin@example.com"}</p>
            <p className="text-gray-500">{role || "Manager"}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500">Total Feedbacks</p>
          <p className="text-2xl font-bold">{totalFeedbacks}</p>
        </div>
      </div>

      {/* Recent Activity / Notifications */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-2">
            <span className="font-medium flex items-center gap-1">
              User John Doe
              
            </span> submitted feedback
          </li>
          <li className="py-2">
            <span className="font-medium flex items-center gap-1">
              User Jane Smith
             
            </span> replied to a feedback
          </li>
          <li className="py-2">
            <span className="font-medium">System</span> updated the crop alert data
          </li>
        </ul>
      </div>
    </div>
  );
}

