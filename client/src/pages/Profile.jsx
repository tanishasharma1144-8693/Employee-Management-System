import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put("/auth/profile", form);

      updateUser(res.data.user);

      toast.success("Profile Updated");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update Failed"
      );
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await api.put("/auth/change-password", password);

      toast.success("Password Changed");

      setPassword({
        currentPassword: "",
        newPassword: "",
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password Change Failed"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Left */}

        <div className="bg-white rounded-xl shadow p-6 text-center">

          <FaUserCircle className="text-8xl text-blue-600 mx-auto mb-4" />

          <h2 className="text-2xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500">
            {user?.email}
          </p>

          <span className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {user?.role}
          </span>

        </div>

        {/* Right */}

        <div className="md:col-span-2 space-y-8">

          {/* Update */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              Update Profile
            </h2>

            <form
              onSubmit={updateProfile}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleProfileChange}
                className="w-full border p-3 rounded"
                placeholder="Name"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleProfileChange}
                className="w-full border p-3 rounded"
                placeholder="Email"
              />

              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Save Changes
              </button>

            </form>

          </div>

          {/* Password */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              Change Password
            </h2>

            <form
              onSubmit={changePassword}
              className="space-y-4"
            >

              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full border p-3 rounded"
              />

              <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                Change Password
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}