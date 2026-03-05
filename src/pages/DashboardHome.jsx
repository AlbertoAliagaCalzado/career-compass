export default function DashboardHome() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 mt-1">Here is what's happening with your career today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Profile Completion</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">85%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Active Applications</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Skills Matched</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border-gray-100 h-64 flex items-center justify-center text-gray-400 border-dashed border-2">
        Main Content Area (Charts / Data will go here)
      </div>
    </div>
  );
}