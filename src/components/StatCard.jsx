export default function StatCard({ label, value, change, Icon, bgClass, colorClass }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-row justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{label}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <h4 className="text-sm font-medium text-green-600 mt-1">{change}</h4>
        </div>
        <div className={`p-2 rounded-lg ${bgClass}`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
    </div>
  );
}