import Crop from "../model/crop.js";
import User from "../model/usermodel.js";
import {
  normalizeCropType,
  getCurrentStage,
  getDueActions,
  listSupportedCrops,
} from "../utils/cropStage.js";

/** Crop document ke saath live stage info attach karo. */
function withStage(cropDoc) {
  const crop = cropDoc.toObject ? cropDoc.toObject() : cropDoc;

  if (crop.status !== "growing") {
    return { ...crop, tracking: null };
  }

  const doneKeys = (crop.completedActions || []).map((a) => a.key);
  const stageInfo = getCurrentStage(crop.cropKey || crop.cropType, crop.sowingDate);

  if (!stageInfo) {
    // Crop calendar me nahi hai - tracking nahi kar sakte, baaki sab theek hai
    return { ...crop, tracking: null, trackingSupported: false };
  }

  const actions = getDueActions(crop.cropKey || crop.cropType, crop.sowingDate, {
    completedActions: doneKeys,
  });

  return {
    ...crop,
    trackingSupported: true,
    tracking: {
      daysSinceSowing: stageInfo.daysSinceSowing,
      progressPercent: stageInfo.progressPercent,
      status: stageInfo.status,
      stage: stageInfo.stage
        ? { key: stageInfo.stage.key, name: stageInfo.stage.name }
        : null,
      dueActions: actions.due,
      upcomingActions: actions.upcoming,
      overdueActions: actions.overdue,
    },
  };
}

// ➕ Add new crop
export const addCrop = async (req, res) => {
  try {
    const {
      cropType,
      sowingDate,
      variety,
      area,
      fertilizerUsed,
      yield: cropYield,
      lastFertilizingDate,
      lastPestDate,
    } = req.body;

    const userId = req.user.id;

    // Ab sirf ye do zaroori hain. yield/fertilizer baad me bhare jayenge.
    if (!cropType || !sowingDate) {
      return res
        .status(400)
        .json({ message: "Crop type and sowing date are required" });
    }

    const sown = new Date(sowingDate);
    if (isNaN(sown.getTime())) {
      return res.status(400).json({ message: "Invalid sowing date" });
    }

    // 2 saal se purani date aksar typo hoti hai
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    if (sown < twoYearsAgo) {
      return res
        .status(400)
        .json({ message: "Sowing date looks too old. Please check it." });
    }

    const user = await User.findById(userId).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Calendar me hai ya nahi - na ho to bhi save karo, bas tracking nahi milegi
    const cropKey = normalizeCropType(cropType);

    const newCrop = new Crop({
      userId,
      username: user.name,
      email: user.email,
      cropType,
      cropKey,
      variety: variety || undefined,
      sowingDate: sown,
      area: area || undefined,
      fertilizerUsed: fertilizerUsed || undefined,
      yield: cropYield || undefined,
      lastFertilizingDate: lastFertilizingDate || null,
      lastPestDate: lastPestDate || null,
    });

    await newCrop.save();

    res.status(201).json({
      crop: withStage(newCrop),
      trackingSupported: Boolean(cropKey),
      message: cropKey
        ? undefined
        : `We don't have a growth calendar for "${cropType}" yet, so stage tracking is unavailable for this crop.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📖 Get crops for logged-in user (stage info ke saath)
export const getCropsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const crops = await Crop.find({ userId }).sort({ createdAt: -1 });
    res.json(crops.map(withStage));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Mark a calendar action as done
export const markActionDone = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionKey, note } = req.body;
    const userId = req.user.id;

    if (!actionKey) {
      return res.status(400).json({ message: "actionKey is required" });
    }

    const crop = await Crop.findOne({ _id: id, userId });
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    if (crop.completedActions.some((a) => a.key === actionKey)) {
      return res.status(200).json({
        message: "Already marked as done",
        crop: withStage(crop),
      });
    }

    crop.completedActions.push({ key: actionKey, note, completedAt: new Date() });

    // Convenience fields - dashboard aur alerts dono me kaam aate hain
    if (actionKey.includes("top_dress") || actionKey.includes("fertiliz")) {
      crop.lastFertilizingDate = new Date();
    }
    if (actionKey.includes("pest") || actionKey.includes("blight") || actionKey.includes("borer")) {
      crop.lastPestDate = new Date();
    }

    await crop.save();
    res.json({ crop: withStage(crop) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🌾 Record harvest — yield yahan aata hai, sowing ke waqt nahi
export const recordHarvest = async (req, res) => {
  try {
    const { id } = req.params;
    const { yield: cropYield, harvestDate, status } = req.body;
    const userId = req.user.id;

    const crop = await Crop.findOne({ _id: id, userId });
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    crop.status = status === "failed" ? "failed" : "harvested";
    crop.harvestDate = harvestDate ? new Date(harvestDate) : new Date();
    if (cropYield != null) crop.yield = cropYield;

    await crop.save();
    res.json({ crop: withStage(crop) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📋 Supported crops list — frontend dropdown ke liye
export const getSupportedCrops = async (_req, res) => {
  try {
    res.json(listSupportedCrops());
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🗑 Delete a crop
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await Crop.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Crop not found or not authorized" });
    }

    res.json({ message: "Crop deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✏️ Update crop
export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // ⚠️ Sirf wahi fields set karo jo request me actually aaye hain.
    // Pehle sab blindly set hote the - frontend ek field bhejta to
    // baaki undefined hokar wipe ho jaate the.
    const allowed = [
      "cropType", "variety", "sowingDate", "area",
      "fertilizerUsed", "yield", "lastFertilizingDate", "lastPestDate",
    ];

    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    // cropType badla to calendar key bhi dobara nikalo
    if (updates.cropType) {
      updates.cropKey = normalizeCropType(updates.cropType);
    }

    if (updates.sowingDate) {
      const sown = new Date(updates.sowingDate);
      if (isNaN(sown.getTime())) {
        return res.status(400).json({ message: "Invalid sowing date" });
      }
      updates.sowingDate = sown;
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updated = await Crop.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Crop not found or not authorized" });
    }

    res.json(withStage(updated));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📖 Get all crops (admin)
export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json({ crops: crops.map(withStage) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};