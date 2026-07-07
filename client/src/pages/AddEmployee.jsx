import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handlePhoto(e) {
    const file = e.target.files[0];

    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (photo) {
        formData.append("photo", photo);
      }

      await api.post("/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Employee Added Successfully");
      navigate("/employees");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Error adding employee"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Add Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Photo */}

          <div className="flex flex-col items-center">

            <img
              src={
                preview ||
                "https://ui-avatars.com/api/?name=Employee&background=2563eb&color=fff"
              }
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="mt-4"
            />

          </div>

          <input
            name="employeeId"
            placeholder="Employee ID"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="name"
            placeholder="Name"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="designation"
            placeholder="Designation"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <input
            name="joiningDate"
            type="date"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            required
          />

          <select
            name="status"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
            value={form.status}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Add Employee
          </button>

        </form>

      </div>

    </div>
  );
}