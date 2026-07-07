const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
  
} = require("../controllers/authController");

// ================= PUBLIC ROUTES =================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// ================= PROTECTED ROUTES =================

// Get Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.post(
  "/forgot-password",
  forgotPassword
);
router.post("/verify-otp", verifyOTP);
router.post(
  "/reset-password/:token",
  resetPassword
);

// Update Profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

// Logout
router.post(
  "/logout",
  authMiddleware,
  logout
);


module.exports = router;