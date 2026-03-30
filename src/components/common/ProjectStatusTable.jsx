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

  const thClass = "px-6 py-4 text-[10px] font-extrabold uppercase tracking-[1.5px] text-slate-500 border-b border-slate-100 whitespace-nowrap";

  return (
    <div className="mt-8 mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)]" />
          <h3 className="text-h3 text-slate-900 leading-tight">
            {title} <span className="text-body-sm text-slate-400 ml-1">— All Projects</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-label text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
            {projects.length} Total Projects
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className={`${thClass} w-16 text-center`}>#</th>
                <th className={`${thClass}`}>Project Details</th>
                <th className={`${thClass} w-44`}>Chainage Range</th>
                <th className={`${thClass} w-36 text-center`}>Status</th>
                <th className={`${thClass} w-48`}>Authored By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((proj, idx) => (
                <tr key={proj.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-6 py-5 text-center">
                    <span className="text-caption text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="text-body font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {proj.project_name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-label text-slate-500 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
                          {proj.project_id}
                        </span>
                        <span className="text-body-sm text-slate-400 line-clamp-1 max-w-[240px]">
                          {proj.project_description || "No description provided"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                        <MapPin size={12} strokeWidth={2.5} />
                      </div>
                      <span className="text-caption text-slate-700">
                        {formatKMCH(proj.from_km, proj.from_chainage)} <span className="text-slate-300 mx-1">→</span> {formatKMCH(proj.to_km, proj.to_chainage)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={proj.status} type="general" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/50 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
                        <User2 size={14} className="text-slate-500 group-hover:text-indigo-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-body-sm font-bold text-slate-800 leading-none truncate">
                          {proj.added_by_name || "System"}
                        </span>
                        <div className="flex items-center gap-1 mt-1.5">
                          <CalendarDays size={10} className="text-slate-300" />
                          <span className="text-label text-slate-400">
                            {formatDate(proj.inserted_on)}
                          </span>
                        </div>
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
