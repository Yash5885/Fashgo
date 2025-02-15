const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.redirect("/users/login"); // Redirect if no token is found
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.redirect("/users/login");
    }

    req.user = user; // Store user in request object
    res.locals.user = user; // Make user accessible in EJS templates
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.clearCookie("auth_token"); // Remove invalid token
    res.redirect("/users/login");
  }
};

module.exports = authMiddleware;
