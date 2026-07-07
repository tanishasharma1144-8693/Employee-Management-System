import { motion } from "framer-motion";
import { FaUsers, FaBuilding, FaShieldAlt } from "react-icons/fa";

export default function About() {
  const items = [
    {
      icon: <FaUsers size={35} />,
      title: "Employee First",
      desc: "Manage employees efficiently with a user-friendly interface.",
    },
    {
      icon: <FaBuilding size={35} />,
      title: "For Every Business",
      desc: "Perfect for startups, SMEs, and large enterprises.",
    },
    {
      icon: <FaShieldAlt size={35} />,
      title: "Secure Data",
      desc: "JWT Authentication and MongoDB ensure secure employee records.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            Why Choose Our Employee Management System?
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
            Our platform streamlines employee management with secure
            authentication, intuitive dashboards, payroll management,
            attendance tracking, and insightful analytics—all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="text-blue-600 mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-500">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}