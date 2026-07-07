import { useEffect, useState } from "react";
import {
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { getActivities } from "../../services/activityService";

export default function ActivityCard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await getActivities();
      setActivities(res.data.activities);
    } catch (err) {
      console.log(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "ADD":
        return <FaPlusCircle className="text-green-600 text-xl" />;

      case "UPDATE":
        return <FaEdit className="text-blue-600 text-xl" />;

      case "DELETE":
        return <FaTrash className="text-red-600 text-xl" />;

      case "LOGIN":
        return <FaSignInAlt className="text-green-600 text-xl" />;

      case "LOGOUT":
        return <FaSignOutAlt className="text-orange-500 text-xl" />;

      default:
        return <FaPlusCircle />;
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor(
      (new Date() - new Date(date)) / 1000
    );

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const value = Math.floor(seconds / intervals[key]);

      if (value > 0)
        return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No activity found
        </p>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start gap-4 border-b pb-4"
            >
              {getIcon(activity.type)}

              <div>
                <p className="font-semibold">
                  {activity.description}
                </p>

                <span className="text-gray-500 text-sm">
                  {timeAgo(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}