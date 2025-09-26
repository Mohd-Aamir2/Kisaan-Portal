import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sprout, Search, Bell, X } from "lucide-react";

interface Crop {
  _id: string;
  cropType: string;
  fertilizerUsed: string;
  yield: number;
  createdAt: string;
  email?: string;
  lastFertilizingDate?: string;
  lastPestDate?: string;
  userId?: string;
}

const CropHistory: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/crops/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrops(res.data.crops || []);
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  const filteredCrops = crops.filter(
    (crop) =>
      crop.cropType.toLowerCase().includes(search.toLowerCase()) ||
      crop.fertilizerUsed.toLowerCase().includes(search.toLowerCase()) ||
      crop.email?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const handleOpenForm = (userId: string) => {
    setSelectedUserId(userId);
    setShowForm(true);
  };

  const handleSendNotification = async () => {
    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      console.log(token);
      await axios.post(
        "http://localhost:4000/api/notifications/notify",
        { userId: selectedUserId, title, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Notification sent successfully");
      setShowForm(false);
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error("Error sending notification:", err);
      alert("❌ Failed to send notification");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Historical Crop Data
          </h2>
        </div>
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Crop Type</th>
              <th className="px-4 py-2">Fertilizer</th>
              <th className="px-4 py-2">Yield (kg/ha)</th>
              <th className="px-4 py-2">Last Fertilizing</th>
              <th className="px-4 py-2">Last Pest Control</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <tr
                  key={crop._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {crop.cropType}
                  </td>
                  <td className="px-4 py-2">{crop.fertilizerUsed}</td>
                  <td className="px-4 py-2">{crop.yield}</td>
                  <td className="px-4 py-2">
                    {formatDate(crop.lastFertilizingDate)}
                  </td>
                  <td className="px-4 py-2">
                    {formatDate(crop.lastPestDate)}
                  </td>
                  <td className="px-4 py-2 max-w-[150px] whitespace-normal break-words">
                    {crop.email || "N/A"}
                  </td>
                  <td className="px-4 py-2">{formatDate(crop.createdAt)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleOpenForm(crop.userId || "")}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                    >
                      <Bell className="w-4 h-4" />
                      Notify
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No crop history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Notification Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Send Notification
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendNotification}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropHistory;
