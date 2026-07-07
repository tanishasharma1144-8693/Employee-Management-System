import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // AuthContext stores token & user
      login(res.data.token, res.data.user);

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <div className="flex flex-col items-center mb-8">

          <FaUserCircle className="text-7xl text-blue-600 mb-3" />

          <h1 className="text-3xl font-bold">
            Employee Login
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back!
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Remember Me */}

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? (
              <div className="flex justify-center">

                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

              </div>
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* Register */}

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2 hover:underline font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}