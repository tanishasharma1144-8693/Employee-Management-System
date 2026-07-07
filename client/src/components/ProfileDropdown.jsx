import { useState } from "react";
import { Link } from "react-router-dom";
import { logout, getUser } from "../utils/auth";

export default function ProfileDropdown() {

  const [open, setOpen] = useState(false);

  const user = getUser();

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3"
      >

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
          )}`}
          className="w-10 h-10 rounded-full"
          alt=""
        />

        <div className="text-left">

          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>

        </div>

      </button>

      {open && (

        <div className="absolute right-0 mt-4 bg-white rounded-xl shadow-lg w-56 overflow-hidden">

          <Link
            to="/profile"
            className="block px-5 py-3 hover:bg-gray-100"
          >
            My Profile
          </Link>

          <button
            onClick={logout}
            className="block w-full text-left px-5 py-3 hover:bg-red-50 text-red-600"
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
}