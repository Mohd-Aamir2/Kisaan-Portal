import express from "express";
import { createSoilReport, getSoilReports } from "../controller/soilreportcontroller.js";
import userAuth from "../middleware/auth.js";
const router = express.Router();

router.post("/soil",userAuth, createSoilReport);
router.get("/soil",userAuth, getSoilReports);

export default router;


