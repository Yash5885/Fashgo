const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.redirect("/users/register"); // Redirect to register if not logged in
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user data in req
    next();
  } catch (err) {
    res.clearCookie("auth_token").redirect("/users/register");
  }
};

module.exports = authMiddleware;