import mongoose from "mongoose";

const soilSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // reference to the User
    ref: "User", // name of the User model
    required: true
  },
  summary: { type: String, required: true },
  recommendations: [{ type: String }],
  nutrients: {
    ph: { type: Number, required: true },
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true },
  },
}, { timestamps: true });

const soilmodel= mongoose.model("soilreport", soilSchema);
export default soilmodel;
