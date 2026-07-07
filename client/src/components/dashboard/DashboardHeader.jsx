import { FaUserCircle } from "react-icons/fa";

export default function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  const hours = new Date().getHours();

  let greeting = "Good Evening";

  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white mb-8">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-4xl font-bold mb-2">
            {greeting}, {user?.name} 👋
          </h2>

          <p className="text-blue-100 text-lg">
            Welcome back to Employee Management System
          </p>

        </div>

        <div>

          <FaUserCircle className="text-7xl opacity-90" />

        </div>

      </div>

    </div>
  );
}