// routes/notificationRoutes.js
import express from "express";
import {
  sendNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
  getAllNotifications
} from "../controller/notificationmany.js";

import verifyToken from "../middleware/verify.js";
import  adminauth from '../middleware/adminauth.js';
const router = express.Router();

// Admin sends notifications
router.post("/notify",verifyToken, adminauth, sendNotification);
// User gets their notifications
router.get("/", verifyToken, getUserNotifications);
router.get("/all",getAllNotifications)
// User marks notification as read
router.patch("/:id/read", verifyToken, markAsRead);
// User/admin deletes notification
router.delete("/:id", verifyToken, deleteNotification);


export default router;
