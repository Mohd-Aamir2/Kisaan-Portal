import express from "express";
import { getMarketPrices } from "../controller/marketController.js";

const router = express.Router();

// GET /api/market-prices/:district
router.get("/:district", getMarketPrices);

export default router;
