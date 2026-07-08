import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaMoon,
  FaSun,
} from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow px-4 md:px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-600">
        Employee Management
      </h1>

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