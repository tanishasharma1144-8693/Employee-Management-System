import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";

import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar({ setSidebarOpen }) {
  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow px-4 py-3 flex items-center justify-between">

  {/* Left */}
  <div className="flex items-center gap-3">

    {/* Hamburger */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="lg:hidden text-3xl"
    >
      ☰
    </button>

    <h1 className="text-lg md:text-2xl font-bold text-blue-600">
  Employee
  <span className="hidden sm:inline"> Management</span>
</h1>

  </div>

  {/* Right */}
  <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">

    <button
      onClick={toggleTheme}
      className="text-xl md:text-2xl"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>

    <NotificationDropdown />

    <ProfileDropdown />

  </div>

</nav>
  );
}