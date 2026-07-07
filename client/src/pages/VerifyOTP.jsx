import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/authService";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await verifyOTP({
        email,
        otp,
      });

      toast.success("OTP Verified");

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Verify OTP
        </h1>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </form>

    </div>
  );
}