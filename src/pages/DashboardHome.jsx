import { Briefcase, Target, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DashboardHome() {
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-row">
            <div className="flex-1">

              <h3 className="text-sm font-medium text-gray-500">Total personas</h3>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <h4 className="text-sm font-medium text-gray-500">+12 este mes</h4>
            </div>
            <div className="p-1">
              <div className="p-2 rounded-lg bg-slate-200">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-row">
            <div className="flex-1">

              <h3 className="text-sm font-medium text-gray-500">Especialidades</h3>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <h4 className="text-sm font-medium text-gray-500">Todas activas</h4>
            </div>
            <div className="p-1">
              <div className="p-2 rounded-lg bg-slate-200">
                <Briefcase className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-row">
            <div className="flex-1">

              <h3 className="text-sm font-medium text-gray-500">Competencias activas</h3>
              <p className="text-2xl font-bold text-gray-900">70</p>
              <h4 className="text-sm font-medium text-gray-500">En 5 especialidades</h4>
            </div>
            <div className="p-1">
              <div className="p-2 rounded-lg bg-slate-200">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-row">
            <div className="flex-1">

              <h3 className="text-sm font-medium text-gray-500">Cumplimiento medio</h3>
              <p className="text-2xl font-bold text-gray-900">72%</p>
              <h4 className="text-sm font-medium text-gray-500">+4% vs anterior</h4>
            </div>
            <div className="p-1">
              <div className="p-2 rounded-lg bg-slate-200">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
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

      <div className="bg-white p-6 rounded-xl shadow-sm border-gray-100 h-64 flex items-center justify-center text-gray-400 border-dashed border-2">
        Main Content Area (Charts / Data will go here)
      </div>
    </div>
  );
}