import React from "react";

const InputField = ({ label, name, value, onChange, type = "text", placeholder, required = false, icon: Icon, isViewOnly }) => (
  <div className="space-y-0.5">
    <label className="text-[8.5px] font-bold text-slate-600 uppercase tracking-[0.1em] ml-0.5 flex items-center gap-1">
      {label} {required && !isViewOnly && <span className="text-rose-400 text-[9px]">*</span>}
    </label>
    <div className="relative group">
      {Icon && (
        <Icon
          className={`absolute left-2.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${isViewOnly ? 'text-slate-500' : 'text-slate-400 group-focus-within:text-indigo-500'
            }`}
          size={13}
          strokeWidth={2.5}
        />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={isViewOnly}
        className={`w-full px-2.5 py-2 ${Icon ? 'pl-8' : ''} border rounded-lg text-[11px] font-medium outline-none transition-all duration-200 placeholder:text-slate-500 text-slate-950 ${isViewOnly
            ? 'bg-slate-50 border-slate-200 cursor-default'
            : 'bg-white border-slate-200 hover:border-slate-300 focus:ring-1 focus:ring-indigo-500/10 focus:border-indigo-400'
          }`}
        required={required}
      />
    </div>
  </div>
);

export default InputField;
