import React from "react";

const ToggleField = ({ label, name, checked, onChange, isViewOnly }) => (
  <div className="flex items-center justify-between px-2.5 py-2 bg-slate-50/60 rounded-lg border border-slate-100">
    <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wide">{label}</span>
    <button
      type="button"
      disabled={isViewOnly}
      onClick={() => onChange(name, !checked)}
      className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${checked ? 'bg-emerald-500' : 'bg-slate-200'
        } ${isViewOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow transition duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'
          }`}
      />
    </button>
  </div>
);

export default ToggleField;
