/**
 * alertService.js — roz ke crop alerts generate karta hai.
 *
 * Poori tarah RULE-BASED hai. Koi LLM call nahi.
 * Kya bhejna hai ye crop calendar aur date decide karti hai, AI nahi.
 * (1000 farmers × roz LLM call = bekaar ka kharcha, bina kisi fayde ke.)
 */

import Crop from "../model/crop.js";
import Notification from "../model/notification.js";
import { getCurrentStage, getDueActions } from "../utils/cropStage.js";

/** Ek action se notification ka title + message banao. */
function buildNotification(crop, action, kind) {
  const cropName = crop.cropType;
  const hiTitle = action.title?.hi || action.title?.en || "कृषि सूचना";
  const hiDetail = action.detail?.hi || action.detail?.en || "";

  const dayInfo = `${cropName} — ${action.daysOffset >= 0 ? `${action.daysOffset} दिन` : ""}`;

  if (kind === "overdue") {
    return {
      title: `⚠️ ${hiTitle}`,
      message: `आपकी ${cropName} की फसल में "${hiTitle}" का समय ${action.daysOffset} दिन पहले था। ${hiDetail}`,
    };
  }

  return {
    title: hiTitle,
    message: `आपकी ${cropName} की फसल ${action.stageName?.hi || ""} अवस्था में है। ${hiDetail}`,
  };
}

/**
 * Ek crop ke liye jitne alerts banne chahiye, wo banao.
 * @returns {Promise<number>} kitne naye notifications bane
 */
async function processCrop(crop, { dryRun = false } = {}) {
  if (!crop.sowingDate) return 0;

  const cropKey = crop.cropKey || crop.cropType;
  const stageInfo = getCurrentStage(cropKey, crop.sowingDate);

  // Calendar me nahi hai, ya abhi boya nahi gaya
  if (!stageInfo || stageInfo.status === "not_sown") return 0;

  const doneKeys = (crop.completedActions || []).map((a) => a.key);
  const { due, overdue } = getDueActions(cropKey, crop.sowingDate, {
    completedActions: doneKeys,
  });

  // Due sab bhejte hain. Overdue me se sirf critical — warna farmer ko
  // roz purane kaamo ki list milegi aur wo notifications ignore karne lagega.
  const toSend = [
    ...due.map((a) => ({ action: a, kind: "due" })),
    ...overdue.filter((a) => a.critical).map((a) => ({ action: a, kind: "overdue" })),
  ];

  if (!toSend.length) return 0;

  let created = 0;

  for (const { action, kind } of toSend) {
    const { title, message } = buildNotification(crop, action, kind);

    if (dryRun) {
      console.log(`  [dry-run] ${crop.username} | ${crop.cropType} | ${title}`);
      created++;
      continue;
    }

    try {
      await Notification.create({
        userId: crop.userId,
        cropId: crop._id,
        actionKey: action.key,
        title,
        message,
        type: kind === "overdue" ? "crop_overdue" : "crop_action",
        priority: action.critical ? "critical" : "normal",
        channels: { inApp: { sent: true, sentAt: new Date() } },
      });
      created++;
    } catch (err) {
      // 11000 = duplicate key. Matlab ye alert pehle hi ja chuka hai.
      // Ye error nahi hai - yahi to hum chahte the.
      if (err.code !== 11000) {
        console.error(
          `[alertService] crop ${crop._id} action ${action.key} failed:`,
          err.message
        );
      }
    }
  }

  return created;
}

/**
 * Saare growing crops ke liye alerts generate karo.
 *
 * @param {object} opts
 * @param {boolean} opts.dryRun  true = kuch save nahi hoga, sirf log
 * @returns {Promise<{cropsChecked, notificationsCreated, errors, durationMs}>}
 */
export async function runDailyAlerts(opts = {}) {
  const start = Date.now();
  const { dryRun = false } = opts;

  let cropsChecked = 0;
  let notificationsCreated = 0;
  let errors = 0;

  // cursor use kar rahe hain, .find().toArray() nahi - taaki crops
  // badhne par bhi memory me sab ek saath load na ho
  const cursor = Crop.find({ status: "growing" }).cursor();

  for await (const crop of cursor) {
    cropsChecked++;
    try {
      notificationsCreated += await processCrop(crop, { dryRun });
    } catch (err) {
      errors++;
      console.error(`[alertService] crop ${crop._id} failed:`, err.message);
    }
  }

  const summary = {
    cropsChecked,
    notificationsCreated,
    errors,
    dryRun,
    durationMs: Date.now() - start,
    ranAt: new Date().toISOString(),
  };

  console.log("[alertService]", JSON.stringify(summary));
  return summary;
}

/** Ek hi crop ke liye chalao — debugging ke liye. */
export async function runAlertsForCrop(cropId, opts = {}) {
  const crop = await Crop.findById(cropId);
  if (!crop) throw new Error("Crop not found");
  const created = await processCrop(crop, opts);
  return { cropId, notificationsCreated: created };
}