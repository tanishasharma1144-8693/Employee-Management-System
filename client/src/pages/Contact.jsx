export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Contact Us
      </h1>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded"
        />

        <textarea
          rows="5"
          placeholder="Message"
          className="w-full border p-3 rounded"
        ></textarea>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Send Message
        </button>

      </form>

    </div>
  );
}