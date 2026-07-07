import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            EMS
          </h2>

          <p className="text-gray-400 mt-4">
            Modern Employee Management System built using
            React, Node.js, Express & MongoDB.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <p>Email: support@ems.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>

      </div>

      <div className="text-center mt-10 text-gray-500">
        © 2026 Employee Management System. All Rights Reserved.
      </div>
    </footer>
  );
}