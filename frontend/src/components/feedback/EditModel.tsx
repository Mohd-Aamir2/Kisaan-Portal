"use client";
import { useState, FormEvent } from "react";
import { Feedback } from "@/types/feedback";

interface Props {
  feedback: Feedback;
  onClose: () => void;
  onSubmit: (data: { title?: string; content?: string; improvements?: string[] }) => void;
}

export default function EditModal({ feedback, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState(feedback.title || "");
  const [content, setContent] = useState(feedback.content || "");
  const [improvementsText, setImprovementsText] = useState(
    (feedback.improvements || []).map(i => i.text).join("\n")
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const improvements = improvementsText.split("\n").map(s => s.trim()).filter(Boolean);
    onSubmit({ title, content, improvements });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-lg">
        <h4 className="font-semibold mb-2">Edit feedback</h4>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-2 p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            rows={3}
            value={improvementsText}
            onChange={e => setImprovementsText(e.target.value)}
            placeholder="One improvement per line"
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
