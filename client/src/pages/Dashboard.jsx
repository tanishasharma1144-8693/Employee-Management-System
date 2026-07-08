import { useEffect, useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import EmployeeChart from "../components/dashboard/EmployeeChart";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityCard from "../components/dashboard/ActivityCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import Skeleton from "../components/Skeleton";


import { getDashboardStats } from "../services/dashboardService";
import { getEmployees } from "../services/employeeService";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [monthlyJoining, setMonthlyJoining] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsRes, employeeRes] = await Promise.all([
        getDashboardStats(),
        getEmployees(),
      ]);

      setStats(statsRes.data.stats);

      setMonthlyJoining(
        statsRes.data.stats.monthlyJoining || []
      );

      setEmployees(
        employeeRes.data.employees || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>


      <DashboardContainer>
        <div className="bg-gray-100 dark:bg-slate-900 dark:text-white min-h-screen p-8">

          <DashboardHeader />

          {/* Stats */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

            <StatCard
              title="Total Employees"
              value={stats?.totalEmployees || 0}
              color="text-blue-600"
            />

            <StatCard
              title="Active Employees"
              value={stats?.activeEmployees || 0}
              color="text-green-600"
            />

            <StatCard
              title="Inactive Employees"
              value={stats?.inactiveEmployees || 0}
              color="text-red-600"
            />

            <StatCard
              title="Departments"
              value={stats?.departmentStats?.length || 0}
              color="text-purple-600"
            />

          </div>

          {/* Charts */}

          <div className="grid lg:grid-cols-2 gap-6 mb-10">

            <EmployeeChart
              active={stats?.activeEmployees || 0}
              inactive={stats?.inactiveEmployees || 0}
            />

            <DepartmentChart
              data={stats?.departmentStats || []}
            />

          </div>

          {/* Salary */}

          <div className="bg-white rounded-xl shadow p-6 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              Salary Analytics
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-blue-50 p-5 rounded-xl">

                <p className="text-gray-500">
                  Average Salary
                </p>

                <h2 className="text-3xl font-bold text-blue-600">
                  ₹{Math.round(stats?.salaryStats?.averageSalary || 0)}
                </h2>

              </div>

              <div className="bg-green-50 p-5 rounded-xl">

                <p className="text-gray-500">
                  Highest Salary
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  ₹{stats?.salaryStats?.highestSalary || 0}
                </h2>

              </div>

              <div className="bg-red-50 p-5 rounded-xl">

                <p className="text-gray-500">
                  Lowest Salary
                </p>

                <h2 className="text-3xl font-bold text-red-600">
                  ₹{stats?.salaryStats?.lowestSalary || 0}
                </h2>

              </div>

            </div>

          </div>

          {/* Monthly Joining */}

          <div className="bg-white rounded-xl shadow p-6 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              Monthly Joining Report
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

              {monthlyJoining.length > 0 ? (
                monthlyJoining.map((item, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl p-4 text-center"
                  >
                    <p className="text-gray-500">
                      Month {item._id.month}
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600">
                      {item.total}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Joined
                    </p>
                  </div>
                ))
              ) : (
                <p>No joining data available</p>
              )}

            </div>

          </div>

          {/* Recent Employees */}

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2">

              <RecentEmployees
                employees={stats?.recentEmployees || employees}
              />

            </div>

            <QuickActions />

          </div>

          {/* Activity */}

          <div className="mt-8">

            <ActivityCard />

          </div>

        </div>
      </DashboardContainer>
    </>
  );
}