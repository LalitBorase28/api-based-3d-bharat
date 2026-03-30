import React from "react";

const InputField = ({ label, name, value, onChange, onBlur, type = "text", placeholder, required = false, icon: Icon, isViewOnly, error, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <div className="flex justify-between items-center px-0.5">
      <label className="text-label text-slate-700">
        {label} {required && !isViewOnly && <span className="text-red-500">*</span>}
      </label>
      {error && <span className="text-[10px] font-bold text-red-500 animate-in fade-in slide-in-from-right-1">{error}</span>}
    </div>
    <div className="relative group">
      {Icon && (
        <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={isViewOnly}
        className={`w-full ${Icon ? 'pl-9' : 'px-3'} pr-3 py-1.5 border rounded-lg text-input outline-none transition-all duration-200 placeholder:text-[10.5px] placeholder:font-medium placeholder:text-slate-400/80 text-slate-950 ${isViewOnly
          ? 'bg-slate-100/80 border-slate-200 cursor-default'
          : error
            ? 'bg-red-50/30 border-red-200 focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-400'
            : 'bg-slate-100/80 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400'
          }`}
        required={required}
        {...props}
      />
    </div>
  </div>
);




export default InputField;

