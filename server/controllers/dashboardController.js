const Employee = require("../models/Employee");

// =========================
// Dashboard Statistics
// =========================
exports.getDashboardStats = async (req, res) => {
  try {
    // Total Employees
    const totalEmployees = await Employee.countDocuments();

    // Active Employees
    const activeEmployees = await Employee.countDocuments({
      status: "Active",
    });

    // Inactive Employees
    const inactiveEmployees = await Employee.countDocuments({
      status: "Inactive",
    });

    // Employees grouped by department
    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        departmentStats,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};