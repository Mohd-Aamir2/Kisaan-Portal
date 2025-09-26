// middleware/auth.js
import jwt from "jsonwebtoken";
import user from "../model/usermodel.js"; // adjust to your user model

const verifyToken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });
    const token = auth.split(" ")[1];
    console.log("Token being sent:", token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info for ownership checks
    req.user = { id: payload.id, name: payload.name, email: payload.email };
    console.log("userid",req.user.id);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
