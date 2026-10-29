import express from "express";
import { loginuser, registeruser, getUsers, deleteUser, updateUser } from "../controller/usercontroller.js";
import userAuth from "../middleware/auth.js";
import updateLastActive from "../middleware/updatelastactive.js";

const userrouter = express.Router();

//user api endpoint
userrouter.post("/register", registeruser);
userrouter.post("/login", updateLastActive, loginuser);
userrouter.get("/all", userAuth, getUsers);
userrouter.delete("/:id", userAuth, deleteUser);
userrouter.put("/:id", userAuth, updateUser);

export default userrouter;