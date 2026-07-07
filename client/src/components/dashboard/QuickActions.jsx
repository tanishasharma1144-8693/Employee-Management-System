import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaChartLine,
  FaUserEdit,
} from "react-icons/fa";

const actions = [
  {
    title: "Add Employee",
    icon: <FaUserPlus />,
    link: "/employees/add",
    color: "bg-blue-600",
  },
  {
    title: "View Employees",
    icon: <FaUsers />,
    link: "/employees",
    color: "bg-green-600",
  },
  {
    title: "Dashboard",
    icon: <FaChartLine />,
    link: "/dashboard",
    color: "bg-purple-600",
  },
  {
    title: "Update Records",
    icon: <FaUserEdit />,
    link: "/employees",
    color: "bg-orange-600",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-4 gap-5">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`${action.color} text-white rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition`}
          >
            <div className="text-4xl mb-3">
              {action.icon}
            </div>

            <p className="font-semibold">
              {action.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}