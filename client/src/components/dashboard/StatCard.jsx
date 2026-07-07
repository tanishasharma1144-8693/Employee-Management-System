import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}