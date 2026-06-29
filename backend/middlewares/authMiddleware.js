// backend/middlewares/authMiddleware.js
const protectAdmin = (req, res, next) => {
  // Passport provides native session validation flag automatically
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({
      success: false,
      message: "Access Denied: Please log in via Google First.",
    });
};

module.exports = { protectAdmin };
