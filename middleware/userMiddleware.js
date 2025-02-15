const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token; // Retrieve token from cookies

    if (!token) {
      res.locals.user = null;
      return next(); // If no token, proceed without user data
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const user = await User.findById(decoded.id).select("-password"); // Fetch user without password

    res.locals.user = user; // Make user available in all views
    req.user = user; // Store user in req for API use
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.locals.user = null;
    next();
  }
};

module.exports = userMiddleware;
