import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AccessDenied from "./pages/AccessDenied";
import VerifyOTP from "./pages/VerifyOTP";
import NotFound from "./pages/NotFound";

import ActivityLogs from "./pages/ActivityLogs";
import EmployeeProfile from "./pages/EmployeeProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Salary from "./pages/Salary";

function withLayout(Component) {
  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route path="/verify-otp" element={<VerifyOTP />} />

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {withLayout(Dashboard)}
          </ProtectedRoute>
        }
      />
  <Route
  path="/employees/:id"
  element={
    <ProtectedRoute>
      {withLayout(EmployeeProfile)}
    </ProtectedRoute>
  }
/>
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            {withLayout(Employees)}
          </ProtectedRoute>
        }
      />

      <Route
path="/access-denied"
element={<AccessDenied/>}
/>
      <Route
        path="/employees/add"
        element={
          <ProtectedRoute>
            {withLayout(AddEmployee)}
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/edit/:id"
        element={
          <ProtectedRoute>
            {withLayout(EditEmployee)}
          </ProtectedRoute>
        }
      />
      <Route

path="/salary"

element={

<ProtectedRoute>

{withLayout(Salary)}

</ProtectedRoute>

}

/>
<Route

path="/activity"

element={

<ProtectedRoute>

{withLayout(ActivityLogs)}

</ProtectedRoute>

}

/>

      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            {withLayout(EmployeeDetails)}
          </ProtectedRoute>
        }
      />
      <Route
  path="/reports"
  element={
    <ProtectedRoute>
      {withLayout(Reports)}
    </ProtectedRoute>
  }
/>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            {withLayout(Profile)}
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            {withLayout(Settings)}
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            {withLayout(ChangePassword)}
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            {withLayout(Reports)}
          </ProtectedRoute>
        }
      />
     

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;