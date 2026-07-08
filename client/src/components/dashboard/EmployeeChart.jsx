import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function EmployeeChart({
  active,
  inactive,
}) {
  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <div className="overflow-x-auto">
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Employee Status
      </h2>

      <Pie data={data} />
    </div>
    </div>
  );
}