import mongoose from "mongoose";

const completedActionSchema = new mongoose.Schema(
  {
    // cropCalendar.js ke action.key se match karta hai (e.g. "irrigation_1")
    key: { type: String, required: true },
    completedAt: { type: Date, default: Date.now },
    note: { type: String },
  },
  { _id: false }
);

const cropSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    email: { type: String },

    // Jo farmer ne likha ("gehu", "Wheat", "गेहूँ")
    cropType: { type: String, required: true },
    // normalizeCropType() se nikla calendar key ("wheat") - lookup ke liye
    cropKey: { type: String, index: true },
    variety: { type: String },

    // ⭐ Stage calculation poori tarah isi pe depend karta hai
    sowingDate: { type: Date, required: true },

    area: { type: Number }, // acres

    // ⚠️ Ab optional. Pehle required tha, par yield harvest ke BAAD pata
    // chalti hai - sowing ke waqt farmer ke paas ye value hoti hi nahi.
    fertilizerUsed: { type: String },
    yield: { type: Number },
    harvestDate: { type: Date },

    lastFertilizingDate: { type: Date },
    lastPestDate: { type: Date },

    // Farmer ne kaunse calendar actions kar liye
    completedActions: { type: [completedActionSchema], default: [] },

    status: {
      type: String,
      enum: ["growing", "harvested", "failed"],
      default: "growing",
      index: true,
    },
  },
  { timestamps: true }
);

// Cron job roz "saare growing crops" nikalega - ye index usko fast rakhega
cropSchema.index({ status: 1, sowingDate: 1 });
cropSchema.index({ userId: 1, status: 1 });

const cropmodel = mongoose.model("Crop", cropSchema);
export default cropmodel;