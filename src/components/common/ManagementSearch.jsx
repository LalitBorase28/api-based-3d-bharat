import React from "react";
import { Search } from "lucide-react";

const ManagementSearch = ({ value, onChange, placeholder = "Search records..." }) => (
  <div className="relative flex-1 sm:flex-none group">
    <Search 
      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" 
      size={14} 
    />
    <input
      type="text"
      placeholder={placeholder}
      className="w-full sm:w-56 pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-input outline-none transition-all duration-200 placeholder:text-slate-600 text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />

  </div>
);

export default ManagementSearch;
