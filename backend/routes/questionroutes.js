// routes/questionRoutes.js
import express from "express";
import { askQuestion } from "../controller/questioncontroller.js";
const router = express.Router();

router.post("/askquestion", askQuestion);

export default router;
