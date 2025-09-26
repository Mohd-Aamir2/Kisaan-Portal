// controllers/notificationController.js
import Notification from "../model/notification.js";

// Send a notification (admin)
export const sendNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    if (!userId || !title || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const notification = await Notification.create({ userId, title, message });

    // Optional: emit real-time event if using Socket.IO
    if (req.io) {
      req.io.emit("new-notification", notification);
    }

    res.status(201).json({ message: "Notification sent", notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    res.json({ notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
