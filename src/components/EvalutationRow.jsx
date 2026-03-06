import ProgressBar from "./ProgressBar";

export default function EvaluationRow({ user }) {
  return (
    <div className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600 shrink-0">
          {user.initials}
        </div>
        <div className="mx-4">
          <p className="font-medium text-gray-900">{user.full_name}</p>
          <p className="text-xs text-gray-500">{user.level?.name || "Sin nivel"}</p>
        </div>
        <div className="flex gap-2">
          {user.specialties.map(spec => (
            <span key={spec.id} className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary-100 text-slate-800">
              {spec.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
        {user.competencies && user.competencies.length > 0 ? (
          user.competencies.map((comp) => (
            <ProgressBar 
              key={comp.competency_id} 
              name={comp.competency_name} 
              percentCompleted={comp.percent_completed} 
            />
          ))
        ) : (
          <span className="text-[10px] text-gray-400 italic">Sin evaluaciones registradas</span>
        )}
      </div>
    </div>
  );
}