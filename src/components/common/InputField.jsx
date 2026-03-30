import React from "react";

const InputField = ({ label, name, value, onChange, type = "text", placeholder, required = false, icon: Icon, isViewOnly }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-label text-slate-500 ml-0.5">
      {label} {required && !isViewOnly && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Icon className="w-3.5 h-3.5" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={isViewOnly}
        className={`w-full ${Icon ? 'pl-9' : 'px-3'} pr-3 py-1.5 border rounded-lg text-input outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-950 ${isViewOnly
          ? 'bg-slate-100/80 border-slate-200 cursor-default'
          : 'bg-slate-100/80 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400'
          }`}
        required={required}
      />
    </div>
  </div>
);


export default InputField;

