import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password changed successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-6">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />

          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg w-full">
            Change Password
          </button>

        </form>

      </div>

    </div>
  );
}