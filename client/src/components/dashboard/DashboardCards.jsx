import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaMoneyBill,
} from "react-icons/fa";

import { getDashboardStats } from "../../services/employeeService";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    departmentStats: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await getDashboardStats();

      setStats(res.data.stats);

    } catch (err) {
      console.log(err);
    }
  }

  const cards = [
    {
      title: "Employees",
      value: stats.totalEmployees,
      icon: <FaUsers />,
    },
    {
      title: "Active",
      value: stats.activeEmployees,
      icon: <FaUserCheck />,
    },
    {
      title: "Departments",
      value: stats.departmentStats.length,
      icon: <FaBuilding />,
    },
    {
      title: "Inactive",
      value: stats.inactiveEmployees,
      icon: <FaMoneyBill />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div className="text-blue-600 text-4xl">
              {card.icon}
            </div>

          </div>
        </div>

      ))}

    </div>
  );
}