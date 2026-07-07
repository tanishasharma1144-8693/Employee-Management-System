import api from "./api";

export const getProfile = () => {
  return api.get("/auth/profile");
};

export const changePassword = (data) => {
  return api.put("/auth/change-password", data);
};

export const logout = () => {
  return api.post("/auth/logout");
};

// Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// Register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// Forgot Password
export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", { email });
};

// Verify OTP
export const verifyOTP = (data) => {
  return api.post("/auth/verify-otp", data);
};

// Reset Password
export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};
