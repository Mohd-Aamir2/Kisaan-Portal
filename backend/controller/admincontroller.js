import Admin from "../model/adminmodel.js";
import jwt from "jsonwebtoken";

const createtoken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
      email: admin.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// Signup
export const signupAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const admin = new Admin({ username, email, password, role });
    await admin.save();

    const token = createtoken(admin); // pass the instance

    res.status(201).json({
      success: true,
      token,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createtoken(admin); // ✅ use instance, not model

    res.json({
      success: true,
      token,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Protected route example
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
