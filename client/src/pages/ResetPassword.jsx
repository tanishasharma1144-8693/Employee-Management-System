import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

export default function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {

      setLoading(true);

      await resetPassword({
        email,
        otp,
        newPassword: password,
      });

      toast.success("Password Reset Successfully");

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Reset Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded-lg mb-5"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

      </form>

    </div>
  );
}