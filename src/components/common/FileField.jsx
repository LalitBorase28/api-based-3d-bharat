import React from "react";
import { Upload, FileImage } from "lucide-react";

const FileField = ({ label, name, value, onChange, isViewOnly }) => (
  <div className="space-y-0.5">
    <label className="text-[8.5px] font-bold text-slate-600 uppercase tracking-[0.1em] ml-0.5">{label}</label>
    <div className="flex gap-1.5">
      <div className={`flex-1 px-2.5 py-2 border rounded-lg text-[11px] font-medium truncate flex items-center gap-1.5 ${isViewOnly ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white border-slate-200 text-slate-500'
        }`}>
        <FileImage size={12} className="text-slate-400 shrink-0" />
        {value?.name || "No file selected"}
      </div>
      {!isViewOnly && (
        <label className="shrink-0 cursor-pointer bg-[#1e293b] hover:bg-indigo-600 text-white px-3 py-2 rounded-lg text-[10px] font-bold transition-all duration-200 flex items-center gap-1.5 border border-slate-700 hover:border-indigo-500 active:scale-[0.97]">
          <Upload size={11} />
          Browse
          <input type="file" className="hidden" onChange={(e) => onChange(name, e.target.files[0])} />
        </label>
      )}
    </div>
  </div>
);

export default FileField;
