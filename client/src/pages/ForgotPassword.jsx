import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await forgotPassword(email);

      toast.success("OTP sent to your email");

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-5"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </form>

    </div>
  );
}