import {
  FaUsers,
  FaMoneyCheckAlt,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaUsers size={40} />,
    title: "Employee Management",
    description:
      "Manage employee profiles, departments, and personal information with ease.",
  },
  {
    icon: <FaCalendarCheck size={40} />,
    title: "Attendance Tracking",
    description:
      "Track daily attendance and monitor employee presence efficiently.",
  },
  {
    icon: <FaMoneyCheckAlt size={40} />,
    title: "Payroll Management",
    description:
      "Handle salaries, bonuses, deductions, and generate payroll reports.",
  },
  {
    icon: <FaChartLine size={40} />,
    title: "Analytics & Reports",
    description:
      "Visualize employee statistics with interactive charts and reports.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold">
            Powerful Features
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything you need to manage your workforce efficiently in one
            modern platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="text-blue-600 flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}