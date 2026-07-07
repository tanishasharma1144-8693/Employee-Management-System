import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="bg-white shadow flex justify-between items-center px-8 py-5">

      <div className="relative">

        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          placeholder="Search..."
          className="border rounded-xl pl-10 py-2 w-80"
        />

      </div>

      <div className="flex items-center gap-6">

        <FaBell size={22} />

        <div className="flex items-center gap-2">
          <FaUserCircle size={36} />

          <div>
            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}