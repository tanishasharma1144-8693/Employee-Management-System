import { useEffect, useState } from "react";
import { FaUserCircle, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";

import { getActivities } from "../services/activityService";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const res = await getActivities();

      // Backend returns { success: true, activities: [...] }
      setLogs(res.data.activities || []);
    } catch (error) {
      console.log(error);

      setLogs([]);

      toast.error("Unable to load activities");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8">
      {/* Heading */}

      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Activity Logs
      </h1>

      {/* Card */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
        {logs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-300">
              No activities found
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {logs.map((log) => (
              <div
                key={log._id}
                className="flex gap-5 border-b last:border-none pb-5"
              >
                <FaUserCircle className="text-blue-600 text-3xl mt-1" />

                <div className="flex-1">
                  <h3 className="font-bold text-lg dark:text-white">
                    {log.action}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {log.description}
                  </p>

                  {log.user && (
                    <p className="text-sm text-blue-600 mt-2">
                      {log.user.name} ({log.user.email})
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                    <FaClock />

                    <span>
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}