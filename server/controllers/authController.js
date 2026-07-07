const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Activity = require("../models/Activity");

const jwt = require("jsonwebtoken");
const validator = require("validator");

// ===================== REGISTER =====================

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===================== LOGIN =====================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ================= Activity Log =================

    await Activity.create({
      user: user._id,
      action: "LOGIN",
      description: `${user.name} logged into the system`,
      type: "LOGIN",
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===================== PROFILE =====================

exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ===================== UPDATE PROFILE =====================

exports.updateProfile = async (req, res) => {

  try {

    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ===================== CHANGE PASSWORD =====================

exports.changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Current Password is incorrect",
      });

    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ===================== LOGOUT =====================

exports.logout = async (req, res) => {

  try {

    await Activity.create({
      user: req.user.id,
      action: "LOGOUT",
      description: `${req.user.name} logged out`,
      type: "LOGOUT",
    });

    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ===================== FORGOT PASSWORD =====================

exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      user.email,
      "EMS Password Reset OTP",
      `Your OTP is ${otp}. It is valid for 10 minutes.`
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===================== VERIFY OTP =====================

exports.verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetOTP !== otp ||
      user.resetOTPExpire < Date.now()
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid or Expired OTP",
      });

    }

    res.status(200).json({
      success: true,
      message: "OTP Verified",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};
// ===================== RESET PASSWORD =====================

exports.resetPassword = async (req, res) => {

  try {

    const {
      email,
      otp,
      newPassword,
    } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetOTP !== otp ||
      user.resetOTPExpire < Date.now()
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid or Expired OTP",
      });

    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};