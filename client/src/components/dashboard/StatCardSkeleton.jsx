export default function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
      <div className="h-8 w-16 bg-gray-300 rounded mt-4"></div>
    </div>
  );
}