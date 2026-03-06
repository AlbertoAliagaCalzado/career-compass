import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Target, TrendingUp, Users } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { dashboardService, userService } from "../api/client";
import StatCard from "../components/StatCard";
import EvaluationRow from "../components/EvalutationRow";

const iconMap = {
  "Total personas": Users,
  "Especialidades": Briefcase,
  "Competencias activas": Target,
  "Cumplimiento medio": TrendingUp,
};

export default function DashboardHome() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

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

  const { data: specialtiesData, isLoading: specialtiesLoading } = useQuery({
    queryKey: ['specialty-stats'],
    queryFn: async () => {
      const res = await dashboardService.getSpecialtyStats();
      return res.data;
    }
  });

  const { data: levelData, isLoading: levelsLoading } = useQuery({
    queryKey: ['stats-levels', selectedSpecialty],
    queryFn: async () => (await dashboardService.getLevels({ specialty_id: selectedSpecialty })).data
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users-recent', selectedSpecialty],
    queryFn: () => userService.getAll({ specialty_id: selectedSpecialty })
  });

  return (
    <div className="w-full space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">Resumen del framework de carrera profesional</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            id="specialty-filter"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="flex-1 sm:w-64 bg-slate-50 border border-gray-200 text-slate-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-3 cursor-pointer"
          >
            <option value="">Todas las especialidades</option>
            {specialtiesData?.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsLoading ? (
          <div className="p-6 text-center text-gray-400">Cargando resumen...</div>
        ) : (
          stats?.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              Icon={stat.icon}
              bgClass={stat.bgClass}
              colorClass={stat.colorClass}
            />
          ))
        )}
      </section>

      <section className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grow-2 w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por nivel</h3>
          {levelsLoading ? (
            <div className="p-6 text-center text-gray-400">Cargando niveles...</div>
          ) :
            (
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
            )}

        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grow w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personas por especialidad</h3>
          {specialtiesLoading ? (
            <div className="p-6 text-center text-gray-400">Cargando especialidades...</div>
          ) : (
            <div className="w-full">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={specialtiesData}
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
          )}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Evaluaciones recientes</h3>
        </div>

        <div className="divide-y divide-gray-50">
          {usersLoading ? (
            <div className="p-6 text-center text-gray-400">Cargando evaluaciones...</div>
          ) : (
            users.data?.slice(0, 5).map(user => (
              <EvaluationRow key={user.id} user={user} />
            ))
          )}
        </div>
      </section>
    </div >
  );
}