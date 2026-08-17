import { runDailyAlerts, runAlertsForCrop } from "../utils/alertService.js";

/**
 * POST /api/cron/daily-alerts
 *
 * Ye endpoint public internet pe rahega (external cron ise ping karega),
 * isliye ek shared secret se protect kiya hai. Bina iske koi bhi
 * baar-baar ping karke DB pe load daal sakta hai.
 *
 * Header:  x-cron-secret: <CRON_SECRET>
 * Query:   ?dryRun=true  (kuch save nahi hoga, sirf count aayega)
 */
export const triggerDailyAlerts = async (req, res) => {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "CRON_SECRET is not configured on the server",
    });
  }

  const provided = req.get("x-cron-secret");
  if (provided !== secret) {
    // 404 dete hain 401 nahi - endpoint ka pata hi na chale
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const dryRun = req.query.dryRun === "true";
    const summary = await runDailyAlerts({ dryRun });
    res.json(summary);
  } catch (err) {
    console.error("[cron] daily alerts failed:", err);
    res.status(500).json({ message: "Alert run failed", error: err.message });
  }
};

/**
 * POST /api/cron/alerts/:cropId  — ek crop ke liye, debugging ke liye.
 * Isko normal user auth se protect kiya jaa sakta hai, par abhi
 * same secret use kar rahe hain.
 */
export const triggerAlertsForCrop = async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.get("x-cron-secret") !== secret) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const result = await runAlertsForCrop(req.params.cropId, {
      dryRun: req.query.dryRun === "true",
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};