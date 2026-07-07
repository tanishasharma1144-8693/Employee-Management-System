import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      toast.success("Registration Successful");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-96">

        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <button className="bg-green-500 text-white w-full py-2">
          Register
        </button>

      </form>
    </div>
  );
}