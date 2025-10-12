"use client";
import { useState, FormEvent,useContext } from "react";
import { postFeedback } from "@/lib/api";
import toast from "react-hot-toast";
import { AppContext } from "@/app/context/appcontext";

interface Reply {
  _id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface Feedback {
  _id: string;
  userId: string;
  username: string;
  title?: string;
  content: string;
  improvements?: { text: string; done: boolean; _id: string }[];
  replies?: Reply[];
  createdAt: string;
  updatedAt: string;
}

interface Props {
  fb: Feedback;                       // The feedback item
  currentUserId?: string;             // Logged-in user's id
  onEdit: (fb: Feedback) => void;     // Function to edit feedback
  onDelete: (id: string) => void;     // Function to delete feedback
}


export default function FeedbackForm({ onAdded }: { onAdded: (fb: any) => void }) {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within AppContextProvider");
  }

  const { token,name } = context;
  //console.log("Tokenn" ,token)
   
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [improvementsText, setImprovementsText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
     console.log("Form submitted!"); // <- check if this prints
    e.preventDefault();
    if (!token) return toast.error("Please login to submit feedback");

    const improvements = improvementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const feedback = await postFeedback({ title, content, improvements,username:name}, token);
      console.log(title,token, content, improvements)
      setTitle(""); setContent(""); setImprovementsText("");
      onAdded(feedback);
      toast.success("Feedback posted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white shadow">
      <h3 className="font-semibold mb-2">Give feedback / Improvement tasks</h3>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Short title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Describe your feedback..."
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Improvement tasks (one per line)"
        rows={3}
        value={improvementsText}
        onChange={(e) => setImprovementsText(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-green-600 text-white" type="submit">Submit</button>
        {!token && <p className="text-sm text-red-500 self-center">Login to post</p>}
      </div>
    </form>
  );
}
