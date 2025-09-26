import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("Admin auth middleware hit");

  const token = req.headers.authorization?.split(" ")[1];
  console.log("token",token);
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    req.admin = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };

    console.log("Authenticated user id:", req.admin.id);
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
