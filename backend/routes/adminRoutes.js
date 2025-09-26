
import express from "express";
import { signupAdmin, loginAdmin, getAdmins } from "../controller/admincontroller.js";
import authMiddleware from "../middleware/adminauth.js";

const router = express.Router();

// Public routes
router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

// Protected routes
router.get("/", authMiddleware, getAdmins);

export default router;
