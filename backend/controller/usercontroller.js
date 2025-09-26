import usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";



const loginuser= async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user dose not exists",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({
        success: false,
        message: "invalid password",
      });
    }
    const token = createtoken(user._id);
    res.json({
      success: true,
      token,
      userId: user._id, 
      name:user.name,email:user.email,mobilenumber:user.mobilenumber,state:user.state,district:user.district,soiltype:user.soiltype,farmSize: user.farmSize,
    });
    user.lastActive = new Date();   // 👈 update last active
    await user.save();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//create token
const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


//register user
const registeruser = async (req, res) => {
  const { email, password, name, mobilenumber, state, district, soiltype, farmSize } = req.body;
  try {
    if(!name || !email || !password || !mobilenumber || !state || !district || !soiltype){
        return res.json({ success:false, message:"missing details" });
    }

    const exists = await usermodel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = new usermodel({
      email,
      name,
      password: hashedpassword,
      mobilenumber,
      state,
      district,
      soiltype,
      farmSize, // ✅ added farmSize
    });

    const user = await newuser.save();
    const token = createtoken(user._id);

    res.json({
      success: true,
      token,
      userId: user._id, 
      name: user.name,
      email: user.email,
      mobilenumber: user.mobilenumber,
      state: user.state,
      district: user.district,
      soiltype: user.soiltype,
      farmSize: user.farmSize, // ✅ return farmSize
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await usermodel.find().select('-password'); // exclude password
    res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usermodel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // user id from URL
    const updates = req.body; // fields to update

    const updatedUser = await usermodel.findByIdAndUpdate(id, updates, {
      new: true, // return updated doc
      runValidators: true, // validate fields
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "✅ User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};

export { loginuser, registeruser,getUsers,deleteUser,updateUser };
