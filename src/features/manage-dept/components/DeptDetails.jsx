import React from "react";
import { User, Mail, Phone, Building2, MapPin, Calendar, Briefcase, ChevronRight } from "lucide-react";

const DeptDetails = ({ data, onCancel }) => {
  if (!data) return null;

  const projectCount = data.projects?.length || 0;
  const activeProjects = data.projects?.filter(p => p.status === 2).length || 0;

  return (
    <div className="px-5 py-5 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Header Profile Section */}
      <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
        <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-sm shrink-0">
          <img src={data.logo} alt={data.dept_short_name} className="w-full h-full object-contain" />
        </div>
        <div className="space-y-0.5 flex-1">
          <h2 className="text-[17px] font-bold text-slate-900 leading-tight">{data.dept_full_name}</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] font-bold rounded-md border border-indigo-100 uppercase tracking-wider">{data.dept_short_name}</span>
            <span className="px-1.5 py-0.5 text-slate-400 text-[10px] font-semibold flex items-center gap-1">
              <Calendar size={10} /> {data.created_at}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Management & Address Section */}
        <div className="space-y-4">
          <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-4">Management Team</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm"><User size={14} /></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter leading-none mb-1">Dept Head</p>
                  <p className="text-[13px] font-bold text-slate-800">{data.head_name}</p>
                  <p className="text-[11px] text-slate-700">{data.head_email}</p>
                </div>
              </div>
              <div className="h-px bg-slate-100 mx-1" />
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm"><User size={14} /></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter leading-none mb-1">Ops Manager</p>
                  <p className="text-[13px] font-bold text-slate-800">{data.manager_name}</p>
                  <p className="text-[11px] text-slate-700">{data.manager_email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-3">Location</h3>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-lg flex items-center justify-center shrink-0"><MapPin size={14} /></div>
              <p className="text-[11px] font-medium text-slate-700 leading-relaxed italic pr-2">{data.address || "No address provided"}</p>
            </div>
          </div>
        </div>

        {/* Project Statistics Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/20 rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-4">Project Overview</h3>
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <span className="block text-4xl font-black text-slate-800 leading-none">{projectCount}</span>
                  <span className="text-[9px] font-bold text-slate-700 uppercase tracking-tighter">Total Projects</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                    <span className="text-[12px] font-bold text-slate-700">{activeProjects} <span className="text-slate-500 font-normal ml-0.5">Active</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-200" />
                    <span className="text-[12px] font-bold text-slate-700">{projectCount - activeProjects} <span className="text-slate-500 font-normal ml-0.5">Pending</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                onClick={onCancel}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-slate-500 hover:text-indigo-600 font-bold text-[12px] transition-all rounded-xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 bg-slate-50/50"
              >
                Return to Dashboard <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptDetails;
