import React from "react";

const ToggleField = ({ label, name, checked, onChange, isViewOnly }) => (
  <div className="flex items-center justify-between px-2 py-1 bg-white rounded-lg transition-all hover:bg-slate-50 group">
    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wide group-hover:text-indigo-700 transition-colors">
      {label}
    </span>
    <button
      type="button"
      disabled={isViewOnly}
      onClick={() => onChange(name, !checked)}
      className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out ${checked ? 'bg-indigo-600' : 'bg-slate-200'
        } ${isViewOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'
          }`}
      />
    </button>
  </div>
);

export default ToggleField;
