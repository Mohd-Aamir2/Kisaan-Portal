import express from "express";
import { getCropsByUser, addCrop,deleteCrop,updateCrop,getAllCrops } from "../controller/cropcontroller.js";
import verifyToken from "../middleware/verify.js";
import  adminauth from '../middleware/adminauth.js';
//import { getAllCrops } from "../controller/cropcontroller.js";

const router = express.Router();

// Get crops by userId
router.post("/", verifyToken, addCrop);
router.get("/", verifyToken, getCropsByUser);
router.delete("/:id", verifyToken, deleteCrop);  // ✅ delete route
router.put("/:id", verifyToken, updateCrop);  
   // ✅ update route
router.get("/all", getAllCrops);

export default router;
