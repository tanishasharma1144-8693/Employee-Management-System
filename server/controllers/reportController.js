const Employee = require("../models/Employee");

exports.getReports = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
      status: "Active",
    });

    const inactiveEmployees = await Employee.countDocuments({
      status: "Inactive",
    });

    const departmentReport = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          employees: { $sum: 1 },
          totalSalary: { $sum: "$salary" },
          averageSalary: { $avg: "$salary" },
        },
      },
      {
        $sort: {
          employees: -1,
        },
      },
    ]);

    const salaryStats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          averageSalary: { $avg: "$salary" },
          highestSalary: { $max: "$salary" },
          lowestSalary: { $min: "$salary" },
          totalSalary: { $sum: "$salary" },
        },
      },
    ]);

    const joiningTrend = await Employee.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$joiningDate" },
            month: { $month: "$joiningDate" },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      reports: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        departmentReport,
        salaryStats: salaryStats[0] || {},
        joiningTrend,
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