import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero.png";
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-white pt-24"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-600 font-semibold uppercase">
            Smart HR Solution
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Employee <span className="text-blue-600">Management</span> System
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            Manage employees, attendance, departments, payroll, and reports
            with a modern, secure, and easy-to-use platform.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
  src={heroImage}
  alt="Employee Management"
  className="w-full max-w-lg mx-auto"
/>
        </motion.div>

      </div>
    </section>
  );
}