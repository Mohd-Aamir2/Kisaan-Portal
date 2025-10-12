// controllers/notificationController.js
import Notification from "../model/notification.js";
import User from "../model/usermodel.js";

// ✅ Send notification
export const sendNotification = async (req, res) => {
  try {
    const { title, message, targetType, state, district } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    let users = [];

    if (targetType === "all") {
      users = await User.find({});
    } else if (targetType === "state" && state) {
      users = await User.find({ state });
    } else if (targetType === "district" && district) {
      users = await User.find({ district });
    } else {
      return res.status(400).json({ message: "Invalid targetType or missing state/district" });
    }

    const notifications = users.map((u) => ({
      userId: u._id,
      title,
      message
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: "Notifications sent successfully",
      count: notifications.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all notifications (Admin)
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({})
     .sort({ createdAt: -1 });

    res.json({
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
