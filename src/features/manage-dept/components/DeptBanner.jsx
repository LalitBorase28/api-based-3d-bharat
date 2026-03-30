import React from "react";
import { Plus, Building2 } from "lucide-react";

/**
 * DeptBanner Component - Enhanced Responsive Version
 */
const DeptBanner = ({ onAddClick }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:px-3 py-2.5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 text-center sm:text-left">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-h1 leading-tight">
            Department Management
          </h1>
          <p className="text-body-sm mt-1">
            Configure and manage infrastructure departments, entities, and access modules.
          </p>
        </div>
      </div>

      <button
        onClick={onAddClick}
        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-250 active:scale-95 shadow-xl shadow-slate-200 border border-slate-700"
      >
        <Plus className="w-4 h-4" />
        Add New Department
      </button>

    </div>
  );
};

export default DeptBanner;

