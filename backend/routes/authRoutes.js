// backend/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Trigger Google OAuth Login Page
// @route   GET /api/auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// @desc    Google OAuth Callback URL
// @route   GET /api/auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=unauthorized`,
  }),
  (req, res) => {
    // Successful login -> Redirect back to administrative frontend dashboard
    res.redirect(`${process.env.FRONTEND_URL}/admin-dashboard`);
  },
);

// @desc    Get Current Logged In Admin Profile Status
// @route   GET /api/auth/status
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ success: true, admin: req.user });
  }
  return res.status(401).json({ success: false, message: "Not Authenticated" });
});

// @desc    Logout Admin Session
// @route   GET /api/auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ success: true, message: "Logged out safely" });
  });
});

module.exports = router;
