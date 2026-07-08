const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
// Routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const salaryRoutes =
require("./routes/salaryRoutes");


// Load Environment Variables

dotenv.config();


// Connect Database

connectDB();


// Initialize App

const app = express();



// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://employee-management-system-lake-two.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());



// Static Files (Employee Photos)

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(
"/api/salary",
salaryRoutes
);
app.use(
"/api/notifications",
notificationRoutes
);

// Home Route
app.use("/api/reports", reportRoutes);
app.get("/", (req,res)=>{

  res.send(
    "Employee Management API Running..."
  );

});



// API Routes


app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/employees",
  employeeRoutes
);


app.use(
  "/api/activity",
  activityRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);



// Server

const PORT =
process.env.PORT || 5000;



app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});