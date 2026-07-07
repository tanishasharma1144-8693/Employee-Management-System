const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  dashboardStats,
} = require("../controllers/employeeController");

// ================= Dashboard =================
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Employee Dashboard",
    user: req.user,
  });
});

// ================= Dashboard Stats =================
router.get("/stats", authMiddleware, dashboardStats);

// ================= Get Employees =================
router.get("/", authMiddleware, getEmployees);

// ================= Get Employee By ID =================
router.get("/:id", authMiddleware, getEmployeeById);

// ================= Add Employee (Admin Only) =================
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("photo"),
  addEmployee
);

// ================= Update Employee (Admin Only) =================
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("photo"),
  updateEmployee
);

// ================= Delete Employee (Admin Only) =================
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteEmployee
);

module.exports = router;