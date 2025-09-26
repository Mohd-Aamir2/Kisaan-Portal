// middleware/updateLastActive.js
import User from "../model/usermodel.js";

export const updateLastActive = async (req, res, next) => {
  try {
    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, { lastActive: new Date() });
    }
    next(); // ✅ zaruri hai
  } catch (err) {
    console.error("Error updating lastActive:", err);
    next(); // ❌ error pe bhi request ko break mat karo
  }
};

export default updateLastActive;