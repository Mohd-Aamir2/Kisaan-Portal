// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },

    // ── Crop alert fields (manual notifications me ye khali rahenge) ──

    // Kis crop ke baare me hai
    cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },

    // cropCalendar ka action.key — duplicate rokne ke liye
    actionKey: { type: String },

    type: {
      type: String,
      enum: ["manual", "crop_action", "crop_overdue", "harvest_due"],
      default: "manual",
    },

    priority: {
      type: String,
      enum: ["normal", "critical"],
      default: "normal",
    },

    // WhatsApp delivery ke liye — abhi in-app hai, baad me kaam aayega
    channels: {
      inApp: { sent: { type: Boolean, default: true }, sentAt: Date },
      whatsapp: { sent: { type: Boolean, default: false }, sentAt: Date, messageId: String },
    },
  },
  { timestamps: true }
);

// ⭐ Yahi duplicate alerts rokta hai — ek crop ke ek action ka
// notification sirf ek baar banega, chahe cron 100 baar chale.
// partialFilterExpression isliye ki manual notifications (jinme
// cropId/actionKey nahi hote) is index se affect na hon.
NotificationSchema.index(
  { userId: 1, cropId: 1, actionKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      cropId: { $exists: true },
      actionKey: { $exists: true },
    },
  }
);

NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.model("Notification", NotificationSchema);