import { useQuery } from "@tanstack/react-query";
import { Briefcase, Target, TrendingUp, Users } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { dashboardService } from "../api/client";

const iconMap = {
  "Total personas": Users,
  "Especialidades": Briefcase,
  "Competencias activas": Target,
  "Cumplimiento medio": TrendingUp,
};

export default function DashboardHome() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const res = await dashboardService.getSummary();
      return res.data.map(s => ({
        ...s,
        icon: iconMap[s.label] || Users,
        colorClass: "text-primary-600",
        bgClass: "bg-slate-200"
      }));
    }
  });

  const { data: specialtyData, isLoading: specialtyLoading } = useQuery({
    queryKey: ['specialty-stats'],
    queryFn: async () => {
      const res = await dashboardService.getSpecialtyStats();
      return res.data;
    }
  });

  const { data: levelData, isLoading: levelsLoading } = useQuery({
    queryKey: ['level-stats'],
    queryFn: async () => {
      const res = await dashboardService.getLevelStats();
      return res.data;
    }
  });

  if (statsLoading || specialtyLoading || levelsLoading) {
    return <div className="p-8 text-center animate-pulse text-gray-500">Sincronizando datos...</div>;
  }

  return (
    <div className="w-full space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Datos en tiempo real desde el Framework</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-row justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <h4 className="text-sm font-medium text-green-600 mt-1">{stat.change}</h4>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgClass}`}>
                <stat.icon className={`w-6 h-6 ${stat.colorClass}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por nivel</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar
                  dataKey="total"
                  fill="var(--color-primary-600)"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-96 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personas por especialidad</h3>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={specialtyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div >
  );
}