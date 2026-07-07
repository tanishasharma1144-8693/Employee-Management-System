import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  async function loadEmployee() {
    try {
      const res = await api.get(`/employees/${id}`);
      setEmployee(res.data.employee);
    } catch (err) {
      console.log(err);
    }
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <Link
        to="/employees"
        className="text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      <div className="bg-white shadow-xl rounded-2xl p-8 mt-5">

        <div className="flex items-center gap-8">

          <img
            src={
              employee.photo
                ? `http://localhost:5000${employee.photo}`
                : `https://ui-avatars.com/api/?name=${employee.name}`
            }
            alt={employee.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {employee.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {employee.designation}
            </p>

            <span
              className={`inline-block mt-3 px-4 py-1 rounded-full text-white ${
                employee.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {employee.status}
            </span>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <Info title="Employee ID" value={employee.employeeId} />
          <Info title="Email" value={employee.email} />
          <Info title="Phone" value={employee.phone} />
          <Info title="Department" value={employee.department} />
          <Info title="Salary" value={`₹${employee.salary}`} />
          <Info
            title="Joining Date"
            value={new Date(employee.joiningDate).toLocaleDateString()}
          />

        </div>

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="bg-gray-100 rounded-xl p-5">
      <p className="text-gray-500">{title}</p>
      <h2 className="font-semibold text-lg mt-1">
        {value}
      </h2>
    </div>
  );
}