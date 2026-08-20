import crypto from "crypto";
import otpmodel from "../model/otpmodel.js";
import usermodel from "../model/usermodel.js";
import sendSms from "../utils/sendSms.js";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;
const MAX_VERIFY_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 30;

const mobileRegex = /^[6-9]\d{9}$/;

const generateOtp = () => {
  // 6-digit numeric OTP, crypto-random (Math.random nahi — thoda zyada secure)
  return crypto.randomInt(100000, 999999).toString();
};

// POST /api/user/send-otp
const sendOtp = async (req, res) => {
  try {
    const { mobilenumber } = req.body;

    if (!mobilenumber || !mobileRegex.test(String(mobilenumber))) {
      return res.json({
        success: false,
        message: "Please enter a valid 10-digit mobile number",
      });
    }

    // Agar ye number already kisi registered user se linked hai to naya OTP bhejne ka fayda nahi
    const existingUser = await usermodel.findOne({ mobilenumber });
    if (existingUser) {
      return res.json({
        success: false,
        message: "This mobile number is already registered. Please login instead.",
      });
    }

    // Resend cooldown — same number pe baar baar OTP spam na ho
    const recentOtp = await otpmodel
      .findOne({ mobilenumber, purpose: "register" })
      .sort({ createdAt: -1 });

    if (recentOtp) {
      const secondsSinceLast = (Date.now() - recentOtp.createdAt.getTime()) / 1000;
      if (secondsSinceLast < RESEND_COOLDOWN_SECONDS) {
        return res.json({
          success: false,
          message: `Please wait ${Math.ceil(
            RESEND_COOLDOWN_SECONDS - secondsSinceLast
          )}s before requesting another OTP`,
        });
      }
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Purana unverified OTP hata ke fresh entry banao (upsert-style)
    await otpmodel.deleteMany({ mobilenumber, purpose: "register", verified: false });
    await otpmodel.create({
      mobilenumber,
      otp,
      purpose: "register",
      expiresAt,
    });

    await sendSms(
      mobilenumber,
      `${otp} is your CropAdvisor verification code. Valid for ${OTP_EXPIRY_MINUTES} minutes. Do not share this OTP with anyone.`
    );

    const response = {
      success: true,
      message: "OTP sent to your mobile number",
      expiresInSeconds: OTP_EXPIRY_MINUTES * 60,
    };

    // Sirf dev/testing convenience ke liye — jab tak real SMS gateway configure
    // nahi hota, OTP response me bhi bhej dete hain taaki bina SMS ke test ho sake.
    if (!process.env.SMS_PROVIDER && process.env.NODE_ENV !== "production") {
      response.devOtp = otp;
    }

    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Could not send OTP, please try again" });
  }
};

// POST /api/user/verify-otp
const verifyOtp = async (req, res) => {
  try {
    const { mobilenumber, otp } = req.body;

    if (!mobilenumber || !otp) {
      return res.json({ success: false, message: "Mobile number and OTP are required" });
    }

    const record = await otpmodel
      .findOne({ mobilenumber, purpose: "register" })
      .sort({ createdAt: -1 });

    if (!record) {
      return res.json({
        success: false,
        message: "No OTP found for this number. Please request a new OTP.",
      });
    }

    if (record.verified) {
      return res.json({ success: true, message: "Mobile number already verified" });
    }

    if (record.expiresAt.getTime() < Date.now()) {
      return res.json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
      return res.json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    if (record.otp !== String(otp).trim()) {
      record.attempts += 1;
      await record.save();
      const remaining = MAX_VERIFY_ATTEMPTS - record.attempts;
      return res.json({
        success: false,
        message:
          remaining > 0
            ? `Incorrect OTP. ${remaining} attempt(s) left.`
            : "Incorrect OTP. Please request a new OTP.",
      });
    }

    record.verified = true;
    await record.save();

    res.json({ success: true, message: "Mobile number verified successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Could not verify OTP, please try again" });
  }
};

// Register se pehle usercontroller isko call karke check karega ki
// number OTP se verify ho chuka hai ya nahi (server-side source of truth —
// frontend flag pe bharosa nahi karte).
export const isMobileVerified = async (mobilenumber) => {
  const record = await otpmodel
    .findOne({ mobilenumber, purpose: "register", verified: true })
    .sort({ createdAt: -1 });

  if (!record) return false;

  // Verify hone ke baad bhi ek reasonable window (OTP expiry + buffer) ke andar
  // hi registration accept karo, warna bahut purana verification reuse ho sakta hai
  const verifiedWindowMs = (OTP_EXPIRY_MINUTES + 10) * 60 * 1000;
  return Date.now() - record.updatedAt.getTime() < verifiedWindowMs;
};

export const clearMobileOtp = async (mobilenumber) => {
  await otpmodel.deleteMany({ mobilenumber, purpose: "register" });
};

export { sendOtp, verifyOtp };