const userAuth = async (req, res, next) => {
  console.log("Auth middleware hit");
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User found:", req.user);
      next();
    } catch (err) {
      console.error("JWT error:", err);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    console.log("No token found");
    return res.status(401).json({ error: "Not authorized, no token" });
  }
}; 

const updateLastActive = async (req, res, next) => {
  if (req.user) { // assuming you store user in req.user after JWT auth
    await User.findByIdAndUpdate(req.user.id, { lastActive: new Date() });
  }
  next();
};


export default userAuth;