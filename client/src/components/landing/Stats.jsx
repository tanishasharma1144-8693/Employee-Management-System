export default function Stats() {
  const stats = [
    { number: 500, label: "Companies" },
    { number: 50000, label: "Employees" },
    { number: 98, label: "Client Satisfaction %" },
    { number: 24, label: "Support Hours" },
  ];

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold">
                {item.number}
                {item.label.includes("%") ? "%" : "+"}
              </h2>

              <p className="mt-3 text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}