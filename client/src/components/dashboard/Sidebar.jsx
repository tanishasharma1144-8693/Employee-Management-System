import { useContext } from "react";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaKey,
} from "react-icons/fa";
import {
FaMoneyCheckAlt
} from "react-icons/fa";
import {
FaHistory
} from "react-icons/fa";


import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();

  const {
    user,
    logout,
    isAdmin,
  } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },

    ...(isAdmin
      ? [
          {
            name: "Add Employee",
            path: "/employees/add",
            icon: <FaUserPlus />,
          },
        ]
      : []),

    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartPie />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },

    {
      name: "Change Password",
      path: "/change-password",
      icon: <FaKey />,
    },
    {
name:"Salary",
path:"/salary",
icon:<FaMoneyCheckAlt/>
},
{
name:"Activity Logs",
path:"/activity",
icon:<FaHistory/>
}
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-center tracking-wide">
          EMS
        </h1>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {menus.map((menu) => (

          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-slate-700 text-gray-300"
              }`
            }
          >
            <span className="text-lg">
              {menu.icon}
            </span>

            <span className="font-medium">
              {menu.name}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* Logged In User */}

      <div className="border-t border-slate-700 p-5">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl">

            <FaUserCircle />

          </div>

          <div>

            <h3 className="font-semibold">
              {user?.name || "User"}
            </h3>

            <p className="text-xs text-gray-400">
              {user?.email}
            </p>

            <span className="inline-block mt-1 bg-green-600 px-2 py-1 rounded-full text-xs">
              {user?.role}
            </span>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}