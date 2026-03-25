import React from "react";
import { MapPin, CheckCircle2, Clock, AlertCircle, User2, CalendarDays } from "lucide-react";

const StatusBadge = ({ status, type = "general" }) => {
  const getConfig = () => {
    if (type === "general") {
      if (status === 1) return { text: "Inactive", icon: AlertCircle, classes: "bg-gradient-to-r from-rose-50 to-red-50 text-rose-600 border-rose-200/80 shadow-sm shadow-rose-100/50" };
      if (status === 2) return { text: "Active", icon: CheckCircle2, classes: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200/80 shadow-sm shadow-emerald-100/50" };
      if (status === 3) return { text: "Completed", icon: CheckCircle2, classes: "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 border-indigo-200/80 shadow-sm shadow-indigo-100/50" };
    }
    if (status === 1) return { text: "Pending", icon: Clock, classes: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200/80 shadow-sm shadow-amber-100/50" };
    if (status === 2) return { text: "Active", icon: CheckCircle2, classes: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200/80 shadow-sm shadow-emerald-100/50" };
    if (status === 3) return { text: "Completed", icon: CheckCircle2, classes: "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 border-indigo-200/80 shadow-sm shadow-indigo-100/50" };
    return { text: "N/A", icon: AlertCircle, classes: "bg-slate-50 text-slate-400 border-slate-200" };
  };

  const { text, icon: Icon, classes } = getConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-bold border tracking-wide whitespace-nowrap ${classes}`}>
      <Icon size={10} strokeWidth={2.5} className="opacity-70" />
      {text}
    </span>
  );
};

const formatKMCH = (km, ch) => {
  const kmPart = Math.floor(km || 0);
  const chPart = String(ch || 0).padStart(3, '0');
  return `${kmPart}+${chPart}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = String(date.getFullYear()).slice(-2);
  return `${day} ${month} ${year}`;
};

const ProjectStatusTable = ({ projects, title }) => {
  if (!projects || projects.length === 0) return null;

  const thClass = "px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100";

  return (
    <div className="mt-8 mb-10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-indigo-500 rounded-full" />
          <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">{title} <span className="text-slate-400 font-medium">— Projects</span></h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{projects.length} Total</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className={`${thClass} w-12 text-center`}>#</th>
                <th className={`${thClass}`}>Project Details</th>
                <th className={`${thClass} w-[160px]`}>Location (Km)</th>
                <th className={`${thClass} w-[120px] text-center`}>Status</th>
                <th className={`${thClass} w-[160px]`}>Managed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((proj, idx) => (
                <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 text-center font-mono text-[11px] font-bold text-slate-400">
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[12px] font-bold text-slate-800">{proj.project_name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">{proj.project_id}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[200px]">{proj.project_description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={12} className="text-slate-400" />
                      <span className="font-mono text-[11px] font-bold">
                        {formatKMCH(proj.from_km, proj.from_chainage)} - {formatKMCH(proj.to_km, proj.to_chainage)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={proj.status} type="general" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/50">
                        <User2 size={12} className="text-slate-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-700 leading-tight">{proj.added_by_name || "—"}</span>
                        <span className="text-[9px] text-slate-400 font-medium mt-0.5">{formatDate(proj.inserted_on)}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusTable;
