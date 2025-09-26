import mongoose from "mongoose";
const userschema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
       name: {
        type: String,
        required: true,
      },
       mobilenumber: {
        type: Number,
        required: true,
      },
       state: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      soiltype: {
        type: String,
        required: true,
      },
      farmSize: {
      type: Number, // value in acres (example: 2, 5.5)
      required: false,
      min: 0, // ✅ Negative value not allowed
      },
      createdAt: {
        type: Date,
        default: Date.now, // ✅ automatically set on creation
      },
      
    },
    { timestamps: true }
  );

userschema.add({
  lastActive: { type: Date, default: Date.now }, // 👈 track last active
});

const usermodel = mongoose.model.user || mongoose.model("user", userschema);
export default usermodel;