import express from "express";
import verifyToken from "../middleware/verify.js";
import {
  createFeedback, getAllFeedbacks, updateFeedback, deleteFeedback,addReply,addReplyadmin
} from "../controller/feedbackController.js";
import authMiddleware from "../middleware/adminauth.js";

const router = express.Router();

router.get("/feedback", getAllFeedbacks);         // public: everyone sees feedbacks
router.post("/feedback", verifyToken, createFeedback); // authenticated users post
router.put("/:id", verifyToken, updateFeedback); // only owner
router.delete("/:id", verifyToken, deleteFeedback); // only owner
router.post("/:feedbackId/reply", verifyToken, addReply);
router.post("/:feedbackId/replyadmin", authMiddleware, addReplyadmin);
export default router;
