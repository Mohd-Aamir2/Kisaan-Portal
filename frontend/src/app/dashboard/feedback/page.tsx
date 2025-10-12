"use client";
import { useContext, useEffect, useState } from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import FeedbackItem from "@/components/feedback/FeedbackItem";
import EditModal from "@/components/feedback/EditModel";
import { fetchFeedbacks, putFeedback, delFeedback } from "@/lib/api";
import { Feedback } from "@/types/feedback";
import toast from "react-hot-toast";
import { AppContext } from "@/app/context/appcontext";
import { jwtDecode } from "jwt-decode";

interface Props {
  fb: Feedback;
  currentUserId?: string;
  onEdit: (fb: Feedback) => void;
  onDelete: (id: string) => void;
}
interface TokenPayload {
  id: string;
}

export default function FeedbackPage() {
   const context = useContext(AppContext);
    if (!context) {
      throw new Error("AppContext must be used within AppContextProvider");
    }
  const {token}=context;
  console.log(token);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Feedback | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
// decode token to get current user id
 //let currentUserId: string | undefined;
useEffect(() => {
  if (!token) {
    console.warn("No token found in context, skipping decode.");
    return;
  }

  try {
    const payload = jwtDecode<TokenPayload>(token);
    setCurrentUserId(payload.id);
    console.log("Decoded userId:", payload.id);
  } catch (err) {
    console.error("JWT decode failed", err);
    setCurrentUserId(undefined);
  }
}, [token]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await fetchFeedbacks();
      console.log(data);
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (newFb: Feedback) => setFeedbacks(prev => [newFb, ...prev]);

  const handleEdit = (fb: Feedback) => setEditing(fb);

  const handleDelete = async (id: string) => {
    if (!token) return toast.error("Login required");
    if (!confirm("Delete this feedback?")) return;
    try {
      await delFeedback(id, token);
      setFeedbacks(prev => prev.filter(f => f._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const submitEdit = async (data: { title?: string; content?: string; improvements?: string[] }) => {
    if (!editing || !token) return;
    try {
      const updated = await putFeedback(editing._id, data, token);
      setFeedbacks(prev => prev.map(f => (f._id === editing._id ? updated : f)));
      setEditing(null);
      toast.success("Updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Farmer Feedback</h2>

      <FeedbackForm onAdded={handleAdd} />

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">All feedbacks</h3>
        {loading ? (
          <p>Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map(fb => (
            <FeedbackItem
              key={fb._id}
              fb={fb}
              currentUserId={currentUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              refresh={loadFeedbacks} 
            />
          ))
        )}
      </div>

      {editing && (
        <EditModal
          feedback={editing}
          onClose={() => setEditing(null)}
          onSubmit={submitEdit}
        />
      )}
    </div>
  );
}
