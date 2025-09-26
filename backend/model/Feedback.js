// models/Feedback.js
import mongoose from "mongoose";

const ImprovementSchema = new mongoose.Schema({
  text: { type: String, trim: true },
  done: { type: Boolean, default: false },
});

// ✅ Reply Schema
const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true }, // reply sender's name
  role: { type: String, enum: ["user", "admin"], default: "user" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true }, // feedback owner
  title: { type: String, trim: true },
  content: { type: String, trim: true, required: true },
  improvements: [ImprovementSchema], // suggested tasks
  replies: [ReplySchema],            // ✅ nested replies
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

FeedbackSchema.index({ createdAt: -1 });

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
