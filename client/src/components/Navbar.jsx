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
    <nav className="bg-white dark:bg-slate-900 shadow px-4 md:px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}

        <button
          className="text-2xl lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          Employee Management
        </h1>

      </div>

      <div className="flex items-center gap-5">

        <button
          onClick={toggleTheme}
          className="text-2xl"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <NotificationDropdown />

        <ProfileDropdown />

      </div>

    </nav>
  );
}