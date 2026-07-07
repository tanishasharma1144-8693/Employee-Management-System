import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          EMS
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <a href="#home" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-5">

          <div className="flex flex-col gap-4">

            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>

            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>

            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
}