import express from "express";
import { loginuser,registeruser , getUsers,deleteUser,updateUser} from "../controller/usercontroller.js";
import userAuth from "../middleware/auth.js"
import updateLastActive from "../middleware/updatelastactive.js";

const userrouter=express.Router();

//user api endpoint
userrouter.post("/register", registeruser);
userrouter.post("/login",updateLastActive,loginuser);
userrouter.get("/all", getUsers);
userrouter.delete("/:id", deleteUser); 
userrouter.put("/:id", updateUser);

export default userrouter;
