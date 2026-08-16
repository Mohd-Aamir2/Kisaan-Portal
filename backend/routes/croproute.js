import express from "express";
import {
  getCropsByUser,
  addCrop,
  deleteCrop,
  updateCrop,
  getAllCrops,
  markActionDone,
  recordHarvest,
  getSupportedCrops,
} from "../controller/cropcontroller.js";
import verifyToken from "../middleware/verify.js";
import adminauth from "../middleware/adminauth.js";

const router = express.Router();

// ⚠️ Static routes ("/supported", "/all") dynamic routes ("/:id") se PEHLE
// aane chahiye. Warna Express "/supported" ko id samajh lega.
router.get("/supported", getSupportedCrops);
router.get("/all", getAllCrops);

// Crop CRUD
router.post("/", verifyToken, addCrop);
router.get("/", verifyToken, getCropsByUser);
router.put("/:id", verifyToken, updateCrop);
router.delete("/:id", verifyToken, deleteCrop);

// Stage tracking
router.patch("/:id/action", verifyToken, markActionDone);
router.patch("/:id/harvest", verifyToken, recordHarvest);

export default router;