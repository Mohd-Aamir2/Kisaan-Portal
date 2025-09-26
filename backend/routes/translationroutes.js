import express from "express";
import {translateText } from "../controller/translationController.js";

const router = express.Router();

// GET translations for a language
// POST /api/translate
router.post("/translate", translateText);

export default router;
