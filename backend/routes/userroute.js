import express from "express";
import { loginuser,registeruser , getUsers,deleteUser,updateUser} from "../controller/usercontroller.js";
import { sendOtp, verifyOtp } from "../controller/otpcontroller.js";
import userAuth from "../middleware/auth.js"
import updateLastActive from "../middleware/updatelastactive.js";

const userrouter=express.Router();

//user api endpoint
userrouter.post("/register", registeruser);
userrouter.post("/login",updateLastActive,loginuser);
userrouter.get("/all", getUsers);
userrouter.delete("/:id", deleteUser); 
userrouter.put("/:id", updateUser);

//mobile OTP verification (register ke time)
userrouter.post("/send-otp", sendOtp);
userrouter.post("/verify-otp", verifyOtp);

export default userrouter;