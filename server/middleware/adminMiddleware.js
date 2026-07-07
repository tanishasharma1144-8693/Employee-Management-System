const adminMiddleware = (req, res, next) => {
  try {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = adminMiddleware;