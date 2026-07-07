import { useState } from "react";
import { changePassword } from "../../services/authService";
import { toast } from "react-toastify";

export default function ChangePassword() {

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      await changePassword(form);

      toast.success("Password Changed");

      setForm({
        oldPassword: "",
        newPassword: "",
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to change password"
      );

    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="border rounded-lg w-full p-3"
          required
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Update Password
        </button>

      </form>

    </div>
  );
}