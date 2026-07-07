const ActivityLog = require("../models/ActivityLog");

// ================= Get Activities =================

exports.getActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      activities, // <-- IMPORTANT
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Create Activity =================

exports.createActivity = async (data) => {
  try {
    await ActivityLog.create(data);
  } catch (error) {
    console.log("Activity Log Error:", error);
  }
};