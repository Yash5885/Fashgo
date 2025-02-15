const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Profile Page - Only for Logged-in Users
router.get("/profile", (req, res) => {
  res.render("profile.ejs", { user: req.user });
});

module.exports = router;