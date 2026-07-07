export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <div className="flex items-center gap-6">

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=2563eb&color=fff&size=150`}
          alt={user.name}
          className="w-28 h-28 rounded-full"
        />

        <div>

          <h2 className="text-3xl font-bold">
            {user.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>

          <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-1 rounded-full">
            Active User
          </span>

        </div>

      </div>

    </div>
  );
}