import { Feedback } from "@/types/feedback";
import { AppContext } from "@/app/context/appcontext";
import { useContext, useState } from "react";
import axios from "axios";

interface Props {
  fb: Feedback;
  currentUserId?: string;
  onEdit: (fb: Feedback) => void;
  onDelete: (id: string) => void;
  refresh: () => void; // 🔄 added prop to refresh after reply
}

export default function FeedbackItem({
  fb,
  currentUserId,
  onEdit,
  onDelete,
  refresh,
}: Props) {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("AppContext must be used within AppContextProvider");

  const { name } = context;
  const isOwner = fb.userId === currentUserId;

  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("token",token);
      console.log(fb._id);
      await axios.post(
        `http://localhost:4000/api/${fb._id}/reply`,
        { content: replyText,
          username: name,
         },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReplyText("");
      refresh(); // reload feedback list after posting
    } catch (err) {
      console.error("Error posting reply:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-white font-bold">
            {fb.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{fb.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(fb.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(fb)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(fb._id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3">
        {fb.title && <h4 className="text-lg font-semibold">{fb.title}</h4>}
        <p className="text-gray-700 mt-1">{fb.content}</p>
      </div>

      {/* Improvements */}
      {fb.improvements && fb.improvements.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-600">Improvement tasks:</p>
          <ul className="list-disc ml-5 mt-1 text-gray-700">
            {fb.improvements.map((it, i) => (
              <li key={i}>{it.text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Replies */}
{/* Replies */}
{fb.replies && fb.replies.length > 0 && (
  <div className="mt-4 border-t pt-3">
    <p className="text-sm font-medium text-gray-600 mb-2">Replies:</p>
    <ul className="space-y-3">
      {fb.replies.map((r, i) => (
        <li
          key={i}
          className="bg-blue-50 p-3 rounded-lg border border-blue-100"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold flex-shrink-0">
              {r.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-blue-800">
                {r.username}{" "}
                <span className="text-xs text-gray-500 ml-1">
                    ({r.role || "user"})
                </span>
              </span>
              <span className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-gray-700 ml-11">{r.content}</p>
        </li>
      ))}
    </ul>
  </div>
)}


      {/* Reply Input */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleReply}
          disabled={loading}
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
        >
          {loading ? "Sending..." : "Reply"}
        </button>
      </div>
    </div>
  );
}
