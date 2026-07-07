import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "HR Manager",
    company: "Tech Solutions",
    review:
      "This Employee Management System has simplified our HR operations. Managing employees has never been easier.",
  },
  {
    name: "Priya Sharma",
    role: "Operations Lead",
    company: "Innovate Pvt Ltd",
    review:
      "The dashboard is clean, intuitive, and helps us monitor employee data efficiently.",
  },
  {
    name: "Amit Verma",
    role: "CEO",
    company: "FutureWorks",
    review:
      "Excellent platform with all essential HR features. Highly recommended for growing companies.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold">
            What Our Clients Say
          </h2>

          <p className="text-gray-500 mt-4">
            Trusted by companies to manage their workforce efficiently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 italic">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.role} • {item.company}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}