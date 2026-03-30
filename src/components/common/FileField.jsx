import React from "react";
import { Upload, FileImage } from "lucide-react";

const FileField = ({ label, name, value, onChange, isViewOnly, error, required }) => (
  <div className="flex flex-col gap-1 w-full">
    <div className="flex justify-between items-center px-0.5">
      <label className="text-label text-slate-500">
        {label} {required && !isViewOnly && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <span className="text-[10px] font-bold text-red-500 animate-in fade-in slide-in-from-right-1">
          {error}
        </span>
      )}
    </div>
    <div className="flex gap-2">
      <div className={`flex-1 relative group px-9 py-1.5 border rounded-lg text-body-sm truncate flex items-center gap-2 transition-all ${
          isViewOnly 
          ? 'bg-slate-50 border-slate-200 text-slate-600 cursor-default' 
          : error
            ? 'bg-red-50/30 border-red-200 text-red-600'
            : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500">
          <FileImage size={14} />
        </div>
        {value?.name || "No file selected"}
      </div>
      {!isViewOnly && (
        <label className="shrink-0 cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-button transition-all duration-200 flex items-center gap-2 active:scale-[0.97] shadow-sm">
          <Upload size={14} />
          Browse
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => onChange(name, e.target.files[0])} 
          />
        </label>
      )}
    </div>
  </div>
);


export default FileField;

