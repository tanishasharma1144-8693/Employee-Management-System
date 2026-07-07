import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

export default function RecentEmployees({ employees = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Recent Employees
        </h2>

        <Link
          to="/employees"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          View All
        </Link>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No employees found.
        </div>
      ) : (
        <div className="space-y-4">
          {employees.slice(0, 5).map((emp) => (
            <div
              key={emp._id}
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  {emp.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {emp.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {emp.employeeId} • {emp.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    emp.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {emp.status}
                </span>

                <Link
                  to={`/employees/edit/${emp._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye />
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}