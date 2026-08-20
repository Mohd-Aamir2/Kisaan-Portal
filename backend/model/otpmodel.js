import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    mobilenumber: {
      type: String,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      default: "register", // room to reuse this for "login" / "reset-password" later
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// TTL index -> Mongo apne aap purane/expired OTP docs clean kar dega
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const otpmodel = mongoose.models.otp || mongoose.model("otp", otpSchema);
export default otpmodel;