import express from "express";
import {
  triggerDailyAlerts,
  triggerAlertsForCrop,
} from "../controller/croncontroller.js";

const router = express.Router();

// External cron (cron-job.org / GitHub Actions) ise roz ping karega
router.post("/daily-alerts", triggerDailyAlerts);

// Debugging - ek crop ke liye
router.post("/alerts/:cropId", triggerAlertsForCrop);

export default router;