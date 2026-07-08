import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function DepartmentChart({ data = [] }) {
  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Employees",
        data: data.map((d) => d.total),
        backgroundColor: "#2563EB",
      },
    ],
  };

  return (
    <div className="overflow-x-auto">
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Department Distribution
      </h2>

      <Bar data={chartData} />
    </div>
    </div>
  );
}