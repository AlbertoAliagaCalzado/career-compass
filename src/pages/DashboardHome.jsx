import { Briefcase, Target, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DashboardHome() {
  const statsData = [
    {
      label: "Total personas",
      value: "127",
      change: "+12 este mes",
      icon: Users,
      colorClass: "text-primary-600",
      bgClass: "bg-slate-200",
    },
    {
      label: "Especialidades",
      value: "5",
      change: "Todas activas",
      icon: Briefcase,
      colorClass: "text-primary-600",
      bgClass: "bg-slate-200",
    },
    {
      label: "Competencias activas",
      value: "70",
      change: "En 5 especialidades",
      icon: Target,
      colorClass: "text-primary-600",
      bgClass: "bg-slate-200",
    },
    {
      label: "Cumplimiento medio",
      value: "72%",
      change: "+4% vs anterior",
      icon: TrendingUp,
      colorClass: "text-primary-600",
      bgClass: "bg-slate-200",
    },
  ];

  const specialtyData = [
    { name: 'Analista', total: 38 },
    { name: 'Consultor', total: 32 },
    { name: 'Consultor Sr.', total: 28 },
    { name: 'Manager', total: 18 },
    { name: 'Director', total: 8 },
    { name: 'Partner', total: 3 },
  ];

  const statusData = [
    { name: 'Estrategia', value: 40, fill: 'oklch(48.8% 0.243 264.376)' },
    { name: 'Tecnología', value: 45, fill: 'oklch(59.6% 0.145 163.225)' },
    { name: 'SAP', value: 28, fill: 'oklch(66.6% 0.179 58.318)' },
    { name: 'Auditoría', value: 15, fill: 'oklch(57.7% 0.245 27.325)' },
    { name: 'Riesgos', value: 32, fill: 'oklch(55.8% 0.288 302.321)' },
  ];

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Resumen del framework de carrera profesional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-hover hover:shadow-md">
            <div className="flex flex-row justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <h4 className="text-sm font-medium text-gray-400 mt-1">{stat.change}</h4>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgClass}`}>
                <stat.icon className={`w-6 h-6 ${stat.colorClass}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por nivel</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" className="fill-primary-600" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personas por especialidad</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};