import { useEffect, useState } from "react";
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa";

import { getReports } from "../services/reportService";

import { exportEmployees } from "../utils/exportEmployees";
import { exportPDF } from "../utils/exportPDF";

export default function Reports() {

  const [reports, setReports] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await getReports();
      setReports(res.data.reports);
    } catch (err) {
      console.log(err);
    }
  }

  if (!reports) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Reports
          </h1>

          <p className="text-gray-500">
            Employee Analytics & Reports
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              exportEmployees(reports.departmentReport)
            }
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Export Excel
          </button>

          <button
            onClick={() =>
              exportPDF(reports.departmentReport)
            }
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Export PDF
          </button>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">

          <FaUsers className="text-4xl text-blue-600 mb-4"/>

          <h2 className="text-gray-500">
            Total Employees
          </h2>

          <p className="text-4xl font-bold">
            {reports.totalEmployees}
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <FaBuilding className="text-4xl text-purple-600 mb-4"/>

          <h2 className="text-gray-500">
            Departments
          </h2>

          <p className="text-4xl font-bold">
            {reports.departmentReport.length}
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <FaMoneyBillWave className="text-4xl text-green-600 mb-4"/>

          <h2 className="text-gray-500">
            Average Salary
          </h2>

          <p className="text-4xl font-bold">

            ₹
            {Math.round(
              reports.salaryStats.averageSalary || 0
            )}

          </p>

        </div>

      </div>

      {/* Department Report */}

      <div className="bg-white rounded-xl shadow p-6 mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Department Report
        </h2>

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-3 text-left">
                Department
              </th>

              <th>
                Employees
              </th>

              <th>
                Total Salary
              </th>

              <th>
                Average Salary
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.departmentReport.map((dept) => (

              <tr
                key={dept._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {dept._id}
                </td>

                <td className="text-center">
                  {dept.employees}
                </td>

                <td className="text-center">
                  ₹{dept.totalSalary}
                </td>

                <td className="text-center">
                  ₹{Math.round(dept.averageSalary)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Salary Statistics */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="bg-green-50 rounded-xl p-5">

          <h3 className="text-gray-500">
            Highest Salary
          </h3>

          <p className="text-3xl font-bold text-green-700">
            ₹{reports.salaryStats.highestSalary}
          </p>

        </div>

        <div className="bg-blue-50 rounded-xl p-5">

          <h3 className="text-gray-500">
            Average Salary
          </h3>

          <p className="text-3xl font-bold text-blue-700">
            ₹{Math.round(reports.salaryStats.averageSalary)}
          </p>

        </div>

        <div className="bg-red-50 rounded-xl p-5">

          <h3 className="text-gray-500">
            Lowest Salary
          </h3>

          <p className="text-3xl font-bold text-red-700">
            ₹{reports.salaryStats.lowestSalary}
          </p>

        </div>

      </div>

      {/* Joining Trend */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Monthly Joining Trend
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

          {reports.joiningTrend.map((item, index) => (

            <div
              key={index}
              className="bg-blue-50 rounded-xl text-center p-5"
            >

              <p className="text-gray-500">

                {item._id.month}/
                {item._id.year}

              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                {item.total}
              </h2>

            </div>

          ))}

        </div>

      </div>

    </div>
  );

}