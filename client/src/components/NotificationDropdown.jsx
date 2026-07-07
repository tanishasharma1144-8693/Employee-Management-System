import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { getNotifications } from "../services/notificationService";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();

      // Controller returns { notifications: [...] }
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log(err);
      setNotifications([]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl text-gray-700 dark:text-white"
      >
        <FaBell />

        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl z-50">

          <div className="p-4 border-b">
            <h2 className="font-bold">
              Notifications
            </h2>
          </div>

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (

              <p className="p-5 text-gray-500">
                No Notifications
              </p>

            ) : (

              notifications.map((item) => (

                <div
                  key={item._id}
                  className="border-b p-4 hover:bg-gray-100 dark:hover:bg-slate-700"
                >

                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {item.message}
                  </p>

                  <small className="text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </small>

                </div>

              ))

            )}

          </div>

        </div>
      )}
    </div>
  );
}