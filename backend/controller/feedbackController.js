// controllers/feedbackController.js
import Feedback from "../model/Feedback.js";
import mongoose from "mongoose";

export const createFeedback = async (req, res) => {
  try {
    const { title, content, improvements,username } = req.body;
    if (!content || !req.user) return res.status(400).json({ message: "Missing data" });

    const feedback = new Feedback({
      userId: req.user.id,
      username: username || "Anonymous",
      title,
      content,
      improvements: Array.isArray(improvements) ? improvements.map(t => ({ text: t })) : []
    });
    console.log(feedback)
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    // returns all feedbacks, newest first
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "Not found" });

    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { title, content, improvements } = req.body;
    if (title !== undefined) feedback.title = title;
    if (content !== undefined) feedback.content = content;
    if (improvements !== undefined) {
      // replace improvements array (or handle diff updates on separate endpoints)
      feedback.improvements = Array.isArray(improvements) ? improvements.map(t => ({ text: t })) : [];
    }
    feedback.updatedAt = new Date();

    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "Not found" });
    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await feedback.deleteOne({ _id: id });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addReply = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { content } = req.body;
    const {username}=req.body;
   // console.log("feedbackid",feedbackId);
    //console.log("content",content);
    if (!content) {
      return res.status(400).json({ message: "Reply content is required" });
    }

    // req.user is available from auth middleware (admin user)
    const reply = {
      userId: req.user.id,
      username: username, // store admin's name
      role: "user",
      content,
    };
    console.log(reply)
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.replies.push(reply);
    await feedback.save();

    res.status(201).json({ message: "Reply added", feedback });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const addReplyadmin = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { content } = req.body;
    const {username}=req.body;
    console.log("feedbackid",feedbackId);
    console.log("content",content);
    if (!content) {
      return res.status(400).json({ message: "Reply content is required" });
    }
    console.log("req.user object:", req.admin);
    console.log("req id",req.admin.id)
    // req.user is available from auth middleware (admin user)
    const reply = {
      userId: req.admin.id,
      username: username, // store admin's name
      role:"admin",
      content,
      createdAt: new Date()
    };
    console.log(reply)
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    feedback.replies.push(reply);
    await feedback.save();
    res.status(201).json({ message: "Reply added", feedback });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

