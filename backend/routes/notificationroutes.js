// routes/notificationRoutes.js
import express from "express";
import {
  sendNotification,
  getUserNotifications,
  markAsRead,
} from "../controller/notificationcontroller.js";
import authMiddleware from "../middleware/verify.js";
import adminMiddleware from "../middleware/adminauth.js"; // optional, if only admin can send

const router = express.Router();

// Admin sends notification
router.post("/notify", authMiddleware, adminMiddleware, sendNotification);

// User fetch notifications
router.get("/", authMiddleware, getUserNotifications);

// Mark as read
router.put("/:id/read", authMiddleware, markAsRead);

export default router;
