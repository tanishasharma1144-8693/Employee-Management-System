const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Employee"],
      default: "Employee",
    },

    // Password Reset Token
    resetPasswordToken: {
      type: String,
      default: "",
    },

    // Password Reset Expiry
    resetPasswordExpires: {
      type: Date,
    },
    resetOTP: {
  type: String,
},

resetOTPExpire: {
  type: Date,
}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);